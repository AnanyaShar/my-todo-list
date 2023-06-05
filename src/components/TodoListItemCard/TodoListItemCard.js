import React, { useState } from "react";
import InputBox from "../InputBox/InputBox";
import { DeleteIcon } from "../../assets/svg/DeleteIcon";
import EditIcon from "../../assets/svg/EditIcon";
import './TodoItemCard.scss';

const TodoListItemCard = ({itemList, setItemList}) => {
    
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[errorMessage, setErrorMessage] = useState('')
    const[editItem, setEditItem] = useState(0)
    const[editedTitle, setEditedTitle] = useState('')

    const onChangeHandler = (e) => {
        setErrorMessage('');
        setTitle(e.target.value)
    }

    const onClickHandler = (event) => {
        event.preventDefault();
        if(title === '') {
            setErrorMessage('Please enter a title');
            return
        };
        setItemList((prev) => [...prev, {'title': title, 'description': description, 'id': "id" + Math.random().toString(16).slice(2)}])
        setTitle('');
    }

    const onEditItem = (title, itemId) => {
        setEditItem(itemId)
        setEditedTitle(title)
    }

    const onDeleteItem = (event, itemId) => {
        const itemIndex = itemList.findIndex((item) => item.id == itemId)
        const newItemList = [...itemList.slice(0, itemIndex), ...itemList.slice(itemIndex+1)]
        setItemList(newItemList);
    }

    const onInputChange = (event) => {
        const value = event.target.value
        setEditedTitle(value)
    }

    const onInputBlur= (event) => {
        const itemIndex = itemList.findIndex((item) => item.id == editItem)
        const updatedItem = {...itemList[itemIndex], title: editedTitle}
        const newItemList = [...itemList.slice(0, itemIndex), updatedItem, ...itemList.slice(itemIndex+1)]
        setItemList(newItemList);
        setEditItem(0)
    }

    return (
        <div>
            <div className={`${errorMessage && 'error'} add-item-input`}>
                <InputBox 
                    placeholder='Enter Item Title'
                    type='text'
                    value={title}
                    onChangeHandler={onChangeHandler}
                    labelContainerClassName={'add-item-input-labelContainer'}
                    className={'add-item-input-box'}
                />
                <button onClick={onClickHandler} className="add-item-button">Add</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <ul>
                {
                    itemList.length > 0 &&
                    itemList.map((item) => {
                        return (
                            <li className="list-item" key={item.id}>
                                <div className="list-item-card">
                                    {
                                        editItem === item.id ? 
                                            <input 
                                                value={editedTitle} 
                                                onChange={onInputChange} 
                                                onBlur={onInputBlur}
                                                className="list-item-input"
                                            />
                                        :
                                            <h2 className="list-item-title">{item.title}</h2>
                                    }
                                    <div className="list-icons">
                                        <div onClick={(event) => onEditItem(item.title, item.id)}><EditIcon /></div>
                                        <div onClick={(event) => onDeleteItem(event, item.id)}><DeleteIcon /></div>
                                    </div>
                                </div>
                            </li> 
                        )
                    })
                    
                }
            </ul>
            
        </div>
    )
}

export default TodoListItemCard