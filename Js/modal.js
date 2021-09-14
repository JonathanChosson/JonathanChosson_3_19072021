import {carousselActions} from './caroussel.js';
export function gestionModal() {
    // Elements du DOM
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeBtn = document.querySelectorAll(".close");
    const playBtn = document.querySelectorAll(".photographers__article__div__span");
    const videos = document.querySelectorAll(".videoCaroussel");
    const contact = document.querySelectorAll(".contactButton");
    const prix = document.querySelectorAll(".photographers__footer");

    // Evenement d'ouverture et fermeture de modale
    modalBtn.forEach(btn => btn.addEventListener("click", function(imgClic){launchModal(imgClic)}));
    closeBtn.forEach((close) => close.addEventListener("click", closeModal));

    // fonction lancer modal
    function launchModal(imgClic) {
        carousselActions(imgClic.target.id);
        videos.forEach(video =>{
            // video.setAttribute('controls', "");
            video.setAttribute('controls', "");
        })
        playBtn[0].style.display ="none";
        contact[0].style.display = "none";
        prix[0].style.display ="none";
        modalbg.style.display = "block";
    }

    //fonction fermeture de la modal
    function closeModal() {
        videos.forEach(video =>{
            // video.setAttribute('controls', "");
            video.removeAttribute('controls', "");
        })
        playBtn[0].style.display ="flex";
        contact[0].style.display = "flex";
        prix[0].style.display ="flex";
        modalbg.style.display = "none";
    }
}

