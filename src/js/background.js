'use strict'

// Capture screenshot
function captureScreenshot(selector) {
    browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
        if (activeTab) {
            browser.tabs.sendMessage(activeTab.id, { name: 'getRectangle', selector: selector }).then((reply) => {
                // Capture screenshot
                browser.tabs.captureVisibleTab(null, { format: 'png', rect: reply }).then((data) => {
                    // Send to clipboard
                    fetch(browser.runtime.getURL(data))
                        .then(url => url.arrayBuffer())
                        .then(buffer => browser.clipboard.setImageData(buffer, 'png'));
                });
            });
        }
    });
}

// Copy contents
function copyContents(selector) {
    browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
        if (activeTab) {
            browser.tabs.sendMessage(activeTab.id, { name: 'copyContents', selector: selector });
        }
    });
}

// Trigger event
function triggerEvent(selector, event, data) {
    browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
        if (activeTab) {
            browser.tabs.sendMessage(activeTab.id, { name: 'triggerEvent', selector: selector, event: event, data: data });
        }
    });
}

// Run action
function runAction(action) {
    // Check action
    switch (action.name) {
        case 'capture-screenshot':
            captureScreenshot(action.selector);
            break;
        case 'copy-contents':
            copyContents(action.selector);
            break;
        case 'trigger-event':
            triggerEvent(action.selector, action.event, action.data);
            break;
    }
}

// Handle shortcut actions
browser.commands.onCommand.addListener((command) => {
    // Load actions from local storage
    browser.storage.local.get('actions').then((data) => {
        if (data.actions) {
            data.actions.forEach((action) => {
                // Run action
                if (action.command == command) { runAction(action); }
            });
        }
    });
});

// Handle search actions
browser.runtime.onMessage.addListener((action) => {
    // Run action
    runAction(action);
});
