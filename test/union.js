
var sl = require('..');

var list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

var list2 = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 5, name: 'Set', age: 300, gender: 'man' },
    { id: 6, name: 'Sarah', age: 200, gender: 'woman' }
];

exports['union list with list'] = function (test) {
    var result = sl.union(list, list, 'id');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);
    
    for (var k = 0; k < result.length; k++)
        test.equal(result[k].id, list[k].id);
}

exports['union list with second list'] = function (test) {
    var result = sl.union(list, list2, 'id');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length + 2);
    
    for (var k = 0; k < list.length; k++)
        test.equal(result[k].id, list[k].id);
        
    test.deepEqual(result[result.length - 2], list2[list2.length - 2]);
    test.deepEqual(result[result.length - 1], list2[list2.length - 1]);
}

