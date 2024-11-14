let zeonAccum = token.actor.system.mystic.zeon.accumulated;
const spells = token.actor.system.mystic.spells;
const tokenAttrs = token.actor.system.characteristics.primaries;

let stayPreviewOpen = false;
let stayOpen = false;


function optionsDialog() {
    let spellOptions = '';
    for (const via in viaSpells) {
        spellOptions += `<optgroup label="${via.charAt(0).toUpperCase() + via.slice(1)}">`;
        for (const i in viaSpells[via]) {
            const spell = viaSpells[via][i];
            spellOptions += `<option value="${via}-${i}">${spell.name}</option>`;
        }
        spellOptions += '</optgroup>';
    }

    const content = `
        <div>
            <h1>Usar hechizo</h1>
        </div>
        <div>
            <p>
                Seleciona el hechizo que quieras utilizar. Presiona el botón inferior
                para ver una vista previa. En caso de no contar con el Zeón suficiente,
                no podrás utilizarlo y se te informará de ello.
            </p>
        </div>
        <div class="flexrow">
            <select id="spell-menu" name="spell-options">
                ${spellOptions}
            </select>
            <select id="spell-grade" name="grade-options">
                <option value="base">Base</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
                <option value="arcane">Arcano</option>
            </select>
        </div>
        <br>
    `;

    const d = new Dialog({
        title: 'Usar hechizo',
        content: content,
        buttons: {
            preview: {
                label: 'Previsualizar',
                callback: (html) => {
                    const selectedSpellId = html[0].querySelector('#spell-menu').value;
                    const selectedSpellGrade = html[0].querySelector('#spell-grade').value;
                    if (selectedSpellId === undefined) {
                        stayOpen = true;
                        throw new Error('Selecciona una habilidad');
                    } else {
                        stayOpen = true;
                        previewDialog(selectedSpellId, selectedSpellGrade).render(true);
                    }
                },
            },
        },
        default: 'preview',
        close: () => {
            if (stayOpen) {
                stayOpen = false;
                d.render(true);
            }
        },
    });
    return d;
}

function previewDialog(selectedSpellId, selectedSpellGrade) {
    zeonAccum = token.actor.system.mystic.zeon.accumulated;
    const [ via, i ] = selectedSpellId.split('-');
    const spell = viaSpells[via][i];
    const spellData = spell.system.grades[selectedSpellGrade];

    const content = `
        <style>
            .spell-prop {
                justify-content: center;
                gap: 10px;
            }
            .spell-prop > p:nth-child(1) {
                text-align: end;
            }
        </style>
        <div>
            <h3><strong>Confirma tu hechizo</strong></h3>
        </div>
        <div>
            <p>
                Revisa la información del hechizo a lanzar. Cuando
                estés listo, confirma abajo.
            </p>
        </div>
        <div class="flexcol">
            <center>
                <h3>${spell.name}</h3>
            </center>
            <div class="flexrow spell-prop">
                <p>Descripción: </p>
                <p>${spellData.description.value}</p>
            </div>
            <div class="flexrow spell-prop">
                <p>Inteligencia requerida:</p>
                <p>${spellData.intRequired.value}</p>
            </div>
            <div class="flexrow spell-prop">
                <p>Costo de Zeón:</p>
                <p>${spellData.zeon.value}</p>
            </div>
            <div class="flexrow spell-prop">
                <p>Costo de mantención:</p>
                <p>${spellData.maintenanceCost.value}
            </div>
        </div>
        <div class="flexrow spell-prop">
            <p><strong>Tu Zeón acumulado:</strong></p>
            ${((zeonAccum ?? 0) < spellData.zeon.value ? '<p style="color: red">' : '<p style="color: green">') + (zeonAccum ?? 0) + '</p>'}
        </div>
    `;

    const d = new Dialog({
        title: 'Vista previa',
        content,
        buttons:
            ((zeonAccum ?? 0) < spellData.zeon.value && (zeonAccum ?? 0) < Number(spellData.maintenanceCost.value))
            || tokenAttrs.intelligence.value < spellData.intRequired.value
            ? {
                confirm: {
                    label: 'No tienes Zeón/inteligencia suficiente',
                    callback: () => {},
                    disabled: true,
                },
            }
            : {
                confirm: {
                    label: 'Utilizar hechizo',
                    callback: () => {
                        stayPreviewOpen = false;
                        updateZeon(0, spell, spellData);
                    },
                    disabled: (zeonAccum ?? 0) < spellData.zeon.value,
                },
                maintain: {
                    label: isNaN(Number(spellData.maintenanceCost.value)) ? 'No se mantiene' : 'Mantener',
                    callback: () => {
                        stayPreviewOpen = false;
                        updateZeon(1, spell, spellData);
                    },
                    disabled: isNaN(Number(spellData.maintenanceCost.value)) || (zeonAccum ?? 0) < Number(spellData.maintenanceCost.value),
                },
            },
        close: () => {
            if (stayPreviewOpen) {
                stayPreviewOpen = false;
                d.render(true);
            }
        },
    });
    return d;
}


async function updateZeon(mode, spell, spellData) {
    const parseRegex = /(\d+ - ){0,1}(.+)/;
    const parsedName = spell.name.match(parseRegex)[2];

    const cost = mode == 0 ? (spellData.zeon.value ?? 0) : (isNaN(Number(spellData.maintenanceCost.value)) ? 0 : Number(spellData.maintenanceCost.value));
    token.actor.update({ 'system.mystic.zeon.accumulated': (zeonAccum ?? 0) - cost });

    const content = `
        ¡<strong>${token.actor.name}</strong> consume <i>${cost}</i> de zeón y
        ${mode == 0 ? 'utiliza' : 'mantiene'} <strong><i>${parsedName}</i></strong>!
    `;

    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content,
    });
}


const viaSpells = spells.reduce(
    (obj, spell) => {
        if (obj[spell.system.via.value] === undefined) {
            return {
                ...obj,
                [spell.system.via.value]: [spell],
            };
        } else {
            return {
                ...obj,
                [spell.system.via.value]: [...obj[spell.system.via.value], spell],
            }
        }
    },
    {},
);
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

optionsDialog().render(true);