
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Download, Trash2, FolderOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface SavedDocument {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
  templateId: string;
}

export default function SavedDocuments() {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [selectedView, setSelectedView] = useState<'all' | 'recent'>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadSavedDocuments();
  }, []);

  const loadSavedDocuments = () => {
    // Get all keys from localStorage that start with "template-doc-"
    const keys = Object.keys(localStorage).filter(key => key.startsWith('template-doc-'));
    
    // Map keys to saved document objects
    const docs = keys.map(key => {
      const docData = JSON.parse(localStorage.getItem(key) || '{}');
      return {
        id: key.replace('template-doc-', ''),
        title: docData.title || 'অজানা ডকুমেন্ট',
        content: docData.content,
        lastEdited: docData.lastEdited || new Date().toISOString(),
        templateId: docData.templateId || ''
      };
    });
    
    // Sort by last edited date, newest first
    docs.sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime());
    
    setDocuments(docs);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleView = (docId: string) => {
    navigate(`/documents/view/${docId}`);
  };

  const handleEdit = (docId: string, templateId: string) => {
    navigate(`/templates?doc=${docId}&template=${templateId}`);
  };

  const handleDownload = (docId: string) => {
    toast({
      title: "ডাউনলোড শুরু হয়েছে",
      description: "আপনার ডকুমেন্ট ডাউনলোড হচ্ছে",
    });
    
    // Implementation for download would go here
    // For now, we'll just show a toast
  };

  const handleDelete = (docId: string) => {
    if (window.confirm('আপনি কি এই ডকুমেন্টটি মুছে ফেলতে চান?')) {
      localStorage.removeItem(`template-doc-${docId}`);
      toast({
        title: "ডকুমেন্ট মুছে ফেলা হয়েছে",
        description: "আপনার ডকুমেন্টটি সফলভাবে মুছে ফেলা হয়েছে",
      });
      loadSavedDocuments();
    }
  };

  const displayDocuments = selectedView === 'recent' 
    ? documents.slice(0, 5) 
    : documents;

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-serif font-bold text-court mb-4 md:mb-0">
            <FolderOpen className="inline-block mr-2" />
            সেভড ডকুমেন্টস
          </h1>
          
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedView('all')}
              >
                সকল ডকুমেন্টস
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                onClick={() => setSelectedView('recent')}
              >
                সাম্প্রতিক
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {documents.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>শিরোনাম</TableHead>
                  <TableHead className="hidden md:table-cell">সর্বশেষ সম্পাদনা</TableHead>
                  <TableHead className="text-right">পদক্ষেপ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(doc.lastEdited)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(doc.id)}
                          title="দেখুন"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(doc.id, doc.templateId)}
                          title="সম্পাদনা করুন"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(doc.id)}
                          title="ডাউনলোড"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(doc.id)}
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
            <FolderOpen className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-4">কোন সংরক্ষিত ডকুমেন্ট নেই</p>
            <Button onClick={() => navigate('/templates')}>
              একটি টেমপ্লেট থেকে শুরু করুন
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
