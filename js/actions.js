/**
 * Things a Speed Editor button can be mapped to.
 * Factory actions keep the original DaVinci Resolve behavior.
 */
const ACTION_CATALOG = [
  {
    id: "factory",
    name: "Keep factory function",
    group: "Factory",
    description: "Use the original DaVinci Resolve function printed on this key.",
  },
  {
    id: "unassigned",
    name: "Unassigned",
    group: "Factory",
    description: "This button does nothing.",
  },
  {
    id: "hotkey",
    name: "Keyboard shortcut…",
    group: "Custom",
    description: "Press a keyboard shortcut on your computer, then this button will store it.",
  },

  { id: "resolve-smart-insert", name: "Smart Insert", group: "DaVinci Resolve", description: "Insert the source clip and ripple the timeline." },
  { id: "resolve-append", name: "Append", group: "DaVinci Resolve", description: "Add the source clip to the end of the timeline." },
  { id: "resolve-ripple-overwrite", name: "Ripple Overwrite", group: "DaVinci Resolve", description: "Overwrite and ripple later clips." },
  { id: "resolve-close-up", name: "Close Up", group: "DaVinci Resolve", description: "Punch in for a close-up." },
  { id: "resolve-place-on-top", name: "Place On Top", group: "DaVinci Resolve", description: "Edit onto the track above." },
  { id: "resolve-source-overwrite", name: "Source Overwrite", group: "DaVinci Resolve", description: "Overwrite from the source viewer." },
  { id: "resolve-mark-in", name: "Mark In", group: "DaVinci Resolve", description: "Set an In point." },
  { id: "resolve-mark-out", name: "Mark Out", group: "DaVinci Resolve", description: "Set an Out point." },
  { id: "resolve-clear-in", name: "Clear In", group: "DaVinci Resolve", description: "Clear the In point." },
  { id: "resolve-clear-out", name: "Clear Out", group: "DaVinci Resolve", description: "Clear the Out point." },
  { id: "resolve-trim-in", name: "Trim In", group: "DaVinci Resolve", description: "Trim the clip In point." },
  { id: "resolve-trim-out", name: "Trim Out", group: "DaVinci Resolve", description: "Trim the clip Out point." },
  { id: "resolve-roll", name: "Roll", group: "DaVinci Resolve", description: "Roll the edit point." },
  { id: "resolve-slide", name: "Slide", group: "DaVinci Resolve", description: "Slide the clip between neighbors." },
  { id: "resolve-slip-source", name: "Slip Source", group: "DaVinci Resolve", description: "Slip source media inside the clip." },
  { id: "resolve-slip-dest", name: "Slip Destination", group: "DaVinci Resolve", description: "Slip the clip on the timeline." },
  { id: "resolve-transition-duration", name: "Transition Duration", group: "DaVinci Resolve", description: "Set transition length." },
  { id: "resolve-cut", name: "Cut", group: "DaVinci Resolve", description: "Hard cut transition." },
  { id: "resolve-dissolve", name: "Dissolve", group: "DaVinci Resolve", description: "Dissolve / cross-fade." },
  { id: "resolve-smooth-cut", name: "Smooth Cut", group: "DaVinci Resolve", description: "Smooth Cut transition." },
  { id: "resolve-escape", name: "Escape", group: "DaVinci Resolve", description: "Cancel / leave the current tool." },
  { id: "resolve-undo", name: "Undo", group: "DaVinci Resolve", description: "Undo the last action." },
  { id: "resolve-redo", name: "Redo", group: "DaVinci Resolve", description: "Redo the last undone action." },
  { id: "resolve-sync-bin", name: "Sync Bin", group: "DaVinci Resolve", description: "Open the sync bin." },
  { id: "resolve-audio-level", name: "Audio Level", group: "DaVinci Resolve", description: "Adjust clip audio level." },
  { id: "resolve-full-view", name: "Full View", group: "DaVinci Resolve", description: "Toggle full viewer." },
  { id: "resolve-review", name: "Review", group: "DaVinci Resolve", description: "Review playback." },
  { id: "resolve-transition", name: "Transition", group: "DaVinci Resolve", description: "Add or select a transition." },
  { id: "resolve-title", name: "Title", group: "DaVinci Resolve", description: "Work with titles." },
  { id: "resolve-split", name: "Split", group: "DaVinci Resolve", description: "Split the clip at the playhead." },
  { id: "resolve-snap", name: "Snap", group: "DaVinci Resolve", description: "Toggle snapping." },
  { id: "resolve-ripple-delete", name: "Ripple Delete", group: "DaVinci Resolve", description: "Delete and close the gap." },
  { id: "resolve-source", name: "Source Viewer", group: "DaVinci Resolve", description: "Focus the source viewer." },
  { id: "resolve-timeline", name: "Timeline Viewer", group: "DaVinci Resolve", description: "Focus the timeline." },
  { id: "resolve-shuttle", name: "Shuttle Mode", group: "DaVinci Resolve", description: "Wheel shuttles playback." },
  { id: "resolve-jog", name: "Jog Mode", group: "DaVinci Resolve", description: "Wheel jogs frame by frame." },
  { id: "resolve-scroll", name: "Scroll Mode", group: "DaVinci Resolve", description: "Wheel scrolls the timeline." },
  { id: "resolve-stop-play", name: "Stop / Play", group: "DaVinci Resolve", description: "Toggle playback." },
  { id: "resolve-video-only", name: "Video Only", group: "DaVinci Resolve", description: "Next edit is video only." },
  { id: "resolve-audio-only", name: "Audio Only", group: "DaVinci Resolve", description: "Next edit is audio only." },
  { id: "resolve-live-overwrite", name: "Live Overwrite", group: "DaVinci Resolve", description: "Live overwrite camera switching." },
  { id: "resolve-cam-1", name: "Camera 1", group: "DaVinci Resolve", description: "Switch to camera 1." },
  { id: "resolve-cam-2", name: "Camera 2", group: "DaVinci Resolve", description: "Switch to camera 2." },
  { id: "resolve-cam-3", name: "Camera 3", group: "DaVinci Resolve", description: "Switch to camera 3." },
  { id: "resolve-cam-4", name: "Camera 4", group: "DaVinci Resolve", description: "Switch to camera 4." },
  { id: "resolve-cam-5", name: "Camera 5", group: "DaVinci Resolve", description: "Switch to camera 5." },
  { id: "resolve-cam-6", name: "Camera 6", group: "DaVinci Resolve", description: "Switch to camera 6." },
  { id: "resolve-cam-7", name: "Camera 7", group: "DaVinci Resolve", description: "Switch to camera 7." },
  { id: "resolve-cam-8", name: "Camera 8", group: "DaVinci Resolve", description: "Switch to camera 8." },
  { id: "resolve-cam-9", name: "Camera 9", group: "DaVinci Resolve", description: "Switch to camera 9." },

  { id: "edit-cut", name: "Cut (clipboard)", group: "Edit", description: "Cut the selection to the clipboard." },
  { id: "edit-copy", name: "Copy", group: "Edit", description: "Copy the selection." },
  { id: "edit-paste", name: "Paste", group: "Edit", description: "Paste from the clipboard." },
  { id: "edit-select-all", name: "Select All", group: "Edit", description: "Select everything." },
  { id: "edit-save", name: "Save", group: "Edit", description: "Save the project." },
  { id: "edit-delete", name: "Delete", group: "Edit", description: "Delete the selection (leave a gap)." },

  { id: "play-play-pause", name: "Play / Pause", group: "Playback", description: "Toggle play and pause." },
  { id: "play-stop", name: "Stop", group: "Playback", description: "Stop playback." },
  { id: "play-next", name: "Next Clip", group: "Playback", description: "Jump to the next clip." },
  { id: "play-prev", name: "Previous Clip", group: "Playback", description: "Jump to the previous clip." },
  { id: "play-faster", name: "Faster", group: "Playback", description: "Increase playback speed." },
  { id: "play-slower", name: "Slower", group: "Playback", description: "Decrease playback speed." },

  { id: "nav-left", name: "Nudge Left", group: "Navigation", description: "Move one frame / unit left." },
  { id: "nav-right", name: "Nudge Right", group: "Navigation", description: "Move one frame / unit right." },
  { id: "nav-home", name: "Go to Start", group: "Navigation", description: "Jump to the start." },
  { id: "nav-end", name: "Go to End", group: "Navigation", description: "Jump to the end." },
];

const ACTION_BY_ID = Object.fromEntries(ACTION_CATALOG.map((action) => [action.id, action]));

const FACTORY_ACTION_FOR_BUTTON = {
  "smart-insrt": "resolve-smart-insert",
  appnd: "resolve-append",
  "ripl-owr": "resolve-ripple-overwrite",
  "close-up": "resolve-close-up",
  "place-on-top": "resolve-place-on-top",
  "src-owr": "resolve-source-overwrite",
  esc: "resolve-escape",
  "sync-bin": "resolve-sync-bin",
  "audio-level": "resolve-audio-level",
  "full-view": "resolve-full-view",
  trans: "resolve-transition",
  split: "resolve-split",
  snap: "resolve-snap",
  "ripl-del": "resolve-ripple-delete",
  source: "resolve-source",
  timeline: "resolve-timeline",
  shtl: "resolve-shuttle",
  jog: "resolve-jog",
  scrl: "resolve-scroll",
  in: "resolve-mark-in",
  out: "resolve-mark-out",
  "trim-in": "resolve-trim-in",
  "trim-out": "resolve-trim-out",
  roll: "resolve-roll",
  "slip-src": "resolve-slip-source",
  "slip-dest": "resolve-slip-dest",
  "trans-dur": "resolve-transition-duration",
  cut: "resolve-cut",
  dis: "resolve-dissolve",
  "smth-cut": "resolve-smooth-cut",
  cam7: "resolve-cam-7",
  cam8: "resolve-cam-8",
  cam9: "resolve-cam-9",
  "live-owr": "resolve-live-overwrite",
  cam4: "resolve-cam-4",
  cam5: "resolve-cam-5",
  cam6: "resolve-cam-6",
  "video-only": "resolve-video-only",
  cam1: "resolve-cam-1",
  cam2: "resolve-cam-2",
  cam3: "resolve-cam-3",
  "audio-only": "resolve-audio-only",
  "stop-play": "resolve-stop-play",
  "jog-wheel": "resolve-jog",
};

function factoryMapping(buttonId) {
  return { actionId: "factory", combo: "" };
}

function isFactoryMapping(mapping) {
  return !mapping || mapping.actionId === "factory" || mapping.actionId === FACTORY_ACTION_FOR_BUTTON[mapping.buttonId];
}

function mappingLabel(button, mapping) {
  const resolved = mapping || factoryMapping(button.id);
  if (resolved.actionId === "factory") return button.factoryName;
  if (resolved.actionId === "unassigned") return "Unassigned";
  if (resolved.actionId === "hotkey") return resolved.combo ? `Shortcut: ${resolved.combo}` : "Shortcut (not set)";
  return ACTION_BY_ID[resolved.actionId]?.name || "Unknown";
}
