import {arrayArtistes, tableauPhotographe} from './store.js';
//Eléments du DOM
let main = document.getElementsByClassName('main');
let topBtn = document.getElementById('topBtn');

//Fonction
//charge la liste des artistes
function listeArtistes() {
    console.log(tableauPhotographe);
    main[0].innerHTML = "";
    //affiche une fiche par artiste présents dans photographers[]
    tableauPhotographe.forEach(element => {
        let ficheArtiste = document.createElement('article');
        ficheArtiste.classList.add('main__article');
        console.log(element);
        ficheArtiste.innerHTML = `
            <a class="main__article__a" href="./photographers-page.html?id=${element.id}">
                <figure class="main__article__figure">
                    <img class="main__article__figure__img" alt="" title="${element.nom}" src="./public/images/profil/${element.portrait}" />
                </figure>
                <h2 class="main__article__h2">
                    ${element.nom}
                </h2>
            </a>
            <p class="main__article__p--ville">
                ${element.ville}, ${element.pays}
            </p>
            <p class="main__article__p--dicton">
                ${element.dicton}
            </p>
            <p class="main__article__p--tarif">
                ${element.prix}€/jour
            </p>
        `;
        let div = document.createElement('div');
        div.classList.add('main__article__ul');
        element.tags.forEach(tag => {
            let a = document.createElement('a');
            a.classList.add('main__article__ul__a');
            a.setAttribute('href', `./index.html?filter=${tag}`)
            let span = document.createElement('span');
            span.classList.add('main__article__ul__li');
            span.innerHTML = `#${tag}`;
            a.append(span);
            div.append(a);
        });
        ficheArtiste.append(div);
        main[0].append(ficheArtiste);
    });
}

//Fonction boutton top
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// eslint-disable-next-line no-unused-vars
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


//App
arrayArtistes(listeArtistes);




console.log(main);