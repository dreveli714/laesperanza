# 🌾 Finca La Esperanza — App

App web para registrar **trabajador, ventas y gastos** de la finca y armar el **planificador semanal de tareas** (una imagen lista para enviarle al trabajador). **Funciona sin conexión**: todo se guarda en el teléfono y sube solo a Google cuando hay señal (una vez conectes el Apps Script, que es el paso 2).

## Archivos (súbelos TODOS a la raíz del repo)

| Archivo | Qué es |
|---|---|
| `index.html` | La app completa (esto es lo que se abre) |
| `manifest.json` | Hace que se pueda "instalar" en el celular |
| `sw.js` | Service worker: permite que abra sin internet |
| `logo.jpg` | Logo completo de la finca (encabezado, reportes y planificador) |
| `logo-badge.jpg` | Emblema recortado del logo (círculo del encabezado) |
| `icon-192.png`, `icon-512.png` | Íconos de la app instalada |
| `icon.svg` | Ícono alterno (maskable) |

## Qué hace la app

- **Trabajador:** eliges a *Washington* (o agregas otro), la **forma de pago** (Jornal $15 · Guadaña $30 · Rodeo de vacas $5) y marcas en el **calendario los días** trabajados. El total = tarifa × número de días.
- **Venta:** Cacao en libras, Caja de verde, Litro de leche (u otro). Acepta **coma o punto** en los decimales. Foto de comprobante **opcional** (se abre la **galería**, se comprime sola, se puede agregar después).
- **Gasto:** categorías editables + costo + foto opcional.
- **Semana (planificador):** escribe/selecciona las tareas → genera una **imagen PNG** con el logo (estilo de las tareas que envías por WhatsApp), en modo *Plan (a hacer)* o *Realizadas*. El bloque de **vacas (todos los días)** ya viene puesto. Se puede **compartir/descargar** y **guardar en registros**.
- **Análisis:** totales del día/semana/todo, ganancia neta, gráficos y tendencia del precio del cacao.
- **Reportes:** **PDF** con el resumen (ingresos, egresos, ganancia + detalle + logo) y **CSV** para Excel/Sheets.

> Nota: dentro de la vista previa del chat quizá los datos no se guarden al recargar. En tu teléfono o en GitHub Pages **sí quedan guardados de forma permanente**.

## Subirla a GitHub Pages (link público)

1. Sube **todos** los archivos de arriba a la raíz del repo (el principal debe llamarse exactamente `index.html`).
2. **Settings → Pages → Source: Deploy from a branch → main / root → Save**.
3. En un minuto te da un link tipo `https://tu-usuario.github.io/tu-repo/`.
4. Ábrelo en el celular y usa **"Agregar a pantalla de inicio"**: queda como una app.

## Paso 2 (siguiente): conectar Google Sheets + Drive

Todavía **no** está hecho el Apps Script. Cuando lo tengamos, solo pegarás en **Ajustes ⚙️** de la app: la **URL** del Apps Script, un **token secreto** y el **enlace a tu Google Sheet**. A partir de ahí, todo lo pendiente sube solo.

### Contrato que debe cumplir el Apps Script (para quien lo programe)

La app envía un **POST** (`Content-Type: text/plain`) con el cuerpo en JSON:

```json
{
  "token": "la-clave-secreta",
  "registro": {
    "id": "20260815-143022-a7",
    "fecha": "2026-08-15",
    "tipo": "Venta-Cacao",
    "nombreDesc": "Cacao en libras",
    "detalle": "50 libras",
    "cantidad": 50,
    "unidad": "libras",
    "precio": 2.5,
    "total": 125,
    "categoria": "Ingreso",
    "notas": "",
    "semana": "10 Ago - 16 Ago 2026",
    "comprobanteUrl": ""
  },
  "foto": "data:image/jpeg;base64,...."   // o null
}
```

El Apps Script debe:
1. Verificar que `token` coincide (si no, responder `{ "ok": false }`).
2. Agregar una fila con las **columnas A–N** en este orden:
   `id · fecha · tipo · nombreDesc · detalle · cantidad · unidad · precio · total · categoria · notas · semana · comprobanteUrl · sync`
   (`total`, `id`, etc. ya vienen calculados; escribir como **valores**).
3. Si viene `foto`, guardarla en Drive creando carpetas **Año → Mes**, y nombrando el archivo con fecha/concepto/total.
4. Responder `{ "ok": true, "comprobanteUrl": "https://drive.google.com/..." }`.

**Tipos de `registro` que llegan** (todos usan el mismo formato):

| `categoria` | `tipo` | Notas para la hoja |
|---|---|---|
| `Ingreso` | `Venta-Cacao` / `Venta-Leche` | venta normal; puede traer `foto`. |
| `Egreso` | `Trabajador` | pago por **varios días**: `cantidad` = nº de días, `precio` = tarifa, `total` = tarifa×días, `notas` = lista de fechas marcadas (`"2026-08-10, 2026-08-11, ..."`). |
| `Egreso` | `Egreso` | gasto general; puede traer `foto`. |
| `Plan` | `Planificador` | **tarea semanal**. `total` = 0. `nombreDesc` = *"Plan de la semana"* o *"Tareas realizadas"*. `detalle` = etiqueta de la semana. `notas` = JSON `{"vacas":[...],"tareas":[...]}`. Conviene guardarlo en una **pestaña aparte** ("Planificador") o filtrarlo para que **no afecte** los totales de ingresos/egresos. Nunca trae `foto`. |

> Recomendación: en la hoja de finanzas, ignora las filas con `categoria = "Plan"` al sumar ingresos/egresos (la app ya lo hace en Análisis y Reportes).

---

**Versión:** v3 · offline-first · logo integrado · planificador semanal · sin backend aún (paso 2 pendiente)
