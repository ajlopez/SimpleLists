
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
    for (var k = 1; k < list.length; k++)
        test.ok(result[k - 1].name <= result[k].name);
}
exports['sort by age'] = function (test) {    var result = sl.sort(list, 'age');        test.ok(result);    test.ok(Array.isArray(result));    test.equal(result.length, list.length);    for (var k = 1; k < list.length; k++)        test.ok(result[k - 1].age <= result[k].age);}exports['sort by descending name'] = function (test) {    var result = sl.sort(list, 'name', true);        test.ok(result);    test.ok(Array.isArray(result));    test.equal(result.length, list.length);    for (var k = 1; k < list.length; k++)        test.ok(result[k - 1].name >= result[k].name);}