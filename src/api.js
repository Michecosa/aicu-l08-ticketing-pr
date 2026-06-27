export async function createTicket(data) {
  const response = await fetch("/api/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.status === 400) {
    const body = await response.json();
    throw Object.assign(new Error(body.error), { field: body.field });
  }

  if (!response.ok) {
    throw new Error("Impossibile creare il ticket. Riprova.");
  }

  return response.json();
}

export async function fetchOpenTickets({ empty = false } = {}) {
  const params = new URLSearchParams();

  if (empty) {
    params.set("empty", "true");
  }

  const query = params.toString();
  const response = await fetch(`/api/tickets${query ? `?${query}` : ""}`);

  if (!response.ok) {
    throw new Error("Impossibile caricare i ticket aperti.");
  }

  return response.json();
}
