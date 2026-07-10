# Sanidapp

Aplicación móvil multiplataforma (React Native + Expo Router) para la consulta de protocolos de atención sanitaria con enfoque académico y científico.

## Stack

- Expo SDK 54 (compatible con Expo Go de Play Store)
- Expo Router (navegación por archivos)
- TypeScript
- Contenido versionado en `content/` y consumido desde GitHub Raw

## Estructura

```
src/
  app/                 # Rutas (Expo Router)
  components/          # UI, layout, protocolo, QR
  services/            # GitHub + contenido
  theme/               # Estilo "Catedrático Soft"
  types/               # Tipos de manifest y protocolos
content/               # Fuente de verdad del contenido clínico
```

## Flujo de navegación

1. Splash → carga de manifest
2. Home (drawer) → ADULTO / PEDIÁTRICO
3. Listado de protocolos → Escáner QR / detalle
4. Drawer → Impresión de QR
5. Escáner QR → abre protocolo directamente (`sanidapp://protocol/{id}`)

## Desarrollo

```bash
npm install
npm start
```

## Añadir un protocolo de enfermería

Cada protocolo nuevo aparece automáticamente en la app y en **Impresión de QR** tras publicarlo en GitHub.

### 1. Crear el archivo del protocolo

`content/branches/atencion-sanitaria/categories/{adulto|pediatrico}/protocols/{id}.json`

```json
{
  "id": "cur-002",
  "title": "Administración de medicación intravenosa",
  "category": "adulto",
  "branch": "atencion-sanitaria",
  "version": "1.0",
  "executiveSummary": "Resumen breve para la práctica clínica.",
  "body": "## Procedimiento\n\nContenido en Markdown...",
  "bibliography": [
    { "citation": "Referencia bibliográfica actualizada." }
  ]
}
```

### 2. Registrar en el índice de la categoría

Editar `categories/{categoria}/index.json` y añadir una entrada en `protocols`:

```json
{
  "id": "cur-002",
  "title": "Administración de medicación intravenosa",
  "category": "adulto",
  "branch": "atencion-sanitaria",
  "version": "1.0"
}
```

### 3. Publicar en GitHub

```bash
git add content/
git commit -m "Añadir protocolo cur-002"
git push
```

### 4. QR automático

No hace falta definir el QR manualmente. La app genera `sanidapp://protocol/{id}`.
El código aparece en el menú **Impresión de QR**, listo para que los efectores lo impriman.
Al actualizar bibliografías o contenido, el mismo QR muestra la versión nueva.

### Respaldo offline (opcional para desarrollo)

Si necesitás probar sin conexión, añadir el protocolo en `src/services/content/localRegistry.ts`.

## Formato del contenido

El campo `body` de cada protocolo se escribe en **Markdown** (encabezados, listas, tablas, citas, negritas y enlaces).

## Repositorio

https://github.com/GR2206/Sanidapp
