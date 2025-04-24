
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Printer } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function PrintService() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [copies, setCopies] = useState(1);
  const [customer, setCustomer] = useState({
    name: '',
    phone: ''
  });
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handlePrint = () => {
    if (!file) {
      toast({
        title: "একটি ফাইল নির্বাচন করুন",
        description: "প্রিন্ট করার জন্য অনুগ্রহ করে একটি ফাইল আপলোড করুন",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate printing
    toast({
      title: "প্রিন্ট করা হচ্ছে...",
      description: `${file.name} - ${copies} কপি`,
    });
    
    // Here you would normally send to a printer or generate invoice
    setTimeout(() => {
      toast({
        title: "প্রিন্ট সম্পন্ন হয়েছে",
        description: "আপনার ফাইল সফলভাবে প্রিন্ট করা হয়েছে।",
      });
    }, 2000);
  };
  
  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-court mb-6">
          ফাইল প্রিন্ট সেবা
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="record-card">
            <h2 className="text-xl font-serif font-semibold mb-4">ফাইল আপলোড করুন</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-court mb-2" />
                <p className="mb-2">ফাইল নির্বাচন করুন অথবা এখানে টেনে আনুন</p>
                <p className="text-sm text-gray-500 mb-4">PDF, DOC, JPG ফাইল সাপোর্টেড</p>
                <Input
                  type="file"
                  className="max-w-sm"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
            </div>
            
            {file && (
              <div className="mb-6 p-4 bg-court-light rounded-lg">
                <p className="font-medium">ফাইল নির্বাচিত:</p>
                <p>{file.name}</p>
                <p className="text-sm text-gray-500">
                  সাইজ: {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <Label htmlFor="copies">কপি সংখ্যা</Label>
              <Input
                id="copies"
                type="number"
                min="1"
                max="100"
                value={copies}
                onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
                className="max-w-[100px]"
              />
            </div>
          </div>
          
          <div className="record-card">
            <h2 className="text-xl font-serif font-semibold mb-4">গ্রাহক তথ্য</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="name">নাম</Label>
                <Input
                  id="name"
                  value={customer.name}
                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                  placeholder="গ্রাহকের নাম লিখুন"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">মোবাইল নম্বর</Label>
                <Input
                  id="phone"
                  value={customer.phone}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">প্রিন্টিং বিবরণ:</h3>
              <p>মোট পৃষ্ঠা: {file ? '1' : '0'}</p>
              <p>কপি: {copies}</p>
              <p>দাম: ৳{file ? copies * 10 : 0}</p>
              
              <Button 
                className="w-full mt-6 primary-button"
                onClick={handlePrint}
                disabled={!file}
              >
                <Printer className="mr-2" size={20} />
                প্রিন্ট করুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
