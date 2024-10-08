import React, { useState, useRef, useEffect, memo } from "react";
import useInterval from "./useInterval";

// 컴포넌트의 일생
// 클래스의 경우 -> constructor -> render -> ref(추가시 먼저동작) -> componentDidMount
// -> [ setSate/props 바뀔 때 -> shouldComponentUpdate(true) -> render(리랜더링) -> componentDidUpdate ]
// 부모가 자식 컴포넌트를 없을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
   바위: '0',
   가위: '-142px',
   보: '-284px',
};

const scores = {
   가위: 1,
   바위: 0,
   보: -1,
};

const computerChoice = (imgCoord) => {
   return Object.entries(rspCoords).find(function(v){
      return v[1] === imgCoord;
   })[0];
};


const RSP = memo(() => {
   const [result, setResult] = useState('');
   const [imgCoord, setImgCoord] = useState(rspCoords.바위);
   const [score, setScore] = useState(0);
   const [isRunning, setIsRunning] = useState(true);

   const changeHand = () => {
      if(imgCoord === rspCoords.바위) {
         setImgCoord(rspCoords.가위)
      } else if (imgCoord === rspCoords.가위) {
         setImgCoord(rspCoords.보)
      } else if (imgCoord === rspCoords.보) {
         setImgCoord(rspCoords.바위)
      }
   };

   useInterval(changeHand, isRunning ? 100 : null);

   const onClickBtn = (choise) => () => {
      if(isRunning) {
         setIsRunning(false);
         const myScore = scores[choise];
         const cpuScore = scores[computerChoice(imgCoord)];
         const diff = myScore - cpuScore;
         if(diff === 0) {
            setResult('비겼습니다!');
         } else if([-1, 2].includes(diff)){
            setResult('이겼습니다.');
            setScore((prevScore) => prevScore + 1);
         } else {
            setResult('졌습니다.');
            setScore((prevScore) => prevScore - 1);
         }
         setTimeout(() => {
            setIsRunning(true);
         }, 1000);
      }
   };

   const onStopGame = () => () => {
      setIsRunning(false);
   }

   return (
      <>
         <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
         <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            <br /><button onClick={onStopGame()}>게임 멈춤</button>
         </div>
         <div>{result}</div>
         <div>현재 {score}점</div>
      </>
   );
});

export default RSP;

// jsx -> client -> ReactDom 