
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import EditorToolbar from './EditorToolbar';

interface DocumentEditorProps {
  templateId: string;
}

export default function DocumentEditor({ templateId }: DocumentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Loading template content...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none min-h-[500px] p-4',
      },
    },
  });

  React.useEffect(() => {
    // Here we would load the template content based on templateId
    // For now using placeholder content
    const content = `
      <h1>আদালতের আবেদন</h1>
      <p>মহামান্য আদালত সমীপে,</p>
      <p>বিনীত নিবেদন এই যে...</p>
    `;
    
    editor?.commands.setContent(content);
  }, [templateId, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="flex-1" />
    </div>
  );
}
