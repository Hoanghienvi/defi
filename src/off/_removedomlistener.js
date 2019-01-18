import defs from '../_core/defs';
import removeListener from './_removelistener';
import $ from '../_mq';

// removes dom listener from nodes bound to given key
export default function removeDomListener(
    object,
    key,
    eventName,
    selector,
    callback,
    info
) {
    const def = defs.get(object);

    if (!def) {
        return object;
    }

    const { props } = def;
    const propDef = props[key];

    if (!propDef) {
        return object;
    }

    const { bindings } = propDef;

    if (bindings) {
        // collect bound nodes and remove DOM event listener
        const nodes = Array(bindings.length);
        const eventNamespace = def.id + key;

        nofn.forEach(bindings, (binding, index) => {
            nodes[index] = binding.node;
        });

        $(nodes).off(`${eventName}.${eventNamespace}`, selector, callback);
    }

    // remove bind and unbind listeners from given key
    removeListener(object, `bind:${key}`, callback, info);
    removeListener(object, `unbind:${key}`, callback, info);

    return object;
}
