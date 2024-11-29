import { useEffect, useState } from 'react'
import api from '../api'

export default function Home() {

    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")


    useEffect(() => {
        getNotes()
    }, [])

    function getNotes() {
        api.get("/api/notes/")
            .then(res => res.data)
            .then(data => { setNotes(data); console.log(data) })
            .catch(err => alert(err))
    }

    function deleteNote(id) {
        api.delete(`/api/delete/${id}/`).then(res => {
            if (res.status === 204) alert("Note deleted")
            else alert("Failed to delete the note")
            getNotes() // actualiza las notas desde el servidor, seria mas eficiente eliminar la nota del estado directamente
        }
        ).catch(error => alert(error))
      
    }

    function createNote(e) {
        e.preventDefault()
        api.post("/api/notes/", { title, content })
            .then(res => {
                console.log(res)
                if (res.status === 201) alert(" Note created successfully ")
                else alert("Failed to create new note")
                getNotes()
            })
            .catch(err => alert(err))
    }

    return (

        <div>Notes
            <div>
                {notes.map(note => {
                    return <div key={note.id}>
                        <p >title {note.title}</p>
                    </div>
                })}
            </div>

            <h2> Create Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title"></label>
                <input type="text"
                    id='title'
                    name='title'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />
                <label htmlFor="content"></label>
                <input type="text"
                    id='content'
                    name='content'
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    required
                />
                <button type='submit'> Create Note </button>
            </form>
        </div>

    )
}