const URL_TO_DO_PUBLICATION = "https://projetoweb-server.herokuapp.com/makepub";
const idModalPublication = "modal-publication";
const formPublication = document.getElementById(idModalPublication).getElementsByTagName("form")[0];
const buttonSubmit = formPublication.getElementsByTagName("button")[0];

function doPublication() {
    const title = document.getElementById("title-pub").value;
    const content = document.getElementById("content-pub").value;

    fetch(URL_TO_DO_PUBLICATION, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify({ title, content })
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error);
    });

    closeModalToDoPublication();
}

function closeModalToDoPublication() {
    document.getElementsByClassName('modal-container')[1].classList.remove("show");
}

buttonSubmit.addEventListener("click", doPublication)