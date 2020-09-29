
const sl = (function() {
    function Set(name) {
        const set = { };
        
        this.add = function (item) {
            const key = item[name];
            
            if (set[key])
                return;
                
            set[key] = item;
        }
        
        this.remove = function (item) {
            const key = item[name];
            
            if (set[key])
                delete set[key];
        }
        
        this.elements = function () {
            const result = [];
            
            for (let n in set)
                result.push(set[n]);
                
            return result;
        }
    }
    
    function unique(list, name) {
        const set = new Set(name);
        
        list.forEach(function (item) {
            set.add(item);
        });
        
        return set.elements();
    }
    
    function union(list, list2, name) {
        const set = new Set(name);

        list.forEach(function (item) {
            set.add(item);
        });
        
        list2.forEach(function (item) {
            set.add(item);
        });
        
        return set.elements();
    }

    function intersect(list, list2, name) {
        const map1 = {};
        const map2 = {};
        
        list.forEach(function (item) {
            const key = item[name];
            
            if (key && !map1[key])
                map1[key] = item;
        });
        
        list2.forEach(function (item) {
            const key = item[name];
            
            if (key && !map2[key])
                map2[key] = item;
        });
        
        const mapresult = {};
        const result = [];
        
        for (let key in map1) {
            if (key && !mapresult[key] && map2[key]) {
                const item = map1[key];
                mapresult[key] = item;
                result.push(item);
            }
        }
        
        return result;
    }
    
    function diff(list, list2, name) {
        const set = new Set(name);

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
            const accum = { };
            
            names.forEach(function (name) {
                accum[name] = 0;
            });
            
            list.forEach(function (item) {
                names.forEach(function (name) {
                    const newvalue = item[name] + accum[name];
                    
                    if (!isNaN(newvalue))
                        accum[name] = newvalue;
                });
            });
            
            return accum;
        }
        else {
            let total = 0;
            const name = names;
        
            list.forEach(function (item) {
                const newvalue = total + item[name];
                
                if (!isNaN(newvalue))
                    total = newvalue;
            });
            
            return total;
        }
    }

    function aggr(list, key, names) {
        if (!Array.isArray(names))
            names = [names];
        
        const accums = { };
        
        list.forEach(function (item) {
            const ky = item[key];
            
            if (!accums[ky]) {
                const accum = { };
                accum[key] = ky;
                
                names.forEach(function (name) {
                    accum[name] = 0;
                });
                
                accums[ky] = accum;
            }
            
            const accum = accums[ky];
            
            names.forEach(function (name) {
                const newvalue = item[name] + accum[name];
                
                if (!isNaN(newvalue))
                    accum[name] = newvalue;
            });
        });
        
        const result = [];
        
        for (let n in accums)
            result.push(accums[n]);
            
        return result;
    }

    function project(list, names) {
        const result = [];
        
        if (typeof names === 'string')
            names = [names];

        if (typeof names === 'object' && !Array.isArray(names)) {
            list.forEach(function (item) {
                const newitem = { };
                
                for (let n in names)
                    newitem[names[n]] = item[n];

                result.push(newitem);
            });
        }
        else {
            list.forEach(function (item) {
                const newitem = { };
                
                names.forEach(function (name) {
                    newitem[name] = item[name];
                });
                
                result.push(newitem);
            });
        }
        
        return result;
    }
    
    function filter(list, filter) {
        const result = [];
        
        if (typeof filter === 'function')
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
	
	function filterOr(list, filters) {
		const result = [];
		
		list.forEach(function (item) {
			if (satisfyOr(item, filters))
				result.push(item);
		});
		
		return result;
	}

	function satisfyOr(item, filters) {
		for (let n in filters) {
			const filter = filters[n];
			
			if (satisfy(item, filter))
				return true;
		}
		
		return false;
	}
	
    function first(list, filter) {
        if (typeof filter === 'function')
            for (let n in list) {
                const item = list[n];
                if (filter(item))
                    return item;
            }            
        else
            for (let n in list) {
                const item = list[n];
                if (satisfy(item, filter))
                    return item;
            }
        
        return null;
    }
    
    function count(list, filter) {
        if (!filter)
            return Object.keys(list).length;
            
        let result = 0;
        
        if (typeof filter === 'function')
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
        if (typeof filter === 'function')
            for (let n in list) {
                const item = list[n];
                
                if (filter(item))
                    return true;
            }
        else        
            for (let n in list) {
                const item = list[n];
                
                if (satisfy(item, filter))
                    return true;
            }
        
        return false;
    }
    
    function all(list, filter) {
        for (let n in list) {
            const item = list[n];
            
            if (!satisfy(item, filter))
                return false;
        }
        
        return true;
    }

    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    function shuffle(list) {
        list = clone(list);
        
        for (let k = list.length; k; k--) {
            const j = Math.floor(Math.random() * k);
            const value = list[k - 1];
            
            list[k - 1] = list[j];
            list[j] = value;
        }
        
        return list;
    }
    
    function take(list, q) {
        const result = [];
        
        for (let n in list) {
            if (result.length === q)
                break;
            
            result.push(list[n]);
        }
        
        return result;
    }
    
    function sort(list, names, descending) {
        const result = clone(list);
        
        if (!Array.isArray(names))
            names = [names];
        
        const nnames = names.length;
        
        result.sort(function (a, b) {
            for (let k = 0; k < nnames; k++) {
                const name = names[k];
                
                const aval = a[name];
                const bval = b[name];
                
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
        const type = typeof filter;
        
        if (type === 'function')
            return filter(item);
 
        if (type === 'string')
            return item[filter] !== undefined;

        if (Array.isArray(filter)) {
            for (let n in filter)
                if (!satisfy(item, filter[n]))
                    return false;
                    
            return true;
        }
		
        for (let n in filter)
			if (n === '$or' && Array.isArray(filter[n])) {
				if (!satisfyOr(item, filter[n]))
					return false;
			}
            else if (item[n] != filter[n])
                return false;
                
        return true;
    }
    
    return {
        project: project,
        sort: sort,
        filter: filter,
        first: first,
        unique: unique,
        union: union,
        intersect: intersect,
        diff: diff,
        sum: sum,
        aggr: aggr,
        count: count,
        exist: exist,
        all: all,
        take: take,
        shuffle: shuffle
    }
})();

if (typeof window === 'undefined')
    module.exports = sl;
