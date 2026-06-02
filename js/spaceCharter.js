// --- SPACE CHARTER SIMULATION MODULE ---

/**
 * Banco de dados unificado de ativações e telemetria espacial SENTRYA.
 * Contém informações consolidadas das missões e dados de sensoriamento.
 */
const SENTRYA_ACTIVATIONS = {
    rs: {
        id: "BR-2024-0001",
        satelliteId: "LEO-902",
        local: "Rio Grande do Sul",
        tipo: "Inundações Extremas",
        data: "Maio 2024",
        satelites: ["Sentinel-1", "ALOS-2", "RADARSAT-2"],
        status: "Ativo",
        detalhes: "Lâmina hídrica estabilizada sobre áreas urbanas das bacias do Guaíba.",
        risco: "Grau Crítico",
        pop: "56% Alagado",
        analise: "Imagens do satélite Sentinel indicam descompasso hídrico persistente em locais baixos. Comunicação civil limitada a fallback.",
        descricao: "Ativação emergencial do Space Charter para mapeamento de áreas inundadas por sensores de radar SAR."
    },
    rj: {
        id: "BR-2024-0002",
        satelliteId: "MON-304",
        local: "Região Serrana, RJ",
        tipo: "Deslizamentos de Terra",
        data: "Janeiro 2024",
        satelites: ["Pleiades", "WorldView-3"],
        status: "Arquivado",
        detalhes: "Área sob monitoramento contínuo.",
        risco: "Em Avaliação",
        pop: "Monitoramento Ativo",
        analise: "Sensores pluviométricos e imagens orbitais indicam instabilidade potencial. Equipes técnicas acompanham a evolução das condições do terreno.",
        descricao: "Monitoramento de alta resolução óptica para detecção de cicatrizes de deslizamento e bloqueio de vias terrestres."
    },
    ne: {
        id: "BR-2024-0003",
        satelliteId: "LEO-112",
        local: "Região Nordeste",
        tipo: "Seca Severa",
        data: "2024",
        satelites: ["Terra/MODIS", "Sentinel-2"],
        status: "Ativo",
        detalhes: "Stress hídrico acumulado de alta escala temporal. Escassez hídrica aguda.",
        risco: "Severo",
        pop: "Solo Seco",
        analise: "Medições termais via sensores orbitais demonstram anomalia térmica positiva. Índices vegetativos severamente decrescentes.",
        descricao: "Sensoriamento térmico e índices de vegetação orbital para monitoramento do estresse hídrico em larga escala."
    },
    am: {
        id: "BR-2024-0004",
        satelliteId: "LEO-778",
        local: "Amazônia",
        tipo: "Incêndios Florestais",
        data: "2024",
        satelites: ["CBERS-4", "GOES-16", "NOAA-20"],
        status: "Ativo",
        detalhes: "Focos de calor detectados em múltiplos setores da floresta.",
        risco: "Alerta Ambiental",
        pop: "Queimadas Ativas",
        analise: "Sensores orbitais identificaram aumento significativo de temperatura superficial e emissões térmicas compatíveis com incêndios florestais.",
        descricao: "Monitoramento de focos de queimadas ativas e plumas de fumaça na bacia amazônica por sensores termais e ópticos."
    }
};

/**
 * Retorna dados mockados estáticos sobre ativações do International Charter Space and Major Disasters no Brasil.
 * @returns {Array<Object>} Lista de desastres simulados.
 */
function fetchSpaceCharterData() {
    return Object.values(SENTRYA_ACTIVATIONS).map(item => ({
        id: item.id,
        local: item.local,
        tipo: item.tipo,
        data: item.data,
        satelites: item.satelites,
        status: item.status,
        descricao: item.descricao
    }));
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("[Space Charter] Módulo de simulação visual carregado.");
    const data = fetchSpaceCharterData();
    console.log("[Space Charter] Ativações simuladas do Brasil recuperadas:", data);
});

