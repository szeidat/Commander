'use strict'

// Find element
function findElement(selector, document) {
    // Find in document
    let element = document.querySelector(selector);
    element.window = window;

    // Find in frames
    if (!element) {
        let frames = document.getElementsByTagName('iframe');
        for (let frame of frames) {
            if (frame.contentWindow.document) {
                element = findElement(selector, frame.contentWindow.document);
                if (element) {
                    element.window = frame.contentWindow;
                    break;
                }
            }
        }
    }

    return element;
}

// Find elements
function findElements(selector, document) {
    // Find in document
    let elements = document.querySelectorAll(selector);

    // Find in frames
    if (!Array.isArray(elements) || !elements.length) {
        let frames = document.getElementsByTagName('iframe');
        for (let frame of frames) {
            if (frame.contentWindow.document) {
                elements = findElement(selector, frame.contentWindow.document);
                if (Array.isArray(elements) && elements.length) break;
            }
        }
    }

    return elements;
}

// Copy contents
function copyContents(selector) {
    // Find element
    let element = findElement(selector, document);

    // Save property
    let editable = element.contentEditable;

    // Create range
    let range = element.window.document.createRange();
    element.contentEditable = true;
    range.selectNode(element);

    // Copy selection
    let selection = element.window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    element.window.document.execCommand('copy');
    selection.removeAllRanges();

    // Restore property
    element.contentEditable = editable;
}

// Copy text
function copyText(selector, delimiter, expression, replacement) {
    // Find elements
    let elements = findElements(selector, document);
    let regexp = new RegExp(expression);
    let textlist = [];
    for (let element of elements) textlist.push(element.innerText.replace(regexp, replacement));

    // Copy text
    if (delimiter) navigator.clipboard.writeText(textlist.join(delimiter));
    else navigator.clipboard.writeText(textlist.join('\n'));
}

// Get rectangle
function getRectangle(selector) {
    // Find element
    let element = findElement(selector, document);

    // Return element rect
    let rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
}

// Trigger event
function triggerEvent(selector, event, data) {
    // Find element
    let element = findElement(selector, document);

    // Send event
    if (data) { element.dispatchEvent(new Event(event, data)); }
    else { element.dispatchEvent(new Event(event)); }
}

// Replace address
function replaceAddress(address, selector, expression, replacement) {
    let replaced = address;

    // Replace using selection
    if (/{sel}/.test(address)) {
        replaced = address.replace(/{sel}/, window.getSelection().toString());
    }

    // Replace using selection and regexp
    if (/{rsel}/.test(address)) {
        let regexp = new RegExp(expression);
        replaced = address.replace(/{rsel}/, window.getSelection().toString().replace(regexp, replacement));
    }

    // Replace using element
    if (/{txt}/.test(address)) {
        let element = findElement(selector, document);
        replaced = address.replace(/{txt}/, element.innerText);
    }

    // Replace using element and regexp
    if (/{rtxt}/.test(address)) {
        let element = findElement(selector, document);
        let regexp = new RegExp(expression);
        replaced = address.replace(/{rtxt}/, element.innerText.replace(regexp, replacement));
    }

    return replaced;
}

// Handle background messages
browser.runtime.onMessage.addListener((message) => {
    // Handle received message
    switch (message.name) {
        case 'copyContents':
            copyContents(message.selector);
            return Promise.resolve();
        case 'copyText':
            copyText(message.selector, message.delimiter, message.expression, message.replacement);
            return Promise.resolve();
        case 'getRectangle':
            let rect = getRectangle(message.selector);
            return Promise.resolve(rect);
        case 'triggerEvent':
            triggerEvent(message.selector, message.event, message.data);
            return Promise.resolve();
        case 'replaceAddress':
            let url = replaceAddress(message.address, message.selector, message.expression, message.replacement);
            return Promise.resolve(url);
    }
});
