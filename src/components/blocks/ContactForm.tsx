"use client";

import { useState } from "react";
import { ButtonAction } from "@/components/ui/Button";

type Labels = {
  name: string;
  email: string;
  message: string;
  send: string;
};

export function ContactForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1 w-full rounded border border-line bg-surface px-3 py-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol";

  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          {labels.name}
        </label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          {labels.email}
        </label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          {labels.message}
        </label>
        <textarea id="message" name="message" rows={5} required className={field} />
      </div>
      <ButtonAction type="submit" disabled={status === "sending"}>
        {labels.send}
      </ButtonAction>
      {status === "sent" ? (
        <p className="text-sm text-petrol" role="status">
          Tack! Ditt meddelande har skickats.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-700" role="status">
          Något gick fel. Försök igen.
        </p>
      ) : null}
    </form>
  );
}
