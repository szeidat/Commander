# Commander
Firefox extension to run browser and web page actions.

## Actions

Available actions:

### Copy Contents

Copies contents of an HTML element in the page, given its CSS selector, to the clipboard. It uses a range to select all contents of the first element that matches the selector. The element must be visible for its contents to be copied.

### Copy Text

Copies text contents of HTML elements in the page, given their CSS selector, to the clipboard. It adds the delimiter specified as a separator between the text contents, with newline as the default separator. Optionally, a regexp match and replace can be performed on the text contents of each of the HTML elements, using the specified match expression and match replacement.

### Open Location

Opens the specified location URL address in a new browser window. It can optionally perform the following address replacements:

* Replace the placeholder "{sel}" with the text currently selected in the page
* Replace the placeholder "{rsel}" with the text currently selected in the page, after performing a regexp match and replace on it using the specified match expression and match replacement
* Replace the placeholder "{txt}" with the text contents of the first HTML element that matches the specified CSS selector
* Replace the placeholder "{txt}" with the text contents of the first HTML element that matches the specified CSS selector, after performing a regexp match and replace on it using the specified match expression and match replacement

### Send Message

Sends the specified message to a registered native application. It can optionally perform the following message replacements:

* Replace the placeholder "{sel}" with the text currently selected in the page
* Replace the placeholder "{rsel}" with the text currently selected in the page, after performing a regexp match and replace on it using the specified match expression and match replacement
* Replace the placeholder "{txt}" with the text contents of the first HTML element that matches the specified CSS selector
* Replace the placeholder "{txt}" with the text contents of the first HTML element that matches the specified CSS selector, after performing a regexp match and replace on it using the specified match expression and match replacement

### Take Screenshot

Captures a screenshot of an HTML element in the page, given its CSS selector, and saves the screenshot to the clipboard as a PNG image. The element must be visible. It uses the bounding rectangle of the first element that matches the selector for the screenshot.

### Trigger Event

Dispatches an event to an HTML element in the page, given its CSS selector. Only the first element that matches the CSS selector will receive the event. Event name is required, e.g. "click". Event initialization data can be provided, in the form of a json string, but is optional.

## Usage

Add to Firefox, then open the extension's options page. Define required actions, then save.

![Actions](/doc/actions.jpg?raw=true)

Each action can have a keyboard shortcut assigned to it. These can be defined in the extensions's options page, or using Firefox's shortcut manager.

![Shortcut](/doc/shortcuts.jpg?raw=true)

## Search

Clicking the extension's icon displays a search dialog with a list of all defined actions. Click the desired action from the list, or start typing to search for an action then press Enter to run it. Use the up and down arrow keys to navigate the list.

![Search](/doc/search.jpg?raw=true)

The search dialog can also be called using the commander shortcut, defined in options or in the shortcut manager.

## Import/Export

Use export and import, from the extension's option page, to save and restore actions.

![Options](/doc/options.jpg?raw=true)

Export saves the currently defined actions to a json file. Save defined actions before exporting as unsaved changes will not be exported. Import will clear currently defined actions and replace them with contents from the supplied json file. 

Enjoy!
