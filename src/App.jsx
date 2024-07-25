import './App.css'
import React, { useEffect, useState } from 'react'
import { TodoProvider} from './context/TodoContext'
import TodoForm from './components/ToDoForm'
import TodoItem from './components/ToDoItem'

export default function App() {

  const [Notes, setNotes] = useState([])
  
  const addNote = (Note) =>{

    setNotes((prev)=>[{id:Date.now(),...Note},...prev])  // using callback func is state we can get previous values of prev state

  }
  const updateNote = (id, Note) =>{
    setNotes((prev)=> prev.map((prevNote)=>(prevNote.id == id ? Note : prevNote)))
  }
  const deleteNote = (id) =>{ // can use map but filter is good choice
    setNotes((prev)=> prev.filter((Note)=> Note.id !== id))
  }

  const toggleComplete = (id) =>{
    setNotes((prev)=> prev.map((Note)=> Note.id == id ? ({...Note,completed:!Note.completed}) : Note))
  }

  useEffect(() => {
    
    const Notes = JSON.parse(localStorage.getItem("notes"));
    if(Notes && Notes.length > 0){
      setNotes(Notes)
    }
  
  }, [])

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(Notes))
  }, [Notes])
  
  return (
    <TodoProvider value={{ addNote,Notes,updateNote,deleteNote,toggleComplete}}>
    <div className="bg-[#172842]  w-full min-h-full py-8">
      <div className="max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              {/* Todo form goes here */} 
              <TodoForm/>
          </div>
          <div className=" flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
             { Notes.map((Note)=>(
             <div className='w-full' key={Note.id}>
                  <TodoItem Note = {Note}/>
                </div>
              ))}
          </div>
      </div>
  </div>
  </TodoProvider>
  )
}
