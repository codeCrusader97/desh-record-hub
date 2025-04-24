import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import EditorToolbar from './EditorToolbar';
import { legalTemplates } from '@/types/template';
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface DocumentEditorProps {
  templateId: string;
}

export default function DocumentEditor({ templateId }: DocumentEditorProps) {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const docId = searchParams.get('doc');
  const [documentTitle, setDocumentTitle] = useState<string>('');
  
  // Initialize editor with needed extensions
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
      saveDocument(editor.getHTML());
      toast({
        description: "পরিবর্তনগুলি স্বয়ংক্রিয়ভাবে সংরক্ষিত হচ্ছে...",
      });
    },
  });

  // Save document to localStorage with metadata
  const saveDocument = (content: string) => {
    if (!templateId) return;
    
    // Get or create document ID
    const documentId = docId || `new-${uuidv4()}`;
    
    // Get template info for title
    const selectedTemplate = legalTemplates
      .flatMap(group => group.templates)
      .find(template => template.id === templateId);
    
    // Create document object
    const documentData = {
      title: documentTitle || selectedTemplate?.title || 'অজানা ডকুমেন্ট',
      content: content,
      lastEdited: new Date().toISOString(),
      templateId: templateId
    };
    
    // Save to localStorage
    localStorage.setItem(`template-doc-${documentId}`, JSON.stringify(documentData));
  };

  useEffect(() => {
    // If we have a document ID, try to load it
    if (docId && editor) {
      const savedDoc = localStorage.getItem(`template-doc-${docId}`);
      
      if (savedDoc) {
        const parsedDoc = JSON.parse(savedDoc);
        editor.commands.setContent(parsedDoc.content);
        setDocumentTitle(parsedDoc.title);
        return;
      }
    }
    
    // Otherwise load from template
    const selectedTemplate = legalTemplates
      .flatMap(group => group.templates)
      .find(template => template.id === templateId);

    if (selectedTemplate && editor) {
      editor.commands.setContent(selectedTemplate.content);
      setDocumentTitle(selectedTemplate.title);
    }
  }, [templateId, editor, docId]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <input
        type="text"
        value={documentTitle}
        onChange={(e) => {
          setDocumentTitle(e.target.value);
          if (editor.getHTML()) {
            saveDocument(editor.getHTML());
          }
        }}
        className="w-full p-3 text-xl font-serif font-bold border-b focus:outline-none focus:border-court mb-2"
        placeholder="ডকুমেন্টের শিরোনাম..."
      />
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="flex-1" />
    </div>
  );
}
