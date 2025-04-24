
import React from 'react';

interface DashboardStatProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
}

export default function DashboardStat({ title, value, subtitle, icon }: DashboardStatProps) {
  return (
    <div className="record-card">
      <div className="flex items-center">
        <div className="mr-4 p-3 rounded-md bg-court-light text-court">
          {icon}
        </div>
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-court">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
