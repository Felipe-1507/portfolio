import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Typewriter from 'typewriter-effect'; // Importar Typewriter
import './App.css';
import { DadosOrganizados, AnimationType } from './types';
import dadosJson from './dados_organizados.json';
import Projetos from './pages/Projetos';
import ParticlesBackground from './components/ParticlesBackground';
import ThemeToggle from './components/ThemeToggle';
import useTheme from './hooks/useTheme';
import ProgressBar from './components/ProgressBar'; // Importar ProgressBar
import SocialShareButtons from './components/SocialShareButtons'; // Importar SocialShareButtons
import ContactForm from './components/ContactForm'; // Importar ContactForm

const dados: DadosOrganizados = dadosJson as DadosOrganizados;

// Componente de animação para elementos que aparecem ao rolar
const AnimatedElement: React.FC<{
  children: React.ReactNode;
  animation?: AnimationType;
}> = ({ children, animation = "fade" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    fade: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[animation]}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Componente da página inicial
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-name">FELIPE DE ALMEIDA FERREIRA</h1>
            <h2 className="hero-title">
              <Typewriter
                options={{
                  strings: ["Analista e Desenvolvedor de Sistemas", "Apaixonado por Tecnologia", "Sempre Aprendendo"],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </h2>
            <a href="#contato" className="btn">Entre em contato</a>
          </motion.div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="section bg-[#111]">
        <div className="container">
          <AnimatedElement>
            <h2 className="section-title">Sobre Mim</h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedElement animation="slideLeft">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Objetivo Profissional</h3>
                <p className="text-[var(--text-secondary)]">{dados.objetivo}</p>
                {/* Botão de Download do Currículo */}
                <a 
                  href="/Felipe_Ferreira_CV.pdf" 
                  download="Felipe_Ferreira_CV.pdf"
                  className="btn mt-4 inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Currículo (PDF)
                </a>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slideRight">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center">
                    <span className="contact-icon">📱</span>
                    <span>{dados.dados_pessoais.telefone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="contact-icon">✉️</span>
                    <span>{dados.dados_pessoais.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="contact-icon">🔗</span>
                    <a href={`https://${dados.dados_pessoais.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)]">
                      {dados.dados_pessoais.linkedin}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="contact-icon">📍</span>
                    <span>{dados.dados_pessoais.localizacao}</span>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Formação Section */}
      <section id="formacao" className="section">
        <div className="container">
          <AnimatedElement>
            <h2 className="section-title">Formação Acadêmica</h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dados.formacao_academica.map((formacao, index) => (
              <AnimatedElement key={index} animation={index % 2 === 0 ? "slideLeft" : "slideRight"}>
                <div className="card">
                  <h3 className="text-xl font-bold mb-2">{formacao.curso}</h3>
                  <p className="text-[var(--primary)] mb-2">{formacao.instituicao}</p>
                  <p className="text-[var(--text-secondary)]">{formacao.ano}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Experiência Section */}
      <section id="experiencia" className="section bg-[#111]">
        <div className="container">
          <AnimatedElement>
            <h2 className="section-title">Experiência Profissional</h2>
          </AnimatedElement>
          
          <div className="space-y-8">
            {dados.experiencia_profissional.map((exp, index) => (
              <AnimatedElement key={index}>
                <div className="timeline-item">
                  <div className="card">
                    <h3 className="text-xl font-bold mb-1">{exp.cargo}</h3>
                    <h4 className="text-[var(--primary)] mb-2">{exp.empresa}</h4>
                    <p className="text-[var(--text-secondary)] mb-4">{exp.periodo}</p>
                    <ul className="space-y-2">
                      {exp.atividades.map((atividade, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-[var(--primary)] mr-2">•</span>
                          <span>{atividade}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Habilidades Section */}
      <section id="habilidades" className="section">
        <div className="container">
          <AnimatedElement>
            <h2 className="section-title">Habilidades Técnicas</h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedElement animation="slideLeft">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Linguagens de Programação</h3>
                {dados.habilidades_tecnicas.linguagens.map((linguagem, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>{linguagem}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 - index * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slideRight">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Softwares</h3>
                {dados.habilidades_tecnicas.softwares.map((software, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>{software}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${90 - index * 8}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>
          
          <AnimatedElement>
            <div className="card mt-8">
              <h3 className="text-xl font-bold mb-4">Sistemas Operacionais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dados.habilidades_tecnicas.sistemas_operacionais.map((sistema, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>{sistema}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 - index * 5}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement>
            <div className="card mt-8">
              <h3 className="text-xl font-bold mb-4">Idiomas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dados.idiomas.map((idioma, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{idioma.idioma}</span>
                      <span className="text-[var(--text-secondary)]">{idioma.nivel}</span>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => {
                        const filled = i < (idioma.idioma === "Português" ? 5 : idioma.idioma === "Inglês" ? 4 : 3);
                        return (
                          <motion.div 
                            key={i}
                            className={`language-circle ${filled ? 'filled' : ''}`}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="section bg-[#111]">
        <div className="container">
          <AnimatedElement>
            <h2 className="section-title">Contato</h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedElement animation="slideLeft">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
                <div className="flex flex-col space-y-4">
                  <a href={`tel:${dados.dados_pessoais.telefone}`} className="flex items-center contact-link">
                    <span className="contact-icon">📱</span>
                    <span>{dados.dados_pessoais.telefone}</span>
                  </a>
                  <a href={`mailto:${dados.dados_pessoais.email}`} className="flex items-center contact-link">
                    <span className="contact-icon">✉️</span>
                    <span>{dados.dados_pessoais.email}</span>
                  </a>
                  <a href={`https://${dados.dados_pessoais.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center contact-link">
                    <span className="contact-icon">🔗</span>
                    <span className="text-[var(--primary)]">{dados.dados_pessoais.linkedin}</span>
                  </a>
                  <div className="flex items-center">
                    <span className="contact-icon">📍</span>
                    <span>{dados.dados_pessoais.localizacao}</span>
                  </div>
                </div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="slideRight">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Envie uma Mensagem</h3>
                <ContactForm />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        {/* Progress Bar */}
        <ProgressBar />
        
        {/* Particles Background */}
        <ParticlesBackground />
        
        {/* Header */}
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
          <div className="container">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold">Felipe Ferreira</Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center">
                <Link to="/" className="nav-link">Início</Link>
                <a href="/#sobre" className="nav-link">Sobre</a>
                <a href="/#formacao" className="nav-link">Formação</a>
                <a href="/#experiencia" className="nav-link">Experiência</a>
                <a href="/#habilidades" className="nav-link">Habilidades</a>
                <Link to="/projetos" className="nav-link">Projetos</Link>
                <a href="/#contato" className="nav-link btn">Contato</a>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </nav>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white"
                onClick={toggleMobileMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        {/* Mobile Menu - Visível apenas em dispositivos móveis */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <button 
            className="absolute top-4 right-4 text-white"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="flex flex-col mt-12">
            <Link to="/" className="nav-link py-3" onClick={toggleMobileMenu}>Início</Link>
            <a href="/#sobre" className="nav-link py-3" onClick={toggleMobileMenu}>Sobre</a>
            <a href="/#formacao" className="nav-link py-3" onClick={toggleMobileMenu}>Formação</a>
            <a href="/#experiencia" className="nav-link py-3" onClick={toggleMobileMenu}>Experiência</a>
            <a href="/#habilidades" className="nav-link py-3" onClick={toggleMobileMenu}>Habilidades</a>
            <Link to="/projetos" className="nav-link py-3" onClick={toggleMobileMenu}>Projetos</Link>
            <a href="/#contato" className="nav-link btn mt-4" onClick={toggleMobileMenu}>Contato</a>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
        </Routes>
        {/* Botões de Compartilhamento Social */}
        <SocialShareButtons 
          url={"https://rxkikwus.manus.space"} // Usar a URL mais recente do deploy ou uma genérica
          title={"Felipe Ferreira - Portfólio"}/>

      </div>
    </Router>
  );
}

export default App;
