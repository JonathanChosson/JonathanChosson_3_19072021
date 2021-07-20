//Eléments du DOM
let main = document.getElementsByClassName('main');
//Fonction
function listeArtistes() {
    fetch('../FishEyeData.json').then((response) => response.json())
    .then((data) =>{
        main[0].innerHTML = "";
        console.log(data.photographers);
        data.photographers.forEach(element => {
            let ficheArtiste = document.createElement('article');
            ficheArtiste.classList.add('main__article');
            ficheArtiste.innerHTML = `
                <figure class="main__article__figure">
                    <img class="main__article__figure__img" alt="" title="${element.name}" src="./public/images/Mimi/Portrait_Nora.jpg" />
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