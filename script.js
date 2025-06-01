function startBootcamp() {
    const id = document.getElementById('studentId').value.trim();
    if (!id) {
        alert('Por favor, digite seu número de aluno.');
        return;
    }
    // Esconder login, mostrar atividades
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('activities-section').style.display = 'block';
    // Guardar o ID para salvar junto com respostas
    window.studentId = id;
}

document.getElementById('activities-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const ipCmd = document.getElementById('ipCmd').value.trim();
    const ipVpn = document.getElementById('ipVpn').value.trim();
    const ipTor = document.getElementById('ipTor').value.trim();
    const hash = document.getElementById('hash').value.trim();

    if (!ipCmd || !ipVpn || !ipTor || !hash) {
        alert('Por favor, preencha todas as respostas.');
        return;
    }

    const content = 
`Aluno ID: ${window.studentId}
Atividade THE_JETSONS_BOOTCAMP

1. IP via CMD: ${ipCmd}
2. IP via VPN: ${ipVpn}
3. IP via TOR: ${ipTor}
4. Hash extraído: ${hash}
`;

    // Criar arquivo para download
    const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `respostas_aluno_${window.studentId}.txt`;
    link.click();

    document.getElementById('result-msg').textContent = 'Respostas salvas! Faça upload deste arquivo para o instrutor.';
    this.reset();
});
