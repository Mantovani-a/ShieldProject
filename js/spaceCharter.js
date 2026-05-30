// --- SPACE CHARTER SIMULATION MODULE ---

/**
 * Retorna dados mockados estáticos sobre ativações do International Charter Space and Major Disasters no Brasil.
 * @returns {Array<Object>} Lista de desastres simulados.
 */
function fetchSpaceCharterData() {
    return [
        {
            id: "BR-2024-0001",
            local: "Rio Grande do Sul",
            tipo: "Inundações Extremas",
            data: "Maio 2024",
            satelites: ["Sentinel-1", "ALOS-2", "RADARSAT-2"],
            status: "Ativo",
            descricao: "Ativação emergencial do Space Charter para mapeamento de áreas inundadas por sensores de radar SAR."
        },
        {
            id: "BR-2024-0002",
            local: "Região Serrana, RJ",
            tipo: "Deslizamentos de Terra",
            data: "Janeiro 2024",
            satelites: ["Pleiades", "WorldView-3"],
            status: "Arquivado",
            descricao: "Monitoramento de alta resolução óptica para detecção de cicatrizes de deslizamento e bloqueio de vias terrestres."
        },
        {
            id: "BR-2024-0003",
            local: "Região Nordeste",
            tipo: "Seca Severa",
            data: "2024",
            satelites: ["Terra/MODIS", "Sentinel-2"],
            status: "Ativo",
            descricao: "Sensoriamento térmico e índices de vegetação orbital para monitoramento do estresse hídrico em larga escala."
        }
    ];
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("[Space Charter] Módulo de simulação visual carregado.");
    const data = fetchSpaceCharterData();
    console.log("[Space Charter] Ativações simuladas do Brasil recuperadas:", data);
});
