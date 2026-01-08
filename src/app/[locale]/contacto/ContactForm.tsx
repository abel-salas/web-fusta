import { ContactFormProps } from '@/app/lib/dictionary.models';
import { useState } from 'react';

export default function ContactForm({ formText }: { formText: ContactFormProps }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);
    // Aquí puedes conectar con tu backend o servicio de email
    if (!form.name || !form.email || !form.message) {
      setError(formText.errorMessage);
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7 bg-transparent">
      <h3 className="text-3xl font-bold text-black mb-6">{formText.title}</h3>
      <input
        type="text"
        name="name"
        placeholder={formText.name}
        value={form.name}
        onChange={handleChange}
        className="border-2 border-black py-2 px-3 focus:outline-none focus:border-amber-500 bg-white text-base placeholder-black transition-all w-full"
      />
      <input
        type="email"
        name="email"
        placeholder={formText.email}
        value={form.email}
        onChange={handleChange}
        className="border-2 border-black py-2 px-3 focus:outline-none focus:border-amber-500 bg-white text-base placeholder-black transition-all w-full"
      />
      <textarea
        name="message"
        placeholder={formText.message}
        value={form.message}
        onChange={handleChange}
        rows={5}
        className="border-2 border-black py-2 px-3 focus:outline-none focus:border-amber-500 bg-white text-base placeholder-black resize-none transition-all w-full"
      />
      {error && <div className="text-red-500 text-base text-center font-medium">{error}</div>}
      {submitted && <div className="text-green-600 text-base text-center font-medium">{formText.submittedMessage}</div>}
      <button type="submit">
          <span className="cta-cortina bg-amber-700 uppercase text-white font-bold py-4 px-10 rounded text-sm shadow-lg">
            <span className="relative z-10">· {formText.ctaText} ·</span>
          </span>
      </button>
    </form>
  );
}
