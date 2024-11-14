let zeonACT = token.actor.system.mystic.act.main.final.value;
let zeonBaseTotal = token.actor.system.mystic.zeon.max;
let zeonBaseCurr = token.actor.system.mystic.zeon.value;
let zeonAcum = token.actor.system.mystic.zeon.accumulated;
let fatigueCurr = token.actor.system.characteristics.secondaries.fatigue.value;

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
    token.actor.update({"system.characteristics.secondaries.fatigue.value": updatedFatigue});

    if (mode == 0) {
        chatNotification = chatNotification + " ha acumulado de forma plena ";

        let updateZeonBase = zeonBaseCurr - (zeonACT + cansancioEffect);
        if (updateZeonBase < 0) {
            updateZeonBase = 0;
        }
        token.actor.update({"system.mystic.zeon.value": updateZeonBase});

        updateZeon = zeonAcum + (zeonACT + cansancioEffect);
        token.actor.update({"system.mystic.zeon.accumulated": updateZeon});

        chatNotification = chatNotification + "<b>" + (zeonACT + cansancioEffect) + "</b> puntos de zeon este turno y tiene acumulado ";
    } else {
        chatNotification = chatNotification + " ha acumulado de forma parcial ";

        let updateZeonBase = zeonBaseCurr - (Math.round(zeonACT / 2) + cansancioEffect);
        if (updateZeonBase < 0) {
            updateZeonBase = 0;
        }
        token.actor.update({"system.mystic.zeon.value": updateZeonBase});

        updateZeon = zeonAcum + (Math.round(zeonACT / 2) + cansancioEffect);
        token.actor.update({"system.mystic.zeon.accumulated": updateZeon});

        chatNotification = chatNotification + "<b>" + (Math.round(zeonACT / 2) + cansancioEffect) + "</b> puntos de zeon este turno y tiene acumulado ";
    }
    chatNotification = chatNotification + "<b>" + updateZeon + "</b> puntos de zeon";
    
    chatNotification = chatNotification + `<br><b>Cansancio actual:</b> ${updatedFatigue}`;

    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({token: actor}),
        content: chatNotification
    });
}

let dialogContent = `
    <div>
        <center><h3>Acumulación de zeón</h3></center>
    </div>
    <div>
        <center><i>La Acumulación Parcial te permite acumular zeon de forma pasiva mientras realizas otras acciones, al coste de reducir la acumulación a la mitad. La Acumulación Plena te permite acumular todo el zeon que te correspondería, pero te inhibe de realizar acciones activas este turno fuera de lanzar conjuros.</i></center>
    </div>
    <div>
        <center>
            <h2>Zeon acumulado: ${zeonAcum}</h2>
            Zeon máximo: ${zeonBaseTotal}, Zeon actual: ${zeonBaseCurr}<br>
            Fatiga actual: ${fatigueCurr}
        </center>
    </div>
    <div class="flexrow flex-center">
        <div class="flexrow">
            <center>
                <h2>ACT Plena</h2> ${zeonACT} <br>
            </center>
        </div>
        <div class="flexrow">
            <center>
                <h2>ACT Parcial</h2> ${Math.round(zeonACT / 2)} <br>
            </center>
        </div>
    </div>
    <div class="form-group">
        <label for="cansancioUsado">Cansancio Usado:</label>
        <input type="number" id="cansancioUsado" name="cansancioUsado" value="0">
    </div>
    <div class="form-group">
        <label for="cansancioModificacion">Cansancio Modificación:</label>
        <input type="number" id="cansancioModificacion" name="cansancioModificacion" value="15">
    </div>
    <br>
`;

let stayOpen = false;
let d = new Dialog({
    title: "Zeon Accumulation",
    content: dialogContent,
    buttons: {
        done: {
            label: "Acum. Plena",
            callback: (html) => {
                stayOpen = false;
                let cansancioUsado = parseFloat(html.find('#cansancioUsado').val()) || 0;
                let cansancioModificacion = parseFloat(html.find('#cansancioModificacion').val()) || 1;
                updateAcumulation(0, cansancioUsado, cansancioModificacion);
            }
        },
        show: {
            label: "Acum. Parcial",
            callback: (html) => {
                stayOpen = false;
                let cansancioUsado = parseFloat(html.find('#cansancioUsado').val()) || 0;
                let cansancioModificacion = parseFloat(html.find('#cansancioModificacion').val()) || 1;
                updateAcumulation(1, cansancioUsado, cansancioModificacion);
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