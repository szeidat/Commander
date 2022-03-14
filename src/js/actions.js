'use strict'

// Search actions
function searchActions(event) {
    // Ignore navigation keys
    if (!['Tab', 'ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
        // Get active action
        let current = document.querySelector('.section-item.active');

        // Search actions
        let search = document.querySelector('#actions-search').value.trim().toLowerCase();
        document.querySelectorAll('.section-item').forEach((item) => {
            if ((item.dataset.title + ' ' + item.dataset.description).toLocaleLowerCase().includes(search)) {
                item.classList.toggle('hidden', false);
            } else {
                item.classList.toggle('hidden', true);
            }
        });

        // Set active action
        let matched = document.querySelector('.section-item:not(.hidden)');
        if ((matched) && (matched != current)) {
            current.classList.toggle('active', false);
            matched.classList.toggle('active', true);
        }
    }
}

// Select action
function selectAction(event) {
    // Send message action
    let action = new Object();
    for (let [key, value] of Object.entries(event.target.dataset)) { action[key] = value; }
    browser.runtime.sendMessage(action).then(() => {
        // Close actions page
        window.close();
    });
}

// Load actions page
function loadActions() {
    // Handle actions keyboard navigation
    document.querySelector('#actions-search').addEventListener('keydown', (event) => {
        if (event.key == 'Tab') {
            // Prevent tabbing
            event.preventDefault();
        } else if (event.key == 'ArrowUp') {
            // Navigate up
            event.preventDefault();
            if (!document.querySelector('.section-item.active:first-of-type')) {
                let current = document.querySelector('.section-item.active');
                current.classList.toggle('active', false);
                current.previousElementSibling.classList.toggle('active', true);
            }
        } else if (event.key == 'ArrowDown') {
            // Navigate down
            event.preventDefault();
            if (!document.querySelector('.section-item.active:last-of-type')) {
                let current = document.querySelector('.section-item.active');
                current.classList.toggle('active', false);
                current.nextElementSibling.classList.toggle('active', true);
            }
        } else if (event.key == 'Enter') {
            // Select action
            let current = document.querySelector('.section-item.active');
            current.click();
        }
    });

    // Handle actions search
    document.querySelector('#actions-search').addEventListener('keyup', searchActions);

    // Load actions from local storage
    browser.storage.local.get('actions').then((data) => {
        if (data.actions) {
            data.actions.forEach((action) => {
                // Create action element
                let item = document.createElement('div');
                item.classList.add('section-item');
                for (let [key, value] of Object.entries(action)) { item.dataset[key] = value; }

                // Add action title element
                let badge = document.createElement('span');
                badge.classList.add('section-item-badge');
                badge.innerText = action.title;
                item.appendChild(badge);

                // Add action text element
                let text = document.createElement('span');
                text.classList.add('section-item-text');
                text.innerText = action.description;
                item.appendChild(text);

                // Add action shortcut elements
                browser.commands.getAll().then((commands) => {
                    commands.forEach((command) => {
                        if (command.name == action.command) {
                            let keys = command.shortcut.split('+');
                            for (let i = 0; i < keys.length; i++) {
                                let badge = document.createElement('span');
                                badge.classList.add('section-item-badge');
                                badge.innerText = keys[i];
                                item.appendChild(badge);
                                if ((i + 1) != keys.length) { item.append('+'); }
                            }
                        }
                    });
                });

                // Add elements to page
                document.querySelector('#actions-list').appendChild(item);

                // Handle select action
                item.addEventListener('click', selectAction);
            });

            // Set active action
            document.querySelector('.section-item').classList.toggle('active', true);
        }
    });

    // Focus actions search
    document.querySelector('#actions-search').focus();
}

// Handle load actions
document.addEventListener('DOMContentLoaded', loadActions);
