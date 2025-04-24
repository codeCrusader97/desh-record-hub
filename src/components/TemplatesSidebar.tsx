
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { TemplateGroup } from '@/types/template';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface TemplatesSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectTemplate: (templateId: string) => void;
  templates: TemplateGroup[];
}

export default function TemplatesSidebar({ 
  isOpen, 
  onToggle, 
  onSelectTemplate,
  templates 
}: TemplatesSidebarProps) {
  return (
    <div className={`
      bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden
      ${isOpen ? 'w-full md:w-64' : 'w-full md:w-12'}
    `}>
      <Collapsible
        open={isOpen}
        onOpenChange={onToggle}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-4"
          >
            <span className={isOpen ? 'block' : 'hidden md:hidden'}>
              টেমপ্লেট সমূহ
            </span>
            <FileText className="h-5 w-5" />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="p-2">
          {templates.map((group, index) => (
            <div key={index} className="mb-4">
              <h3 className="px-2 mb-2 text-sm font-medium text-gray-500">
                {group.title}
              </h3>
              {group.templates.map((template) => (
                <Button
                  key={template.id}
                  variant="ghost"
                  className="w-full justify-start text-left mb-1 h-auto py-3"
                  onClick={() => onSelectTemplate(template.id)}
                >
                  <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{template.title}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
