"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigurado, BUCKET } from "@/lib/supabase";
import { slugify, type Noticia } from "@/lib/noticias";

type Form = {
  id?: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  capa_url: string | null;
  galeria: string[];
  publicado: boolean;
  publicado_em: string; // valor do campo datetime-local
};

const agoraLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};
const isoParaLocal = (iso: string) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};
const vazio = (): Form => ({ titulo: "", resumo: "", conteudo: "", capa_url: null, galeria: [], publicado: true, publicado_em: agoraLocal() });

function situacao(n: Noticia) {
  if (!n.publicado) return "Rascunho";
  if (new Date(n.publicado_em) > new Date()) return "Agendada";
  return "Publicada";
}

export default function Painel() {
  const sb = getSupabase();
  const [sessao, setSessao] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [lista, setLista] = useState<Noticia[]>([]);
  const [form, setForm] = useState<Form | null>(null);
  const [msg, setMsg] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!sb) { setCarregando(false); return; }
    sb.auth.getSession().then(({ data }) => { setSessao(data.session); setCarregando(false); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSessao(s));
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  const carregar = useCallback(async () => {
    if (!sb) return;
    const { data, error } = await sb.from("noticias").select("*").order("publicado_em", { ascending: false });
    if (error) setMsg({ tipo: "erro", texto: "Não foi possível carregar as notícias: " + error.message });
    else setLista((data ?? []) as Noticia[]);
  }, [sb]);

  useEffect(() => { if (sessao) carregar(); }, [sessao, carregar]);

  if (!supabaseConfigurado) {
    return (
      <div className="admin">
        <h1>Painel de notícias</h1>
        <p className="aviso" style={{ marginTop: 20 }}>
          O banco de dados ainda não foi conectado. Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local (veja o README).
        </p>
      </div>
    );
  }
  if (carregando) return <div className="admin"><p>Carregando…</p></div>;
  if (!sessao) return <Login />;

  async function enviarFoto(arquivo: File) {
    const nome = `${Date.now()}-${slugify(arquivo.name.replace(/\.[^.]+$/, ""))}.${arquivo.name.split(".").pop()?.toLowerCase()}`;
    const { error } = await sb!.storage.from(BUCKET).upload(nome, arquivo, { cacheControl: "31536000", upsert: false });
    if (error) throw new Error(error.message);
    return sb!.storage.from(BUCKET).getPublicUrl(nome).data.publicUrl;
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSalvando(true); setMsg(null);
    const dados = {
      titulo: form.titulo.trim(),
      resumo: form.resumo.trim(),
      conteudo: form.conteudo.trim(),
      capa_url: form.capa_url,
      galeria: form.galeria,
      publicado: form.publicado,
      publicado_em: new Date(form.publicado_em).toISOString(),
      atualizado_em: new Date().toISOString(),
    };
    let error;
    if (form.id) {
      ({ error } = await sb!.from("noticias").update(dados).eq("id", form.id));
    } else {
      let slug = slugify(dados.titulo);
      ({ error } = await sb!.from("noticias").insert({ ...dados, slug }));
      if (error?.code === "23505") {
        slug = `${slug}-${Date.now().toString(36)}`;
        ({ error } = await sb!.from("noticias").insert({ ...dados, slug }));
      }
    }
    setSalvando(false);
    if (error) { setMsg({ tipo: "erro", texto: "Não foi possível salvar: " + error.message }); return; }
    setMsg({ tipo: "ok", texto: "Notícia salva. Ela aparece no site em até 1 minuto." });
    setForm(null);
    carregar();
  }

  async function excluir(n: Noticia) {
    if (!window.confirm(`Excluir a notícia "${n.titulo}"? Não dá para desfazer.`)) return;
    const { error } = await sb!.from("noticias").delete().eq("id", n.id);
    if (error) setMsg({ tipo: "erro", texto: "Não foi possível excluir: " + error.message });
    else { setMsg({ tipo: "ok", texto: "Notícia excluída." }); carregar(); }
  }

  return (
    <div className="admin">
      <div className="linha-acoes" style={{ justifyContent: "space-between" }}>
        <h1>Painel de notícias</h1>
        <div className="linha-acoes">
          <a href="/noticias" target="_blank" className="btn contorno">Ver site</a>
          <button className="btn contorno" onClick={() => sb!.auth.signOut()}>Sair</button>
        </div>
      </div>

      {msg && <p className={`aviso${msg.tipo === "erro" ? " erro" : ""}`} style={{ marginTop: 20 }}>{msg.texto}</p>}

      {form ? (
        <form className="card campos" style={{ marginTop: 24 }} onSubmit={salvar}>
          <h2 style={{ fontFamily: "var(--f-titulo)", fontSize: 20 }}>{form.id ? "Editar notícia" : "Nova notícia"}</h2>
          <label>Título
            <input id="titulo" type="text" required maxLength={140} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          </label>
          <label>Resumo (aparece na lista de notícias)
            <input id="resumo" type="text" maxLength={220} value={form.resumo} onChange={(e) => setForm({ ...form, resumo: e.target.value })} />
          </label>
          <label>Texto (deixe uma linha em branco entre os parágrafos)
            <textarea id="conteudo" required value={form.conteudo} onChange={(e) => setForm({ ...form, conteudo: e.target.value })} />
          </label>

          <div className="campos">
            <span style={{ fontSize: 14, fontWeight: 600 }}>Imagem de capa</span>
            {form.capa_url && (
              <div className="miniaturas"><figure><img src={form.capa_url} alt="Capa" /><button type="button" aria-label="Remover capa" onClick={() => setForm({ ...form, capa_url: null })}>×</button></figure></div>
            )}
            <input id="capa" type="file" accept="image/*" onChange={async (e) => {
              const f = e.target.files?.[0]; if (!f) return;
              try { const url = await enviarFoto(f); setForm((s) => s && { ...s, capa_url: url }); }
              catch (err) { setMsg({ tipo: "erro", texto: "Falha ao enviar a imagem: " + (err as Error).message }); }
              e.target.value = "";
            }} />
          </div>

          <div className="campos">
            <span style={{ fontSize: 14, fontWeight: 600 }}>Galeria de fotos</span>
            {form.galeria.length > 0 && (
              <div className="miniaturas">
                {form.galeria.map((src) => (
                  <figure key={src}><img src={src} alt="" /><button type="button" aria-label="Remover foto" onClick={() => setForm({ ...form, galeria: form.galeria.filter((g) => g !== src) })}>×</button></figure>
                ))}
              </div>
            )}
            <input id="galeria" type="file" accept="image/*" multiple onChange={async (e) => {
              const arquivos = Array.from(e.target.files ?? []); if (!arquivos.length) return;
              try {
                const urls: string[] = [];
                for (const f of arquivos) urls.push(await enviarFoto(f));
                setForm((s) => s && { ...s, galeria: [...s.galeria, ...urls] });
              } catch (err) { setMsg({ tipo: "erro", texto: "Falha ao enviar as fotos: " + (err as Error).message }); }
              e.target.value = "";
            }} />
          </div>

          <label>Data de publicação (uma data futura agenda a notícia)
            <input id="publicado_em" type="datetime-local" required value={form.publicado_em} onChange={(e) => setForm({ ...form, publicado_em: e.target.value })} />
          </label>
          <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 500 }}>
            <input id="publicado" type="checkbox" checked={form.publicado} onChange={(e) => setForm({ ...form, publicado: e.target.checked })} />
            Publicar no site (desmarque para salvar como rascunho)
          </label>

          <div className="linha-acoes">
            <button className="btn" type="submit" disabled={salvando}>{salvando ? "Salvando…" : "Salvar notícia"}</button>
            <button className="btn contorno" type="button" onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </form>
      ) : (
        <>
          <div className="linha-acoes" style={{ marginTop: 28 }}>
            <button className="btn" onClick={() => { setMsg(null); setForm(vazio()); }}>+ Nova notícia</button>
          </div>
          <div className="lista" style={{ marginTop: 20 }}>
            {lista.length === 0 && <p className="meta">Nenhuma notícia ainda. Clique em "Nova notícia" para começar.</p>}
            {lista.map((n) => (
              <div className="item" key={n.id}>
                <div>
                  <strong>{n.titulo}</strong>
                  <div className="meta">{situacao(n)} · {new Date(n.publicado_em).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</div>
                </div>
                <div className="linha-acoes">
                  <button className="btn contorno" onClick={() => { setMsg(null); setForm({ id: n.id, titulo: n.titulo, resumo: n.resumo, conteudo: n.conteudo, capa_url: n.capa_url, galeria: n.galeria ?? [], publicado: n.publicado, publicado_em: isoParaLocal(n.publicado_em) }); }}>Editar</button>
                  <button className="btn perigo" onClick={() => excluir(n)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Login() {
  const sb = getSupabase()!;
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true); setErro("");
    const { error } = await sb.auth.signInWithPassword({ email, password: senha });
    setEnviando(false);
    if (error) setErro("E-mail ou senha incorretos. Confira e tente de novo.");
  }

  return (
    <div className="admin" style={{ maxWidth: 440, paddingTop: "12vh" }}>
      <img src="/img/logo-escuro.png" alt="Instituto João de Barro" style={{ height: 56, width: "auto" }} />
      <form className="card campos" style={{ marginTop: 28 }} onSubmit={entrar}>
        <h1 style={{ fontSize: 22 }}>Painel de notícias</h1>
        <label>E-mail<input id="email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Senha<input id="senha" type="password" required autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} /></label>
        {erro && <p className="aviso erro">{erro}</p>}
        <button className="btn" type="submit" disabled={enviando}>{enviando ? "Entrando…" : "Entrar"}</button>
      </form>
    </div>
  );
}
