module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('fruits', [
        {
            "name": "Apple",
            "color": "Red",
            "price": 0.50,
            "season": "Fall",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "Banana",
            "color": "Yellow",
            "price": 0.30,
            "season": "All year",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "Cherry",
            "color": "Red",
            "price": 1.20,
            "season": "Summer",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "Grape",
            "color": "Purple",
            "price": 0.90,
            "season": "Fall",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "Orange",
            "color": "Orange",
            "price": 0.60,
            "season": "Winter",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
    ]
    );
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('fruit', null, {});
  },
};