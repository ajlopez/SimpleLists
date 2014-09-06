
var sl = require('..');

var list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

exports['first gender is man'] = function (test) {
    var result = sl.first(list, { gender: 'man' });
    
    test.ok(result);
    test.strictEqual(result, list[0]);
}

exports['where gender is woman'] = function (test) {
    var result = sl.first(list, { gender: 'woman' });    
    
    test.ok(result);
    test.strictEqual(result, list[1]);
}

exports['where id is five'] = function (test) {
    var result = sl.first(list, { id: 5 });
    
    test.strictEqual(result, null);
}

exports['where id is three and gender is man'] = function (test) {
    var result = sl.first(list, { id: 3, gender: 'man' });
    
    test.ok(result);
    test.strictEqual(result, list[2]);
}

exports['where with function'] = function (test) {
    var result = sl.first(list, function (item) {
        if (item.id % 2 == 0)
            return true;
        return false;
    });
    
    test.ok(result);
    test.strictEqual(result, list[1]);
}

