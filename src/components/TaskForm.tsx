import React, { useState } from "react";

const TaskForm: React.FC = () => {
  const [titleVisible, setTitleVisible] = useState("titleErrorHidden");
  const [dateVisible, setDateVisible] = useState("dateErrorHidden");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTask, setDateTask] = useState("");
  const [done, setDone] = useState(false);

  enum FormField {
    StringField,
    TextAreaField,
    DateField,
    CheckBoxField,
  }

  function handleChange<T>(value: T, typeField: number): void {
    if (typeField === FormField.StringField) setTitle(value as string);

    if (typeField === FormField.TextAreaField) setDescription(value as string);

    if (typeField === FormField.DateField) setDateTask(value as string);

    if (typeField === FormField.CheckBoxField) setDone(value as boolean);
  }

  function modifyTask(event: any) {
    event.preventDefault();

    setTitleVisible("titleErrorHidden");
    setDateVisible("dateErrorHidden");

    let validate = true;

    if (title === "") {
      // si erreur montre l'erreur
      setTitleVisible("titleErrorVisible");
      validate = false;
    }

    if (dateTask === "") {
      // si erreur montre l'erreur
      setDateVisible("dateErrorVisible");
      validate = false;
    }
    return validate;
  }


  return (
    <div className="">
      <form onSubmit={modifyTask}>
        <input
          onChange={(event) =>
            handleChange(event.target.value, FormField.StringField)
          }
          type="text"
          value={title}
          placeholder="Intitulé *"
        />
        <div className={titleVisible}>
          <div className="errorTitle">Veuillez saisir le champ 'Intitulé'</div>
        </div>

        <textarea
          onChange={(event) =>
            handleChange(event.target.value, FormField.TextAreaField)
          }
          value={description}
          placeholder="Description"
          rows={10}
        ></textarea>

        <input
          onChange={(event) =>
            handleChange(event.target.value, FormField.DateField)
          }
          type="date"
          value={dateTask}
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
            checked={done}
            id="done"
            name="done"
          />
          <label htmlFor="done">Done</label>
        </div>

        <div className="button-group">
          <input type="submit" value="Valider" className="button" />
          <input type="submit" value="Supprimer" className="button" />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
