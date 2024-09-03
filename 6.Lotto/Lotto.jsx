import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Ball from "./Ball";

function getWinNumbers() {
   console.log('getWinNumbers');
   const candidate = Array(45).fill().map((v, i) => i + 1);
   const shuffle = [];
   while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1) [0]);
   }
   const bonusNumber = shuffle[shuffle.length - 1];
   const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
   return [...winNumbers, bonusNumber];
}

// hooks 관련 중요한 팁
// 1. 조건문 안에 넣으면 절대 안됨. 위치는 항상 최상단에 위치하도록 해야함.
//          함수나 반복문 안에 넣는것도 주의가 필요.
//    이유: 만약 if문 안에 훅스가 있다면 조건에 따라 순서에서 사라질수도 있어서 데이터에 문제가 생김

// 2. 다른 훅스(useEffect, useMemo, useCallback)안에 useState를 다시 선언해서는 안됨.

const Lotto = () => {                                          // hooks에 특성 때문에 코드 전체가 다시 실행되는 탓에 getWinNumbers 메서드가 계속 실행되는것을 막기 위해서 useMemo에 저장
   // Hooks
   const lottoNumbers = useMemo(() => getWinNumbers(), []);    // useMemo에 데이터가 바인딩 되기 때문에 함수를 계속 호출 하지 않고도 정상 동작할 수 있음.    
   const [winNumbers, setWinNumbers] = useState(lottoNumbers);  // 두번째 인수 [] 에 값이 바뀌기 전까지 useMemo에 바인딩 된 값은 유지됨.
   const [winBalls, setWinBalls] = useState([]);
   const [bonus, setBonus] = useState(null);
   const [redo, setRedo] = useState(false);
   const timeouts = useRef([]);

   useEffect(() => {
      console.log('runTimeouts');
      for(let i = 0; i < winNumbers.length -1; i++) {   // 비동기 통신할 때 let을 사용하면 클로저 문제가 안생김
         timeouts.current[i] = setTimeout(() => {
            setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
         }, (i + 1) * 1000);
      }
      timeouts.current[6] = setTimeout(() => {
         setBonus(winNumbers[6]);
         setRedo(true);
      }, 7000);

      return () => {
         timeouts.current.forEach((v) => {
            clearTimeout(v);
         });
      };
   }, [timeouts.current]);  // 빈 배열일 때 componentDidMount 와 같음 _ 첫 랜더링과 동시에 시작되고, 그다음 ↓
   // 배열에 요소가 있으면 componentDidUpdate를 수행 ___ 결국 componentDidMount + componentDidUpdate 임


   // useEffect는 여러개 생성할 수도 있음. 다만 두번째 인수에 따라서 componentDidUpdate가 실행된다는 것만 알아 두기
   useEffect(() => {
      alert('로또 숫자를 생성합니다.');
      // componentDidMount안에서 ajax 통신
   }, [winNumbers]);

   // componentDidMount 없이 바로 Update에서 ajax 비동기 통신하는 패턴
   const mounted = useRef(false);
   useEffect(() => {
      if(!mounted.current) {
         mounted.current = true;
      } else {
         // ajax 통신
      }
   }, [/*바뀌는값*/]);

   const onClickRedo = useCallback(() => {   // useCallback(훅 종류중 하나)은 함수 컴포넌트에 주로 사용됨__ 함수를 기억하는데 사용됨 
      console.log('onClickRedo');            // 두번쨰 인자([])가 바뀌지 않는 한 처음 저장된 데이터가 계속 유지됨. 
      console.log(winNumbers);               // 그래서 데이터가 바뀌어야 하는 시점에 따라 두번쨰 인자를 어느 것을 넣을지가 결정됨.
      setWinNumbers(getWinNumbers());
      setWinBalls([]);
      setBonus(null);
      setRedo(false);
      timeouts.current = [];
   }, [winNumbers]);           

   return (
      <>
         <div>당첨 숫자</div>
         <div id="결과창">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
         </div>
         <div>보너스!</div>                      {/*onclick={onClickRedo}   부모가 자식에게 함수를 전달할 때는 useCallback을 필수로 적용해줘야함. */}
         {bonus && <Ball number={bonus} />}     {/* 그냥 함수를 넘기면 자식은 부모가 계속 다른 props을 넘겨주는것으로 인식하여 매번 리랜더링이 발생할 수도 있음 */}
         {redo && <button onClick={onClickRedo}>한번더!!</button>}   {/*조건문 AND 연산자*/} 
      </>
   );
};

export default Lotto;