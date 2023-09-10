export function debounce(f: (...args: any[]) => void, delay = 500) {
  let timeout: number;

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      f(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}
