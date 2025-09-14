# Proyecto React

Este proyecto está hecho con **Vite + React**.

## 🚀 Cómo correr el proyecto

1. Clonar este repositorio:

```bash
git clone https://github.com/usuario/mi-proyecto.git
cd mi-proyecto
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:

```bash
VITE_API_URL=http://localhost:3000
```

4. Correr el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir en un navegador la URL que se muestre la terminal (por defecto `http://localhost:5173`).

## 🛠️ Scripts disponibles

* `npm run dev` → Inicia el servidor de desarrollo
* `npm run build` → Genera la build para producción
* `npm run preview` → Sirve la build localmente para pruebas

##  Estructura de carpetas

Dentro de src/ estará la siguiente organización:

* `assets/` → Archivos estáticos como imágenes, íconos, fuentes, etc.

* `components/` → Componentes reutilizables de la interfaz (botones, inputs, modales…).

* `context/` → Contextos de React para manejar estado global 

* `hooks/` → Hooks personalizados que consumen los servicios

* `navigation/` → Configuración de rutas y navegación con react-router-dom.

* `services/` → Lógica para comunicarse con APIs externas o manejar peticiones

* `utils/` → Funciones utilitarias o helpers (formateo de fechas, validaciones, etc.).

* `views/` → Vistas o páginas principales de la aplicación (Home, Classroom, Exercise…).