// Dados gerais do Instituto. Campos vazios ("") não aparecem no site.
// PENDENTE: e-mail do Instituto.

export const site = {
  nome: "Instituto João de Barro",
  slogan: "Toda ação constrói!",
  cidade: "Cuiabá – MT",
  descricao:
    "O Instituto João de Barro promove o bem-estar, a educação e o desenvolvimento social em Mato Grosso, com projetos de esporte, cultura e inclusão.",
  razaoSocial: "Instituto João de Barro – IJB",
  cnpj: "17.984.579/0001-77",
  endereco: "Av. Haiti esquina com Rua Caracas, nº 610, Sala 05 – Centro Empresarial América, Cuiabá – MT, CEP 78060-618",
  telefone: "+55 (65) 99215-1877",
  whatsapp: "65992151877", // só números com DDD
  email: "",
  instagram: "https://www.instagram.com/institutojoaodebarromt/",
  instagramUser: "@institutojoaodebarromt",
  facebook: "https://www.facebook.com/institutojoaodebarromt/",
};

export const nav = [
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/projetos", label: "Projetos" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/noticias", label: "Notícias" },
  { href: "/contato", label: "Contato" },
];

export function whatsappLink(texto = "Olá! Vim pelo site do Instituto João de Barro.") {
  if (!site.whatsapp) return "";
  return `https://wa.me/55${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}
