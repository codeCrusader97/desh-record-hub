
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-court text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} রেকর্ড ল্যাবস | সর্বস্বত্ব সংরক্ষিত</p>
        <p className="mt-1 text-xs opacity-75">বাংলাদেশ আইনি দলিল প্রক্রিয়াকরণ সমাধান</p>
      </div>
    </footer>
  );
}
