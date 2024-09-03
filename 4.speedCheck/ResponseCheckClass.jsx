import React, { Component } from "react";

class ResponseCheck  extends Component {
   state = {
      state: 'waiting',
      message: '클릭해서 시작하세요.',
      result: [],
   };

   timeout;  // 타임아웃 변수 선언
   startTime;   // 반응속도 시작시간 변수 선언
   endTime;     // 반응속도 종료시간 변수 선언

   onClickScreen = () => {
      const { state, message, result } = this.state;
      if( state === 'waiting') {
         this.setState({
            state: 'ready',
            message: '초록색이 되면 클릭하세요.',
         });
         this.timeout = setTimeout(() => {  // 타임아웃 함수 대입
            this.setState({
               state: 'now',
               message: '지금 클릭',
            });
            this.startTime = new Date();
         }, Math.floor(Math.random() * 1000) + 2000); // 2초 뒤 출력
      }  else if (state === 'ready') {  // 대기 구간 (빨강)
         clearTimeout(this.timeout);    // 타임아웃 초기화 진행
         this.setState({
            state: 'waiting',
            message: '너무성급하시군요. 초록색에서 클릭하세요.'
         });
      } else if (state === 'now') {   // 반응속도 체크 구간 (초록)
         this.endTime = new Date();
         this.setState((prevState) =>{
            return {
               state: 'waiting',
               message: '클릭해서 시작하세요.',
               result: [...prevState.result, this.endTime - this.startTime],
            };
         });
      }
   };

   onReset = () => {
      this.setState({
         result: [],
      });
   };

   renderAverage = () => {
      const { result } = this.state;
      return result.length === 0 
      ? null 
      : <>
         <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
         <button onClick={this.onReset}>리셋</button>      
      </>
   };

   render() {    // 랜더링 return 부분 안에서는 for와 if를 사용하지 못하기 때문에 삼항 연산자를 주로 사용함
      const { state, message } = this.state;
      return (
         <>
            <div 
               id="screen" 
               className={state} 
               onClick={this.onClickScreen}
            >
               {message}
            </div>
            {this.renderAverage()}
         </>
      );
   }
}
// false, undefind, null은 jsx 에서 태그 없음을 의미함.  
export default ResponseCheck;