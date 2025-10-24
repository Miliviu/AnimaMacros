async function updateAcumulation(mode, agiChecked, conChecked, dexChecked, strChecked, powChecked, wilChecked, fatigueUsed) {
    const tokenAcum = token.actor.system.domine.kiAccumulation;
    let kiContainer = token.actor.system.domine.kiAccumulation.generic.value; // Contenedor genérico de ki
    let chatNotification = `<i>${token.name} `;
    let totalKiAccumulated = 0;

    
    if (mode === 0) {
        chatNotification += "ha acumulado de forma plena ";

        if (agiChecked) {
            let kiToUse = tokenAcum.agility.final.value + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.agility.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.agility.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) AGI `;
            totalKiAccumulated += update;
        }
        if (conChecked) {
            let kiToUse = tokenAcum.constitution.final.value + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }           
            kiContainer -= kiToUse;

            let current = tokenAcum.constitution.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.constitution.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) CON `;
            totalKiAccumulated += update;
        }
        if (dexChecked) {
            let kiToUse = tokenAcum.dexterity.final.value + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.dexterity.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.dexterity.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) DES `;
            totalKiAccumulated += update;
        }
        if (strChecked) {
            let kiToUse = tokenAcum.strength.final.value + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.strength.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.strength.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) FUE `;
            totalKiAccumulated += update;
        }
        if (powChecked) {
            let kiToUse = tokenAcum.power.final.value + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.power.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.power.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) POD `;
            totalKiAccumulated += update;
        }
        if (wilChecked) {
            let kiToUse = tokenAcum.willPower.final.value + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.willPower.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.willPower.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) VOL `;
            totalKiAccumulated += update;
        }
    } else {
        chatNotification += "ha acumulado de forma parcial (";

        if (agiChecked) {
            let kiToUse = Math.round(tokenAcum.agility.final.value / 2) + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }           
            kiContainer -= kiToUse;

            let current = tokenAcum.agility.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.agility.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) AGI `;
            totalKiAccumulated += update;
        }
        if (conChecked) {
            let kiToUse = Math.round(tokenAcum.constitution.final.value / 2) + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.constitution.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.constitution.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) CON `;
            totalKiAccumulated += update;
        }
        if (dexChecked) {
            let kiToUse = Math.round(tokenAcum.dexterity.final.value / 2) + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.dexterity.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.dexterity.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) DES `;
            totalKiAccumulated += update;
        }
        if (strChecked) {
            let kiToUse = Math.round(tokenAcum.strength.final.value / 2) + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.strength.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.strength.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) FUE `;
            totalKiAccumulated += update;
        }
        if (powChecked) {
            let kiToUse = Math.round(tokenAcum.power.final.value / 2) + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            
            kiContainer -= kiToUse;

            let current = tokenAcum.power.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.power.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) POD `;
            totalKiAccumulated += update
        }
        if (wilChecked) {
            let kiToUse = Math.round(tokenAcum.willPower.final.value / 2) + fatigueUsed;
            if (kiContainer < kiToUse) {
                ui.notifications.error("No tienes suficiente Ki en el contenedor genérico para acumular AGI.");
                return; 
            }            kiContainer -= kiToUse;

            let current = tokenAcum.willPower.accumulated.value;
            let update = current + kiToUse;
            await token.actor.update({ "system.domine.kiAccumulation.willPower.accumulated.value": update });
            chatNotification += `${kiToUse}(${update}) VOL `;
            totalKiAccumulated += update
        }
    }

    await token.actor.update({ "system.domine.kiAccumulation.generic.value": kiContainer });

    let currentFatigue = token.actor.system.characteristics.secondaries.fatigue.value;
    let newFatigue = currentFatigue - fatigueUsed;
    await token.actor.update({ "system.characteristics.secondaries.fatigue.value": newFatigue });

    chatNotification += ` puntos de ki(${totalKiAccumulated}) usando ${fatigueUsed} puntos de cansancio.</i>`;
    ChatMessage.create({ content: chatNotification });
}


function clearAccumulations(mode) {
    const tokenAcum = token.actor.system.domine.kiAccumulation;
    const attributes = ['agility', 'constitution', 'dexterity', 'strength', 'power', 'willPower'];
    let totalAccumulated = 0;
  
    attributes.forEach(attr => {
        const accumulatedValue = tokenAcum[attr].accumulated.value;
        totalAccumulated += accumulatedValue;

        token.actor.update({ [`system.domine.kiAccumulation.${attr}.accumulated.value`]: 0 });
    });

    let kiContainer = token.actor.system.domine.kiAccumulation.generic.value;
    let kiToRemove = 0;

    if (mode === 'sin uso') {
        if (totalAccumulated >= 120) {
            kiToRemove = Math.floor(totalAccumulated / 2);
        } else if (totalAccumulated >= 80) {
            kiToRemove = 10;
        } else if (totalAccumulated >= 40) {
            kiToRemove = 5;
        } else if (totalAccumulated >= 20) {
            kiToRemove = 1;
        }
    }

    let newKi = Math.max(kiContainer + totalAccumulated - kiToRemove, 0);
    token.actor.update({ "system.domine.kiAccumulation.generic.value": newKi });

    ChatMessage.create({ 
        content: `<i>${token.name} ha borrado todas sus acumulaciones de ki ${
            mode === 'sin uso' 
            ? `y ha recuperado ${totalAccumulated - kiToRemove} ki (con penalización de ${kiToRemove}).`
            : `y ha recuperado ${totalAccumulated} ki.`
        }</i>` 
    });
}

async function showClearAccumulationsDialog() {
  const content = `<p class="hint">¿Cómo quieres borrar las acumulaciones de ki?</p>`;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Borrar Acumulaciones",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 400,
      height: "auto"
    },
    content,
    buttons: [
      {
        action: "afterUse",
        label: "Después de uso",
        icon: "fas fa-check",
        callback: () => "afterUse",
      },
      {
        action: "withoutUse",
        label: "Sin uso",
        icon: "fas fa-times",
        callback: () => "withoutUse",
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fas fa-ban",
      },
    ],
    default: "cancel",
    rejectClose: false,
  });

  if (result === "afterUse") {
    clearAccumulations('despues de uso');
  } else if (result === "withoutUse") {
    clearAccumulations('sin uso');
  }
}

let agiAcum = token.actor.system.domine.kiAccumulation.agility.final.value;
let conAcum = token.actor.system.domine.kiAccumulation.constitution.final.value;
let dexAcum = token.actor.system.domine.kiAccumulation.dexterity.final.value;
let powAcum = token.actor.system.domine.kiAccumulation.power.final.value;
let strAcum = token.actor.system.domine.kiAccumulation.strength.final.value;
let wilAcum = token.actor.system.domine.kiAccumulation.willPower.final.value;
let currentFatigue = token.actor.system.characteristics.secondaries.fatigue.value;

async function mainDialog() {
  const dialogContent = `
    <p class="hint">
        La <strong>Acumulación Parcial</strong> te permite acumular ki de forma pasiva mientras realizas otras acciones, 
        al coste de reducir la acumulación a la mitad (Redondeado hacia arriba). La <strong>Acumulación Plena</strong> 
        te permite acumular todo el ki que te correspondería, pero te inhibe de realizar acciones activas este turno.
    </p>

    <fieldset>
        <legend>Selecciona los campos a acumular</legend>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
            <div class="form-group stacked">
                <label>
                    <input id="AGIEnable" type="checkbox" checked/>
                    <strong>AGI</strong>
                </label>
                <span>Plena: ${agiAcum}</span>
                <span style="color: var(--color-level-error);">Parcial: ${Math.round(agiAcum / 2)}</span>
            </div>
            <div class="form-group stacked">
                <label>
                    <input id="CONEnable" type="checkbox" checked/>
                    <strong>CON</strong>
                </label>
                <span>Plena: ${conAcum}</span>
                <span style="color: var(--color-level-error);">Parcial: ${Math.round(conAcum / 2)}</span>
            </div>
            <div class="form-group stacked">
                <label>
                    <input id="DEXEnable" type="checkbox" checked/>
                    <strong>DES</strong>
                </label>
                <span>Plena: ${dexAcum}</span>
                <span style="color: var(--color-level-error);">Parcial: ${Math.round(dexAcum / 2)}</span>
            </div>
            <div class="form-group stacked">
                <label>
                    <input id="POWEnable" type="checkbox" checked/>
                    <strong>POD</strong>
                </label>
                <span>Plena: ${powAcum}</span>
                <span style="color: var(--color-level-error);">Parcial: ${Math.round(powAcum / 2)}</span>
            </div>
            <div class="form-group stacked">
                <label>
                    <input id="STREnable" type="checkbox" checked/>
                    <strong>FUE</strong>
                </label>
                <span>Plena: ${strAcum}</span>
                <span style="color: var(--color-level-error);">Parcial: ${Math.round(strAcum / 2)}</span>
            </div>
            <div class="form-group stacked">
                <label>
                    <input id="WILEnable" type="checkbox" checked/>
                    <strong>VOL</strong>
                </label>
                <span>Plena: ${wilAcum}</span>
                <span style="color: var(--color-level-error);">Parcial: ${Math.round(wilAcum / 2)}</span>
            </div>
        </div>
    </fieldset>

    <div class="form-group stacked">
        <label>Cansancio Actual</label>
        <span id="currentFatigue">${currentFatigue}</span>
    </div>
    <div class="form-group">
        <label for="fatigueInput">Cansancio Usado</label>
        <input id="fatigueInput" type="number" min="0" value="0"/>
    </div>
  `;

  const result = await foundry.applications.api.DialogV2.wait({
    window: { 
      title: "Acumulación de Ki",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 600,
      height: "auto"
    },
    content: dialogContent,
    buttons: [
      {
        action: "full",
        label: "Acum. Plena",
        icon: "fas fa-battery-full",
        default: true,
        callback: (event, button, dialog) => {
          const html = dialog.element;
          return {
            action: "full",
            agiChecked: html.querySelector("#AGIEnable").checked,
            conChecked: html.querySelector("#CONEnable").checked,
            dexChecked: html.querySelector("#DEXEnable").checked,
            strChecked: html.querySelector("#STREnable").checked,
            powChecked: html.querySelector("#POWEnable").checked,
            wilChecked: html.querySelector("#WILEnable").checked,
            fatigueUsed: parseInt(html.querySelector("#fatigueInput").value) || 0,
          };
        },
      },
      {
        action: "partial",
        label: "Acum. Parcial",
        icon: "fas fa-battery-half",
        callback: (event, button, dialog) => {
          const html = dialog.element;
          return {
            action: "partial",
            agiChecked: html.querySelector("#AGIEnable").checked,
            conChecked: html.querySelector("#CONEnable").checked,
            dexChecked: html.querySelector("#DEXEnable").checked,
            strChecked: html.querySelector("#STREnable").checked,
            powChecked: html.querySelector("#POWEnable").checked,
            wilChecked: html.querySelector("#WILEnable").checked,
            fatigueUsed: parseInt(html.querySelector("#fatigueInput").value) || 0,
          };
        },
      },
      {
        action: "clear",
        label: "Borrar Acumulaciones",
        icon: "fas fa-eraser",
        callback: () => "clear",
      },
    ],
    rejectClose: false,
  });

  if (!result) return;

  if (result === "clear") {
    await showClearAccumulationsDialog();
    return;
  }

  const { agiChecked, conChecked, dexChecked, strChecked, powChecked, wilChecked, fatigueUsed } = result;

  if (!agiChecked && !conChecked && !dexChecked && !strChecked && !powChecked && !wilChecked) {
    ui.notifications.error("SELECCIONA AL MENOS UN CAMPO A ACUMULAR");
    await mainDialog(); // Re-open the dialog
    return;
  }

  const mode = result.action === "full" ? 0 : 1;
  await updateAcumulation(mode, agiChecked, conChecked, dexChecked, strChecked, powChecked, wilChecked, fatigueUsed);
}

mainDialog();