// --- 1. INTERACTION: SPOTLIGHT EFFECT QUE SEGUE O MOUSE ---
document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- 2. SCROLL INTERACTION: REVELAÇÃO SUAVE (INTERSECTION OBSERVER) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// --- 4. MAPA VETORIAL - CARREGAR TELEMETRIA ---
const pontosInfo = {
    rs: {
        local: "[ Rio Grande do Sul ]",
        id: "ID: LEO-902",
        status: "Lâmina hídrica estabilizada sobre áreas urbanas das bacias do Guaíba.",
        risco: "Grau Crítico",
        pop: "56% Alagado",
        analise: "Imagens do satélite Sentinel indicam descompasso hídrico persistente em locais baixos. Comunicação civil limitada a fallback."
    },
    rj: {
    local: "[ Rio de Janeiro - Região Serrana ]",
    id: "ID: MON-304",
    status: "Área sob monitoramento contínuo.",
    risco: "Em Avaliação",
    pop: "Monitoramento Ativo",
    analise: "Sensores pluviométricos e imagens orbitais indicam instabilidade potencial. Equipes técnicas acompanham a evolução das condições do terreno."
},
    ne: {
        local: "[ Região Nordeste ]",
        id: "ID: LEO-112",
        status: "Stress hídrico acumulado de alta escala temporal. Escassez hídrica aguda.",
        risco: "Severo",
        pop: "Solo Seco",
        analise: "Medições termais via sensores orbitais demonstram anomalia térmica positiva. Índices vegetativos severamente decrescentes."
    },
    am: {
        local: "[ Amazônia ]",
        id: "ID: LEO-778",
        status: "Focos de calor detectados em múltiplos setores da floresta.",
        risco: "Alerta Ambiental",
        pop: "Queimadas Ativas",
        analise: "Sensores orbitais identificaram aumento significativo de temperatura superficial e emissões térmicas compatíveis com incêndios florestais."
},
};

function focarPonto(id) {
    const info = pontosInfo[id];

    document.getElementById('tel-local').textContent = info.local;
    document.getElementById('tel-id').textContent = info.id;
    document.getElementById('tel-status').textContent = info.status;
    document.getElementById('tel-risk-val').textContent = info.risco;
    document.getElementById('tel-pop').textContent = info.pop;
    document.getElementById('tel-analise').textContent = info.analise;

    const painel = document.getElementById('telemetry-display');

    if (id === 'rj') {
        painel.style.borderColor = '#1B6CA8';

        document.getElementById('tel-local').style.color = '#4EA0DC';
        document.getElementById('tel-risk-val').style.color = '#4EA0DC';
    } else {
        painel.style.borderColor = '#C85A0A';

        document.getElementById('tel-local').style.color = '#C85A0A';
        document.getElementById('tel-risk-val').style.color = '#C85A0A';
    }
}

// Ativação do Clique dos Eventos nos Elementos SVG
document.getElementById('pin-rs').addEventListener('click', () => {
    focarPonto('rs');
    document.getElementById('mapa-operacoes').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

document.getElementById('pin-rj').addEventListener('click', () => {
    focarPonto('rj');
    document.getElementById('mapa-operacoes').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

document.getElementById('pin-ne').addEventListener('click', () => {
    focarPonto('ne');
    document.getElementById('mapa-operacoes').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

document.getElementById('pin-am').addEventListener('click', () => {
    focarPonto('am');
    document.getElementById('mapa-operacoes').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// --- 5. WORKSPACE: CADASTRO DE SOS & ALGORITMO DE ROTAS ---
function registrarEmergencia(event) {
    event.preventDefault();
    
    const local = document.getElementById('sosLocal').value;
    const tipo = document.getElementById('sosTipo').value;
    const pessoas = parseInt(document.getElementById('sosPessoas').value);

    let prioValue = 4;
    if(tipo.includes("Inundação")) prioValue = 1;
    if(tipo.includes("Colapso")) prioValue = 2;

    const list = document.getElementById('incident-list');
    const card = document.createElement('div');
    card.className = "p-3 bg-brand-copperFaint border border-brand-copper rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 transition-all duration-500 opacity-0 transform translate-y-4";
    card.setAttribute('data-prioridade', prioValue);
    
    card.innerHTML = `
        <div class="space-y-0.5">
            <span class="text-white text-[11px] font-medium">${local}</span>
            <p class="text-[10px] text-brand-grayText">${tipo} • ${pessoas} Pessoas</p>
        </div>
        <div class="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0">
            <span class="text-[10px] text-brand-copper font-bold uppercase">[Aguardando]</span>
        </div>
    `;

    list.prepend(card);

    setTimeout(() => {
        card.classList.remove('opacity-0', 'translate-y-4');
    }, 100);

    document.getElementById('sosForm').reset();
}

function otimizarRotas() {
    const list = document.getElementById('incident-list');
    const items = Array.from(list.children);

    items.sort((a, b) => {
        return parseInt(a.getAttribute('data-prioridade')) - parseInt(b.getAttribute('data-prioridade'));
    });

    list.innerHTML = '';
    
    items.forEach((item, index) => {
        const priorityBadge = item.querySelector('.text-right span');
        if (priorityBadge) {
            priorityBadge.innerHTML = `[Prioridade #${index + 1}]`;
            priorityBadge.classList.remove('text-brand-copper');
            priorityBadge.classList.add('text-brand-grayLight');
        }
        
        if(index === 0) {
            item.className = "p-3 bg-brand-copperFaint border border-brand-copper/50 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 transition-all duration-500";
        } else {
            item.className = "p-3 bg-brand-black/40 border border-brand-border rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 transition-all duration-500";
        }

        list.appendChild(item);
    });
}


// --- 6. TIMELINE DINÂMICA ---
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
        if (i === id) {
            btn.className = "text-brand-copper border-b border-brand-copper pb-2 px-2 transition-colors";
        } else {
            btn.className = "pb-2 px-2 hover:text-[#f4f4f5] transition-colors";
        }
    }

    const box = document.getElementById('timeline-box');
    box.style.opacity = 0;
    
    setTimeout(() => {
        const info = tDados[id];
        box.innerHTML = `
            <div class="flex justify-between items-center text-[10px] font-mono relative z-10">
                <span class="text-brand-copper">${info.tipo}</span>
                <span class="text-brand-grayText">Estudo de Caso RS</span>
            </div>
            <h3 class="text-base text-white relative z-10">${info.titulo}</h3>
            <p class="text-sm text-brand-grayText leading-relaxed relative z-10">${info.texto}</p>
        `;
        box.style.opacity = 1;
    }, 200);
}

const btnBuscarCidade = document.getElementById('btnBuscarCidade');

if (btnBuscarCidade) {

    btnBuscarCidade.addEventListener('click', () => {

        const cidade = document
            .getElementById('cidadeBusca')
            .value
            .trim();

        if (!cidade) return;

        const campoLocalizacao = document.querySelector(
            '#simulador input[placeholder="Bairro, Município"]'
        );

        if (campoLocalizacao) {
            campoLocalizacao.value = cidade;
        }

        document.getElementById('simulador').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });

}