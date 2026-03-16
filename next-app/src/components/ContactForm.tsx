'use client'

import { useState } from 'react'
import { submitContact } from '@/lib/payload'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: 'hire', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await submitContact(form)
      if (res?.doc || res?.id) {
        setStatus('success')
        setForm({ name: '', email: '', subject: 'hire', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-surface border border-border text-text-primary text-sm px-3 py-2 rounded focus:outline-none focus:border-accent transition-colors placeholder:text-text-secondary/50'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-text-secondary mb-1">Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1">Email</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1">Subject</label>
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClass}
        >
          <option value="hire">Hire Me</option>
          <option value="collab">Collaboration</option>
          <option value="freelance">Freelance Project</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1">Message</label>
        <textarea
          required
          rows={5}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'success' && (
        <p className="text-sm text-green-400">Thank you! I&apos;ll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-accent text-white text-sm px-6 py-2.5 rounded hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
