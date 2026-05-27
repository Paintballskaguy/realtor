import { useState, useRef } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ListingAlertForm() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setFormState('submitting');
    setErrorMsg('');

    // Simulate API call — replace with real email service
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Demo: randomly succeed
    if (Math.random() > 0.1) {
      setFormState('success');
      setEmail('');
    } else {
      setFormState('error');
      setErrorMsg('Something went wrong. Please try again.');
      inputRef.current?.focus();
    }
  };

  if (formState === 'success') {
    return (
      <div
        className="w-full max-w-xl mx-auto rounded-2xl bg-paper-2 border border-rule p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-ink mb-1">You are on the list!</h3>
        <p className="text-ink-2 text-sm">
          Watch your inbox for hand-picked Tulsa listings.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-4 text-sm font-medium text-accent hover:underline"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 w-full max-w-xl mx-auto"
      aria-describedby={errorMsg ? 'alert-error' : undefined}
    >
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="alert-email" className="text-sm font-medium text-ink sr-only sm:not-sr-only">
          Email address
        </label>
        <input
          ref={inputRef}
          id="alert-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="your@email.com"
          required
          disabled={formState === 'submitting'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-ink/30 px-6 py-4 text-base text-ink font-medium focus:outline-none focus:border-ink transition-colors bg-white shadow-sm disabled:opacity-60"
          aria-invalid={errorMsg ? 'true' : 'false'}
          aria-describedby={errorMsg ? 'alert-error' : undefined}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink sr-only sm:not-sr-only">&nbsp;</span>
        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="w-full rounded-full border border-transparent bg-ink px-8 py-4 text-base font-semibold text-paper hover:bg-ink/90 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {formState === 'submitting' ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {errorMsg && (
        <p id="alert-error" className="sm:col-span-2 text-sm text-red-600 font-medium" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
