
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import EditorToolbar from './EditorToolbar';
import { legalTemplates } from '@/types/template';
import { useToast } from "@/hooks/use-toast";

interface DocumentEditorProps {
  templateId: string;
}

export default function DocumentEditor({ templateId }: DocumentEditorProps) {
  const { toast } = useToast();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>টেমপ্লেট লোড হচ্ছে...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none min-h-[500px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      // Autosave functionality
      localStorage.setItem(`template-${templateId}`, editor.getHTML());
      toast({
        description: "পরিবর্তনগুলি স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে...",
      });
    },
  });

  React.useEffect(() => {
    const selectedTemplate = legalTemplates
      .flatMap(group => group.templates)
      .find(template => template.id === templateId);

    if (selectedTemplate && editor) {
      const savedContent = localStorage.getItem(`template-${templateId}`);
      editor.commands.setContent(savedContent || selectedTemplate.content);
    }
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
