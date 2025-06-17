// 1. Создать базу данных `market`.
use market;
// 2. В базе данных `market` создать пустую коллекцию `orders`.
db.createCollection('orders');
// 3. Заполнить коллекцию `orders` следующими данными с полями _id, customer, product, amount, city:
//    1 Olga Apple 15.55 Berlin
//    2 Anna Apple 10.05 Madrid
//    3 Olga Kiwi 9.6 Berlin
//    4 Anton Apple 20 Roma
//    5 Olga Banana 8 Madrid
//    6 Petr Orange 18.3 Paris
db.orders.insertMany([
    {
        customer:'Olga',
        product: 'Apple',
        amount: 15.55,
        city: 'Berlin'
    },
    {
        customer:'Anna',
        product: 'Apple',
        amount: 10.05,
        city: 'Madrid'
    }, 
    {
        customer:'Olga',
        product: 'Kiwi',
        amount: 9.6,
        city: 'Berlin'
    }, 
    {
        customer:'Anton',
        product: 'Apple',
        amount: 20,
        city: 'Roma'
    },
    {
        customer:'Olga',
        product: 'Banana',
        amount: 8,
        city: 'Madrid'
    }, 
    {
        customer:'Petr',
        product: 'Orange',
        amount: 18.3,
        city: 'Paris'
    }
])

// 4. Найти все заказы, в которых клиент — Olga.
db.orders.find({customer: 'Olga'});
// 5. Найти все заказы, в которых город — не Berlin.
db.orders.find({city: {$ne: 'Berlin'}});
// 6. Найти все заказы, где сумма заказа (amount) больше 10.
db.orders.find({amount: {$gt: 10}});
// 7. Найти все заказы, где сумма заказа меньше или равна 10.05.
db.orders.find({amount: {$lte: 10.05}});
// 8. Найти заказы, где продукт — Apple и город — Madrid.
db.orders.find({product: 'Apple', city: 'Madrid'});
// 9. Найти заказы, в которых продукт — Banana или Orange.
db.orders.find({product: {$in: ['Banana', 'Orange']}});
// 10. Найти все заказы, где сумма заказа находится в диапазоне от 9 до 18 включительно.
db.orders.find({amount: {$gte: 9, $lte: 18}});
// 11. Пропустить первые 2 документа и вывести следующие 3.
db.orders.find().skip(2).limit(3);
// 12. Вывести только поля customer и product, исключив остальные.
db.orders.find({},{customer: 1, product: 1, _id: 0});
// 13. Найти три самых дорогих покупки.
db.orders.find().sort({amount: -1}).limit(3);
// 14. Найти заказы, в которых город — Berlin, и отсортировать их по убыванию суммы (amount).
db.orders.find({city:'Berlin'}).sort({amount: -1});
// 15. Создать в базе данных `market` коллекцию `staff`, используя следующий скрипт:
//     https://github.com/annykh/GT081024-m/blob/main/Lesson19_staff.js
db.staff.insertMany([
  {
    _id: 1,
    name: "Ivan Petrov",
    position: "Manager",
    address: {
      city: "Moscow",
      street: "Lenina",
      house: 10
    },
    contacts: [
      { type: "email", value: "ivan.petrov@example.com" },
      { type: "phone", value: "+7 900 123 4567" }
    ],
    projects: [
      { name: "Alpha", hours: 120 },
      { name: "Beta", hours: 80 },
      { name: "Gamma", hours: 60 }
    ]
  },
  {
    _id: 2,
    name: "Elena Smirnova",
    position: "Developer",
    address: {
      city: "Saint Petersburg",
      street: "Nevsky",
      house: 45
    },
    contacts: [
      { type: "email", value: "elena.smirnova@example.com" }
    ],
    projects: [
      { name: "Alpha", hours: 150 },
      { name: "Delta", hours: 70 }
    ]
  },
  {
    _id: 3,
    name: "Sergey Ivanov",
    position: "Tester",
    address: {
      city: "Kazan",
      street: "Tverskaya",
      house: 25
    },
    contacts: [
      { type: "phone", value: "+7 901 987 6543" }
    ],
    projects: [
      { name: "Beta", hours: 100 }
    ]
  },
   {
    _id: 4,
    name: "Anna Volkova",
    position: "Designer",
    address: {
      city: "Sochi",
      street: "Kurortny",
      house: 7
    },
    contacts: [
      { type: "email", value: "anna.volkova@example.com" },
      { type: "phone", value: "+7 902 345 6789" }
    ],
    projects: [
      { name: "Gamma", hours: 95 },
      { name: "Zeta", hours: 110 }
    ]
  },
  {
    _id: 5,
    name: "Dmitry Orlov",
    position: "Developer",
    address: {
      city: "Moscow",
      street: "Tverskaya",
      house: 12
    },
    contacts: [
      { type: "email", value: "d.orlov@example.com" }
    ],
    projects: [
      { name: "Alpha", hours: 130 },
      { name: "Epsilon", hours: 85 },
      { name: "Zeta", hours: 50 }
    ]
  },
  {
    _id: 6,
    name: "Marina Sokolova",
    position: "HR",
    address: {
      city: "Kazan",
      street: "Pushkina",
      house: 33
    },
    contacts: [
      { type: "phone", value: "+7 903 222 1111" }
    ],
    projects: [
      { name: "HR-Platform", hours: 200 }
    ]
  }
])
// 16. Найти всех сотрудников, проживающих в городе "Moscow".
db.staff.find({'address.city': 'Moscow'});
// 17. Найти сотрудников, у которых адрес включает город "Kazan" и улицу "Tverskaya".
db.staff.find({'address.city': 'Kazan', 'address.street': 'Tverskaya'})
// 18. Найти сотрудников, у которых среди контактов есть номер телефона.
db.staff.find({'contacts.type': "phone"});
// 19. Найти сотрудников, участвующих в проекте с названием "Alpha".
db.staff.find({'projects.name': "Alpha"});
// 20. Найти сотрудников, которые работали более 100 часов над каким-либо проектом.
db.staff.find({'projects.hours': {$gt: 100}});
// 21. Вывести информацию о первом проекте у каждого сотрудника.
db.staff.find({},{projects: {$slice : 1}});
// 22. Изменить значение поля city на "Berlin" у клиента с именем Petr. (коллекция orders)
db.orders.updateOne(
    {customer:'Petr'},
    {$set: {city: 'Berlin'}}
);
db.orders.find({customer:'Petr'});
// 23. Увеличить значение поля amount на 2 у заказов клиента Olga в городе Berlin. (коллекция orders)
db.orders.updateOne(
    {customer:'Olga', city: 'Berlin'},
    {$inc: {amount: 2}}
);
// 24. Увеличить значение поля amount на 5 во всех заказах с продуктом "Apple". (коллекция orders)
db.orders.updateMany(
    {product: 'Apple'},
    {$inc: {amount: 5}}
);
// 25. Удалить поле city из заказа клиента Anton. (коллекция orders)
db.orders.updateOne(
    {customer:'Anton'},
    {$unset: {city: 1}}
);
// 26. Добавить новый контакт { type: "telegram", value: "@ivanpetrov" } сотруднику с именем Ivan Petrov. (коллекция staff)
db.staff.updateOne(
    {name: "Ivan Petrov"},
    {$push: {contacts:{ type: "telegram", value: "@ivanpetrov" }}}
);
db.staff.find({name: "Ivan Petrov"});
// 27. Добавить проект { name: "Omega", hours: 50 } сотруднику Dmitry Orlov, если проект с таким названием у него ещё не указан. (коллекция staff)
db.staff.updateOne(
    {name: "Dmitry Orlov"},
    {$addToSet: {projects:{ name: "Omega", hours: 50 }}}
);
db.staff.find({name: "Dmitry Orlov"});
// 28. Удалить из массива contacts у сотрудника Anna Volkova все элементы с типом "phone". (коллекция staff)
db.staff.updateOne(
    {name: "Anna Volkova"},
    {$pull: {contacts: {type: "phone"}}}
);
db.staff.find({name: "Anna Volkova"});
// 29. Удалить у сотрудника Dmitry Orlov из массива projects все проекты с названиями "Alpha" и "Zeta". (коллекция staff)
db.staff.updateOne(
    {name: "Dmitry Orlov"},
    {$pull: {projects:{ name: {$in : ["Omega", "Zeta"]}}}}
);
db.staff.find({name: "Dmitry Orlov"});
// 30. Удалить последний проект из массива projects у сотрудника Ivan Petrov. (коллекция staff)
db.staff.updateOne(
    {name: "Ivan Petrov"},
    {$pop: {projects: 1}}
);
db.staff.find({name: "Ivan Petrov"});
// 31. Посчитать, сколько раз был куплен продукт "Apple". (коллекция orders)
db.orders.find({product: 'Apple'}).count();

db.orders.aggregate([
  {$match:{product: 'Apple'}},
  {$group: {_id: '$product', count: {$sum:1}}}
])
// 32. Посчитать количество заказов с продуктом "Apple" в городах Berlin и Madrid. (коллекция orders)
db.orders.find({product: 'Apple',  city: {$in : ['Berlin', 'Madrid']}}).count();
// 33. Посчитать, сколько всего было потрачено на каждый продукт. (коллекция orders)
db.orders.aggregate([
     {$group: {_id: '$product', total_sum: {$sum: '$amount'}}}
]);
// 34. Определить максимальную сумму заказа (amount) для каждого города. (коллекция orders)
db.orders.aggregate([
     {$group: {_id: '$city', max_amount: {$max: '$amount'}}}
]);
// 35. Посчитать общее количество заказов в каждом городе. (коллекция orders)
db.orders.aggregate([
     {$group: {_id: '$city', count: {$sum: 1}}}
]);