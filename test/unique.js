
const sl = require('..');

const list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

exports['unique id'] = function (test) {
    const result = sl.unique(list, 'id');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);
    
    for (let k = 0; k < result.length; k++)
        test.equal(result[k].id, list[k].id);
}

exports['unique genre'] = function (test) {
    const result = sl.unique(list, 'gender');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    
    test.equal(result[0].gender, 'man');
    test.equal(result[0].name, 'Adam');
    test.equal(result[1].gender, 'woman');
    test.equal(result[1].name, 'Eve');
}
