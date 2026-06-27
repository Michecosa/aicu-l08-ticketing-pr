export const tickets = [
  {
    id: "TCK-1048",
    title: "Errore nel download della fattura",
    description: "Il cliente segnala errore 500 durante il download della fattura.",
    customer: "Studio Verdi",
    priority: "Alta",
    area: "Billing",
    status: "open",
    source: "support",
    createdAt: "2026-06-18T13:50:00.000Z",
    updatedAt: "2026-06-18T14:35:00.000Z"
  },
  {
    id: "TCK-1051",
    title: "Richiesta accesso nuovo operatore",
    description: "Il team supporto ha ricevuto richiesta di abilitare un nuovo operatore.",
    customer: "Boolean Support",
    priority: "Media",
    area: "Accessi",
    status: "open",
    source: "support",
    createdAt: "2026-06-19T08:55:00.000Z",
    updatedAt: "2026-06-19T09:10:00.000Z"
  },
  {
    id: "TCK-1054",
    title: "Notifica email non ricevuta",
    description: "Il cliente non riceve email di conferma dopo la richiesta.",
    customer: "Delta Service",
    priority: "Bassa",
    area: "Comunicazioni",
    status: "open",
    source: "support",
    createdAt: "2026-06-19T11:20:00.000Z",
    updatedAt: "2026-06-19T11:42:00.000Z"
  }
];

export const allowedPriorities = ["Alta", "Media", "Bassa"];

export const allowedAreas = ["Billing", "Accessi", "Comunicazioni", "Tecnico"];
