import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


interface IProps {
   body: string,
   setBody: (body: string) => void
}

const LiteQuill = ({ body, setBody}: IProps) => {

   const modules = { toolbar: { container } }
   return (
      <div>
         <ReactQuill 
            theme='snow'
            modules={modules}
            placeholder='Write something...'
            onChange={e => setBody(e)}
            value={body}
         />
      </div>
   )
}

let container = [
   [{ 'font': [] }],
   ['bold', 'italic', 'underline', 'strike'],
   ['blockquote', 'code-block', 'link'],
   [{ 'color': [] }, { 'background': [] }],
   [{ 'script': 'sub' }, { 'script': 'super' }]
]

export default LiteQuill