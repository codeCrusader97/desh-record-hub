
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

export default function ServiceCard({ 
  icon, 
  title, 
  description, 
  onClick,
  className
}: ServiceCardProps) {
  return (
    <div 
      className={cn(
        "record-card cursor-pointer flex flex-col items-center p-6 md:p-8",
        className
      )}
      onClick={onClick}
    >
      <div className="text-court-accent mb-4 text-4xl">
        {icon}
      </div>
      <h3 className="font-serif text-xl md:text-2xl font-semibold mb-2 text-court">
        {title}
      </h3>
      <p className="text-center text-gray-600">
        {description}
      </p>
    </div>
  );
}
