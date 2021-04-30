const articles = ["Please Choose an Option", "Hamburguers", "Drinks", "Side Dish"];

const hamburguerList = [
  "Big Mac®",
  "Big Tasty®",
  "CBO®",
  "Filet-o-Fish®",
  "McVeggie",
  "Double Cheeseburger"
];

const hamburguerExtraList = [
  "Normal",
  "No Ketchup",
  "No Pickles",
  "No Salade"
];

const sidesList = [
  "Chips",
  "Chips (big)",
  "Soup",
  "Salade"
];

const drinksList = [
  "Water",
  "Natural Juice",
  "Ice Tea",
  "Fanta",
  "Coca-Cola"
];


const extraDrinks = ["Natural", "Fresh"];

//classes

class Order {
  name = "";
  products = [];
  state = false;

  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  addProduct(product) {
    if (product) {
      this.products.push(product);
      let indexOfProduct = this.products.indexOf(product);
      product.setIndex(indexOfProduct);
    }
  }
  setState(state) {
      this.state = state;
  }
}

class Product {
  article = "";
  side = "";
  extra = "";
  index = null;

  constructor(article, side, extra) {
    this.article = article;
    this.side = side;
    this.extra = extra;
  }

  getArticle() {
    return this.article;
  }
  getSide() {
    return this.side;
  }
  getExtra() {
    return this.extra;
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
  }
}
