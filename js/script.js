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


// --- 3. CANVAS: TELEMETRIA REATIVA DE SATÉLITE (INTERAÇÃO COM CURSOR DO PC) ---
const canvas = document.getElementById('satelliteCanvas');
const ctx = canvas.getContext('2d');

let mouse = { x: null, y: null };
let canvasRect = canvas.getBoundingClientRect();

canvas.addEventListener('mousemove', (e) => {
    canvasRect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - canvasRect.left;
    mouse.y = e.clientY - canvasRect.top;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let angle = 0;
let radarSweep = 0;
let satPos = { x: 0, y: 0 };

function drawTelemetry() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) * 0.75;

    // Desenhar círculos concêntricos orbitais (Finos e Clássicos)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    for(let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * (i / 4), 0, Math.PI * 2);
        ctx.stroke();
    }

    // Alvo Estático no Centro (Representando a Terra)
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(138, 95, 78, 0.4)';
    ctx.fill();

    // Órbita em Elipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius * 1.1, radius * 0.4, Math.PI / 4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.stroke();

    // Posição calculada do satélite
    angle += 0.005;
    let targetX = cx + Math.cos(angle) * radius * 1.1 * Math.cos(Math.PI / 4) - Math.sin(angle) * radius * 0.4 * Math.sin(Math.PI / 4);
    let targetY = cy + Math.cos(angle) * radius * 1.1 * Math.sin(Math.PI / 4) + Math.sin(angle) * radius * 0.4 * Math.sin(Math.PI / 4);

    // Interação Gravitacional: Atração física se o mouse estiver próximo ao Satélite
    if (mouse.x !== null && mouse.y !== null) {
        const dist = Math.hypot(mouse.x - targetX, mouse.y - targetY);
        if (dist < 100) {
            targetX += (mouse.x - targetX) * 0.35;
            targetY += (mouse.y - targetY) * 0.35;
        }
    }

    // Suavização do movimento
    satPos.x += (targetX - satPos.x) * 0.2;
    satPos.y += (targetY - satPos.y) * 0.2;

    // Linhas finas de rastreamento do Satélite (Interação Gráfica com cursor)
    if (mouse.x !== null && mouse.y !== null) {
        ctx.beginPath();
        ctx.moveTo(satPos.x, satPos.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(138, 95, 78, 0.12)';
        ctx.stroke();
    }

    // Feixe óptico do Satélite ao Centro
    ctx.beginPath();
    ctx.moveTo(satPos.x, satPos.y);
    ctx.lineTo(cx, cy);
    ctx.strokeStyle = 'rgba(138, 95, 78, 0.08)';
    ctx.stroke();

    // Satélite Físico
    ctx.beginPath();
    ctx.arc(satPos.x, satPos.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#8a5f4e';
    ctx.fill();

    // Anel de radar pulsante de varredura
    radarSweep = (radarSweep + 1) % radius;
    ctx.beginPath();
    ctx.arc(cx, cy, radarSweep, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(138, 95, 78, ${1 - (radarSweep / radius)})`;
    ctx.stroke();

    requestAnimationFrame(drawTelemetry);
}
drawTelemetry();


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
        id: "ID: LEO-304",
        status: "Índice pluviométrico crítico. Risco calculado de cisalhamento do solo.",
        risco: "Alto Alerta",
        pop: "Encosta Instável",
        analise: "Dados geotécnicos processados indicam que o solo atingiu ponto de saturação de 82%. Possibilidade de desmoronamentos."
    },
    ne: {
        local: "[ Região Nordeste ]",
        id: "ID: LEO-112",
        status: "Stress hídrico acumulado de alta escala temporal. Escassez hídrica aguda.",
        risco: "Severo",
        pop: "Solo Seco",
        analise: "Medições termais via sensores orbitais demonstram anomalia térmica positiva. Índices vegetativos severamente decrescentes."
    }
};

function focarPonto(id) {
    const info = pontosInfo[id];
    document.getElementById('tel-local').textContent = info.local;
    document.getElementById('tel-id').textContent = info.id;
    document.getElementById('tel-status').textContent = info.status;
    document.getElementById('tel-risk-val').textContent = info.risco;
    document.getElementById('tel-pop').textContent = info.pop;
    document.getElementById('tel-analise').textContent = info.analise;
}

// --- 4.1 INTERAÇÃO DE ZOOM E ARRASTE NO MAPA ---
const mapContainer = document.getElementById('map-container');
const mapWrapper = document.getElementById('map-wrapper');

let scale = 1;
const minScale = 1;
const maxScale = 3;
let panX = 0;
let panY = 0;

let isPanning = false;
let startX = 0;
let startY = 0;

// Estado do Pinch-to-Zoom para Mobile
let touchStartDist = 0;
let touchStartScale = 1;

function updateMapTransform() {
    if (scale <= 1) {
        scale = 1;
        panX = 0;
        panY = 0;
        mapContainer.style.cursor = 'grab';
    } else {
        mapContainer.style.cursor = 'move';

        // Estabelece limites máximos de pan dinamicamente para não "perder" o mapa de vista
        const maxPanX = (mapContainer.clientWidth * (scale - 1)) / 2;
        const maxPanY = (mapContainer.clientHeight * (scale - 1)) / 2;
        panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
        panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
    }
    mapWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
}

// Ativação do Clique dos Eventos nos Elementos SVG
document.getElementById('pin-rs').addEventListener('click', () => focarPonto('rs'));
document.getElementById('pin-rj').addEventListener('click', () => focarPonto('rj'));
document.getElementById('pin-ne').addEventListener('click', () => focarPonto('ne'));

// Zoom via Wheel (Scroll do mouse)
mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomSpeed = 0.15;
    const direction = e.deltaY < 0 ? 1 : -1;
    scale = Math.max(minScale, Math.min(maxScale, scale + direction * zoomSpeed));
    updateMapTransform();
}, { passive: false });

// Arraste (Pan) via Mouse
mapContainer.addEventListener('mousedown', (e) => {
    if (scale <= 1) return; // Arraste desativado se não houver zoom
    isPanning = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    mapContainer.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    updateMapTransform();
});

window.addEventListener('mouseup', () => {
    if (isPanning) {
        isPanning = false;
        mapContainer.style.cursor = scale > 1 ? 'move' : 'grab';
    }
});

// Eventos Touch para Dispositivos Móveis
mapContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        if (scale > 1) {
            isPanning = true;
            startX = e.touches[0].clientX - panX;
            startY = e.touches[0].clientY - panY;
        }
    } else if (e.touches.length === 2) {
        isPanning = false;
        touchStartDist = getPinchDistance(e);
        touchStartScale = scale;
    }
});

mapContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isPanning) {
        e.preventDefault(); // Impede scroll padrão do mobile
        panX = e.touches[0].clientX - startX;
        panY = e.touches[0].clientY - startY;
        updateMapTransform();
    } else if (e.touches.length === 2) {
        e.preventDefault();
        const currentDist = getPinchDistance(e);
        const factor = currentDist / touchStartDist;
        scale = Math.max(minScale, Math.min(maxScale, touchStartScale * factor));
        updateMapTransform();
    }
}, { passive: false });

mapContainer.addEventListener('touchend', () => {
    isPanning = false;
});

function getPinchDistance(e) {
    return Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
    );
}


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
            <p class="text-xs text-brand-grayText leading-relaxed relative z-10">${info.texto}</p>
        `;
        box.style.opacity = 1;
    }, 200);
}
