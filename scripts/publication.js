const idModalPublication = "modal-publication";
const formPublication = document.getElementById(idModalPublication).getElementsByTagName("form")[0];
const buttonSubmit = formPublication.getElementsByTagName("button")[0];

function doPublication() {
    const inputTitle = document.getElementById("title-pub").value;
    const inputContent = document.getElementById("content-pub").value;

    closeModalToDoPublication();
}

function closeModalToDoPublication() {
    document.getElementsByClassName('modal-container')[1].classList.remove("show");
}

buttonSubmit.addEventListener("click", doPublication)