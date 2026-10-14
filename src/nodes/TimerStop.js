export function createTimerStop({ seconds, onStop }) {
  if (!(seconds > 0)) {
    throw new Error('seconds must be greater than 0');
  }
  if (typeof onStop !== 'function') {
    throw new Error('onStop must be a function');
  }

  let handle = null;
  let stopped = false;

  return {
    start() {
      if (handle !== null || stopped) return;
      handle = setTimeout(() => {
        handle = null;
        stopped = true;
        onStop();
      }, seconds * 1000);
    },
    cancel() {
      if (handle !== null) {
        clearTimeout(handle);
        handle = null;
      }
    },
    get stopped() {
      return stopped;
    },
  };
}
