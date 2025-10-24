if (!token) {
    ui.notifications.error("No token selected");
    return;
  }
  
  const techniquesObj = token.actor.system.domine.techniques || {};
  
  const techniquesArray = Object.values(techniquesObj);
  
  if (techniquesArray.length === 0) {
    ui.notifications.error("No techniques found on character");
    return;
  }
  
  const tokenAcum = token.actor.system.domine.kiAccumulation;
  
  const accumulatedKi = {
    strength: tokenAcum.strength.accumulated.value || 0,
    agility: tokenAcum.agility.accumulated.value || 0,
    dexterity: tokenAcum.dexterity.accumulated.value || 0,
    constitution: tokenAcum.constitution.accumulated.value || 0,
    willPower: tokenAcum.willPower.accumulated.value || 0,
    power: tokenAcum.power.accumulated.value || 0,
  };
  
  let dialogContent = `
  <div>
      <h3>Selecciona una Técnica para Usar</h3>
      <select id="techniqueSelect" style="width:100%">
  `;
  
  for (let technique of techniquesArray) {
    dialogContent += `<option value="${technique._id}">${technique.name}</option>`;
  }
  
  dialogContent += `
      </select>
  </div>
  <div id="kiInfo" style="margin-top: 10px;">
      <!-- Ki information will be populated here -->
  </div>
  `;
  
  new Dialog({
    title: "Usar Técnica",
    content: dialogContent,
    buttons: {
      use: {
        label: "Usar Técnica",
        callback: (html) => {
          const selectedTechniqueId = html.find("#techniqueSelect").val();
          useTechnique(selectedTechniqueId);
        },
      },
    },
    render: (html) => {
      const select = html.find("#techniqueSelect");
      select.on("change", () => updateKiInfo(html));
      updateKiInfo(html);
    },
  }).render(true);
  
  function updateKiInfo(html) {
    const selectedTechniqueId = html.find("#techniqueSelect").val();
    const technique = techniquesArray.find((t) => t._id === selectedTechniqueId);
    if (!technique) {
      html.find("#kiInfo").html("Técnica no encontrada");
      return;
    }
  
    const charNames = {
      strength: "FUE",
      agility: "AGI",
      dexterity: "DES",
      constitution: "CON",
      willPower: "VOL",
      power: "POD",
    };
  
    const kiCosts = {
      strength: parseInt(technique.system.strength.value) || 0,
      agility: parseInt(technique.system.agility.value) || 0,
      dexterity: parseInt(technique.system.dexterity.value) || 0,
      constitution: parseInt(technique.system.constitution.value) || 0,
      willPower: parseInt(technique.system.willPower.value) || 0,
      power: parseInt(technique.system.power.value) || 0,
    };
  
    const kiReserve = token.actor.system.domine.kiAccumulation.generic.value || 0;
  
    let kiInfoContent = `<h4>Ki Acumulado:</h4>
    <ul>
      <li><strong>Reserva de Ki:</strong> ${kiReserve}</li>`;
  
    for (let char of Object.keys(charNames)) {
      kiInfoContent += `<li><strong>${charNames[char]}:</strong> ${accumulatedKi[char]}</li>`;
    }
  
    kiInfoContent += `</ul>`;
  
    kiInfoContent += `<h4>Coste de Ki de la Técnica:</h4>
    <ul>`;
  
    let totalKiCost = 0;
  
    for (let char of Object.keys(charNames)) {
      if (kiCosts[char] > 0) {
        kiInfoContent += `<li><strong>${charNames[char]}:</strong> ${kiCosts[char]}</li>`;
        totalKiCost += kiCosts[char];
      }
    }
  
    kiInfoContent += `</ul>`;
    kiInfoContent += `<p><strong>Coste Total de Ki:</strong> ${totalKiCost}</p>`;
  
    html.find("#kiInfo").html(kiInfoContent);
  }
  
  function useTechnique(techniqueId) {
    const technique = techniquesArray.find((t) => t._id === techniqueId);
    if (!technique) {
      ui.notifications.error("Técnica no encontrada");
      return;
    }
  
    const charNames = {
      strength: "FUE",
      agility: "AGI",
      dexterity: "DES",
      constitution: "CON",
      willPower: "VOL",
      power: "POD",
    };
  
    const kiCosts = {
      strength: parseInt(technique.system.strength.value) || 0,
      agility: parseInt(technique.system.agility.value) || 0,
      dexterity: parseInt(technique.system.dexterity.value) || 0,
      constitution: parseInt(technique.system.constitution.value) || 0,
      willPower: parseInt(technique.system.willPower.value) || 0,
      power: parseInt(technique.system.power.value) || 0,
    };
  
    const kiAccumulation = token.actor.system.domine.kiAccumulation;
  
    for (let char of Object.keys(kiCosts)) {
      if (kiCosts[char] > 0 && kiAccumulation[char].accumulated.value < kiCosts[char]) {
        ui.notifications.error(`No tienes suficiente Ki acumulado en ${charNames[char]} para usar esta técnica`);
        return;
      }
    }
  
    const updates = {};
    let kiReserve = kiAccumulation.generic.value || 0;
  
    for (let char of Object.keys(kiCosts)) {
      const accumulated = kiAccumulation[char].accumulated.value;
      const cost = kiCosts[char];
  
      if (cost > 0) {
        updates[`system.domine.kiAccumulation.${char}.accumulated.value`] = accumulated - cost;
      }
  
      kiReserve += accumulated - (cost > 0 ? cost : 0);
      updates[`system.domine.kiAccumulation.${char}.accumulated.value`] = 0;
    }
  
    updates["system.domine.kiAccumulation.generic.value"] = kiReserve;
  
    token.actor.update(updates);
  
    let description = technique.system.description.value || "";
    let chatMessage = `<b>${token.name}</b> ha usado la técnica: <b>${technique.name}</b>`;
    if (description) {
      chatMessage += `<div>${description}</div>`;
    }
  
    ChatMessage.create({ content: chatMessage });
  }
  