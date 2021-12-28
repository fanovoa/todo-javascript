import {Todo } from '../classes';
import { todoList } from '../index';
import { crearTodoHTML, divTodoList } from './componentes';

const txtInput = document.querySelector('.new-todo');
const btnBorrar= document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

//Eventos
txtInput.addEventListener('keyup', (event) => {

    if(event.keyCode === 13 && txtInput.value.length> 0 ) {    
        const nuevoTodo = new Todo( txtInput.value );
         todoList.nuevoTodo(nuevoTodo);
         crearTodoHTML(nuevoTodo);
         txtInput.value='';
    }
})

divTodoList.addEventListener('click' , (event) => {

    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){ //click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    }else if(nombreElemento.includes('button')){

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElemento );
    }
})

btnBorrar.addEventListener('click' , (event) => {

    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1 ; i>=0 ;i--){
        
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
  
});


ulFiltros.addEventListener('click' , (event) => {
    

    const filtro = event.target.text;
    if( !filtro ) return;

    anchorFiltros.forEach(element => {
        element.classList.remove('selected');
    });

    event.target.classList.add('selected');

    for( const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                    
                }
            break;

            
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                    
                }
            break;
        }
    }
})