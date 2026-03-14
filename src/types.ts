export interface DadosPessoais {
  nome: string;
  telefone: string;
  email: string;
  linkedin: string;
  localizacao: string;
}

export interface FormacaoAcademica {
  curso: string;
  instituicao: string;
  ano: string;
}

export interface ExperienciaProfissional {
  cargo: string;
  empresa: string;
  periodo: string;
  atividades: string[];
}

export interface HabilidadesTecnicas {
  linguagens: string[];
  softwares: string[];
  sistemas_operacionais: string[];
}

export interface Idioma {
  idioma: string;
  nivel: string;
}

export interface DadosOrganizados {
  dados_pessoais: DadosPessoais;
  objetivo: string;
  formacao_academica: FormacaoAcademica[];
  experiencia_profissional: ExperienciaProfissional[];
  habilidades_tecnicas: HabilidadesTecnicas;
  idiomas: Idioma[];
}

export type AnimationType = 'fade' | 'slideLeft' | 'slideRight';
