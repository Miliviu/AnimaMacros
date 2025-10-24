//esta version actualiza el token sobre el que se invoca, util si no tienes el token asociado.
const selectedToken = canvas.tokens.controlled[0];
if (!selectedToken) {
  ui.notifications.error("¡No hay ningún token seleccionado!");
  return;
}

const actor = selectedToken.actor;
if (!actor) {
  ui.notifications.error("¡El token seleccionado no tiene un actor asociado!");
  return;
}

const defenseType = actor.system.general.settings.defenseType.value;
const dañoAcumulativo = defenseType === "resistance";

new Dialog({
  title: "Crear Masa de Enemigos",
  content: `
    <form>
      <div class="form-group">
        <label>Número de Enemigos:</label>
        <input type="number" id="numEnemies" required min="1">
      </div>
    </form>
  `,
  buttons: {
    Crear: {
      label: "Crear",
      callback: async (html) => {
        const numEnemies = parseInt(html.find('#numEnemies').val());
        const avgPV = actor.system.characteristics.secondaries.lifePoints.value;
        const avgHO = actor.system.combat.attack.final.value;

        let totalPV, calculationData = {};
        let tipoMasa = ""; 
        const equippedWeapon = actor.items.find(
          (item) => item.type === "weapon" && item.system.equipped.value
        );
        const avgDano = equippedWeapon ? equippedWeapon.system.damage.final.value : 0; 

        if (!dañoAcumulativo) {
          const pvPorUnidad = Math.floor(avgPV / 50) * 50;
          if (numEnemies <= 100) {
            totalPV = pvPorUnidad * numEnemies;
          } else {
            const adicional = pvPorUnidad < 250 ? 10 : 25;
            totalPV = (100 * pvPorUnidad) + ((numEnemies - 100) * adicional);
          }
          tipoMasa = "Normal";
          calculationData = { tipo: "normal", pvPorUnidad };
        } else {
          const basePV = Math.floor(avgPV / 100) * 100;
          if (numEnemies <= 50) {
            totalPV = basePV + (numEnemies - 1) * (basePV / 2);
          } else {
            const adicional = basePV < 1000 ? 100 : 250;
            totalPV = basePV + 49*(basePV/2) + ((numEnemies - 50) * adicional);
          }
          tipoMasa = "Acumulación";
          calculationData = { tipo: "acumulacion", basePV };
        }

        const thresholds = [
          { min: 100, bonus: 150 }, { min: 50, bonus: 130 },
          { min: 25, bonus: 110 }, { min: 15, bonus: 90 },
          { min: 10, bonus: 70 }, { min: 5, bonus: 50 },
          { min: 3, bonus: 30 }
        ];
        const bonusHO = thresholds.find(t => numEnemies >= t.min)?.bonus || 0;
        const HO = avgHO + bonusHO;
        const danoMass = Math.floor(avgDano * 0.5);

        await actor.update({
          "system.characteristics.secondaries.lifePoints": {
            value: totalPV,
            max: totalPV
          },
          "system.combat.attack": {
            base: { value: HO },
            final: { value: HO }
          },
          "system.general.description.value": `
            <div class="masa-info">
              <p>⚔️ <strong>HO Actual:</strong> ${HO} (+${bonusHO})</p>
              <p>❤️ <strong>PV Totales:</strong> ${totalPV}</p>
              <p>👥 <strong>Unidades:</strong> ${numEnemies}</p>
              <p>🔢 <em>Tipo: ${tipoMasa}</em></p>
            </div>
          `,
          "system.general.settings.defenseType.value": "mass"
          ,
          "system.general.modifiers.extraDamage.value": danoMass,
          "flags.masa-enemigos": {
            version: 2,
            ...calculationData,
            totalOriginal: totalPV,
            numOriginal: numEnemies,
            hoBase: avgHO
          }
        });

        ui.notifications.info("Masa modificada exitosamente");
      }
    }
  }
}).render(true);
