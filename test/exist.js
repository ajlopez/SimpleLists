
const sl = require('..');

const list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

exports['exist Adam'] = function (test) {
    test.strictEqual(sl.exist(list, { name: 'Adam' }), true);
}

exports['exist gender man'] = function (test) {
    test.strictEqual(sl.exist(list, { gender: 'man' }), true);
}

exports['does not exist gender none'] = function (test) {
    test.strictEqual(sl.exist(list, { gender: 'none' }), false);
}

exports['exist with function'] = function (test) {
    test.strictEqual(sl.exist(list, function (item) { return item.gender != null }), true);
}
