
import React from 'react';
import Layout from '@/components/Layout';
import DashboardStat from '@/components/DashboardStat';
import { Printer, FileText, Scan, Upload, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const todayStats = [
    { 
      title: "মোট প্রিন্ট",
      value: 45,
      subtitle: "আজ",
      icon: <Printer size={24} />
    },
    { 
      title: "ডকুমেন্ট টাইপিং",
      value: 12,
      subtitle: "আজ",
      icon: <Type size={24} />
    },
    { 
      title: "স্ক্যান করা হয়েছে",
      value: 23,
      subtitle: "আজ",
      icon: <Scan size={24} />
    },
    { 
      title: "মোট গ্রাহক",
      value: 18,
      subtitle: "আজ",
      icon: <FileText size={24} />
    },
  ];
  
  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-court mb-6">
          ড্যাশবোর্ড
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {todayStats.map((stat, index) => (
            <DashboardStat 
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
            />
          ))}
        </div>
        
        <h2 className="text-xl font-serif font-bold text-court mb-4">
          দ্রুত পরিষেবা
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center hover:bg-court-light"
            onClick={() => navigate('/print')}
          >
            <Printer size={28} className="mb-2 text-court" />
            <span>প্রিন্ট</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center hover:bg-court-light"
            onClick={() => navigate('/scan')}
          >
            <Scan size={28} className="mb-2 text-court" />
            <span>স্ক্যান</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center hover:bg-court-light"
            onClick={() => navigate('/typing')}
          >
            <Type size={28} className="mb-2 text-court" />
            <span>টাইপিং</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center hover:bg-court-light"
            onClick={() => navigate('/documents')}
          >
            <FileText size={28} className="mb-2 text-court" />
            <span>ফর্ম টেমপ্লেট</span>
          </Button>
        </div>
        
        <h2 className="text-xl font-serif font-bold text-court mb-4">
          সাম্প্রতিক কার্যক্রম
        </h2>
        
        <div className="record-card divide-y">
          {[1, 2, 3, 4, 5].map(item => (
            <div key={item} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">গ্রাহক #{item}</p>
                <p className="text-sm text-gray-500">আফিডাভিট প্রিন্টিং</p>
              </div>
              <div className="text-right">
                <p className="font-medium">৳ 120</p>
                <p className="text-xs text-gray-500">১০ মিনিট আগে</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
