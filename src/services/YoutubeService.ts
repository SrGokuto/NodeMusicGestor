interface VideoInfo {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    channelTitle: string;
    publishedAt: string;
}

export class YoutubeService {
    private apiKey: string;
    private baseUrl: string = 'https://www.googleapis.com/youtube/v3';

    constructor() {
        // Por ahora usaremos la API key directamente para simplificar
        this.apiKey = 'AIzaSyDMWDxaznnjYtkP0TEdTPw8rkNWiHllusI';
        if (!this.apiKey) {
            throw new Error('YOUTUBE_GCLOUD_API_KEY no está configurada');
        }
    }

    /**
     * Busca videos en YouTube por título
     * @param query Término de búsqueda
     * @param maxResults Número máximo de resultados (por defecto 10)
     * @returns Array de información de videos
     */
    async buscarVideosPorTitulo(query: string, maxResults: number = 10): Promise<VideoInfo[]> {
        try {
            const url = `${this.baseUrl}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${this.apiKey}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error en la API de YouTube: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(`Error de la API de YouTube: ${data.error.message}`);
            }

            const videos: VideoInfo[] = data.items.map((item: any) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt
            }));

            return videos;
        } catch (error) {
            console.error('Error al buscar videos en YouTube:', error);
            throw error;
        }
    }

    /**
     * Busca videos musicales específicamente
     * @param artista Nombre del artista
     * @param cancion Nombre de la canción
     * @param maxResults Número máximo de resultados
     * @returns Array de información de videos musicales
     */
    async buscarMusicaPorArtistaYCancion(artista: string, cancion: string, maxResults: number = 5): Promise<VideoInfo[]> {
        const query = `${artista} ${cancion} official music video`;
        return this.buscarVideosPorTitulo(query, maxResults);
    }

    /**
     * Obtiene información detallada de un video por su ID
     * @param videoId ID del video de YouTube
     * @returns Información detallada del video
     */
    async obtenerDetallesVideo(videoId: string): Promise<VideoInfo | null> {
        try {
            const url = `${this.baseUrl}/videos?part=snippet&id=${videoId}&key=${this.apiKey}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                const item = data.items[0];
                return {
                    id: item.id,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                    url: `https://www.youtube.com/watch?v=${item.id}`,
                    channelTitle: item.snippet.channelTitle,
                    publishedAt: item.snippet.publishedAt
                };
            }
            
            return null;
        } catch (error) {
            console.error('Error al obtener detalles del video:', error);
            throw error;
        }
    }
}