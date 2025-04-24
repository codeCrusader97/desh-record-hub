
import React from 'react';
import Layout from '@/components/Layout';
import DocumentEditor from '@/components/DocumentEditor';
import TemplatesSidebar from '@/components/TemplatesSidebar';
import { Button } from '@/components/ui/button';
import { Download, Printer, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { legalTemplates } from '@/types/template';

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleSave = () => {
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "আপনার পরিবর্তনগুলি সফলভাবে সংরক্ষিত হয়েছে",
    });
  };

  const handleDownload = () => {
    toast({
      title: "ডাউনলোড শুরু হয়েছে",
      description: "আপনার ডকুমেন্ট ডাউনলোড হচ্ছে",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-full gap-4">
        <TemplatesSidebar 
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onSelectTemplate={handleTemplateSelect}
          templates={legalTemplates}
        />
        
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-serif font-bold text-court mb-4">
            {selectedTemplate ? 'টেমপ্লেট সম্পাদনা করুন' : 'টেমপ্লেট নির্বাচন করুন'}
          </h1>
          
          {selectedTemplate ? (
            <>
              <div className="flex-1 bg-white rounded-lg shadow-md mb-4">
                <DocumentEditor templateId={selectedTemplate} />
              </div>
              
              <div className="sticky bottom-4 flex justify-end gap-2 p-4 bg-white/80 backdrop-blur rounded-lg shadow-lg">
                <Button variant="outline" onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  <span>সেভ করুন</span>
                </Button>
                <Button variant="outline" onClick={handleDownload} className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>ডাউনলোড</span>
                </Button>
                <Button onClick={() => window.print()} className="gap-2">
                  <Printer className="h-4 w-4" />
                  <span>প্রিন্ট</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              বাম পাশ থেকে একটি টেমপ্লেট নির্বাচন করুন
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
