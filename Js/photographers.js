//Elements du DOM
let artiste = document.getElementsByClassName('photographers__header');
let oeuvre = document.getElementsByClassName('photographers__article');
//Fonction
function afficheArtiste(){
    if (window.location.search.split("=").length > 1){
        let artisteId = window.location.search.split("=")[1];
        let ficheArtiste = [];
        fetch('./FishEyeData.json').then((response) => response.json())
        .then((data) =>{
            data.photographers.forEach(photographer => {
                if(photographer.id == artisteId){
                    ficheArtiste.push(photographer)
                    artiste[0].childNodes[3].childNodes[1].innerHTML = ficheArtiste[0].name;
                    artiste[0].childNodes[3].childNodes[3].innerHTML = ficheArtiste[0].city + ", " +ficheArtiste[0].country;
                    artiste[0].childNodes[3].childNodes[5].innerHTML = ficheArtiste[0].tagline;
                    artiste[0].childNodes[5].innerHTML = `<img class="photographers__header__figure__img" alt="" title="${ficheArtiste[0].name}" src="./public/images/profil/${ficheArtiste[0].portrait}" />`;
                    artiste[0].childNodes[3].removeChild(artiste[0].childNodes[3].childNodes[7]);
                    let div = document.createElement('div');
                    div.classList.add('main__article__ul');
                    ficheArtiste[0].tags.forEach(tag => {
                        let a = document.createElement('a');
                        a.classList.add('main__article__ul__a');
                        a.setAttribute('href', `./index.html?filter=${tag}`)
                        let span = document.createElement('span');
                        span.classList.add('main__article__ul__li');
                        span.innerHTML = `#${tag}`;
                        a.append(span);
                        div.append(a);
                    });
                    artiste[0].childNodes[3].append(div);
                }
            });
        }).catch(erreur => console.log(erreur));
    }else{
        document.location.href="./index.html"; 
    }
}
//Affiche les médias de l'artiste
function mediaArtiste() {
    if (window.location.search.split("=").length > 1){
        console.log('medias');
        let artisteId = window.location.search.split("=")[1];
        let mediaArtiste = [];
        console.log(artisteId);
        fetch('./FishEyeData.json').then((response) => response.json())
        .then((data) =>{
            console.log(data.media);
            data.media.forEach(media => {
                if(media.photographerId == artisteId){
                    mediaArtiste.push(media)
                }
            });
            console.log(mediaArtiste);
            console.log(oeuvre[0].children[0]);
            oeuvre[0].removeChild(oeuvre[0].children[0]);
            for(media of mediaArtiste){
                console.log(media);
                let div = document.createElement('div');
                div.classList.add('photographers__article__div');
                let figure = document.createElement('figure');
                figure.classList.add('photographers__article__div__figure');
                let img = document.createElement('img');
                img.classList.add('photographers__article__div__figure__img');
                let video = document.createElement('video');
                video.classList.add('photographers__article__div__figure');
                video.setAttribute('controls', "");
                if(media.image !=undefined){
                    img.setAttribute('src',`./public/images/${media.photographerId}/${media.image}`);
                    figure.append(img);
                    div.append(figure);
                }else if(media.video !=undefined){
                    let sourceVideo = document.createElement('source');
                    sourceVideo.setAttribute('src',`./public/images/${media.photographerId}/${media.video}`);
                    sourceVideo.setAttribute('type', "video/mp4");
                    video.append(sourceVideo);
                    div.append(video);
                }
                let pTitre = document.createElement('p');
                pTitre.classList.add('photographers__article__div__p--titre');
                pTitre.innerHTML =`${media.title}`;
                pLikes = document.createElement('p');
                pLikes.classList.add('photographers__article__div__p--likes');
                pLikes.innerHTML = `${media.likes} <i class="fas fa-heart"></i>`;
                div.append(pTitre);
                div.append(pLikes);
                oeuvre[0].append(div);
            }
        }).catch(erreur => console.log(erreur));
    }else{
        document.location.href="./index.html"; 
    }
}
//app
afficheArtiste();
mediaArtiste();
