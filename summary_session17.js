// 1. Вывести коллекцию users из базы данных store.
// Данные коллекции - https://github.com/annykh/GT081024-m/blob/main/Summary%20Session%2016.js
use store;
// 2. Вывести первых трех пользователей.
db.users.find().limit(3);
// 3. Вывести пользователей, отсортированных по возрасту по возрастанию, но показать только первых двух.
db.users.find().sort({age:1}).limit(3);
// 4. Пропустить трех пользователей и вывести следующих двух, отсортировав их по имени по убыванию.
db.users.find().sort({name:-1}).skip(3).limit(2);
// 5. Отсортировать пользователей по возрасту в порядке убывания и вывести их имена и возраст.
db.users.find({},{name:1, age:1, _id:0}).sort({age:-1});
// 6. В базе данных store создать коллекцию employees:
// https://github.com/annykh/GT081024-m/blob/main/employees.js
// 7. Увеличить зарплату на 500 всем сотрудникам старше 30 лет.
db.employees.updateMany(
    {age: {$gt: 30}},
    {$inc: {salary: 500}}
)

// 8. Добавить поле bonus со значением 0 для всех сотрудников.
db.employees.updateMany(
    {},
    {$set: {bonus: 0}}
)

// 9. Установить значение поля bonus в 100 для сотрудников с зарплатой больше 3000.
db.employees.updateMany(
    {salary: {$gt: 3000}},
    {$set: {bonus: 100}}
)

// 10. Увеличить зарплату сотрудника Emily Davis на 1000.
db.employees.updateOne({
    $and: [
        {firstname: 'Emily'}, 
        {lastname: 'Davis'}
    ]},
    {$inc: {salary: 100}}
)
// 11. Уменьшить зарплату сотрудника Mike Johnson на 300.
db.employees.updateOne({
    $and: [
        {firstname: 'Mike'}, 
        {lastname: 'Johnson'}
    ]},
    {$inc: {salary: -300}}
)
// 12. Добавить поле department со значением IT для сотрудника Jane Smith.
db.employees.updateOne({
    $and: [
        {firstname: 'Jane'}, 
        {lastname: 'Smith'}
    ]},
    {$set: {department: 'IT'}}
)
// 13. Удалить поле skills у сотрудника Mike Johnson.
db.employees.updateOne({
    $and: [
        {firstname: 'Mike'}, 
        {lastname: 'Johnson'}
    ]},
    {$unset: {skills: 1}}
)
// 14. Удалить поле bonus для всех сотрудников, кроме Jane Smith.
db.employees.updateMany({
    $nor: [
        {firstname: 'Jane'}, 
        {lastname: 'Smith'}
    ]},
    {$unset: {bonus: 1}}
)
// 15. Увеличить возраст на 1 всем сотрудникам младше 30 лет.
db.employees.updateMany(
    {age: {$lt: 30}},
    {$inc: {age: 1}}
)

// 16. Изменить должность Emily Davis на QA Engineer.
db.employees.updateOne({
    $and: [
        {firstname: 'Emily'}, 
        {lastname: 'Davis'}
    ]},
    {$set: {position: 'QA Engineer'}}
)
// 17. Добавить поле experience со значением 5 для всех сотрудников старше 30 лет.
db.employees.updateMany(
    {age: {$gt: 30}},
    {$set: {experience: 5}}
)
// 18. Установить значение поля experience в 2 для сотрудников младше 30 лет.
db.employees.updateMany(
    {age: {$lt: 30}},
    {$set: {experience: 2}}
)