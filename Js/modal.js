import {carousselActions} from './caroussel.js';
export function gestionModal() {
    // Elements du DOM
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeBtn = document.querySelectorAll(".close");


    // launch modal event
    // modalBtn.forEach(btn => btn.addEventListener("click", function(){console.log(btn);}));
    modalBtn.forEach(btn => btn.addEventListener("click", function(imgClic){launchModal(imgClic)}));
    closeBtn.forEach((close) => close.addEventListener("click", closeModal));

    // launch modal form
    function launchModal(imgClic) {
        carousselActions(imgClic.target.id);
        modalbg.style.display = "block";
    }

    //close modal event
    function closeModal() {
        modalbg.style.display = "none";
    }
}

