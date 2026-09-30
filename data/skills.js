/* ============================================================================
   TECNOLOGIAS & CONHECIMENTOS
   ----------------------------------------------------------------------------
   Cada item pode ser só um texto ("Python") ou um objeto com nível:
     { name: "Java", level: "basico" }
   Níveis aceitos: "principal", "intermediario", "basico".
   Itens sem nível aparecem sem marcação. A legenda de níveis só aparece no
   site quando pelo menos um item tiver nível definido.
   ========================================================================== */

window.SKILL_LEVELS = {
  principal: "Conhecimento principal",
  intermediario: "Conhecimento intermediário",
  basico: "Conhecimento básico",
};

window.SKILLS = [
  {
    category: "Linguagens",
    icon: "code",
    items: ["Python", "PHP", "JavaScript", "TypeScript", "Dart", { name: "Java", level: "basico" }, "HTML", "CSS", "SQL"],
  },
  {
    category: "Frontend",
    icon: "layout",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Flutter", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Backend",
    icon: "server",
    items: ["Node.js", "Express", "NestJS", "Fastify", "PHP", "FastAPI", "APIs REST"],
  },
  {
    category: "Bancos de dados",
    icon: "database",
    items: ["MySQL", "SQLite", "PostgreSQL", "MongoDB", "Supabase", "Firebase"],
  },
  {
    category: "Cloud",
    icon: "cloud",
    items: ["Microsoft Azure", "Azure Functions", "AWS", "AWS Lambda", "API Gateway", "Google Cloud", "Vercel"],
  },
  {
    category: "DevOps / Infraestrutura",
    icon: "infra",
    items: ["Git", "GitHub", "Docker", "Tailscale"],
  },
  {
    category: "Inteligência Artificial",
    icon: "spark",
    items: [
      "ChatGPT", "Claude", "Claude Code", "Gemini", "GitHub Copilot", "Codex", "Aider",
      "APIs de IA", "Prompt Engineering", "IA generativa",
    ],
  },
  {
    category: "Games / 3D",
    icon: "cube",
    items: ["Godot", "Blender", "Modelagem 3D"],
  },
  {
    category: "Ferramentas",
    icon: "tool",
    items: ["Google Colab", "GitHub", "Visual Studio Code"],
  },
];
