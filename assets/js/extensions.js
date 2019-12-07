const root = $("#root");

const neue = tag => $(`<${tag}>`);

const show = (...components) => root.empty().append(...components);

/**
 *
 * @param {string} id
 * @returns JQuery DOM element query result of the given ID.
 */
const get = id => $(`#${id}`);
