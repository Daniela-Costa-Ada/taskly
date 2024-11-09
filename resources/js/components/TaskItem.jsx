// import React from 'react';
// import { FaEdit, FaTrashAlt, FaCheck, FaRegCircle } from 'react-icons/fa';
// import TaskStatusBadge from './TaskStatusBadge'; 

// const TaskItem = ({ task, onToggleStatus, onDelete, onEdit }) => {
//     return (
//         <li className="list-group-item d-flex justify-content-between align-items-center">
//             <div>
//                 <h5>{task.title}</h5>
//                 <p>{task.description}</p>
//                 <TaskStatusBadge isCompleted={task.is_completed} /> 
//             </div>
//             <div>
//                 <button
//                     className="btn btn-outline-primary me-2"
//                     onClick={() => onToggleStatus(task.id, task.is_completed)}
//                 >
//                     {task.is_completed ? <FaRegCircle /> : <FaCheck />}
//                 </button>
//                 <button
//                     className="btn btn-outline-secondary me-2"
//                     onClick={() => onEdit(task)}
//                 >
//                     <FaEdit />
//                 </button>
//                 <button
//                     className="btn btn-outline-danger"
//                     onClick={() => onDelete(task.id)}
//                 >
//                     <FaTrashAlt />
//                 </button>
//             </div>
//         </li>
//     );
// };

// export default TaskItem;
