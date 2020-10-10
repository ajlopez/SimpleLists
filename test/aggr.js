
const sl = require('..');

const list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man', children: 2 },
    { id: 2, name: 'Eve', age: 600, gender: 'woman', children: 2 },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

exports['aggregate a field by gender'] = function (test) {
    const result = sl.aggr(list, 'gender', 'age');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    test.ok(sl.exist(result, { gender: 'man', age: 800 + 500 + 400 }));
    test.ok(sl.exist(result, { gender: 'woman', age: 600 }));
}

exports['aggregate a field with undefined'] = function (test) {
    const result = sl.aggr(list, 'gender', 'children');
    
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    test.ok(sl.exist(result, { gender: 'man', children: 2 }));
    test.ok(sl.exist(result, { gender: 'woman', children: 2 }));
}

exports['aggregate a list of fields'] = function (test) {
    const result = sl.aggr(list, 'gender', ['age', 'children']);
    
    test.ok(result);
    test.equal(result.length, 2);
    test.ok(sl.exist(result, { gender: 'man', age: 800 + 500 + 400, children: 2 }));
    test.ok(sl.exist(result, { gender: 'woman', age: 600, children: 2 }));
}
