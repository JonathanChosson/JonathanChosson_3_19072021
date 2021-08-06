let tableauPhotographe = [];

//fetch le fichier et ajoute les données au tableauPhotographe
function listeArtistes() {
    fetch('./FishEyeData.json').then((response) => response.json())
    .then((data) =>{
        // console.log(data);
        enregistrerPhotographes(data.photographers);
        enregistrerMedia(tableauPhotographe, data.media);
        filtre();
        console.log(tableauPhotographe);
    }).catch(erreur => console.log(erreur));
}

//utilise le constructeur pour instancier les photographes
function enregistrerPhotographes(dataFetch) {
    for(let photographe of dataFetch){
        tableauPhotographe.push(new creerPhotographe(photographe.name, photographe.country, photographe.id, photographe.portrait, photographe.price, photographe.tagline, photographe.tags));
    }
}

//rempli chaque photographe avec ses medias
function enregistrerMedia(tableau, mediaFetch){
    for(let photographe in tableau){
        mediaFetch.forEach(media => {
            if(tableau[photographe].id == media.photographerId){
                tableau[photographe].media.push(media);
            }
        });
    }
}

//Factory method constructeur d'objet
function creerPhotographe(nom, ville, id, portrait,prix,dicton, tags){
    return{
        nom,
        ville,
        id,
        portrait,
        prix,
        dicton,
        tags,
        media : [],
    }
}

//fonction filtre
//applique un filtre
function filtre(){
    //verifie qu'un filtre est appliqué et rempli en fonction tableauPhotographe[]
        if (window.location.search.split("=").length > 1){
            let tag = window.location.search.split("=")[1];
            tableauPhotographe = tableauPhotographe.filter(photographe => photographe.tags.filter(tagPhotographe => tagPhotographe == tag).length > 0)
        }
}

//app
listeArtistes();