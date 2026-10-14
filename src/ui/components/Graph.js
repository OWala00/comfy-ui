import { Node, slotPosition, SLOT_COLORS } from './Node.js';

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

  for (const link of links) {
    const source = byId.get(link.from.node);
    const target = byId.get(link.to.node);
    const start = slotPosition(source, 'output', link.from.slot);
    const end = slotPosition(target, 'input', link.to.slot);
    const color = SLOT_COLORS[link.type] ?? '#9aa0a6';

    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', linkPath(start, end));
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
  }

  root.appendChild(svg);
  for (const node of nodes) {
    root.appendChild(Node(node));
  }
  return root;
}
