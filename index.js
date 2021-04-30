function populateArticles(articlesLst) {
  $(`#articles`).html("");
  articlesLst.forEach((article) => {
    $(`#articles`).append(`<option value="${article}">${article}</option>`);
  });
}

function populateArticlesType(articleType) {
  switch (articleType) {
    case "Hamburguers":
      updateArticleType(hamburguerList);
      break;
    case "Drinks":
      updateArticleType(drinksList);
      break;
    case "Side Dish":
      updateArticleType(sidesList);
      break;
  }
}
function updateArticleType(articleTypeLst) {
  $(`#articleType`).html("");
  articleTypeLst.forEach((articleType) => {
    $(`#articleType`).append(
      `<option value="${articleType}">${articleType}</option>`
    );
  });
}
function updateSpecialOrder(extraLst) {
  $(`#specialOrder`).html("");
  if (extraLst === "Normal") {
    $(`#specialOrder`).append(`<option value="Normal">Normal</option>`);
  } else {
    extraLst.forEach((extra) => {
      $(`#specialOrder`).append(`<option value="${extra}">${extra}</option>`);
    });
  }
}
function populateSpecialOrder(chosenArticle) {
  switch (chosenArticle) {
    case "Hamburguers":
      updateSpecialOrder(hamburguerExtraList);
      break;
    case "Drinks":
      updateSpecialOrder(extraDrinks);
      break;
    default:
      updateSpecialOrder("Normal");
      break;
  }
}

$("#articles").change(function () {
  console.log($("#articles").val());
  populateArticlesType($("#articles").val());
  $(`#specialOrder`).html("");
});

$("#articleType").change(function () {
  let chosenArticle = $("#articles").val();
  //console.log(chosenArticle);
  if (chosenArticle) {
    populateSpecialOrder(chosenArticle);
  }
});

function newOrder(name, product) {
  if (name) {
    let currentOrder = new Order(name);
    currentOrder.addProduct(product);
    return currentOrder;
  } else {
    alert(`Name can't be Blank.`);
  }
  //return new Order(clientName);

  //order.products.push(new Order(clientName));
}

populateArticles(articles);

let orders = [];
let activeOrders = [];

$("#btn-submit").click(function () {
  let article = $("#articles").val();
  let articleType = $("#articleType").val();
  let extra = $("#specialOrder").val();
  let clientName = $("#name-input").val();
  let currentProduct = new Product(article, articleType, extra);
  console.log(orders.length);
  if (orders.length == 0) {
    orders.push(newOrder(clientName, currentProduct));
  } else {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].name == clientName) {
        orders[i].addProduct(currentProduct);
      } else {
        orders.push(newOrder(clientName, currentProduct));
        return;
      }
    }
  }
  renderTable();

  console.log("orders: " + JSON.stringify(orders));
});

function renderTable() {
  $(".clean-order").html("");
  if (orders) {
    orders.forEach((order) => {
      let name = $("#name-input").val();
      if (order.name == name) {
        order.products.forEach((product) => {
          if (product.extra != null) {
            $("#order-table").append(
              `
            
              <tr class="clean-order">
              <td> <button type="submit" class="btn btn-danger w-80 remove-product" onclick="removeProduct(this)" value="${product.index}"> Delete </button> </td>
                <td>${product.side}</td>
                <td>${product.extra}</td>
              </tr>
              
            `
            );
          } else {
            $("#order-table").append(
              `
            
              <tr class="clean-order">
              <td> <button type="submit" class="btn btn-danger w-80 remove-product" onclick="removeProduct(this)" value="${product.index}"> Delete </button> </td>
                <td>${product.side}</td>
                <td></td>
              </tr>
              
            `
            );
          }
        });
      }
    });
  }
}

//////////////////////////////////////////////////////////

function removeProduct(removeBtn) {
  orders.forEach((order) => {
    if (order.name === $("#name-input").val()) {
      order.products.pop(removeBtn.value);
    }
  });
  renderTable();
}

/* function resumeOrder() {
  let orderList = newOrder();
  orders.products = orderList;
  dataBase.push(order); 
  let articleTable = $("#order-table tr");
  for (let item of articleTable) {
    item.remove();
  }
  orders = [];
}  */
let activeOrdersWithExtra = [];
let activeOrdersWithoutExtra = [];

$("#final-order").click(function () {
  orders.forEach((order) => {
    if (order.name == $("#name-input").val()) {
      activeOrders.push(order);
      orders.pop(orders.indexOf(order));
    }
  });
  displayOrderNumbers();
  renderActiveOrderTable();
  renderTable();
  $("#name-input").val("");
});

let productsWithExtra;
let productsWithoutExtra;
let activeRequestsNumber;
let activeProductsWithExtra;
let activeRequestsWithoutExtra;

/*activeOrders.forEach((order) =>{
    order.products.forEach((product) =>{
      if(product.extra != 'Normal'){
        if (!ordersWithExtra.length) {
          let tempOrder = new Order(order.getName());
          let indexOfTempOrder = ordersWithExtra.push(tempOrder) -1;
          ordersWithExtra[indexOfTempOrder].addProduct(product);
        } else {
          ordersWithExtra.forEach((currentOrder) =>{
            if (currentOrder.getName() === order.getName()) {
              currentOrder.products.push(product);
            }
          });
        }         
      }else{
        if (!ordersWithoutExtra.length) {
          let tempOrder = new Order(order.getName());
          let indexOfTempOrder = ordersWithoutExtra.push(tempOrder) - 1;
          ordersWithoutExtra[indexOfTempOrder].addProduct(product);
        } else {
          ordersWithoutExtra.forEach((currentOrder) => {
            if (currentOrder.getName() === order.getName()) {
              currentOrder.products.push(product);
            }
          });
        }  
      }
    });*/

function displayOrderNumbers() {
  productsWithExtra = [];
  productsWithoutExtra = [];
  activeRequestsNumber = activeOrders.length;
  activeOrders.forEach((order) => {
    order.products.forEach((product) => {
      if (product.getExtra() !== "Normal") {
        productsWithExtra.push(product);
      } else {
        productsWithoutExtra.push(product);
      }
    });
  });
  activeRequestsNumber = activeOrders.length;
  activeProductsWithExtra = productsWithExtra.length;
  activeProductsWithoutExtra = productsWithoutExtra.length;
  document.getElementById(
    "all-orders-counter"
  ).innerHTML = activeRequestsNumber;
  document.getElementById(
    "extra-orders-counter"
  ).innerHTML = activeProductsWithExtra;
  document.getElementById(
    "without-extra-orders-counter"
  ).innerHTML = activeProductsWithoutExtra;
}

$("#btn-all-requests").click(function () {
  if (activeOrders.length) {
    renderKitchenTableOrder("all orders", activeOrders[0]);
  }
});
$("#btn-without-extra").click(function () {
  if (productsWithoutExtra.length) {
    renderKitchenTableOrder("products with extra", productsWithoutExtra);
  }
});
$("#btn-with-extra").click(function () {
  if (productsWithExtra.length) {
    renderKitchenTableOrder("products without extra", productsWithExtra);
  }
});

function renderKitchenTableOrder(which, collection) {
  //all-table
  $(".clean-table-row").remove();
  switch (which) {
    case "all orders":
      $("#all-table").append(
        `
          <tr class="clean-table-row">
            <td>${collection.name}</td>
            <td class="order-products"></td>
          <tr>
        `
      );
      collection.products.forEach((product) =>{
        $(".order-products").append(`${product.side} </br>`);
      });
      break;
    case "products with extra":
      collection.forEach((product) => {
        $("#all-table").append(
          `
          <tr class="clean-table-row">
            <td>${product.side}</td>
            <td>${product.extra}</td>
          <tr>
        `
        );
      });
      break;
    case "products without extra":
      collection.forEach((product) => {
        $("#all-table").append(
          `
          <tr class="clean-table-row">
            <td>${product.side}</td>
            <td>${product.extra}</td>
          <tr>
        `
        );
      });
      break;
  }
}
/*function renderKitchenTableProducts(product){
   $(".clean-table-row").remove();
     $("#all-table").append(
       `
    <tr class="clean-table-row"><td>${product.side}</td><td>${product.extra}</td></tr>
    `
     );
}*/
/*$("#order-ready").click(function(){

});*/
function renderActiveOrderTable() {
  $(".clean-active-order").html("");
  if (activeOrders) {
    activeOrders.forEach((activeOrder) => {
      let orderProducts = [...activeOrder.products];
      console.log("orderProducts: " + JSON.stringify(orderProducts));
      $("#active-order-table").append(
        `<tr class="clean-active-order">
         <td> ${activeOrders.indexOf(activeOrder)} </td>
         <td> ${activeOrder.name} </td> 
         <td class="active-order-products" name="${activeOrder.name}">  </td>`
      );
      orderProducts.forEach((product) => {
        $(`td[name="${activeOrder.name}"]`).append(
          ` ${product.side} :  ${product.extra}<br> `
        );
      });
    });
  }
}

/* function addOrderToDataBase() {
  $("allOrders-list").html("");
  for (let order of orders) {
    let table = `<tr>`;
    table += `<td>${order.name}</td><td>${order.products}</td>`;
    table += `<tr>`;
    $("#allOrders-list").prepend(table);
  }
}

addOrderToDataBase(); */

$("#remove-all-orders").click(function () {
  activeOrders = [];
  renderActiveOrderTable();
});
$("#order-ready").click(function(){
  if (activeOrders.length){
    activeOrders.pop(activeOrders[0]);
  }
  renderActiveOrderTable();

});
////////////////////////////////////////////

//quero fazer render de uma tabela com TODOS os produtos

/*
function showWithExtras() {
  $("#with-extra").val();
   //quero fazer render de uma tabela com os produtos COM extra
}

function showWhithoutExtras() {
  $("#without-extra").val();
   //quero fazer render de uma tabela com os produtos SEM extra aka "normal"
} */

/* function kitchenService() {
  
} */
