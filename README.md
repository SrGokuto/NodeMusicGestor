# Proyecto Beatwave

##  Descripción del proyecto

Este proyecto de software es un **wrapper (envoltura) personalizado para YouTube**, desarrollado en **TypeScript**, que utiliza **ytdlp** y **FFmpeg** para gestionar la descarga, conversión y reproducción de contenido multimedia.

**Wrapper de YouTube**
El wrapper es una capa de software, proporciona una interfaz más sencilla y fácil de usar para interactuar con la API (Interfaz de Programación de Aplicaciones) de YouTube.

**Basado en ytdlp y FFmpeg**

**ytdlp:** Es un programa de línea de comandos que permite descargar videos de YouTube y otros sitios web. El wrapper utiliza ytdlp para descargar videos de YouTube.
**FFmpeg:** Es un conjunto de herramientas de línea de comandos para procesar y convertir archivos multimedia. El wrapper utiliza FFmpeg para procesar y convertir los videos descargados.

Su diseño está basado en **principios de Programación Orientada a Objetos**, como:

- **Clases**
- **Herencia**
- **Polimorfismo**
- **Encapsulación**

El objetivo del proyecto es ofrecer una capa fácil de usar sobre herramientas de línea de comandos complejas, permitiendo automatizar tareas como:

- Descargar videos o solo el audio desde YouTube.
- Convertirlos a diferentes formatos.
- Gestionar reproducción mediante clases como `Reproductor`, `Cancion`, `Playlist`, etc.

---

## Instrucciones de instalación y uso

Asegúrate de tener instalados:

- **Node.js** (versión recomendada: 18+)
- **yt-dlp** → https://github.com/yt-dlp/yt-dlp
- **FFmpeg** → https://ffmpeg.org/

---

### Instalación

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd <nombre-del-proyecto>

npm install

