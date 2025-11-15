// Função para carregar o JSON (dados dos vídeos)
async function fetchChannelData() {
    try {
        // Assume que videos.json está no mesmo diretório
        const response = await fetch('/assets/json/videos.json');
        if (!response.ok) {
            throw new Error(`Erro ao carregar o JSON: ${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Não foi possível carregar os dados dos vídeos.", error);
        // Retorna dados vazios ou uma mensagem de erro para exibição
        return [];
    }
}

/**
 * Cria e insere o HTML do vídeo no container correto.
 */
function createVideoElement(videoId, title, container, isSecondMountZera) {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    
    const videoItem = document.createElement('div');
    videoItem.classList.add('video-item');
    
    if (isSecondMountZera) {
        // Classe usada para identificar e ocultar o segundo vídeo no mobile
        videoItem.classList.add('hide-on-mobile'); 
    }
    
    videoItem.innerHTML = `
        <iframe 
            src="${videoUrl}" 
            title="${title}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
        <p title="${title}">${title}</p>
    `;
    
    container.appendChild(videoItem);
}

/**
 * Renderiza todos os vídeos com base nos dados do JSON.
 */
async function renderVideos() {
    const channelsData = await fetchChannelData();
    
    channelsData.forEach(channel => {
        const container = document.querySelector(`#${channel.id} .video-container`);
        const titleElement = document.querySelector(`#${channel.id} h2`);

        if (!container) return; // Garante que o container HTML existe

        channel.videos.forEach((video, index) => {
            // Verifica se é o segundo vídeo do @mountzera
            const isSecondMountZera = (channel.id === 'mountzera' && index === 1);
            createVideoElement(video.id, video.title, container, isSecondMountZera);
        });
    });
}

// Inicia a renderização dos vídeos ao carregar a página
document.addEventListener('DOMContentLoaded', renderVideos);