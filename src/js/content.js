'use strict'

// Copy contents
function copyContents(selector) {
    // Find element in main document
    let element = document.querySelector(selector);
    let elementWindow = window;
    let elementDocument = elementWindow.document;

    // Find element in frame documents
    if (!element) {
        let frames = document.getElementsByTagName('iframe');
        for (let frame of frames) {
            if (frame.contentWindow.document) {
                elementWindow = frame.contentWindow;
                elementDocument = elementWindow.document;
                element = elementDocument.querySelector(selector);
            }
        }
    }

    // Copy element contents
    if (element) {
        // Save property
        let editable = element.contentEditable;

        // Create range
        let range = elementDocument.createRange();
        element.contentEditable = true;
        range.selectNode(element);

        // Copy selection
        let selection = elementWindow.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        elementDocument.execCommand('copy');
        selection.removeAllRanges();

        // Restore property
        element.contentEditable = editable;
    }
}

// Get rectangle
function getRectangle(selector) {
    // Find element in main document
    let element = document.querySelector(selector);

    // Find element in frame documents
    if (!element) {
        let frames = document.getElementsByTagName('iframe');
        for (let frame of frames) {
            if (frame.contentWindow.document) {
                element = frame.contentWindow.document.querySelector(selector);
            }
        }
    }

    // Return element rect
    let rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
}

// Trigger event
function triggerEvent(selector, event, data) {
    // Find element in main document
    let element = document.querySelector(selector);
    let elementWindow = window;
    let elementDocument = elementWindow.document;

    // Find element in frame documents
    if (!element) {
        let frames = document.getElementsByTagName('iframe');
        for (let frame of frames) {
            if (frame.contentWindow.document) {
                elementWindow = frame.contentWindow;
                elementDocument = elementWindow.document;
                element = elementDocument.querySelector(selector);
            }
        }
    }

    // Trigger element event
    if (element) {
        if (data) {
            element.dispatchEvent(new Event(event, data));
        } else {
            element.dispatchEvent(new Event(event));
        }
    }
}

// Handle background messages
browser.runtime.onMessage.addListener((message) => {
    // Handle received message
    switch (message.name) {
        case 'copyContents':
            copyContents(message.selector);
            return Promise.resolve();
        case 'getRectangle':
            let rect = getRectangle(message.selector);
            return Promise.resolve(rect);
        case 'triggerEvent':
            triggerEvent(message.selector, message.event, message.data);
            return Promise.resolve();
    }
});
