'use client';

import { useState, type FormEvent } from 'react';
import { WEB3FORMS_ACCESS_KEY } from '@/lib/config';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function AbstractForm() {
  const [applyYia, setApplyYia] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New abstract submission — SACH 2027');

    if (applyYia && !formData.get('age_proof')) {
      setStatus('error');
      setErrorMessage('Please attach proof of age to apply for the Young Investigator Award.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus('success');
        form.reset();
        setApplyYia(false);
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Could not reach the submission service. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-sm border border-coral/30 bg-reef/5 p-8 text-center">
        <p className="font-display text-xl text-ink">Abstract received</p>
        <p className="mt-2 text-sm text-slate/70">
          A confirmation has been sent to the address you provided. The
          Scientific Committee will review your submission and notify you of
          its status.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot field for basic spam protection — hidden from real users */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Presentation type
          </label>
          <select
            name="presentation_type"
            required
            className="w-full rounded-sm border border-ink/15 bg-foam px-3 py-2.5 text-sm text-ink focus:border-coral focus:outline-none"
          >
            <option value="oral">Oral</option>
            <option value="poster">Poster</option>
          </select>
        </div>
      </div>

      <Field label="Abstract title" name="abstract_title" required />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Abstract file (PDF or Word)
        </label>
        <input
          type="file"
          name="abstract_file"
          accept=".pdf,.doc,.docx"
          required
          className="w-full text-sm text-slate/70 file:mr-4 file:rounded-sm file:border-0 file:bg-reef file:px-4 file:py-2 file:text-sm file:font-medium file:text-foam hover:file:bg-reef-dark"
        />
      </div>

      <label className="flex items-start gap-3 rounded-sm border border-coral/25 bg-coral/5 p-4">
        <input
          type="checkbox"
          checked={applyYia}
          onChange={(e) => setApplyYia(e.target.checked)}
          className="mt-0.5"
        />
        <span className="text-sm text-ink">
          <strong className="font-medium">Apply for the Young Investigator Award (YIA).</strong>{' '}
          Requires the presenting author to be under 40 and to attach proof of age.
        </span>
      </label>

      {applyYia && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Proof of age
          </label>
          <input
            type="file"
            name="age_proof"
            accept=".pdf,.jpg,.jpeg,.png"
            required={applyYia}
            className="w-full text-sm text-slate/70 file:mr-4 file:rounded-sm file:border-0 file:bg-reef file:px-4 file:py-2 file:text-sm file:font-medium file:text-foam hover:file:bg-reef-dark"
          />
          <p className="mt-1.5 text-xs text-slate/50">
            A government ID, passport, or birth certificate showing your date
            of birth. This is handled confidentially by the Scientific
            Committee for eligibility review only.
          </p>
        </div>
      )}

      {status === 'error' && (
        <p className="text-sm text-coral-dark" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-sm bg-coral px-6 py-3 text-sm font-medium text-foam transition-colors hover:bg-coral-dark disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit abstract'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-ink/15 bg-foam px-3 py-2.5 text-sm text-ink focus:border-coral focus:outline-none"
      />
    </div>
  );
}
