'use strict'

// Copy contents
function copyContents(selector) {
    browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
        if (activeTab) {
            browser.tabs.sendMessage(activeTab.id, { name: 'copyContents', selector: selector });
        }
    });
}

// Copy text
function copyText(selector, delimiter, expression, replacement) {
    browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
        if (activeTab) {
            browser.tabs.sendMessage(activeTab.id, { name: 'copyText', selector: selector, delimiter: delimiter, expression: expression, replacement: replacement });
        }
    });
}

// Open location
function openLocation(address, selector, expression, replacement) {
    // Check address
    if (/{sel}|{rsel}|{txt}|{rtxt}/.test(address)) {
        browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
            if (activeTab) {
                browser.tabs.sendMessage(activeTab.id, { name: 'replaceAddress', address: address, selector: selector, expression: expression, replacement: replacement }).then((reply) => {
                    // Open window
                    browser.windows.create({ url: reply });
                });
            }
        });
    } else {
        // Open window
        browser.windows.create({ url: address });
    }
}

// Send message
function sendMessage(application, message, selector, expression, replacement) {
    // Check message
    console.log(message);
    if (/{sel}|{rsel}|{txt}|{rtxt}/.test(message)) {
        browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
            if (activeTab) {
                browser.tabs.sendMessage(activeTab.id, { name: 'replaceMessage', message: message, selector: selector, expression: expression, replacement: replacement }).then((reply) => {
                    // send message
                    browser.runtime.sendNativeMessage(application, reply);
                });
            }
        });
    } else {
        // send message
        browser.runtime.sendNativeMessage(application, message);
    }
}

// Take screenshot
function takeScreenshot(selector) {
    browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
        if (activeTab) {
            browser.tabs.sendMessage(activeTab.id, { name: 'getRectangle', selector: selector }).then((reply) => {
                // Take screenshot
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
        case 'copy-contents':
            copyContents(action.selector);
            break;
        case 'copy-text':
            copyText(action.selector, action.delimiter, action.expression, action.replacement);
            break;
        case 'open-location':
            openLocation(action.address, action.selector, action.expression, action.replacement);
            break;
        case 'send-message':
            sendMessage(action.application, action.message, action.selector, action.expression, action.replacement);
            break;
        case 'take-screenshot':
            takeScreenshot(action.selector);
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
