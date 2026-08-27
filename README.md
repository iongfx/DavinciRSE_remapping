# Speed Editor Remapper

This is a beginner-friendly app for remapping the **Blackmagic DaVinci Resolve Speed Editor**.

The screen shows a picture of the Speed Editor that matches the real hardware: every button, its printed label, and the factory DaVinci Resolve function. You click a button, pick a new job for it, and save that layout.

## What this first version does

- Shows the Speed Editor layout, including secondary labels such as CLIP, CLR, and UNDO
- Lets you remap any button to another Resolve function, a common edit/playback action, or a keyboard shortcut
- Saves layouts in this browser so they are still there when you come back
- Lets you export a layout as a JSON file and import it later

This version is the **visual remapper**. It does not yet talk to the physical Speed Editor over USB/Bluetooth. The exported JSON is the mapping file a later “live device” version can use.

## How to open the app

You do not need to install anything.

1. Open this project folder.
2. Double-click `index.html`.
3. It should open in your web browser.

If double-clicking does not work, open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

If you open this GitHub project in **Cursor on your desktop**, you will see these same files. Open `index.html` from there to use the app on your computer.

## How to remap a button

1. Click a key on the Speed Editor picture.
2. The right-hand panel explains the factory function in plain English.
3. Search for a new function, or choose **Keyboard shortcut…** and press the keys you want.
4. Changed keys get a small orange dot.
5. Use **Export** if you want a backup file of your layout.

**Reset this button** puts one key back to factory. **Reset all** puts the whole layout back.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The app page |
| `css/app.css` | Colors and Speed Editor look |
| `js/buttons.js` | Every button, location, HID id, and factory function |
| `js/actions.js` | The list of things a button can do |
| `js/storage.js` | Saving / loading / export / import |
| `js/app.js` | Click handling and the remapping panel |
