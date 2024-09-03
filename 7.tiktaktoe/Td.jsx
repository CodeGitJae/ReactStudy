import React, { memo, useCallback, useEffect, useRef } from 'react'
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {

//#########################################################################################  성능 향상 할 때 성능을 낮추는 요인 알아내는 방법   
   console.log('td rendered');
   const ref = useRef([]);
   useEffect(() => {
      console.log(rowIndex === ref.current[0], cellData === ref.current[1], cellIndex === ref.current[2], dispatch === ref.current[3]);
      console.log(cellData);
      ref.current = [rowIndex, cellData, cellIndex, dispatch];
   }, [rowIndex, cellData, cellIndex, dispatch]);
//#########################################################################################

  const onClickTd = useCallback(() => {
   console.log(rowIndex, cellIndex);
   if(cellData) {
      return; 
   }
   dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });   //사용자 정의로 만든 액션
}, [cellData]);
  
   return (
    <td onClick={onClickTd}>{cellData}</td>
  )
});

export default Td;
