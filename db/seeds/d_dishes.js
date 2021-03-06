
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('dishes')
    .insert([
      {dish_name: 'Bronx Bomber', price: '9.95', description: 'Pastrami & Egg Salad with Lettuce, Tomato and Onion.', account_id: 1},
      {dish_name: 'Hell\'s Kitchen', price: '10', description: 'Bacon, Swiss, Egg Salad, Cajun Sauce, Avocado, Lettuce, Tomato, Onion.',account_id: 1},
      {dish_name: 'Vegetarian Breakfast', price: '10.95', description: 'Scrambled eggs, roasted peppers, potatoes, cheese, green beans, and arugula.',account_id: 1}
    ])
  ]);
};
