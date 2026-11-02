// Termos de fomento e convênios (publicidade de parceria, art. 11 da Lei 13.019/2014).
// No plano Essencial, a MDS atualiza esta lista. Datas no formato AAAA-MM-DD.
// O status (vigente/concluído) é calculado pela data de término.

export type Parceria = {
  projeto: string;
  programa: string;
  fonte: string;
  valor: number; // em reais
  convenio: string;
  processo: string;
  assinatura: string;
  publicacao: string;
  inicio: string;
  fim: string;
};

export const parcerias: Parceria[] = [
  // Exemplo de preenchimento:
  // {
  //   projeto: "Copa Delta de Karatê 2026",
  //   programa: "",
  //   fonte: "",
  //   valor: 100000,
  //   convenio: "0000/2026",
  //   processo: "2026/00000",
  //   assinatura: "2026-07-01",
  //   publicacao: "2026-07-03",
  //   inicio: "2026-07-01",
  //   fim: "2026-12-31",
  // },
];

// Documentos oficiais do Instituto (arquivos em public/documentos).
// Para incluir um novo: copie o PDF para public/documentos e acrescente um item aqui.

export type Documento = {
  titulo: string;
  descricao: string;
  categoria: "Constituição" | "Diretoria" | "Cadastro";
  data: string; // AAAA-MM-DD
  arquivo: string;
  paginas: number;
};

export const documentos: Documento[] = [
  {
    titulo: "Comprovante de Inscrição no CNPJ",
    descricao:
      "Cartão CNPJ emitido pela Receita Federal: CNPJ 17.984.579/0001-77, associação privada aberta em 10/04/2013, atividade de defesa de direitos sociais.",
    categoria: "Cadastro",
    data: "2026-01-23",
    arquivo: "/documentos/cartao-cnpj.pdf",
    paginas: 1,
  },
  {
    titulo: "Ata da Assembleia Geral Extraordinária e Estatuto Social",
    descricao:
      "Assembleia de 21/10/2024 que alterou a denominação para Instituto João de Barro – IJB, atualizou os objetivos e o endereço, com o Estatuto Social consolidado e registrado em cartório.",
    categoria: "Constituição",
    data: "2024-10-21",
    arquivo: "/documentos/ata-age-2024-alteracao-denominacao.pdf",
    paginas: 31,
  },
  {
    titulo: "Ata de Recomposição da Diretoria",
    descricao:
      "Assembleia de 30/12/2025 que elegeu a nova Diretoria Executiva para o mandato até 31/05/2027. Registrada no 1º Serviço Notarial e Registral de Cuiabá em 04/03/2026.",
    categoria: "Diretoria",
    data: "2025-12-30",
    arquivo: "/documentos/ata-recomposicao-diretoria-2026.pdf",
    paginas: 5,
  },
  {
    titulo: "Termo de Posse da Diretoria",
    descricao:
      "Termo de posse da Presidente e da Diretoria eleitas, registrado no 1º Serviço Notarial e Registral de Cuiabá em 04/03/2026.",
    categoria: "Diretoria",
    data: "2026-03-04",
    arquivo: "/documentos/termo-de-posse-diretoria-2026.pdf",
    paginas: 2,
  },
];
