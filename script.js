document.getElementById('saveBtn').addEventListener('click', () => {
  const userId = document.getElementById('userId').value.trim();
  const ipNormal = document.getElementById('ipNormal').value.trim();
  const ipVpn = document.getElementById('ipVpn').value.trim();
  const ipTor = document.getElementById('ipTor').value.trim();
  const hashFile = document.getElementById('hashFile').value.trim();
  const phishingDetect = document.getElementById('phishingDetect').value.trim();

  if (!userId) {
    alert('Por favor, informe seu número de identificação.');
    return;
  }

  const content = `
THE_JETSONS_BOOTCAMP - RESPOSTAS DO ALUNO

Número de identificação: ${userId}

1. IP normal via CMD:
${ipNormal}

2. IP com VPN ativo:
${ipVpn}

3. IP com TOR ativo:
${ipTor}

4. Hash do arquivo via CMD:
${hashFile}

5. Detecção de phishing (descreva o que encontrou):
${phishingDetect}
`;

  const blob = new Blob([content], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `respostas_${userId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});
