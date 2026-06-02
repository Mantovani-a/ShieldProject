# SENTRYA — Monitoramento de Desastres por Satélite

Uma plataforma de coordenação climática que une telemetria orbital à logística civil para otimizar a resposta a desastres naturais.

---

## 🚀 Funcionalidades

- **Monitoramento por Satélite**: Simulação de telemetria baseada em satélites LEO (Sentinel-1, CBERS-4, etc.) para mapeamento de riscos.
- **Mapa Interativo**: Mapa do Brasil em SVG com suporte a zoom/pan e atualização em tempo real.
- **Triagem SOS**: Algoritmo de priorização de chamados baseado em criticidade (`Urgência = População × Fator de Risco`).
- **Linha do Tempo**: Retrospectiva interativa das enchentes no Rio Grande do Sul (2024).
- **Interface Premium**: Efeitos visuais modernos, spotlight cards e transições fluidas.

---

## 🛠️ Tecnologias

- **HTML5 & CSS3**: Estruturação semântica e estilização responsiva com Bootstrap 5 e efeitos personalizados.
- **JavaScript (Vanilla)**: Manipulação do DOM, controle do mapa interativo e lógica de triagem SOS.

---

## 📁 Estrutura do Projeto

```text
SENTRYA/
├── css/style.css        # Estilos e efeitos visuais
├── js/
│   ├── script.js        # Lógica de interface e interações
│   └── spaceCharter.js  # Banco de dados e telemetria de satélites
├── index.html           # Página inicial e Linha do tempo (RS 2024)
├── simulacao.html       # Mapa do Brasil e diagnóstico orbital
├── acoes.html           # Painel operacional de chamados SOS
└── contato.html         # Formulário de contato institucional
```

---

## 💻 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Mantovani-a/ShieldProject.git
   ```
2. Acesse a pasta:
   ```bash
   cd ShieldProject
   ```
3. Abra `index.html` no navegador (ou utilize a extensão *Live Server* no VS Code).

---

## 🗺️ Roadmap

- [ ] **Fase 2**: Integração com APIs reais (Space Charter / CEMADEN).
- [ ] **Fase 3**: Desenvolvimento de backend próprio.
- [ ] **Fase 4**: Modelos preditivos de risco de inundação.
