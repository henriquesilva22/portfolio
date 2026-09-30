# Portfólio — Henrique Cardoso Silva

Portfólio pessoal 100% estático (HTML, CSS e JavaScript puro), feito para ser publicado no **GitHub Pages**. Não tem backend, build nem dependências: basta abrir o `index.html`.

## Estrutura

```text
portfolio/
├── index.html          # estrutura da página (boas-vindas, hero, quem sou, contato)
├── style.css           # visual (dark mode, azul/roxo)
├── script.js           # gera cards, filtros, detalhes, galeria e tecnologias
├── data/
│   ├── projects.js     # ← TODOS os projetos ficam aqui
│   └── skills.js       # ← tecnologias & conhecimentos
├── assets/
│   ├── icons/favicon.svg
│   ├── profile/        # henrique.jpg (Quem sou) e henrique-avatar.jpg (contato)
│   └── projects/
│       ├── dino-english/   cover.jpg, 01.jpg, 02.jpg...
│       ├── devcontrol/
│       ├── carinne/
│       ├── bloom-agenda/
│       ├── sorteia/
│       └── trocas/ ...     (pastas vazias aguardando screenshots)
└── .nojekyll
```

## Como adicionar um projeto

1. Crie a pasta `assets/projects/<id-do-projeto>/`.
2. Coloque as imagens: `cover.jpg` (capa do card, ideal 1200×750) e `01.jpg`, `02.jpg`, …
3. Em `data/projects.js`, copie o bloco **TEMPLATE** do fim do arquivo para dentro da lista e preencha.

Pronto — o card, os filtros (tipo e tecnologia) e a página de detalhes são gerados automaticamente.

Campos de cada projeto:

| Campo | Onde aparece |
|---|---|
| `name`, `shortDescription`, `cover`, `technologies` | Card |
| `categories` | Filtro por tipo: `web`, `mobile`, `ia`, `cloud`, `games`, `academico` |
| `description`, `goal`, `problem`, `audience` | "Sobre o projeto" (o que é, objetivo, problema, para quem) |
| `origin` | "Como surgiu" |
| `development` | "Desenvolvimento" (lista de parágrafos) |
| `features` | "Funcionalidades" |
| `learnings` | "O que aprendi com este projeto" |
| `images` | Galeria — `{ src, alt }`; o `alt` vira a legenda |
| `links.github`, `links.demo`, `links.docs` | Botões — só aparecem se preenchidos |
| `draft: true` | Esconde o projeto do público |

**Campo vazio não aparece no site** — nada de seções em branco ou links falsos.

### Modo revisão

Abra o site com `?rascunhos` no fim da URL (ex.: `index.html?rascunhos`). Nesse modo:

- os projetos com `draft: true` aparecem com o selo **RASCUNHO**;
- todo campo vazio aparece como uma caixa amarela **PREENCHER: …**.

Use para ver rapidamente o que falta em cada projeto.

### Link direto para um projeto

`https://<usuario>.github.io/<repositorio>/#projeto/dino-english` abre direto o detalhe do projeto.

## Tecnologias & níveis

Em `data/skills.js`, cada item pode ser um texto (`"Python"`) ou um objeto com nível:

```js
{ name: "Java", level: "basico" }   // "principal" | "intermediario" | "basico"
```

A legenda de níveis aparece sozinha quando houver itens `principal` ou `intermediario`.

## Imagens

- Prefira **JPG** com largura/altura máxima de ~1600 px (screenshots de celular: 720×1600). As imagens atuais já foram redimensionadas e comprimidas.
- A capa (`cover.jpg`) aparece no card em proporção 16:10.
- Os cards usam `loading="lazy"`; a galeria só carrega as imagens ao abrir o projeto.

## Rodar localmente

Abra `index.html` direto no navegador. Se preferir um servidor local:

```bash
npx serve .
# ou
python -m http.server
```

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `portfolio` ou `henriquesilva22.github.io`) e envie o **conteúdo** desta pasta para a raiz dele.
2. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em alguns minutos o site estará em `https://henriquesilva22.github.io/portfolio/` (ou `https://henriquesilva22.github.io/` se o repositório tiver esse nome).

Todos os caminhos são relativos (`assets/...`, `data/...`), então funcionam em qualquer subpasta.
