import { useState } from "react";
import { useNote } from "../context/TodoContext";

    function TodoItem({ Note }) {

        const [isEditable, setIsEditable] = useState(false);
        const [noteMsg, setNoteMsg] = useState(Note.text);

        const {updateNote, toggleComplete, deleteNote} = useNote()

        const editTodo =()=>{
            updateNote(Note.id, {...Note, text:noteMsg})
            setIsEditable(false);
        }

        const toggleCompleted = () =>{
            toggleComplete(Note.id)
        }

    return (
        <div
            className={`w-full flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                Note.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={Note.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isEditable ? "border-black/10 px-2" : "border-transparent"
                } ${Note.completed ? "line-through" : ""}`}
                value={noteMsg}
                onChange={(e) => setNoteMsg(e.target.value)}
                readOnly={!isEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (Note.completed) return;

                    if (isEditable) {
                        editTodo();
                    } else setIsEditable((prev) => !prev);
                }}
                disabled={Note.completed}
            >
                {isEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteNote(Note.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
