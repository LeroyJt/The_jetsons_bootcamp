// Estado do bootcamp
let alunoID = "";
const respostas = {};

function startBootcamp() {
  const idInput = document.getElementById("alunoID");
  if (idInput.value.trim() === "") {
    alert("Por favor, digite seu número de aluno para continuar.");
    return;
  }
  alunoID = idInput.value.trim();
  mostrarPagina("atividade1");
}

function mostrarPagina(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
    page.classList.remove("active");
  });
  const pagina = document.getElementById(id);
  if(pagina) {
    pagina.classList.remove("hidden");
    pagina.classList.add("active");
  }
}

function salvarResposta(num) {
  const textarea = document.getElementById("resposta" + num);
  if (!textarea.value.trim()) {
    alert("Por favor, preencha sua resposta antes de salvar.");
    return;
  }
  respostas["atividade" + num] = textarea.value.trim();
  alert("Resposta da atividade " + num + " salva.");
}

function proximaAtividade(num) {
  if (num <= 5) {
    mostrarPagina("atividade" + num);
  }
}

function finalizarBootcamp() {
  // Salvar última resposta
  salvarResposta(5);
  mostrarPagina("final");
  const pre = document.getElementById("respostasSalvas");
  let texto = `Aluno: ${alunoID}\n\n`;
  for(let i=1; i<=5; i++) {
    texto += `Atividade ${i}:\n${respostas["atividade"+i] || "(Sem resposta)"}\n\n`;
  }
  pre.textContent = texto;
  // Aqui você pode também salvar esse texto localmente com APIs, ou pedir para copiar
  alert("Bootcamp finalizado! Copie suas respostas para enviar ao instrutor.");
}
