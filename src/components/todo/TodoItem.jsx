import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const TitleContainer = styled.div`
  flex: 1;
  color: black;
  ${(props) =>
    props._isFinished &&
    `
        color: #cccccc;
    `};
`;

function TodoItem(props) {
  const { todo, onFinish, onDelete } = props;

  return (
    <Wrapper>
      <input type="checkbox" checked={todo.isFinished} onChange={onFinish} />

      <TitleContainer _isFinished={todo.isFinished}>
        {todo.title}
      </TitleContainer>

      <button onClick={onDelete}>삭제</button>
    </Wrapper>
  );
}
TodoItem.propTypes = {
  todo: PropTypes.shape({
    isFinished: PropTypes.bool,
    title: PropTypes.string,
  }).isRequired,
  onFinish: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
