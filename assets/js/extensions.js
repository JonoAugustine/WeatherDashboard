const root = $("#root");

const neue = tag => $(`<${tag}>`);

const show = (...components) => root.empty().append(...components);
