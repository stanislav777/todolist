import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
 addItem: (titile: string) => void
}


function AddItemForm( props:AddItemFormPropsType ) {

    let [error, setError] = useState<boolean>(false)
    let [title, setTitle] = useState("")

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {addItem()}
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim(),)
            setTitle("")
        } else {
            setError(true);
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={changeTitle}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}

            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">Title is required!</div>}
        </div>
    );
};

export default AddItemForm;