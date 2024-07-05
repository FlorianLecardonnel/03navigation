import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto text-white">
        {title}
      </div>
    </header>
  );
}

export default Header;
