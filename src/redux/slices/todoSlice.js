import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boardTodosMap: {},
};

const todoSlice = createSlice({ // 초기 상태 설정, reducer 정의, action creator 자동 생성을 한 번에 정의할 수 있도록 도와줌
    name: 'todo',
    initialState,
    reducers: {
        // todo 생성
        addTodo: (state, action) => {
            const { boardId: targetBoardId, todo: newTodo } = action.payload;

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
            const { boardId: targetBoardId, todoId: targetTodoId } =
                action.payload;

            const targetTodo = state.boardTodosMap[targetBoardId].find(
                (todo) => {
                    return todo.id === targetTodoId;
                }
            );

            targetTodo.isFinished = !targetTodo.isFinished;
        },
        // todo 삭제
        deleteTodo: (state, action) => {
            const { boardId: targetBoardId, todoId: targetTodoId } =
                action.payload;

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