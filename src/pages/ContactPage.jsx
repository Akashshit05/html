import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import aboutTeam from '../assets/about-team.png';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your query to TL HQ...' });
    setErrors({});

    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors || {});
        setStatus({
          type: 'error',
          message: result.message || 'Please fix the highlighted fields.'
        });
        return;
      }

      setForm(initialForm);
      navigate('/query-sent', { state: { queryId: result.queryId } });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network issue. Please try again once the server is reachable.'
      });
    }
  }

  const isLoading = status.type === 'loading';

  return (
    <section className="form-section">
      <div className="form-intro">

        <h2>Contact Us</h2>
        <img
          className="design-preview"
          src={aboutTeam}
          alt="Best design preview"
        />
        <p className="interactive-note">
          Need a quick response? Fill out the form and we’ll get back to you fast.
        </p>
      </div>

      <form className="query-form" onSubmit={handleSubmit} noValidate>
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={updateField}
          error={errors.name}
          maxLength={80}
          placeholder="Your name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          error={errors.email}
          maxLength={120}
          placeholder="you@example.com"
        />
        <Field
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={updateField}
          error={errors.subject}
          maxLength={120}
          placeholder="Deploy broke, help needed"
        />
        <label className="field span-all">
          <span>Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            maxLength={1000}
            placeholder="Tell TL the full scene..."
          />
          <small>{form.message.length}/1000</small>
          {errors.message ? <strong>{errors.message}</strong> : null}
        </label>

        {status.message ? (
          <p className={`form-status ${status.type}`} role="status">
            {status.message}
          </p>
        ) : null}

        <button className="btn primary span-all" type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Query'}
        </button>
      </form>
    </section>
  );
}

function Field({ label, error, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
      {error ? <strong>{error}</strong> : null}
    </label>
  );
}
