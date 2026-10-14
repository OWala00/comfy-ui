export function Button(props) {
  const { label, onClick, disabled = false, variant = 'primary' } = props;
  const button = document.createElement('button');
  button.textContent = label;
  button.disabled = disabled;
  button.className = `btn btn-${variant}`;
  if (onClick) button.addEventListener('click', onClick);
  return button;
}

export function IconButton(props) {
  const { icon, onClick, size = 'md' } = props;
  const btn = document.createElement('button');
  btn.className = `icon-btn icon-btn-${size}`;
  btn.innerHTML = icon;
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}
