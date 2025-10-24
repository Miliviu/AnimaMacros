// Especifica la lista de reproducción y la canción
const playlistName = "Ending";
const songName = "Ending";
const playlist = game.playlists.getName(playlistName);
game.playlists.filter(p => p.playing).forEach(p => p.stopAll())


if (playlist) {
  const sound = playlist.sounds.find(s => s.name === songName);

  if (sound) {
    playlist.playSound(sound);
    ui.notifications.info(`Reproduciendo ahora: ${songName}`);
  } else {
    ui.notifications.warn(`No se encontró la canción "${songName}" en la lista "${playlistName}".`);
  }
} else {
  ui.notifications.error(`No se encontró la lista de reproducción "${playlistName}".`);
}

// Esperar antes de mostrar el mensaje final
setTimeout(() => {
  const endMessage = "FIN DE SESIÓN";
  ui.notifications.info(endMessage);

  // Mostrar el mensaje final
  ChatMessage.create({
    content: `
      <div style="
        background-color: #f8f0d9;
        border: 5px solid #8b4513;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 24px;
        color: #4b2e02;
        text-shadow: 1px 1px 2px #8b4513;
        line-height: 1.5;
      ">
        <h2 style="margin: 0; font-size: 32px; text-transform: uppercase;">${endMessage}</h2>
      </div>
    `,
    whisper: []
  });

  // Leer las tiradas en el chat de las últimas 24 horas
 // Leer las tiradas en el chat de las últimas 24 horas
// Leer las tiradas en el chat de las últimas 24 horas
// Leer las tiradas en el chat de las últimas 24 horas
const now = Date.now();
const oneDayAgo = now - (24 * 60 * 60 * 1000); // 24 horas en milisegundos
const rolls = [];

game.messages.forEach(message => {
  // Verifica si el mensaje tiene tiradas y está dentro del rango de tiempo
  if (message.rolls && message.timestamp >= oneDayAgo) {
    message.rolls.forEach(roll => {
      // Encontrar los términos de dados en la tirada
      const diceTerms = roll.terms.filter(term => term instanceof Die);

      if (diceTerms.length > 0) {
        // Calcular el total para cada conjunto de tiradas abiertas
        const totalRoll = diceTerms.reduce((sum, die) => {
          const rollSum = die.results
            .filter(r => r.active) // Filtrar resultados activos
            .reduce((subSum, r) => subSum + r.result, 0); // Sumar resultados individuales
          return sum + rollSum;
        }, 0);

        const individualRolls = diceTerms.flatMap(die => 
          die.results.filter(r => r.active).map(r => r.result)
        );
        const frase = message.flavor.split(" ");
        const habilidad = frase[37];
        const habilidadConMayuscula = habilidad ? habilidad.charAt(0).toUpperCase() + habilidad.slice(1) : habilidad;
        rolls.push({
          user: message.speaker.alias || "Desconocido", // Alias del jugador
          flavor: habilidadConMayuscula || "Desconocido", // Descripción de la tirada
          individualRolls, // Resultados individuales
          totalRoll // Suma total de las tiradas
        });
      }
    });
  }
});

// Ordenar las tiradas por el total en orden descendente
rolls.sort((a, b) => b.totalRoll - a.totalRoll);

// Mostrar las mejores tiradas
// Mostrar las mejores tiradas
if (rolls.length > 0) {
  const bestRollsMessage = rolls.slice(0, 3).map((roll, index) => {
    let medalStyle = "";
    switch (index) {
      case 0: // Oro
        medalStyle = "background-color: gold; color: black;";
        break;
      case 1: // Plata
        medalStyle = "background-color: silver; color: black;";
        break;
      case 2: // Bronce
        medalStyle = "background-color: #cd7f32; color: white;";
        break;
    }
  
    // Incluir línea de "Secundaria" solo si no es "Desconocido"
    const flavorLine = roll.flavor !== "Desconocido" 
      ? `<em>Secundaria: ${roll.flavor}</em><br>` 
      : "";
  
    return `
      <li style="
        padding: 15px; 
        border-radius: 10px; 
        margin-bottom: 10px; 
        border: 2px solid #8b4513; 
        ${medalStyle}
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 20px;
        text-align: center;
        text-shadow: 1px 1px 2px #8b4513;">
        <strong style="font-size: 24px;">${index + 1}. ${roll.user}</strong><br>
        ${flavorLine}
        <em>Tiradas: ${roll.individualRolls.join(" + ")}</em><br>
        <strong>Suma Total: ${roll.totalRoll}</strong>
      </li>`;
  }).join("");
  ChatMessage.create({
    content: `
      <div style="
        background-color: #f8f0d9;
        border: 5px solid #8b4513;
        border-radius: 10px;
        padding: 20px;
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 20px;
        color: #4b2e02;
        text-shadow: 1px 1px 2px #8b4513;
        text-align: center;
        line-height: 1.5;">
        <h3 style="font-size: 32px; text-transform: uppercase; margin-bottom: 20px;">Mejores Tiradas de la Sesión</h3>
        <ul style="list-style-type: none; padding-left: 0; margin: 0;">
          ${bestRollsMessage}
        </ul>
      </div>
    `,
    whisper: []
  });
} else {
  ChatMessage.create({
    content: `
      <div style="
        background-color: #f8f0d9;
        border: 5px solid #8b4513;
        border-radius: 10px;
        padding: 20px;
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 20px;
        color: #4b2e02;
        text-shadow: 1px 1px 2px #8b4513;
        text-align: center;">
        <p>No se encontraron tiradas en las últimas 24 horas.</p>
      </div>
    `,
    whisper: []
  });
}
  // Ejecutar la macro final
  game.macros.getName("final2").execute();

}, 3000);
