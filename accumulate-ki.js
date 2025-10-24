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

  function showClearAccumulationsDialog() {
    new Dialog({
      title: "Borrar Acumulaciones",
      content: "<p>¿Cómo quieres borrar las acumulaciones de ki?</p>",
      buttons: {
        afterUse: {
          label: "Después de uso",
          callback: () => clearAccumulations('despues de uso')
        },
        withoutUse: {
          label: "Sin uso",
          callback: () => clearAccumulations('sin uso')
        },
        cancel: {
          label: "Cancelar"
        }
      },
      default: "cancel"
    }).render(true);
  }

let agiAcum = token.actor.system.domine.kiAccumulation.agility.final.value;
let conAcum = token.actor.system.domine.kiAccumulation.constitution.final.value;
let dexAcum = token.actor.system.domine.kiAccumulation.dexterity.final.value;
let powAcum = token.actor.system.domine.kiAccumulation.power.final.value;
let strAcum = token.actor.system.domine.kiAccumulation.strength.final.value;
let wilAcum = token.actor.system.domine.kiAccumulation.willPower.final.value;
let currentFatigue = token.actor.system.characteristics.secondaries.fatigue.value;

let dialogContent = `
<div>
    <center><h3>Escoge los campos a acumular</h3></center>
</div>
<div>
    <center><i>La Acumulación Parcial te permite acumular ki de forma pasiva mientras realizas otras acciones, al coste de reducir la acumulación a la mitad (Redondeado hacia arriba). La Acumulación Plena te permite acumular todo el ki que te correspondería, pero te inhibe de realizar acciones activas este turno</i></center>
</div>
<div class="flexrow flex-center">
    <div class="flexcol">
        <center>
            <input id="AGIEnable" type="checkbox" checked/>
            <h3>AGI</h3>
            ${agiAcum}
            <br>
            <p style="color:#B22C2C";>V</p>
            ${Math.round(agiAcum / 2)}
        </center>
    </div>
    <div class="flexcol">
        <center>
            <input id="CONEnable" type="checkbox" checked/>
            <h3>CON</h3>
            ${conAcum}
            <br>
            <p style="color:#B22C2C";>V</p>
            ${Math.round(conAcum / 2)}
        </center>
    </div>
    <div class="flexcol">
        <center>
            <input id="DEXEnable" type="checkbox" checked/>
            <h3>DES</h3>
            ${dexAcum}
            <br>
            <p style="color:#B22C2C";>V</p>
            ${Math.round(dexAcum / 2)}
        </center>
    </div>
    <div class="flexcol">
        <center>
            <input id="POWEnable" type="checkbox" checked/>
            <h3>POD</h3>
            ${powAcum}
            <br>
            <p style="color:#B22C2C";>V</p>
            ${Math.round(powAcum / 2)}
        </center>
    </div>
    <div class="flexcol">
        <center>
            <input id="STREnable" type="checkbox" checked/>
            <h3>FUE</h3>
            ${strAcum}
            <br>
            <p style="color:#B22C2C";>V</p>
            ${Math.round(strAcum / 2)}
        </center>
    </div>
    <div class="flexcol">
        <center>
            <input id="WILEnable" type="checkbox" checked/>
            <h3>VOL</h3>
            ${wilAcum}
            <br>
            <p style="color:#B22C2C";>V</p>
            ${Math.round(wilAcum / 2)}
        </center>
    </div>
</div>
<div class="flexrow flex-center">
    <center>
        <label for="currentFatigue">Cansancio Actual: </label>
        <span id="currentFatigue">${currentFatigue}</span>
    </center>
</div>
<div class="flexrow flex-center">
    <center>
        <label for="fatigueInput">Cansancio Usado: </label>
        <input id="fatigueInput" type="number" min="0" value="0"/>
    </center>
</div>
<br>
`;

let stayOpen = false;

let d = new Dialog({
    title: "Ki Accumulation",
    content: dialogContent,
    buttons: {
        done: {
            label: "Acum. Plena",
            callback: (html) => {
                const agiChecked = html[0].querySelector("#AGIEnable").checked;
                const conChecked = html[0].querySelector("#CONEnable").checked;
                const dexChecked = html[0].querySelector("#DEXEnable").checked;
                const strChecked = html[0].querySelector("#STREnable").checked;
                const powChecked = html[0].querySelector("#POWEnable").checked;
                const wilChecked = html[0].querySelector("#WILEnable").checked;
                const fatigueUsed = parseInt(html[0].querySelector("#fatigueInput").value) || 0;

                if (!agiChecked && !conChecked && !dexChecked && !strChecked && !powChecked && !wilChecked) {
                    stayOpen = true;
                    throw new Error("SELECCIONA AL MENOS UN CAMPO A ACUMULAR");
                } else {
                    stayOpen = false;
                    updateAcumulation(0, agiChecked, conChecked, dexChecked, strChecked, powChecked, wilChecked, fatigueUsed);
                }
            }
        },
        show: {
            label: "Acum. Parcial",
            callback: (html) => {
                const agiChecked = html[0].querySelector("#AGIEnable").checked;
                const conChecked = html[0].querySelector("#CONEnable").checked;
                const dexChecked = html[0].querySelector("#DEXEnable").checked;
                const strChecked = html[0].querySelector("#STREnable").checked;
                const powChecked = html[0].querySelector("#POWEnable").checked;
                const wilChecked = html[0].querySelector("#WILEnable").checked;
                const fatigueUsed = parseInt(html[0].querySelector("#fatigueInput").value) || 0;

                if (!agiChecked && !conChecked && !dexChecked && !strChecked && !powChecked && !wilChecked) {
                    stayOpen = true;
                    throw new Error("SELECCIONA AL MENOS UN CAMPO A ACUMULAR");
                } else {
                    stayOpen = false;
                    updateAcumulation(1, agiChecked, conChecked, dexChecked, strChecked, powChecked, wilChecked, fatigueUsed);
                }
            }
        },
        clear: {
            label: "Borrar Acumulaciones",
            callback: (html) => showClearAccumulationsDialog()
          }
    },
    default: "done",
    close: () => {
        if (stayOpen) {
            stayOpen = false;
            d.render(true);
        }
    }
    }).render(true);