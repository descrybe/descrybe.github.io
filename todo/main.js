let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'); 
    //при получении элемента через querySelector нужно указывать полную сигнатуру селектора,
    //а не его название: если класс, то с .classname, если айди, #idname итд

    
//массив, в котором храним каждое новое дело
let todoList = []; 


//обработчик событий при нажатии на кнопку
addButton.addEventListener('click', function() {  
    
    //объект, содержаний данные наших дел
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    if(!addMessage.value) return;

    //добавляем дела в массив
    todoList.push(newTodo); 

    addMessage.value = '';

    console.log(newTodo);
    displayMessages();


    //сохраняем события в localStorage
    //localstorage сохраняет только строку    
    localStorage.setItem('todo', JSON.stringify(todoList)); 
    //метод возвращает строку в JSON формате
});

//функция, которая выводит каждый объект в виде списка <ul>
function displayMessages() {
    let displayMessage = '';
    todoList.forEach(function(item, i) {
        //строковая интерполяция(шаблонные строки) при помощи обратных кавычек
        //в фигурные скобки передается переменная
        displayMessage += `
        <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}> 
        <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
        </li> `;
        //внутри проверяем на checked, чтобы сохранять checked пункты         
        //при обновлении страницы или при обновлении страницы


        //добавляем верстку внутрь элемента todo
        todo.innerHTML = displayMessage; 
        
    });

    //очистка списка, если нет переменных в localStorage
    if(todoList.length === 0) todo.innerHTML = '';

}


//проверяем, есть ли в localstorage данные и возвращаем, если есть
if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
} 


//навешиваем события на список:
//если что-то меняется, то запускается функция
todo.addEventListener('change', function(event) {
    let idInput = event.target.getAttribute('id');
    let valueLabel = todo.querySelector('[for='+ idInput + ']').innerHTML;
    console.log('valueLabel: ', valueLabel);
    
    
    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});


//отключение контекстного меню на ПКМ
todo.addEventListener('contextmenu', function(event) {
   //отменяет стандартное поведение браузера
    event.preventDefault();   
    todoList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
        
    });
});