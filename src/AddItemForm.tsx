import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
            <TextField
            variant={"outlined"}
            value={title}
            onChange={changeTitle}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText= {error /*&& <div className="error-message">Title is required!</div>*/}
            label={"Title"}
            onBlur={() => {setError(false)}}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>

        </div>
    );
};

export default AddItemForm;