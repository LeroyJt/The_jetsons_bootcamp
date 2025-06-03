/**
 * Apps Script (backend) para receber POST das páginas estáticas e 
 * gravar respostas na aba “Respostas”, sem permitir nova tentativa
 * do mesmo userId.
 */
const PLANILHA_ID = '1c3mdhARKEPKWrHghEvIh8ozKZVHaUJQIahrW8aEX6ss';
const NOME_ABA = 'Respostas';

// Função que recebe POST do fetch() e grava na planilha
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const planilha = SpreadsheetApp.openById(PLANILHA_ID);
    const aba = planilha.getSheetByName(NOME_ABA);
    if (!aba) {
      throw new Error('Aba "Respostas" não encontrada.');
    }

    // Coluna B armazena userId (número de chamada)
    const ultimaLinha = aba.getLastRow();
    const colUserIds = ultimaLinha > 1
      ? aba.getRange(2, 2, ultimaLinha - 1).getValues().flat()
      : [];

    if (colUserIds.includes(data.userId)) {
      // Já respondeu antes
      return ContentService
        .createTextOutput(JSON.stringify({
          sucesso: false,
          mensagem: "Você já respondeu. Não é possível enviar novamente."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Monta linha para gravar: Timestamp, userId, IPs, hash, phishing, nota
    const novaLinha = [
      data.timestamp || new Date().toISOString(),
      data.userId || "",
      data.modulo || "",
      data.ipNormal || "",
      data.ipVpn || "",
      data.ipTor || "",
      data.hash || "",
      data.phishing || "",
      data.nota != null ? data.nota : ""
    ];
    aba.appendRow(novaLinha);

    return ContentService
      .createTextOutput(JSON.stringify({
        sucesso: true,
        mensagem: "Resposta enviada com sucesso!"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        sucesso: false,
        mensagem: "Erro no servidor: " + err.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
