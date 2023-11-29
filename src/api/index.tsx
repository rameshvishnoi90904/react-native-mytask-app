import { task } from "../utils/types";

const serverEndPoint = "https://jsonplaceholder.typicode.com";
const fetchTodoList = () : Promise<Array<task>> => {
    const toReturn = fetch(`${serverEndPoint}/posts/`)
    .then((response) => response.json());
    return toReturn;
}

const addNewTodoItem = (item: task) : Promise<task> => {
    return fetch(`${serverEndPoint}/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title: item.title,
          body: item.body,
          userId: item.userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            return json;
        });
}

const deleteTodoItem = (todoId: number) : Promise<void> => {
    return fetch(`${serverEndPoint}/posts/${todoId}`, {
        method: 'DELETE',
    }).then((response) => response.json())
    .then((value) => console.log(value))
}

const updateTodoItem = (item: task) : Promise<void> => {
    return fetch(`${serverEndPoint}/posts/${item.id}`, {
    method: 'PUT',
    body: JSON.stringify({
       ...item
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
export {
    fetchTodoList, 
    deleteTodoItem,
    addNewTodoItem, 
    updateTodoItem
};