import { useState, type FormEvent } from 'react';
import { personalInfo } from '../data';

type FormState = 'idle' | 'loading' | 'success' | 'error';

type FieldErrors = {
  name?: string;
  subject?: string;
  message?: string;
};

const inputClass =
  'w-full rounded-lg border border-edge bg-transparent px-3 py-2.5 text-sm text-copy outline-none placeholder:text-dim focus-visible:border-accent transition-colors duration-200';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState('');

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!name.trim()) errs.name = 'Name is required';
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
        body: JSON.stringify({ name, subject, message }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setFormState('success');
      setName('');
      setSubject('');
      setMessage('');
    } catch {
      setFormState('error');
      setSubmitError("Couldn't send your message. Check your connection and try again.");
    }
  };

  if (formState === 'success') {
    return (
      <div className="text-center py-8">
        <p className="text-base text-copy/80 font-semibold mb-2">Message sent!</p>
        <p className="text-sm text-muted">Thanks for reaching out. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <div>
        <label htmlFor="contact-name" className="block text-xs text-muted mb-1.5">
          Name
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          placeholder="Your name"
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
        <label htmlFor="contact-subject" className="block text-xs text-muted mb-1.5">
          Subject
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          placeholder="Subject"
          maxLength={160}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          disabled={formState === 'loading'}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs text-muted mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your message"
          rows={5}
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
        <p role="alert" className="text-xs text-danger">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="inline-flex items-center gap-2 rounded-full bg-accent text-canvas font-semibold h-11 px-5 text-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
        {formState === 'loading' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}