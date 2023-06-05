export const registrationURL = () => {
    return `api/auth/register/`
}

export const loginUserURL = () => {
    return `api/auth/login/`
}

export const logoutURL = () => {
    return `api/auth/logout/`
}

export const createTodoListURL = () => {
    return `api/todo-lists/create/`
}

export const deleteTodoListURL = (todo_list_id) => {
    return `api/todo-lists/${todo_list_id}/delete/`
}

export const getListItemsURL = () => {
    return `api/todo-lists/`
}

export const createTodoListItemURL = (todo_list_id) => {
    return `api/todo-list-items/${todo_list_id}/`
}

export const updateTodoListItemURL = (todo_list_item_id) => {
    return `api/todo-list-items/${todo_list_item_id}/change`
}

export const deleteTodoListItemURL = (todo_list_item_id) => {
    return `api/todo-list-items/${todo_list_item_id}/delete`
}