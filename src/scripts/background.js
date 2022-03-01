'use strict'

// Handle requested action
let handleAction = (action) => {
    switch (action.name) {
        case 'copy-contents':
            browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
                if (activeTab) {
                    browser.tabs.sendMessage(activeTab.id, action);
                }
            });
            break;
        case 'copy-screenshot':
            browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
                if (activeTab) {
                    browser.tabs.sendMessage(activeTab.id, action).then((reply) => {
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
            break;
    }
}

// Listener for extension commands
browser.commands.onCommand.addListener((command) => {
    // Load actions from local storage
    browser.storage.local.get('actions').then((data) => {
        let actions = data.actions;

        // Handle command action
        if (actions[command]) {
            handleAction(actions[command]);
        }
    });
});
