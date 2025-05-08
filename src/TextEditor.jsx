import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "./styles.css"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"

//creating more options to select for tool bar
const TOOLBAR_OPTIONS = [
    [{header: [1, 2, 3, 4, 5, 6,false] }],
    [{font: [] }],
    [{list: "ordered" }, {list: "bullet"}],
    ["bold", "italic", "underline"],
    [{color: []}, {background: [] }],
    [{script: "sub"}, {script: "super"}],
    [{align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

export default function TextEditor() {
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect (() => {
        //server URL
        const s = io("http://localhost:5174")
        setSocket(s)

        return () => {
            s.disconnect()
        } 
    }, [])

    const wrapperRef = useCallback((wrapper) => {
        //checking if there is a wrapper
        if(wrapper == null) return

        wrapper.innerHTML = " "
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: "snow", modules: {toolbar: TOOLBAR_OPTIONS} })
        setQuill(q)

    }, [])
    
    return <div className = "container" ref = {wrapperRef}></div>
}