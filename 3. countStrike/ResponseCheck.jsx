import React, { Component } from "react";

class ResponseCheck  extends Component {
   state = {
      state: 'waiting',
      message: '클릭해서 시작하세요.',
      result: [],
   };

   onClickScreen = () => {

   };


   render() {    // 랜더링 부분 안에서는 for와 if를 사용하지 못한다고함.
      return (
         <>
            <div 
               id="screen" 
               className="{this.state.state}" 
               onClick={this.onClickScreen}
            >
               {this.state.message}
            </div>
            <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
         </>
      );
   }
}

export default ResponseCheck;