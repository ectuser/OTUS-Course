function foo(...array){
    function add(...toSum){
        return foo(...array, ...toSum);
    }
    let sum = 0;
    for (el of array){
        sum += el;
    }
    add.value = sum;
    return add;
}
var result = foo(1)(2)(-10)
                        .value;
console.log(result);