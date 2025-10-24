// Obtén la entrada del diario usando el UUID
//Es aconsejable tener instalado https://foundryvtt.com/packages/pdf-pager para mejorar la experiencia.

const journalEntry = game.journal.get("HloeuLgWpcqNO9w4"); // Reemplaza con el ID de tu JournalEntry
const pageId = journalEntry.pages.find(page => page.id === "XWUx3zym6HfmdvDU").id; // Reemplaza con el ID de la página

// Define el ancla para la página que deseas abrir
const anchor = "page=46";

// Renderiza la hoja del diario con la página y el ancla especificados
journalEntry.sheet.render(true, { pageId, anchor });
