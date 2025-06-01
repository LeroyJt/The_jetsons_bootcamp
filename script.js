function startBootcamp() {
  const id = document.getElementById("studentId").value.trim();
  if (!id) {
    alert("Digite seu ID de aluno para continuar.");
    return;
  }

  localStorage.setItem("student_id", id);
  document.getElementById("activities").classList.remove("hidden");
}

function saveAnswers() {
  const answers = {
    id: localStorage.getItem("student_id"),
    ipNormal: document.getElementById("ipNormal").value,
    ipVPN: document.getElementById("ipVPN").value,
    ipTor: document.getElementById("ipTor").value,
    hash: document.getElementById("hash").value,
    timestamp: new Date().toISOString()
  };

  localStorage.setItem("bootcamp_answers", JSON.stringify(answers));
  alert("Respostas salvas localmente.");
}

function exportAnswers() {
  const answers = JSON.parse(localStorage.getItem("bootcamp_answers") || "{}");
  let text = `BOOTCAMP - THE JETSONS\nID: ${answers.id}\n\n`;
  text += `IP Normal: ${answers.ipNormal}\n`;
  text += `IP com VPN: ${answers.ipVPN}\n`;
  text += `IP com Tor: ${answers.ipTor}\n`;
  text += `Hash: ${answers.hash}\n`;
  text += `Data: ${answers.timestamp}`;

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `respostas_${answers.id || "semID"}.txt`;
  link.click();
}
