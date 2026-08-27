const STORAGE_KEY = "speed-editor-remapper-v1";

function emptyMappings() {
  const mappings = {};
  SPEED_EDITOR_BUTTONS.forEach((button) => {
    mappings[button.id] = factoryMapping(button.id);
  });
  return mappings;
}

function newProfile(name, mappings) {
  return {
    id: "profile-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6),
    name: name || "My layout",
    mappings: mappings || emptyMappings(),
  };
}

function defaultState() {
  const profile = newProfile("My layout");
  return {
    activeProfileId: profile.id,
    profiles: [profile],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.profiles) || parsed.profiles.length === 0) {
      return defaultState();
    }
    parsed.profiles.forEach((profile) => {
      const mappings = emptyMappings();
      SPEED_EDITOR_BUTTONS.forEach((button) => {
        const saved = profile.mappings && profile.mappings[button.id];
        mappings[button.id] = saved && saved.actionId ? saved : factoryMapping(button.id);
      });
      profile.mappings = mappings;
    });
    if (!parsed.profiles.some((profile) => profile.id === parsed.activeProfileId)) {
      parsed.activeProfileId = parsed.profiles[0].id;
    }
    return parsed;
  } catch (error) {
    console.warn("Could not load saved layouts. Starting fresh.", error);
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function countRemaps(profile) {
  return SPEED_EDITOR_BUTTONS.filter((button) => {
    const mapping = profile.mappings[button.id];
    return mapping && mapping.actionId !== "factory";
  }).length;
}

function exportProfile(profile) {
  return {
    app: "DavinciRSE_remapping",
    version: 1,
    device: "blackmagic-speed-editor",
    name: profile.name,
    exportedAt: new Date().toISOString(),
    mappings: profile.mappings,
  };
}

function importProfilePayload(payload) {
  if (!payload || payload.device !== "blackmagic-speed-editor" || !payload.mappings) {
    throw new Error("This file is not a Speed Editor layout.");
  }
  const mappings = emptyMappings();
  SPEED_EDITOR_BUTTONS.forEach((button) => {
    const incoming = payload.mappings[button.id];
    if (incoming && incoming.actionId) mappings[button.id] = incoming;
  });
  return newProfile(payload.name || "Imported layout", mappings);
}
