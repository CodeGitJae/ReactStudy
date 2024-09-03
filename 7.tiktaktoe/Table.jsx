import React, { useMemo } from 'react'
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => (
         useMemo(        // memo를 적용해뒀기 때문에 useMemo의 성능을 기대할수 없지만 공부 이기 때문에 추가 해봄.
            () =><Tr key={i+'table'} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />,
            [tableData[i]],
         )
      ))}
    </table>
  );
};

export default Table;