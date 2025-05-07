import { useCallback } from "react"
import Quill from "quill"
import "./styles.css"
import "quill/dist/quill.snow.css"

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
    const wrapperRef = useCallback((wrapper) => {
        //checking if there is a wrapper
        if(wrapper == null) return

        wrapper.innerHTML = " "
        const editor = document.createElement("div")
        wrapper.append(editor)
        new Quill(editor, { theme: "snow", modules: {toolbar: TOOLBAR_OPTIONS} })

    }, [])
    
    return <div className = "container" ref = {wrapperRef}></div>
}