export function onBeforeElUpdated(fromEl, toEl) {
    if (fromEl.nodeName === "SCRIPT" && toEl.nodeName === "SCRIPT") {
        const script = document.createElement('script');
        [...toEl.attributes].forEach( attr => { script.setAttribute(attr.nodeName ,attr.nodeValue) })

        script.text = toEl.text;
        fromEl.replaceWith(script)
        return false;
    }
    return true;
}

export function onNodeAdded(node) {
    if (node.nodeName === 'SCRIPT') {
        var script = document.createElement('script');
        [...node.attributes].forEach( attr => { script.setAttribute(attr.nodeName ,attr.nodeValue) })

        script.text = node.text;
        node.replaceWith(script)
    }
}