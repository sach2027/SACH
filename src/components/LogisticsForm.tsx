'use client';

import { useState, type FormEvent } from 'react';
import { WEB3FORMS_ACCESS_KEY } from '@/lib/config';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function LogisticsForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'SACH 2027 — Travel & logistics inquiry');

    setStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm text-reef">
        Thanks — your inquiry has been sent to the event management team.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          placeholder="Full name"
          required
          className="rounded-sm border border-ink/15 bg-foam px-3 py-2.5 text-sm focus:border-reef focus:outline-none"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded-sm border border-ink/15 bg-foam px-3 py-2.5 text-sm focus:border-reef focus:outline-none"
        />
      </div>
      <select
        name="inquiry_type"
        required
        className="w-full rounded-sm border border-ink/15 bg-foam px-3 py-2.5 text-sm focus:border-reef focus:outline-none"
      >
        <option value="">What can we help with?</option>
        <option value="ticketing">Air ticketing</option>
        <option value="accommodation">Accommodation</option>
        <option value="sightseeing">Local sightseeing</option>
        <option value="conference">Conference information</option>
        <option value="other">Other</option>
      </select>
      <textarea
        name="message"
        placeholder="Details"
        rows={4}
        required
        className="w-full rounded-sm border border-ink/15 bg-foam px-3 py-2.5 text-sm focus:border-reef focus:outline-none"
      />
      {status === 'error' && (
        <p className="text-sm text-coral-dark" role="alert">
          Could not send your inquiry. Please try again or email us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-sm bg-reef px-6 py-3 text-sm font-medium text-foam transition-colors hover:bg-reef-dark disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  );
}
