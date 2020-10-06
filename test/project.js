
const sl = require('..');

const list = [
    { id: 1, name: 'Adam', age: 800 },
    { id: 2, name: 'Eve', age: 600 },
    { id: 3, name: 'Abel', age: 500 },
    { id: 4, name: 'Caine', age: 400 }
];

exports['project name'] = function (test) {
    const result = sl.project(list, ['name']);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);
    
    for (let k = 0; k < list.length; k++) {
        test.equal(result[k].name, list[k].name);
        test.equal(Object.keys(result[k]).length, 1);
    }
}

exports['project only name'] = function (test) {
    const result = sl.project(list, 'name');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);
    
    for (let k = 0; k < list.length; k++) {
        test.equal(result[k].name, list[k].name);
        test.equal(Object.keys(result[k]).length, 1);
    }
}
exports['project id and name'] = function (test) {    const result = sl.project(list, ['id', 'name']);        test.ok(result);    test.ok(Array.isArray(result));    test.equal(result.length, list.length);        for (let k = 0; k < list.length; k++) {        test.equal(result[k].id, list[k].id);        test.equal(result[k].name, list[k].name);        test.equal(Object.keys(result[k]).length, 2);    }}exports['project id and name with rename'] = function (test) {
    const result = sl.project(list, { id: 'id2', name: 'name2' });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, list.length);
    
    for (let k = 0; k < list.length; k++) {
        test.equal(result[k].id2, list[k].id);
        test.equal(result[k].name2, list[k].name);
        test.equal(Object.keys(result[k]).length, 2);
    }
}


