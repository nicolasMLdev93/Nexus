🚀 Nexus

🧠 Descripción:
Nexus es una API backend de microblogging que replica las funcionalidades principales de redes sociales modernas, permitiendo a los usuarios interactuar mediante publicaciones, comentarios y reacciones.
La aplicación está desarrollada con TypeScript y sigue una arquitectura escalable basada en:
- Node.js + Express para la gestión de rutas y lógica de negocio.
- Sequelize como ORM para la interacción con bases de datos relacionales.
MySQL desplegado en Clever Cloud, garantizando alta disponibilidad y mantenimiento automatizado.
Su diseño modular facilita la extensión del sistema, permitiendo incorporar nuevas funcionalidades de forma segura y eficiente.

✨ Características principales:
📝 Publicaciones
- Crear, editar y eliminar posts
- Sistema de re-posts (similar a retweets)
- Límite de caracteres configurable
- Sistema de comentarios en publicaciones
- Interacciones mediante “likes”

🔐 Autenticación y Seguridad
- Registro e inicio de sesión seguro
- Autenticación basada en JWT (JSON Web Tokens)
- Contraseñas encriptadas con bcrypt
- Middlewares de autorización por roles
- Protección frente a ataques comunes (validaciones, control de acceso)

🗄️ Base de Datos
- Modelos relacionales optimizados
- Uso de migraciones y seeders
- Consultas eficientes con Sequelize
- Alta escalabilidad y mantenimiento sencillo

⚙️ Requisitos
Node.js v18 o superior
Verificar versión: node --version

🚀 Instalación y ejecución:
📦 Ejecutar servidor local:
cd api
node index.js

🗄️ Base de datos (Sequelize)
Ejecutar migraciones:
npx sequelize-cli migration:generate --name nombre-migracion
🔧 Compilar TypeScript: tsc

🧪 Ejecutar tests: npm test

🏗️ Arquitectura:
🔙 Backend
- Lenguaje: TypeScript
- Entorno: Node.js
- Framework: Express.js
- ORM: Sequelize
- Autenticación: JWT

☁️ Infraestructura
Base de datos: MySQL
Proveedor: Clever Cloud
Características:
- Backups automáticos
- Alta disponibilidad
- Escalabilidad automática

📌 Este proyecto fue desarrollado aplicando buenas prácticas de ingeniería de software:
- Separación de responsabilidades
- Arquitectura escalable
- Código tipado y mantenible
- Seguridad en autenticación y acceso
