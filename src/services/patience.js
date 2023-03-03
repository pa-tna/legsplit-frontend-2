export function debouncedThrottle(fn, delay) {
  // Don't call the function at first for at least delay ms,
  // then call up to every delay ms

  let waiting = false;
  let timeout;
  let res;
  let rej;
  let currentArgs;

  return {
    run: (...args) => {
      currentArgs = args;
      if (!waiting) {
        timeout = setTimeout(() => {
          waiting = false;
          try {
            res(fn.apply(null, currentArgs));
          } catch (error) {
            promise = null;
            rej(error);
          }
        }, delay);
        waiting = true;
      }
      return new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      })
    },
    cancel: () => {
      if (timeout) {
        clearTimeout(timeout);
        waiting = false;
        res = null;
        rej = null;
      }
    },
  };
}
