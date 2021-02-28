let cartProduct = JSON.parse(localStorage.getItem("cart"));

let cartTotal = 0;

window.onload = function () {
  if (cartProduct !== null) {
    // creation of table
    let table = document.createElement("table");
    table.classList.add("table", "table-striped", "table-hover");

    // create TableHeader and append it to the table
    table.append(createTableHeader());

    // create TableBody and append it to the table
    table.append(createTableBody());


    let checkoutContainer = document.createElement("div");
    checkoutContainer.classList.add("checkoutContainer");

    let priceContainer = document.createElement("span");
    priceContainer.textContent = "Order total : " + cartTotal + "$";
    checkoutContainer.appendChild(priceContainer);

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("mt-3");

    let checkoutBtn = document.createElement("button");
    checkoutBtn.setAttribute("type", "button");
    checkoutBtn.setAttribute("data-bs-toggle", "modal");
    checkoutBtn.setAttribute("data-bs-target", "#checkOutModal");
    checkoutBtn.classList.add("btn", "btn-outline-success", "me-1", "mt-2");
    checkoutBtn.textContent = "Checkout";
    btnContainer.appendChild(checkoutBtn);

    let clearBtn = document.createElement("button");
    clearBtn.setAttribute("type", "button");
    clearBtn.classList.add("btn", "btn-outline-danger", "mt-2");
    clearBtn.textContent = "Clear cart";
    clearBtn.setAttribute("onclick", "clearCart()");
    btnContainer.appendChild(clearBtn);

    checkoutContainer.appendChild(btnContainer);

    document.getElementsByClassName("container")[1].appendChild(table);
    document
      .getElementsByClassName("container")[1]
      .appendChild(checkoutContainer);
  } else {
    let noProductError = document.createElement("p");
    noProductError.textContent =
      "It doesn't seems like your cart has any items !";

    let goBackButton = document.createElement("a");
    goBackButton.textContent = "Get back to the homepage !";
    goBackButton.classList.add(
      "btn",
      "btn-outline-danger",
      "col-sm-12",
      "col-md-5"
    );
    goBackButton.setAttribute("href", "../index.html");
    document
      .getElementsByClassName("container")[1]
      .classList.add("flex-column");
    document.getElementsByClassName("container")[1].appendChild(noProductError);
    document.getElementsByClassName("container")[1].appendChild(goBackButton);
  }
};

function createTableHeader(){
  let array = ["Name", "Quantity", "Price"];
  let tableHeader = document.createElement("thead");
  let tableLineHeader = document.createElement("tr");
  for (j in array) {
    let tableCellHeader = document.createElement("th");
    tableCellHeader.textContent = array[j];
    tableLineHeader.append(tableCellHeader);
  }
  tableHeader.append(tableLineHeader);
  return(tableHeader);
}

function createTableBody(){
  let tableBody = document.createElement("tbody");
  for (i in cartProduct) {
    let valueArray = Object.values(cartProduct[i]); // convert parameters to array
    let tableLine = document.createElement("tr");
    for (let x = 0; x < 3; x++) {
      let tableCell = document.createElement("th");
      if (x == 2) {
        let price = Math.round(valueArray[x] * valueArray[x - 1]) / 100;
        cartTotal = price + cartTotal;
        tableCell.textContent = Math.round(valueArray[x] / 100) + "$";
      } else {
        tableCell.textContent = valueArray[x];
      }
      tableLine.appendChild(tableCell);
    }
    tableBody.appendChild(tableLine);
  }
  return(tableBody);
}

function sendForm() {
  var firstName = document.getElementById("inputFirstName").value;
  var lastName = document.getElementById("inputLastName").value;
  var address = document.getElementById("inputAddress").value;
  var city = document.getElementById("inputCity").value;
  var email = document.getElementById("inputEmail").value;

  productsArray = [];
  for (i in cartProduct) {
    let x = 0;
    while (x < cartProduct[i].qty) {
      productsArray.push(i);
      x++;
    }
  }

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: productsArray,
    }),
  };

  fetch("http://localhost:3000/api/furniture/order/", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showOrderId(data.orderId);
      clearCart();
    })
    .catch((error) => {
      alert("Something went wrong. Please try again!\n" + error);
    });
}

function clearCart() {
  localStorage.clear();
  location.reload();
}

function showOrderId(orderId) {

  

  alert(orderId);
  return 0;
}
