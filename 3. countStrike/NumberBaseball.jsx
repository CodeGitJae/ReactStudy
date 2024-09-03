import React, { useState, useRef } from "react";
import Try from "./Try";

function getNumbers() { // 숫자 4개를 겹치지 않고 랜덤하게 뽑아내는 함수
   const candidate = [1,2,3,4,5,6,7,8,9];
   const array = [];
   for (let i =0; i < 4; i += 1) {
      const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
   }
   return array;
}
const NumberBaseball = () => {
   const [result, setResult] = useState('');
   const [value, setValue]  = useState('');
   const [answer, setAnser] = useState(getNumbers);   //lazy init 늦은 초기화  (함수가 호출되서 리턴값을 돌려줄 때까지 기다림)
   const [tries, setTries] = useState([]);
   const inputEl = useRef(null);

   const onSubmitForm = (e) => {
      e.preventDefault();
      if(value === answer.join('')) {
         setResult('홈런');
         setTries((prevTries) => {
            return [...prevTries, { try: value, result: '홈런!' }]
         });
         alert('게임을 다시 시작합니다.');
         setValue('');
         setAnser(getNumbers());
         setTries([]);
         inputEl.current.focus();
      }  else {   // 답이 틀린 경우
         const answerArray = value.split('').map((v) => parseInt(v));
         let strike = 0;
         let ball = 0;
         if (tries.length >=  9) {  // 답을 못맞추고 10번 이상 틀렸을 때
            setResult(`10번 이상 정답을 맞추지 못했습니다! 답은 ${answer.join(',')}입니다.`);
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnser(getNumbers());    // 초기값이 아닌 곳은 호출해서 사용하는것이 올바름 
            setTries([]);
            inputEl.current.focus();
         }  else {
            for (let i = 0; i < 4; i += 1) {
               if(answerArray[i] === answer[i]) {
                  strike += 1;
               } else if (answer.includes(answerArray[i])){
                  ball += 1;
               }
            }
            setTries((prevTries) => {
              return [...prevTries, { try: value, result: `${strike} 스크라이크, ${ball} 볼 입니다.` }]
            });
            setValue('');
            inputEl.current.focus();
         }
      }
   };

   const onChageInput = (e) => {
      console.log(answer);
      setValue(e.target.value);
   };

   return (                          // 부모 (component)가 랜더링 되면 자식 또한 랜더링 됨
      <>
         <h1>{result}</h1>
         <form onSubmit={onSubmitForm}>
            <input ref={inputEl} maxLength={4} value={value} onChange={onChageInput} />
         </form>
         <div>시도: {tries.length}</div>
         <ul>
            {tries.map((v, i) => {
               return (
                  <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
               );
            })}
         </ul>
      </>
   );
};

export default NumberBaseball;  // import NumberBaseball