// Обновление данных

// db.collection_name.updateOne({filter}, {update}) - обновляет только один документ
// db.collection_name.updateMany({filter}, {update}) - обновляет множество документов

// {filter} - условие
// {update} - обновление

// $push - добавление элемента в массив
// $addToSet - Отличие от push в том, что addToSet добавляет данные, если их еще нет в массиве(через push данные дублируются)
// $push/$addToSet + $each - можно добавить сразу несколько значений
// $position - задает позицию в массиве для вставки элементов
// $slice -  указывает, сколько элементов оставить в массиве после вставки
// Работают только с $push и $each
// $pop - позволяет удалить один эл. из массива либо первый, либо последний
// если значение 1 то удалет последний эл., если -1, то первый
// $pull - удаляет каждое вхождение эл. в массив (можно удалить только один элемент)
// $pullAll - удаляет несколько элементов из массива

db.employees.insertMany([
    {
        firstname: 'John',
        lastname: 'Doe',
        age: 28,
        position: 'Developer',
        salary: 2500,
        skills: ['JavaScript', 'HTML', 'CSS']
    },
    {
        firstname: 'Jane',
        lastname: 'Smith',
        age: 35,
        position: 'Project Manager',
        salary: 4000,
        skills: ['Management', 'Planning', 'Team Leading']
    },
    {
        firstname: 'Mike',
        lastname: 'Johnson',
        age: 32,
        position: 'Designer',
        salary: 3000,
        skills: ['Photoshop', 'Illustrator', 'Creativity']
    },
    {
        firstname: 'Emily',
        lastname: 'Davis',
        age: 25,
        position: 'Tester',
        salary: 2000,
        skills: ['Attention to detail', 'Scripting', 'Testing']
    }
])

// Добавить новый навык сотруднику John Doe со значением 'Python'.
db.employees.updateOne(
    {firstname: 'John', lastname: 'Doe'},
    {$push: {skills: 'Python'}}
)
db.employees.updateOne(
    {firstname: 'John', lastname: 'Doe'},
    {$push: {position: 'Python'}}
)
// The field 'position' must be an array but is of type string in document {_id: ObjectId('683ff900a5b771abcbab467d')

// Добавить новый навык сотруднику John Doe со значением 'CSS', если у него такого навыка нет в skills.
db.employees.updateOne(
    {firstname: 'John', lastname: 'Doe'},
    {$addToSet: {skills: 'CSS'}}
)

// Добавить навыки 'Team working' и 'Creativity' сотруднику Emily Davis.
db.employees.updateOne(
    {firstname: 'Emily', lastname: 'Davis'},
    {$push: {skills: {$each: ['Team working', 'Creativity']}}}
)
// db.employees.updateOne(
//     {firstname: 'Emily', lastname: 'Davis'},
//     {$push: {skills: ['Team working', 'Creativity']}}
// )
//   skills: [
//     'Attention to detail',
//     'Scripting',
//     'Testing',
//     'Team working',
//     'Creativity'
//     ['Team working', 'Creativity']]
//   ]

// Всем сотрудникам добавить новый навык 'Team working'.
db.employees.updateMany(
    {},
    {$push: {skills: 'Team working'}}
)

// Всем сотрудникам добавить новый навык 'Planning', если такого навыка у них нет.
db.employees.updateMany(
    {},
    {$addToSet: {skills: 'Team working'}}
)

// Добавить новые навыки сотруднику Jane Smith со значениями 'Canva', 'Photoshop', 'Management', если таких навыков нет в массиве.
db.employees.updateMany(
    {},
    {$addToSet: {skills: {$each: ['Canva', 'Photoshop', 'Management']}}}
)

// Добавить навык 'Organization' сотруднику Emily Davis и вставить после первого элемента.(индекс - 1)
db.employees.updateOne(
    {firstname: 'Emily', lastname: 'Davis'},
    {$push: {skills: {$each: ['Organization'], $position: 1}}}
)

db.employees.find({firstname: 'Emily', lastname: 'Davis', skills: 'Organization'})

// Добавить навык 'Leadership' сотруднику Jane Smith․ Вставить после второго элемента.
db.employees.updateOne(
    {firstname: 'Jane', lastname: 'Smith'},
    {$push: {skills: {$each: ['Leadership'], $position: 2}}}
)

db.employees.find({firstname: 'Jane', lastname: 'Smith', skills: 'Leadership'})

// Добавить новые навыки 'Budgeting', 'Organization', 'MongoDB' сотруднику Mike Johnson. Вставить новые навыки начиная с первого элемента и оставить в массиве 5 элемента.
db.employees.updateOne(
    {firstname: 'Mike', lastname: 'Johnson'},
    {$push: 
        {skills: 
            {$each: ['Budgeting', 'Organization', 'MongoDB'], $position: 0, $slice: 5}
        }
    }
)

db.employees.find({firstname: 'Mike', lastname: 'Johnson'})

//Добавить новые навыки 'C++' и 'PHP' сотруднику John Doe. Вставить новые навыки начиная с индекса 2 и оставить 6 навыков в массиве.
db.employees.updateOne(
    {firstname: 'John', lastname: 'Doe'},
    {$push: 
        {skills: 
            {$each: ['C++', 'PHP'], $position: 2, $slice: 6}
        }
    }
)

db.employees.find({firstname: 'John', lastname: 'Doe'})

// Удалить последний навык сотрудника Emily Davis.
db.employees.updateOne(
    {firstname: 'Emily', lastname: 'Davis'},
    {$pop: {skills: 1}}
)
// Удалить первый навык сотрудника Emily Davis.
db.employees.updateOne(
    {firstname: 'Emily', lastname: 'Davis'},
    {$pop: {skills: -1}}
)
// Удалить первый навык всех сотрудников, которым больше 25.
db.employees.updateMany(
    {age:{$gt: 25}},
    {$pop: {skills: -1}}
)
// Удалить последний навык всех сотрудников.
db.employees.updateMany(
    {},
    {$pop: {skills: 1}}
)

// Удалить навык Testing у сотрудника Emily
db.employees.updateOne(
    {firstname: 'Emily'},
    {$pull: {skills: 'Testing'}}
) 
// Удалить навыки Team working и Leadership у сотрудника Jane.
db.employees.updateOne(
    {firstname: 'Jane'},
    {$pullAll: {skills: ['Team working', 'Leadership']}}
)
// Удалить навык Organization у всех сотрудников.
db.employees.updateMany(
    {},
    {$pull: {skills: 'Organization'}}
)

// Удалить навыки 'C++', 'CSS', 'Canva' у сотрудников, которым больше 20.
db.employees.updateMany(
    {age: {$gt: 20}},
    {$pullAll: {skills: ['C++', 'CSS', 'Canva']}}
)

// Добавить новый навык сотруднику Bob со занчением 'team working'.
db.staff.updateOne(
    {name: 'Bob'},
    {$push: {skills: 'team working'}}
)

db.staff.find({name: "Bob"})

// Добавить новый навык сотруднику Lucas со значением 'MongoDB' если такого значения нет в массиве.
db.staff.updateOne(
    {name: 'Lucas'},
    {$addToSet: {skills: 'MongoDB'}}
)

db.staff.find({name: "Lucas"})

// Добавить новые навыки сотруднику Maria со значениями 'teamwork', 'programming', 'Java', если таких навыков нет в массиве.
db.staff.updateOne(
    {name: 'Maria'},
    {$addToSet: {skills:{$each: ['teamwork', 'programming', 'Java']}}}
)

db.staff.find({name: "Maria"})

// Добавить новый проект 'Project F' для всех сотрудников.
db.staff.updateMany(
    {},
    {$push: {projects:'Project F'}}
)

// Добавить новые проекты 'Project I', 'Project L' для сотурдников из отдела Finance. Вставить новые проекты начиная с 1-ого индекса и оставить 3 проекта в массиве.
db.staff.updateMany(
    {department: 'Finance'},
    {$push: 
        {projects:
            {$each: ['Project I', 'Project L'], $position: 1, $slice: 3}}}

)

db.staff.find({department: 'Finance'})

// Сотрудникам из отдела IT вставить с первым индексом навык 'Python'.
db.staff.updateMany(
    {department: 'IT'},
    {$push: 
        {skills:
            {$each: ['Python'], $position: 0}}}

)

db.staff.find({department: 'IT'})

// Удалить последний проект сотрудника Alice
db.staff.updateOne(
    {name: 'Alice'},
    {$pop: {projects: 1}}
)

db.staff.find({name: 'Alice'})
// Для сотрудиков из отдела HR удалить проект Project A
db.staff.updateMany(
    {department: 'HR'},
    {$pull: {projects: 'Project A'}}
)

db.staff.find({department: 'HR'})
// Удалить проекты 'Project E', 'Project I' у сотрудника Van
db.staff.updateOne(
    {name: 'Van'},
    {$pullAll: {projects: ['Project E', 'Project I']}}
)

db.staff.find({name: 'Van'})

// Агрегация
// Кол/во документов в коллекции
db.collection_name.countDocuments()
db.collection_name.find().count()

// Вывести кол/во документов в коллекции staff
db.staff.countDocuments()
db.staff.find().count()

// Вывести кол/во сотрудников из департамента IT
db.staff.find({department: 'IT'}).count()

// Вывести кол/во сотурдников, которым больше 30.
db.staff.find({age:{$gt: 30}}).count()

// Функция distinct 
// Вывести названия департаментов
db.staff.find({}, {department: 1, _id: 0})
db.staff.distinct('department')

// Вывести имена всех сотрудников без дубликатов.
db.staff.distinct('name')

// Функция aggregate
// db.collection_name.aggregate([Операторы функции aggregate])
// Операторы функции aggregate:
// $match - фильтрация/условие
// $project - проекция(поля, которые нужно вывести)
// $skip - пагинация(кол/во документов, которое нужно пропустить)
// $limit - пагинация(кол/во документов, которое нужно вывести)
// $sort - сортировка
// $group - группировка

// Агрегатные операторы (aggr_op)
// $sum
// $avg
// $min
// $max
// db.collection_name.aggregate([
//     {$match: {Условие}},
//     {$project: {Проекция}}, // column_name: 1/0
//     {$sort: {Сортировка}}, // column_name: 1/-1
//     {$skip: {Пагинация}}, // integer
//     {$limit: {Пагинация}}, // integer
//     {$group: {_id: null(если нет группировки)/'$column_name'(поле группировки), aggregate_column_name: {aggr_op: '$column_name'}}}
// ])

// _id и aggregate_column_name - новые поля, где значение _id будет null, если группировки нет, или название поля($column_name), если есть группировка по указанному полю. 
// А aggregate_column_name - это имя нового поля, в котором будет значение агрегатной функции.

// Вывести имена, фамилии и зарплаты сотрудников, которым больше 30. Отсортировать выборку по возрастанию зарплат.      
db.workers.find({age: {$gt: 30}}, {firstname: 1, lastname: 1, salary: 1, _id: 0}).sort({salary: 1})

db.workers.aggregate([
    {$match: {age: {$gt: 30}}},
    {$project: {firstname: 1, lastname: 1, salary: 1, _id: 0}},
    {$sort: {salary: 1}}
])

// Вывести имена, фамилии и зарплаты трех сотрудников, которым больше 30, пропуская первого. Отсортировать выборку по возрастанию зарплат.     
db.workers.find({age: {$gt: 30}}, {firstname: 1, lastname: 1, salary: 1, _id: 0}).sort({salary: 1}).skip(1).limit(3)

db.workers.aggregate([
    {$match: {age: {$gt: 30}}},
    {$project: {firstname: 1, lastname: 1, salary: 1, _id: 0}},
    {$sort: {salary: 1}},
    {$skip: 1},
    {$limit: 3}
])

// Найти сумму зарплат всех сотрудников.
db.workers.aggregate([
    {$group: {_id: null, total_sum: {$sum: '$salary'}}}
])
// Найти суммы зарплат сорудников по должностям 
db.workers.aggregate([
    {$group: {_id: '$position', total_sum: {$sum: '$salary'}}}
])
// Найти сумму зарлат сотрудников, которым больше 30.
db.workers.aggregate([
    {$match: {age: {$gt: 30}}},
    {$group: {_id: null, total_sum: {$sum: '$salary'}}}
])
// Найти суммы зарплат по должностям сотрудников, которым больше 30.
db.workers.aggregate([
    {$match: {age: {$gt: 30}}},
    {$group: {_id: '$position', total_sum: {$sum: '$salary'}}}
])

// mysql
// select sum(salary) as total_sum
// from workers;

// mysql
// select sum(salary) as total_sum
// from workers
// group by position;

// mysql
// select sum(salary) as total_sum
// from workers
// where age > 30;

// mysql
// select sum(salary) as total_sum
// from workers
// where age > 30
// group by position;

// Найти среднюю зарплату в компании.
db.workers.aggregate([
    {$group: {_id: null, avg_salary: {$avg: '$salary'}}}
])

// 1. Найти средние зарплаты по должностям.
db.workers.aggregate([
    {$group: {_id: '$position', avg_salary: {$avg: '$salary'}}}
])

// 2. Найти средний возраст среди всех сотрудников.
db.workers.aggregate([
    {$group: {_id: null, avg_age: {$avg: '$age'}}}
])
// 3. Найти сумму зарплат сотрудников, которые получают меньше 5000.
db.workers.aggregate([
    {$match: {salary: {$lt: 5000}}},
    {$group: {_id: null, total_sum: {$sum: '$salary'}}}
])

// mysql
// select sum(salary) as sum_salary
// from workers
// where salary < 5000
// group by position;

// Найти суммы зарплат по должностям. Вывести только те, где сумма больше 5000.
db.workers.aggregate([
    {$group: {_id: '$position', sum_salary: {$sum: '$salary'}}},
    {$match: {sum_salary: {$gt: 5000}}}
])
// mysql
// select sum(salary) as sum_salary
// from workers
// group by position
// having sum_salary > 5000;

// Найти суммы зарплат по должностям. Вывести только те, где сумма больше 5000. Отсортировать по возрастанию суммы.
db.workers.aggregate([
    {$group: {_id: '$position', sum_salary: {$sum: '$salary'}}},
    {$match: {sum_salary: {$gt: 5000}}},
    {$sort: {sum_salary: 1}}
])

// Найти максимальную зарплату среди всех сотрудников.
db.workers.aggregate([
    {$group: {_id: null, max_salary: {$max: '$salary'}}}
])
// Найти минимальные зарплаты по должностям.
db.workers.aggregate([
    {$group: {_id: '$position', min_salary: {$min: '$salary'}}}
])
// Найти суммы зарплат по должностям. Вывести только те, где сумма больше 5000. Отсортировать по возрастанию суммы.
db.workers.aggregate([
    {$group: {_id: '$position', sum_salary: {$sum: '$salary'}}},
    {$match: {sum_salary: {$gt: 5000}}},
    {$sort: {sum_salary: 1}}
])

// Найти кол/во сотрудников по должностям.
db.workers.aggregate([
    {$group: {_id: '$position', workers_count: {$sum: 1}}}
])
// {$sum: 1} - заменяет count