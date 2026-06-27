export default function TicketCard({ ticket }) {
  const updatedAt = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ticket.updatedAt));

  return (
    <article className="ticket-card">
      <div className="ticket-card__header">
        <span className="ticket-card__id">{ticket.id}</span>
        <span className={`ticket-card__priority ticket-card__priority--${ticket.priority.toLowerCase()}`}>
          {ticket.priority}
        </span>
      </div>

      <h2 className="ticket-card__title">{ticket.title}</h2>

      <div className="ticket-card__meta">
        <span>{ticket.customer}</span>
        <span>Aggiornato {updatedAt}</span>
      </div>
    </article>
  );
}
