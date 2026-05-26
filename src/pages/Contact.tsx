import { useState } from 'react';
import { agent } from '../data/agent';
import SEO from '../components/SEO';

import { normalizePhone } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    // TODO: Wire to backend API
  };

  const faqs = [
    {
      q: 'What areas of Tulsa do you cover?',
      a: 'I work across the entire Tulsa metro area, including Broken Arrow, Bixby, Jenks, Owasso, and Sand Springs. If you are unsure whether I cover your area, just ask.',
    },
    {
      q: 'Do I need to sign a contract to work with you?',
      a: 'No. I offer free consultations with zero obligation. If we decide to work together, we will sign a standard buyer or seller agreement — but only when you are ready.',
    },
    {
      q: 'How quickly can you show me a home?',
      a: 'Usually within 24 hours. For hot listings, I prioritize same-day showings. The best homes move fast, and I move faster.',
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact | Free Consultation"
        description={`Contact ${agent.name}, Tulsa real estate agent. Free consultation, no obligation. Call ${agent.phone} or send a message to get started.`}
        pathname="/contact"
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-[-0.02em] mb-3">Let&apos;s Talk About Your Next Move</h1>
        <p className="text-ink-2 max-w-xl leading-relaxed">
          Buying or selling in Tulsa? Kandice will give you honest answers, a clear plan, and zero pressure. Call, text, or email anytime.
        </p>
      </div>

      {/* FAQ */}
      <section className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold text-ink tracking-[-0.02em] mb-8">Common Questions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-semibold text-ink mb-2">{faq.q}</h3>
                <p className="text-ink-2 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Sheet */}
      <section className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left: Agent Info */}
            <div className="lg:col-span-2">
              <div className="rounded-[var(--radius-card)] overflow-hidden border border-rule mb-6">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-full h-[20rem] sm:h-[28rem] object-cover object-top"
                />
              </div>
              <div className="rounded-[var(--radius-card)] border border-rule p-6">
                <div className="text-xl font-semibold text-ink mb-1">{agent.name}</div>
                <p className="text-ink-2 text-sm font-medium mb-4">{agent.office}</p>
                <div className="flex flex-col gap-3 text-sm text-ink-2">
                  <a href={`tel:${normalizePhone(agent.phone)}`} className="flex items-center gap-3 text-ink hover:text-accent transition-colors">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-rule text-ink">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    {agent.phone}
                  </a>
                  {agent.email && (
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-ink hover:text-accent transition-colors">
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-rule text-ink">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      {agent.email}
                    </a>
                  )}
                  <span className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-rule text-ink">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    {agent.address}
                  </span>
                </div>
                <div className="mt-5 pt-5 border-t border-rule flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-ink text-paper text-xs font-semibold px-3 py-1.5 rounded-full">{agent.rating}</span>
                    <span className="text-xs text-ink-2">(Top Producer)</span>
                  </div>
                  {agent.social.facebook && (
                    <a
                      href={agent.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook (opens in new tab)"
                      className="text-ink hover:text-accent transition-colors p-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="rounded-[var(--radius-card)] border border-rule p-8 sm:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-paper-2 text-ink rounded-full flex items-center justify-center mx-auto mb-4 border border-rule">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-ink mb-2">Message Sent!</h2>
                    <p className="text-ink-2">Thanks for reaching out. {agent.name.split(' ')[0]} will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold text-ink mb-2">Get Your Free Consultation</h2>
                    <p className="text-ink-2 mb-8">Tell Kandice what you are looking for. She responds within a few hours — no pressure, ever.</p>

                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                      {[
                        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
                        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
                        { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(555) 123-4567', required: false },
                      ].map((field) => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block text-sm font-medium text-ink mb-1.5">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-0.5">*</span>}
                          </label>
                          <input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={handleChange}
                            aria-invalid={errors[field.id] ? 'true' : 'false'}
                            aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                            required={field.required}
                            placeholder={field.placeholder}
                            className={`w-full rounded-[var(--radius-input)] border px-4 py-3 text-base text-ink font-medium focus:outline-none focus:border-ink transition-colors bg-transparent ${
                              errors[field.id]
                                ? 'border-red-300 focus:border-red-400'
                                : 'border-rule hover:border-ink/30'
                            }`}
                          />
                          {errors[field.id] && (
                            <p id={`${field.id}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
                              {errors[field.id]}
                            </p>
                          )}
                        </div>
                      ))}

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                          Message<span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          aria-invalid={errors.message ? 'true' : 'false'}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                          required
                          placeholder="Tell me about your real estate goals..."
                          className={`w-full rounded-[var(--radius-input)] border px-4 py-3 text-base text-ink font-medium focus:outline-none focus:border-ink transition-colors bg-transparent resize-none ${
                            errors.message
                              ? 'border-red-300 focus:border-red-400'
                              : 'border-rule hover:border-ink/30'
                          }`}
                        />
                        {errors.message && (
                          <p id="message-error" className="mt-1.5 text-sm text-red-500" role="alert">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-full bg-ink px-6 py-4 font-semibold text-paper hover:bg-ink/90 transition-colors"
                      >
                        Start My Consultation
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
