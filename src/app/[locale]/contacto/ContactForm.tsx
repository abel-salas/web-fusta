import { useState } from 'react';

export default function ContactForm() {
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
      setError('Por favor, rellena todos los campos.');
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7 bg-transparent">
      <h3 className="text-2xl font-bold mb-2 text-amber-700 uppercase">Envíanos un mensaje</h3>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="border-2 border-black py-2 px-3 focus:outline-none focus:border-amber-500 bg-white text-base placeholder-black transition-all w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border-2 border-black py-2 px-3 focus:outline-none focus:border-amber-500 bg-white text-base placeholder-black transition-all w-full"
      />
      <textarea
        name="message"
        placeholder="Mensaje"
        value={form.message}
        onChange={handleChange}
        rows={5}
        className="border-2 border-black py-2 px-3 focus:outline-none focus:border-amber-500 bg-white text-base placeholder-black resize-none transition-all w-full"
      />
      {error && <div className="text-red-500 text-base text-center font-medium">{error}</div>}
      {submitted && <div className="text-green-600 text-base text-center font-medium">¡Mensaje enviado correctamente!</div>}
      <button
        type="submit"
        className="mt-2 px-6 py-2 bg-amber-500 text-black font-bold text-base tracking-wide border-2 border-amber-500 transition-all duration-200 w-auto self-start hover:bg-white hover:border-black hover:text-black"
      >
        Enviar
      </button>
    </form>
  );
}
