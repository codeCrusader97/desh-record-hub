
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Edit, Download, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface DocumentData {
  title: string;
  content: string;
  lastEdited: string;
  templateId: string;
}

export default function ViewDocument() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const docData = localStorage.getItem(`template-doc-${id}`);
      if (docData) {
        setDocument(JSON.parse(docData));
      }
    }
    setLoading(false);
  }, [id]);

  const handleEdit = () => {
    if (document && id) {
      navigate(`/templates?doc=${id}&template=${document.templateId}`);
    }
  };

  const handleDownload = () => {
    toast({
      title: "ডাউনলোড শুরু হয়েছে",
      description: "আপনার ডকুমেন্ট ডাউনলোড হচ্ছে",
    });
    // Implementation for download would go here
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>লোড হচ্ছে...</p>
        </div>
      </Layout>
    );
  }

  if (!document) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl text-gray-500 mb-4">ডকুমেন্ট পাওয়া যায়নি</p>
          <Button onClick={() => navigate('/documents')}>
            সকল ডকুমেন্টস দেখুন
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="gap-2" 
            onClick={() => navigate('/documents')}
          >
            <ArrowLeft className="h-4 w-4" />
            ফিরে যান
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleEdit}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              <span>সম্পাদনা করুন</span>
            </Button>
            <Button 
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span>ডাউনলোড</span>
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h1 className="text-2xl font-serif font-bold mb-6">{document.title}</h1>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: document.content }} 
          />
        </div>
      </div>
    </Layout>
  );
}
