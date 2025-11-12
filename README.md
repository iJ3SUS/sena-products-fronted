# SENA Products Frontend

Frontend para el sistema de gestión de productos desarrollado con Vue.js

## Importante (Antes de instalar)

**Se debe instalar el backend que se encuentra en:**

`https://github.com/iJ3SUS/sena-products-api`

**Nota:** Si ya clonaron el repositorio del backend anteriormente, por favor bajen los últimos cambios del mismo, ya que se hicieron ajustes importantes.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
renombrar el archivo `.env-example` a `.env` y reemplazar la variable `VITE_API_URL` con la URL de la API del backend.
```bash
cp .env-example .env
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

## Estructura del proyecto

- `src/components/` - Componentes reutilizables
- `src/views/` - Vistas principales
- `src/stores/` - Gestión de estado con Pinia
- `src/composables/` - Composables de Vue
- `src/utils/` - Utilidades y helpers

## Tecnologías utilizadas

- Vue.js 3
- Vite
- Pinia (gestión de estado)
- Vue Router
- Tailwind CSS

## Scripts disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar para producción
- `npm run preview` - Previsualizar build de producción