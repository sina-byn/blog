'use client';

// * constants
const STORAGE_KEY = 'theme';

// * icons
import { Sun, Moon, Display } from '@geist-ui/icons';

// *types
type Theme = 'system' | 'dark' | 'light';

declare global {
  // eslint-disable-next-line no-var
  var theme: { value: Theme };
}

const ThemeSwitch = () => {
  const switchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = e.currentTarget.dataset.theme as Theme;
    localStorage.setItem(STORAGE_KEY, newTheme);

    if (!document.startViewTransition) {
      window.theme.value = newTheme;
      return;
    }

    const transition = document.startViewTransition(() => {
      window.theme.value = newTheme;
    });

    const x = e.clientX;
    const y = e.clientY;
    const finalRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${finalRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <div className='theme-switch flex items-center w-fit border border-neutral-600 dark:border-neutral-800 rounded-full overflow-hidden p-0.5'>
      <button
        type='button'
        data-theme='system'
        onClick={switchHandler}
        className='rounded-full cursor-pointer p-1'
      >
        <Display size={16} className='stroke-neutral-600 dark:stroke-neutral-300' />
      </button>

      <button
        type='button'
        data-theme='light'
        onClick={switchHandler}
        className='rounded-full cursor-pointer p-1'
      >
        <Sun size={16} className='stroke-neutral-600 dark:stroke-neutral-300' />
      </button>

      <button
        type='button'
        data-theme='dark'
        onClick={switchHandler}
        className='rounded-full cursor-pointer p-1'
      >
        <Moon size={16} className='stroke-neutral-600 dark:stroke-neutral-300' />
      </button>
    </div>
  );
};

export default ThemeSwitch;
