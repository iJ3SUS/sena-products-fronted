const tooltipDirective = {
    mounted(el, binding) {
        init(el, binding);
    },
    updated(el, binding) {
        update(el, binding);
    }
}

function init(el, binding) {
    let position = binding.arg || "top";
    let tooltipText = binding.value;

    if (tooltipText) {
        el.setAttribute("position", position);
        el.setAttribute("tooltip", tooltipText);
    } else {
        el.removeAttribute("tooltip");
    }
}

function update(el, binding) {
    if (binding.value !== binding.oldValue) {
        init(el, binding); 
    }
}

export default tooltipDirective;