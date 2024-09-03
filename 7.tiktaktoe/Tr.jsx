import React, { memo, useMemo } from 'react'
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
   <tr>
      {Array(rowData.length).fill().map((td, i) => (
                        // useMemo는 컴포넌트도 기억하게 할 수 있어서 memo로 성능 최적화를 하지 못했다면 useMemo를 최후의 수단처럼 사용하기
         useMemo(       // memo를 적용해뒀기 때문에 useMemo의 성능을 기대할수 없지만 공부 이기 때문에 추가 해봄.      
            () =><Td key={i+'tr'} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
            [rowData[i]],   // 기억했던 데이터를 바꾸고 싶다면 2번째 인수에 바뀔 데이터를 넣어주면됨.
         )
      ))}
   </tr>
  );
});

export default Tr;
