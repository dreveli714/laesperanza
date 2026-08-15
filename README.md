# 🌾 Finca La Esperanza — App (prototipo)

App web para registrar trabajadores, ventas y gastos de la finca. **Funciona sin conexión**: todo se guarda en el teléfono y sube solo a Google cuando hay señal (una vez conectes el Apps Script, que es el paso 2).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La app completa (esto es lo que se abre) |
| `manifest.json` | Hace que se pueda "instalar" en el celular |
| `sw.js` | Service worker: permite que abra sin internet |
| `icon.svg` | Ícono de la app |

## Cómo probarla ahora mismo

Ábrela en el navegador. Ya puedes:
- Registrar trabajadores (con actividades de un toque: **Cosecha de cacao / Cosecha de verde / Construcción cerca**, y agregar nuevas).
- Registrar ventas con **foto de comprobante opcional** (se comprime sola).
- Registrar gastos.
- Ver **Análisis** (totales del día/semana, ganancia neta, gráficos, tendencia del precio del cacao).
- **Corregir o eliminar** registros, y **agregar la foto después**.
- Descargar la tabla en CSV (se abre en Excel/Sheets).

> Nota: dentro de la vista previa del chat quizá los datos no se guarden al recargar. En tu teléfono o en GitHub Pages **sí quedan guardados de forma permanente**.

## Subirla a GitHub Pages (link público)

1. Crea un repositorio nuevo en GitHub.
2. Sube los 4 archivos (`index.html`, `manifest.json`, `sw.js`, `icon.svg`) a la raíz.
3. En el repo: **Settings → Pages → Source: Deploy from a branch → main / root → Save**.
4. En un minuto te da un link tipo `https://tu-usuario.github.io/tu-repo/`.
5. Ábrelo en el celular y usa **"Agregar a pantalla de inicio"**: queda como una app.

## Paso 2 (siguiente): conectar Google Sheets + Drive

Todavía **no** está hecho el Apps Script. Cuando lo tengamos, solo tendrás que pegar en **Ajustes ⚙️** de la app:
- la **URL** del Apps Script,
- un **token secreto** (una clave que tú inventes),
- y el **enlace a tu Google Sheet** (para el botón de Reportes).

A partir de ahí, todo lo pendiente sube solo.

### Contrato que debe cumplir el Apps Script (para quien lo programe)

La app envía un **POST** con el cuerpo en JSON:

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
    "semana": "10 Ago - 16 Ago 2026"
  },
  "foto": "data:image/jpeg;base64,...."   // o null
}
```

El Apps Script debe:
1. Verificar que `token` coincide (si no, responder `{ "ok": false }`).
2. Agregar la fila a la hoja (columnas A–N; `total` e `id` ya vienen calculados, se escriben como **valores**).
3. Si viene `foto`, guardarla en Drive creando carpetas **Año → Mes** y nombrando el archivo con fecha/producto/total.
4. Responder `{ "ok": true, "comprobanteUrl": "https://drive.google.com/..." }`.

La app guarda ese `comprobanteUrl` en la fila y marca el registro como sincronizado.

---

**Versión:** prototipo v1 · offline-first · sin backend aún
