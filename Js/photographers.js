/**
 * Import de {@link module:arrayArtistes} et de {@link module:tableauPhotographe} depuis le Store, 
 * Import de {@link module:gestionModal} et de {@link module:contactModal} depuis modal, 
 * Import de {@link module:ecouteBtnCaroussel} depuis caroussel
 * @name importPhotographers
 */
import {arrayArtistes, tableauPhotographe} from './store.js';
import {gestionModal, contactModal} from './modal.js';
import {ecouteBtnCaroussel} from './caroussel.js'

//Elements du DOM
let artiste = document.getElementsByClassName('photographers__header');
let footer = document.getElementsByClassName('photographers__footer');
let oeuvre = document.getElementsByClassName('photographers__article');
let select = document.getElementsByClassName('photographers__article--filtre__select');
let modalBody = document.getElementsByClassName("modal-body");


/**
 * Affiche les informations de l'artiste
 * @type {function}
 */
function afficheArtiste(){
    if (window.location.search.split("=").length > 1){
        let artisteId = window.location.search.split("=")[1];
        let ficheArtiste = tableauPhotographe.filter(photographe => photographe.id == artisteId);
        artiste[0].childNodes[3].childNodes[1].innerHTML = ficheArtiste[0].nom;
        artiste[0].childNodes[3].childNodes[3].innerHTML = ficheArtiste[0].ville + ", " +ficheArtiste[0].pays;
        artiste[0].childNodes[3].childNodes[5].innerHTML = ficheArtiste[0].dicton;
        artiste[0].childNodes[5].innerHTML = `<img class="photographers__header__figure__img" alt="${ficheArtiste[0].nom}" title="${ficheArtiste[0].nom}" src="./publics/images/profil/${ficheArtiste[0].portrait}" />`;
        artiste[0].childNodes[3].removeChild(artiste[0].childNodes[3].childNodes[7]);
        let div = document.createElement('div');
        div.classList.add('main__article__ul');
        ficheArtiste[0].tags.forEach(tag => {
            let a = document.createElement('a');
            a.classList.add('main__article__ul__a');
            a.setAttribute('href', `./index.html?filter=${tag}`)
            let span = document.createElement('span');
            span.classList.add('photographers__header__div__ul__li');
            span.innerHTML = `#${tag}`;
            a.append(span);
            div.append(a);
        });
        artiste[0].childNodes[3].append(div);
    }else{
        document.location.href="./index.html"; 
    }
    mediaArtiste();
}

/**
 * Trie uniquement les medias en rapport avec l'artiste les filtre au besoin 
 * @type {function}
 */
function mediaArtiste() {
    if (window.location.search.split("=").length > 1){
        let artisteId = window.location.search.split("=")[1];
        let ficheArtiste = tableauPhotographe.filter(photographe => photographe.id == artisteId);
        let mediaArtiste = ficheArtiste[0].media;
        // Je crée une variable de tri
        let trier = "";
        // j'écoute mon select pour voir si il y as un changement et modifie ma variable "trier" en fonction
        select[0].addEventListener('change', (event)=>{
            trier = event.target.value;
            // J'applique mon tri uniquement si besoin
            if(trier === "titre"){
                //j'applique ma fonction de tri
                mediaArtiste.sort(compareTitre);
                //j'apelle ma fonction qui rempli les media une fois le tableau trié 
                rempliMedia(mediaArtiste);
            }else if(trier === "popularite"){
                //j'applique ma fonction de tri
                mediaArtiste.sort(compareLikes);
                //j'apelle ma fonction qui rempli les media une fois le tableau trié 
                rempliMedia(mediaArtiste);
            }else if(trier === "date"){
                //j'applique ma fonction de tri
                mediaArtiste.sort(compareDate);
                //j'apelle ma fonction qui rempli les media une fois le tableau trié 
                rempliMedia(mediaArtiste);
            }
        })
        let likesTotal = 0;
        mediaArtiste.forEach(media => {
            likesTotal += media.likes
        });
        footer[0].innerHTML = "";
        let p = document.createElement('p');
        p.innerHTML = `${likesTotal} <i class="fas fa-heart"></i>`;
        footer[0].append(p);
        let pPrice = document.createElement('p');
        pPrice.innerHTML = `${ficheArtiste[0].prix}€ /jour`;
        footer[0].append(pPrice);
        //j'ai du créer une fonction qui rempli les medias pour y afaire appel a volonté
        rempliMedia(mediaArtiste);
        //fin du défi
    }else{
        document.location.href="./index.html"; 
    }
}

/**
 * Affiche les medias précedement trié par {@link mediaArtiste}
 * @param {array} mediaArtiste 
 */
function rempliMedia(mediaArtiste){
    oeuvre[0].innerHTML ="";
    modalBody[0].innerHTML = "";
    let fermerModal = document.createElement('i');
    fermerModal.classList.add("fas", "fa-times", "close");
    modalBody[0].append(fermerModal);
    let aside = document.createElement('aside');
    let btnPrecedant = document.createElement('i');
    btnPrecedant.classList.add('fas', 'fa-chevron-left');
    btnPrecedant.setAttribute('id', 'precedant');
    aside.append(btnPrecedant);
    modalBody[0].append(aside);
    let article = document.createElement('article');
    for(let media of mediaArtiste){
        let div = document.createElement('div');
        div.classList.add('photographers__article__div');
        let figure = document.createElement('figure');
        figure.classList.add('photographers__article__div__figure');
        let img = document.createElement('img');
        img.classList.add('photographers__article__div__figure__img');
        img.classList.add('modal-btn');
        img.setAttribute('id', media.id);
        img.setAttribute('alt', media.title);
        let video = document.createElement('video');
        video.classList.add('photographers__article__div__figure');
        video.classList.add('video');
        video.setAttribute('alt', media.title);
        if(media.image !=undefined){
            img.setAttribute('src',`./publics/images/${media.photographerId}/${media.image}`);
            figure.append(img);
            div.append(figure);
            figure = figure.cloneNode(true);
            figure.classList.add('caroussel');
            article.append(figure.cloneNode(true));
        }else if(media.video !=undefined){
            let sourceVideo = document.createElement('source');
            sourceVideo.classList.add('photographers__article__div__figure__source');
            sourceVideo.setAttribute('src',`./publics/images/${media.photographerId}/${media.video}`);
            sourceVideo.setAttribute('type', "video/mp4");
            video.append(sourceVideo);
            let playBtn = document.createElement('span');
            playBtn.classList.add('photographers__article__div__span');
            playBtn.classList.add('modal-btn');
            playBtn.innerHTML = `<i class="far fa-play-circle"></i>`;
            div.append(playBtn);
            div.append(video);
            video = video.cloneNode(true);
            video.classList.add('caroussel');
            video.classList.remove('video');
            video.classList.add('videoCaroussel');
            article.append(video.cloneNode(true));
        }
        let pTitre = document.createElement('p');
        pTitre.classList.add('photographers__article__div__p--titre');
        pTitre.innerHTML =`${media.title}`;
        let divLike = document.createElement('div');
        divLike.classList.add('like');
        let pLikes = document.createElement('p');
        pLikes.classList.add('photographers__article__div__p--likes');
        // pLikes.classList.add('like');
        pLikes.innerHTML = `${media.likes} <i class="fas fa-heart"></i>`;
        pLikes.setAttribute('id', media.id);
        divLike.append(pLikes);
        div.append(pTitre);
        // div.append(pLikes);
        div.append(divLike);
        oeuvre[0].append(div);
    }
    modalBody[0].append(article);
    aside = aside.cloneNode();
    let btnSuivant = document.createElement('i');
    btnSuivant.classList.add('fas', 'fa-chevron-right');
    btnSuivant.setAttribute('id', 'suivant');
    aside.append(btnSuivant);
    modalBody[0].append(aside);
    gestionModal();
    contactModal();
    gestionLike();
    ecouteBtnCaroussel();
}

/**
 * Trie les filtes Titre
 * @param {string} a 
 * @param {string} b 
 * @returns boolean
 */
function compareTitre(a,b){
    if(a.title < b.title){
        return -1;
    }
    if(a.title > b.title){
        return 1;
    }
    return 0;
}

/**
 * Trie par nombre de like
 * @param {number} a 
 * @param {number} b 
 * @returns boolean
 */
function compareLikes(a,b){
    if(a.likes < b.likes){
        return 1;
    }
    if(a.likes > b.likes){
        return -1;
    }
    return 0;
}

/**
 * Trie par date
 * @param {string} a 
 * @param {string} b 
 * @returns boolean
 */
function compareDate(a,b){
    if(a.date < b.date){
        return -1;
    }
    if(a.date > b.date){
        return 1;
    }
    return 0;
}

/**
 * Incrémente les likes au clic
 * @type {function}
 */
function gestionLike(){
    let likes = document.querySelectorAll('.like');
    let artisteId = window.location.search.split("=")[1];
    let footer = document.getElementsByClassName('photographers__footer');
    let ficheArtiste = tableauPhotographe.filter(photographe => photographe.id == artisteId);
    likes.forEach(like => {
        like.addEventListener('click', function(){
            let mediaChoisi = ficheArtiste[0].media.filter(media => media.id == like.firstChild.id)[0];
            let countFooter = parseInt(footer[0].firstChild.innerText);
            let count = parseInt(like.innerText);
            if(count == mediaChoisi.likes){
                count ++;
                countFooter ++;
                footer[0].firstChild.innerHTML =`${countFooter} <i class="fas fa-heart"></i>`;
            }else
            {
                count--;
                countFooter --;
                footer[0].firstChild.innerHTML =`${countFooter} <i class="fas fa-heart"></i>`;
            }
            like.firstChild.innerHTML = `${count} <i class="fas fa-heart"></i>`;
        })
    });
}

//app
arrayArtistes(afficheArtiste);

