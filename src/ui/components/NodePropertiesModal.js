const DEFAULT_COLOR = '#222222';

export function openNodePropertiesModal(node, onSave) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <form class="modal" autocomplete="off">
      <h2>Node properties</h2>
      <label>Title
        <input name="title" maxlength="40" required>
      </label>
      <label>Color
        <input name="color" type="color">
      </label>
      <div class="modal-actions">
        <button type="button" data-cancel>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  `;

  const form = overlay.querySelector('form');
  form.elements.namedItem('title').value = node.title;
  form.elements.namedItem('color').value = node.color ?? DEFAULT_COLOR;

  const close = () => overlay.remove();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onSave({
      title: form.elements.namedItem('title').value.trim(),
      color: form.elements.namedItem('color').value,
    });
    close();
  });
  form.querySelector('[data-cancel]').addEventListener('click', close);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  document.body.appendChild(overlay);
  form.elements.namedItem('title').focus();
}
