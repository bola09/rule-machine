var util = require('util');
var events = require('events');
var _ = require('lodash');
require("underscore-query")(_);

var rulemachine = function (options) {
		options = typeof options !== 'undefined' ? options : {};
		options.onlyNewFire = typeof options.onlyNewFire !== 'undefined' ? options.onlyNewFire : true;
        var self = this;
 		this.facts = [];
 		this.rules = [];
 		this.fired = [];
 		this.onlyNewFire = options.onlyNewFire;

};

rulemachine.prototype = new events.EventEmitter;

rulemachine.prototype.addFact = function (obj, needCheck) {
	needCheck = typeof needCheck !== 'undefined' ? needCheck : true;
	this.facts.push(obj);
	if (needCheck){
		this.check();
	};
};

rulemachine.prototype.modFact = function(newObj, modObj, needCheck) {
	var self = this;
	needCheck = typeof needCheck !== 'undefined' ? needCheck : true;
	var curObj = _.query(this.facts, modObj);
	curObj.forEach(function (el, index, array){
		self.delFact(el, false);
		for (var key in newObj) {
			el[key] = newObj[key];
		};
		self.addFact(el, false);
	});
	if (needCheck){
		this.check();
	};
};

rulemachine.prototype.delFact = function (obj, needCheck) {
	needCheck = typeof needCheck !== 'undefined' ? needCheck : true;
	if (obj){
		this.facts=_.reject(this.facts,obj);
		if (needCheck){ 
			this.check(); 
		};
	}else{
		this.facts=[];
	};
};

rulemachine.prototype.getFact = function (obj) {
	if (obj) {
		return _.query(this.facts,obj);
	}else{
		return this.facts;
	};       
};

rulemachine.prototype.addRule = function (obj) {
	var self = this;
	if (_.isArray(obj)){
		obj.forEach(function (el, index, array){
			self.addRule(el);
		});
	}else if (_.isObject(obj) && obj.name){
			this.delRule(obj.name);
			this.rules.push(obj);
	}else{
		console.log('ERROR when add Rule');
	};
};

rulemachine.prototype.delRule = function (str) {
	if (str) {
		this.rules = _.reject(this.rules,{name: str});
	}else{
		this.rules = [];
	};
};

rulemachine.prototype.getRule = function (str) {
	if (str) {
		return _.filter(this.rules,{name: str});
	}else{
		return this.rules;
	};
};

rulemachine.prototype.check = function() {
	var self = this;
	var curFired = [];
	this.rules.forEach(function (el, index, array){
		if (self.checkRule(el.when)){
			curFired.push(el.name);
		};
	});
	if (curFired.length>0){
		if (self.onlyNewFire){
			var fireToEmit = _.difference(curFired, self.fired);
			if (fireToEmit.length>0){
				self.emit('FIRE', fireToEmit);
			};
		}else{
			self.emit('FIRE', curFired);
		};
		self.fired = curFired;
	}else{
		self.fired = [];
	};
};

rulemachine.prototype.checkRule = function(rule) {
	var self = this;
	if (_.isArray(rule)) {
        if (_.isString(rule[0]) && (rule[0]=='or' || rule[0]=='and')){
            var type=rule[0];
            var ruleResult =[];
            rule.forEach(function (el, index, array) {
                if (index>0){
                    if ( _.isArray(el) ){
                        ruleResult.push({when:self.checkRule(el)});
                    }else if(_.isObject(el)){
                        if (_.query(self.facts, el).length>0){
                            ruleResult.push({when:true});
                        }else{
                            ruleResult.push({when:false});
                        };
                    }else{
                        console.log('REEROR: ')            
                    };
                };
            });
            if (type == 'or'){
                return _.some(ruleResult, 'when');
            }else{
                return _.every(ruleResult, 'when');
            };
        }else{
            console.log('REEROR: Statement is not present or wrong!')
        };
    };
};

module.exports = rulemachine;