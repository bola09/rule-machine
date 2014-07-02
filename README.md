Rule-Machine
=================
Rules Engine for Node.JS 

Installation
============
Using npm:

```bash
$ npm install rule-machine
```

Basic Usage
===========
The following are some basic examples:
```js
var rm = require('rule-machine');
var rule = new rm({
    onlyNewFire : true // Fired only new events (default: true)
});

rule.on('FIRE',function(fired){ //Names array of fired rules
    console.log(fired);
});


```
