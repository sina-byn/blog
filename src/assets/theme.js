const [SYSTEM, DARK, LIGHT] = ['system', 'dark', 'light'];
const STORAGE_KEY = 'theme';

const disableTransitions = () => {
  const style = document.createElement('style');
  style.textContent = '*,*:before,*:after{transition: none !important;}';

  document.head.append(style);

  return () => {
    setTimeout(() => {
      getComputedStyle(document.documentElement);
      style.remove();
    }, 1);
  };
};

console.log('here');
const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

window.theme = new Proxy(
  { value: SYSTEM },
  {
    set: (target, key, receiver) => {
      const enableTransitions = disableTransitions();

      const theme = receiver ?? localStorage.getItem(STORAGE_KEY) ?? SYSTEM;
      const systemTheme = media.matches ? DARK : LIGHT;
      const resolvedTheme = theme === SYSTEM ? systemTheme : theme;
      const classList = document.documentElement.classList;

      document.documentElement.dataset.theme = theme;

      classList.toggle(DARK, resolvedTheme === DARK);
      classList.toggle(LIGHT, resolvedTheme === LIGHT);

      enableTransitions();

      return Reflect.set(target, key, receiver);
    },
  }
);

window.theme.value = null;
media.addEventListener('change', () => (window.theme.value = null));
