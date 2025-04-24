
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface TemplatesSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectTemplate: (templateId: string) => void;
}

const templates = [
  { id: 'bail', name: 'জামিনের আবেদন' },
  { id: 'rent', name: 'ভাড়ার চুক্তিপত্র' },
  { id: 'affidavit', name: 'হলফনামা' },
  { id: 'power-of-attorney', name: 'পাওয়ার অফ অ্যাটর্নি' },
  { id: 'legal-notice', name: 'লিগ্যাল নোটিশ' },
];

export default function TemplatesSidebar({ isOpen, onToggle, onSelectTemplate }: TemplatesSidebarProps) {
  return (
    <div className={`
      bg-white rounded-lg shadow-md transition-all duration-300
      ${isOpen ? 'w-full md:w-64' : 'w-full md:w-12'}
    `}>
      <div className="p-4 border-b">
        <Button 
          variant="ghost" 
          className="w-full justify-between"
          onClick={onToggle}
        >
          <span className={isOpen ? 'block' : 'hidden md:block'}>
            টেমপ্লেট সমূহ
          </span>
          <FileText className="h-5 w-5" />
        </Button>
      </div>

      {isOpen && (
        <div className="p-2">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant="ghost"
              className="w-full justify-start text-left mb-1 h-auto py-3"
              onClick={() => onSelectTemplate(template.id)}
            >
              <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{template.name}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
