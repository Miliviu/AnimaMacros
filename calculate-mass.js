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
const dañoAcumulativo = (defenseType === "resistance");

new Dialog({
  title: "Calculadora de Combate de Masas",
  content: `
    <form>
      <div class="form-group">
        <label>Número de Enemigos:</label>
        <input type="number" id="numEnemies" required>
      </div>
    </form>
  `,
  buttons: {
    calcular: {
      label: "Calcular",
      callback: async (html) => {
        const numEnemies = parseInt(html.find('#numEnemies').val());

        const avgPV = actor.system.characteristics.secondaries.lifePoints.value; // Puntos de Vida
        const avgHO = actor.system.combat.attack.final.value; // Habilidad Ofensiva

        // Encuentra la primera arma equipada
        const equippedWeapon = actor.items.find(item => item.type === 'weapon' && item.system.equipped.value);
        const avgDano = equippedWeapon ? equippedWeapon.system.damage.final.value : 0; // Daño de la primera arma equipada

        let totalPV;
        if (!dañoAcumulativo) {
          if (numEnemies <= 100) {
            const pvPerEnemy = Math.floor(avgPV / 50) * 50;
            totalPV = pvPerEnemy * numEnemies;
          } else {
            const pvPerBaseEnemy = Math.floor(avgPV / 50) * 50;
            const additionalPerEnemy = pvPerBaseEnemy < 250 ? 10 : 25;
            totalPV = (100 * pvPerBaseEnemy) + ((numEnemies - 100) * additionalPerEnemy);
          }
        } else {
          const basePV = Math.floor(avgPV / 100) * 100;
          if (numEnemies <= 50) {
            totalPV = basePV + (numEnemies - 1) * (basePV / 2);
          } else {
            const baseTotal = basePV + 49 * (basePV / 2);
            const remaining = numEnemies - 50;
            const additionalPerEnemy = basePV < 1000 ? 100 : 250;
            totalPV = baseTotal + (remaining * additionalPerEnemy);
          }
        }

        const thresholds = [
          { min: 100, bonus: 150 },
          { min: 50, bonus: 130 },
          { min: 25, bonus: 110 },
          { min: 15, bonus: 90 },
          { min: 10, bonus: 70 },
          { min: 5, bonus: 50 },
          { min: 3, bonus: 30 }
        ];
        let bonusHO = 0;
        for (const t of thresholds) {
          if (numEnemies >= t.min) {
            bonusHO = t.bonus;
            break;
          }
        }
        const HO = avgHO + bonusHO;

        const danoMass = avgDano * 1.5;

        const results = `
          <h2>Estadísticas de la Masa</h2>
          <p><strong>Puntos de Vida:</strong> ${totalPV}</p>
          <p><strong>Habilidad Ofensiva:</strong> ${HO} (Bono: +${bonusHO})</p>
          <p><strong>Daño:</strong> ${danoMass}</p>
        `;

        new Dialog({
          title: "Resultados",
          content: results,
          buttons: {
            ok: { label: "Cerrar" }
          }
        }).render(true);
      }
    }
  }
}).render(true);