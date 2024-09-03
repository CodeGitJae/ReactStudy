import React, {useState, memo } from "react";   // memo - 부모 컴포넌트가 리랜더링 될 때 자식도 리랜더링 되는 것을 막아줌 (state, props 까지는 막지는 못함)

const Try = memo(({ tryInfo }) => {  // 구조분해 문법 사용 (props) 를 넣어도  된다고함.
   const [result, setResult] = useState(tryInfo.result);   // props 원칙: 데이터를 바꿔야 할때는 무조건 부모 쪽에서 데이터를 바꿔야 함. 자식이 바꿔야 할때는 state로 만들어서 바꿔야함.  
   
   const onClick = () => {
      setResult('1');
   };

   return (                          
      <li>
         <div>{tryInfo.try}</div>       {/*props.tryInfo*/}
         <div onClick={onClick}>{result}</div>
      </li>
   )
});
Try.displayName = 'Try';   // 크롬 개발자창 compononts 영역에 표시되는 Try 이름이 memo 때문에 깨지는 현상을 이름 재 지정하는 코드를 통해 해결함.
export default Try;