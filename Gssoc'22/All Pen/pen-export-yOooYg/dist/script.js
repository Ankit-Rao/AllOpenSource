var app = angular.module('evaluator', [])
  .controller('AppCtrl', function ($scope, expressionEvaluator) {
    var ee = expressionEvaluator;
    function onExpressionChange(newValue, oldValue) {
      if (newValue === oldValue)
        return;
      ee.resetSteps();
      $scope.steps = [];
      evaluate(newValue);
    };

    function evaluate(newValue) {
      $scope.steps = [];
      $scope.result = ee.evaluate(newValue || $scope.expression);
      $scope.steps = ee.getSteps();
    }

    (function init() {
      $scope.steps = [];
      $scope.$watch('expression', onExpressionChange);
      $scope.expression = "3 ^ (3 + (1 + 2 - 3)) * 4 / 5";
      evaluate();
    }());
})
  .factory('expressionEvaluator', function () {
    var arithmetic = /(-?\d+(\.\d+)?)([\^*\/\+-])(-?\d+(\.\d+)?)/;
    var precedence0 = /(-?\d+(\.\d+)?)(\^)(\d+(\.\d+)?)/;
    var precedence1 = /(-?\d+(\.\d+)?)([*\/])(-?\d+(\.\d+)?)/;
    var subExpression = /\(([\s\d*\^\/\+-]+)\)/;
    var steps = [];
    var operations = {
      "^" : function(x, y){ return Math.pow(x, y); },
      "*" : function(x, y){ return x * y; },
      "/" : function(x, y){ return x / y; },
      "+" : function(x, y){ return x + y; },
      "-" : function(x, y){ return x - y; }
    };
    
    function getSteps() {
      return steps;
    }

    function resetSteps() {
      steps = [];
    }

    function addStep(step) {
      steps.push(step);
    }
    
    function sanitize(expr) {
      return expr.trim().replace(/\s+/ig, '');
    }

    function isValid(expr) {
      return arithmetic.test(expr);
    }

    function getNextSegment(expr) {
      var result = precedence0.exec(expr) || precedence1.exec(expr) || arithmetic.exec(expr);
      return result;  
    }

    function hasSubExpression(expr) {
      return /\(/g.test(expr) && 
             /\)/g.test(expr);
    }

    function getSubExpression(expr) {
      return subExpression.exec(expr);
    }

    function evaluateSegment(segment) {
      var operator = segment[3];
      var x = parseFloat(segment[1]);
      var y = parseFloat(segment[4]);
      return operations[operator](x, y);
    }

    function replaceSegmentResult(segment, result) {
      return segment.input.replace(segment[0], result.toString());
    }

    function evaluateSubExpression(expr){
      var subExprSegment = getSubExpression(expr);
      var subExpression = subExprSegment[1];
      addStep("sub expression: " + subExprSegment[0]);
      var result = evaluate(subExpression);
      return replaceSegmentResult(subExprSegment, result);
    }
    
    function evaluateNextSegment(expr){
      var segment = getNextSegment(expr);
      var result = evaluateSegment(segment);
      addStep('segment: ' + segment[0] + ' = ' + result);
      return replaceSegmentResult(segment, result); 
    }

    function evaluate(expression) {
      var expr = sanitize(expression);
      var lastItem = steps.length > 0 ? steps[steps.length - 1] : "";
      var isPartial = /sub/.test(lastItem);
      
      if(!isValid(expr)){
        console.log(expr);
      }
      
      if (!isPartial) 
        addStep("evaluating expression: " + expr);
      
      if(hasSubExpression(expr))
        return (expr = evaluate(evaluateSubExpression(expr)));
      
      if(isValid(expr))
        return (expr = evaluate(evaluateNextSegment(expr)));

      if (!isPartial)
        addStep('result: ' + expr);

      return expr;
    }

    return {
      evaluate: evaluate,
      isValid: isValid,
      sanitize: sanitize,
      getSteps: getSteps,
      resetSteps: resetSteps
    };
});