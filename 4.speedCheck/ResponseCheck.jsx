import React, { useState, useRef } from "react";

const ResponseCheck = () => {
   const [state, setState] = useState('waiting');
   const [message, setMessage] = useState('클릭해서 시작하세요.');
   const [result, setResult] = useState([]);
   const timeout = useRef(null);
   const startTime = useRef();
   const endTime = useRef();

   const onClickScreen = () => {
      if( state === 'waiting') {
         setState('ready');
         setMessage('초록색이 되면 클릭하세요.');
         timeout.current = setTimeout(() => {  // 타임아웃 함수 대입
            setState('now');
            setMessage('지금 클릭');
            startTime.current = new Date();
         }, Math.floor(Math.random() * 1000) + 2000); // 2초 뒤 출력
      }  else if (state === 'ready') {  // 대기 구간 (빨강)
         clearTimeout(timeout.current);    // 타임아웃 초기화 진행
         setState('waiting');
         setMessage('너무성급하시군요. 초록색에서 클릭하세요.');
      } else if (state === 'now') {   // 반응속도 체크 구간 (초록)
         endTime.current = new Date();
         setState('waiting'),
         setMessage('클릭해서 시작하세요.'),
         setResult((prevResult) => {
            return [...prevResult, endTime.current - startTime.current];
         });
      }
   };

   const onReset = () => {
      setResult([]);
   };

   const renderAverage = () => {
      return result.length === 0 
      ? null 
      : <>
         <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
         <button onClick={onReset}>리셋</button>      
      </>
   };

   return (
      <>
            <div 
               id="screen" 
               className={state} 
               onClick={onClickScreen}
            >
               {message}
            </div>
            {renderAverage()}
         </>
   );

};

// false, undefind, null은 jsx 에서 태그 없음을 의미함.  
export default ResponseCheck;