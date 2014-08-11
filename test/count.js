
var sl = require('..');

var list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

exports['count list'] = function (test) {
    var result = sl.count(list);
    
    test.ok(result);
    test.equal(result, 4);
}

exports['count list with filter object'] = function (test) {
    var result = sl.count(list, { gender: 'man' });
    
    test.ok(result);
    test.equal(result, 3);
}

exports['count list with filter function'] = function (test) {
    var result = sl.count(list, function (item) {
        return item.gender == 'woman';
    });
    
    test.ok(result);
    test.equal(result, 1);
}

exports['count array with deleted item'] = function (test) {
    var foo = [1, 2, 3];
    
    test.equal(sl.count(foo), 3);
    
    delete foo[1];
    
    test.equal(sl.count(foo), 2);
}
