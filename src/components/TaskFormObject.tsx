import React, { useState } from "react";
import ITask from "../interfaces/ITask";

const TaskFormObject: React.FC<any> = ({ addTaskInComponentTasks }) => {
  const [titleVisible, setTitleVisible] = useState("titleErrorHidden");
  const [dateVisible, setDateVisible] = useState("dateErrorHidden");

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [dateTask, setDateTask] = useState("");
  // const [done, setDone] = useState(false);

  const [taskForm, setTaskForm] = useState<ITask>({ title: "", date: "" });

  enum FormField {
    StringField,
    TextAreaField,
    DateField,
    CheckBoxField,
  }

  function handleChange<T>(value: T, typeField: number): void {
    if (typeField === FormField.StringField)
      setTaskForm({ ...taskForm, title: value as string });

    if (typeField === FormField.TextAreaField)
      setTaskForm({ ...taskForm, description: value as string });

    if (typeField === FormField.DateField)
      setTaskForm({ ...taskForm, date: value as string });

    if (typeField === FormField.CheckBoxField)
      setTaskForm({ ...taskForm, done: value as boolean });
  }

  function modifyTask(event: any) {
    event.preventDefault();
    console.log("call modifyTask");

    setTitleVisible("titleErrorHidden");
    setDateVisible("dateErrorHidden");

    let fieldsValidate = true;

    if (taskForm.title === "") {
      // si erreur montre l'erreur
      setTitleVisible("titleErrorVisible");
      fieldsValidate = false;
    }

    if (taskForm.date === "") {
      // si erreur montre l'erreur
      setDateVisible("dateErrorVisible");
      fieldsValidate = false;
    }
    if (fieldsValidate) {
      addTaskInComponentTasks(taskForm);
    }
  }

  return (
    <div className="">
      <form onSubmit={modifyTask}>
        <input
          onChange={(event) =>
            handleChange(event.target.value, FormField.StringField)
          }
          type="text"
          value={taskForm.title}
          placeholder="Intitulé *"
        />
        <div className={titleVisible}>
          <div className="errorTitle">Veuillez saisir le champ 'Intitulé'</div>
        </div>

        <textarea
          onChange={(event) =>
            handleChange(event.target.value, FormField.TextAreaField)
          }
          value={taskForm.description}
          placeholder="Description"
          rows={10}
        ></textarea>

        <input
          onChange={(event) =>
            handleChange(event.target.value, FormField.DateField)
          }
          type="date"
          value={taskForm.date}
          placeholder="jj/mm/aaaa *"
        />
        <div className={dateVisible}>
          <div className="errorDate">Veuillez saisir la date</div>
        </div>

        <div className="checkbox-group">
          <input
            onChange={(event) =>
              handleChange(event.target.checked, FormField.CheckBoxField)
            }
            type="checkbox"
            checked={taskForm.done}
            id="done"
            name="done"
          />
          <label htmlFor="done">Done</label>
        </div>

        <div className="button-group">
          <input type="submit" value="Valider" className="button" />
          <input type="submit" value="Supprimer" className="button" />
          {/* <button value="Supprimer" className="button" /> */}
        </div>
      </form>
    </div>
  );
};

export default TaskFormObject;
