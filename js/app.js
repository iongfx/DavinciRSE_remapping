const CLUSTER_ORDER = {
  edit: ["smart-insrt", "appnd", "ripl-owr", "close-up", "place-on-top", "src-owr"],
  utility: ["esc", "sync-bin", "audio-level", "full-view", "trans", "split", "snap", "ripl-del"],
  transport: ["source", "timeline"],
  modes: ["shtl", "jog", "scrl"],
  marks: ["in", "out"],
  trim: ["trim-in", "trim-out", "roll", "slip-src", "slip-dest", "trans-dur", "cut", "dis", "smth-cut"],
  multicam: [
    "cam7",
    "cam8",
    "cam9",
    "live-owr",
    "cam4",
    "cam5",
    "cam6",
    "video-only",
    "cam1",
    "cam2",
    "cam3",
    "audio-only",
    "stop-play",
  ],
  wheel: ["jog-wheel"],
};

const CLUSTER_LABELS = {
  edit: "Edit keys, top left",
  utility: "Utility keys, top center",
  transport: "Source / Timeline, top right",
  modes: "Wheel modes, right",
  marks: "In / Out, left",
  trim: "Trim and transitions, bottom left",
  multicam: "Cameras and play, center",
  wheel: "Jog wheel, bottom right",
};

const appState = {
  data: loadState(),
  selectedId: null,
  listeningForHotkey: false,
  actionQuery: "",
};

function activeProfile() {
  return appState.data.profiles.find((profile) => profile.id === appState.data.activeProfileId);
}

function mappingFor(buttonId) {
  return activeProfile().mappings[buttonId] || factoryMapping(buttonId);
}

function setMapping(buttonId, mapping) {
  activeProfile().mappings[buttonId] = mapping;
  saveState(appState.data);
  render();
}

function makeKey(button) {
  if (button.kind === "wheel") {
    const wheel = document.createElement("button");
    wheel.type = "button";
    wheel.className = "wheel-button";
    wheel.dataset.id = button.id;
    wheel.setAttribute("aria-label", button.factoryName);
    wheel.innerHTML = '<span class="wheel-dimple"></span><span class="wheel-caption">JOG WHEEL</span>';
    wheel.addEventListener("click", () => selectButton(button.id));
    return wheel;
  }

  const key = document.createElement("button");
  key.type = "button";
  key.className = `key variant-${button.variant}`;
  key.dataset.id = button.id;
  if (button.hasLed) key.classList.add("has-led");
  key.setAttribute("aria-label", `${button.factoryName}. ${button.description}`);
  key.innerHTML = `
    ${button.hasLed ? '<span class="key-led"></span>' : ""}
    <span class="key-label">${button.label}</span>
    ${button.secondary ? `<span class="key-secondary">${button.secondary}</span>` : ""}
  `;
  key.addEventListener("click", () => selectButton(button.id));
  return key;
}

function renderDevice() {
  Object.entries(CLUSTER_ORDER).forEach(([cluster, ids]) => {
    const root = document.querySelector(`[data-cluster="${cluster}"]`);
    root.replaceChildren();
    ids.forEach((id) => root.appendChild(makeKey(BUTTON_BY_ID[id])));
  });
}

function renderKeyStates() {
  const remapCount = countRemaps(activeProfile());
  document.querySelectorAll("[data-id]").forEach((node) => {
    const id = node.dataset.id;
    const remapped = mappingFor(id).actionId !== "factory";
    node.classList.toggle("is-selected", id === appState.selectedId);
    node.classList.toggle("is-remapped", remapped);
  });
  document.getElementById("status-line").textContent =
    remapCount === 0
      ? "All buttons are still using the factory DaVinci Resolve functions."
      : `${remapCount} button${remapCount === 1 ? "" : "s"} remapped in “${activeProfile().name}”. Orange dots mark changed keys.`;
}

function renderProfiles() {
  const select = document.getElementById("profile-select");
  select.replaceChildren();
  appState.data.profiles.forEach((profile) => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = `${profile.name} (${countRemaps(profile)} remapped)`;
    select.appendChild(option);
  });
  select.value = appState.data.activeProfileId;
}

function renderTable() {
  const body = document.getElementById("map-table-body");
  body.replaceChildren();
  SPEED_EDITOR_BUTTONS.forEach((button) => {
    const mapping = mappingFor(button.id);
    const row = document.createElement("tr");
    const remapped = mapping.actionId !== "factory";
    row.className = remapped ? "is-remapped" : "";
    row.innerHTML = `
      <td>${button.label}${button.secondary ? ` / ${button.secondary}` : ""}</td>
      <td>${button.factoryName}</td>
      <td>${mappingLabel(button, mapping)}</td>
    `;
    row.addEventListener("click", () => selectButton(button.id));
    body.appendChild(row);
  });
}

function currentActionId(button) {
  return mappingFor(button.id).actionId;
}

function renderInspector() {
  const empty = document.getElementById("inspector-empty");
  const body = document.getElementById("inspector-body");
  const button = BUTTON_BY_ID[appState.selectedId];
  if (!button) {
    empty.hidden = false;
    body.hidden = true;
    return;
  }

  empty.hidden = true;
  body.hidden = false;
  const mapping = mappingFor(button.id);
  document.getElementById("button-location").textContent = CLUSTER_LABELS[button.cluster];
  document.getElementById("button-title").textContent = button.label.replaceAll("  ", " ");
  document.getElementById("factory-line").textContent = button.secondary
    ? `Factory: ${button.factoryName}  ·  Secondary: ${button.factorySecondaryName}`
    : `Factory: ${button.factoryName}`;
  document.getElementById("button-description").textContent = button.description;
  document.getElementById("action-search").value = appState.actionQuery;
  document.getElementById("hotkey-box").hidden = mapping.actionId !== "hotkey";
  const capture = document.getElementById("hotkey-capture");
  capture.classList.toggle("is-listening", appState.listeningForHotkey);
  capture.textContent = appState.listeningForHotkey
    ? "Listening… press a shortcut"
    : mapping.combo || "Click, then press keys";

  const list = document.getElementById("action-list");
  list.replaceChildren();
  const query = appState.actionQuery.trim().toLowerCase();
  const groups = [];
  ACTION_CATALOG.forEach((action) => {
    const haystack = `${action.name} ${action.group} ${action.description}`.toLowerCase();
    if (query && !haystack.includes(query)) return;
    let group = groups.find((item) => item.name === action.group);
    if (!group) {
      group = { name: action.group, actions: [] };
      groups.push(group);
    }
    group.actions.push(action);
  });

  groups.forEach((group) => {
    const title = document.createElement("div");
    title.className = "action-group-title";
    title.textContent = group.name;
    list.appendChild(title);
    group.actions.forEach((action) => {
      const choice = document.createElement("button");
      choice.type = "button";
      choice.className = "action-choice";
      if (action.id === currentActionId(button)) choice.classList.add("is-current");
      choice.innerHTML = `<strong>${action.name}</strong><small>${action.description}</small>`;
      choice.addEventListener("click", () => {
        appState.listeningForHotkey = action.id === "hotkey";
        setMapping(button.id, {
          actionId: action.id,
          combo: action.id === "hotkey" ? mapping.combo || "" : "",
        });
      });
      list.appendChild(choice);
    });
  });
}

function selectButton(id) {
  appState.selectedId = id;
  appState.listeningForHotkey = mappingFor(id).actionId === "hotkey" && !mappingFor(id).combo;
  appState.actionQuery = "";
  render();
}

function render() {
  renderProfiles();
  renderKeyStates();
  renderInspector();
  renderTable();
}

function comboFromEvent(event) {
  const parts = [];
  if (event.ctrlKey) parts.push("Ctrl");
  if (event.metaKey) parts.push("Cmd");
  if (event.altKey) parts.push("Alt");
  if (event.shiftKey) parts.push("Shift");
  const key = event.key;
  if (!["Control", "Meta", "Alt", "Shift"].includes(key)) {
    parts.push(key.length === 1 ? key.toUpperCase() : key);
  }
  return parts.join("+");
}

function bindEvents() {
  document.getElementById("profile-select").addEventListener("change", (event) => {
    appState.data.activeProfileId = event.target.value;
    saveState(appState.data);
    render();
  });

  document.getElementById("new-profile").addEventListener("click", () => {
    const name = prompt("Name for this new layout?", "Custom layout");
    if (!name) return;
    const profile = newProfile(name.trim(), emptyMappings());
    appState.data.profiles.push(profile);
    appState.data.activeProfileId = profile.id;
    saveState(appState.data);
    render();
  });

  document.getElementById("rename-profile").addEventListener("click", () => {
    const profile = activeProfile();
    const name = prompt("Rename this layout", profile.name);
    if (!name) return;
    profile.name = name.trim();
    saveState(appState.data);
    render();
  });

  document.getElementById("export-profile").addEventListener("click", () => {
    const payload = exportProfile(activeProfile());
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = activeProfile().name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    link.href = url;
    link.download = `${safeName || "speed-editor"}-layout.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("import-profile").addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    try {
      const payload = JSON.parse(await file.text());
      const profile = importProfilePayload(payload);
      appState.data.profiles.push(profile);
      appState.data.activeProfileId = profile.id;
      saveState(appState.data);
      render();
    } catch (error) {
      alert(error.message || "Could not import that file.");
    }
  });

  document.getElementById("reset-all").addEventListener("click", () => {
    if (!confirm("Reset every button in this layout back to factory DaVinci Resolve functions?")) return;
    activeProfile().mappings = emptyMappings();
    saveState(appState.data);
    render();
  });

  document.getElementById("reset-button").addEventListener("click", () => {
    if (!appState.selectedId) return;
    setMapping(appState.selectedId, factoryMapping(appState.selectedId));
  });

  document.getElementById("action-search").addEventListener("input", (event) => {
    appState.actionQuery = event.target.value;
    renderInspector();
  });

  document.getElementById("hotkey-capture").addEventListener("click", () => {
    appState.listeningForHotkey = true;
    renderInspector();
  });

  window.addEventListener("keydown", (event) => {
    if (!appState.listeningForHotkey || !appState.selectedId) return;
    event.preventDefault();
    const combo = comboFromEvent(event);
    if (!combo || combo === "Ctrl" || combo === "Cmd" || combo === "Alt" || combo === "Shift") return;
    appState.listeningForHotkey = false;
    setMapping(appState.selectedId, { actionId: "hotkey", combo });
  });
}

renderDevice();
bindEvents();
render();
