import React, { Component } from "react";
import { BrowserRouter, HashRouter, Link, Route, Routes } from 'react-router-dom';
import NumberBaseball from "../3. countStrike/NumberBaseballClass";
import Lotto from "../6.Lotto/LottoClass";
import RSP from "../5.RSP/RSPClass";

const  Games = () => {
   return (
      <div>
      <HashRouter>            {/*  HashRouter는 URI 주소 중간에 # 이 붙고 # 뒤 부터는 프론트에서만 인식하도록 설계 되어 있어서 새로고침 하더라도 페이지가 유지됨.*/}
         <div>                {/*  server가 알지 못하는 맵핑 주소라는 뜻임. 그래서 실무에서는 HashRouter는 사용하지 않는다고함. 검색엔진이 웹을 돌 때 요청을 server쪽에 하기 때문 */}
            <Link to={"/number-basball"}>숫자 야구</Link>
            &nbsp;
            <Link to={"/rock-scissors-paper"}>가위 바위 보</Link>
            &nbsp;
            <Link to={"/lotto-generator"}>로또 생성기</Link>
             {/*&nbsp;
            <Link to={"/tik-tak=toe"}>틱 택 토</Link>
            &nbsp;
            <Link to={"/speed-check"}>스피드 체크</Link>
            &nbsp;
            <Link to={"/search-to-mine"}>지뢰 찾기</Link> */}
         </div>
         <div>
            <Routes>
               <Route path="/number-basball" Component={NumberBaseball} />
               <Route path="/rock-scissors-paper" Component={RSP} />
               <Route path="/lotto-generator" Component={Lotto} />
               {/* <Route path="/tik-tak=toe" Component={TicTakToe} />
               <Route path="/speed-check" Component={ResponseCheck} />
               <Route path="/search-to-mine" Component={MineSearch} /> */}
            </Routes>
         </div>
      </HashRouter>
      </div>
   );
};

export default Games;