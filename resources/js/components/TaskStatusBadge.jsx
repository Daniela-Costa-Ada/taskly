import React from 'react';

const TaskStatusBadge = ({ isCompleted }) => {
  return (
    <span className={`badge ${isCompleted ? 'bg-success' : 'bg-warning'}`}>
      {isCompleted ? 'Completed' : 'Incomplete'}
    </span>
  );
};

export default TaskStatusBadge;
