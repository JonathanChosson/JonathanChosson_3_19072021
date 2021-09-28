/**
 * Import de {@link module:tableauPhotographe} depuis le Store, 
 * Import de {@link module:carousselActions} depuis caroussel
 * @name importModal
 */
import {carousselActions} from './caroussel.js';
import {tableauPhotographe} from './store.js';

/**
 * Ecoute ouvre et ferme la modale des medias
 * @module gestionModal
 */
export function gestionModal() {
    // Elements du DOM
    const modalbg = document.querySelector(".bground");
    const modalContact = document.querySelector(".bground--contact");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeBtn = document.querySelectorAll(".close");
    const closeContact = document.querySelectorAll(".close--contact");
    const playBtn = document.querySelectorAll(".photographers__article__div__span");
    const videos = document.querySelectorAll(".videoCaroussel");
    const contact = document.querySelectorAll(".contactButton");
    const prix = document.querySelectorAll(".photographers__footer");

    // Evenement d'ouverture et fermeture de modale
    modalBtn.forEach(btn => btn.addEventListener("click", function(imgClic){launchModal(imgClic)}));
    contact.forEach(btn => btn.addEventListener("click", function(){launchModal()}));
    closeBtn.forEach((close) => close.addEventListener("click", closeModal));
    closeContact.forEach((close) => close.addEventListener("click", closeModal));

    /**
     * Rend la modal visible et charge la bonne image suivant ID fournis
     * @param {number} imgClic Id de l'image à afficher dans la modal
     */
    function launchModal(imgClic) {
        if(!imgClic){
            modalContact.style.display = "flex";
        }else{
            carousselActions(imgClic.target.id);
            videos.forEach(video =>{
                // video.setAttribute('controls', "");
                video.setAttribute('controls', "");
            })
            modalbg.style.display = "block";
        }
        playBtn[0].style.display ="none";
        contact[0].style.display = "none";
        prix[0].style.display ="none";
    }

    /**
     * Ferme la modale en cours
     */
    function closeModal() {
        videos.forEach(video =>{
            video.removeAttribute('controls', "");
        })
        playBtn[0].style.display ="flex";
        contact[0].style.display = "flex";
        prix[0].style.display ="flex";
        modalbg.style.display = "none";
        modalContact.style.display = "none";
    }
}

/**
 * Ecoute ouvre et ferme la modale Contact
 * @module contactModal
 */
export function contactModal(){
    let artisteId = window.location.search.split("=")[1];
    let ficheArtiste = tableauPhotographe.filter(photographe => photographe.id == artisteId);
    let headerModalContact = document.querySelector('.modal-body--contact__p');
    headerModalContact.innerHTML = `Contactez-moi </br> ${ficheArtiste[0].nom}`;
    let envoyerBtn = document.getElementById('envoyer');
    envoyerBtn.addEventListener('click', function(event){
        event.preventDefault();
        function Message(prenom,nom,email,texte){
            return{
                prenom,
                nom,
                email,
                texte
            }
        }
        let msgUtilisateur = new Message(document.getElementById('prenom').value,document.getElementById('nom').value,document.getElementById('email').value,document.getElementById('texte').value);
        console.log(msgUtilisateur);
        let bodyModalContact = document.querySelector('.modal-body--contact');
        bodyModalContact.innerHTML = `
        <p class="modal-body--contact__p">Votre message a bien été envoyé</p>
        `;
    })
}