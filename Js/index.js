//Eléments du DOM
let main = document.getElementsByClassName('main');
//Fonction
function listeArtistes() {
    fetch('../FishEyeData.json').then((response) => response.json())
    .then((data) =>{
        main[0].innerHTML = "";
        let photographers = [];
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
        photographers.forEach(element => {
            let ficheArtiste = document.createElement('article');
            ficheArtiste.classList.add('main__article');
            ficheArtiste.innerHTML = `
                <figure class="main__article__figure">
                    <img class="main__article__figure__img" alt="" title="${element.name}" src="./public/images/photographers_ID_photos/${element.portrait}" />
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
            // <div class="main__article__ul">
            //     <span class="main__article__ul__li">#${element.tags}</span>
            // </div>
            let div = document.createElement('div');
            div.classList.add('main__article__ul');
            element.tags.forEach(tag => {
                let span = document.createElement('span');
                span.classList.add('main__article__ul__li');
                span.innerHTML = `#${tag}`;
                div.append(span);
            });
            ficheArtiste.append(div);
            main[0].append(ficheArtiste);
        });
    }).catch(erreur => console.log(erreur));
}

//App
listeArtistes();
console.log(main);