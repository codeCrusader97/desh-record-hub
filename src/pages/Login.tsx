
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a placeholder for actual authentication
    // In a real application, you would integrate with Supabase/Firebase
    if (credentials.username === 'admin' && credentials.password === 'password') {
      toast({
        title: "লগইন সফল",
        description: "আপনি সফলভাবে লগইন করেছেন",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "লগইন ব্যর্থ",
        description: "ভুল ইউজারনেম অথবা পাসওয়ার্ড",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-court mb-6 text-center">
          অ্যাডমিন লগইন
        </h1>
        
        <div className="record-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">ইউজারনেম</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="আপনার ইউজারনেম"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="আপনার পাসওয়ার্ড"
                required
              />
            </div>
            
            <Button type="submit" className="w-full primary-button">
              লগইন
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              ইউজারনেম: admin, পাসওয়ার্ড: password
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
