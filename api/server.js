const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Rota para envio de e-mail
app.post('/api/enviar-email', async (req, res) => {
  const { nome, email, mensagem } = req.body;
  
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ 
      sucesso: false, 
      mensagem: 'Por favor, preencha todos os campos.' 
    });
  }

  try {
    // Configuração do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'felipeferreira1507@gmail.com', // E-mail do destinatário
      subject: `Contato do Site - ${nome}`,
      html: `
        <h2>Nova mensagem do formulário de contato</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `
    };

    // Enviar e-mail
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      sucesso: true, 
      mensagem: 'Mensagem enviada com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.' 
    });
  }
});

// Rota de teste
app.get('/api/teste', (req, res) => {
  res.json({ mensagem: 'API funcionando corretamente!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
