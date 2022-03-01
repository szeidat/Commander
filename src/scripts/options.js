'use strict'

// Max commands defined in manifest
const MAX_COMMANDS = 15;

// Listener for document load
document.addEventListener('DOMContentLoaded', (event) => {
    // Load actions from local storage
    browser.storage.local.get('actions').then((data) => {
        let actions = data.actions;

        // Build options page
        for (let i = 0; i < MAX_COMMANDS; i++) {
            let id = `command-${i + 1}`;
            if (actions[id]) {
                let group = id + '_' + Date.now();
                document.body.insertAdjacentHTML('beforeend', `
                    <div class="section action-section">
                        <div class="section-head">
                            <h1 class="section-title">${actions[id].title}</h1>
                            <button class="section-button remove-action">Remove</button>
                        </div>
                        <div class="section-content">
                            <label class="copy-contents">
                                <input class="section-input-radio" type="radio" name="${group}" value="copy-contents" ${(actions[id].name === 'copy-contents') ? 'checked="true"' : ''}>
                                Copy element contents
                            </label>
                        </div>
                        <div class="section-content">
                            <label class="copy-screenshot">
                                <input class="section-input-radio" type="radio" name="${group}" value="copy-screenshot"  ${(actions[id].name === 'copy-screenshot') ? 'checked="true"' : ''}">
                                Copy element screenshot
                            </label>
                        </div>
                        <div class="section-content">
                            <label class="section-label">Element CSS selector</label>
                            <input class="section-input-text" type="text" name="selector" value="${actions[id].selector}" placeholder="Type an element selector">
                        </div>
                    </div>
                `);
            }
        }
    });

    // Disable add action button
    document.querySelector('#add-action').disabled = (document.querySelectorAll('.action-section').length === MAX_COMMANDS);
})

// Listener for save actions button click
document.querySelector('#save-actions').addEventListener('click', (event) => {
    // Build actions from page
    let actions = {};
    let sections = document.querySelectorAll('.action-section');
    for (let i = 0; i < sections.length; i++) {
        // Check action has selector
        let section = sections[i];
        if (!section.querySelector('input[name=selector]').value.trim()) {
            section.querySelector('input[name=selector]').value = 'body';
        }

        // Add action to list
        let id = `command-${i + 1}`;
        let title = section.querySelector('.section-title').innerText;
        let name = section.querySelector('input[type=radio]:checked').value;
        let description = section.querySelector(`label.${name}`).innerText;
        let selector = section.querySelector('input[name=selector]').value.trim();
    actions[id] = {
            title: title,
            name: name,
            description: description,
            selector: selector
        };
    }

    // Save actions to local storage
    browser.storage.local.set({ actions });

    // Update extension commands
    for (let i = 0; i < MAX_COMMANDS; i++) {
        let id = `command-${i + 1}`;
        if (actions[id]) {
            // Action defined
            browser.commands.update({
                name: id,
                description: actions[id].description + ' ("' + actions[id].selector + '")'
            });
        } else {
            // Action not defined
            browser.commands.update({
                name: id,
                description: 'Action not defined'
            });
        }
    }

    // Disable save actions button
    document.querySelector('#save-actions').disabled = true;
})

// Listener for add action button click
document.querySelector('#add-action').addEventListener('click', (event) => {
    // Get action number
    let i = document.querySelectorAll('.action-section').length;
    if (i < MAX_COMMANDS) {
        // Add action section
        let group = 'group-' + Date.now();
        document.body.insertAdjacentHTML('beforeend', `
            <div class="section action-section">
                <div class="section-head">
                    <h1 class="section-title">Copy Contents</h1>
                    <button class="section-button remove-action">Remove</button>
                </div>
                <div class="section-content">
                    <label class="copy-contents">
                        <input class="section-input-radio" type="radio" name="${group}" value="copy-contents" checked="true">
                        Copy element contents
                    </label>
                </div>
                <div class="section-content">
                    <label class="copy-screenshot">
                        <input class="section-input-radio" type="radio" name="${group}" value="copy-screenshot">
                        Copy element screenshot
                    </label>
                </div>
                <div class="section-content">
                    <label class="section-label">Element CSS selector</label>
                    <input class="section-input-text" type="text" name="selector" value ="" placeholder="Type an element selector">
                </div>
            </div>
        `);

        // Enable save actions button
        document.querySelector('#save-actions').disabled = false;
    }

    // Disable add action button
    document.querySelector('#add-action').disabled = (document.querySelectorAll('.action-section').length === MAX_COMMANDS);
})

// Listener for other elements click
document.body.addEventListener('click', (event) => {
    // Get target section
    let target = event.target;
    let section = target.closest('.action-section');

    // Check remove action
    if (target.classList.contains('remove-action')) {
        document.body.removeChild(section);
        document.querySelector('#add-action').disabled = false;
        document.querySelector('#save-actions').disabled = false;
    }

    // Check copy contents action
    if (target.type && target.value === 'copy-contents') {
        let title = section.querySelector('.section-title');
        title.innerText = 'Copy Contents';
        document.querySelector('#save-actions').disabled = false;
    }

    // Check copy screenshot action
    if (target.type && target.value === 'copy-screenshot') {
        let title = section.querySelector('.section-title');
        title.innerText = 'Copy Screenshot';
        document.querySelector('#save-actions').disabled = false;
    }
})

// Listener for input elements change
document.body.addEventListener('change', (event) => {
    // Get target section
    let target = event.target;

    // Check text changed
    if (target.type && target.type === 'text') {
        document.querySelector('#save-actions').disabled = false;
    }
})
