// --- EFEITOS VISUAIS ---

document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach((el) => observer.observe(el));
}

// --- TELEMETRIA DO MAPA ---

const pontosInfo = {
    rs: {
        local: "[ Rio Grande do Sul ]",
        id: "ID: LEO-902",
        fonte: "Space Charter",
        activationId: "BR-2024-0001",
        status: "Lâmina hídrica estabilizada sobre áreas urbanas das bacias do Guaíba.",
        risco: "Grau Crítico",
        pop: "56% Alagado",
        analise: "Imagens do satélite Sentinel indicam descompasso hídrico persistente em locais baixos. Comunicação civil limitada a fallback."
    },
    rj: {
        local: "[ Rio de Janeiro - Região Serrana ]",
        id: "ID: MON-304",
        fonte: "Space Charter",
        activationId: "BR-2024-0002",
        status: "Área sob monitoramento contínuo.",
        risco: "Em Avaliação",
        pop: "Monitoramento Ativo",
        analise: "Sensores pluviométricos e imagens orbitais indicam instabilidade potencial. Equipes técnicas acompanham a evolução das condições do terreno."
    },
    ne: {
        local: "[ Região Nordeste ]",
        id: "ID: LEO-112",
        fonte: "Space Charter",
        activationId: "BR-2024-0003",
        status: "Stress hídrico acumulado de alta escala temporal. Escassez hídrica aguda.",
        risco: "Severo",
        pop: "Solo Seco",
        analise: "Medições termais via sensores orbitais demonstram anomalia térmica positiva. Índices vegetativos severamente decrescentes."
    },
    am: {
        local: "[ Amazônia ]",
        id: "ID: LEO-778",
        fonte: "Space Charter",
        activationId: "BR-2024-0004",
        status: "Focos de calor detectados em múltiplos setores da floresta.",
        risco: "Alerta Ambiental",
        pop: "Queimadas Ativas",
        analise: "Sensores orbitais identificaram aumento significativo de temperatura superficial e emissões térmicas compatíveis com incêndios florestais."
    }
};

function focarPonto(id) {
    const info = pontosInfo[id];
    if (!info) return;

    const telLocal = document.getElementById('tel-local');
    const telId = document.getElementById('tel-id');
    const telStatus = document.getElementById('tel-status');
    const telRiskVal = document.getElementById('tel-risk-val');
    const telPop = document.getElementById('tel-pop');
    const telAnalise = document.getElementById('tel-analise');
    const painel = document.getElementById('telemetry-display');

    if (telLocal) telLocal.textContent = info.local;
    if (telId) telId.textContent = `${info.id} | ${info.activationId} (Fonte: ${info.fonte})`;
    if (telStatus) telStatus.textContent = info.status;
    if (telRiskVal) telRiskVal.textContent = info.risco;
    if (telPop) telPop.textContent = info.pop;
    if (telAnalise) telAnalise.textContent = info.analise;

    if (painel) {
        if (id === 'rj') {
            painel.style.borderColor = '#1B6CA8';
            if (telLocal) telLocal.style.color = '#4EA0DC';
            if (telRiskVal) telRiskVal.style.color = '#4EA0DC';
        } else {
            painel.style.borderColor = '#C85A0A';
            if (telLocal) telLocal.style.color = '#C85A0A';
            if (telRiskVal) telRiskVal.style.color = '#C85A0A';
        }
    }
}

['rs', 'rj', 'ne', 'am'].forEach(id => {
    const pin = document.getElementById(`pin-${id}`);
    if (pin) {
        pin.addEventListener('click', () => {
            focarPonto(id);
            const mapaOperacoes = document.getElementById('mapa-operacoes');
            if (mapaOperacoes) {
                mapaOperacoes.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// --- REGISTRO SOS E ALGORITMO DE PRIORIZAÇÃO ---

const sosForm = document.getElementById('sosForm');
if (sosForm) {
    sosForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const local = document.getElementById('sosLocal').value;
        const tipo = document.getElementById('sosTipo').value;
        const pessoas = parseInt(document.getElementById('sosPessoas').value);

        // Fatores de risco oficiais: Inundação = 3, Colapso = 2, Isolamento = 1
        let riskFactor = 1;
        let prioValue = 4;
        if (tipo.includes("Inundação")) {
            riskFactor = 3;
            prioValue = 1;
        } else if (tipo.includes("Colapso")) {
            riskFactor = 2;
            prioValue = 2;
        } else if (tipo.includes("Isolamento")) {
            riskFactor = 1;
            prioValue = 3;
        }

        const urgenciaVal = pessoas * riskFactor;

        const list = document.getElementById('incident-list');
        if (list) {
            const card = document.createElement('div');
            card.className = "p-3 bg-brand-dark-opacity border border-brand-border rounded d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-2 transition-all duration-500 opacity-0";
            card.style.transform = "translateY(16px)";
            card.setAttribute('data-prioridade', prioValue);
            card.setAttribute('data-urgencia', urgenciaVal);
            
            card.innerHTML = `
                <div class="d-flex flex-column gap-1">
                    <span class="text-white text-xs font-medium">${local}</span>
                    <p class="text-xs text-brand-gray mb-0">${tipo} • ${pessoas} Pessoas</p>
                </div>
                <div class="text-sm-end w-100 w-sm-auto mt-2 mt-sm-0">
                    <span class="text-xs text-brand-copper font-bold text-uppercase">[Aguardando]</span>
                </div>
            `;

            list.prepend(card);

            setTimeout(() => {
                card.classList.remove('opacity-0');
                card.style.transform = "translateY(0)";
            }, 100);
        }

        sosForm.reset();
    });
}

const btnOtimizarRotas = document.getElementById('btnOtimizarRotas');
if (btnOtimizarRotas) {
    btnOtimizarRotas.addEventListener('click', () => {
        const list = document.getElementById('incident-list');
        if (!list) return;

        const items = Array.from(list.children);
        
        // Ordena por Urgência de forma decrescente (População * Risco)
        items.sort((a, b) => {
            const urgA = parseInt(a.getAttribute('data-urgencia')) || 0;
            const urgB = parseInt(b.getAttribute('data-urgencia')) || 0;
            return urgB - urgA;
        });

        list.innerHTML = '';
        
        items.forEach((item, index) => {
            const priorityBadge = item.querySelector('.text-sm-end span');
            if (priorityBadge) {
                priorityBadge.innerHTML = `[Prioridade #${index + 1}]`;
                priorityBadge.classList.remove('text-brand-copper');
                priorityBadge.classList.add('text-brand-light');
            }
            
            if (index === 0) {
                item.className = "p-3 bg-brand-dark-opacity border border-brand-copper rounded d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-2 transition-all duration-500";
            } else {
                item.className = "p-3 bg-brand-dark-opacity border border-brand-border rounded d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-2 transition-all duration-500";
            }

            list.appendChild(item);
        });
    });
}

// --- LINHA DO TEMPO HISTÓRICA ---

const tDados = {
    1: {
        tipo: "[ Precipitação Inicial ]",
        titulo: "Volume acumulado de alta intensidade",
        texto: "Modelos de solo saturaram em tempo recorde nos leitos dos rios Taquari e Jacuí. Agências locais operaram sem centralização em tempo real de altitudes e relevo topográfico."
    },
    2: {
        tipo: "[ Colapso de Monitoramento ]",
        titulo: "Estações hidrológicas terrestres destruídas",
        texto: "Réguas físicas e sensores de vazão locais foram levados pelas águas. A Defesa Civil perdeu parâmetros precisos de vazão do Guaíba, dependendo apenas de observações visuais isoladas."
    },
    3: {
        tipo: "[ Queda de Conectividade ]",
        titulo: "Torres de comunicação fora de serviço",
        texto: "Baterias e geradores terrestres das torres celulares falharam após submersão das centrais. Eldorado do Sul e ilhas metropolitanas ficaram em silêncio absoluto de rádio."
    },
    4: {
        tipo: "[ Logística Manual ]",
        titulo: "Ausência de roteamento centralizado",
        texto: "O resgate de voluntários e bombeiros atuou de forma empírica por proximidade, sem um painel integrado baseado em urgência que evitasse cruzamento de rotas ineficientes."
    }
};

function timelineData(id) {
    for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById(`tbtn-${i}`);
        if (btn) {
            if (i === id) {
                btn.className = "btn-timeline active";
            } else {
                btn.className = "btn-timeline";
            }
        }
    }

    const box = document.getElementById('timeline-box');
    if (box) {
        box.style.opacity = '0';
        
        setTimeout(() => {
            const info = tDados[id];
            box.innerHTML = `
                <div class="d-flex justify-content-between align-items-center font-mono text-xs mb-3">
                    <span class="text-brand-copper">${info.tipo}</span>
                    <span class="text-brand-gray">Estudo de Caso RS</span>
                </div>
                <h3 class="h5 text-white mb-3">${info.titulo}</h3>
                <p class="text-brand-gray mb-0">${info.texto}</p>
            `;
            box.style.opacity = '1';
        }, 200);
    }
}

for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById(`tbtn-${i}`);
    if (btn) {
        btn.addEventListener('click', () => {
            timelineData(i);
        });
    }
}

// --- BUSCA DE CIDADES E QUERY PARAMETERS ---

const btnBuscarCidade = document.getElementById('btnBuscarCidade');
if (btnBuscarCidade) {
    btnBuscarCidade.addEventListener('click', () => {
        const cidadeBusca = document.getElementById('cidadeBusca');
        if (!cidadeBusca) return;

        const cidade = cidadeBusca.value.trim();
        if (!cidade) return;

        const sosLocalInput = document.getElementById('sosLocal');
        if (sosLocalInput) {
            sosLocalInput.value = cidade;
            const simuladorSec = document.getElementById('simulador');
            if (simuladorSec) {
                simuladorSec.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            window.location.href = `acoes.html?cidade=${encodeURIComponent(cidade)}`;
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    // Inicializar simulação de satélite se o canvas existir
    const urlParams = new URLSearchParams(window.location.search);
    const cidadeParam = urlParams.get('cidade');
    if (cidadeParam) {
        const sosLocalInput = document.getElementById('sosLocal');
        if (sosLocalInput) {
            sosLocalInput.value = cidadeParam;
            sosLocalInput.focus();
            const simuladorSec = document.getElementById('simulador');
            if (simuladorSec) {
                setTimeout(() => {
                    simuladorSec.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    }
});

// --- ANIMAÇÕES INTERATIVAS: SCROLL E 3D ---
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Efeito Parallax
    document.querySelectorAll('.parallax-element').forEach(el => {
        // Move o elemento levemente no eixo Y baseado no scroll
        el.style.transform = `translateY(${scrollY * 0.05}px)`;
    });
});

const interactive3dIcon = document.querySelector('.interactive-3d-icon');
if (interactive3dIcon) {
    document.addEventListener('mousemove', (e) => {
        // Rotaciona o ícone baseado na posição do mouse relativa ao centro da tela
        const x = (e.clientX / window.innerWidth - 0.5) * 60; // -30 a 30 graus
        const y = (e.clientY / window.innerHeight - 0.5) * -60; // -30 a 30 graus
        interactive3dIcon.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
    
    // Efeito complementar para dispositivos móveis via scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Se não houver mousemove (mobile), o scroll também gira o ícone
        interactive3dIcon.style.transform = `rotateX(${scrollY * 0.2}deg) rotateY(${scrollY * 0.1}deg)`;
    });
}