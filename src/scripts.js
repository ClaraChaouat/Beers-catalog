

fetch("https://api.punkapi.com/v2/beers?page=2&per_page=8")
  .then((res) => res.json())
  .then((data) => {
    const ul = document.getElementById("beer-results");
    data.forEach(function (item) {
      const li = document.createElement("li");
      li.className = "item";
      const divItemInner = document.createElement("div");
      divItemInner.className = "item-inner";
      const div = document.createElement("div");
      const divImg = document.createElement("div");
      divImg.className = "img-container";
      div.setAttribute("id", `div${item.id}`);
      div.className = "beer-info";

      const h1 = document.createElement("h1");
      h1.setAttribute("id", `beer-title${item.id}`);
      const h2 = document.createElement("h2");
      h2.setAttribute("id", `beer-subtitle${item.id}`);
      const img = document.createElement("img");
      img.setAttribute("id", `img${item.id}`);
      const btn = document.createElement("button");
      btn.className = "see-more-button js-see-more-button";
      btn.innerText = "See more";
      btn.setAttribute("id", `${item.id}`);
      h1.innerText = item.name;
      h2.innerText = item.tagline;
      img.src = item.image_url;
      divImg.appendChild(img);
      div.appendChild(h1);
      div.appendChild(h2);
      div.appendChild(btn);
      divItemInner.appendChild(div);
      divItemInner.appendChild(divImg);
      li.append(divItemInner);
      ul.append(li);
    });

    // Defining variables to query the required information

    const elAbv = document.querySelector("[data-id=abv-value");
    const elBeerName = document.querySelector("[data-id=beer-name");
    const elBeerNameRightSide = document.querySelector(
      "[data-id=beer-name-right-side"
    );
    const elBeerTagline = document.querySelector("[data-id=beer-tagline");
    const elFirstBrewed = document.querySelector("[data-id=first-brewed");
    const elIbu = document.querySelector("[data-id=ibu-value");
    const elEbc = document.querySelector("[data-id=ebc-value");
    const elSrm = document.querySelector("[data-id=srm-value");
    const elFoodPairing = document.querySelector("[data-id=food-pairing");
    const elMaltIngredients = document.querySelector(
      "[data-id=malt-ingredients"
    );
    const elBeerDescription = document.querySelector(
      "[data-id=beer-description"
    );
    const elBeerImg = document.querySelector("[data-id=beer-img");

    // Modal opening function//

    const toggleModal = () => {
      document.querySelector(".beerModal-wrapper").classList.toggle("hidden");
    };

    // Getting all the elements from the array ingredients malt

    const maltIngredients = [];
    function parsingArray() {
      data[0].ingredients["malt"].forEach(function (arrayItem) {
        maltIngredients.push(arrayItem.name);
      });
    }

    // Adding an event listener to all the beers catalog buttons
    // Geeting all the data needed in order to add them to the beer description

    Array.from(document.getElementsByClassName("js-see-more-button")).forEach(
      (el) => {
        el.addEventListener("click", (event) => {
          toggleModal();
          console.log(el.id);
          const beerId = el.id;
          fetch(`https://api.punkapi.com/v2/beers/${beerId}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              console.log(data[0].abv);
              elBeerName.innerText = data[0].name;
              elBeerNameRightSide.innerText = data[0].name;
              elBeerTagline.innerText = data[0].tagline;
              elFirstBrewed.innerText = data[0].first_brewed;
              elAbv.innerText = data[0].abv;
              elBeerDescription.innerText = data[0].description;
              elIbu.innerText = data[0].ibu;
              elEbc.innerText = data[0].ebc;
              elEbc.innerText = data[0].srm;
              elFoodPairing.innerText = data[0].food_pairing;
              elBeerImg.src = data[0].image_url;

              parsingArray();

              elMaltIngredients.innerText = maltIngredients;
            });
        });
      }
    );

    // Adding an event listener to the closing cross

    function closingModal() {
      document
        .querySelector(".js-closing-cross")
        .addEventListener("click", toggleModal);
    }

    closingModal();
  });
