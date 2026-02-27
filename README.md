# GestorDeOpiniones
Gestion de Opiniones

## Descripción
Este sistema de gestion de opiniones fue desarrololado con Node.js, Postgres y MongoDB, sistema donde los usuarios pueden Logearse, crear publicaciones y comentar.

## Tecnologías

-Backend: Node.js
-Base de Datos: Postgres y MongoDB
-Autenticación: JWT(JSON web token)
-Correo electronico: SMTP

## Funcionalidades

### 1. Usuarios

- Registro y login: por medio de correo o nombre de usuario y contraseña.
- Edición de perfil
- Seguridad: Token JWT para autenticación
- Restablecimineto de contaseña
- Reenviar codigo de Validación

### 2. Publicaciones

- Creación de publicaciones con:
    Titulo
    Categorio ('Deportes', 'Noticias', 'Eventos ')
    Texto principal
- Editar y Eliminar solo sus propias publicaciones
- Listado de publicaciones

### 3. Comentarios

- Crear comentarios en publicaciones de otros usuarios median el Id de la publicación
- Editar y Eliminar solo propios comentarios
- Listado comentarios por publicación


## Estructura del proyecto

Gestor de Opiniones 
    -Auth-Service
        -configs
        -helpers
        -middlewares
        -src
        -utils
        .env
        index.js
        package.json
    -Publication-Service
        -configs
        -middlewares
        -src
        .env
        index.js
        package.json
    -docker-postgresql-master
        -docker-compose.yml
    README.md

