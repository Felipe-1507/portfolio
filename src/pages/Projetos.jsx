import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Componente de animação para elementos que aparecem ao rolar
const AnimatedElement = ({ children, animation = "fade" }) => {
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

// Componente de projeto individual
const ProjetoCard = ({ titulo, descricao, imagem, tecnologias, link }) => {
  return (
    <div className="card overflow-hidden">
      <div className="relative h-48 overflow-hidden mb-4 bg-gray-800">
        {imagem ? (
          <img 
            src={imagem} 
            alt={titulo} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-black to-[#E50914]">
            <span className="text-2xl font-bold">Imagem do Projeto</span>
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{titulo}</h3>
      <p className="text-[var(--text-secondary)] mb-4">{descricao}</p>
      <div className="mb-4">
        <h4 className="font-medium mb-2">Tecnologias:</h4>
        <div className="flex flex-wrap gap-2">
          {tecnologias.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-[#222] rounded text-sm">{tech}</span>
          ))}
        </div>
      </div>
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn inline-block"
        >
          Ver Projeto
        </a>
      )}
    </div>
  );
};

const Projetos = () => {
  // Projetos de exemplo que o usuário pode substituir
  const projetosExemplo = [
    {
      titulo: "Site Corporativo",
      descricao: "Site institucional desenvolvido para empresa de tecnologia, com seções de serviços, sobre e contato.",
      imagem: "",
      tecnologias: ["HTML", "CSS", "JavaScript", "React"],
      link: ""
    },
    {
      titulo: "E-commerce",
      descricao: "Loja virtual com catálogo de produtos, carrinho de compras e sistema de pagamento.",
      imagem: "",
      tecnologias: ["React", "Node.js", "MongoDB", "Stripe"],
      link: ""
    },
    {
      titulo: "Aplicativo Mobile",
      descricao: "Aplicativo para dispositivos móveis com funcionalidades de geolocalização e notificações.",
      imagem: "",
      tecnologias: ["React Native", "Firebase", "Google Maps API"],
      link: ""
    },
    {
      titulo: "Dashboard Administrativo",
      descricao: "Painel de controle para gerenciamento de dados e visualização de métricas.",
      imagem: "",
      tecnologias: ["Angular", "Chart.js", "Bootstrap", "Firebase"],
      link: ""
    }
  ];

  return (
    <div className="App">
      {/* Header é mantido no componente principal */}
      
      {/* Hero Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-name">MEUS PROJETOS</h1>
            <h2 className="hero-title">Portfólio de Trabalhos</h2>
          </motion.div>
        </div>
      </section>

      {/* Projetos Section */}
      <section className="section bg-[#111]">
        <div className="container">
          <AnimatedElement>
            <h2 className="section-title">Projetos Desenvolvidos</h2>
            <p className="text-center text-[var(--text-secondary)] mb-12">
              Aqui estão alguns dos projetos que desenvolvi. Cada projeto demonstra diferentes habilidades e tecnologias.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetosExemplo.map((projeto, index) => (
              <AnimatedElement key={index} animation={index % 3 === 0 ? "slideLeft" : index % 3 === 1 ? "fade" : "slideRight"}>
                <ProjetoCard {...projeto} />
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Adicionar Projeto Section */}
      <section className="section">
        <div className="container">
          <AnimatedElement>
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Como adicionar seus projetos</h2>
              <p className="mb-4">
                Esta página foi criada para você adicionar seus próprios projetos. Para adicionar um novo projeto:
              </p>
              <ol className="space-y-2 mb-6 list-decimal pl-5">
                <li>Edite o arquivo <code className="bg-[#222] px-2 py-1 rounded">src/pages/Projetos.jsx</code></li>
                <li>Localize o array <code className="bg-[#222] px-2 py-1 rounded">projetosExemplo</code></li>
                <li>Adicione um novo objeto com as informações do seu projeto</li>
                <li>Inclua título, descrição, caminho da imagem, tecnologias e link</li>
                <li>Salve o arquivo e reconstrua o site</li>
              </ol>
              <p className="text-[var(--text-secondary)]">
                Você também pode personalizar o layout, adicionar mais seções ou modificar o estilo conforme necessário.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Footer é mantido no componente principal */}
    </div>
  );
};

export default Projetos;
