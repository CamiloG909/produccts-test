# Products Test

Aplicación de gestión de productos desarrollada como prueba técnica.

El proyecto está desarrollado con Vue 3 + TypeScript utilizando Vite como herramienta de construcción.

---

# Estructura del proyecto

```
produccts-test/
│
├── client/          # Aplicación frontend Vue
│
├── create.sql       # Script de creación de base de datos PostgreSQL
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

## Base de datos

- PostgreSQL

---

# Requisitos

Versiones recomendadas:

| Tecnología | Versión |
| ---------- | ------- |
| Node.js    | >= 24.x |
| npm        | >= 11.x |
| Python     | >= 3.11 |
| PostgreSQL | >= 16.x |

Verificar instalaciones:

```bash
node -v

npm -v

psql --version
```

---

# Configuración de base de datos

Crear una base de datos PostgreSQL:

```sql
CREATE DATABASE products_db;
```

Ejecutar el script de creación incluido en el proyecto:

```bash
psql -U postgres -d products_db -f create.sql
```

El script creará las tablas necesarias y sus relaciones.

---

# Instalación del proyecto

Ingresar a la carpeta del cliente:

```bash
cd client
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear el archivo `.env` basado en el archivo de ejemplo:

```bash
cp .env.example .env
```

Configurar las variables necesarias.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

---

# Ejecución en desarrollo

Iniciar la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

# Scripts disponibles

## Desarrollo

```bash
npm run dev
```

Ejecuta la aplicación en modo desarrollo.

---

## Build producción

```bash
npm run build
```

Genera la compilación optimizada para producción.

---

## Preview

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

Configurar la variable:

```
baseUrl
```