import React, { useState } from 'react'

const faqs = [
  {
    question: 'Are you available for freelance or internships?',
    answer: 'Yes, open to impactful projects and learning opportunities.'
  },
  {
    question: 'What tech do you enjoy most?',
    answer: 'Modern web stacks, systems tooling, and performance engineering.'
  },
  {
    question: 'How fast do you respond?',
    answer: 'Usually within 24–48 hours.'
  }
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = formData

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('Please fill out all fields.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    setStatus('Sending…')

    // Simulate async submission
    setTimeout(() => {
      setStatus('Message sent! I will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 800)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact Me</h2>
      
      <form id="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="How can I help?"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
          ></textarea>
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
          <p id="form-status" role="status" aria-live="polite">
            {status}
          </p>
        </div>
      </form>

      <section id="faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">FAQ</h2>
        {faqs.map((faq, index) => (
          <details key={index}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
    </section>
  )
}

export default Contact
