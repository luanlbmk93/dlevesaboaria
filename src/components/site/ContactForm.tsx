'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const firstName = data.get('firstName') as string;
    const subject = data.get('subject') as string;
    const message = data.get('message') as string;
    const email = data.get('email') as string;

    if (!firstName || !email || !subject || !message) {
      setFeedback('Por favor, preencha todos os campos obrigatórios.');
      setFeedbackType('error');
      return;
    }

    const subjectLabels: Record<string, string> = {
      produtos: 'Dúvidas sobre produtos',
      pedido: 'Meu pedido',
      pele: 'Dicas de cuidados com a pele',
      outro: 'Outro assunto',
    };

    const mailto = [
      'mailto:dlevesaboaria@gmail.com',
      `?subject=${encodeURIComponent(`[D'Leve] ${subjectLabels[subject] || subject} - ${firstName}`)}`,
      `&body=${encodeURIComponent(`E-mail: ${email}\n\n${message}`)}`,
    ].join('');

    window.location.href = mailto;
    setFeedback('Obrigada pelo carinho! Seu cliente de email será aberto.');
    setFeedbackType('success');
    form.reset();
  }

  return (
    <form className="site-contact__form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Primeiro Nome *</label>
          <input id="firstName" name="firstName" required autoComplete="given-name" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Sobrenome *</label>
          <input id="lastName" name="lastName" required autoComplete="family-name" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">E-mail *</label>
        <input id="contact-email" name="email" type="email" placeholder="seu@email.com" required autoComplete="email" />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Suporte *</label>
        <select id="subject" name="subject" required defaultValue="">
          <option value="" disabled>Como podemos ajudar?</option>
          <option value="produtos">Dúvidas sobre produtos</option>
          <option value="pedido">Meu pedido</option>
          <option value="pele">Dicas de cuidados com a pele</option>
          <option value="outro">Outro assunto</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensagem *</label>
        <textarea id="message" name="message" rows={5} placeholder="Por favor, descreva suas dúvidas em detalhes..." required />
      </div>

      <button type="submit" className="btn btn--primary btn--full">Enviar Mensagem</button>

      {feedback && (
        <p className={feedbackType === 'error' ? 'form-error' : 'form-success'} style={{ textAlign: 'center', marginTop: '1rem' }}>
          {feedback}
        </p>
      )}
    </form>
  );
}
