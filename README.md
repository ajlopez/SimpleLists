# SimpleLists

Simple functions for object arrays/lists in JavaScript

## Installation

Via npm on Node:

```
npm install simplelists
```

You can include `lib/simplelists.js` directly into your HTML page. It declares the `sl` namespace.

## Usage

Reference in your Node.js program:
```javascript
var sl = require('simplelists');
```

Given an array of objects:
```javascript
var list = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 3, name: 'Abel', age: 500, gender: 'man' },
    { id: 4, name: 'Caine', age: 400, gender: 'man' }
];
```

Retrieve some fields:
```javascript
var result = sl.project(list, ['id', 'name']);
```

Retrieve only one fields:
```javascript
var result = sl.project(list, 'name');
```

Filter using query by example:
```javascript
var result = sl.where(list, { gender: 'man' });
```

Remove repeated values:
```javascript
var result = sl.unique(list, 'gender'); // Adam, Eve objects
```

Given another array of objects:
```javascript
var list2 = [
    { id: 1, name: 'Adam', age: 800, gender: 'man' },
    { id: 2, name: 'Eve', age: 600, gender: 'woman' },
    { id: 5, name: 'Set', age: 300, gender: 'man' },
    { id: 6, name: 'Sarah', age: 200, gender: 'woman' }
];
```

Union:
```javascript
var result = sl.union(list, list2 'gender'); // Adam, Eve, Abel, Caine, Set, Sahara objects
```

Difference:
```javascript
var result = sl.diff(list, list2, 'gender'); // Abel, Caine objects
```

TBD

## Development

```
git clone git://github.com/ajlopez/SimpleLists.git
cd SimpleLists
npm install
npm test
```

## Samples

TBD

## Versions

- 0.0.1 Published
- 0.0.2 Published, new functions: exist, count, first, ...

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleLists) and submit
[pull requests](https://github.com/ajlopez/SimpleLists/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

