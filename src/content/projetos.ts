// Projetos vistos no Instagram. PENDENTE: descrição completa e público de cada um.

export type Projeto = {
  slug: string;
  nome: string;
  area: string;
  resumo: string;
  publico?: string;
  imagem?: string;
  fotos?: string[];
};

export const projetos: Projeto[] = [
  {
    slug: "copa-delta-de-karate",
    nome: "Copa Delta de Karatê",
    area: "Esporte",
    resumo:
      "Competição de karatê realizada com a Associação Delta de Karatê no Ginásio Marechal Rondon, no Centro de Rondonópolis. A edição 2026 aconteceu em 22 de agosto.",
    imagem: "/img/karate.jpg",
  },
  {
    slug: "copa-craques-do-amanha",
    nome: "Copa Craques do Amanhã",
    area: "Esporte",
    resumo: "Campeonato de futebol de base em Rondonópolis, para revelar e acompanhar jovens atletas.",
    imagem: "/img/futebol.jpg",
  },
  {
    slug: "canta-rondonopolis",
    nome: "Canta Rondonópolis",
    area: "Cultura",
    resumo: "Concurso de canto que leva novos talentos da cidade ao palco.",
  },
  {
    slug: "atendimentos",
    nome: "Atendimentos",
    area: "Desenvolvimento social",
    resumo: "Atendimentos à comunidade realizados pelo Instituto.",
  },
];
