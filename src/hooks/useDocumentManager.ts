
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

interface DocumentData {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
  templateId: string;
}

interface UseDocumentManagerProps {
  templateId: string;
  docId?: string | null;
}

export function useDocumentManager({ templateId, docId }: UseDocumentManagerProps) {
  const { toast } = useToast();
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [lastSavedContent, setLastSavedContent] = useState<string>('');
  const [draftKey] = useState<string>(`draft-${docId || templateId}`);

  const generateDefaultTitle = () => {
    const now = new Date();
    const timestamp = now.toLocaleString('bn-BD', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${documentTitle || 'টেমপ্লেট'}_${timestamp}`;
  };

  const saveDraft = useCallback((content: string) => {
    if (!content) return;
    
    const draftData = {
      content,
      lastEdited: new Date().toISOString()
    };
    
    localStorage.setItem(draftKey, JSON.stringify(draftData));
    setLastSavedContent(content);
    
    toast({
      description: `ড্রাফট অটোসেভ করা হয়েছে ${new Date().toLocaleTimeString('bn-BD')}`,
    });
  }, [draftKey, toast]);

  const saveDocument = useCallback((content: string, customTitle?: string) => {
    if (!templateId || !content) return;
    
    const documentId = docId || `new-${uuidv4()}`;
    const finalTitle = customTitle || generateDefaultTitle();
    
    const documentData: DocumentData = {
      id: documentId,
      title: finalTitle,
      content: content,
      lastEdited: new Date().toISOString(),
      templateId: templateId
    };
    
    localStorage.setItem(`template-doc-${documentId}`, JSON.stringify(documentData));
    localStorage.removeItem(draftKey); // Clear draft after saving
    
    toast({
      title: "ডকুমেন্ট সেভ করা হয়েছে",
      description: `"${finalTitle}" হিসেবে সংরক্ষিত হয়েছে ${new Date().toLocaleTimeString('bn-BD')}`,
    });
    
    return documentId;
  }, [templateId, docId, draftKey, generateDefaultTitle, toast]);

  const loadDraft = useCallback(() => {
    const draft = localStorage.getItem(draftKey);
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      return parsedDraft.content;
    }
    return null;
  }, [draftKey]);

  useEffect(() => {
    return () => {
      // Cleanup draft on unmount if it was saved as a document
      if (docId) {
        localStorage.removeItem(draftKey);
      }
    };
  }, [draftKey, docId]);

  return {
    documentTitle,
    setDocumentTitle,
    saveDraft,
    saveDocument,
    loadDraft,
    lastSavedContent,
    generateDefaultTitle
  };
}
