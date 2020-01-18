import defs from '../../_core/defs';
import forEach from '../../_helpers/foreach';

// this function removes DOM nodes of removed items
// called on splice, pull, pop and shift
export default function processRemove({
  // self,
  selfDef,
  eventOptions,
  container
}) {
  const { removed } = eventOptions;
  const { id: selfId } = selfDef;
  forEach(removed, (item) => {
    if (item && typeof item === 'object') {
      const itemDef = defs.get(item);
      if (itemDef) {
        const { renderedInArrays } = itemDef;
        const node = renderedInArrays && renderedInArrays[selfId];
        if (node) {
          delete renderedInArrays[selfId];
          container.removeChild(node);
        }
      }
    }
  });
}
