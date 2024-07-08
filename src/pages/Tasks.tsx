import React, { useState, useEffect } from "react";
import TaskFormObject from "../components/TaskFormObject";
import ITask from "../interfaces/ITask";
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTaskDone,
  editTask,
} from "../services/fetchTask";
import TaskRow from "../components/TaskRow";

const Tasks: React.FC = () => {
  const [listTasks, setListTasks] = useState<ITask[]>([]);

  const [modalDeleteStyle, setModalDeleteStyle] = useState("modalDeleteHidden");
  const [idTaskToDelete, setIdTaskToDelete] = useState("");

  const [isModified, setIsModified] = useState(false);
  const [taskToPass, setTaskToPass] = useState<ITask>({ title: "", date: "" });

  useEffect(() => {
    getAllTasks();
  }, []);

  // Function to fetch all tasks
  const getAllTasks = async () => {
    let list = await fetchTasks();
    setListTasks(list);
  };

  // Function to add a task
  const addTaskInComponentTasks = async (taskToAdd: ITask, isModifiedValue: boolean) => {
    if (isModifiedValue) {
        //modifier une tâche
        let task = await editTask(taskToAdd);
        console.log(task);
        setIsModified(false);
    } else {
        //ajouter une tâche
        let task = await addTask(taskToAdd);
        console.log(task);
        setIsModified(false);
    }
    //afficher la liste 
    await getAllTasks();
};

  const deleteTaskInComponentTasks = (idRowTask: string) => {
    //ouvrir modal de validation
    setModalDeleteStyle("modalDeleteVisible");
    setIdTaskToDelete(idRowTask);
  };

  const hideModalDelete = () => {
    setModalDeleteStyle("modalDeleteHidden");
    setIdTaskToDelete("");
  };

  const validateDeleteTaskInDb = async () => {
    //ajouter une tâche
    let task = await deleteTask(idTaskToDelete);
    console.log(task);
    //afficher la liste
    await getAllTasks();

    hideModalDelete();
  };
  const updateTaskCheckbox = async (taskRow: ITask) => {
    let taskResultat = await updateTaskDone(taskRow);
    console.log(taskResultat);
    await getAllTasks();
  };

  const updateTaskRow = async (isModified: boolean, taskRow: ITask) => {
    setIsModified(isModified);
    setTaskToPass(taskToPass);
  };

  return (
    <div className="tasks-container">
      <div>
        <TaskFormObject
          task={taskToPass}
          isModified={isModified}
          addTaskInComponentTasks={(taskToAdd: ITask, isModified: boolean) => addTaskInComponentTasks(taskToAdd, isModified)}
        />
      </div>
      <div id="supprimerflorian" className={modalDeleteStyle}>
        <div id="popup">
          <div id="title">Etes-vous sûr de vouloir supprimer la tâche ?</div>
          <button id="buttonannuler" onClick={() => hideModalDelete()}>
            <div id="text">
              <div id="clear">Annuler</div>
            </div>
          </button>
          <button id="buttonsvalider" onClick={() => validateDeleteTaskInDb()}>
            <div id="text2">
              <div id="go">Valider</div>
            </div>
          </button>
        </div>
      </div>
      <div id="centerTable">
        <h2>Liste des tâches</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Done</th>
              <th scope="col">Titre</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Modifier</th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {listTasks.map((taskRow: ITask) => {
              return (
                <TaskRow
                  taskRow={taskRow}
                  deleteTaskInComponentTasks={(id: string) =>
                    deleteTaskInComponentTasks(id)
                  }
                  updateTaskCheckbox={(taskRow: ITask) =>
                    updateTaskCheckbox(taskRow)
                  }
                  updateTaskRow={(isModified: boolean, taskRow: ITask) =>
                    updateTaskRow(isModified, taskRow)
                  }
                  key={taskRow._id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
