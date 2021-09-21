const Task = ({ labelText, onToggleMark, isCheked, onDeleteTask }) => {
  return (
    <div>
      <input checked={isCheked} onChange={onToggleMark} type="checkbox" />
      <label>{labelText}</label>
      <button onClick={onDeleteTask}>x</button>
    </div>
  );
};
export default Task;
