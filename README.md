# 🦶 Clínica Podológica - Sitio Web Profesional

Un sitio web moderno y profesional para clínicas podológicas, desarrollado con Next.js 15, TypeScript y Tailwind CSS. Diseñado para ofrecer una experiencia de usuario excepcional tanto en dispositivos móviles como de escritorio.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌟 Características

- ✅ **Diseño Responsive** - Optimizado para móviles, tablets y escritorio
- ✅ **Rendimiento Optimizado** - Construido con Next.js 15 y App Router
- ✅ **Accesibilidad** - Cumple con estándares WCAG
- ✅ **SEO Optimizado** - Metadatos configurados para mejor posicionamiento
- ✅ **Componentes Reutilizables** - Arquitectura modular y mantenible
- ✅ **Formulario de Contacto** - Con validación y notificaciones
- ✅ **Navegación Intuitiva** - Menú responsive con indicador de página activa

## 🚀 Demo

[Ver Demo en Vivo](https://tu-demo-url.vercel.app) *(Próximamente)*

## 📋 Páginas Incluidas

### 🏠 Página de Inicio
- Hero section con llamada a la acción
- Características destacadas de la clínica
- Preview de servicios principales
- Información de contacto rápida

### 🩺 Servicios
- **Quiropodia** - Tratamiento de callosidades y uñas
- **Podología Deportiva** - Análisis biomecánico para atletas
- **Ortopodología** - Plantillas personalizadas
- **Podología Pediátrica** - Cuidado especializado infantil
- **Cirugía Podológica** - Intervenciones menores
- **Tratamiento de Hongos** - Terapias antifúngicas
- **Podología Geriátrica** - Atención para la tercera edad
- **Estudio Biomecánico** - Análisis completo de la pisada

### 👥 Equipo Médico
- Perfiles detallados de podólogos
- Especialidades y experiencia
- Filosofía de la clínica

### 📞 Contacto
- Formulario de contacto funcional
- Información de ubicación y horarios
- Espacio preparado para Google Maps

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 15 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Iconos:** Lucide React
- **Notificaciones:** Sonner
- **Fuentes:** Google Fonts (Inter)

## 📁 Estructura del Proyecto

```
clinica-del-pie/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── globals.css        # Estilos globales
│   ├── servicios/         # Página de servicios
│   ├── equipo/            # Página del equipo
│   └── contacto/          # Página de contacto
├── components/
│   ├── ui/                # Componentes shadcn/ui
│   ├── navbar.tsx         # Navegación principal
│   └── footer.tsx         # Pie de página
├── lib/
│   └── utils.ts           # Utilidades
└── ...archivos de configuración
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/clinica-podologica.git
   cd clinica-podologica
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura shadcn/ui** (si es necesario)
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button card input label textarea
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador** en [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Linter de código
```

## 🎨 Personalización

### Colores
Los colores principales están definidos en `tailwind.config.ts`:
- **Primario:** Azules médicos (#0284c7, #0369a1)
- **Secundario:** Grises neutros
- **Acentos:** Configurables según la marca

### Contenido
Para personalizar el contenido:

1. **Información de la clínica:** Edita `components/footer.tsx`
2. **Servicios:** Modifica el array en `app/servicios/page.tsx`
3. **Equipo:** Actualiza los perfiles en `app/equipo/page.tsx`
4. **Contacto:** Cambia la información en `app/contacto/page.tsx`

### Imágenes
Reemplaza los placeholders en:
- Hero section: `/placeholder.svg?height=400&width=600`
- Equipo médico: `/placeholder.svg?height=400&width=400`

## 🔮 Funcionalidades Futuras

- [ ] **Sistema de Citas Online** - Calendario y reservas
- [ ] **Testimonios de Pacientes** - Sección de reseñas
- [ ] **Integración Google Maps** - Mapa interactivo
- [ ] **Blog de Consejos** - Artículos sobre salud podológica
- [ ] **Panel de Administración** - Gestión de contenido
- [ ] **Base de Datos** - Almacenamiento de pacientes y citas
- [ ] **Autenticación** - Login para pacientes y administradores
- [ ] **Modo Oscuro** - Tema dark/light
- [ ] **Envío de Emails** - Formulario de contacto funcional
- [ ] **Galería de Imágenes** - Fotos de la clínica

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [shadcn/ui](https://ui.shadcn.com/) por los componentes
- [Lucide](https://lucide.dev/) por los iconos
- [Vercel](https://vercel.com/) por el hosting

---

⭐ **¡Dale una estrella si este proyecto te ha sido útil!**
```

