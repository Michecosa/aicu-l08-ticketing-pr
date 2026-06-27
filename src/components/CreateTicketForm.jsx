import { useState } from "react";
import { createTicket } from "../api.js";

const PRIORITIES = ["Alta", "Media", "Bassa"];
const AREAS = ["Billing", "Accessi", "Comunicazioni", "Tecnico"];

const EMPTY_FORM = { title: "", description: "", customer: "", priority: "", area: "" };

export default function CreateTicketForm({ onSuccess }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      await createTicket(form);
      setForm(EMPTY_FORM);
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="ticket-section" aria-labelledby="create-ticket-title">
      <div className="section-heading">
        <div>
          <h2 id="create-ticket-title">Crea nuovo ticket</h2>
          <p>Compila i campi per aprire una nuova richiesta.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="ticket-form">
        {error && (
          <p className="state-message state-message--error" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="state-message" role="status">
            Ticket creato con successo.
          </p>
        )}

        <div className="form-field">
          <label htmlFor="title">Titolo</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Descrizione</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div className="form-field">
          <label htmlFor="customer">Cliente</label>
          <input
            id="customer"
            name="customer"
            type="text"
            value={form.customer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="priority">Priorità</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona priorità</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="area">Area</label>
          <select
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona area</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Invio in corso..." : "Crea ticket"}
        </button>
      </form>
    </section>
  );
}
