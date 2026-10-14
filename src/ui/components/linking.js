export function canConnect(output, input) {
  return (
    output.side === 'output' &&
    input.side === 'input' &&
    output.node !== input.node &&
    output.type === input.type
  );
}

export function connect(links, link) {
  const others = links.filter(
    (existing) => !(existing.to.node === link.to.node && existing.to.slot === link.to.slot)
  );
  return [...others, link];
}
