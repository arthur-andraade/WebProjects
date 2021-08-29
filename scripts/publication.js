const URL_TO_DO_PUBLICATION = "https://projetoweb-server.herokuapp.com/makepub";
const URL_TO_DO_SEARCH_PUBLICATION = "https://projetoweb-server.herokuapp.com/publication?";
const idModalPublication = "modal-publication";
const formPublication = document.getElementById(idModalPublication).getElementsByTagName("form")[0];
const buttonSubmit = formPublication.getElementsByTagName("button")[0];
const buttonSearch = document.getElementsByClassName("search")[0].getElementsByClassName("searchBtn")[0]
const token = localStorage.getItem("token");

function doPublication() {
    const title = document.getElementById("title-pub").value;
    const content = document.getElementById("content-pub").value;
    
    fetch(URL_TO_DO_PUBLICATION, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: "same-origin",
        body: JSON.stringify({ title, content })
    }).then((response) => {
        return response.json();
    }).then(json => {
        console.log(json);
    });

    closeModalToDoPublication();
}

function searchPublication() {
    const publicationToSearch = document.getElementById("inputSearch").value;
    const search = `search=${publicationToSearch}`;
    fetch(URL_TO_DO_SEARCH_PUBLICATION + search, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: "same-origin",
    }).then((response) => {
        return response.json();
    }).then((json)=>{
        console.log(json);
    })
}

function closeModalToDoPublication() {
    document.getElementsByClassName('modal-container')[1].classList.remove("show");
}

buttonSubmit.addEventListener("click", doPublication);
buttonSearch.addEventListener("click" , searchPublication);