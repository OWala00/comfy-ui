export const NODE_WIDTH = 190;
export const HEADER_HEIGHT = 26;
export const ROW_HEIGHT = 20;
export const BODY_PADDING = 6;

export const SLOT_COLORS = {
  STRING: '#ff9f43',
  BOOLEAN: '#e05555',
  NUMBER: '#7bd389',
  DATA: '#7aa2f7',
  STATE: '#c586c0',
  TARGET: '#4fc1ff',
};

export function slotPosition(node, side, index) {
  const x = side === 'output' ? node.x + NODE_WIDTH : node.x;
  const y = node.y + HEADER_HEIGHT + BODY_PADDING + index * ROW_HEIGHT + ROW_HEIGHT / 2;
  return { x, y };
}

export function Node({ id, title, x, y, inputs = [], outputs = [] }) {
  const el = document.createElement('div');
  el.className = 'node';
  el.dataset.id = id;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.width = `${NODE_WIDTH}px`;

  const header = document.createElement('div');
  header.className = 'node-header';
  header.textContent = title;
  el.appendChild(header);

  const body = document.createElement('div');
  body.className = 'node-body';
  const rows = Math.max(inputs.length, outputs.length);

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.className = 'node-row';
    row.style.height = `${ROW_HEIGHT}px`;

    const left = document.createElement('span');
    left.className = 'node-slot-label';
    if (inputs[i]) {
      const dot = document.createElement('i');
      dot.className = 'node-slot';
      dot.style.background = SLOT_COLORS[inputs[i].type] ?? '#9aa0a6';
      left.appendChild(dot);
      left.appendChild(document.createTextNode(inputs[i].name));
    }

    const right = document.createElement('span');
    right.className = 'node-slot-label node-slot-label-right';
    if (outputs[i]) {
      right.appendChild(document.createTextNode(outputs[i].name));
      const dot = document.createElement('i');
      dot.className = 'node-slot';
      dot.style.background = SLOT_COLORS[outputs[i].type] ?? '#9aa0a6';
      right.appendChild(dot);
    }

    row.appendChild(left);
    row.appendChild(right);
    body.appendChild(row);
  }

  el.appendChild(body);
  return el;
}
