export function render(element, target) {
  if (!target) throw new Error('Target element required');
  target.innerHTML = '';
  target.appendChild(element);
  return element;
}

export function createElement(type, props = {}, ...children) {
  const element = document.createElement(type);
  Object.keys(props).forEach(key => {
    if (key.startsWith('on')) {
      const event = key.slice(2).toLowerCase();
      element.addEventListener(event, props[key]);
    } else {
      element.setAttribute(key, props[key]);
    }
  });
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}
