/**
 * Stocke les données du Fetch
 * @type {array}
 * @module tableauPhotographe 
 */
export let tableauPhotographe = [];


/**
 * Fonction qui fait le fetch et lance une fonction entrée
 * @module arrayArtistes  
 * @param {function} lanceFonction Fonction fournis par la page qui appel
 */
export function arrayArtistes(lanceFonction) {
    fetch('./FishEyeData.json').then((response) => response.json())
    .then((data) =>{
        // console.log(data);
        enregistrerPhotographes(data.photographers);
        enregistrerMedia(tableauPhotographe, data.media);
        console.log(tableauPhotographe);
        page(lanceFonction);
    }).catch(erreur => console.log(erreur));
}


/**
 * Utilise le constructeur ("Factory Method") pour instancier les photographes et les stocks dans tableauPhotographe
 * @module enregistrerPhotographes
 * @param {array} dataFetch Données fournis par {@link module:arrayArtistes}
 */
function enregistrerPhotographes(dataFetch) {
    for(let photographe of dataFetch){
        tableauPhotographe.push(new Photographe(photographe.name, photographe.city, photographe.country, photographe.id, photographe.portrait, photographe.price, photographe.tagline, photographe.tags));
    }
}

/**
 * Rempli chaque photographe avec ses medias
 * @module enregistrerMedia 
 * @param {array} tableau tableau de photographe rempli par {@link module:enregistrerPhotographes}
 * @param {array} mediaFetch tableau de medias fournis par {@link module:arrayArtistes}
 */
function enregistrerMedia(tableau, mediaFetch){
    for(let photographe in tableau){
        mediaFetch.forEach(media => {
            if(tableau[photographe].id == media.photographerId){
                tableau[photographe].media.push(media);
            }
        });
    }
}

/**
 * Factory Method pour objet Photographe
 * @constructor
 * @param {string} nom Nom du photographe
 * @param {string} ville Ville du photographe
 * @param {string} pays Pays du Photographe
 * @param {number} id id du photographe
 * @param {string} portrait Chemin du protrait
 * @param {number} prix Prix €/jour
 * @param {string} dicton Dicton du photographe
 * @param {array} tags Tags du photographe
 * @param {array} media Medias du photographe
 * @returns void
 */
function Photographe(nom, ville, pays, id, portrait,prix,dicton, tags){
    return{
        nom,
        ville,
        pays,
        id,
        portrait,
        prix,
        dicton,
        tags,
        media : []
    }
}

/**
 * Modifie le contenu de {@link module:tableauPhotographe} si un filtre es appliqué
 * @module filtre
 */
export function filtre(){
        if (window.location.search.split("=").length > 1){
            console.log(localStorage);
            let tags;
            if(localStorage.length == 0){
                tags = [];
            }else{
                tags = JSON.parse(localStorage[0]);
            }
            let tag = window.location.search.split("=")[1];
            if(tags.includes(tag)){
                tags.splice(tags.indexOf(tag),1);
            }else{
                tags.push(tag);
            }
            if(tags.length <1){
                document.location.href="./index.html";
            }
            let tableauFiltre = [];
            tags.forEach(tag => {
                document.getElementsByClassName(`${tag}`)[0].classList.add('choisi');
            })
            tableauPhotographe.forEach(photographe => {
                if(tags.every(tag => photographe.tags.indexOf(tag) >= 0)){
                    console.log(photographe.nom);
                    if(!tableauFiltre.includes(photographe)){
                        tableauFiltre.push(photographe);
                    }
                }
            })
            localStorage.setItem(0, JSON.stringify(tags));
            tableauPhotographe = tableauFiltre;
        }
}

/**
 * lance la fonction selon la page active
 * @name page
 * @global 
 * @param {string} lanceFonction fournis par {@link module:arrayArtistes} 
 */
function page(lanceFonction){
    let nomPage = window.location.pathname.split("/")[1];
    if(nomPage === "index.html"){
        filtre()
        lanceFonction();
    }else if(nomPage === "photographers-page.html"){
        lanceFonction();
    }
}

//app
// arrayArtistes();
