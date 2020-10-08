
const sl = require('..');

const list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];

exports['filter name is Adam or name is Eve'] = function (test) {
    const result = sl.filter(list, { $or: [ { name: 'Adam' }, { name: 'Eve' } ] });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
	
	test.ok(sl.exist(result, { name: 'Adam' }));
	test.ok(sl.exist(result, { name: 'Eve' }));
}

exports['filter name is Adam or name is Eve and gender is man'] = function (test) {
    const result = sl.filter(list, { $or: [ { name: 'Adam' }, { name: 'Eve' } ], gender: 'man' });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
	
	test.ok(sl.exist(result, { name: 'Adam' }));
}

