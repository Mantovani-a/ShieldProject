# SENTRYA — Monitoramento de Desastres por Satélite

Uma plataforma descentralizada de coordenação climática desenhada para unificar o fluxo de dados orbitais à logística civil, contornando falhas de conexão convencionais no mapeamento de riscos e otimizando a resposta a desastres naturais.

---

## 🚀 Funcionalidades

- **Monitoramento Ativo (Telemetria Espacial)**: Diagnóstico e mapeamento dinâmico de lâminas hídricas superficiais, riscos de deslizamento, queimadas e seca severa no território brasileiro. Utiliza telemetria simulada baseada em satélites LEO (Low Earth Orbit) associados a missões reais como Sentinel-1, Pleiades, CBERS-4 e Terra/MODIS.
- **Mapa Vetorial Interativo**: Mapa interativo do Brasil em formato SVG integrado a um monitor de telemetria em tempo real, com suporte completo para zoom (scroll do mouse) e arrasto (pan).
- **Algoritmo de Roteamento & Triagem**: Sistema de priorização e ordenação dinâmica de chamados SOS com base na criticidade de vulneráveis e tipo de ocorrência. O índice de urgência é calculado por: `Urgência = População × Fator de Risco`.
- **Efeitos Visuais Interativos & Premium**: Spotlight cards reativos ao cursor, inclinação em 3D de elementos baseada no mouse, efeitos de paralaxe durante o scroll e transições suaves de revelação (reveal scroll).
- **Linha do Tempo Histórica**: Seção interativa com retrospectiva crítica detalhando as fases de colapso de infraestrutura terrestre durante as enchentes no Rio Grande do Sul em 2024.
- **Roteamento Dinâmico de Cidades**: Preenchimento automático do formulário SOS através de parâmetros de URL (`?cidade=NomeDaCidade`), agilizando a triagem operacional.
- **Fale Conosco**: Canal de comunicação direta por e-mail com formulário de contato integrado e exibição das informações oficiais da equipe Sentrya, com janelas modais de confirmação personalizadas.

---

## 🛠️ Tecnologias Utilizadas

- **Estruturação**: [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) com marcação semântica moderna.
- **Estilização**: [Bootstrap 5](https://getbootstrap.com/) para layouts fluidos e responsivos + [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) Vanilla com variáveis personalizadas para a identidade visual (efeitos neon, spotlight, temas dinâmicos e scrollbars customizadas).
- **Lógica e Dinâmica**: [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) Vanilla para manipulação do DOM, controle de zoom/pan no SVG, e execução do algoritmo de prioridade na fila SOS.

---

## 📁 Estrutura de Arquivos

```text
SENTRYA/
├── css/
│   └── style.css           # Estilizações customizadas, identidade visual e efeitos luminosos
├── img/
│   ├── logo-sentrya-branca.png
│   ├── logo-sentryamenor.png
│   ├── logo_Sentrya.png
│   └── logosentriav2.png   # Logotipos e identidades visuais da plataforma
├── js/
│   ├── script.js           # Efeitos visuais, controle do mapa interativo e lógica SOS/timeline
│   └── spaceCharter.js     # Banco de dados de ativações e telemetria de satélites (RS, RJ, NE, AM)
├── .gitignore              # Arquivos e diretórios ignorados pelo Git
├── index.html              # Apresentação do projeto e Timeline histórica (RS 2024)
├── simulacao.html          # Diagnóstico orbital e Mapa do Brasil interativo (Zoom & Pan)
├── acoes.html              # Central de Operações: Envio SOS via satélite e Fila de Atendimento
├── contato.html            # Módulo de Fale Conosco (formulário de e-mail e contatos institucionais)
└── readme.md               # Documentação do projeto (este arquivo)
```

---

## 💻 Como Executar o Projeto

1. Clone este repositório para a sua máquina local:
   ```bash
   git clone https://github.com/Mantovani-a/ShieldProject.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd ShieldProject
   ```

3. Abra o arquivo `index.html` diretamente em seu navegador web de preferência ou utilize uma extensão de servidor local como a *Live Server* no VS Code para desfrutar de recarregamento automático.

---

## 🗺️ Roadmap de Evolução

- [ ] **Fase 2**: Integração via API aberta com o Space Charter e CEMADEN para processamento de radar SAR em tempo real.
- [ ] **Fase 3**: Criação de backend seguro.
- [ ] **Fase 4**: Mecanismo estatístico preditivo para identificar bacias com risco de transbordo com base em volume de chuva histórica.
