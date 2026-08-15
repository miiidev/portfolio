import { useState, type FormEvent } from 'react';
import { personalInfo } from '../data';

type FormState = 'idle' | 'loading' | 'success' | 'error';

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const inputClass =
  'w-full bg-surface border border-edge rounded-lg px-4 py-3 text-sm text-copy placeholder:text-dim focus:outline-none focus:border-edge-hover transition-colors duration-200';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState('');

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address';
    if (!message.trim()) errs.message = 'Message is required';
    else if (message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrors({});
    setSubmitError('');

    try {
      const res = await fetch(`https://formspree.io/f/${personalInfo.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setFormState('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setFormState('error');
      setSubmitError("Couldn't send your message. Check your connection and try again.");
    }
  };

  if (formState === 'success') {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-copy/80 font-semibold mb-2">Message sent!</p>
        <p className="text-sm text-muted">Thanks for reaching out. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          autoComplete="name"
          maxLength={80}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={inputClass}
          disabled={formState === 'loading'}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-danger mt-1.5">{errors.name}</p>
        )}
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          autoComplete="email"
          maxLength={120}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass}
          disabled={formState === 'loading'}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-danger mt-1.5">{errors.email}</p>
        )}
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          maxLength={2000}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputClass} resize-none`}
          disabled={formState === 'loading'}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-danger mt-1.5">{errors.message}</p>
        )}
      </div>

      {submitError && (
        <p role="alert" className="text-xs text-danger text-center">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full py-3 bg-inverse text-inverse-copy font-semibold rounded-lg text-sm transition-all border border-edge hover:border-edge-hover disabled:opacity-50 disabled:cursor-not-allowed min-h-11"
      >
        {formState === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}