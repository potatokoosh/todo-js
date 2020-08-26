import { Todo } from "./todo.class";

export class TodoList {

  constructor(){
    // this.todos = [];
    this.cargarLocalStorage();
  }

  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  eliminarTodo( id ){
    // regresa un nuevo arreglor con filter con todos los todo.id diferentes al id que viene por parametro
    this.todos = this.todos.filter( todo => todo.id != id );

    this.guardarLocalStorage();
  }

  marcarCompletado( id ){
    for( const todo of this.todos){

      console.log(id, todo.id);
      // todo.id, extrae todos los elemento que hay dentro del arreglo this.todos
      if(todo.id == id){
        todo.completado = !todo.completado;

        this.guardarLocalStorage();
        break;
      }
    }
  }

  eliminarCompletados(){
    // retorna todos los todo que no estan completado, estado false
    this.todos = this.todos.filter( todo => !todo.completado )
    this.guardarLocalStorage();
  }

  guardarLocalStorage(){
    // El localStorage solo permite almacenar strings, por eso convertimos a formato JSON el array de this.todos
    localStorage.setItem('todo',  JSON.stringify(this.todos));
  }

  cargarLocalStorage(){
   /* if( localStorage.getItem('todo')){
      // JSON.parse convierte el formato JSON a un arreglo
      this.todos = JSON.parse( localStorage.getItem('todo'))

      console.log('cargarLocal: ',this.todos);
    }else{
      this.todos = [];// regreso un array vacio
    }*/

    this.todos = (localStorage.getItem('todo')) 
                ? JSON.parse( localStorage.getItem('todo')): [];

    this.todos = this.todos.map(obj => Todo.fromJson(obj))

  }

}