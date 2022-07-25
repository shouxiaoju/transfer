import { useRef, useState, useEffect } from 'react';

const useCountDown = (endTimeStamp: number) => {
  // 定义状态
  const [seconds, setSeconds]= useState(endTimeStamp)  
  const timer:any=useRef()
  useEffect(() => {
    if(seconds!==0){
      timer.current = setTimeout(() => {
        let current = seconds-1; 
        setSeconds(current)
      }, 1000);
    }
    if (seconds === 0) {
      clearTimeout(timer);//清除定时器
    }
    return () => {//清除定时器
      clearTimeout(timer);
    }
  }, [seconds])

  // 返回状态
  return [seconds];
};

export default useCountDown;