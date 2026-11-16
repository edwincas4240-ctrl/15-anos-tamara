/**
 * Confirmaciones RSVP - 15 años de Tamara Castiblanco Trujillo
 * Este proyecto debe crearse desde Extensiones > Apps Script dentro de la hoja.
 */
const SHEET_NAME = 'Confirmaciones';
const HEADERS = [
  'ID', 'Fecha de registro', 'Invitado', 'Asistencia', 'Asiste', 'Pases',
  'Alergias / dieta', 'Canción sugerida', 'Mensaje para Tamara'
];

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Abre Apps Script desde la hoja de cálculo de confirmaciones.');
  ss.setSpreadsheetTimeZone('America/Bogota');
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, HEADERS.length);
  }
  return 'Hoja preparada: ' + ss.getUrl();
}

function doGet() {
  return ContentService
    .createTextOutput('Servicio de confirmaciones de Tamara activo.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    // Campo trampa anti-spam: los humanos no lo ven ni lo completan.
    if (String(data.website || '').trim() !== '') {
      return output_('ok');
    }

    const name = clean_(data.invitado, 120);
    const attendance = clean_(data.asistencia, 40);
    if (!name || !attendance) return output_('missing_required_fields');

    const attending = data.asiste === true || attendance.toLowerCase().includes('sí');
    const passes = attending ? Math.max(1, Math.min(20, parseInt(data.pases, 10) || 1)) : 0;
    const dietary = clean_(data.alergias_dieta, 500);
    const song = clean_(data.cancion_sugerida, 200);
    const message = clean_(data.mensaje, 1000);
    const eventName = clean_(data.evento, 120);
    if (eventName !== '15 Años Tamara Castiblanco Trujillo') return output_('invalid_event');

    lock.waitLock(15000);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    const timestamp = new Date();
    sheet.appendRow([
      Utilities.getUuid(), timestamp, name, attendance, attending ? 'Sí' : 'No',
      passes, dietary, song, message
    ]);
    return output_('saved');
  } catch (err) {
    console.error(err);
    return output_('error');
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function clean_(value, maxLength) {
  return String(value == null ? '' : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, maxLength);
}

function output_(message) {
  return ContentService.createTextOutput(message).setMimeType(ContentService.MimeType.TEXT);
}
