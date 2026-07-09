import { useState, type FormEvent } from 'react';
import { personalInfo } from '../data';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address';
    if (!message.trim()) return 'Message is required';
    if (message.trim().length < 10) return 'Message must be at least 10 characters';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMsg('');

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
      setErrorMsg('Something went wrong. Please try again.');
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

  const inputClass = "w-full bg-surface border border-edge rounded-lg px-4 py-3 text-sm text-copy placeholder:text-dim focus:outline-none focus:border-edge-hover focus:shadow-glow-sm transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-4">
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          disabled={formState === 'loading'}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          disabled={formState === 'loading'}
        />
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
          disabled={formState === 'loading'}
        />
      </div>

      {formState === 'error' && errorMsg && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full py-3 bg-inverse text-inverse-copy font-semibold rounded-lg text-sm transition-all border-edge hover:border-edge-hover hover:shadow-glow-btn disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formState === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
