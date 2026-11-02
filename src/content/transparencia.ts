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
