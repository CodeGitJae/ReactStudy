import React, { PureComponent } from "react";

class Test extends PureComponent {   // PureComponent는 데이터가 바뀌는지 자동으로 파악해서 랜더링을 해주는 Component 의 모든 API를 지원하는 Component 의 서브클래스
   state = {
      counter: 0,
      String: 'hello',
      number: 1,
      boolean:true,
      object: {},
      array: [],
   };

   // shouldComponentUpdate (nextProps, nextState, nextContext) {
   //    if(this.state.counter !== nextState.counter) {
   //       return true
   //    }
   //    return false;
   // }

   onClick = () => {
      this.setState({
         array: [...this.state.array, 1],    // 단, PureComponent를 사용하려면 setState 같은 새로운 데이터 적용 시 
      });                                    // 빈 배열을 넣으면 인식하지 못하기 때문에 과거 데이터와 미래 데이터를 분리해줘야 한다고함 필수!!!
   };

   render() {
      console.log('렌더링', this.state);
      return (
         <div>
            <button onClick={this.onClick}>클릭</button>
         </div>
      )
   }
}