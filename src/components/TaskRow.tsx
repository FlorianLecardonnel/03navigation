import React, { useState } from "react";
import ITask from "../interfaces/ITask";
import { log } from "console";

type Props = {
  taskRow: ITask;
  deleteTaskInComponentTasks: (id: string) => void;
  updateTaskCheckbox: (taskRow: ITask) => void;
  setTaskRow: React.Dispatch<React.SetStateAction<string>>;
  // updateTaskRow (ismodifytaskRow: ITask)
};

const TaskRow: React.FC<any> = (props: Props) => {
  const [taskRow, setTaskRow] = useState(props.taskRow);

  const updateTaskCheckbox = async (doneValue: boolean) => {
    const taskRowForDone = ({ ...taskRow, done: doneValue });
    setTaskRow(taskRowForDone);
    taskRow.done = doneValue;
    console.log("change done value of task");
    props.updateTaskCheckbox(taskRow);
  };
  const deleteTaskInComponent = async () => {
    props.deleteTaskInComponentTasks(taskRow._id!);
  };

  // const updateTaskRow = async () {
  //   props.updateTaskRow(true, taskRow)
  // }

  return (
    <tr className="rowClass">
      <td>
        <input
          type="checkbox"
          checked={taskRow.done}
          id="done"
          onChange={(event) => updateTaskCheckbox(event.target.checked)}
          name="done"
        />
      </td>
      <td>{taskRow.title}</td>
      <td>{taskRow.description}</td>
      <td>{taskRow.date}</td>
      <td>
        <button className="otherButtonValidate">Modifier</button>
      </td>
      <td>
        <button
          className="otherButtonValidate"
          onClick={() => deleteTaskInComponent()}
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
