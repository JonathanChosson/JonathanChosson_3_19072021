/**
 * Import de {@link module:arrayArtistes} et de {@link module:tableauPhotographe}
 * @name importIndex
 */
import {arrayArtistes, tableauPhotographe} from './store.js';

//Récuperer les éléments du DOM
let main = document.getElementsByClassName('main');
let topBtn = document.getElementById('topBtn');

/**
 * Affiche la liste des artistes et rempli leurs fiches
 * @type {function}
 */
function listeArtistes() {
    main[0].innerHTML = "";
    //affiche une fiche par artiste présents dans photographers[]
    if(tableauPhotographe.length == 0){
        document.getElementById('main').innerHTML = `<p class="header__h1">Désolé cette recherche ne renvoie aucun résultat`;
    }
    tableauPhotographe.forEach(element => {
        let ficheArtiste = document.createElement('article');
        ficheArtiste.classList.add('main__article');
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

//Détecte le scroll 
window.onscroll = function() {scrollFunction()};

/**
 * Renvoi la page au début
 */
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/**
 * Détecte la position du scroll et fait apparaitre le bouton
 * @return {@link methods:topFunction}
 */
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
        topBtn.addEventListener("click", function(){
            topFunction();
        })
    } else {
        topBtn.style.display = "none";
    }
}

//app
arrayArtistes(listeArtistes);
