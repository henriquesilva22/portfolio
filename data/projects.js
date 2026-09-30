/* ============================================================================
   PROJETOS — fonte única de dados do portfólio
   ----------------------------------------------------------------------------
   Para adicionar um projeto:
     1. Crie a pasta  assets/projects/<id>/  com cover.jpg e 01.jpg, 02.jpg...
     2. Copie o bloco TEMPLATE no fim deste arquivo e preencha.
   O site gera automaticamente o card, os filtros e a página de detalhes.

   Regras:
   - Campo vazio ("" ou [])  → a seção NÃO aparece no site.
   - draft: true             → o projeto fica oculto do público.
   - Para revisar o que falta, abra o site com  ?rascunhos  no fim da URL
     (ex.: index.html?rascunhos). Rascunhos e campos vazios aparecem destacados.
   - A ordem da lista é a ordem de exibição no site.

   Categorias aceitas (filtro "tipo"): web, mobile, ia, cloud, games, academico

   Fontes usadas para os textos: screenshots enviadas + README, dependências e
   documentação de cada repositório no GitHub. Campos com TODO dependem de
   informação que só você tem (história do projeto e aprendizados).
   ========================================================================== */

window.PROJECTS = [
  /* ------------------------------------------------------------------------ */
  {
    id: "dino-english",
    name: "Dino English",
    draft: false,
    categories: ["mobile", "games"],
    cover: "assets/projects/dino-english/cover.jpg",

    shortDescription:
      "App para aprender inglês brincando com um companheiro dinossauro: estudo, provas, minijogos 2D, XP, níveis e evolução do pet — tudo offline.",

    description:
      "O Dino English é um aplicativo interativo para aprender inglês brincando com um companheiro dinossauro. Ele combina estudo de palavras, montagem de frases, provas de revisão e minijogos 2D com uma progressão inspirada em jogos: XP, níveis, sequência de dias de estudo e a evolução de um pet que nasce de um ovo.",
    goal:
      "Tornar o aprendizado de inglês mais prático e divertido por meio de sessões curtas, exercícios interativos, repetição, áudio e uma progressão inspirada em jogos.",
    problem:
      "Manter a constância no estudo de um idioma é difícil. O app transforma a prática em pequenas sessões com recompensas e foi pensado como offline-first, para funcionar mesmo sem conexão constante com a internet.",
    audience: "", // TODO: para quem foi desenvolvido?

    origin: "", // TODO: como surgiu o projeto? "O projeto surgiu a partir de..."

    development: [
      "Aplicação multiplataforma em Flutter e Dart, com arquitetura offline-first: palavras, progresso e dados da experiência ficam em um banco local (Drift/SQLite) inicializado a partir de um arquivo de seed em JSON.",
      "O código é organizado em camadas: telas (screens), componentes reutilizáveis (widgets), núcleo com banco, modelos, repositórios e serviços (core), jogos e fases (game), estado com Riverpod (providers) e um tema visual neon (theme).",
      "Os minijogos — aventura do pet, batalhas contra chefes e Word Slash — foram construídos com o motor 2D Flame, com sons via Flame Audio. A pronúncia de palavras e frases usa Flutter TTS, e os modelos 3D de ovos e dinossauros são exibidos com Model Viewer Plus.",
      "O layout é adaptado para retrato no aplicativo e para paisagem durante os jogos.",
    ],

    technologies: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite", "Flame", "Flutter TTS", "Model Viewer Plus"],

    features: [
      "Estudo de palavras com perguntas de múltipla escolha e reprodução da pronúncia",
      "Modo Imersão com exemplos, traduções e áudio das palavras",
      "Construtor de frases com montagem de palavras e preenchimento de lacunas",
      "Provas: modo de revisão separado do fluxo de estudo",
      "Word Slash: minijogo em que o jogador desliza para cortar palavras",
      "Aventura do pet em jogo 2D com coleta de palavras, pontuação e vidas",
      "Batalhas contra chefes com barra de vida e projéteis",
      "Sistema de XP, níveis, sequência de estudos (streak) e progresso de domínio das palavras",
      "Seleção de pets, ovos e evolução do dinossauro em 3D",
      "Efeitos sonoros e feedback visual das respostas",
      "Funciona offline, com banco de dados local",
    ],

    learnings: "", // TODO: o que você aprendeu com este projeto?

    images: [
      { src: "assets/projects/dino-english/01.jpg", alt: "Tela inicial com o mascote Dino e os modos de estudo" },
      { src: "assets/projects/dino-english/02.jpg", alt: "Tela de escolha do pet para o modo aventura" },
      { src: "assets/projects/dino-english/03.jpg", alt: "Modo aventura: jogo de plataforma com palavras" },
      { src: "assets/projects/dino-english/04.jpg", alt: "Batalha contra o chefe com barra de vida" },
      { src: "assets/projects/dino-english/05.jpg", alt: "Batalha contra o chefe" },
      { src: "assets/projects/dino-english/06.jpg", alt: "Tela Estudar com a opção Modo Imersão" },
      { src: "assets/projects/dino-english/07.jpg", alt: "Quiz: qual o significado de white" },
      { src: "assets/projects/dino-english/08.jpg", alt: "Quiz respondido corretamente, +10 XP" },
      { src: "assets/projects/dino-english/09.jpg", alt: "Minijogo de associação de palavras em bolhas" },
      { src: "assets/projects/dino-english/10.jpg", alt: "Montar Frase: traduzir 'Ela tem uma bolsa rosa'" },
      { src: "assets/projects/dino-english/11.jpg", alt: "Montar Frase a partir de uma situação" },
      { src: "assets/projects/dino-english/12.jpg", alt: "Perfil com nível, streak e palavras dominadas" },
    ],

    links: {
      github: "https://github.com/henriquesilva22/Dino-english",
      demo: "",
      docs: "",
    },
  },

  /* ------------------------------------------------------------------------ */
  {
    id: "devcontrol",
    name: "DevControl",
    draft: false,
    categories: ["mobile", "ia"],
    cover: "assets/projects/devcontrol/cover.jpg",

    shortDescription:
      "Central de desenvolvimento remoto: app mobile + Desktop Agent + relay para controlar projetos, terminais e agentes de IA do PC pelo celular.",

    description:
      "O DevControl é uma central de desenvolvimento remoto. O celular observa e controla o que acontece no PC; o PC executa; um relay liga os dois e guarda o histórico. Pelo app é possível cadastrar projetos, ver o estado do repositório, abrir o projeto no VS Code, executar comandos e conduzir sessões com agentes de IA de programação — como o Claude Code — com aprovação de comandos por nível de risco.",
    goal: "", // TODO
    problem: "", // TODO
    audience: "", // TODO

    origin: "", // TODO: como surgiu o projeto?

    development: [
      "Monorepo com pnpm workspaces e Turborepo, reunindo três aplicações — app mobile, backend/relay e Desktop Agent — e pacotes compartilhados de protocolo, banco de dados e segurança.",
      "App mobile em Flutter/Dart (Android primeiro), organizado em camadas, com Riverpod, go_router, leitura de QR Code pela câmera, terminal remoto com xterm, armazenamento seguro de credenciais e cache local em SQLite.",
      "Relay em Node.js/TypeScript com Fastify e WebSocket, PostgreSQL com Drizzle ORM e um event store: cada evento recebe uma sequência por stream, é persistido e pode ser reenviado (replay por cursor) quando o celular reconecta.",
      "Desktop Agent em Node.js/TypeScript que roda na sessão do usuário no Windows, abre terminais com node-pty (ConPTY), usa o Git via CLI, abre o VS Code e integra agentes de IA. Ele só abre conexões de saída para o relay — nada conecta diretamente no PC.",
      "Protocolo definido uma única vez em TypeBox, convertido em JSON Schema e gerado para TypeScript e Dart, com validação em runtime.",
      "Segurança: autenticação sem senha com pareamento por QR Code e confirmação de código, JWT EdDSA com refresh token rotativo, rate limiting, auditoria e classificação de risco dos comandos no próprio agente — comandos HIGH/CRITICAL ficam bloqueados.",
      "Para custo zero, o relay roda no próprio PC e o celular o acessa pela rede privada do Tailscale. Decisões técnicas são registradas em formato ADR e o backend tem testes unitários e de integração com Vitest.",
    ],

    technologies: [
      "Flutter", "Dart", "Riverpod", "Node.js", "TypeScript", "Fastify", "WebSocket",
      "PostgreSQL", "Drizzle ORM", "SQLite", "pnpm", "Turborepo", "Vitest", "Tailscale", "Claude Code",
    ],

    features: [
      "Pareamento com o PC via QR Code exibido no terminal, com confirmação de código nos dois dispositivos",
      "Pareamento alternativo por endereço do relay e código de 8 caracteres",
      "Cadastro de projetos com verificação da pasta e da branch Git no computador",
      "Painel do projeto com estado do computador, branch, pasta e VS Code",
      "Ações remotas: abrir projeto no VS Code, executar comandos e abrir terminal",
      "Sessões de IA com escolha do agente (Claude Code, Codex, Gemini CLI, Aider), detectando quais estão instalados no PC",
      "Modos de permissão: pedir permissão, aceitar edições ou só planejar",
      "Aprovação automática por sessão (desligada, até LOW ou até MEDIUM); HIGH/CRITICAL nunca são liberados automaticamente",
      "Lista de comandos permitidos e comandos de startup por projeto",
      "Chat com o agente de IA pelo celular",
      "Listas de sessões em andamento e de computadores online",
      "Configurações de tema, status da conexão e desparear dispositivo",
    ],

    learnings: "", // TODO

    images: [
      { src: "assets/projects/devcontrol/01.jpg", alt: "Terminal do PC exibindo o QR Code de pareamento" },
      { src: "assets/projects/devcontrol/02.jpg", alt: "App: passos para conectar o celular ao PC" },
      { src: "assets/projects/devcontrol/03.jpg", alt: "App: pareamento por código" },
      { src: "assets/projects/devcontrol/04.jpg", alt: "Confirmação do código de pareamento" },
      { src: "assets/projects/devcontrol/05.jpg", alt: "Cadastro de novo projeto" },
      { src: "assets/projects/devcontrol/06.jpg", alt: "Painel do projeto com estado e ações" },
      { src: "assets/projects/devcontrol/07.jpg", alt: "Painel do projeto com aviso sobre terminal interativo" },
      { src: "assets/projects/devcontrol/08.jpg", alt: "Nova sessão de IA: agentes e permissões" },
      { src: "assets/projects/devcontrol/09.jpg", alt: "Chat com o agente de IA" },
      { src: "assets/projects/devcontrol/10.jpg", alt: "Lista de agentes em andamento" },
      { src: "assets/projects/devcontrol/11.jpg", alt: "Lista de computadores online" },
      { src: "assets/projects/devcontrol/12.jpg", alt: "Configurações do app" },
    ],

    // Repositório privado — por isso sem link público.
    links: { github: "", demo: "", docs: "" },
  },

  /* ------------------------------------------------------------------------ */
  {
    id: "carinne",
    name: "Carinne AI · LifeOS",
    draft: false,
    categories: ["web", "ia"],
    cover: "assets/projects/carinne/cover.jpg",

    shortDescription:
      "Assistente pessoal que reúne finanças, treinos, estudos, agenda e prioridades em um só painel, com a assistente de IA Carinne.",

    description:
      "O LifeOS Assistant é um painel pessoal que organiza diferentes áreas da rotina — carteira, academia, estudos, agenda, prioridades e uma revisão do dia anterior. Ele é acompanhado pela Carinne, uma assistente pessoal que resume a semana, faz perguntas de revisão e ajuda em decisões como \"posso comprar isto?\", sempre respondendo com foco prático e um próximo passo claro.",
    goal: "", // TODO
    problem: "", // TODO
    audience: "", // TODO

    origin: "", // TODO

    development: [
      "Frontend em Next.js 14 com React e TypeScript, estilizado com Tailwind CSS, animações com Framer Motion, ícones Lucide e estado global com Zustand. O app também foi preparado para Android com Capacitor.",
      "Backend em Python com FastAPI, SQLAlchemy e Alembic sobre PostgreSQL, organizado em routers por domínio: autenticação, carteira, treinos, eventos, espelho, post-its, voz, \"cérebro\" (estudos) e Carinne.",
      "A Carinne usa a API da OpenAI para gerar sugestões com base no contexto do usuário (bateria pessoal, saldo livre, foco dos estudos) e possui respostas locais de fallback quando a chave de API não está configurada.",
      "Tarefas agendadas com APScheduler e notificações Web Push; o projeto roda com Docker Compose (frontend e backend) e o frontend está publicado na Vercel.",
    ],

    technologies: [
      "Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Capacitor",
      "Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "OpenAI API", "Docker", "Vercel",
    ],

    features: [
      "Dashboard com saldo total, bateria (energia do dia), prioridades ativas e próximo evento",
      "Carteira: saldo disponível, limite do dia, próximas contas, categorias e metas",
      "Registro rápido de entrada, gasto, conta e meta",
      "\"Posso comprar?\": analisa uma compra considerando contas pendentes e o saldo projetado",
      "Resumo da Carinne com alertas sobre os gastos da semana",
      "Academia: treino do dia e ficha de treino semanal editável",
      "Estudos: conhecimentos por tópico com pergunta, resposta, revisão e estatísticas",
      "Carinne Pergunta: perguntas de revisão que aparecem durante o uso",
      "Agenda com Estúdio de Eventos: tipo, alarme, dias de antecipação e entrada por voz",
      "Espelho de Ontem: página isolada para revisar o dia anterior",
      "Prioridades com post-its (tarefas vivas) por nível e cor",
    ],

    learnings: "", // TODO

    images: [
      { src: "assets/projects/carinne/01.jpg", alt: "Tela de entrada: Olá, eu sou a Carinne" },
      { src: "assets/projects/carinne/02.jpg", alt: "Dashboard com navegação rápida" },
      { src: "assets/projects/carinne/03.jpg", alt: "Carteira com saldo, contas, metas e Posso comprar?" },
      { src: "assets/projects/carinne/04.jpg", alt: "Academia: treino do dia e ficha semanal" },
      { src: "assets/projects/carinne/05.jpg", alt: "Edição da ficha de treino" },
      { src: "assets/projects/carinne/06.jpg", alt: "Estudos: cadastro de conhecimentos" },
      { src: "assets/projects/carinne/07.jpg", alt: "Agenda com eventos e cápsula do tempo" },
      { src: "assets/projects/carinne/08.jpg", alt: "Estúdio de Eventos e Carinne Pergunta" },
      { src: "assets/projects/carinne/09.jpg", alt: "Espelho de Ontem" },
      { src: "assets/projects/carinne/10.jpg", alt: "Prioridades com post-its" },
    ],

    links: {
      github: "https://github.com/henriquesilva22/Casist",
      demo: "https://casist.vercel.app",
      docs: "",
    },
  },

  /* ------------------------------------------------------------------------ */
  {
    id: "trocas",
    name: "Troca Segura",
    draft: false,
    categories: ["web"],
    cover: "assets/projects/trocas/cover.jpg",

    shortDescription:
      "Marketplace de eletrônicos entre pessoas com intermediação física: o produto passa por inspeção em um hub antes de chegar ao comprador.",

    description:
      "O Troca Segura é um MVP de marketplace de eletrônicos entre pessoas físicas, pensado para a região da Baixa Mogiana, com intermediação física (\"Inspection-as-a-Service\") e sem custódia financeira. O vendedor deixa o produto em um hub, um técnico faz a inspeção com checklist, laudo e lacre, e só depois o pagamento é feito e o comprador retira o produto com um PIN.",
    goal: "", // TODO
    problem:
      "Compras e vendas entre pessoas na internet carregam risco de golpe. A inspeção física do produto antes da entrega dá segurança às duas partes.",
    audience: "", // TODO

    origin: "", // TODO

    development: [
      "Backend em NestJS com TypeScript seguindo DDD: cada módulo de domínio é dividido em domain, application, infrastructure e interface. Módulos de usuários, negociação, pagamentos, taxa da plataforma, inspeção, hubs e administração.",
      "O fluxo da negociação é controlado por uma máquina de estados com um mapa fechado de transições válidas — qualquer tentativa de pular etapas (por exemplo, confirmar pagamento antes da inspeção) é rejeitada.",
      "PostgreSQL com Prisma (hospedado no Supabase), Supabase Storage para fotos e autenticação JWT com papéis (usuário, técnico, admin).",
      "Pagamentos por PIX manual, sem gateway: quem paga anexa o comprovante e quem recebe confirma. A taxa da plataforma é confirmada por um administrador.",
      "Frontend em Next.js com TypeScript e Tailwind (PWA), publicado na Vercel; mapas dos hubs com Leaflet e OpenStreetMap.",
    ],

    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "NestJS", "PostgreSQL", "Prisma", "Supabase", "Leaflet", "Vercel"],

    features: [
      "Catálogo de produtos e propostas entre comprador e vendedor",
      "Negociação guiada por máquina de estados, do pagamento da taxa até a retirada",
      "Inspeção no hub com checklist obrigatório, laudo, lacre e localização na prateleira",
      "Pagamento por PIX com envio e confirmação de comprovante",
      "PIN de 6 dígitos para retirada do produto no hub",
      "Mapa dos centros de inspeção",
      "Painel administrativo: disputas, usuários, pagamentos, taxas e hubs",
    ],

    learnings: "", // TODO

    images: [
      { src: "assets/projects/trocas/01.jpg", alt: "Página inicial: busca de produtos, categorias, como funciona e garantias de segurança" },
      // TODO: adicionar mais screenshots (negociação, inspeção, painel admin...)
    ],

    links: {
      github: "https://github.com/henriquesilva22/Trocas",
      demo: "https://trocas-dun.vercel.app",
      docs: "",
    },
  },

  /* ------------------------------------------------------------------------ */
  {
    id: "bloom-agenda",
    name: "Bloom Agenda",
    draft: false,
    categories: ["web"],
    cover: "assets/projects/bloom-agenda/cover.jpg",

    shortDescription:
      "Agenda de tarefas com prioridades, calendário, estatísticas e um assistente que sugere horários — frontend estático + API REST.",

    description:
      "O Bloom Agenda é uma agenda de tarefas com visão de hoje, amanhã e próximos dias, filtros, estatísticas de conclusão e calendário. Um assistente integrado aprende com as tarefas já cadastradas para sugerir horários e compromissos recorrentes: basta digitar um título e ele tenta completar o resto.",
    goal: "", // TODO
    problem: "", // TODO
    audience: "", // TODO

    origin: "", // TODO

    development: [
      "Frontend estático em HTML, CSS e JavaScript, instalável como PWA (manifest e service worker).",
      "API REST em Node.js com Express, organizada em rotas, controllers, services, models e middlewares, com banco PostgreSQL.",
      "Autenticação com JWT e senhas com hash bcrypt, validação das requisições com express-validator e recuperação de senha por e-mail com Nodemailer.",
      "Frontend e API publicados juntos em um único deploy na Vercel.",
    ],

    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "PostgreSQL", "JWT", "PWA", "Vercel"],

    features: [
      "Cadastro, login e recuperação de senha por e-mail",
      "Tarefas agrupadas em Hoje, Amanhã e Próximos dias",
      "Prioridade, categoria e indicação de tarefa atrasada",
      "Busca e filtros: todas, hoje, pendentes, concluídas e alta prioridade",
      "Criação e edição de tarefas com título, descrição, data, horário, prioridade e categoria",
      "Dashboard com total, concluídas, pendentes e percentual de conclusão",
      "Calendário mensal",
      "Assistente que sugere horários e recorrências a partir das tarefas cadastradas",
    ],

    learnings: "", // TODO

    images: [
      { src: "assets/projects/bloom-agenda/01.jpg", alt: "Visão geral com tarefas, estatísticas, calendário e assistente" },
      { src: "assets/projects/bloom-agenda/02.jpg", alt: "Modal de nova tarefa" },
      { src: "assets/projects/bloom-agenda/03.jpg", alt: "Modal de edição de tarefa" },
    ],

    links: {
      github: "https://github.com/henriquesilva22/Bloom-Agenda-Novo",
      demo: "https://bloom-agenda-novo.vercel.app",
      docs: "",
    },
  },

  /* ------------------------------------------------------------------------ */
  {
    id: "sorteia",
    name: "SorteIA",
    draft: false,
    categories: ["web", "mobile", "ia"],
    cover: "assets/projects/sorteia/cover.jpg",

    shortDescription:
      "PWA de previsão estatística para loterias com um motor que aprende com os erros, ajustando seus pesos a cada conferência — com backtesting.",

    description:
      "O SorteIA é um PWA (mobile + web) de previsão estatística para loterias brasileiras. Ele gera jogos, confere com o resultado real e aprende com os erros ajustando os próprios pesos. O app deixa claro que loteria é 100% aleatória: o SorteIA usa estatística e aprendizado para montar estratégias, sem garantia de prêmio.",
    goal: "", // TODO
    problem: "", // TODO
    audience: "", // TODO

    origin: "", // TODO

    development: [
      "Next.js 14 (App Router) com TypeScript e Tailwind CSS, instalável como PWA. Supabase fornece Postgres, autenticação por magic link e Row Level Security.",
      "Motor estatístico próprio: cada número recebe um score que combina sinais normalizados (frequência, atraso, tendência, força em pares e trios), e a montagem do jogo considera distribuição por faixa, soma próxima da média histórica e cobertura entre jogos.",
      "Aprendizado pós-sorteio: ao conferir um jogo, o sistema diagnostica o erro, gera um delta de pesos e aplica com taxa de aprendizado e limites, e um gerador local escreve a explicação em linguagem natural — sem API externa.",
      "Backtesting walk-forward com PRNG determinístico para resultados reproduzíveis, cálculo de probabilidade exata (binomial/hipergeométrica) e testes do motor com Vitest.",
      "Resultados buscados na API pública da Caixa, com um Cron Job na Vercel para atualização diária; gráficos de pesos com Recharts.",
    ],

    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Recharts", "Vitest", "PWA", "Vercel"],

    features: [
      "Suporte a Mega-Sena, Lotofácil, Lotomania, Quina, Dupla Sena e Timemania, com a chance matemática de cada uma",
      "Geração de jogos por objetivo (prêmio principal ou acertos parciais)",
      "Estratégias: conservador, equilibrado, agressivo e IA adaptativa",
      "Montagem manual de jogo com seleção de dezenas",
      "Pesos aprendidos por loteria exibidos em gráfico radar",
      "Conferência com diagnóstico do erro e ajuste automático dos pesos",
      "Backtesting walk-forward no histórico real, com ranking de estratégias",
      "Atualização automática dos resultados",
      "Aviso de jogo responsável em destaque",
    ],

    learnings: "", // TODO

    images: [
      { src: "assets/projects/sorteia/01.jpg", alt: "Tela inicial com as loterias disponíveis" },
      { src: "assets/projects/sorteia/02.jpg", alt: "Gerar previsões: objetivo, estratégia e montagem de jogo" },
      { src: "assets/projects/sorteia/03.jpg", alt: "Configurações da IA com gráfico radar dos pesos" },
      { src: "assets/projects/sorteia/04.jpg", alt: "Backtesting da estratégia" },
    ],

    links: {
      github: "https://github.com/henriquesilva22/joker",
      demo: "https://joker-iota-neon.vercel.app",
      docs: "",
    },
  },

  /* ------------------------------------------------------------------------
     RASCUNHOS — ocultos do público. Preencha, adicione imagens e troque
     draft para false. Informações iniciais tiradas do README de cada repo.
     ------------------------------------------------------------------------ */
  {
    id: "criamigos",
    name: "Criamigos",
    draft: true,
    categories: ["games", "ia"],
    cover: "",
    shortDescription:
      "Jogo educativo de pet virtual com IA, em que crianças cuidam de criaturas que falam, ouvem e evoluem.",
    description:
      "Um jogo educativo em que crianças cuidam de criaturas virtuais que falam, ouvem e evoluem por meio de inteligência artificial, desenvolvido em Unity com foco em segurança infantil.",
    goal: "",
    problem: "",
    audience: "Crianças.",
    origin: "",
    development: [],
    technologies: ["Unity", "C#", "OpenAI API"],
    features: [
      "Necessidades de fome, energia e felicidade que diminuem com o tempo",
      "Interação por voz: fala → IA → voz",
      "Animações que reagem ao estado emocional da criatura",
      "Respostas da IA filtradas e adequadas à idade",
    ],
    learnings: "",
    images: [],
    links: { github: "https://github.com/henriquesilva22/Criamigos", demo: "", docs: "" },
  },
  {
    id: "sistema-academico-fatec",
    name: "Sistema Acadêmico FATEC",
    draft: true,
    categories: ["web", "academico"],
    cover: "",
    shortDescription:
      "Sistema de gestão acadêmica para a FATEC: alunos, professores, disciplinas, turmas e notas.",
    description:
      "Sistema de gerenciamento acadêmico desenvolvido para a FATEC, para facilitar o controle de alunos, professores, disciplinas, turmas, notas e relatórios.",
    goal: "",
    problem: "",
    audience: "",
    origin: "",
    development: [],
    technologies: ["Next.js", "TypeScript", "Node.js"], // TODO: confirmar
    features: [],
    learnings: "",
    images: [],
    links: { github: "https://github.com/henriquesilva22/Sistema-Academico-FATEC", demo: "", docs: "" },
  },
  {
    id: "estoque-simples",
    name: "Estoque Simples",
    draft: true,
    categories: ["web"],
    cover: "",
    shortDescription:
      "Gerenciamento de estoque a partir do XML de notas fiscais (NF-e), com vendas, alertas e relatórios.",
    description: "",
    goal: "",
    problem: "",
    audience: "",
    origin: "",
    development: [],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Drizzle ORM", "PostgreSQL", "Recharts"],
    features: [
      "Importação automática de produtos via XML NF-e",
      "Controle de estoque com códigos de barras e internos",
      "Registro de vendas com atualização automática do estoque",
      "Alertas de estoque baixo",
      "Dashboard com gráficos e relatórios; exportação em CSV",
    ],
    learnings: "",
    images: [],
    links: { github: "https://github.com/henriquesilva22/caixinha", demo: "", docs: "" },
  },
  {
    id: "aws",
    name: "Projeto com AWS", // TODO: nome real
    draft: true,
    categories: ["cloud"],
    cover: "",
    shortDescription: "",
    description: "",
    goal: "",
    problem: "",
    audience: "",
    origin: "",
    development: [],
    technologies: [], // ex.: "AWS Lambda", "API Gateway" — só o que foi usado de fato
    features: [],
    learnings: "",
    images: [],
    links: { github: "", demo: "", docs: "" },
  },
  {
    id: "azure",
    name: "Projeto com Azure", // TODO: nome real
    draft: true,
    categories: ["cloud"],
    cover: "",
    shortDescription: "",
    description: "",
    goal: "",
    problem: "",
    audience: "",
    origin: "",
    development: [],
    technologies: [],
    features: [],
    learnings: "",
    images: [],
    links: { github: "", demo: "", docs: "" },
  },
];

/* ============================================================================
   TEMPLATE — copie, cole dentro da lista acima e preencha
   ============================================================================
  {
    id: "meu-projeto",                 // igual ao nome da pasta em assets/projects/
    name: "Meu Projeto",
    draft: false,
    categories: ["web"],               // web | mobile | ia | cloud | games | academico
    cover: "assets/projects/meu-projeto/cover.jpg",
    shortDescription: "Uma ou duas frases para o card.",
    description: "O que é o projeto.",
    goal: "Qual é o objetivo.",
    problem: "Qual problema resolve.",
    audience: "Para quem foi desenvolvido.",
    origin: "O projeto surgiu a partir da necessidade de...",
    development: [
      "Parágrafo sobre arquitetura / frontend / backend.",
      "Parágrafo sobre desafios e soluções.",
    ],
    technologies: ["JavaScript", "HTML", "CSS"],
    features: ["Funcionalidade 1", "Funcionalidade 2"],
    learnings: "O que aprendi com este projeto.",
    images: [
      { src: "assets/projects/meu-projeto/01.jpg", alt: "Descrição da tela" },
    ],
    links: {
      github: "https://github.com/henriquesilva22/meu-projeto",
      demo: "",
      docs: "",
    },
  },
*/
