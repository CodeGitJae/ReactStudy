import React, { Component } from "react";

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


class RSP extends Component {
   state = {
      result: '',
      imgCoord: '0',
      score: 0,
   };

   interval;

   componentDidMount() {     // 컴포넌트의 첫 랜더링이 성공했을 때만 DidMount가 실행된다고함. / 비동기 요청을 많이 함. 
      this.interval = setInterval(this.changeHand, 100);
   }

   // componentDidUpdate() {     // 첫 랜더링 이후 setState(메서드), props(속성)등을 통한 리랜더링 시 실행됨 

   // }

   componentWillUnmount() {     // 컴포넌트가 제거되기 직전  // 비동기 요청 정리를 많이 함.
      clearInterval(this.interval);
   }

   onClickBtn = (choise) => () => {
      const { imgCoord } = this.state;
      clearInterval(this.interval);
      const myScore = scores[choise];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if(diff === 0) {
         this.setState({
            result: '비겼습니다!',
         });
      } else if([-1, 2].includes(diff)){
         this.setState((prevScore) =>{
            return {
               result: '이겼습니다!',
               score: prevScore.score + 1,
            };
         });
      } else {
         this.setState((prevScore) => {
            return {
               result: '졌습니다.',
               score: prevScore.score - 1,
            };
         });
      }
      setTimeout(() => {
         this.interval = setInterval(this.changeHand, 100);
      }, 2000);
     
   };

   changeHand = () => {
      const { imgCoord } = this.state;    // 비동기 함수가  함수 밖에 있는 변수를 참조하면  클로저 이슈가 발생하니 조심해야함. (javascript 관련 지식)
      if(imgCoord === rspCoords.바위) {
         this.setState({
            imgCoord: rspCoords.가위,
         });
      } else if (imgCoord === rspCoords.가위) {
         this.setState({
            imgCoord: rspCoords.보,
         });
      } else if (imgCoord === rspCoords.보) {
         this.setState({
            imgCoord: rspCoords.바위,
         });
      }
   };

   onStopGame = () => () => {
      clearInterval(this.interval);
   }

   render() {
      const { result, score, imgCoord } = this.state;   // 0, 142, 284
      return (
         <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
               <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
               <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
               <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
               <br /><button onClick={this.onStopGame()}>게임 멈춤</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
         </>
      );
   }
}

export default RSP;

// jsx -> client -> ReactDom 