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

f = [
    {'id':6,'val':60},
    {'id':7,'val':70},
    {'id':8,'val':80}
];

rule.addFact(f, false); // Add array of facts. And NOT check rules after add

rul =[ 
    {
        name: 'Test1',
        when:[
            'and',
            {id:1, val:{$gte:10}},
            {id:3, val:30}
        ]
    },{
        name: 'Test2',
        when:[
            'and',
            {id:2, val:{$gt:20}}
        ]
    },{
        name: 'Test3',
        when:[
            'or',
            {id:2, val:{$gt:10}},
            {id:5, lastVal: {$gte:50} }
        ]
    }
];

rule.addRule(rul); // Add array of rules

// add other facts
rule.addFact({'id':1,'val':10}, true); // add fact and check rules after add
rule.addFact({'id':2,'val':20});       // it same 
rule.addFact({'id':3,'val':30});
rule.addFact({'id':4,'val':40});
rule.addFact({'id':5,'val':50}, false); // add fact and NOT check rules after add

rule.modFact({'val':125}, {'id':2}); // modify fact where id=2 and set val=125

rule.modFact({'lastVal':60}, {'id':5}); //modify fact where id=5 and add new property lastVal=60


```
