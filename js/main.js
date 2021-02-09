
let websiteIndex = "http://127.0.0.1:5500/index.html/"

fetch("http://localhost:3000/api/furniture/")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        localStorage.setItem('json', JSON.stringify(data));
        populateProducts(data);
    })
    .catch(function(error) {
        alert("something went wrong!", error);
    });


function populateProducts(jsonResponse) {
    for (let i = 0; i < jsonResponse.length; i++) {

        let id = jsonResponse[i]._id;

        let aOutOfFig = document.createElement('a');
        aOutOfFig.setAttribute('href', "/pages/product.html?id=" + id);

        aOutOfFig.classList.add('aOutOfFig', 'text-decoration-none');

        let figure = document.createElement('figure');
        figure.classList.add('figureClass', 'mt-4');

        let picture = document.createElement('img');
        picture.classList.add('figurePicture');

        let figcaption = document.createElement('figcaption');
        figcaption.classList.add('figureFigcaption');

        let figName = document.createElement('span');
        figName.classList.add('figName');

        let figDesc = document.createElement('p');
        figDesc.classList.add('figDesc', 'mb-0');

        picture.src = jsonResponse[i].imageUrl;
        figName.textContent = jsonResponse[i].name;
        figDesc.textContent = jsonResponse[i].description;

        figure.appendChild(picture);
        figcaption.appendChild(figName);
        figcaption.appendChild(figDesc);
        figure.appendChild(figcaption);
        aOutOfFig.appendChild(figure);

        document.getElementById('products').appendChild(aOutOfFig);
    }
}