
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { LogIn } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="h-10 w-10 rounded-md bg-court text-white flex items-center justify-center mr-2">
            <span className="font-serif font-bold text-lg">RL</span>
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-court">
            রেকর্ড ল্যাবস
            <span className="text-xs text-court-accent block">RecordLabs</span>
          </h1>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-1 border-court text-court hover:text-court hover:bg-court-light"
          onClick={() => navigate('/login')}
        >
          <LogIn size={16} />
          <span>লগইন</span>
        </Button>
      </div>
    </header>
  );
}
