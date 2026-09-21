'use client';

import { useState, type FormEvent } from 'react';
import { INTEREST_FORM_ENDPOINT } from '@/lib/config';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink focus:border-reef focus:outline-none';
const labelClass = 'mb-1 block text-xs font-medium text-slate/70';

const presentationOptions = [
  'Oral Paper',
  'Poster/ePoster',
  'Speaker',
  'Attending only (not presenting)',
];

function RadioGroup({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className={labelClass}>{legend} *</legend>
      <div className="mt-2 space-y-2">
        {options.map((option, i) => (
          <label key={option} className="flex items-center gap-3 text-sm text-slate/80">
            <input
              type="radio"
              name={name}
              value={option}
              required={i === 0}
              className="h-4 w-4 accent-reef"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function InterestForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!INTEREST_FORM_ENDPOINT) {
      setStatus('error');
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    const text = (key: string) => String(fd.get(key) ?? '').trim();

    const payload = {
      name: text('name'),
      email: text('email'),
      phone: text('phone'),
      presentationType: text('presentationType'),
      website: text('website'), // honeypot, must stay empty
    };

    setStatus('submitting');
    try {
      // text/plain avoids a CORS preflight, which Apps Script does not answer.
      // no-cors means the response is opaque, so success means "request sent".
      await fetch(INTEREST_FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-sm border border-reef/30 bg-reef/5 p-5">
        <p className="font-display text-lg text-reef">Thank you for your interest.</p>
        <p className="mt-2 text-sm leading-relaxed text-slate/80">
          We have sent a confirmation to your email address. If you do not see
          it in a few minutes, please check your spam folder. We will contact
          you once registration opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="if-name" className={labelClass}>Full name *</label>
        <input id="if-name" name="name" required maxLength={120} autoComplete="name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="if-email" className={labelClass}>Email *</label>
        <input id="if-email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="if-phone" className={labelClass}>Phone (with country code) *</label>
        <input
          id="if-phone"
          name="phone"
          type="tel"
          required
          maxLength={25}
          pattern="\+?[0-9\s\-\(\)]{6,25}"
          title="Enter a valid phone number, for example +91 98765 43210"
          autoComplete="tel"
          className={inputClass}
        />
      </div>

      <RadioGroup legend="Presentation type" name="presentationType" options={presentationOptions} />

      {status === 'error' && (
        <p className="text-sm text-coral-dark" role="alert">
          We could not send your details. Please try again in a moment, or
          email us directly.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-sm bg-coral px-6 py-3 text-sm font-medium text-foam transition-colors hover:bg-coral-dark disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Register my interest'}
        </button>
        <p className="mt-3 text-xs text-slate/60">
          By submitting, you agree to be contacted by the SACH 2027 organizing
          committee about the conference.
        </p>
      </div>
    </form>
  );
}
