let cartProduct = JSON.parse(localStorage.getItem("cart"));

console.log(cartProduct);

//for (i in cartProduct) {
//    console.log('test');
//}
let cartTotal = 0;

function clearCart() {
  localStorage.clear();
  location.reload();
}

window.onload = function () {
  if (cartProduct !== null) {
    let array = ["Name", "Quantity", "Price"];
    let tableBody = document.createElement("table");
    tableBody.classList.add("table", "table-striped", "table-hover");
    let tableHeader = document.createElement("thead");
    tableBody.appendChild(tableHeader);
    let tableLineHeader = document.createElement("tr");
    for (j in array) {
      let tableCellHeader = document.createElement("th");
      tableCellHeader.textContent = array[j];
      tableLineHeader.append(tableCellHeader);
    }
    tableHeader.append(tableLineHeader);
    tableBody.append(tableHeader);
  
    let tableBodyTest = document.createElement("tbody");
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
      tableBodyTest.appendChild(tableLine);
    }
    tableBody.appendChild(tableBodyTest);

  
    let checkoutContainer = document.createElement("div");
    checkoutContainer.classList.add("checkoutContainer");
  
    let priceContainer = document.createElement("span");
    priceContainer.textContent = "Order total : " + cartTotal + "$";
    checkoutContainer.appendChild(priceContainer);
  
    let btnContainer = document.createElement("div");
    btnContainer.classList.add('mt-3');
    
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
  
    document.getElementsByClassName("container")[1].appendChild(tableBody);
    document
      .getElementsByClassName("container")[1]
      .appendChild(checkoutContainer);
  }
  else {
    let noProductError = document.createElement("p");
    noProductError.textContent = "It doesn't seems like you have any items in your cart !"

    let goBackButton = document.createElement("a");
    goBackButton.textContent = "Get back to the homepage !";
    goBackButton.classList.add("btn", "btn-outline-danger");
    goBackButton.setAttribute("href", "../index.html");
    document.getElementsByClassName("container")[1].classList.add("flex-column");
    document.getElementsByClassName("container")[1].appendChild(noProductError);
    document.getElementsByClassName("container")[1].appendChild(goBackButton);
  }

};

function checkOutForm() {

    // create array and put product id the number of times
    // they were put into the cart (cartProduct[i].qty)
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
            firstName: document.getElementById('inputFirstName').value,
            lastName: document.getElementById('inputLastName').value,
            address: document.getElementById('inputAddress').value,
            city: document.getElementById('inputCity').value,
            email: document.getElementById('inputEmail').value,
          },
          products: productsArray, 
        })
    }
    let rspStatus;
    fetch('http://localhost:3000/api/furniture/order/', options)
      .then(response => {
        rspStatus = response.status;
        return response.json();
      })
      .then(data => {
        if (rspStatus != "400") {
          showOrderId(data.orderId);
          clearCart();
        }
        else {
          alert('Something went wrong. Please try again !');
        }
      })
      .catch(error => {
        console.log(error);
      });
}

function showOrderId(orderId) {
  alert('This is your order ID:' + orderId);
}