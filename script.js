class MenuPosition {

   constructor({ size = null, stuffing = null, nameFood = null, weight = null, nameDrink = null }) {
      this._size = size;
      this._stuffing = stuffing;
      this._nameFood = nameFood;
      this._nameDrink = nameDrink;
      this._weight = weight;
   }

   getSize() {
      return this._size;
   }

   getStuffing() {
      return this._stuffing;
   }

   getPriceForSize(size) {
      let price = 0;
      switch (size) {
         case this.constructor.SIZE_SMALL:
            price += 50;
            break;
         case this.constructor.SIZE_LARGE:
            price += 100;
            break;
      }
      return price;
   }

   getPriceByAdditionalStuffing(stuffing) {
      let price = 0;
      switch (stuffing) {
         case this.constructor.STUFFING_CHEESE:
            price += 10;
            break;
         case this.constructor.STUFFING_SALAD:
            price += 20;
            break;
         case this.constructor.STUFFING_POTATO:
            price += 15;
            break;
      }
      return price;
   }

   getPriceByFoodName(name) {
      let price = 0;
      switch (name) {
         case this.constructor.CAESAR:
            price += 100;
            break;
         case this.constructor.OLIVIER:
            price += 50;
            break;
      }
      return price;
   }

   getCoefficientForWeight(weight) {
      let coefficient = 0;
      switch (weight) {
         case this.constructor.WEIGHT_SMALL:
            coefficient += 1;
            break;
         case this.constructor.WEIGHT_MEDIUM:
            coefficient += 1.5;
            break;
         case this.constructor.WEIGHT_LARGE:
            coefficient += 2;
            break;
      }
      return coefficient;
   }

   getPriceByDrinkName(name) {
      let price = 0;
      switch (name) {
         case this.constructor.COLA:
            price += 50;
            break;
         case this.constructor.COFFEE:
            price += 80;
            break;
      }
      return price;
   }

   calculatePrice() {
      let price = 0;
      price += this.getPriceForSize(this._size) +
         this.getPriceByAdditionalStuffing(this._stuffing) +
         this.getPriceByDrinkName(this._nameDrink) +
         (this.getPriceByFoodName(this._nameFood) * this.getCoefficientForWeight(this._weight));
      return price;
   }

   getCaloriesForSize(size) {
      let calories = 0;
      switch (size) {
         case this.constructor.SIZE_SMALL:
            calories += 20;
            break;
         case this.constructor.SIZE_LARGE:
            calories += 40;
            break;
      }
      return calories;
   }

   getCaloriesByAdditionalStuffing(stuffing) {
      let calories = 0;
      switch (stuffing) {
         case this.constructor.STUFFING_CHEESE:
            calories += 20;
            break;
         case this.constructor.STUFFING_SALAD:
            calories += 5;
            break;
         case this.constructor.STUFFING_POTATO:
            calories += 10;
            break;
      }
      return calories;
   }

   getCaloriesByFoodName(name) {
      let calories = 0;
      switch (name) {
         case this.constructor.CAESAR:
            calories += 20;
            break;
         case this.constructor.OLIVIER:
            calories += 80;
            break;
      }
      return calories;
   }

   getCoefficientForWeight(weight) {
      let coefficient = 0;
      switch (weight) {
         case this.constructor.WEIGHT_SMALL:
            coefficient += 1;
            break;
         case this.constructor.WEIGHT_MEDIUM:
            coefficient += 1.5;
            break;
         case this.constructor.WEIGHT_LARGE:
            coefficient += 2;
            break;
      }
      return coefficient;
   }

   getCaloriesByDrinkName(name) {
      let calories = 0;
      switch (name) {
         case this.constructor.COLA:
            calories += 40;
            break;
         case this.constructor.COFFEE:
            calories += 20;
            break;
      }
      return calories;
   }

   calculateCalories() {
      let calories = 0;
      calories += this.getCaloriesForSize(this._size) +
         this.getCaloriesByAdditionalStuffing(this._stuffing) +
         this.getCaloriesByDrinkName(this._nameDrink) +
         (this.getCaloriesByFoodName(this._nameFood) * this.getCoefficientForWeight(this._weight));
      return calories;
   }

}

class Hamburger extends MenuPosition {
   static SIZE_SMALL = 'small';
   static SIZE_LARGE = 'large';
   static STUFFING_CHEESE = 'cheese';
   static STUFFING_SALAD = 'salad';
   static STUFFING_POTATO = 'potato';
   constructor(size, stuffing) {
      super({ size, stuffing });
   }
}

class Salad extends MenuPosition {
   static CAESAR = 'caesar';
   static OLIVIER = 'olivier';
   static WEIGHT_SMALL = 'small'
   static WEIGHT_MEDIUM = 'medium'
   static WEIGHT_LARGE = 'large'
   constructor(nameFood, weight) {
      super({ nameFood, weight });
   }
}

class Drink extends MenuPosition {
   static COLA = 'cola';
   static COFFEE = 'coffee';
   constructor(nameDrink) {
      super({ nameDrink });
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
         this.#sumOrder += Number(item.calculatePrice());
      })
      return `${this.#sumOrder} tugriks`;
   }

   calcCaloriesOrder() {
      this.#numberCalories = 0;
      this._listItems.forEach(item => {
         this.#numberCalories += Number(item.calculateCalories());
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

// newOrder.addItem(newBurger3);

// console.log(
//    newOrder.printBill()
// )
// console.log(
//    newSalad3.calculatePrice()
// )

// console.log(
//    newOrder.calcSumOrder()
// )

// // // After method payOrder(). When adding or removing: property only for read.

// newOrder.payOrder();

// newOrder.removeItem(newBurger2);

// newOrder.addItem(newBurger3);

// console.log(
//    newOrder.printBill()
// )