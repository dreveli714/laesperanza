# 🌿 Finca La Esperanza

App web (PWA) para gestionar una finca de cacao y ganado en Ecuador.

## 📦 Cómo instalar en GitHub Pages

1. Sube TODO el contenido de esta carpeta al repositorio (reemplaza el viejo):
   - `index.html` — la app
   - `sw.js` — service worker (para que abra sin internet)
   - `manifest.json` — para instalar como app en el iPhone
   - `icon-192.png`, `icon-512.png`, `logo.jpg` — íconos

2. Espera 1-2 minutos y abre tu URL de GitHub Pages.

## 📱 Instalar en el iPhone

1. Abre la URL en Safari.
2. Toca el botón compartir 🔗 abajo.
3. "Añadir a pantalla de inicio".
4. La app aparece con su ícono. Ábrela como cualquier app.

## ⚙️ Conectar con Google Sheets

La URL del Apps Script y el token **ya están guardados dentro del código**.
Solo asegúrate de que el Apps Script tenga el código de `AppsScript.gs`
pegado y publicado como aplicación web con acceso "Cualquier usuario".

### Pasos si necesitas reconfigurar

1. Abre tu Google Sheet → Extensiones → Apps Script.
2. Pega TODO el contenido de `AppsScript.gs`.
3. Guarda 💾.
4. Menú "Implementar" → "Administrar implementaciones" → lápiz ✏️ →
   Versión: "Nueva versión" → Implementar.

### Probar que funciona (opcional pero recomendado)

En el editor del Script:
- Arriba hay un dropdown "Selecciona una función" → elige `testConexion`.
- Toca ▶️ Ejecutar.
- La primera vez pide permisos → acepta.
- Abajo aparece "Registros de ejecución" — debe mostrar cuántas filas
  tiene cada pestaña de tu Sheet.

## 🌟 Qué tiene la app

- **Inicio**: balance, ganancia del mes, KPIs, alertas, botones rápidos
- **Registrar** (botón central ➕): venta, gasto, trabajador, producción, leche, caja
- **La finca**: animales, inventario, planificador, leche
- **Análisis**: gráficos por mes (dona de gastos, barras de ingresos, cacao por estado)
- **Más**: historial de movimientos (editar/borrar), análisis, ajustes

## 📊 Estructura de datos

Todo va a un Google Sheet con estas pestañas:
- **Registros** — ventas, gastos, jornales (todo lo financiero)
- **Caja** — recargas de caja chica
- **Leche** — producción diaria
- **Animales** — ganado
- **Salud** — vacunas y medicinas por vaca
- **Inventario** — insumos
- **Produccion** — cosechas
- **Planificador** — planes semanales

Los datos viejos con fechas rotas (`0226-08-21`) o nombres inconsistentes
(Betty/Bethy) se corrigen automáticamente al cargar.
