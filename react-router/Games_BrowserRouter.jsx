import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GameMathcer from "./GameMatcher";

const  Games = () => {
   return (
      <BrowserRouter>
         <div>
            <Link to="/game/number-baseball">숫자 야구</Link>
            &nbsp;
            <Link to="/game/rock-scissors-paper">가위 바위 보</Link>
            &nbsp;
            <Link to="/game/lotto-generator">로또 생성기</Link>
            &nbsp;
            <Link to="/game/index">게임 매쳐</Link>
         </div>
         <Routes>
            <Route path="*" element={<GameMathcer />} />
            <Route path="/game/:name/*" element={<GameMathcer />} />
         </Routes>
      </BrowserRouter>
   );
};

export default Games;







