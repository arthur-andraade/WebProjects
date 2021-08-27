function showModal(idModal){
  const modal = document.getElementById(idModal);
  if(modal){
    modal.classList.add('show');//adiciona a estilização (show) do css, ou seja, faz aparecer o modal.
    modal.addEventListener('click', (event)=>{
      event.preventDefault()
      if(event.target.id == 'idModal' || event.target.className == 'closeBtn'){
        modal.classList.remove('show')
      }
    })
  }
}

const loginButton = document.querySelector('.loginBtn');
loginButton.addEventListener('click', () => {
  showModal('background-modal')
})

const registerButton = document.querySelector('.registerBtn');
registerButton.addEventListener('click', () => {
  showModal('background-modal-register')
})