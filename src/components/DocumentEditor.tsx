
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import EditorToolbar from './EditorToolbar';
import { legalTemplates } from '@/types/template';
import { useSearchParams } from 'react-router-dom';
import { useDocumentManager } from '@/hooks/useDocumentManager';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocumentEditorProps {
  templateId: string;
}

export default function DocumentEditor({ templateId }: DocumentEditorProps) {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get('doc');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [lastAutoSave, setLastAutoSave] = useState<NodeJS.Timeout>();
  
  const {
    documentTitle,
    setDocumentTitle,
    saveDraft,
    saveDocument,
    loadDraft,
    generateDefaultTitle
  } = useDocumentManager({ templateId, docId });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: '<p>টেমপ্লেট লোড হচ্ছে...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none min-h-[500px] p-4'
      }
    },
    onUpdate: ({ editor }) => {
      // Clear previous timeout if it exists
      if (lastAutoSave) {
        clearTimeout(lastAutoSave);
      }
      
      // Set new timeout for autosave
      const timeout = setTimeout(() => {
        saveDraft(editor.getHTML());
      }, 2000); // Autosave after 2 seconds of inactivity
      
      setLastAutoSave(timeout);
    }
  });

  useEffect(() => {
    if (!editor) return;

    // Check for draft first
    const draftContent = loadDraft();
    if (draftContent) {
      editor.commands.setContent(draftContent);
      return;
    }

    // If no draft, load saved document or template
    if (docId) {
      const savedDoc = localStorage.getItem(`template-doc-${docId}`);
      if (savedDoc) {
        const parsedDoc = JSON.parse(savedDoc);
        editor.commands.setContent(parsedDoc.content);
        setDocumentTitle(parsedDoc.title);
        return;
      }
    }

    // Load from template if no saved document
    const selectedTemplate = legalTemplates
      .flatMap(group => group.templates)
      .find(template => template.id === templateId);

    if (selectedTemplate) {
      editor.commands.setContent(selectedTemplate.content);
      setDocumentTitle(selectedTemplate.title);
    }
  }, [templateId, editor, docId, loadDraft]);

  const handleSave = () => {
    if (!editor) return;
    const title = customTitle || generateDefaultTitle();
    saveDocument(editor.getHTML(), title);
    setSaveDialogOpen(false);
  };

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        setSaveDialogOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ডকুমেন্ট সংরক্ষণ করুন</DialogTitle>
          </DialogHeader>
          <Input
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder={generateDefaultTitle()}
            className="mt-4"
          />
          <DialogFooter>
            <Button onClick={() => setSaveDialogOpen(false)} variant="outline">
              বাতিল
            </Button>
            <Button onClick={handleSave}>
              সংরক্ষণ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <input
        type="text"
        value={documentTitle}
        onChange={(e) => setDocumentTitle(e.target.value)}
        className="w-full p-3 text-xl font-serif font-bold border-b focus:outline-none focus:border-court mb-2"
        placeholder="ডকুমেন্টের শিরোনাম..."
      />
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="flex-1" />
    </div>
  );
}
