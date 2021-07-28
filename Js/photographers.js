//Elements du DOM
let artiste = document.getElementsByClassName('photographers__header');
let oeuvre = document.getElementsByClassName('photographers__article__div');
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

}
//app
afficheArtiste();