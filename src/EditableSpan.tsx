import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType ={
    title:string
    changeItem: (title: string) => void
}

function EditableSpan (props: EditableSpanPropsType){

    const [ editMode, setEditMode] = useState<boolean>(false)

    let [title, setTitle] = useState("")

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () =>{
         setEditMode(true)
    }
    const offEditMode = () =>{
         setEditMode(false)
        props.changeItem(title)
    }

    return (
        editMode
            ?      <input value={title}
                   autoFocus
                   onBlur={offEditMode}
                          onChange={changeTitle}
            />
                   : <span onDoubleClick={onEditMode}>{props.title} </span>
    );
};

export default EditableSpan;