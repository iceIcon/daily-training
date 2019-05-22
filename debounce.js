// debounce 比如:不触发以后的1s才开始执行
const container = document.getElementById('container');
let count = 0;
function handleMove(e) {
    count++;
    container.innerHTML = count
    return '111'
}
let debounce = function(fun,wait,immedite){
    let timer = null;
    let result = null;
    let dobouncer = function() {
        let arg = arguments;
        let context = this;
        // 如果定时器存在，就清空定时器，在重新设定一个定时器
        if(timer) clearTimeout(timer);
        if(immedite) {
            // 先执行，然后设置定时器，设置为空，清空定时器，但是并不会将其赋值给置为空，注意最初的赋值，将临时某一状态缓存起来了。
            let callNow = !timer;
            timer = setTimeout(function(){
                timer = null;
            },wait)
            if(callNow) {
                result = fun.apply(context,arg)
            }
        } else {
            // -- 为什么执行了setTimeout返回值会为undefined，因为setTimeout异步；
            timer = setTimeout(function(){
                fun.apply(context,arg)
            },wait)
        }
        return result;
    }
    dobouncer.cancel = function() {
       clearTimeout(timer);
       timer = null;
    }
    return dobouncer
}

// -- 需要给事件绑定一个回调函数，绑定函数执行；
// -- this指向，基于某个节点事件绑定的调用；多种情况混搭的调用；
// -- 函数参数的类数组实现
let result = debounce(handleMove,1000,true);
container.onmousemove = function() {
    let res = result()
    console.log(res)
}

document.getElementById("button").addEventListener('click', function(){
    result.cancel();
})

// 学习到的点：
// -- 元素节点的事件绑定，this的指向，指向绑定的元素，注意是最内层的函数调用；
// -- arguments 函数参数的类数组的实现；
// -- 清空定时器，但是并不会将其赋值给置为空，注意最初的赋值，将临时某一状态缓存起来了
// -- 箭头函数this指向，以函数的调用时所指的this来平衡