import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  nome: string;
  email: string;
  mensagem: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // !! IMPORTANTE: Substitua 'YOUR_FORMSPREE_ID' pelo seu ID real do Formspree !!
  const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORMSPREE_ID'; 

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Mensagem enviada com sucesso! Obrigado por entrar em contato.');
        reset(); // Limpa o formulário após o envio bem-sucedido
      } else {
        const responseData = await response.json();
        setSubmitStatus('error');
        setSubmitMessage(`Erro ao enviar mensagem: ${responseData.error || 'Tente novamente mais tarde.'}`);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
      console.error('Erro no envio do formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block mb-1">Nome</label>
        <input
          type="text"
          id="nome"
          {...register('nome', { required: 'Nome é obrigatório' })}
          className={`w-full p-2 bg-[#333] border ${errors.nome ? 'border-red-500' : 'border-[#444]'} rounded focus:outline-none focus:border-[var(--primary)]`}
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Endereço de email inválido',
            },
          })}
          className={`w-full p-2 bg-[#333] border ${errors.email ? 'border-red-500' : 'border-[#444]'} rounded focus:outline-none focus:border-[var(--primary)]`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="mensagem" className="block mb-1">Mensagem</label>
        <textarea
          id="mensagem"
          rows={4}
          {...register('mensagem', { required: 'Mensagem é obrigatória' })}
          className={`w-full p-2 bg-[#333] border ${errors.mensagem ? 'border-red-500' : 'border-[#444]'} rounded focus:outline-none focus:border-[var(--primary)]`}
        ></textarea>
        {errors.mensagem && <p className="text-red-500 text-sm mt-1">{errors.mensagem.message}</p>}
      </div>
      
      {/* Mensagem de Status */}
      {submitMessage && (
        <p className={`text-sm ${submitStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {submitMessage}
        </p>
      )}

      <button 
        type="submit" 
        className="btn disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting || submitStatus === 'submitting'}
      >
        {isSubmitting || submitStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  );
};

export default ContactForm;
