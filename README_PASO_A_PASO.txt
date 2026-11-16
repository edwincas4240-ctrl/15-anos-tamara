# Invitación de los 15 años de Tamara — publicación gratuita

## Archivos
- `index.html`: invitación adaptada para GitHub Pages.
- `Code.gs`: receptor de confirmaciones para Google Apps Script.

## 1. Crear la hoja de cálculo
1. Entra a Google Drive con la cuenta que administrará las confirmaciones.
2. Crea una hoja de cálculo llamada **Confirmaciones 15 años Tamara**.
3. No compartas la hoja públicamente: debe permanecer privada.
4. En la hoja abre **Extensiones → Apps Script**.
5. Borra el contenido de `Código.gs` y pega todo el contenido del archivo `Code.gs` de este paquete.
6. Guarda el proyecto.
7. En el selector de funciones elige `setup` y pulsa **Ejecutar**. Autoriza el acceso solicitado. Esto crea la pestaña `Confirmaciones` y sus encabezados.

## 2. Publicar el receptor de Google Apps Script
1. En Apps Script pulsa **Implementar → Nueva implementación**.
2. Selecciona tipo **Aplicación web**.
3. En **Ejecutar como**, elige **Yo**.
4. En **Quién tiene acceso**, elige **Cualquier persona** (puede aparecer como acceso anónimo según la cuenta). Es necesario porque los invitados no iniciarán sesión en Google.
5. Pulsa **Implementar**, autoriza si se solicita y copia la URL que termina en `/exec`. No uses la URL `/dev`.

> La URL `/exec` es pública porque recibe los formularios. No contiene la contraseña de tu cuenta; aun así, no publiques la hoja de cálculo ni compartas permisos de edición con los invitados.

## 3. Conectar el HTML
1. Abre `index.html` con un editor de texto.
2. Busca `PEGA_AQUI_LA_URL_WEB_APP_DE_GOOGLE_APPS_SCRIPT`.
3. Reemplaza ese texto por la URL `/exec` que copiaste. Conserva las comillas simples.
4. Guarda el archivo.

## 4. Publicar en GitHub Pages
1. En GitHub crea un repositorio nuevo llamado, por ejemplo, `invitacion-tamara-15`.
2. Si GitHub Free te lo pide, configura el repositorio como **Public**.
3. Sube `index.html` a la raíz del repositorio (no dentro de una subcarpeta). Puedes subir también este README; `Code.gs` no es necesario en GitHub y es preferible mantenerlo solo en Apps Script.
4. En el repositorio entra a **Settings → Pages**.
5. En **Build and deployment**, elige **Deploy from a branch**; selecciona `main` y `/ (root)` y pulsa **Save**.
6. Espera a que GitHub publique la página. El enlace será parecido a `https://TU-USUARIO.github.io/invitacion-tamara-15/`.

## 5. Prueba antes de compartir
1. Abre el enlace público desde una ventana privada o desde otro celular.
2. Envía una confirmación de prueba con un nombre identificable como `PRUEBA - borrar`.
3. Abre tu hoja y verifica que aparezca una fila en la pestaña `Confirmaciones`.
4. Si la fila no aparece, revisa **Apps Script → Ejecuciones** y confirma que la implementación esté activa y que pegaste la URL `/exec` correcta.
5. Cuando verifiques el flujo, elimina la fila de prueba.

## Importante sobre la confirmación en pantalla
La página envía el formulario usando una petición `no-cors`, necesaria para evitar el preflight del navegador contra Apps Script. Por esa razón, el navegador no puede leer la respuesta del servidor ni garantizar desde la pantalla que la fila quedó escrita. El mensaje de éxito indica que la solicitud salió del navegador; la comprobación real es ver la fila en Google Sheets.

## Privacidad y seguridad
- La lista de invitados y sus mensajes ya no se muestran en un panel público de la invitación; la administración se hace directamente en la hoja privada.
- No coloques contraseñas, tokens privados ni claves de tu cuenta en `index.html`.
- El endpoint es público para permitir respuestas sin iniciar sesión. El script valida campos, limita longitudes y usa un campo trampa anti-spam, pero un endpoint público puede recibir spam. Revisa la hoja ocasionalmente.
- GitHub Pages requiere que el repositorio sea público en GitHub Free para este escenario. El contenido de la invitación será visible para cualquiera que tenga el enlace y también puede ser indexado; no subas datos privados de invitados al repositorio.
- Las respuestas incluyen nombre, asistencia, pases, dieta/alergias, canción y mensaje, por lo que la hoja debe mantenerse privada.

## Si actualizas el Apps Script
Cuando cambies el código después de desplegarlo, entra en **Implementar → Administrar implementaciones**, edita la implementación y selecciona una nueva versión. La URL `/exec` suele mantenerse igual para esa implementación.
