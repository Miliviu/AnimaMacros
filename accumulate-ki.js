async function updateAcumulation(mode, agiChecked, conChecked, dexChecked, strChecked, powChecked, wilChecked, fatigueUsed) {
    const tokenAcum = token.actor.system.domine.kiAccumulation;
    var genericUpdate = 0;
    
    var chatNotification = `<i>${token.name} </i>`;
    if (mode == 0) {
        chatNotification = chatNotification + "<i>ha acumulado de forma plena (</i>";

        if (agiChecked) {
            let update = tokenAcum.agility.accumulated.value + tokenAcum.agility.final.value + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.agility.accumulated.value": update });

            genericUpdate = genericUpdate + tokenAcum.agility.final.value + fatigueUsed;

            chatNotification = chatNotification + `<i>${tokenAcum.agility.final.value + fatigueUsed} AGI </i>`;
        }
        if (conChecked) {
            let update = tokenAcum.constitution.accumulated.value + tokenAcum.constitution.final.value + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.constitution.accumulated.value": update });

            genericUpdate = genericUpdate + tokenAcum.constitution.final.value + fatigueUsed;

            chatNotification = chatNotification + `<i>${tokenAcum.constitution.final.value + fatigueUsed} CON </i>`;
        }
        if (dexChecked) {
            let update = tokenAcum.dexterity.accumulated.value + tokenAcum.dexterity.final.value + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.dexterity.accumulated.value": update });

            genericUpdate = genericUpdate + tokenAcum.dexterity.final.value + fatigueUsed;

            chatNotification = chatNotification + `<i>${tokenAcum.dexterity.final.value + fatigueUsed} DES </i>`;
        }
        if (strChecked) {
            let update = tokenAcum.strength.accumulated.value + tokenAcum.strength.final.value + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.strength.accumulated.value": update });

            genericUpdate = genericUpdate + tokenAcum.strength.final.value + fatigueUsed;

            chatNotification = chatNotification + `<i>${tokenAcum.strength.final.value + fatigueUsed} FUE </i>`;
        }
        if (powChecked) {
            let update = tokenAcum.power.accumulated.value + tokenAcum.power.final.value + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.power.accumulated.value": update });

            genericUpdate = genericUpdate + tokenAcum.power.final.value + fatigueUsed;

            chatNotification = chatNotification + `<i>${tokenAcum.power.final.value + fatigueUsed} POD </i>`;
        }
        if (wilChecked) {
            let update = tokenAcum.willPower.accumulated.value + tokenAcum.willPower.final.value + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.willPower.accumulated.value": update });

            genericUpdate = genericUpdate + tokenAcum.willPower.final.value + fatigueUsed;

            chatNotification = chatNotification + `<i>${tokenAcum.willPower.final.value + fatigueUsed} VOL </i>`;
        }

        genericUpdate = genericUpdate + tokenAcum.generic.value;
        if (genericUpdate >= tokenAcum.generic.max) {
            genericUpdate = tokenAcum.generic.max;
        }
        token.actor.update({ "system.domine.kiAccumulation.generic.value": genericUpdate });

    } else {
        chatNotification = chatNotification + "<i>ha acumulado de forma parcial (</i>";

        if (agiChecked) {
            let update = tokenAcum.agility.accumulated.value + Math.round(tokenAcum.agility.final.value / 2) + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.agility.accumulated.value": update });

            genericUpdate = genericUpdate + Math.round(tokenAcum.agility.final.value / 2) + fatigueUsed;

            chatNotification = chatNotification + `<i>${Math.round(tokenAcum.agility.final.value / 2) + fatigueUsed} AGI </i>`;
        }
        if (conChecked) {
            let update = tokenAcum.constitution.accumulated.value + Math.round(tokenAcum.constitution.final.value / 2) + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.constitution.accumulated.value": update });

            genericUpdate = genericUpdate + Math.round(tokenAcum.constitution.final.value / 2) + fatigueUsed;

            chatNotification = chatNotification + `<i>${Math.round(tokenAcum.constitution.final.value / 2) + fatigueUsed} CON </i>`;
        }
        if (dexChecked) {
            let update = tokenAcum.dexterity.accumulated.value + Math.round(tokenAcum.dexterity.final.value / 2) + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.dexterity.accumulated.value": update });

            genericUpdate = genericUpdate + Math.round(tokenAcum.dexterity.final.value / 2) + fatigueUsed;

            chatNotification = chatNotification + `<i>${Math.round(tokenAcum.dexterity.final.value / 2) + fatigueUsed} DES </i>`;
        }
        if (strChecked) {
            let update = tokenAcum.strength.accumulated.value + Math.round(tokenAcum.strength.final.value / 2) + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.strength.accumulated.value": update });

            genericUpdate = genericUpdate + Math.round(tokenAcum.strength.final.value / 2) + fatigueUsed;

            chatNotification = chatNotification + `<i>${Math.round(tokenAcum.strength.final.value / 2) + fatigueUsed} FUE </i>`;
        }
        if (powChecked) {
            let update = tokenAcum.power.accumulated.value + Math.round(tokenAcum.power.final.value / 2) + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.power.accumulated.value": update });

            genericUpdate = genericUpdate + Math.round(tokenAcum.power.final.value / 2) + fatigueUsed;

            chatNotification = chatNotification + `<i>${Math.round(tokenAcum.power.final.value / 2) + fatigueUsed} POD </i>`;
        }
        if (wilChecked) {
            let update = tokenAcum.willPower.accumulated.value + Math.round(tokenAcum.willPower.final.value / 2) + fatigueUsed;
            token.actor.update({ "system.domine.kiAccumulation.willPower.accumulated.value": update });

            genericUpdate = genericUpdate + Math.round(tokenAcum.willPower.final.value / 2) + fatigueUsed;

            chatNotification = chatNotification + `<i>${Math.round(tokenAcum.willPower.final.value / 2) + fatigueUsed} VOL </i>`;
        }

        genericUpdate = genericUpdate + tokenAcum.generic.value;
        if (genericUpdate >= tokenAcum.generic.max) {
            genericUpdate = tokenAcum.generic.max;
        }
        token.actor.update({ "system.domine.kiAccumulation.generic.value": genericUpdate });
    }

    let currentFatigue = token.actor.system.characteristics.secondaries.fatigue.value;
    let newFatigue = currentFatigue - fatigueUsed;
    token.actor.update({ "system.characteristics.secondaries.fatigue.value": newFatigue });

    chatNotification = chatNotification + `<i>) puntos de ki, usando ${fatigueUsed} puntos de cansancio</i>`;
    ChatMessage.create({ content: chatNotification });
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
                                <input id="AGIEnable" type="checkbox"/> 
                                <h3>AGI</h3> ${agiAcum} <br> <p style="color:#B22C2C";>V</p> ${Math.round(agiAcum / 2)}
                            </center>
                        </div>
                        <div class="flexcol">
                            <center>
                                <input id="CONEnable" type="checkbox"/> 
                                <h3>CON</h3> ${conAcum} <br> <p style="color:#B22C2C";>V</p> ${Math.round(conAcum / 2)}
                            </center>
                        </div>
                        <div class="flexcol">
                            <center>
                                <input id="DEXEnable" type="checkbox"/> 
                                <h3>DES</h3> ${dexAcum} <br> <p style="color:#B22C2C";>V</p> ${Math.round(dexAcum / 2)}
                            </center>
                        </div>
                        <div class="flexcol">
                            <center>
                                <input id="POWEnable" type="checkbox"/> 
                                <h3>POD</h3> ${powAcum} <br> <p style="color:#B22C2C";>V</p> ${Math.round(powAcum / 2)}
                            </center>
                        </div>
                        <div class="flexcol">
                            <center>
                                <input id="STREnable" type="checkbox"/> 
                                <h3>FUE</h3> ${strAcum} <br> <p style="color:#B22C2C";>V</p> ${Math.round(strAcum / 2)}
                            </center>
                        </div>
                        <div class="flexcol">
                            <center>
                                <input id="WILEnable" type="checkbox"/> 
                                <h3>VOL</h3> ${wilAcum} <br> <p style="color:#B22C2C";>V</p> ${Math.round(wilAcum / 2)}
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