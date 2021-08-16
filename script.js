class MenuPosition {

   constructor(name) {
      this._name = name;
   }

   calculatePrice() {
      let price = 0;

      switch (this._size) {
         case 'small':
            price += 50;
            break;
         case 'large':
            price += 100;
            break;
      }

      switch (this._name) {
         case 'caesar':
            price += 100;
            break;
         case 'olivier':
            price += 50;
            break;
         case 'cola':
            price += 50;
            break;
         case 'coffee':
            price += 80;
            break;
      }

      switch (this._stuffing) {
         case 'cheese':
            price += 10;
            break;
         case 'salad':
            price += 20;
            break;
         case 'potato':
            price += 15;
            break;
      }

      switch (this._weight) {
         case 'medium':
            price *= 1.5;
            break;
         case 'large':
            price *= 2;
            break;
      }

      return `${price} tugriks`;
   }

   calculateCalories() {
      let calories = 0;

      switch (this._size) {
         case 'small':
            calories += 20;
            break;
         case 'large':
            calories += 40;
            break;
      }

      switch (this._name) {
         case 'caesar':
            calories += 20;
            break;
         case 'olivier':
            calories += 80;
            break;
         case 'cola':
            calories += 40;
            break;
         case 'coffee':
            calories += 20;
            break;
      }

      switch (this._stuffing) {
         case 'cheese':
            calories += 20;
            break;
         case 'salad':
            calories += 5;
            break;
         case 'potato':
            calories += 10;
            break;
      }

      switch (this._weight) {
         case 'medium':
            calories *= 1.5;
            break;
         case 'large':
            calories *= 2;
            break;
      }

      return `${calories} calories`;
   }
}

class Hamburger extends MenuPosition {

   constructor(size, stuffing) {
      super();
      this._name = 'burger';
      this._size = size;
      this._stuffing = stuffing;
   }

   getSize() {
      return this._size;
   }

   getStuffing() {
      return this._stuffing;
   }
}

class Salad extends MenuPosition {
   constructor(name, weight) {
      super(name);
      this._name = name;
      this._weight = weight;
   }
}

class Drink extends MenuPosition {
   constructor(name) {
      super(name);
      this._name = name;
   }
}

class Order {
   #sumOrder;
   #numberCalories;

   constructor(...items) {
      this._listItems = items;
      this.#sumOrder = 0;
      this.#numberCalories = 0;
   }

   calcSumOrder() {
      this.#sumOrder = 0;
      this._listItems.forEach(item => {
         this.#sumOrder += Number(item.calculatePrice().replace(/[^0-9]/g, ""));
      })
      return `${this.#sumOrder} tugriks`;
   }

   calcCaloriesOrder() {
      this.#numberCalories = 0;
      this._listItems.forEach(item => {
         this.#numberCalories += Number(item.calculateCalories().replace(/[^0-9]/g, ""));
      })
      return `${this.#numberCalories} calories`;
   }

   addItem(item) {
      this._listItems.push(item);
   }

   removeItem(item) {
      if (this._listItems.includes(item)) {
         this._listItems.splice(this._listItems.indexOf(item), 1);
      }
   }

   printBill() {
      this.calcCaloriesOrder();
      this.calcSumOrder();

      return (
         `
         Калорийность заказа: ${this.#numberCalories} calories
         Стоимость заказа: ${this.#sumOrder} tugriks
         `
      )
   }

   payOrder() {
      Object.freeze(this._listItems);
   }
}

Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_LARGE = 'large';
Hamburger.STUFFING_CHEESE = 'cheese';
Hamburger.STUFFING_SALAD = 'salad';
Hamburger.STUFFING_POTATO = 'potato';

Salad.CAESAR = 'caesar';
Salad.OLIVIER = 'olivier';
Salad.WEIGHT_SMALL = 'small'
Salad.WEIGHT_MEDIUM = 'medium'
Salad.WEIGHT_LARGE = 'large'

Drink.COLA = 'cola';
Drink.COFFEE = 'coffee';


// example of work

// let newBurger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// let newBurger2 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
// let newBurger3 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO);
// let newBurger4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);

// let newDrink = new Drink(Drink.COLA);
// let newDrink2 = new Drink(Drink.COFFEE);

// let newSalad = new Salad(Salad.CAESAR, Salad.WEIGHT_LARGE);
// let newSalad2 = new Salad(Salad.OLIVIER, Salad.WEIGHT_MEDIUM);
// let newSalad3 = new Salad(Salad.OLIVIER, Salad.WEIGHT_SMALL);

// let newOrder = new Order(newBurger, newBurger2, newBurger3, newBurger4, newDrink, newDrink2, newSalad, newSalad2, newSalad3);

// newOrder.removeItem(newBurger2);
// newOrder.addItem(newBurger3);

// console.log(
//    newOrder.printBill()
// )

// console.log(
//    newOrder.calcCaloriesOrder()
// )

// console.log(
//    newOrder.calcSumOrder()
// )

// // After method payOrder(). When adding or removing: property only for read.

// newOrder.payOrder();

// newOrder.removeItem(newBurger2);
// newOrder.addItem(newBurger3);
