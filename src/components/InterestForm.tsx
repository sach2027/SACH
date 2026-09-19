'use client';

import { useState, type FormEvent } from 'react';
import { INTEREST_FORM_ENDPOINT } from '@/lib/config';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink focus:border-reef focus:outline-none';
const labelClass = 'mb-1 block text-xs font-medium text-slate/70';

const attendingOptions = [
  'Delegate',
  'Faculty / Speaker',
  'Trainee / Student',
  'Accompanying person',
];
const choiceOptions = ['Yes', 'Maybe', 'No'];

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
      country: text('country'),
      institution: text('institution'),
      designation: text('designation'),
      attendingAs: text('attendingAs'),
      abstractInterest: text('abstractInterest'),
      grantInterest: text('grantInterest'),
      travelHelp: fd.get('travelHelp') === 'on',
      consent: fd.get('consent') === 'on',
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
          it in a few minutes, please check your spam folder. We will notify
          you as soon as registration opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="if-name" className={labelClass}>Full name *</label>
          <input id="if-name" name="name" required maxLength={120} autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="if-email" className={labelClass}>Email *</label>
          <input id="if-email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="if-phone" className={labelClass}>Phone / WhatsApp</label>
          <input id="if-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="if-country" className={labelClass}>Country *</label>
          <input id="if-country" name="country" required maxLength={80} autoComplete="country-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="if-institution" className={labelClass}>Institution *</label>
          <input id="if-institution" name="institution" required maxLength={200} autoComplete="organization" className={inputClass} />
        </div>
        <div>
          <label htmlFor="if-designation" className={labelClass}>Designation *</label>
          <input id="if-designation" name="designation" required maxLength={120} autoComplete="organization-title" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="if-attending" className={labelClass}>I would attend as *</label>
        <select id="if-attending" name="attendingAs" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select one</option>
          {attendingOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="if-abstract" className={labelClass}>Interested in presenting an abstract? *</label>
          <select id="if-abstract" name="abstractInterest" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select one</option>
            {choiceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="if-grant" className={labelClass}>Interested in the Academic/Travel Grant? *</label>
          <select id="if-grant" name="grantInterest" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select one</option>
            {choiceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate/80">
        <input type="checkbox" name="travelHelp" className="mt-0.5 h-4 w-4 accent-reef" />
        I would like help with travel and accommodation.
      </label>

      <label className="flex items-start gap-3 text-sm text-slate/80">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-reef" />
        <span>
          I agree to be contacted by the SACH 2027 organizing committee about
          the conference. *
        </span>
      </label>

      {status === 'error' && (
        <p className="text-sm text-coral-dark" role="alert">
          We could not send your details. Please try again in a moment, or
          email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-sm bg-coral px-6 py-3 text-sm font-medium text-foam transition-colors hover:bg-coral-dark disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Register my interest'}
      </button>
    </form>
  );
}
