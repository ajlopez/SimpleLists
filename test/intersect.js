
const sl = require('..');

const list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

const list2 = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 5, name: 'Set', age: 300, gender: 'man' },
    { id: 6, name: 'Sarah', age: 200, gender: 'woman' }
];

exports['intersect list with list'] = function (test) {
    const result = sl.intersect(list, list, 'id');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);
    
    for (let k = 0; k < result.length; k++)
        test.equal(result[k].id, list[k].id);
}

exports['intersect list with second list'] = function (test) {
    const result = sl.intersect(list, list2, 'id');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    
    for (let k = 0; k < result.length; k++) {
        test.ok(sl.exist(list, { id: result[k].id }));
        test.ok(sl.exist(list2, { id: result[k].id }));
    }
    
    test.ok(sl.exist(result, { name: 'Adam', id: 1 }));
    test.ok(sl.exist(result, { name: 'Eve', id: 2 }));
}

