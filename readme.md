# S.H.I.E.L.D. — Monitoramento de Desastres por Satélite

Uma plataforma descentralizada de coordenação climática desenhada para unificar o fluxo de dados orbitais à logística civil, contornando falhas de conexão convencionais no mapeamento de riscos e otimizando a resposta a desastres naturais.

---

## 🚀 Funcionalidades

- **Monitoramento Ativo (Telemetria Espacial)**: Mapeamento dinâmico de lâminas hídricas superficiais e riscos de deslizamento no território brasileiro através de telemetria simulada baseada em satélites LEO (Low Earth Orbit).
- **Mapa Vetorial Interativo**: Mapa interativo do Brasil em formato SVG que permite visualização em tempo real de focos de incidentes, com suporte para zoom (scroll/pinch) e arrasto (pan).
- **Algoritmo de Roteamento & Triagem**: Sistema de priorização automática de alertas SOS com base em criticidade de vulneráveis e tipo de ocorrência (Urgência = População * Risco).
- **Simulação de Satélite em 3D (Canvas)**: Elemento gráfico reativo que simula visualmente a órbita de satélites e sua atração gravitacional sob o cursor.

---

## 🛠️ Tecnologias Utilizadas

- **Estruturação**: [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) estruturado de forma semântica.
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (via CDN) para estruturação utilitária rápida e responsiva + [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) Vanilla para efeitos de micro-animações, spotlights e customização de scroll.
- **Lógica e Dinâmica**: [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) Vanilla para manipulação do DOM, interações complexas de mapas, e a física e renderização no elemento `<canvas>`.

---

## 📁 Estrutura de Arquivos

```text
Shield Project/
├── assets/             # Recursos de mídia e imagens estáticas
├── css/
│   └── style.css       # Estilizações customizadas e efeitos visuais
├── js/
│   └── script.js       # Comportamento interativo e simulação física
├── .gitignore          # Arquivos e diretórios ignorados pelo Git
├── index.html          # Página principal e estrutura HTML
└── readme.md           # Documentação do projeto (este arquivo)
```

---

## 💻 Como Executar o Projeto

1. Clone este repositório para a sua máquina local:
   ```bash
   git clone https://github.com/Mantovani-a/ShieldProject.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd "Shield Project"
   ```

3. Abra o arquivo `index.html` diretamente em seu navegador web de preferência ou utilize uma extensão de servidor local como a *Live Server* no VS Code para ter recarregamento automático.

---

## 🗺️ Roadmap de Evolução

- [ ] **Fase 2**: Integração via API aberta com o Space Charter e CEMADEN para processamento de radar SAR em tempo real.
- [ ] **Fase 3**: Criação de backend seguro e canais criptografados para a Defesa Civil gerenciar o status de atuação das equipes de campo de forma síncrona.
- [ ] **Fase 4**: Mecanismo estatístico preditivo para identificar bacias com risco de transbordo com base em volume de chuva histórica.
- [ ] **Fase 5**: Criação de equipamentos de campo portáteis de fallback de baixo consumo de energia.
