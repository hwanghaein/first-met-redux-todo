import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectBoard, deleteBoard } from '../../redux/slices/boardSlice';
import BoardItem from './\bBoardItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

function BoardList() {
    const boards = useSelector((state) => state.board.boards);
    // const boards = [
    //  { id: 1, title: "오늘 할 일" },
    //  { id: 2, title: "내일 할 일" },
    // ];

    const selectedBoardId = useSelector((state) => state.board.selectedBoardId);
    // const selectedBoardId = 1;

    const dispatch = useDispatch();

    return (
        <Wrapper>
            {boards.map((board, index) => {
                const isSelected = board.id === selectedBoardId;
                return (
                    <BoardItem
                        key={index}
                        board={board}
                        isSelected={isSelected}
                        onSelect={() => {
                            dispatch(selectBoard(board.id));
                        }}
                        onDelete={() => {
                            dispatch(deleteBoard(board.id));
                        }}
                    />
                );
            })}
        </Wrapper>
    );
}

export default BoardList;