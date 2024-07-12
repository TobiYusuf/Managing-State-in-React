import React, { useState } from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  editTask,
  deleteTask,
  toggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    if (isEditing) {
      editTask({ ...task, name, description });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <div onClick={() => toggleComplete(task.id)}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
