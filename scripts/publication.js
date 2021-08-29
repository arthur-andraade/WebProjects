const URL_TO_DO_PUBLICATION = "https://projetoweb-server.herokuapp.com/makepub";
const URL_TO_DO_SEARCH_PUBLICATION = "https://projetoweb-server.herokuapp.com/publication?";
const idModalPublication = "modal-publication";
const formPublication = document.getElementById(idModalPublication).getElementsByTagName("form")[0];
const msgError = document.getElementsByClassName("errorMessage")[1];
const buttonSubmit = formPublication.getElementsByTagName("button")[0];
const buttonSearch = document.getElementsByClassName("search")[0].getElementsByClassName("searchBtn")[0]
const containerPublications = document.getElementById("container-publication");
containerPublications.style.display = "none";

function doPublication() {
    const title = document.getElementById("title-pub").value;
    const content = document.getElementById("content-pub").value;
    const data = { title, content };

    if (validatorPublication(data)) {
        const token = localStorage.getItem("token");
        fetch(URL_TO_DO_PUBLICATION, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "same-origin",
            body: JSON.stringify(data)
        }).then((response) => {
            restartFieldsPub();
            return response.json();
        }).then(json => {
            const pub = [json.publication]
            showPublications(pub);
        });

        closeModalToDoPublication();
    }
}

function validatorPublication(data) {

    if (!data.title) {
        msgError.style.display = "flex";
        msgError.textContent = "Necessário título para publicação";
        return false;
    }

    if (!data.content) {
        msgError.style.display = "flex";
        msgError.textContent = "Necessário ter contéudo";
        return false
    }

    return true;
}

function searchPublication() {
    const token = localStorage.getItem("token");
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
    }).then((json) => {
        showPublications(json.publications)
    })

}

function showPublications(pubs) {
    containerPublications.style.display = "flex";
    containerPublications.innerHTML = "<h2>Publicações</h2>";

    if (pubs.length === 0) {
        console.log("here")
        containerPublications.innerHTML += `
        <div class="no-publication">
            <span>Nenhuma publicação foi encontrada!</span> 
        </div>
        `;
    }

    pubs.forEach(pub => {
        const pubComponent = buildPublicationComponent(pub);
        containerPublications.innerHTML += pubComponent;
    });
}

function buildPublicationComponent(data) {

    const { title, author, content } = data;
    return `
        <div class="publication">
            <span class="publication-title">${title}</span>
            <span class="publication-author">${author.username}</span>
            <div class="publication-content">
                <p>
                    ${content}
                </p>
            </div>
        </div>
    `;
}

function closeModalToDoPublication() {
    document.getElementsByClassName('modal-container')[1].classList.remove("show");
}

function restartFieldsPub() {
    document.getElementById("title-pub").value = "";
    document.getElementById("content-pub").value = "";
    if (msgError.style.display !== "none") {
        msgError.textContent = "";
        msgError.style.display = "none";
    }
}

buttonSubmit.addEventListener("click", doPublication);
buttonSearch.addEventListener("click", searchPublication);