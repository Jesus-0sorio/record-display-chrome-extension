# 🎥 Record Display — Chrome Extension (Manifest V3)

Extensión moderna para **Google Chrome (Manifest V3)** diseñada para la captura y grabación rápida de pantalla, pestañas del navegador, micrófono y cámara web, desarrollada con **React 19**, **TypeScript**, **Vite** y **Tailwind CSS**.

---

## 🚀 Características Principales

* **Captura de Pantalla y Pestañas:** Utiliza la API nativa de JavaScript `navigator.mediaDevices.getDisplayMedia()` para capturar pantalla completa, ventanas o pestañas activas con audio del sistema.
* **Gestión de Dispositivos de Audio y Video:** Selector inteligente de micrófonos y cámaras conectadas mediante `navigator.mediaDevices.enumerateDevices()`.
* **Interfaz Popup de Alta Eficiencia:** Diseñada en modo oscuro con navegación fluida entre pestañas (`Record` y `Settings`).
* **Compilación Optimizada para Extensiones:** Configurada con rutas relativas (`base: './'`) para renderizado instantáneo en el popup de Chrome.
* **React 19 & Tailwind CSS v4:** Componentes funcionales ultralivianos y estilizados con Tailwind.

---

## 🛠️ Tecnologías Utilizadas

* **Runtime:** Node.js / pnpm
* **Framework:** React 19 + TypeScript
* **Bundler:** Vite con React Compiler (`@vitejs/plugin-react`)
* **Estilos:** Tailwind CSS
* **Manifest:** Chrome Extensions API (Manifest V3)
* **Linter:** ESLint (TypeScript + React Hooks)

---

## 📦 Instalación y Desarrollo Local

```bash
# 1. Instalar dependencias con pnpm
pnpm install

# 2. Iniciar servidor de desarrollo con HMR
pnpm dev

# 3. Compilar para producción (genera la carpeta dist/)
pnpm build
```

---

## 🔌 Cómo Instalar la Extensión en Google Chrome

1. Ejecuta el comando de compilación:
   ```bash
   pnpm build
   ```
2. Abre Google Chrome y navega a:
   ```text
   chrome://extensions/
   ```
3. Activa el **Modo de desarrollador** (interruptor en la esquina superior derecha).
4. Haz clic en el botón **"Cargar descomprimida"** (*Load unpacked*).
5. Selecciona la carpeta raíz de este proyecto.
6. ¡Listo! El icono de **Record Display** aparecerá en la barra de herramientas de Chrome.

---

## 📁 Estructura del Proyecto

```
record-display/
├── manifest.json            # Configuración MV3 y punto de entrada (dist/index.html)
├── vite.config.ts           # Configuración de compilación con base relativa
├── src/
│   ├── main.tsx             # Punto de entrada de React
│   ├── App.tsx              # Contenedor principal y enrutador de vistas
│   ├── pages/
│   │   ├── Record.tsx       # Interfaz de captura de pantalla
│   │   └── Settings.tsx     # Configuración de micrófono y cámara
│   └── components/          # Botones e indicadores reutilizables
└── dist/                    # Bundle compilado listo para Chrome
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
