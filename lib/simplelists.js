
var sl = (function() {
    function Set(name) {
        var set = { };
        
        this.add = function (item) {
            var key = item[name];
            
            if (set[key])
                return;
                
            set[key] = item;
        }
        
        this.remove = function (item) {
            var key = item[name];
            
            if (set[key])
                delete set[key];
        }
        
        this.elements = function () {
            var result = [];
            
            for (var n in set)
                result.push(set[n]);
                
            return result;
        }
    }
    
    function unique(list, name) {
        var set = new Set(name);
        
        list.forEach(function (item) {
            set.add(item);
        });
        
        return set.elements();
    }
    
    function union(list, list2, name) {
        var set = new Set(name);

        list.forEach(function (item) {
            set.add(item);
        });
        
        list2.forEach(function (item) {
            set.add(item);
        });
        
        return set.elements();
    }

    function intersect(list, list2, name) {
        var map1 = {};
        var map2 = {};
        
        list.forEach(function (item) {
            var key = item[name];
            
            if (key && !map1[key])
                map1[key] = item;
        });
        
        list2.forEach(function (item) {
            var key = item[name];
            
            if (key && !map2[key])
                map2[key] = item;
        });
        
        var mapresult = {};
        var result = [];
        
        for (var key in map1) {
            if (key && !mapresult[key] && map2[key]) {
                var item = map1[key];
                mapresult[key] = item;
                result.push(item);
            }
        }
        
        return result;
    }
    
    function diff(list, list2, name) {
        var set = new Set(name);

        list.forEach(function (item) {
            set.add(item);
        });
        
        list2.forEach(function (item) {
            set.remove(item);
        });
        
        return set.elements();
    }
    
    function sum(list, names) {
        if (Array.isArray(names)) {
            var accum = { };
            
            names.forEach(function (name) {
                accum[name] = 0;
            });
            
            list.forEach(function (item) {
                names.forEach(function (name) {
                    var newvalue = item[name] + accum[name];
                    
                    if (!isNaN(newvalue))
                        accum[name] = newvalue;
                });
            });
            
            return accum;
        }
        else {
            var total = 0;
            var name = names;
        
            list.forEach(function (item) {
                var newvalue = total + item[name];
                
                if (!isNaN(newvalue))
                    total = newvalue;
            });
            
            return total;
        }
    }

    function aggr(list, key, names) {
        if (!Array.isArray(names))
            names = [names];
        
        var accums = { };
        
        list.forEach(function (item) {
            var ky = item[key];
            
            if (!accums[ky]) {
                var accum = { };
                accum[key] = ky;
                
                names.forEach(function (name) {
                    accum[name] = 0;
                });
                
                accums[ky] = accum;
            }
            
            var accum = accums[ky];
            
            names.forEach(function (name) {
                var newvalue = item[name] + accum[name];
                
                if (!isNaN(newvalue))
                    accum[name] = newvalue;
            });
        });
        
        var result = [];
        
        for (var n in accums)
            result.push(accums[n]);
            
        return result;
    }

    function project(list, names) {
        var result = [];
        
        if (typeof names == 'string')
            names = [names];

        if (typeof names == 'object' && !Array.isArray(names)) {
            list.forEach(function (item) {
                var newitem = { };
                
                for (var n in names)
                    newitem[names[n]] = item[n];

                result.push(newitem);
            });
        }
        else {
            list.forEach(function (item) {
                var newitem = { };
                
                names.forEach(function (name) {
                    newitem[name] = item[name];
                });
                
                result.push(newitem);
            });
        }
        
        return result;
    }
    
    function where(list, filter) {
        var result = [];
        
        if (typeof filter == 'function')
            list.forEach(function (item) {
                if (filter(item))
                    result.push(item);
            });
        else        
            list.forEach(function (item) {
                if (satisfy(item, filter))
                    result.push(item);
            });
        
        return result;
    }
    
    function first(list, filter) {
        if (typeof filter == 'function')
            for (var n in list) {
                var item = list[n];
                if (filter(item))
                    return item;
            }            
        else
            for (var n in list) {
                var item = list[n];
                if (satisfy(item, filter))
                    return item;
            }
        
        return null;
    }
    
    function count(list, filter) {
        if (!filter)
            return Object.keys(list).length;
            
        var result = 0;
        
        if (typeof filter == 'function')
            list.forEach(function (item) {
                if (filter(item))
                    result++;
            });
        else        
            list.forEach(function (item) {
                if (satisfy(item, filter))
                    result++;
            });
        
        return result;
    }
    
    function exist(list, filter) {
        if (typeof filter == 'function')
            for (var n in list) {
                var item = list[n];
                if (filter(item))
                    return true;
            }
        else        
            for (var n in list) {
                var item = list[n];
                if (satisfy(item, filter))
                    return true;
            }
        
        return false;
    }
    
    function all(list, filter) {
        for (var n in list) {
            var item = list[n];
            if (!satisfy(item, filter))
                return false;
        }
        
        return true;
    }
    
    function sort(list, names, descending) {
        var result = clone(list);
        
        if (!Array.isArray(names))
            names = [names];
        
        var nnames = names.length;
        
        result.sort(function (a, b) {
            for (var k = 0; k < nnames; k++) {
                var name = names[k];
                
                var aval = a[name];
                var bval = b[name];
                
                if (aval == bval)
                    continue;
                
                if (aval < bval)
                    if (descending)
                        return 1;
                    else
                        return -1;
                    
                if (aval > bval)
                    if (descending)
                        return -1;
                    else
                        return 1;
            }
                
            return 0;
        });
        
        return result;
    }
    
    function clone(list) {
        return list.slice(0);
    }
    
    function satisfy(item, filter) {
        var type = typeof filter;
        
        if (type === 'function')
            return filter(item);
 
        if (type === 'string')
            return item[filter] !== undefined;

        if (type === 'object' && Array.isArray(filter)) {
            for (var n in filter)
                if (!satisfy(item, filter[n]))
                    return false;
                    
            return true;
        }
        
        for (var n in filter)
            if (item[n] != filter[n])
                return false;
                
        return true;
    }
    
    return {
        project: project,
        sort: sort,
        where: where,
        first: first,
        unique: unique,
        union: union,
        intersect: intersect,
        diff: diff,
        sum: sum,
        aggr: aggr,
        count: count,
        exist: exist,
        all: all
    }
})();

if (typeof window == 'undefined')
    module.exports = sl;
