import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    // Se não houver, usar 'dark' como padrão (tema original do site)
    return savedTheme || 'dark';
  });

  // Efeito para aplicar o tema ao documento
  useEffect(() => {
    // Salvar tema no localStorage
    localStorage.setItem('theme', theme);
    
    // Aplicar classe ao elemento html
    const root = document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${theme}-theme`);
  }, [theme]);

  // Função para alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};

export default useTheme;
