import React, { Component } from "react";
import NumberBaseball from "../3. countStrike/NumberBaseball";
import Lotto from "../6.Lotto/Lotto";
import RSP from "../5.RSP/RSP";
import { Route, Routes, useLocation, useNavigate } from "react-router";

const GameMathcer = () => {
   const location = useLocation();
   const navigate = useNavigate();   // 5버전의 history 역할 메서드로 만들어서 양수일 경우 앞 음수의 경우 뒤로가기 
   let urlSearchParams = new URLSearchParams(location.search);

   //console.log("hello: ", urlSearchParams.get('hello'));
   //console.log("page: ", urlSearchParams.get('page'));
   return (
      <Routes>
         <Route path="number-baseball" element={<NumberBaseball />}/>
         <Route path="rock-scissors-paper" element={<RSP />}/>
         <Route path="lotto-generator" element={<Lotto />}/>
         <Route 
            path="*"
            element={<div>일치하는 게임이 없습니다.</div>}
         />
      </Routes>
   );
}
export default GameMathcer;