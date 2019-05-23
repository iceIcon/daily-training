let count = 0;
let container = document.getElementById('container');
function handleContainer() {
    count++;
    container.innerHTML = count;
}

// 定时器的实现，重复触发-如果还存在-就丢掉-给定时间触发
function throttle(fun,wait) {
    let timer = null;
    return function() {
        let arg = arguments;
        let context = this;
        if(!timer) {
            timer = setTimeout(function(){
                fun.apply(context,arg);
                timer = null;
            },wait)
        }
    }
}

// 时间戳的实现--现在时间-之前时间 > 等待时间 就执行
function throttle2(fun,wait) {
    let previous = 0;
    return function() {
        let arg = arguments;
        let context = this;
        var now = +new Date();
        if(now - previous > wait) {
            fun.apply(context,arg);
            previous = now;
        }
    }
}

// 两者结合, 有头有尾
function throttle3(fun,wait) {
    let timer = null;
    let previous = 0;
    let arg, context;
    let later = function() {
        previous = +new Date();
        clearTimeout(timer);
        timer = null;
        fun.apply(context,arg);
    }
    return function() {
        context = this;
        arg = arguments;
        let now = +new Date();
        // -- 主要这个比较难算,这个时间概念比较难理解 -- 如果没有剩余的时间了或者你改了系统时间
        // -- 大于3s就触发第一种，没有大于就第二种；算剩余触发时间；
        let remaining = wait - (now - previous);
        if(remaining <= 0 || remaining-wait > 0) {
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = +new Date();
            fun.apply(context,arg);
        }
        else if(!timer){
            timer = setTimeout(later,remaining)
        }
    }

}

// 比较两种方法的实现 -- 时间戳先触发执行；定时器延迟执行，并且停止触发后还可能有一次触发；前者有头无尾；后者无头有尾
container.onmousemove = throttle3(handleContainer,2000);