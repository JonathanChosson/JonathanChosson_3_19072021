//import des modules
import {arrayArtistes, tableauPhotographe} from './store.js';
import {gestionModal} from './modal.js';

//Elements du DOM
let artiste = document.getElementsByClassName('photographers__header');
let footer = document.getElementsByClassName('photographers__footer');
let oeuvre = document.getElementsByClassName('photographers__article');
let select = document.getElementsByClassName('photographers__article--filtre__select');
let modalBody = document.getElementsByClassName("modal-body");

//Fonction
function afficheArtiste(){
    if (window.location.search.split("=").length > 1){
        let artisteId = window.location.search.split("=")[1];
        let ficheArtiste = tableauPhotographe.filter(photographe => photographe.id == artisteId);
        artiste[0].childNodes[3].childNodes[1].innerHTML = ficheArtiste[0].nom;
        artiste[0].childNodes[3].childNodes[3].innerHTML = ficheArtiste[0].ville + ", " +ficheArtiste[0].pays;
        artiste[0].childNodes[3].childNodes[5].innerHTML = ficheArtiste[0].dicton;
        artiste[0].childNodes[5].innerHTML = `<img class="photographers__header__figure__img" alt="" title="${ficheArtiste[0].nom}" src="./public/images/profil/${ficheArtiste[0].portrait}" />`;
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
        footer[0].innerHTML = "";
        let p = document.createElement('p');
        p.innerHTML = `297 081 <i class="fas fa-heart"></i>`;
        footer[0].append(p);
        let pPrice = document.createElement('p');
        pPrice.innerHTML = `${ficheArtiste[0].prix}€ /jour`;
        footer[0].append(pPrice);
    }else{
        document.location.href="./index.html"; 
    }
    mediaArtiste();
}
//Affiche les médias de l'artiste
function mediaArtiste() {
    if (window.location.search.split("=").length > 1){
        let artisteId = window.location.search.split("=")[1];
        let ficheArtiste = tableauPhotographe.filter(photographe => photographe.id == artisteId);
        let mediaArtiste = ficheArtiste[0].media
        //défi Marion 
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
        //j'ai du créer une fonction qui rempli les medias pour y afaire appel a volonté
        rempliMedia(mediaArtiste);
        //fin du défi
    }else{
        document.location.href="./index.html"; 
    }
}

//fonction rempli les medias
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
        let video = document.createElement('video');
        video.classList.add('photographers__article__div__figure');
        video.setAttribute('controls', "");
        if(media.image !=undefined){
            img.setAttribute('src',`./public/images/${media.photographerId}/${media.image}`);
            figure.append(img);
            div.append(figure);
            figure = figure.cloneNode(true);
            figure.classList.add('caroussel')
            article.append(figure.cloneNode(true));
        }else if(media.video !=undefined){
            let sourceVideo = document.createElement('source');
            sourceVideo.classList.add('photographers__article__div__figure__source');
            sourceVideo.setAttribute('src',`./public/images/${media.photographerId}/${media.video}`);
            sourceVideo.setAttribute('type', "video/mp4");
            video.append(sourceVideo);
            div.append(video);
        }
        let pTitre = document.createElement('p');
        pTitre.classList.add('photographers__article__div__p--titre');
        pTitre.innerHTML =`${media.title}`;
        let pLikes = document.createElement('p');
        pLikes.classList.add('photographers__article__div__p--likes');
        pLikes.innerHTML = `${media.likes} <i class="fas fa-heart"></i>`;
        div.append(pTitre);
        div.append(pLikes);
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
}

//trier par titre
function compareTitre(a,b){
    if(a.title < b.title){
        return -1;
    }
    if(a.title > b.title){
        return 1;
    }
    return 0;
}

//trier par popularite
function compareLikes(a,b){
    if(a.likes < b.likes){
        return 1;
    }
    if(a.likes > b.likes){
        return -1;
    }
    return 0;
}

//trier par date
function compareDate(a,b){
    if(a.date < b.date){
        return -1;
    }
    if(a.date > b.date){
        return 1;
    }
    return 0;
}

//app
arrayArtistes(afficheArtiste);

