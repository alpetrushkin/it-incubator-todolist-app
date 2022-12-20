import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
   id: string,
   title: string,
   filter: FilterValuesType
}

function App() {
   let todolistID1 = v1();
   let todolistID2 = v1();

   let [todolists, setTodolists] = useState<TodoListsType[]>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ])

   let [tasks, setTasks] = useState({
      [todolistID1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false}
      ],
      [todolistID2]: [
         {id: v1(), title: "HTML&CSS2", isDone: true},
         {id: v1(), title: "JS2", isDone: true},
         {id: v1(), title: "ReactJS2", isDone: false},
         {id: v1(), title: "Rest API2", isDone: false},
         {id: v1(), title: "GraphQL2", isDone: false}
      ]
   });

   function changeFilter(todolistID: string, value: FilterValuesType) {
      setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
   }

   function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
      setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
   }

   function removeTask(todolistID: string, taskID: string) {
      setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
   }

   function addTask(todolistID: string, title: string) {
      let newTask = {id: v1(), title: title, isDone: false};
      setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
   }

   return (
      <div className="App">
         {
            todolists.map(todo => {
               let tasksForTodolist = tasks[todo.id];
               if (todo.filter === "active") {
                  tasksForTodolist = tasks[todo.id].filter(t => t.isDone);
               }
               if (todo.filter === "completed") {
                  tasksForTodolist = tasks[todo.id].filter(t => !t.isDone);
               }

               return (
                  <Todolist
                     key={todo.id}
                     todolistID={todo.id}
                     title={todo.title}
                     tasks={tasksForTodolist}
                     removeTask={removeTask}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     changeTaskStatus={changeStatus}
                     filter={todo.filter}
                  />
               )
            })
         }
      </div>
   );
}

export default App;
