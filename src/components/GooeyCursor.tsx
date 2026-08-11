'use client';

import { useRef, useState, useEffect, useCallback, useEffectEvent } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import type { TimeoutReturn } from '@/types';

function randomPointInAnnulus(cx: number, cy: number, rMin = 60, rMax = 100) {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.sqrt(Math.random() * (rMax ** 2 - rMin ** 2) + rMin ** 2);

  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

type Point = {
  x: number;
  y: number;
};

type SmallBlob = {
  id: string;
  size: number;
  tx: number;
  ty: number;
  top: number;
  left: number;
};

const ColorMatrix = [
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 25, -10],
] as const;

function getCenter(): Point {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

const GooeyCursor = () => {
  const [smallBlobs, setSmallBlobs] = useState<SmallBlob[]>([]);

  const targetRef = useRef<Point>(getCenter());
  const mainPosRef = useRef<Point>(getCenter());
  const trailPosRef = useRef<Point>(getCenter());

  const mainBlobRef = useRef<HTMLDivElement | null>(null);
  const trailBlobRef = useRef<HTMLDivElement | null>(null);
  const spawnTimeoutRef = useRef<TimeoutReturn | null>(null);

  const spawnBlob = useCallback(() => {
    const id = crypto.randomUUID();
    const size = 22 + Math.random() * 9;

    const { x: left, y: top } = targetRef.current;

    const { x: tx, y: ty } = randomPointInAnnulus(0, 0, 90, 120);

    setSmallBlobs(prev => [...prev, { id, tx, ty, top, left, size }]);

    setTimeout(() => setSmallBlobs(prev => prev.filter(b => b.id !== id)), 2_000);

    const nextDelay = 300 + Math.random() * 600;
    spawnTimeoutRef.current = setTimeout(spawnBlob, nextDelay);
  }, []);

  const debouncedStartSpawning = useDebounce(() => {
    spawnBlob();
  }, 300);

  const handlePointerMove = useEffectEvent((e: PointerEvent) => {
    if (spawnTimeoutRef.current) {
      setSmallBlobs([]);
      clearTimeout(spawnTimeoutRef.current);
      spawnTimeoutRef.current = null;
    }

    debouncedStartSpawning();

    targetRef.current.x = e.clientX;
    targetRef.current.y = e.clientY;

    const mainBlob = mainBlobRef.current;

    if (mainBlob) {
      mainBlob.style.setProperty('--tx', `${e.clientX}px`);
      mainBlob.style.setProperty('--ty', `${e.clientY}px`);
    }
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    spawnBlob();

    window.addEventListener('pointermove', handlePointerMove, {
      signal,
      passive: true,
    });

    return () => {
      controller.abort();
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      const { x: tx, y: ty } = targetRef.current;

      const mainBlob = mainBlobRef.current;
      const trailBlob = trailBlobRef.current;

      if (!mainBlob || !trailBlob) return;

      mainPosRef.current.x += (tx - mainPosRef.current.x) * 0.2;
      mainPosRef.current.y += (ty - mainPosRef.current.y) * 0.2;

      const trailSize = trailBlob.offsetWidth;
      const offset = trailSize / 2;

      trailPosRef.current.x += (tx - trailPosRef.current.x - offset) * 0.08;
      trailPosRef.current.y += (ty - trailPosRef.current.y - offset) * 0.08;

      mainBlob.style.setProperty('--tx', `${mainPosRef.current.x}px`);
      mainBlob.style.setProperty('--ty', `${mainPosRef.current.y}px`);

      trailBlob.style.setProperty('--tx', `${trailPosRef.current.x}px`);
      trailBlob.style.setProperty('--ty', `${trailPosRef.current.y}px`);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <svg className='absolute size-0 opacity-0'>
        <filter
          id='gooey'
          x='-50%'
          y='-50%'
          width='200%'
          height='200%'
          colorInterpolationFilters='sRGB'
        >
          <feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur' />
          <feColorMatrix in='blur' type='matrix' values={ColorMatrix.flat().join(' ')} />
        </filter>
      </svg>

      <div className='fixed inset-0 filter-[url(#gooey)] mix-blend-difference z-9999 pointer-events-none'>
        <div ref={mainBlobRef} className='blob main absolute w-16' />
        <div ref={trailBlobRef} className='blob trail absolute w-12' />

        {smallBlobs.map(b => (
          <div
            key={b.id}
            className='blob absolute animate-blob'
            style={
              {
                width: `${b.size}px`,
                top: `${b.top}px`,
                left: `${b.left}px`,
                ['--tx']: `${b.tx}px`,
                ['--ty']: `${b.ty}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
};

export default GooeyCursor;
