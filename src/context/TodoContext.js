import { useContext, createContext} from "react"

export const TodoContext = createContext({
    Notes:[
        {
            id:1,
            text:"This is the toDo note",
            completed:false
        }
    ],
    addNote: (Note)=>{},
    updateNote: (id, Note)=>{},
    deleteNote:(id)=>{},
    toggleComplete:(id)=>{}
})  

export const useNote = ()=>{
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider