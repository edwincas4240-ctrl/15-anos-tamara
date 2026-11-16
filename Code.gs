const SHEET_NAME = 'Confirmaciones';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getSheets()[0]; // Usa la primera pestaña si no encuentra el nombre exacto
    }

    const data = JSON.parse(e.postData.contents);
    
    // Las columnas de tu hoja: Fecha, Invitado, Asistencia, Pases, Alergias, Canción, Mensaje
    const fecha = new Date();
    sheet.appendRow([
      fecha,
      data.Invitado || '',
      data.Asistencia || '',
      data.Pases || '',
      data.Alergias || '',
      data.Canción || '',
      data.Mensaje || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Servicio de confirmaciones de Tamara activo.");
}