import './styles.css';

import { Todo,TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';
import './js/eventos';
// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';


export const todoList = new TodoList();

todoList.todos.forEach(todo =>  crearTodoHTML( todo ));

 console.log(todoList);