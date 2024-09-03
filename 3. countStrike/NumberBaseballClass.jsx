import React, { Component, createRef } from "react";
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

class NumberBaseball extends Component {
   state = {
      result: '',
      value: '',
      answer: getNumbers(),  // ex: [1, 3, 5, 7]
      tries: [], // 배열로 새로운 데이터를 추가해줘야 리엑트에서 인식함
   };

   shouldComponentUpdate(nextProps, nextState, nextContext) {

   }

   // ex) A -> B-> C -> D -> E -> F -> G    (부모A가 자식 G에게 props를 주고 싶을 때 불필요한 렌더링 발생할 수 있기 떄문에 Context를 통해 A가 G에게 바로 전달할 수 있음/또는 리덕스)
   // Context는 props의 진화형이라고 볼수 있음

   onSubmitForm = (e) => {
      const { result, value, tries, answer } = this.state;
      e.preventDefault();
      if(value === answer.join('')) {
         this.setState((prevState) => {  // 지난 과거의 데이터를 사용해야 할 때는 함수형 스테이트를 사용해야함.
            return {
               result: '홈런',
               tries: [...prevState.tries, { try: value, result: '홈런!' }],
            }
         });
         alert('게임을 다시 시작합니다.');
         this.setState({
            value: '',
            answer: getNumbers(),
            tries: [],
         });
         this.inputRef.current.focus();
      }  else {   // 답이 틀린 경우
         const answerArray = value.split('').map((v) => parseInt(v));
         let strike = 0;
         let ball = 0;
         if (tries.length >=  9) {  // 답을 못맞추고 10번 이상 틀렸을 때
            this.setState({
               result: `10번 이상 정답을 맞추지 못했습니다! 답은 ${answer.join(',')}입니다.`,
            });
            alert('게임을 다시 시작합니다.');
            this.setState({
               value: '',
               answer: getNumbers(),
               tries: [],
            });
            this.inputRef.current.focus();
         }  else {
            for (let i = 0; i < 4; i += 1) {
               if(answerArray[i] === answer[i]) {
                  strike += 1;
               } else if (answer.includes(answerArray[i])){
                  ball += 1;
               }
            }
            this.setState((prevState) => {          // 지난 과거의 데이터를 사용해야 할 때는 함수형 스테이트를 사용해야함.
               return {
                  tries: [...prevState.tries, { try: value, result: `${strike} 스크라이크, ${ball} 볼 입니다.` }],
                  value: '',
               };
            });
            this.inputRef.current.focus();
         }
      }
   };

   onChageInput = (e) => {
      console.log(this.state.answer);
      this.setState({
         value: e.target.value,
      });
   };

   inputREf = createRef();

   render() {
      const { result, value, tries } = this.state;
      return  (
         <>
            <h1>{result}</h1>
            <form onSubmit={this.onSubmitForm}>
               <input maxLength={4} value={value} onChange={this.onChageInput} />
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
   }
}

export default NumberBaseball;  // import NumberBaseball