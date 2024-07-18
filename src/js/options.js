'use strict'

// Maximum command count
const MAX_COMMANDS = 24;

// Actions html elements
const ACTIONS_HTML = {
    'copy-contents': `
        <div class="section-content">
            <h1 class="section-title">Copy Contents</h1>
            <button class="section-button" name="remove-action">Remove</button>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Action description</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="action-description" value ="Page contents" placeholder="Type a description">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Keyboard shortcut (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="keyboard-shortcut" value ="" placeholder="Type a shortcut" readonly>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Source element</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="source-element" value ="body" placeholder="Type a CSS selector">
        </div>`,
    'copy-text': `
        <div class="section-content">
            <h1 class="section-title">Copy Text</h1>
            <button class="section-button" name="remove-action">Remove</button>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Action description</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="action-description" value ="Page text" placeholder="Type a description">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Keyboard shortcut (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="keyboard-shortcut" value ="" placeholder="Type a shortcut" readonly>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Source element</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="source-element" value ="body" placeholder="Type a CSS selector">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Delimiter (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="text-delimiter" value ="" placeholder="Type a delimiter">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Match expression (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="match-expression" value ="" placeholder="Type a regular expression">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Match replacement (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="match-replacement" value ="" placeholder="Type a replacement text">
        </div>`,
    'open-location': `
        <div class="section-content">
            <h1 class="section-title">Open Location</h1>
            <button class="section-button" name="remove-action">Remove</button>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Action description</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="action-description" value ="Wikipedia site" placeholder="Type a description">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Keyboard shortcut (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="keyboard-shortcut" value ="" placeholder="Type a shortcut" readonly>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Location address</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="location-address" value ="wikipedia.org" placeholder="Type a location url address">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Address element (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="address-element" value ="" placeholder="Type a CSS selector">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Match expression (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="match-expression" value ="" placeholder="Type a regular expression">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Match replacement (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="match-replacement" value ="" placeholder="Type a replacement text">
        </div>`,
    'send-message': `
        <div class="section-content">
            <h1 class="section-title">Send Message</h1>
            <button class="section-button" name="remove-action">Remove</button>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Action description</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="action-description" value ="Contact application" placeholder="Type a description">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Keyboard shortcut (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="keyboard-shortcut" value ="" placeholder="Type a shortcut" readonly>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Application name</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="application-name" value ="custom-application" placeholder="Type a registered application name">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Message contents</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="message-contents" value ="sample message" placeholder="Type a message">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Address element (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="address-element" value ="" placeholder="Type a CSS selector">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Match expression (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="match-expression" value ="" placeholder="Type a regular expression">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Match replacement (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="match-replacement" value ="" placeholder="Type a replacement text">
        </div>`,
    'take-screenshot': `
        <div class="section-content">
            <h1 class="section-title">Take Screenshot</h1>
            <button class="section-button" name="remove-action">Remove</button>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Action description</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="action-description" value ="Page screenshot" placeholder="Type a description">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Keyboard shortcut (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="keyboard-shortcut" value ="" placeholder="Type a shortcut" readonly>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Source element</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="source-element" value ="body" placeholder="Type a CSS selector">
        </div>`,
    'trigger-event': `
        <div class="section-content">
            <h1 class="section-title">Trigger Event</h1>
            <button class="section-button" name="remove-action">Remove</button>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Action description</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="action-description" value ="Page click" placeholder="Type a description">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Keyboard shortcut (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="keyboard-shortcut" value ="" placeholder="Type a shortcut" readonly>
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Target element</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="target-element" value ="body" placeholder="Type a CSS selector">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Event name</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="event-name" value ="click" placeholder="Type an event name">
        </div>
        <div class="section-content">
            <div class="section-label">
                <label>Event data (optional)</label>
                <div class="section-error hidden">
                    <span class="section-error-message"></span>
                </div>
            </div>
            <input class="section-text" type="text" name="event-data" value ="" placeholder="Type a json string">
        </div>`
}

// Add action
function addAction(event) {
    // Hide dropdown list
    document.querySelector('#actions-list').classList.toggle('hidden', true);

    // Set button inactive
    document.querySelector('#actions-add').classList.toggle('active', false);

    // Create action elements
    let name = event.target.dataset.action;
    let section = document.createElement('div');
    section.classList.add('section');
    section.dataset.action = name;
    section.innerHTML = ACTIONS_HTML[name];

    // Add elements to page
    document.body.appendChild(section);

    // Handle remove action
    section.querySelector('button[name="remove-action"]').addEventListener('click', removeAction);

    // Handle edit action shortcut
    section.querySelector('input[name="keyboard-shortcut"]').addEventListener('keyup', editShortcut);

    // Handle hide action shortcut error
    section.querySelector('input[name="keyboard-shortcut"]').addEventListener('blur', hideError);

    // Handle edit action property
    section.querySelectorAll('input[type="text"]:not([name=shortcut])').forEach((element) => {
        element.addEventListener('change', editProperty);
    });

    // Handle show action property error
    section.querySelectorAll('input[type="text"]:not([name=shortcut])').forEach((element) => {
        element.addEventListener('focus', showError);
    });

    // Handle hide action property error
    section.querySelectorAll('input[type="text"]:not([name=shortcut])').forEach((element) => {
        element.addEventListener('blur', hideError);
    });

    // Enable save actions
    document.querySelector('#actions-save').disabled = document.querySelector('input[data-error]');
}

// Remove action
function removeAction(event) {
    // Remove action elements
    let section = event.target.closest('.section');
    document.body.removeChild(section);

    // Enable save actions
    document.querySelector('#actions-save').disabled = document.querySelector('input[data-error]');
}

// Export actions
function exportActions() {
    // Load actions from local storage
    browser.storage.local.get('actions').then((data) => {
        if (data.actions) {
            // Remove commands
            data.actions.forEach((action) => { delete action.command; });

            // Save actions to file
            let url = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data.actions));
            let anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'actions.json';
            anchor.click();
            anchor.remove();
        }
    });
}

// Import actions
function importActions() {
    // Create input element
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.multiple = false;
    input.addEventListener('change', (event) => {
        if (event.target.files) {
            event.target.files[0].text().then((text) => {
                let actions = JSON.parse(text);
                let counter = 1;
                actions.forEach((action) => {
                    // Update commands
                    action.command = '';
                    if (action.shortcut) {
                        action.command = 'command-' + counter;
                        counter = counter + 1;

                        // Update browser from action shortcut
                        let command = new Object();
                        command.name = action.command;
                        command.shortcut = action.shortcut;
                        command.description = action.title + ' (' + action.description + ')';
                        browser.commands.update(command);
                    }
                });

                // Update browser for undefined commands
                for (let i = counter; i <= MAX_COMMANDS; i++) {
                    let command = new Object();
                    command.name = 'command-' + i;
                    command.shortcut = '';
                    command.description = 'Action not defined';
                    browser.commands.update(command);
                }

                // Save actions to local storage
                browser.storage.local.set({ actions }).then(location.reload());

                // Disable save actions
                document.querySelector('#actions-save').disabled = true;
            });
        }
    });

    // Load actions from file
    input.click();
    input.remove();
}

// Save actions
function saveActions() {
    // Get actions
    let counter = 1;
    let actions = [];
    document.querySelectorAll('.section[data-action]').forEach((section) => {
        // Get action properties
        let action = new Object();
        action.name = section.dataset.action;
        action.title = section.querySelector('.section-title').innerText;
        action.description = section.querySelector('input[name="action-description"]').value.trim();
        action.shortcut = section.querySelector('input[name="keyboard-shortcut"]').value;
        if (section.querySelector('input[name="source-element"]')) { action.selector = section.querySelector('input[name="source-element"]').value.trim(); }
        if (section.querySelector('input[name="target-element"]')) { action.selector = section.querySelector('input[name="target-element"]').value.trim(); }
        if (section.querySelector('input[name="address-element"]')) { action.selector = section.querySelector('input[name="address-element"]').value.trim(); }
        if (section.querySelector('input[name="location-address"]')) { action.address = section.querySelector('input[name="location-address"]').value.trim(); }
        if (section.querySelector('input[name="application-name"]')) { action.application = section.querySelector('input[name="application-name"]').value.trim(); }
        if (section.querySelector('input[name="message-contents"]')) { action.message = section.querySelector('input[name="message-contents"]').value.trim(); }
        if (section.querySelector('input[name="event-name"]')) { action.event = section.querySelector('input[name="event-name"]').value.trim(); }
        if (section.querySelector('input[name="event-data"]')) { action.data = section.querySelector('input[name="event-data"]').value.trim(); }
        if (section.querySelector('input[name="text-delimiter"]')) { action.delimiter = section.querySelector('input[name="text-delimiter"]').value.trim(); }
        if (section.querySelector('input[name="match-expression"]')) { action.expression = section.querySelector('input[name="match-expression"]').value.trim(); }
        if (section.querySelector('input[name="match-replacement"]')) { action.replacement = section.querySelector('input[name="match-replacement"]').value.trim(); }

        // Set action command
        action.command = '';
        if (action.shortcut) {
            action.command = 'command-' + counter;
            counter = counter + 1;

            // Update browser from action shortcut
            let command = new Object();
            command.name = action.command;
            command.shortcut = action.shortcut;
            command.description = action.title + ' (' + action.description + ')';
            browser.commands.update(command);
        }

        // Push action
        actions.push(action)
    });

    // Update browser for undefined commands
    for (let i = counter; i <= MAX_COMMANDS; i++) {
        let command = new Object();
        command.name = 'command-' + i;
        command.shortcut = '';
        command.description = 'Action not defined';
        browser.commands.update(command);
    }

    // Save actions to local storage
    browser.storage.local.set({ actions });

    // Disable save actions
    document.querySelector('#actions-save').disabled = true;
}

// Edit action shortcut
function editShortcut(event) {
    // Ignore modifiers and tab
    if ((event.key == 'Control') || (event.key == 'Shift') || (event.key == 'Alt') || (event.key == 'Tab')) return;

    // Get container
    let container = event.target.closest('.section-content');

    // Check backspace
    if (event.key == 'Backspace') {
        // Clear shortcut
        if (event.target.value) {
            // Hide error message
            container.querySelector('.section-error').classList.toggle('hidden', true);

            // Clear action shortcut
            event.target.value = '';

            // Check commander shortcut
            if (event.target.id == 'actions-shortcut') {
                // Update browser from commander shortcut
                let command = new Object();
                command.name = '_execute_browser_action';
                command.shortcut = '';
                command.description = 'Commander';
                browser.commands.update(command);
            } else {
                // Enable save actions
                document.querySelector('#actions-save').disabled = document.querySelector('input[data-error]');
            }
        }

        return;
    }

    // Get other shortcuts
    let shortcuts = [];
    document.querySelectorAll('.section').forEach((other) => {
        if (other != container.parentElement) {
            let input = other.querySelector('input[name="keyboard-shortcut"]');
            if (input && input.value) {
                shortcuts.push(input.value);
            }
        }
    });

    // Check max shortcuts
    if (shortcuts.length == MAX_COMMANDS) {
        // Show max reached
        container.querySelector('.section-error-message').innerText = 'Shortcuts count has reached the supported limit.';
        container.querySelector('.section-error').classList.toggle('hidden', false);
        return;
    }

    // Set shortcut key
    let key = '';
    let keyFn = false;

    // Check function key
    if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(event.key)) {
        key = event.key;
        keyFn = true;
    }

    // Check letter key
    if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(event.key.toUpperCase())) {
        key = event.key.toUpperCase();
    }

    // Check number key
    if ('0123456789'.includes(event.key)) {
        key = event.key;
    }

    // Check comma key
    if (event.key == ',') {
        key = 'Comma';
    }

    // Check period key
    if (event.key == '.') {
        key = 'Period';
    }

    // Check space key
    if (event.key == ' ') {
        key = 'Space';
    }

    // Check navigation key
    if (['Home', 'End', 'PageUp', 'PageDown', 'Space', 'Insert', 'Delete'].includes(event.key)) {
        key = event.key;
    }

    // Check arrow key
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        key = event.key.replace('Arrow', '');
    }

    // Set action shortcut
    let shortcut = '';
    if (event.ctrlKey) { shortcut = shortcut + 'Ctrl+'; }
    if (event.shiftKey) { shortcut = shortcut + 'Shift+'; }
    if (event.altKey) { shortcut = shortcut + 'Alt+'; }
    shortcut = shortcut + key;

    // Check action shortcut
    if (!key) {
        // Key not supported
        container.querySelector('.section-error-message').innerText = 'Shortcuts key typed is not supported';
        container.querySelector('.section-error').classList.toggle('hidden', false);
    } else if (!event.ctrlKey && !event.altKey && !keyFn) {
        // Modifiers missing
        container.querySelector('.section-error-message').innerText = 'Shortcut is missing Ctrl or Alt modifiers';
        container.querySelector('.section-error').classList.toggle('hidden', false);
    } else if (event.ctrlKey && event.altKey && event.shiftKey) {
        // Extra modifiers
        container.querySelector('.section-error-message').innerText = 'Shortcut contains more than two modifiers';
        container.querySelector('.section-error').classList.toggle('hidden', false);
    } else if (shortcuts.includes(shortcut)) {
        // Already assigned
        container.querySelector('.section-error-message').innerText = 'Shortcut is already assigned to another action';
        container.querySelector('.section-error').classList.toggle('hidden', false);
    } else {
        // Set shortcut
        if (event.target.value != shortcut) {
            // Hide error message
            container.querySelector('.section-error').classList.toggle('hidden', true);

            // Set action shortcut
            event.target.value = shortcut;

            // Check commander shortcut
            if (event.target.id == 'actions-shortcut') {
                // Update browser from commander shortcut
                let command = new Object();
                command.name = '_execute_browser_action';
                command.shortcut = shortcut;
                command.description = 'Commander';
                browser.commands.update(command);
            } else {
                // Enable save actions
                document.querySelector('#actions-save').disabled = document.querySelector('input[data-error]');
            }
        }
    }
}

// Edit action property
function editProperty(event) {
    // Check action description
    if (event.target.name == 'action-description') {
        if (event.target.value.trim()) {
            // Description valid
            delete event.target.dataset.error;
        } else {
            // Description empty
            event.target.dataset.error = 'Action description is empty';
        }
    }

    // Check element selector
    if ((event.target.name == 'source-element') || (event.target.name == 'target-element')) {
        if (event.target.value.trim()) {
            let div = document.createElement('div');
            try {
                // Selector valid
                div.querySelector(event.target.value);
                delete event.target.dataset.error;
            } catch {
                // Syntax error
                event.target.dataset.error = 'Element selector syntax is not valid';
            } finally {
                div.remove();
            }
        } else {
            // Selector empty
            event.target.dataset.error = 'Element selector is empty';
        }
    }

    // Check optional element selector
    if (event.target.name == 'address-element') {
        if (event.target.value.trim()) {
            let div = document.createElement('div');
            try {
                // Selector valid
                div.querySelector(event.target.value);
                delete event.target.dataset.error;
            } catch {
                // Syntax error
                event.target.dataset.error = 'Element selector syntax is not valid';
            } finally {
                div.remove();
            }
        } else {
            // Selector optional
            delete event.target.dataset.error;
        }
    }

    // Check location address
    if (event.target.name == 'location-address') {
        if (event.target.value.trim()) {
            // Address valid
            delete event.target.dataset.error;
        } else {
            // Address empty
            event.target.dataset.error = 'Loction address is empty';
        }
    }

    // Check application name
    if (event.target.name == 'application-name') {
        if (event.target.value.trim()) {
            // Application valid
            delete event.target.dataset.error;
        } else {
            // Application empty
            event.target.dataset.error = 'Application name is empty';
        }
    }

    // Check message contents
    if (event.target.name == 'message-contents') {
        if (event.target.value.trim()) {
            // Message valid
            delete event.target.dataset.error;
        } else {
            // Message empty
            event.target.dataset.error = 'Message is empty';
        }
    }

    // Check event name
    if (event.target.name == 'event-name') {
        if (event.target.value.trim()) {
            // Name valid
            delete event.target.dataset.error;
        } else {
            // Name empty
            event.target.dataset.error = 'Event name is empty';
        }
    }

    // Check event data
    if (event.target.name == 'event-data') {
        if (event.target.value.trim()) {
            try {
                // Data valid
                JSON.parse(event.target.value.trim());
                delete event.target.dataset.error;
            } catch {
                // Syntax error
                event.target.dataset.error = 'Event data object is not valid';
            }
        } else {
            // Data optional
            delete event.target.dataset.error;
        }
    }

    // Check match expression
    if (event.target.name == 'match-expression') {
        if (event.target.value.trim()) {
            try {
                // Regexp valid
                new RegExp(event.target.value.trim());
                delete event.target.dataset.error;
            } catch {
                // Syntax error
                event.target.dataset.error = 'Regular expression syntax is not valid';
            }
        } else {
            // Regexp optional
            delete event.target.dataset.error;
        }
    }

    // Enable save actions
    document.querySelector('#actions-save').disabled = document.querySelector('input[data-error]');
}

// Show error message
function showError(event) {
    if (event.target.dataset.error) {
        // Get container
        let container = event.target.closest('.section-content');

        // Show error message
        container.querySelector('.section-error-message').innerText = event.target.dataset.error;
        container.querySelector('.section-error').classList.toggle('hidden', false);
    }
}

// Hide error message
function hideError(event) {
    // Get container
    let container = event.target.closest('.section-content');

    // Hide error message
    container.querySelector('.section-error').classList.toggle('hidden', true);
}

// Load options
function loadOptions() {
    // Handle export actions
    document.querySelector('#actions-export').addEventListener('click', exportActions);

    // Handle import actions
    document.querySelector('#actions-import').addEventListener('click', importActions);

    // Update commander shortcut from browser
    browser.commands.getAll().then((commands) => {
        commands.forEach((command) => { if (command.name == '_execute_browser_action') { document.querySelector('#actions-shortcut').value = command.shortcut; } });
    });

    // Handle edit commander shortcut
    document.querySelector('#actions-shortcut').addEventListener('keyup', editShortcut);

    // Handle hide commander shortcut error
    document.querySelector('#actions-shortcut').addEventListener('blur', hideError);

    // Handle save actions
    document.querySelector('#actions-save').addEventListener('click', saveActions);

    // Handle actions list dropdown
    document.querySelector('#actions-add').addEventListener('click', (event) => {
        // Show dropdown
        let dropdown = document.querySelector('#actions-list');
        dropdown.classList.toggle('hidden', false);
        dropdown.focus();

        // Set button active
        let button = event.target;
        button.classList.toggle('active', true);
    });

    // Handle actions list hide
    document.querySelector('#actions-list').addEventListener('blur', (event) => {
        // Hide dropdown
        let dropdown = event.target;
        dropdown.classList.toggle('hidden', true);

        // Set button inactive
        let button = document.querySelector('#actions-add');
        button.classList.toggle('active', false);
    });

    // Handle actions list keyboard navigation
    document.querySelector('#actions-list').addEventListener('keydown', (event) => {
        if (event.key == 'ArrowUp') {
            // Navigate up
            if (!event.target.querySelector('.section-dropdown-item.active:first-of-type')) {
                let current = event.target.querySelector('.section-dropdown-item.active');
                current.classList.toggle('active', false);
                current.previousElementSibling.classList.toggle('active', true);
            }
        } else if (event.key == 'ArrowDown') {
            // Navigate down
            if (!event.target.querySelector('.section-dropdown-item.active:last-of-type')) {
                let current = event.target.querySelector('.section-dropdown-item.active');
                current.classList.toggle('active', false);
                current.nextElementSibling.classList.toggle('active', true);
            }
        } else if ((event.key == 'Enter') || (event.key == ' ')) {
            // Select action
            let current = event.target.querySelector('.section-dropdown-item.active');
            current.click();
        } else if (event.key == 'Escape') {
            // Hide actions list on escape key
            event.target.blur();
        }
    });

    // Handle add action
    document.querySelectorAll('#actions-list .section-dropdown-item').forEach((item) => {
        item.addEventListener('click', addAction);
    });

    // Load actions from local storage
    browser.storage.local.get('actions').then((data) => {
        if (data.actions) {
            data.actions.forEach((action) => {
                // Create action elements
                let section = document.createElement('div');
                section.classList.add('section');
                section.dataset.action = action.name;
                section.innerHTML = ACTIONS_HTML[action.name];

                // Update action elements
                section.querySelector('input[name="action-description"]').value = action.description;
                section.querySelector('input[name="keyboard-shortcut"]').value = action.shortcut;
                if (section.querySelector('input[name="source-element"]')) { section.querySelector('input[name="source-element"]').value = action.selector; }
                if (section.querySelector('input[name="target-element"]')) { section.querySelector('input[name="target-element"]').value = action.selector; }
                if (section.querySelector('input[name="address-element"]')) { section.querySelector('input[name="address-element"]').value = action.selector; }
                if (section.querySelector('input[name="location-address"]')) { section.querySelector('input[name="location-address"]').value = action.address; }
                if (section.querySelector('input[name="application-name"]')) { section.querySelector('input[name="application-name"]').value = action.application; }
                if (section.querySelector('input[name="message-contents"]')) { section.querySelector('input[name="message-contents"]').value = action.message; }
                if (section.querySelector('input[name="event-name"]')) { section.querySelector('input[name="event-name"]').value = action.event; }
                if (section.querySelector('input[name="event-data"]')) { section.querySelector('input[name="event-data"]').value = action.data; }
                if (section.querySelector('input[name="text-delimiter"]')) { section.querySelector('input[name="text-delimiter"]').value = action.delimiter; }
                if (section.querySelector('input[name="match-expression"]')) { section.querySelector('input[name="match-expression"]').value = action.expression; }
                if (section.querySelector('input[name="match-replacement"]')) { section.querySelector('input[name="match-replacement"]').value = action.replacement; }

                // Update action shortcut from browser
                browser.commands.getAll().then((commands) => {
                    commands.forEach((command) => {
                        if ((command.name == action.command) && (command.shortcut != action.shortcut)) {
                            // Update shortcut
                            section.querySelector('input[name="keyboard-shortcut"]').value = command.shortcut;

                            // Enable save actions
                            document.querySelector('#actions-save').disabled = false;
                        }
                    });
                });

                // Add action elements to page
                document.body.appendChild(section);

                // Handle remove action
                section.querySelector('button[name="remove-action"]').addEventListener('click', removeAction);

                // Handle edit action shortcut
                section.querySelector('input[name="keyboard-shortcut"]').addEventListener('keyup', editShortcut);

                // Handle hide action shortcut error
                section.querySelector('input[name="keyboard-shortcut"]').addEventListener('blur', hideError);

                // Handle edit action property
                section.querySelectorAll('input[type="text"]:not([name=shortcut])').forEach((element) => {
                    element.addEventListener('change', editProperty);
                });

                // Handle show action property error
                section.querySelectorAll('input[type="text"]:not([name=shortcut])').forEach((element) => {
                    element.addEventListener('focus', showError);
                });

                // Handle hide action property error
                section.querySelectorAll('input[type="text"]:not([name=shortcut])').forEach((element) => {
                    element.addEventListener('blur', hideError);
                });
            });
        }
    });
}

// Handle load options
document.addEventListener('DOMContentLoaded', loadOptions);
