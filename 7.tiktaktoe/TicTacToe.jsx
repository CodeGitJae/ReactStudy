import React, { useState, useReducer, useCallback, useEffect } from "react";
import Table from "./Table";

const initialState = {
   winner: '',
   turn: 'O',
   tableData: [
      ['','',''],
      ['','',''],
      ['','','']
   ],
   recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';    // 선언된 상수를 다양한 위치에서 사용하도록 모듈화(export 추가)
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

// 2
const reducer = (state, action) => {    // reducer에서 state를 변경해야 할 때는 불변성을 항상 기억하고 처리 해야함.
   switch (action.type) {
      case SET_WINNER :
         // state.winner = action.winner  리액트는 불변성 법칙 때문에 기존 데이터를 바꾸는 것을 허용하지 않음.
         return {
            ...state,
            winner: action.winner,
         };
      case CLICK_CELL: {
         const tableData = [...state.tableData];
         tableData[action.row] = [...tableData[action.row]];  // row는 td쪽 props
         tableData[action.row][action.cell] = state.turn;
         return{
            ...state,
            tableData,
            recentCell: [action.row, action.cell],      // 최근 누른 셀 저장
         };
      }
      case CHANGE_TURN: {
         return {
            ...state,
            turn: state.turn === 'O' ? 'X' : 'O',  //O면 X, X면 O로 바꾸는식
         };
      }
      case RESET_GAME: {               // 게임 다시 시작해야 하는 경우의 action 추가
         return {
            ...state,
            turn: 'O',
            tableData: [
               ['','',''],
               ['','',''],
               ['','','']
            ],
            recentCell: [-1, -1],
         };
      }
      default:
         return state;
   }
};

const TicTakToe = () => {
   const [state, dispatch] = useReducer(reducer, initialState); // useReducer는 state가 비동기적 방식임  __ Hooks가 너무 많아지면 줄이 길어지기 때문에 한방에 useReducer로 처리
   const { tableData, turn, winner, recentCell } = state;       // 보통 구조 분해는 class 할때 쓰이지만 useReducer의 경우도 사용해줄수 있음.
   // const [winner, setWinner] = useState('');
   // const [turn, setTurn] = useState('O');
   // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

   // 1
   const onClickTable = useCallback(() => {
      dispatch({ type: SET_WINNER, winner: 'O' });  // type은 action의 이름 이고 실행은 dispatch가 하는것 __ 실행 되면 reducer에 정의된 코드가 실행됨.
   }, []);

   // 승자를 검증하는 useEffect
   useEffect(() => {
      const [row, cell] = recentCell;
      if(row < 0) {
         return;
      }
      let win = false;
      if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn ) {   // 가로 줄 검사
         win = true;
      }
      if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn ) {    // 세로 줄 검사
         win = true;
      }
      if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn ) {    // 왼쪽에서 오른쪽 아래 방향 대각선 검사
         win = true;
      }
      if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn ) {    // 오른쪽에서 왼쪽 아래 방향 대각선 검사
         win = true;
      }
      
      console.log(win, row, cell, tableData, turn);
      
      if (win){  // 승리 시
         dispatch({ type: SET_WINNER, winner: turn });
         dispatch({ type: RESET_GAME });
      } else { // 무승부 검사
         let all = true;  // 빈 공간없이 모든(all) 셀이 다 차면 무승부라는 뜻
         tableData.forEach((row) => {
            row.forEach((cell) => {
               if(!cell) {
                  all = false;
               }
            });
         });
         if (all) {
            dispatch({ type: RESET_GAME });
         } else {
            dispatch({ type: CHANGE_TURN });
         }
      } 
   }, [recentCell]);

   return (
      <>
         <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
         {winner && <div>{winner}님의 승리</div>}
      </> 
   );
};

export default TicTakToe;