const emailRegister = document.getElementById("emailRegister");
const usernameRegister = document.getElementById("usernameRegister");
const passwordRegister = document.getElementById("passwordRegister");

const URL_SIGNUP = "https://projetoweb-server.herokuapp.com/register";

function register(){
  
  email = emailRegister.value;
  username = usernameRegister.value
  password = passwordRegister.value
  

  if(validationRegister(email, username, password)){

    
    let data = {
      email,
      username,
      password
    }

    fetch(URL_SIGNUP, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    }).then((response) => {
      if(response.status == 200){
        document.getElementsByClassName('modal-container-register')[0].style.display = 'none'
      }else if(response.status == 409){
        document.getElementsByClassName('errorMessageRegister')[0].style.display = 'flex'
      }
    })
  }
}

function validationRegister(email, username, password){
  if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    document.getElementsByClassName("errorMessageRegister")[0].style.display = 'flex';
    document.getElementsByClassName('errorMessageRegister')[0].textContent = 'E-mail inválido!'
    return false;
  }
  if(email === ""){
    document.getElementsByClassName("errorMessageRegister")[0].style.display = 'flex';
    document.getElementsByClassName('errorMessageRegister')[0].textContent = 'Nome de usuário vazio!'
    return false;
  }
  if(username === ""){
    document.getElementsByClassName("errorMessageRegister")[0].style.display = 'flex';
    document.getElementsByClassName('errorMessageRegister')[0].textContent = 'Senha vazia!'
    return false;
  }
  if(password.length < 3){
    document.getElementsByClassName('errorMessage')[0].style.display = 'flex'
    document.getElementsByClassName('errorMessage')[0].textContent = 'Senha muito curta!'
    return false
  }

  return true;
}

const submitRegister = document.getElementsByClassName('submitBtnRegister')[0];
submitRegister.addEventListener('click', register);
