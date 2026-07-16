# Products Test

Aplicación de gestión de productos desarrollada como prueba técnica.

El proyecto está desarrollado con Vue 3 + TypeScript utilizando Vite como herramienta de construcción.

La aplicación está preparada para ejecutarse mediante Docker Compose, levantando los servicios necesarios para el funcionamiento del proyecto.

---

# Estructura del proyecto

```
products-test/
│
├── client/                       # Aplicación frontend Vue
│
├── server/                       # API backend Express + TypeScript
│
├── create.sql                    # Script de creación de base de datos PostgreSQL
│
├── docker-compose.yml            # Orquestación de servicios Docker
│
└── README.md
```

---

# Tecnologías utilizadas

## Frontend

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- Axios
- Zod

## Backend

- Node.js
- Express
- TypeScript

## Base de datos

- PostgreSQL

## Infraestructura

- Docker
- Docker Compose

---

# Requisitos

Versiones recomendadas:

| Tecnología     | Versión |
| -------------- | ------- |
| Docker         | >= 27.x |
| Docker Compose | >= 2.x  |
| Node.js        | >= 24.x |
| npm            | >= 11.x |

Verificar instalaciones:

```bash
docker --version

docker compose version

node -v

npm -v
```

---

# Variables de entorno

El proyecto utiliza archivos `.env` independientes para cada aplicación.

## Cliente

Crear:

```
client/.env
```

basado en:

```
client/.env.example
```

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Servidor

Crear:

```
server/.env
```

basado en:

```
server/.env.example
```

Ejemplo:

```env
PORT=3000

POSTGRES_DB=products_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

---

# Ejecución con Docker

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Este comando:

- Crea el contenedor PostgreSQL
- Ejecuta automáticamente el script `create.sql`
- Levanta la API backend
- Levanta la aplicación frontend

---

# Servicios disponibles

## Frontend

```
http://localhost:5173
```

## API

```
http://localhost:3000
```

## PostgreSQL

```
Host: localhost
Port: 5432
Database: products_db
User: postgres
Password: postgres
```

---

# Desarrollo local

También es posible ejecutar los servicios individualmente.

## Base de datos únicamente

```bash
docker compose up postgres
```

## Backend

```bash
cd server

npm install

npm run dev
```

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# Detener servicios

```bash
docker compose down
```

Para eliminar también la información almacenada en PostgreSQL:

```bash
docker compose down -v
```

---

# Scripts disponibles

## Frontend

### Desarrollo

```bash
npm run dev
```

Ejecuta la aplicación en modo desarrollo.

---

### Build producción

```bash
npm run build
```

Genera la compilación optimizada para producción.

---

### Preview

```bash
npm run preview
```

Permite visualizar la compilación generada.

---

# Funcionalidades

- Listado de productos
- Creación de productos
- Edición de productos
- Eliminación de productos
- Cambio de estado activo/inactivo
- Historial de cambios por producto
- Manejo de estados de carga y errores
- Validaciones de formularios

---

# Arquitectura Frontend

La aplicación utiliza:

- Vue Router para manejo de rutas
- Pinia para gestión de estado global
- Servicios separados para consumo de datos
- Componentes reutilizables
- Tipado mediante TypeScript

---

# Historial de cambios

Cada producto mantiene un registro de eventos:

```
CREATE
UPDATE
STATUS_CHANGE
```

Cada evento contiene:

- Acción realizada
- Descripción del cambio
- Fecha del evento

---

# Documentación API

El proyecto incluye una colección de Postman para probar los endpoints disponibles.

Archivo:

```
products-api.postman_collection.json
```

Para importarla:

1. Abrir Postman.
2. Seleccionar **Import**.
3. Cargar el archivo de colección.

Configurar la variable:

```
baseUrl
```

Ejemplo:

```
http://localhost:3000/api
```

---

# Endpoints disponibles

| Método | Endpoint                | Descripción                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/products`             | Lista todos los productos      |
| POST   | `/products`             | Crea un producto               |
| PUT    | `/products/{id}`        | Actualiza un producto          |
| DELETE | `/products/{id}`        | Elimina un producto            |
| PATCH  | `/products/{id}/status` | Cambia estado del producto     |
