export function carousselActions(idClic) {
    let images = document.querySelectorAll('.caroussel');
    let imgActive = 0;
    images.forEach(element => {
        element.classList.add('invisible');
        let imagesArray = Array.prototype.slice.call(images);
        if(element.children[0].id == idClic){
            element.classList.remove('invisible');
            imgActive = imagesArray.indexOf(element);
        }
    });

    // Ecoute sur clic btn suivant
    document.getElementById('suivant').addEventListener('click', function(){
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
    document.getElementById('precedant').addEventListener('click', function(){
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