export function carousselActions(idClic) {
    let images = document.querySelectorAll('.caroussel');
    images = Array.prototype.slice.call(images);
    images.forEach(element => {
        element.classList.add('invisible');
        element.classList.remove('slide-in-left');
        element.classList.remove('slide-in-right');
        if(element.children[0].id == idClic){
            element.classList.remove('invisible');
        }
    });
}

export function ecouteBtnCaroussel(){
    let images = document.querySelectorAll('.caroussel');
    images = Array.prototype.slice.call(images);
    let imgActive;
    function imgAct(){
        images.forEach(element => {
            if(!element.classList.contains('invisible')){
                imgActive = images.indexOf(element);
            }
        })
    }
    // Ecoute sur clic btn suivant
    document.getElementById('suivant').addEventListener('click', async function(){
        await imgAct();
        images[imgActive].classList.add('invisible');
        images[imgActive].classList.remove('slide-in-left');
        images[imgActive].classList.remove('slide-in-right');
        imgActive ++;
        if(imgActive >= images.length){
            imgActive = 0;
        }
        images[imgActive].classList.remove('invisible');
        images[imgActive].classList.add('slide-in-right');
    });

    // Ecoute sur bouton precedant
    document.getElementById('precedant').addEventListener('click', async function(){
        await imgAct();
        images[imgActive].classList.add('invisible');
        images[imgActive].classList.remove('slide-in-left');
        images[imgActive].classList.remove('slide-in-right');
        imgActive += -1;
        if(imgActive < 0){
            imgActive = images.length;
            imgActive += -1;
        }
        images[imgActive].classList.remove('invisible');
        images[imgActive].classList.add('slide-in-left');
    })
}