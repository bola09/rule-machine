var log4js = require('log4js');
var logger = log4js.getLogger();
//var _ = require('lodash');
//require("underscore-query")(_);
var fire = require('./rule-machine/rule-machine.js');

var rule = new fire({
    onlyNewFire : true
});


rule.on('FIRE',function(fired){
    console.log(fired);
});

rule.addFact({'id':1,'val':10}, false);
rule.addFact({'id':2,'val':20}, false);
rule.addFact({'id':3,'val':30}, false);
rule.addFact({'id':4,'val':40}, false);
rule.addFact({'id':5,'val':50}, false);

//console.log(rule.getFact());

rul =[ 
    {
        name: 'Test1',
        when:[
            'and',
            {id:1, val:{$gt:10}},
            {id:3, val:30}
        ]
    },{
        name: 'Test2',
        when:[
            'and',
            {id:2, val:{$gt:10}}
        ]
    },{
        name: 'Test3',
        when:[
            'and',
            {id:2, val:{$gt:10}},
            {id:5, lastVal: {$gt:50} }
        ]
    }
];

rule.addRule(rul);
//console.log(rule.getRule());
//console.log(rule.getFact());

//rule.check();
//console.log(rule.getRule());

//rule.modFact({'lastVal':30}, {'val':{$lte:30}});
rule.modFact({'val':125}, {'id':1});

//rule.modFact({'lastVal':30}, {'val':{$lte:30}});
console.log(rule.getFact());
rule.modFact({'val':1}, {'val':{$gt:1}})

//rule.delRule();

//rule.modFact({'val':10}, {'id':1});
console.log(rule.getFact());

rule.modFact({'val':100}, {'val':1})

rule.modFact({'lastVal':60}, {'id':5});

//console.log(rule.getFact());

rule.modFact({'val':15}, {'id':1});
rule.modFact({'val':30}, {'id':3});



