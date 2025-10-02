import dotenv from 'dotenv';
import { select, confirm, checkbox } from '@inquirer/prompts';
dotenv.config();

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
        this.apiKey = process.env.YOUTUBE_GCLOUD_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('La variable de entorno YOUTUBE_GCLOUD_API_KEY no está configurada, revisa el repositorio para información de como hacerlo!');
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

    /**
     * Busca videos y permite al usuario seleccionar interactivamente cuáles guardar
     * @param query Término de búsqueda
     * @param maxResults Número máximo de resultados
     * @returns Array de videos seleccionados por el usuario
     */
    async buscarYSeleccionarVideos(query: string, maxResults: number = 10): Promise<VideoInfo[]> {
        try {
            // Buscar videos
            const videos = await this.buscarVideosPorTitulo(query, maxResults);
            
            if (videos.length === 0) {
                console.log('❌ No se encontraron videos para ese término de búsqueda.');
                return [];
            }

            console.log(`\n✅ Se encontraron ${videos.length} videos:`);
            videos.forEach((video, index) => {
                console.log(`\n${index + 1}. ${video.title}`);
                console.log(`   Canal: ${video.channelTitle}`);
                console.log(`   URL: ${video.url}`);
            });

            // Preguntar si desea guardar videos
            const deseaGuardar = await confirm({ 
                message: '\n¿Deseas guardar alguno de estos videos?',
                default: true
            });

            if (!deseaGuardar) {
                return [];
            }

            const videosSeleccionados: VideoInfo[] = [];

            // Preguntar si desea guardar múltiples videos a la vez
            const guardarMultiples = await confirm({
                message: '¿Deseas seleccionar múltiples videos a la vez?',
                default: false
            });

            if (guardarMultiples) {
                // Usar checkbox para selección múltiple
                const choices = videos.map((video, index) => ({
                    name: `${index + 1}. ${video.title} - ${video.channelTitle}`,
                    value: index
                }));

                const seleccionados = await checkbox({
                    message: 'Selecciona los videos que deseas guardar (usa Espacio para seleccionar, Enter para confirmar):',
                    choices: choices
                });

                seleccionados.forEach((index: number) => {
                    videosSeleccionados.push(videos[index]);
                });

                console.log(`\n📁 ${videosSeleccionados.length} video(s) seleccionado(s).`);
            } else {
                // Selección uno por uno
                let continuar = true;
                while (continuar) {
                    const choices = videos.map((video, index) => ({
                        name: `${index + 1}. ${video.title} - ${video.channelTitle}`,
                        value: index
                    }));

                    const seleccion = await select({
                        message: 'Selecciona un video para guardar:',
                        choices: choices
                    });

                    videosSeleccionados.push(videos[seleccion]);
                    console.log(`\n✅ Video guardado: ${videos[seleccion].title}`);

                    // Preguntar si desea guardar más videos
                    continuar = await confirm({
                        message: '¿Deseas guardar otro video de los resultados?',
                        default: false
                    });
                }

                console.log(`\n📁 Total de videos guardados: ${videosSeleccionados.length}`);
            }

            return videosSeleccionados;
        } catch (error) {
            console.error('Error al buscar y seleccionar videos:', error);
            throw error;
        }
    }
}