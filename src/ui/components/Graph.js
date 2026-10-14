import { Node, NODE_WIDTH, slotPosition, SLOT_COLORS } from './Node.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function linkPath(from, to) {
  const curve = Math.max(60, Math.abs(to.x - from.x) * 0.5);
  return `M ${from.x} ${from.y} C ${from.x + curve} ${from.y}, ${to.x - curve} ${to.y}, ${to.x} ${to.y}`;
}

export function Graph({ width, height, nodes, links = [] }) {
  const root = document.createElement('div');
  root.className = 'graph';
  root.style.width = `${width}px`;
  root.style.height = `${height}px`;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'graph-links');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.innerHTML = `
    <defs>
      <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#4a4a4a"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="#353535"/>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>
  `;

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const drawn = links.map((link) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('stroke', SLOT_COLORS[link.type] ?? '#9aa0a6');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
    return { link, path };
  });

  function redraw() {
    for (const { link, path } of drawn) {
      const start = slotPosition(byId.get(link.from.node), 'output', link.from.slot);
      const end = slotPosition(byId.get(link.to.node), 'input', link.to.slot);
      path.setAttribute('d', linkPath(start, end));
    }
  }

  root.appendChild(svg);
  const elements = new Map();
  for (const node of nodes) {
    const el = Node(node);
    elements.set(node.id, el);
    root.appendChild(el);
  }
  redraw();

  let drag = null;
  const clamp = (value, max) => Math.min(Math.max(value, 0), Math.max(max, 0));

  for (const node of nodes) {
    const el = elements.get(node.id);

    el.addEventListener('pointerdown', (event) => {
      const rect = root.getBoundingClientRect();
      drag = {
        id: node.id,
        offsetX: event.clientX - rect.left - node.x,
        offsetY: event.clientY - rect.top - node.y,
      };
      el.setPointerCapture(event.pointerId);
      el.classList.add('dragging');
    });

    el.addEventListener('pointermove', (event) => {
      if (!drag || drag.id !== node.id) return;
      const rect = root.getBoundingClientRect();
      node.x = clamp(event.clientX - rect.left - drag.offsetX, width - NODE_WIDTH);
      node.y = clamp(event.clientY - rect.top - drag.offsetY, height - el.offsetHeight);
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y}px`;
      redraw();
    });

    const release = () => {
      drag = null;
      el.classList.remove('dragging');
    };
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
  }

  return root;
}
