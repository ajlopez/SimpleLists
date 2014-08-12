
var sl = require('..');

var list = [
    { id: 1, name: 'Adam', age: 800 },
    { id: 2, name: 'Eve', age: 600 },
    { id: 3, name: 'Abel', age: 500 },
    { id: 4, name: 'Caine', age: 400 }
];

exports['sort by name'] = function (test) {
    var result = sl.sort(list, 'name');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);

        test.ok(result[k - 1].name <= result[k].name);
}
