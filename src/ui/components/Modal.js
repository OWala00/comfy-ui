export function Modal(props) {
  const { title, content, onClose } = props;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  const header = document.createElement('div');
  header.className = 'modal-header';
  header.innerHTML = `<h2>${title}</h2><button class="modal-close">&times;</button>`;
  
  const body = document.createElement('div');
  body.className = 'modal-body';
  if (typeof content === 'string') {
    body.textContent = content;
  } else {
    body.appendChild(content);
  }
  
  modal.appendChild(header);
  modal.appendChild(body);
  overlay.appendChild(modal);
  
  const closeBtn = header.querySelector('.modal-close');
  closeBtn.addEventListener('click', onClose);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) onClose();
  });
  
  return overlay;
}
