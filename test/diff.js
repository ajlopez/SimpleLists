
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

exports['diff list with list'] = function (test) {
    var result = sl.diff(list, list, 'id');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
}

exports['diff list with second list'] = function (test) {
    var result = sl.diff(list, list2, 'id');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    
    test.deepEqual(result[0], list[2]);
    test.deepEqual(result[1], list[3]);
}

exports['diff second list with first list'] = function (test) {
    var result = sl.diff(list2, list, 'id');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    
    test.deepEqual(result[0], list2[2]);
    test.deepEqual(result[1], list2[3]);
}

