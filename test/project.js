
var sl = require('..');

var list = [
    { id: 1, name: 'Adam', age: 800 },
    { id: 2, name: 'Eve', age: 600 },
    { id: 3, name: 'Abel', age: 500 },
    { id: 4, name: 'Caine', age: 400 }
];

exports['project name'] = function (test) {
    var result = sl.project(list, ['name']);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);
    
    for (var k = 0; k < list.length; k++) {
        test.equal(result[k].name, list[k].name);
        test.equal(Object.keys(result[k]).length, 1);
    }
}

exports['project only name'] = function (test) {
    var result = sl.project(list, 'name');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);
    
    for (var k = 0; k < list.length; k++) {
        test.equal(result[k].name, list[k].name);
        test.equal(Object.keys(result[k]).length, 1);
    }
}
exports['project id and name'] = function (test) {    var result = sl.project(list, ['id', 'name']);        test.ok(result);    test.ok(Array.isArray(result));    test.equal(result.length, list.length);        for (var k = 0; k < list.length; k++) {        test.equal(result[k].id, list[k].id);        test.equal(result[k].name, list[k].name);        test.equal(Object.keys(result[k]).length, 2);    }}
