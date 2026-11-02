// Dados gerais do Instituto. Campos vazios ("") não aparecem no site.
// PENDENTE: pedir ao Instituto CNPJ, endereço, telefone, WhatsApp e e-mail.

export const site = {
  nome: "Instituto João de Barro",
  slogan: "Toda ação constrói!",
  cidade: "Rondonópolis – MT",
  descricao:
    "O Instituto João de Barro promove o bem-estar, a educação e o desenvolvimento social em Rondonópolis–MT, com projetos de esporte, cultura e inclusão.",
  cnpj: "",
  endereco: "",
  telefone: "",
  whatsapp: "", // só números com DDD, ex.: 66999999999
  email: "",
  instagram: "https://www.instagram.com/institutojoaodebarromt/",
  instagramUser: "@institutojoaodebarromt",
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
