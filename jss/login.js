const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');
const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-register');
const title = document.getElementById('title');
const toRegister = document.getElementById('to-register');
const toLogin = document.getElementById('to-login');
const loginMsg = document.getElementById('login-msg');
const regMsg = document.getElementById('reg-msg');

function showLogin(){
  btnLogin.classList.add('active'); btnLogin.setAttribute('aria-selected','true');
  btnRegister.classList.remove('active'); btnRegister.setAttribute('aria-selected','false');
  formLogin.classList.remove('form-hidden'); formLogin.classList.add('form-visible');
  formRegister.classList.remove('form-visible'); formRegister.classList.add('form-hidden');
  title.textContent = 'Iniciar Sesión';
  clearMessages();
}

function showRegister(){
  btnRegister.classList.add('active'); btnRegister.setAttribute('aria-selected','true');
  btnLogin.classList.remove('active'); btnLogin.setAttribute('aria-selected','false');
  formRegister.classList.remove('form-hidden'); formRegister.classList.add('form-visible');
  formLogin.classList.remove('form-visible'); formLogin.classList.add('form-hidden');
  title.textContent = 'Crear cuenta';
  clearMessages();
}

btnLogin.addEventListener('click', showLogin);
btnRegister.addEventListener('click', showRegister);
toRegister?.addEventListener('click', e => { e.preventDefault(); showRegister(); });
toLogin?.addEventListener('click', e => { e.preventDefault(); showLogin(); });

function clearMessages(){
  loginMsg.style.display = 'none'; loginMsg.textContent = '';
  regMsg.style.display = 'none'; regMsg.textContent = '';
}

function getUsers(){
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}
function saveUsers(users){
  localStorage.setItem("usuarios", JSON.stringify(users));
}

// Registro
formRegister.addEventListener("submit", e => {
  e.preventDefault();
  const nombres = document.getElementById("reg-nombres").value.trim();
  const apellidos = document.getElementById("reg-apellidos").value.trim();
  const email = document.getElementById("reg-email").value.trim().toLowerCase();
  const pass = document.getElementById("reg-pass").value;

  if(pass.length < 6){
    regMsg.textContent = "La contraseña debe tener al menos 6 caracteres.";
    regMsg.style.display = 'block';
    return;
  }

  let users = getUsers();
  if(users.find(u => u.email === email)){
    regMsg.textContent = "Este usuario ya está registrado.";
    regMsg.style.display = 'block';
    return;
  }

  users.push({ nombres, apellidos, email, pass });
  saveUsers(users);
  regMsg.textContent = "✅ Usuario registrado con éxito.";
  regMsg.style.display = 'block';
  formRegister.reset();

  setTimeout(() => showLogin(), 800);
});

//Login
formLogin.addEventListener("submit", e => {
  e.preventDefault();
  const user = document.getElementById("login-user").value.trim().toLowerCase();
  const pass = document.getElementById("login-pass").value;
  const found = getUsers().find(u => u.email === user && u.pass === pass);

  if(!found){
    loginMsg.textContent = "❌ Usuario o contraseña incorrectos.";
    loginMsg.style.display = 'block';
    return;
  }

  localStorage.setItem("usuarioActivo", JSON.stringify(found));
  // Redirigir al index.html
  window.location.href = "index.html";
});

window.addEventListener('DOMContentLoaded', () => {
  clearMessages();
  showLogin();
});
