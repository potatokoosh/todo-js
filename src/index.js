import './styles.css';

import {Todo, TodoList} from './classes/index.js';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

// const tarea = new Todo('Aprender JavaScript');
// console.log(tarea);
// todoList.nuevoTodo(tarea);

//console.log(todoList);

// crearTodoHtml(tarea)

todoList.todos.forEach(todo => crearTodoHtml(todo) );

console.log('todos', todoList.todos);