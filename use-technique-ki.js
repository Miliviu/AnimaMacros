if (!token) {
  ui.notifications.error("No token selected");
  return;
}

const techniques = Object.values(token.actor.system.domine.techniques || {});

if (techniques.length === 0) {
  ui.notifications.error("No techniques found on character");
  return;
}

const kiAccum = token.actor.system.domine.kiAccumulation;

const charNames = {
  strength: "FUE",
  agility: "AGI",
  dexterity: "DES",
  constitution: "CON",
  willPower: "VOL",
  power: "POD"
};

async function useTechnique(techniqueId) {
  const technique = techniques.find(t => t._id === techniqueId);
  if (!technique) {
    ui.notifications.error("Técnica no encontrada");
    return;
  }

  const costs = {
    strength: parseInt(technique.system.strength.value) || 0,
    agility: parseInt(technique.system.agility.value) || 0,
    dexterity: parseInt(technique.system.dexterity.value) || 0,
    constitution: parseInt(technique.system.constitution.value) || 0,
    willPower: parseInt(technique.system.willPower.value) || 0,
    power: parseInt(technique.system.power.value) || 0
  };

  // Check if enough Ki
  for (const [attr, cost] of Object.entries(costs)) {
    if (cost > 0 && kiAccum[attr].accumulated.value < cost) {
      ui.notifications.error(`No tienes suficiente Ki en ${charNames[attr]}: necesitas ${cost}, tienes ${kiAccum[attr].accumulated.value}`);
      return;
    }
  }

  // Deduct Ki and move to reserve
  const updates = {};
  let reserve = kiAccum.generic.value || 0;

  for (const [attr, cost] of Object.entries(costs)) {
    const current = kiAccum[attr].accumulated.value;
    if (cost > 0) {
      updates[`system.domine.kiAccumulation.${attr}.accumulated.value`] = current - cost;
      reserve += current - cost;
    } else {
      reserve += current;
    }
    updates[`system.domine.kiAccumulation.${attr}.accumulated.value`] = 0;
  }

  updates["system.domine.kiAccumulation.generic.value"] = reserve;
  await token.actor.update(updates);

  // Chat message
  const desc = technique.system.description.value || "";
  let msg = `<b>${token.name}</b> usa <b>${technique.name}</b>`;
  if (desc) msg += `<div>${desc}</div>`;
  ChatMessage.create({ content: msg });
}

async function mainDialog() {
  let options = "";
  for (const tech of techniques) {
    options += `<option value="${tech._id}">${tech.name}</option>`;
  }

  const dialogContent = `
    <p class="hint">
      Selecciona la técnica que deseas usar. El coste de Ki será verificado y deducido automáticamente.
    </p>
    <div class="form-group">
      <label for="techniqueSelect">Técnica</label>
      <select id="techniqueSelect" name="technique">
        ${options}
      </select>
    </div>
    <div id="kiCostInfo"></div>
  `;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Usar Técnica",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 500,
      height: "auto"
    },
    content: dialogContent,
    buttons: [
      {
        action: "use",
        label: "Usar Técnica",
        icon: "fas fa-hand-sparkles",
        default: true,
        callback: (event, button, dialog) => {
          return dialog.element.querySelector("#techniqueSelect").value;
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fas fa-times"
      }
    ],
    render: (event, dialog) => {
      const html = dialog.element;
      const select = html.querySelector("#techniqueSelect");
      const kiInfoDiv = html.querySelector("#kiCostInfo");

      function updateKiInfo() {
        const techniqueId = select.value;
        const technique = techniques.find(t => t._id === techniqueId);
        if (!technique) return;

        const costs = {
          strength: parseInt(technique.system.strength.value) || 0,
          agility: parseInt(technique.system.agility.value) || 0,
          dexterity: parseInt(technique.system.dexterity.value) || 0,
          constitution: parseInt(technique.system.constitution.value) || 0,
          willPower: parseInt(technique.system.willPower.value) || 0,
          power: parseInt(technique.system.power.value) || 0
        };

        let info = `<fieldset><legend>Coste de Ki</legend><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">`;
        let hasCosts = false;

        for (const [attr, cost] of Object.entries(costs)) {
          if (cost > 0) {
            hasCosts = true;
            const current = kiAccum[attr].accumulated.value;
            const sufficient = current >= cost;
            info += `
              <div class="form-group stacked">
                <label>${charNames[attr]}</label>
                <span style="color: ${sufficient ? 'var(--color-level-success)' : 'var(--color-level-error)'};">
                  ${cost} / ${current}
                </span>
              </div>
            `;
          }
        }

        if (!hasCosts) {
          info += `<p class="hint" style="grid-column: 1 / -1;">Esta técnica no requiere Ki.</p>`;
        }

        info += `</div></fieldset>`;
        kiInfoDiv.innerHTML = info;
      }

      select.addEventListener("change", updateKiInfo);
      updateKiInfo();
    },
    rejectClose: false
  });

  if (result) {
    await useTechnique(result);
  }
}

mainDialog();
  