let zeonAccum = token.actor.system.mystic.zeon.accumulated;
const spells = token.actor.system.mystic.spells;
const tokenAttrs = token.actor.system.characteristics.primaries;
let zeonMant = token.actor.system.mystic.zeonMaintained.value;

const nanoid = (t = 21) => {
  let e = "";
  const r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--; ) {
    const n = 63 & r[t];
    e +=
      n < 36
        ? n.toString(36)
        : n < 62
        ? (n - 26).toString(36).toUpperCase()
        : n < 63
        ? "_"
        : "-";
  }
  return e;
};

async function optionsDialog() {
  let spellOptions = "";
  for (const via in viaSpells) {
    spellOptions += `<optgroup label="${
      via.charAt(0).toUpperCase() + via.slice(1)
    }">`;
    for (const i in viaSpells[via]) {
      const spell = viaSpells[via][i];
      spellOptions += `<option value="${via}-${i}">${spell.name}</option>`;
    }
    spellOptions += "</optgroup>";
  }

  const content = `
        <p class="hint">
            Selecciona el hechizo que quieras utilizar y el grado deseado. 
            Presiona <strong>Previsualizar</strong> para ver los detalles antes de lanzarlo.
        </p>
        <div class="form-group">
            <label for="spell-menu">Hechizo</label>
            <select id="spell-menu" name="spell-options">
                ${spellOptions}
            </select>
        </div>
        <div class="form-group">
            <label for="spell-grade">Grado</label>
            <select id="spell-grade" name="grade-options">
                <option value="base">Base</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
                <option value="arcane">Arcano</option>
            </select>
        </div>
    `;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Usar hechizo",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 450,
      height: "auto"
    },
    content,
    buttons: [
      {
        action: "preview",
        label: "Previsualizar",
        default: true,
        callback: (event, button, dialog) => {
          const html = dialog.element;
          const selectedSpellId = html.querySelector("#spell-menu").value;
          const selectedSpellGrade = html.querySelector("#spell-grade").value;
          return { selectedSpellId, selectedSpellGrade };
        },
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fas fa-times",
      },
    ],
    rejectClose: false,
  });

  if (result && result.selectedSpellId) {
    await previewDialog(result.selectedSpellId, result.selectedSpellGrade);
  }
}

async function previewDialog(selectedSpellId, selectedSpellGrade) {
  zeonAccum = token.actor.system.mystic.zeon.accumulated;
  zeonMant = token.actor.system.mystic.zeonMaintained.value;
  const [via, i] = selectedSpellId.split("-");
  const spell = viaSpells[via][i];
  const spellData = spell.system.grades[selectedSpellGrade];

  const hasEnoughZeon = (zeonAccum ?? 0) >= Number(spellData.zeon.value);
  const hasEnoughIntelligence = tokenAttrs.intelligence.value >= spellData.intRequired.value;
  const canCast = hasEnoughZeon && hasEnoughIntelligence;
  const canMaintain = canCast && 
    !isNaN(Number(spellData.maintenanceCost.value)) && 
    Number(spellData.maintenanceCost.value) > 0;

  const content = `
        <h2>${spell.name}</h2>
        
        <fieldset>
            <legend>Detalles del Hechizo</legend>
            <div class="form-group stacked">
                <label>Grado</label>
                <span>${selectedSpellGrade.charAt(0).toUpperCase() + selectedSpellGrade.slice(1)}</span>
            </div>
            <div class="form-group stacked">
                <label>Inteligencia requerida</label>
                <span>${spellData.intRequired.value}</span>
            </div>
            <div class="form-group stacked">
                <label>Costo de Zeón</label>
                <span>${spellData.zeon.value}</span>
            </div>
            <div class="form-group stacked">
                <label>Costo de mantención</label>
                <span>${spellData.maintenanceCost.value || 'N/A'}</span>
            </div>
        </fieldset>

        ${spellData.description.value ? `
        <fieldset>
            <legend>Descripción</legend>
            <p style="margin: 0;">${spellData.description.value}</p>
        </fieldset>
        ` : ''}
        
        <div class="form-group stacked">
            <label>Tu Zeón acumulado</label>
            <span class="${hasEnoughZeon ? 'success' : 'error'}" style="font-weight: bold; font-size: 1.2em;">${zeonAccum ?? 0}</span>
        </div>
        
        ${!hasEnoughZeon ? '<p class="notification error">No tienes Zeón/inteligencia suficiente</p>' : ''}
    `;

  const buttons = [];

  if (!canCast) {
    buttons.push({
      action: "insufficient",
      label: "No tienes Zeón/inteligencia suficiente",
      icon: "fas fa-exclamation-triangle",
      disabled: true,
    });
  } else {
    buttons.push({
      action: "cast",
      label: "Utilizar hechizo",
      icon: "fas fa-magic",
      default: true,
      callback: () => "cast",
    });

    if (canMaintain) {
      buttons.push({
        action: "maintain",
        label: "Mantener",
        icon: "fas fa-hourglass-half",
        callback: () => "maintain",
      });
    }
  }

  buttons.push({
    action: "cancel",
    label: "Cancelar",
    icon: "fas fa-times",
  });

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Vista previa del hechizo",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 500,
      height: "auto"
    },
    content,
    buttons,
    rejectClose: false,
  });

  if (result === "cast") {
    await updateZeon(0, spell, spellData, selectedSpellGrade);
  } else if (result === "maintain") {
    await updateZeon(1, spell, spellData, selectedSpellGrade);
  }
}

async function updateZeon(mode, spell, spellData, selectedSpellGrade) {
  const parseRegex = /(\d+ - ){0,1}(.+)/;
  const parsedName = spell.name.match(parseRegex)[2];
  let cost = spellData.zeon.value ?? 0;
  let maintainedCost = spellData.maintenanceCost.value ?? 0;
  
  if (mode == 1) {
    const hasDailyMaintenance = spell.system.hasDailyMaintenance?.value ?? false;
    
    if (hasDailyMaintenance) {
      let dailySpells = token.actor.system.mystic.spellMaintenances || [];
      const newSpell = {
        _id: nanoid(),
        name: spell.name,
        system: { cost: { value: maintainedCost } },
      };
      dailySpells.push(newSpell);
      await token.actor.update({
        "system.mystic.spellMaintenances": dailySpells,
      });
    } else {
      let selectedSpells = token.actor.system.mystic.selectedSpells || [];
      const newSpell = {
        _id: nanoid(),
        name: spell.name,
        system: { 
          cost: { value: maintainedCost },
          grade: { value: selectedSpellGrade }
        },
      };
      selectedSpells.push(newSpell);
      await token.actor.update({
        "system.mystic.selectedSpells": selectedSpells,
      });
    }
  }
  
  token.actor.update({
    "system.mystic.zeon.accumulated": (zeonAccum ?? 0) - cost,
  });
  const additionalContent =
    mode === 1
      ? `
        <p>
            Costo de mantenimiento: <span class="cost">${maintainedCost}</span> de zeon</span>.
        </p>
    `
      : "";
  const content = `
 <div style="border: 2px solid #8b0000; border-radius: 10px; background-color: #f8f1e5; padding: 15px; margin-top: 15px; font-family: 'Georgia', serif; box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);">
        <h3 style="text-align: center; color: #8b4513; text-transform: uppercase; font-weight: bold; font-size: 18px; border-bottom: 2px solid #8b0000; padding-bottom: 5px;">${
          token.actor.name
        } lanza un hechizo</h3>
        <p>
            <span style="font-weight: bold; color: #6b4423; font-style: italic;">${parsedName}</span> ha sido 
            ${mode == 0 ? "utilizado" : "mantenido"} en el grado 
            <span style="color: #a0522d; font-weight: bold;">${selectedSpellGrade}</span>.
        </p>
        <p>
            Costo de Zeón: <span style="font-weight: bold; color: #8b0000;">${cost}</span>.
        </p>
        ${additionalContent}
        <p>${spell.system.description.value}</p>
        <p>
            <strong>Descripción del grado:</strong>
        </p>
        <p>${spellData.description.value}</p>
    </div>
`;

  ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content,
  });
}

const viaSpells = spells.reduce((obj, spell) => {
  if (obj[spell.system.via.value] === undefined) {
    return {
      ...obj,
      [spell.system.via.value]: [spell],
    };
  } else {
    return {
      ...obj,
      [spell.system.via.value]: [...obj[spell.system.via.value], spell],
    };
  }
}, {});
for (const via in viaSpells) {
  viaSpells[via].sort((a, b) => {
    const parseRegex = /(\d+)( - )*(.+)/;
    const aMatch = a.name ? a.name.match(parseRegex) : null;
    const bMatch = b.name ? b.name.match(parseRegex) : null;

    // Si a.name o b.name no tienen un formato válido, los dejamos sin ordenar
    if (!aMatch || !bMatch) return 0;

    const anum = Number(aMatch[1]);
    const bnum = Number(bMatch[1]);

    if (isNaN(anum) || isNaN(bnum)) return 0;

    return anum - bnum;
  });
}
//const viaSpells = Object.groupBy(spells, ({ system }) => system.via.value);

optionsDialog();