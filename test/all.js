
var sl = require('..');

var list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

exports['all with age'] = function (test) {
    test.ok(sl.all(list, "age"));
}

exports['all with age and name'] = function (test) {
    test.ok(sl.all(list, [ "age", "name" ]));
}

exports['all with age, name and parents'] = function (test) {
    test.ok(!sl.all(list, [ "age", "name", "parents" ]));
}

exports['all with positive age'] = function (test) {
    test.ok(sl.all(list, function (obj) { return obj.age > 0; }));
}

exports['all with age, name and parents on empty objects list'] = function (test) {
    test.ok(!sl.all([ {}, {} ], [ "age", "name", "parents" ]));
}
