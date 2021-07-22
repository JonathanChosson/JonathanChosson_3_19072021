//Eléments du DOM
let main = document.getElementsByClassName('main');

//Fonction
//charge la liste des artistes
function listeArtistes() {
    fetch('./FishEyeData.json').then((response) => response.json())
    .then((data) =>{
        main[0].innerHTML = "";
        let photographers = [];
        //verifie qu'un filtre est appliqué et rempli en fonction photographers[]
        if (window.location.search.split("=").length > 1){
            let tag = window.location.search.split("=")[1];
            data.photographers.forEach(photographer => {
                if(photographer.tags.indexOf(tag) === -1){
                }else{
                    photographers.push(photographer)
                }
            });
        }else{
            photographers = data.photographers;
        }
        //affiche une fiche par artiste présents dans photograpers[]
        photographers.forEach(element => {
            let ficheArtiste = document.createElement('article');
            ficheArtiste.classList.add('main__article');
            ficheArtiste.innerHTML = `
                <figure class="main__article__figure">
                    <img class="main__article__figure__img" alt="" title="${element.name}" src="./public/images/Photographers_ID_photos/EllieRoseWilkens.jpg" />
                </figure>
                <h2 class="main__article__h2">
                    ${element.name}
                </h2>
                <p class="main__article__p--ville">
                    ${element.city}, ${element.country}
                </p>
                <p class="main__article__p--dicton">
                    ${element.tagline}
                </p>
                <p class="main__article__p--tarif">
                    ${element.price}€/jour
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
    }).catch(erreur => console.log(erreur));
}

//App
listeArtistes();
console.log(main);