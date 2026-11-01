"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setStatusMessage("");

    const formData = new FormData(form);
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    }).catch(() => null);

    if (!response) {
      setStatus("error");
      setStatusMessage("Connection issue. Please try again in a moment.");
      return;
    }

    const result = (await response.json().catch(() => null)) as
      | { error?: string; message?: string }
      | null;

    if (!response.ok) {
      setStatus("error");
      setStatusMessage(result?.error ?? "We could not send your request. Please try again.");
      return;
    }

    form.reset();
    setStatus("success");
    setStatusMessage(result?.message ?? "Your request has been sent.");
  }

  return (
    <form className="inquiry-form" onSubmit={submitInquiry}>
      <div className="form-row">
        <label>
          Your name
          <input autoComplete="name" name="name" placeholder="Full name" required maxLength={100} />
        </label>
        <label>
          Work email
          <input autoComplete="email" name="email" type="email" placeholder="you@company.com" required maxLength={254} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone number
          <input autoComplete="tel" name="phone" type="tel" placeholder="Your contact number" required maxLength={40} />
        </label>
        <label>
          Preferred city
          <input autoComplete="address-level2" name="city" placeholder="Where do you need a space?" required maxLength={100} />
        </label>
      </div>
      <div className="form-row">
        <label>
          What are you looking for?
          <select name="service" defaultValue="Not sure yet" required>
            <option>Coworking day pass</option>
            <option>Flexible desk membership</option>
            <option>Dedicated desk</option>
            <option>Private office</option>
            <option>Meeting room</option>
            <option>Virtual office</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label>
          Team size
          <select name="teamSize" defaultValue="Just me" required>
            <option>Just me</option>
            <option>2-5 people</option>
            <option>6-20 people</option>
            <option>21-50 people</option>
            <option>More than 50</option>
          </select>
        </label>
      </div>
      <label>
        Anything else we should know? <span className="optional-label">Optional</span>
        <textarea name="message" placeholder="Share your preferred dates, location, or requirements." rows={4} maxLength={2000} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-submit-row">
        <p className="form-privacy">By sending this request, you agree that our team may contact you about it.</p>
        <button className="button button-dark" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send inquiry"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className={`form-status ${status}`} aria-live="polite" role={status === "error" ? "alert" : "status"}>
        {statusMessage}
      </p>
    </form>
  );
}