import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBoard, selectBoard } from '../slices/boardSlice';
import { deleteBoardTodos } from '../slices/todoSlice';

//  보드를 삭제할 때 3초 후에 삭제 작업을 수행
const deleteBoardThunk = createAsyncThunk( // 비동기 작업을 간편하게 처리할 수 있는 함수
    'board/deleteBoard', // 액션 타입 이름, Redux DevTools에서 확인할 때 사용됨
    async (boardId, thunkApi) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const rootState = thunkApi.getState(); // 현재 Redux 상태(root state) 를 가져옴
                const { selectedBoardId } = rootState.board; // 현재 선택된 보드가 삭제 대상인지 확인

                if (selectedBoardId === Number(boardId)) { // 현재 선택된 보드가 삭제 대상이면 선택 해제(null로 설정)
                    thunkApi.dispatch(selectBoard(null)); // 삭제된 보드를 선택하려는 오류를 방지
                }

                thunkApi.dispatch(deleteBoard(boardId)); // 해당 보드를 Redux 상태에서 삭제
                thunkApi.dispatch(deleteBoardTodos(boardId)); // 해당 보드의 할 일(todo)도 함께 삭제

                resolve();
            }, 3000);
        });
    }
);

export default deleteBoardThunk;