import { Node, NODE_WIDTH, slotPosition, SLOT_COLORS } from './Node.js';
import { canConnect, connect } from './linking.js';
import { openNodePropertiesModal } from './NodePropertiesModal.js';

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

  const linkLayer = document.createElementNS(SVG_NS, 'g');
  const preview = document.createElementNS(SVG_NS, 'path');
  preview.setAttribute('fill', 'none');
  preview.setAttribute('stroke', '#9aa0a6');
  preview.setAttribute('stroke-width', '2');
  preview.setAttribute('stroke-dasharray', '6 4');
  preview.style.display = 'none';
  svg.append(linkLayer, preview);

  const byId = new Map(nodes.map((n) => [n.id, n]));
  let currentLinks = [...links];

  function redraw() {
    linkLayer.replaceChildren();
    for (const link of currentLinks) {
      const start = slotPosition(byId.get(link.from.node), 'output', link.from.slot);
      const end = slotPosition(byId.get(link.to.node), 'input', link.to.slot);
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', linkPath(start, end));
      path.setAttribute('stroke', SLOT_COLORS[link.type] ?? '#9aa0a6');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.style.pointerEvents = 'stroke';
      path.style.cursor = 'pointer';
      path.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        currentLinks = currentLinks.filter((other) => other !== link);
        redraw();
      });
      linkLayer.appendChild(path);
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

  const pointerInRoot = (event) => {
    const rect = root.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  let linkDrag = null;

  root.addEventListener(
    'pointerdown',
    (event) => {
      const dot = event.target.closest?.('.node-slot');
      if (!dot || dot.dataset.side !== 'output') return;
      event.stopPropagation();
      event.preventDefault();

      const node = byId.get(dot.dataset.node);
      const slot = Number(dot.dataset.index);
      linkDrag = { from: { node: node.id, slot }, type: dot.dataset.type };
      preview.setAttribute('stroke', SLOT_COLORS[dot.dataset.type] ?? '#9aa0a6');
      preview.style.display = '';

      const onMove = (moveEvent) => {
        const start = slotPosition(node, 'output', slot);
        const end = pointerInRoot(moveEvent);
        preview.setAttribute('d', linkPath(start, end));
      };
      const onUp = (upEvent) => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        finishLinkDrag(upEvent);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      onMove(event);
    },
    { capture: true }
  );

  function finishLinkDrag(event) {
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest?.('.node-slot');
    preview.style.display = 'none';
    if (!linkDrag || !target) {
      linkDrag = null;
      return;
    }

    const from = byId.get(linkDrag.from.node);
    const output = { node: from.id, side: 'output', type: linkDrag.type };
    const input = {
      node: target.dataset.node,
      side: target.dataset.side,
      type: target.dataset.type,
    };
    if (canConnect(output, input)) {
      const link = {
        from: { node: from.id, slot: linkDrag.from.slot },
        to: { node: input.node, slot: Number(target.dataset.index) },
        type: linkDrag.type,
      };
      currentLinks = connect(currentLinks, link);
      redraw();
    }
    linkDrag = null;
  }

  const clamp = (value, max) => Math.min(Math.max(value, 0), Math.max(max, 0));

  for (const node of nodes) {
    const el = elements.get(node.id);

    el.addEventListener('pointerdown', (event) => {
      const rect = root.getBoundingClientRect();
      node.dragOffset = {
        x: event.clientX - rect.left - node.x,
        y: event.clientY - rect.top - node.y,
      };
      el.setPointerCapture(event.pointerId);
      el.classList.add('dragging');
    });

    el.addEventListener('pointermove', (event) => {
      if (!node.dragOffset) return;
      const rect = root.getBoundingClientRect();
      node.x = clamp(event.clientX - rect.left - node.dragOffset.x, width - NODE_WIDTH);
      node.y = clamp(event.clientY - rect.top - node.dragOffset.y, height - el.offsetHeight);
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y}px`;
      redraw();
    });

    const release = () => {
      node.dragOffset = null;
      el.classList.remove('dragging');
    };
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);

    el.addEventListener('dblclick', () => {
      openNodePropertiesModal(node, (values) => {
        node.title = values.title;
        node.color = values.color;
        const header = el.querySelector('.node-header');
        header.textContent = values.title;
        header.style.background = values.color;
      });
    });
  }

  return root;
}
