const URL_API_LOGIN = "https://projetoweb-server.herokuapp.com/login";
let request_login = new XMLHttpRequest();

function enableSearch(enable) {
  document.getElementById("inputSearch").disabled = !enable;
  if (enable) {
    document.getElementsByClassName("searchBtn")[0].classList.add("enable")
  }
}

if (document.cookie.includes("token")) {
  document.getElementsByClassName('loginBtn')[0].style.display = 'none';
  enableSearch(true)
} else {
  enableSearch(false)
}

function login() {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value

  if (validation(email, password)) {

    let data = {
      email,
      password
    }

    fetch(URL_API_LOGIN, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    }).then((response)=>{
      if(response.status == 200){
        document.getElementsByClassName('loginBtn')[0].style.display = 'none';
        document.getElementsByClassName('modal-container')[0].style.display = 'none';
        enableSearch(true)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

}

function validation(email, password) {
  if (email.length < 3) {
    document.getElementsByClassName('errorMessage')[0].style.display = 'flex'
    document.getElementsByClassName('errorMessage')[0].textContent = 'E-mail inválido!'
    return false
  }
  if (password.length < 3) {
    document.getElementsByClassName('errorMessage')[0].style.display = 'flex'
    document.getElementsByClassName('errorMessage')[0].textContent = 'Senha inválida!'
    return false
  }
  return true
}

const submit = document.getElementsByClassName('submitBtn')[0];
submit.addEventListener('click', login);
