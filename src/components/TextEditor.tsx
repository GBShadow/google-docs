import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
import { ComponentType, useEffect, useState } from 'react'
import { EditorProps } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { useSession } from 'next-auth/client'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { db } from '../../firebase'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'

const Editor: ComponentType<EditorProps> = dynamic(
  () => import('react-draft-wysiwyg').then(module => module.Editor),
  {
    ssr: false,
  }
)

type TextEditorProps = {
  id: string
}

function TextEditor({ id }: TextEditorProps) {
  const [session] = useSession()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [snapshot] = useDocumentOnce(
    db.collection('userDocs').doc(session.user.email).collection('docs').doc(id)
  )

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      )
    }
  }, [snapshot])

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)

    db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        {
          merge: true,
        }
      )
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 mb-12 p-10 bg-white shadow-lg max-w-5xl mx-auto border"
      />
    </div>
  )
}

export default TextEditor
