/**
 * Apps Script para gravar respostas únicas por aluno (userId)
 * na aba "Respostas" da planilha especificada.
 */

const PLANILHA_ID = '1c3mdhARKEPKWrHghEvIh8ozKZVHaUJQIahrW8aEX6ss';
const NOME_ABA = 'Respostas';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const planilha = SpreadsheetApp.openById(PLANILHA_ID);
    const aba = planilha.getSheetByName(NOME_ABA);
    if (!aba) throw new Error('Aba "Respostas" não encontrada.');

    const ultimaLinha = aba.getLastRow();
    const colUserIds = ultimaLinha > 1
      ? aba.getRange(2, 2, ultimaLinha - 1).getValues().flat()
      : [];

    if (colUserIds.includes(data.userId)) {
      return _jsonResponse({
        sucesso: false,
        mensagem: "Você já respondeu. Só é permitido 1 envio por aluno."
      });
    }

    const novaLinha = [
      data.timestamp || new Date().toISOString(),
      data.userId || "",
      data.modulo || "",
      "", // ipNormal (não usado)
      "", // ipVpn (não usado)
      "", // ipTor (não usado)
      data.hash || "", // resposta do aluno
      "", // phishing (não usado)
      ""  // nota (não usado)
    ];

    aba.appendRow(novaLinha);

    return _jsonResponse({
      sucesso: true,
      mensagem: "Resposta enviada com sucesso!"
    });

  } catch (err) {
    return _jsonResponse({
      sucesso: false,
      mensagem: "Erro no servidor: " + err.message
    });
  }
}

// Gera resposta JSON com CORS liberado
function _jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
