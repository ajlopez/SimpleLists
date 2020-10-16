
const sl = require('..');

exports['take three elements'] = function (test) {
    const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    const taken = sl.take(values, 3);
    
    test.ok(taken);
    test.ok(Array.isArray(taken));
    test.equal(taken.length, 3);
    
    test.equal(taken[0], 0);
    test.equal(taken[1], 1);
    test.equal(taken[2], 2);
    
    test.equal(values.length, 10);
};

