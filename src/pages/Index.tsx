
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import Layout from '@/components/Layout';
import { Printer, FileText, Scan, FolderOpen, Upload, Receipt, User } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: <Printer size={40} />,
      title: "ফাইল প্রিন্ট",
      description: "PDF, ওয়ার্ড, ইমেজ দ্রুত প্রিন্ট করুন",
      path: "/print"
    },
    {
      icon: <Scan size={40} />,
      title: "ডকুমেন্ট স্ক্যান",
      description: "দলিল বা আইনি কাগজপত্র স্ক্যান করুন",
      path: "/scan"
    },
    {
      icon: <FolderOpen size={40} />,
      title: "সেভড ডকুমেন্টস",
      description: "আপনার সংরক্ষিত দলিল দেখুন এবং সম্পাদনা করুন",
      path: "/documents"
    },
    {
      icon: <FileText size={40} />,
      title: "লিগ্যাল টেমপ্লেট",
      description: "আইনি ফর্ম ও দলিলের প্রস্তুত টেমপ্লেট",
      path: "/templates"
    },
    {
      icon: <Receipt size={40} />,
      title: "রেকর্ড ট্র্যাকিং",
      description: "আপনার সকল রেকর্ড ও খরচ দেখুন",
      path: "/records"
    },
    {
      icon: <User size={40} />,
      title: "গ্রাহক তথ্য",
      description: "গ্রাহক ও তাদের রেকর্ড ব্যবস্থাপনা",
      path: "/customers"
    },
  ];
  
  return (
    <Layout>
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-court mb-4">
          রেকর্ড ল্যাবস
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          আদালত এলাকায় সহজে লিগ্যাল ডকুমেন্ট প্রিন্টিং, স্ক্যানিং, টাইপিং ও আইনি দলিল ব্যবস্থাপনা
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            onClick={() => navigate(service.path)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
