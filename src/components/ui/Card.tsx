import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}
export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover ?
  'hover:shadow-depth-lg hover:-translate-y-2 cursor-pointer' :
  '';
  return (
    <div
      className={`bg-white rounded-2xl shadow-depth p-6 transition-all duration-300 ${hoverStyles} ${className}`}
      style={{
        backgroundImage:
        'linear-gradient(to bottom right, rgba(255,255,255,1), rgba(247,247,247,1))'
      }}>

      {children}
    </div>);

}