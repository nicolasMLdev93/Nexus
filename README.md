# Nexus:

Nexus es una aplicación backend de microblogging que replica las funcionalidades principales de redes sociales modernas. 
Desarrollada con TypeScript y una arquitectura robusta, permite la creación de posts, comentar dichos posts, dar likes y hacer re-posteos de los mismos.
Implementa tecnologías como Node.js + Express para gestionar las diferentes rutas de acción y Sequelize como ORM para conectar las bases de datos relacionales con la aplicación backend, lo cual hace el proyecto
sumamente escalable y fácil de manipular con total seguridad.
Las bases de datos MySQL están desplegadas en Clever Cloud, asegurando un entorno de producción robusto, escalable y con mantenimiento automatizado, lo que garantiza un tiempo de actividad óptimo.

Características Principales:

📝 Publicaciones:
* Crear, editar y eliminar posts
* Sistema de re-posts (retweets)
* Límite de caracteres configurable

🔐 Autenticación y Seguridad:
* Registro e inicio de sesión seguro
* Tokens JWT para autenticación
* Contraseñas encriptadas con bcrypt
* Middlewares de autorización
* Protección contra ataques comunes

🗄️ Base de Datos:
* Modelos relacionales optimizados
* Migraciones y seeders
* Consultas eficientes con Sequelize ORM
* Escalabilidad

Versión Node.js 18 o superior:
node --version

Correr el servidor local:
cd api y luego node index.js

Ejecutar migraciones con Sequelize:
npx sequelize-cli db:migrate

Crear una nueva migración:
npx sequelize-cli migration:generate --name nombre-migracion --attributes (todos los atributos con los tipos de datos de cada uno de ellos);

Compilar TypeScript:
tsc

Ejecutar tests:
npm test

Ejemplo para ejecutar una acción luego de estar loggeado:
Authorization: Bearer {token}
Content-Type: application/json

⭐ ¡Dale una estrella al proyecto si te gusta! 
