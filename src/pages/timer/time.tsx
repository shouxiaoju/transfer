import { useState,useEffect,useRef } from "react";

interface  Params{
    [propName: string]: string|number;
}

const Timer=()=>{

    /* function urlParse(url:string):Params|string{
        
        if(url.split("?").length>1){
            let str=url.split("?")[1].split("&")
            let newobj:Params = {}
                str.map((item: string) => {
                    newobj[item.split("=")[0]] = item.split("=")[1]
                })
            return newobj
        }
        return url
        
    }

   console.log(urlParse("https://es6.ruanyifeng.com/#docs/async?name=张三&age=18"));

    function queryParse(query:Params,url:string):string{

        let queryText =url.includes("?")? url[url.length-1]==="&"? url:url+"&": url+"?";
        for(let key in query){
            queryText += `${key}=${query[key]}&`;
        }
        return queryText.slice(0,-1);
    }
   console.log(queryParse({name: '张三', age: '18'},"https://es6.ruanyifeng.com/#docs/async?text=1"));

    const obj = {
        a: {
           name:"zhang"
        },
        b: [1, 5, 11, 23, 422,{age:12}],
        c: 3,
        d: 'abc',
        e: function () {
            console.log('hello world');
        },
    };

    function clone<T extends any>(obj:T):T{
        if(Array.isArray(obj)){
            return obj.map(item =>typeof item === 'object'? clone(item):item) as T;
        }
        let result:T={} as T
        for (let key in obj) {
            if (obj[key]) {
                if (typeof obj[key] === 'object') {
                // 如果是对象，再次调用该方法自身
                    result[key] = clone(obj[key]);
                } else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }
    console.log("clone",clone(obj)); */

    const [num,setNum]=useState(0)
    let reftex=useRef(0)
    const add=()=>{
        setNum(num+1)
        setTimeout(() => {
            console.log(reftex.current);
            
        }, 5000);
    }
    const add1=()=>{
        setNum(num+1)
        
    }
    useEffect(()=>{
        reftex.current=num
    },[num])

    const shake=()=>{
        setNum(num+1)
    }
    useEffect(()=>{
        let timer=setTimeout(()=>{
            console.log("防抖");
        },1000)
        return ()=>clearTimeout(timer)
    },[num])
    return (
        <div>
            值：{num}
            <button onClick={add}>点击生产延时器</button>
            <button onClick={add1}>点击</button>
            <button onClick={shake}>防抖</button>
        </div>
    )
}
export default Timer