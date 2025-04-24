
import React from 'react';
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="border-b p-2 flex flex-wrap gap-1 bg-gray-50 rounded-t-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-200' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-200' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setUnderline().run()}
        className={editor.isActive('underline') ? 'bg-gray-200' : ''}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
