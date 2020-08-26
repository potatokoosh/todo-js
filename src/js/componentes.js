import { Todo } from '../classes/index.js';

import { todoList } from '../index';


// Referencias en el HTML
const divTodoList     = document.querySelector('.todo-list');
const txtInput        = document.querySelector('.new-todo');
const btnBorrar       = document.querySelector('.clear-completed');
const ulFilters       = document.querySelector('.filters');
const anchorFiltros   = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo )=>{

  // ${ (todo.completado) ? 'completed' : '',, esta condicion pone o quita el class completed que esta en el archivo styles.css, todo.completado viene en el parametro enviado (todo)
  const htmlTodo = `
  <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
  </li>
  `;

  const div = document.createElement('div');// creo un div
  div.innerHTML = htmlTodo; // creo el contenido del div

  divTodoList.append(div.firstElementChild);// inserto solo el li que es el primer elemento del div, para no insertar un nuevo div

  return div.firstElementChild;

}

// Eventos
txtInput.addEventListener('keyup', ( event ) => {
  //console.log(event); 
  // console.log(txtInput.value);// txtInput.value,, es todo el texto que tiene el input
  // keyCode 13, es Tecla Enter
  if (event.keyCode === 13 && txtInput.value.length > 0 ){ 
    const nuevoTodo = new Todo (txtInput.value);// nuevoTodo tiene el valor que hay al momento de hacer enter en el input
    //console.log(nuevoTodo);
    todoList.nuevoTodo(nuevoTodo); // inserto el nuevoTodo en el class nuevoTodo que esta dentro de todoList
    //console.log(todoList);

    crearTodoHtml(nuevoTodo);

    txtInput.value = ''; // vaciamos el input para que quede vacio ya que se agrego al crearTodoHtml
  }

});


divTodoList.addEventListener('click', (event)=>{

  // event.target.localName ,, nos indica que parte del li que cree, le estoy haciendo click,, label, input o button
  //console.log(event.target.localName);

  const nombreElemento = event.target.localName;// input, label, button,, estas son las opciones

  // event.target.parentElement,, hace referencia al contenedor del target que trae el event,, al poner dos veces parentElement significa que subo dos posiciones del contenedor
  // el objetivo es poder hacer referencia al li que tiene la tarea, para poder hace check o borrarla con el button
  const todoElement  = event.target.parentElement.parentElement;
  console.log('todoElement',todoElement);


  // extraigo el id del li 
  const todoId   = todoElement.getAttribute('data-id');
  // console.log(todoId);


  if (nombreElemento.includes('input')){// click en el check
    todoList.marcarCompletado(todoId);

    // toggle le quita o pone el class completed, si lo tiene lo quita o si no lo tiene lo pone
    // el class completed hace una raya en el label osea la palabra
    todoElement.classList.toggle('completed');
  }else if (nombreElemento.includes('button')){
    todoList.eliminarTodo(todoId);// borra del arreglo
    divTodoList.removeChild( todoElement );// elimina del html el elmento
  }

  console.log('todoList',todoList);
})


btnBorrar.addEventListener('click', () => {
  todoList.eliminarCompletados();

  // vamos a ir eliminando los li que estan dentro del div
  // posicion inicial de i es el ultimo elemento del array
  // y 1-- recorre de ultimo posicion hacia la posicion 0
  for( let i = divTodoList.children.length-1; i >= 0; i-- ){
    const elemento = divTodoList.children[i];

    //console.log(elemento);
    if(elemento.classList.contains('completed')){
      divTodoList.removeChild(elemento);

    }

  }
});


ulFilters.addEventListener('click', (event) => {
  //console.log(event.target.text);
  // click al texto de Todos, Pendientes, Completados
  const filtro = event.target.text

  if (!filtro) {return; };

  // al hacer click en Todos o Pendientes o Completados, marcamos con el recuadro que lo rodea con el classList selected al que le dimos click y le quitamos el recuadro el que lo tenia seleccionado
  anchorFiltros.forEach(elem => {elem.classList.remove('selected')});
  event.target.classList.add('selected')
  console.log(event.target)


  for(const elemento of divTodoList.children){
    //console.log(elemento);
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    switch( filtro ) {

      case 'Pendientes':
        if(completado){
          elemento.classList.add('hidden');
        }
      break;

      case 'Completados':
        if(!completado){
          elemento.classList.add('hidden');
        }
      break;

    }
  }

})