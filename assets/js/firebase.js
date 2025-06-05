// ======================================
// 1) Dependências do Firebase
// ======================================
// Use as versões compat das bibliotecas para funcionar em HTML direto
// (Sem precisar de bundler ou Node.js)
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>

<script>
// ======================================
// 2) Configuração do Firebase
// ======================================
const firebaseConfig = {
  apiKey: "AIzaSyDkeLoEBgOhgsYd3qRUKQtWQ002R-JCGJQ",
  authDomain: "bootcamp-d5e0c.firebaseapp.com",
  databaseURL: "https://bootcamp-d5e0c-default-rtdb.firebaseio.com",
  projectId: "bootcamp-d5e0c",
  storageBucket: "bootcamp-d5e0c.appspot.com",
  messagingSenderId: "538262163959",
  appId: "1:538262163959:web:e28ba875429317b5d99ef2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ======================================
// 3) Funções auxiliares
// ======================================

// Checa se o usuário já enviou resposta para um determinado módulo
function conferirTentativaUnica(modulo, userId) {
  return db.ref(`respostas/${modulo}/${userId}`).get().then(snapshot => {
    return snapshot.exists(); // true se já existe
  });
}

// Salva respostas de um módulo específico
function enviarRespostas(modulo, userId, payload) {
  return db.ref(`respostas/${modulo}/${userId}`).set(payload);
}

// Lê todas as respostas (para ranking)
function obterTodasRespostas() {
  return db.ref('respostas').get().then(snapshot => {
    return snapshot.val(); // objeto { modulo1: { userId: { ... } }, modulo2: {...}, ... }
  });
}
</script>
