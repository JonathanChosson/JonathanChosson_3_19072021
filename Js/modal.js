
export function ecouteModal() {
    // DOM Elements
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeBtn = document.querySelectorAll(".close");


    // launch modal event
    modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
    closeBtn.forEach((close) => close.addEventListener("click", closeModal));

    // launch modal form
    function launchModal() {
        console.log('click');
    modalbg.style.display = "block";
    }

    //close modal event
    function closeModal() {
    modalbg.style.display = "none";
    }
}
