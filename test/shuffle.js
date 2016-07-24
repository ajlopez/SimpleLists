
var sl = require('..');

exports['shuffle ten elements'] = function (test) {
    var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    var shuffled = sl.shuffle(values);
    
    test.ok(shuffled);
    test.ok(Array.isArray(shuffled));
    test.equal(shuffled.length, 10);
    
    for (var k = 0; k < 10; k++)
        test.ok(shuffled.indexOf(k) >= 0);
};

