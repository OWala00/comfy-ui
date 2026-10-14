export function createStore(initialState) {
  let state = initialState;
  const listeners = [];
  
  return {
    getState() {
      return state;
    },
    setState(newState) {
      if (typeof newState === 'function') {
        state = newState(state);
      } else {
        state = { ...state, ...newState };
      }
      listeners.forEach(fn => fn(state));
    },
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    }
  };
}
