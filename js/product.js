let jsonData = JSON.parse(localStorage.getItem('json'));
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let cartProduct = JSON.parse(localStorage.getItem('cart')) || {};


/*
if url has parameter id then findIdObjects,
else the id parameter is not present
*/
window.onload = function() {
    if (window.location.pathname != "/pages/product.html") {
        window.location.href = '/';
    }
    if (urlParams.has('id')) {
        findIdObject(jsonData);
    } else {
        window.location.href = '/';
    }
}

/*
go through every object, 
if 'id' found in one object then populate page and then stop
if not then id was not found
*/
function findIdObject(jsonResponse) {
    for (let i = 0; i <= jsonResponse.length; i++) {
        if (i == jsonResponse.length) {
            window.location.href = '/';
        }
        if (jsonResponse[i]._id == id) {
            populateProductPage(jsonResponse[i]);
            break;
        }
    }
}

function populateProductPage(jsonProductObject) {
    let title = document.createElement('title');
    title.textContent = jsonProductObject.name;

    document.getElementsByTagName('head')[0].appendChild(title);

    //create image and it's container
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer', 'col-5');

    let picture = document.createElement('img');
    picture.classList.add('productImg');
    picture.src = jsonProductObject.imageUrl;
    imgContainer.appendChild(picture);

    document.getElementsByClassName('container')[1].appendChild(imgContainer);

    //create all the element on the right of the product picture
    let textContainer = document.createElement('div')
    textContainer.classList.add('textContainer');

    let productName = document.createElement('h2');
    productName.textContent = jsonProductObject.name;
    textContainer.appendChild(productName);

    let productDescription = document.createElement('p');
    productDescription.textContent = jsonProductObject.description;
    textContainer.appendChild(productDescription);


    /*
    from here to cart button comment: creation of 
    dropdown select menu and price tag
    */
    let optionPriceContainer = document.createElement('div');
    optionPriceContainer.classList.add('pt-2', 'pb-5')

    let optionSelect = document.createElement('select');
    optionSelect.classList.add('custom-select', 'optionSelect');
    optionPriceContainer.appendChild(optionSelect);

    /*
    create all options tag for the select menu 
    with the corresponding varnish
    */
    for (let i = 0; i < jsonProductObject.varnish.length; i++) {
        let optionValue = document.createElement('option');
        optionValue.setAttribute = ('value', jsonProductObject.varnish[i]);
        optionValue.textContent = (jsonProductObject.varnish[i]);
        optionSelect.appendChild(optionValue);
    }

    let productPrice = document.createElement('span')
    productPrice.textContent = (Math.round(jsonProductObject.price) / 100) + '$';
    productPrice.classList.add('price');
    optionPriceContainer.appendChild(productPrice);

    textContainer.appendChild(optionPriceContainer);

    // creation of add to cart button
    let addCartBtn = document.createElement('button');
    addCartBtn.setAttribute('type', 'button');
    addCartBtn.classList.add('btn', 'btn-outline-success');
    addCartBtn.textContent = "Add to cart";
    textContainer.appendChild(addCartBtn);

    document.getElementsByClassName('container')[1].appendChild(textContainer);
    addToCart(jsonProductObject);

}



function addToCart(jsonProductObject) {
    let varTest = document.getElementsByClassName('btn')[0];
    varTest.onclick = function() {
        let counter = cartProduct[jsonProductObject._id]?.qty + 1 || 1;
        cartProduct[jsonProductObject._id] = { name: jsonProductObject.name, qty: counter, price: jsonProductObject.price };
        localStorage.setItem('cart', JSON.stringify(cartProduct));
    }
}
