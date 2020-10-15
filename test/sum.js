
const sl = require('..');

const list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man', children: 2 },
    { id: 2, name: 'Eve', age: 600, gender: 'woman', children: 2 },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

exports['sum a field'] = function (test) {
    const result = sl.sum(list, 'age');
    
    test.ok(result);
    test.equal(result, 800+600+500+400);
}

exports['sum a field with undefined'] = function (test) {
    const result = sl.sum(list, 'children');
    
    test.ok(result);
    test.equal(result, 2+2);
}

exports['sum a list of fields'] = function (test) {
    const result = sl.sum(list, ['age', 'children']);
    
    test.ok(result);
    test.equal(result.age, 800+600+500+400);
    test.equal(result.children, 2+2);
}

