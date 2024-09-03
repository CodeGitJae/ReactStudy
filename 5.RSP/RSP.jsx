import React, { useState, useRef, useEffect, memo } from "react";

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
   const interval = useRef();

   // useEffect에서 첫번째 인수는 함수 이고 두번째 인수는 배열__ 배열에서 클로저 이슈를 해결 해야함.
   useEffect(() => {    // componentDidmount, componentDidUpdate 역할 _ (1대1 대응은 아님 / 2개 기능을 합친 경우라고 튜토리얼에서 설명)
      interval.current = setInterval(changeHand, 100);
      return () => {   // componentWillUnmount 역할  
         clearInterval(interval.current);
      }
   }, [imgCoord]);

   const onClickBtn = (choise) => () => {
      clearInterval(interval.current);
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
         interval.current = setInterval(changeHand, 100);
      }, 2000);
   };


   const changeHand = () => {
      if(imgCoord === rspCoords.바위) {
         setImgCoord(rspCoords.가위)
      } else if (imgCoord === rspCoords.가위) {
         setImgCoord(rspCoords.보)
      } else if (imgCoord === rspCoords.보) {
         setImgCoord(rspCoords.바위)
      }
   }

   const onStopGame = () => () => {
      clearInterval(interval.current);
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