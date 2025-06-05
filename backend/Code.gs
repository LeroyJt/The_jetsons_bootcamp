/**
 * Código do Google Apps Script para receber POST de módulos e gravar
 * cada submissão em uma planilha Google Sheets na aba "Respostas".
 * Já está inserido o seu SHEET_ID.
 */
function doPost(e) {
  try {
    // Interpreta o corpo da requisição como JSON
    var data = JSON.parse(e.postData.contents);

    // ID da sua planilha (já inserido)
    var SHEET_ID = "1wcNifnoergqUF7cC7aukxyQIyQTvyUixiiQb0l66sxM";
    var ss = SpreadsheetApp.openById(SHEET_ID);

    // Se não existir aba "Respostas", cria e adiciona cabeçalho
    var sheet = ss.getSheetByName("Respostas");
    if (!sheet) {
      sheet = ss.insertSheet("Respostas");
      sheet.appendRow([
        "Timestamp",
        "Módulo",
        "UserID",
        "IP Sem VPN",
        "IP com VPN",
        "IP via Tor",
        "Hash SHA256",
        "Phishing",
        "Nota",
        "Observações"
      ]);
    }

    // Monta os valores a serem gravados em cada coluna
    var linha = [
      data.timestamp || new Date().toISOString(),
      data.modulo      || "",
      data.userId      || "",
      data.ipNormal    || "",
      data.ipVpn       || "",
      data.ipTor       || "",
      data.hash        || "",
      data.phishing    || "",
      (data.nota != null ? data.nota : ""),
      "" // coluna para observações futuras
    ];
    sheet.appendRow(linha);

    // Retorna resposta mínima para o fetch() do front-end
    return ContentService
      .createTextOutput(
        JSON.stringify({ status: "OK" })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(
        JSON.stringify({ status: "ERROR", message: err.toString() })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}
