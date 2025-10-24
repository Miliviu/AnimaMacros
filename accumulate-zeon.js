let zeonACT = token.actor.system.mystic.act.main.final.value;
let zeonBaseTotal = token.actor.system.mystic.zeon.max;
let zeonBaseCurr = token.actor.system.mystic.zeon.value;
let zeonAcum = token.actor.system.mystic.zeon.accumulated;
let fatigueCurr = token.actor.system.characteristics.secondaries.fatigue.value;
let zeonMant = token.actor.system.mystic.zeonMaintained.value;

if (zeonAcum == null) {
  zeonAcum = 0;
}

async function updateAcumulation(mode, cansancioUsado, cansancioModificacion) {
  let updateZeon = 0;
  var chatNotification = "<b>" + token.name + "</b>";

  let cansancioEffect = cansancioUsado * cansancioModificacion;

  let updatedFatigue = fatigueCurr - cansancioUsado;
  if (updatedFatigue < 0) {
    updatedFatigue = 0;
  }
  token.actor.update({
    "system.characteristics.secondaries.fatigue.value": updatedFatigue,
  });

  if (mode == 0) {
    chatNotification = chatNotification + " ha acumulado de forma plena ";

    let updateZeonBase = zeonBaseCurr - (zeonACT + cansancioEffect);
    if (updateZeonBase < 0) {
      updateZeonBase = 0;
    }
    token.actor.update({ "system.mystic.zeon.value": updateZeonBase });

    updateZeon = zeonAcum + (zeonACT + cansancioEffect);
    token.actor.update({ "system.mystic.zeon.accumulated": updateZeon });

    chatNotification =
      chatNotification +
      "<b>" +
      (zeonACT + cansancioEffect) +
      "</b> puntos de zeon este turno y tiene acumulado ";
  } else {
    chatNotification = chatNotification + " ha acumulado de forma parcial ";

    let updateZeonBase =
      zeonBaseCurr - (Math.round(zeonACT / 2) + cansancioEffect);
    if (updateZeonBase < 0) {
      updateZeonBase = 0;
    }
    token.actor.update({ "system.mystic.zeon.value": updateZeonBase });

    updateZeon = zeonAcum + (Math.round(zeonACT / 2) + cansancioEffect);
    token.actor.update({ "system.mystic.zeon.accumulated": updateZeon });

    chatNotification =
      chatNotification +
      "<b>" +
      (Math.round(zeonACT / 2) + cansancioEffect) +
      "</b> puntos de zeon este turno y tiene acumulado ";
  }
  chatNotification =
    chatNotification + "<b>" + updateZeon + "</b> puntos de zeon";

  chatNotification =
    chatNotification + `<br><b>Cansancio actual:</b> ${updatedFatigue}`;

  ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: chatNotification,
  });
}

async function returnAccumulatedZeon(option) {
  if (zeonAcum <= 0) {
    ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ token: actor }),
      content: `<b>${token.name}</b> no tiene zeón acumulado para devolver.`,
    });
    return;
  }

  let zeonToReturn;
  if (option === "all") {
    zeonToReturn = zeonAcum;
  } else {
    zeonToReturn = Math.max(0, zeonAcum - 10);
  }

  let updatedZeonBase = Math.min(zeonBaseTotal, zeonBaseCurr + zeonToReturn);

  await token.actor.update({
    "system.mystic.zeon.value": updatedZeonBase,
    "system.mystic.zeon.accumulated": 0,
  });

  let chatNotification = `<b>${token.name}</b> ha devuelto <b>${zeonToReturn}</b> puntos de zeon a su tanque.`;
  ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: chatNotification,
  });
}

async function regenerateZeon() {
    const zeonRegen = token.actor.system.mystic.zeonRegeneration.final.value;
    const zeonCurrent = token.actor.system.mystic.zeon.value;
    const zeonMax = token.actor.system.mystic.zeon.max;
  
    const newZeonValue = Math.min(zeonCurrent + zeonRegen, zeonMax);
  
    await token.actor.update({ "system.mystic.zeon.value": newZeonValue });
  
    ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ token: actor }),
      content: `<b>${token.name}</b> ha regenerado <b>${zeonRegen}</b> puntos de Zeón. Zeón actual: <b>${newZeonValue}</b>.`,
    });
  }

async function modifyZeonMaintainedDialog() {
  let maintainedPerTurn = token.actor.system.mystic.selectedSpells || [];
  let maintainedDaily = token.actor.system.mystic.spellMaintenances || [];

  let spellListPerTurn =
    maintainedPerTurn.length > 0
      ? maintainedPerTurn
          .map(
            (spell) => `
      <li class="spell-item" data-spell-id="${spell._id}">
          <div class="spell-info">
              <strong>${spell.name}</strong>
              <span class="spell-cost">Coste: ${spell.system.cost.value} Zeón/turno</span>
          </div>
          <button type="button" data-spell-id="${spell._id}" data-action="delete-per-turn" class="delete-spell-per-turn">
              <i class="fas fa-times"></i> Eliminar
          </button>
      </li>
  `
          )
          .join("")
      : "<li class='empty-message'>No tienes hechizos mantenidos por turno.</li>";

  let spellListDaily =
    maintainedDaily.length > 0
      ? maintainedDaily
          .map(
            (spell) => `
      <li class="spell-item" data-spell-id="${spell._id}">
          <div class="spell-info">
              <strong>${spell.name}</strong>
              <span class="spell-cost">Coste: ${spell.system.cost.value} Zeón/día</span>
          </div>
          <button type="button" data-spell-id="${spell._id}" data-action="delete-daily" class="delete-spell-daily">
              <i class="fas fa-times"></i> Eliminar
          </button>
      </li>
  `
          )
          .join("")
      : "<li class='empty-message'>No tienes hechizos mantenidos diarios.</li>";

  const content = `
      <style>
          .spell-list {
              list-style: none;
              padding: 0;
              margin: 1rem 0;
              max-height: 200px;
              overflow-y: auto;
              border: 1px solid var(--color-border-dark-tertiary);
              border-radius: 4px;
          }
          .spell-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.75rem;
              border-bottom: 1px solid var(--color-border-dark-tertiary);
          }
          .spell-item:last-child {
              border-bottom: none;
          }
          .spell-info {
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
          }
          .spell-cost {
              font-size: 0.9em;
              color: var(--color-text-dark-secondary);
          }
          .spell-item button {
              white-space: nowrap;
          }
          .empty-message {
              padding: 1rem;
              text-align: center;
              color: var(--color-text-dark-secondary);
              font-style: italic;
          }
      </style>
      <fieldset>
          <legend>Hechizos mantenidos por turno</legend>
          <ul class="spell-list" id="list-per-turn">
              ${spellListPerTurn}
          </ul>
      </fieldset>
      
      <fieldset>
          <legend>Hechizos mantenidos diarios</legend>
          <ul class="spell-list" id="list-daily">
              ${spellListDaily}
          </ul>
      </fieldset>
  `;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Modificar Zeón Mantenido",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 550,
      height: "auto"
    },
    content,
    buttons: [
      {
        action: "close",
        label: "Cerrar",
        icon: "fas fa-times",
      },
    ],
    render: (event, button, dialog) => {
      const html = dialog.element;

      html.querySelectorAll(".delete-spell-per-turn").forEach((btn) => {
        btn.addEventListener("click", async (event) => {
          const spellId = event.currentTarget.dataset.spellId;
          const spell = maintainedPerTurn.find((s) => s._id === spellId);

          if (!spell) return;

          const spellCost = spell.system.cost.value;
          const spellName = spell.name;

          maintainedPerTurn = maintainedPerTurn.filter((s) => s._id !== spellId);

          await token.actor.update({
            "system.mystic.zeonMaintained.value":
              (Number(zeonMant) ?? 0) - Number(spellCost),
            "system.mystic.selectedSpells": maintainedPerTurn,
          });

          const listItem = html.querySelector(`li[data-spell-id="${spellId}"]`);
          if (listItem) listItem.remove();

          ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ token: actor }),
            content: `<b>${token.name}</b> ha dejado de mantener el hechizo <b>${spellName}</b>.`,
          });

          zeonMant -= spellCost;
        });
      });

      html.querySelectorAll(".delete-spell-daily").forEach((btn) => {
        btn.addEventListener("click", async (event) => {
          const spellId = event.currentTarget.dataset.spellId;
          const spell = maintainedDaily.find((s) => s._id === spellId);

          if (!spell) return;

          const spellName = spell.name;

          maintainedDaily = maintainedDaily.filter((s) => s._id !== spellId);

          await token.actor.update({
            "system.mystic.spellMaintenances": maintainedDaily,
          });

          const listItem = html.querySelector(`li[data-spell-id="${spellId}"]`);
          if (listItem) listItem.remove();

          ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ token: actor }),
            content: `<b>${token.name}</b> ha dejado de mantener el hechizo <b>${spellName}</b>.`,
          });
        });
      });
    },
    rejectClose: false,
  });
}

async function mainDialog() {
  const dialogContent = `
    <p class="hint">
        La <strong>Acumulación Parcial</strong> te permite acumular zeón de forma pasiva mientras realizas otras acciones, 
        al coste de reducir la acumulación a la mitad. La <strong>Acumulación Plena</strong> te permite acumular todo el 
        zeón que te correspondería, pero te inhibe de realizar acciones activas este turno fuera de lanzar conjuros.
    </p>
    
    <fieldset>
        <legend>Estado Actual</legend>
        <div class="form-group stacked">
            <label>Zeón acumulado</label>
            <span style="font-weight: bold; font-size: 1.3em;">${zeonAcum}</span>
        </div>
        <div class="form-group stacked">
            <label>Zeón máximo / actual</label>
            <span>${zeonBaseTotal} / ${zeonBaseCurr}</span>
        </div>
        <div class="form-group stacked">
            <label>Fatiga actual</label>
            <span>${fatigueCurr}</span>
        </div>
        <div class="form-group stacked">
            <label>Zeón Mantenido</label>
            <span>${zeonMant}</span>
        </div>
    </fieldset>

    <fieldset>
        <legend>ACT de Acumulación</legend>
        <div class="form-group stacked">
            <label>ACT Plena</label>
            <span style="font-weight: bold; color: var(--color-level-success);">${zeonACT}</span>
        </div>
        <div class="form-group stacked">
            <label>ACT Parcial</label>
            <span style="font-weight: bold; color: var(--color-level-info);">${Math.round(zeonACT / 2)}</span>
        </div>
    </fieldset>

    <div class="form-group">
        <label for="cansancioUsado">Cansancio Usado</label>
        <input type="number" id="cansancioUsado" name="cansancioUsado" value="0" min="0">
    </div>
    <div class="form-group">
        <label for="cansancioModificacion">Cansancio Modificación</label>
        <input type="number" id="cansancioModificacion" name="cansancioModificacion" value="15" min="1">
    </div>
  `;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Acumulación de Zeón",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 500,
      height: "auto"
    },
    content: dialogContent,
    buttons: [
      {
        action: "regenerate",
        label: "Regenerar Zeón",
        icon: "fas fa-heart",
        callback: () => "regenerate",
      },
      {
        action: "accumulate",
        label: "Acumular",
        icon: "fas fa-battery-three-quarters",
        default: true,
        callback: (event, button, dialog) => {
          const html = dialog.element;
          const cansancioUsado = parseFloat(html.querySelector("#cansancioUsado").value) || 0;
          const cansancioModificacion = parseFloat(html.querySelector("#cansancioModificacion").value) || 1;
          return { action: "accumulate", cansancioUsado, cansancioModificacion };
        },
      },
      {
        action: "return",
        label: "Devolver Zeón",
        icon: "fas fa-undo",
        callback: () => "return",
      },
      {
        action: "modify",
        label: "Hechizos Mantenidos",
        icon: "fas fa-list",
        callback: () => "modify",
      },
    ],
    rejectClose: false,
  });

  if (!result) return;

  if (result === "regenerate") {
    await regenerateZeon();
  } else if (result.action === "accumulate") {
    await accumulateDialog(result.cansancioUsado, result.cansancioModificacion);
  } else if (result === "return") {
    await returnDialog();
  } else if (result === "modify") {
    await modifyZeonMaintainedDialog();
  }
}

async function accumulateDialog(cansancioUsado, cansancioModificacion) {
  const content = `<p class="hint">¿Qué tipo de acumulación deseas realizar?</p>`;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Tipo de Acumulación",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 400,
      height: "auto"
    },
    content,
    buttons: [
      {
        action: "full",
        label: "Acumulación Plena",
        icon: "fas fa-battery-full",
        default: true,
        callback: () => "full",
      },
      {
        action: "partial",
        label: "Acumulación Parcial",
        icon: "fas fa-battery-half",
        callback: () => "partial",
      },
    ],
    rejectClose: false,
  });

  if (result === "full") {
    await updateAcumulation(0, cansancioUsado, cansancioModificacion);
  } else if (result === "partial") {
    await updateAcumulation(1, cansancioUsado, cansancioModificacion);
  }
}

async function returnDialog() {
  const content = `<p class="hint">Selecciona una opción para devolver el zeón acumulado:</p>`;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Opciones de Devolución",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 400,
      height: "auto"
    },
    content,
    buttons: [
      {
        action: "all",
        label: "Devolver Todo",
        icon: "fas fa-undo",
        default: true,
        callback: () => "all",
      },
      {
        action: "minusTen",
        label: "Devolver Todo -10",
        icon: "fas fa-undo",
        callback: () => "minusTen",
      },
    ],
    rejectClose: false,
  });

  if (result === "all") {
    await returnAccumulatedZeon("all");
  } else if (result === "minusTen") {
    await returnAccumulatedZeon("minusTen");
  }
}

mainDialog();