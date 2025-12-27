import { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  // form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comments: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});

  // submission state
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!form.comments.trim()) newErrors.comments = 'Message is required';
    if (!form.terms) newErrors.terms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError('');
    setSuccess('');

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/submit-form.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // HTTP-level errors
      if (!res.ok) {
        throw new Error(`Server error (${res.status})`);
      }

      const data = await res.json();

      // API-level errors
      if (!data.success) {
        throw new Error(data.message || 'Submission failed');
      }

      setSuccess('Your message has been sent successfully.');

      //reset form
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        comments: '',
        terms: false,
      });
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-width-container">
      <div className="contact">
        <div className="contact-inner">
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>How to reach us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>

            <div className="row">
              <div className="field">
                <label htmlFor="firstName">First Name *</label>
                <input id="firstName" name="firstName" onChange={handleChange} />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>

              <div className="field">
                <label htmlFor="lastName">Last Name *</label>
                <input id="lastName" name="lastName" onChange={handleChange} />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" onChange={handleChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="phone">Telephone</label>
              <input id="phone" name="phone" onChange={handleChange} />
            </div>

            <div className="field">
              <label htmlFor="comments">Message *</label>
              <textarea id="comments" name="comments" onChange={handleChange} />
              {errors.comments && <span className="error">{errors.comments}</span>}
            </div>

            <p className="required-note">* required fields</p>

            <div className="checkbox">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms &amp; Conditions</a>
              </label>
            </div>
            {errors.terms && <span className="error">{errors.terms}</span>}

            {apiError && <p className="error">{apiError}</p>}
            {success && <p className="success">{success}</p>}
            <div className="submit-button">
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'SUBMIT'}
              </button>
            </div>
          </form>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.4329168802647!2d79.9404323!3d6.844821199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25069caa2f53b%3A0xe7eae3a8b1f1214d!2seBEYONDS%20eBusiness%20%26%20Digital%20Solutions!5e1!3m2!1sen!2slk!4v1766777263959!5m2!1sen!2slk"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
