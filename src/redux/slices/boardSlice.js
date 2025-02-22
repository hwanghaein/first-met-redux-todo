import { createSlice } from "@reduxjs/toolkit";
import deleteBoardThunk from "../thunks/deleteBoardThunk";

// 초기값
const initialState = {
  boards: [],
  selectedBoardId: null,

  resetBoardSaga: {
    pending: false,
    data: null,
    error: null,
  },
};

const boardSlice = createSlice({
  // 초기 상태 설정, reducer 정의, action creator 자동 생성을 한 번에 정의할 수 있도록 도와줌
  name: "board",
  initialState,
  reducers: {
    // board 생성
    createBoard: (state, action) => {
      const newBoardName = action.payload;
      state.boards.push({
        id: state.boards.length + 1,
        title: newBoardName,
      });
    },
    // board 삭제
    deleteBoard: (state, action) => {
      const targetBoardId = action.payload;
      return {
        ...state,
        boards: state.boards.filter((board) => {
          return board.id !== targetBoardId;
        }),
      };
    },
    // board 선택
    selectBoard: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    // board 초기화
    resetBoard: () => {
      return initialState;
    },
    // resetBoardSaga // Redux-Saga에서 사용하는 액션들
    resetBoardSagaRequested: (state) => {
      state.resetBoardSaga = {
        ...state.resetBoardSaga,
        pending: true,
        data: null,
        error: null,
      };
    },
    resetBoardSagaSucceeded: (state, action) => {
      state.resetBoardSaga = {
        ...state.resetBoardSaga,
        pending: false,
        data: action.payload,
      };
    },
    resetBoardSagaFailed: (state, action) => {
      state.resetBoardSaga = {
        ...state.resetBoardSaga,
        pending: false,
        error: action.payload,
      };
    },
  },

  // deleteBoardThunk는 비동기 작업 (Thunk)으로 처리
  // extraReducers를 통해 Thunk 액션 (pending, fulfilled, rejected)을 감지
  extraReducers: (builder) => {
    builder
      .addCase(deleteBoardThunk.pending, (state, action) => {
        console.log(action.type);
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        console.log(action.type);
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        console.log(action.type);
      });
  },
});

// action creator를 export
export const {
  createBoard,
  updateBoard,
  deleteBoard,
  selectBoard,
  resetBoard,
  // resetBoardSaga
  resetBoardSagaRequested,
  resetBoardSagaSucceeded,
  resetBoardSagaFailed,
} = boardSlice.actions;

export default boardSlice.reducer;
