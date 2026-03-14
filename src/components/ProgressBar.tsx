import React, { useState, useEffect } from 'react';

const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Chamar handleScroll uma vez para definir o estado inicial
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="progress-bar-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px', // Altura da barra
        zIndex: 101, // Acima do header
        backgroundColor: 'transparent' // Fundo transparente
      }}
    >
      <div 
        className="progress-bar"
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          backgroundColor: 'var(--primary)', // Usa a cor primária do tema
          transition: 'width 0.1s ease-out' // Transição suave
        }}
      />
    </div>
  );
};

export default ProgressBar;
