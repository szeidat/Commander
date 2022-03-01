'use strict'

// Handle copy contents
let copyContents = (selector) => {
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

    // Copy element contents
    if (element) {
        // Create container
        let div = document.createElement('div');
        div.contentEditable = true;
        div.style = 'position: fixed; top: -10000;';
        div.innerHTML = element.innerHTML;
        document.body.appendChild(div);

        // Select range
        let range = document.createRange();
        range.selectNodeContents(div);

        // Copy selection
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        document.body.removeChild(div);
    }
}

// Handle get rectangle
let getRectangle = (selector) => {
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

// Listener for background messages
browser.runtime.onMessage.addListener((action, sender, sendResponse) => {
    // Handle requested action
    switch (action.name) {
        case 'copy-contents':
            copyContents(action.selector);
            return Promise.resolve();
        case 'copy-screenshot':
            let rect = getRectangle(action.selector);
            return Promise.resolve(rect);
    }
})
