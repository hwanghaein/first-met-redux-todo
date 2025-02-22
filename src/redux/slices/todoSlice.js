import { createSlice } from "@reduxjs/toolkit";

// 초기 상태
const initialState = {
  // 각 보드(boardId)에 연결된 할 일 목록을 저장하는 객체
  boardTodosMap: {},
  // const boardTodosMap = {
  // 1: [
  //     { id: 1, title: "할 일 1", isFinished: false },
  //     { id: 2, title: "할 일 2", isFinished: true }
  // ],
  // 2: [
  //     { id: 1, title: "할 일 A", isFinished: false },
  //     { id: 2, title: "할 일 B", isFinished: false }
  // ]
  // };
};

const todoSlice = createSlice({
  // 초기 상태 설정, reducer 정의, action creator 자동 생성을 한 번에 정의할 수 있도록 도와줌
  name: "todo",
  initialState,
  reducers: {
    // todo 생성 (할일 추가)
    addTodo: (state, action) => {
      const { boardId: targetBoardId, todo: newTodo } = action.payload;
      // const targetBoardId = action.payload.boardId;
      // const newTodo = action.payload.todo;

      if (!state.boardTodosMap[targetBoardId]) {
        state.boardTodosMap[targetBoardId] = [];
      }

      state.boardTodosMap[targetBoardId].push({
        id: state.boardTodosMap[targetBoardId].length + 1,
        title: newTodo,
        isFinished: false,
      });
    },
    // todo 완료 토글
    toggleFinishTodo: (state, action) => {
      const { boardId: targetBoardId, todoId: targetTodoId } = action.payload;

      const targetTodo = state.boardTodosMap[targetBoardId].find((todo) => {
        return todo.id === targetTodoId;
      });

      targetTodo.isFinished = !targetTodo.isFinished;
    },
    // todo 삭제
    deleteTodo: (state, action) => {
      const { boardId: targetBoardId, todoId: targetTodoId } = action.payload;

      state.boardTodosMap[targetBoardId] = state.boardTodosMap[
        targetBoardId
      ].filter((todo) => {
        return todo.id !== targetTodoId;
      });
    },
    // board의 todo 전체 삭제
    deleteBoardTodos: (state, action) => {
      const targetBoardId = action.payload;

      delete state.boardTodosMap[targetBoardId];
    },
    // todo 초기화
    resetTodo: () => {
      return initialState;
    },
  },
});

// action creator를 export
export const {
  addTodo,
  toggleFinishTodo,
  deleteTodo,
  deleteBoardTodos,
  resetTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
