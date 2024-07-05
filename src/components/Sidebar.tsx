import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  onChangeSideBar: (title: string) => void,
};

const Sidebar: React.FC<Props> = ({ onChangeSideBar }) => {
  const location = useLocation();
  const [linkSelected, setLinkSelected] = useState('');

  useEffect(() => {
    // Update the selected link based on the current location
    const pathToTitleMap: { [key: string]: string } = {
      '/': 'Accueil',
      '/tasks': 'Tâches',
      '/about': 'A propos'
    };
    const currentTitle = pathToTitleMap[location.pathname];
    if (currentTitle) {
      setLinkSelected(currentTitle);
      onChangeSideBar(currentTitle);
    }
  }, [location, onChangeSideBar]);

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">
          <img
            src="./images/logo.png"
            width="22"
            height="70"
            alt="image logo"
          />
        </h2>
        <ul className="mt-4">
          <li>
            <Link to="/" className={location.pathname === "/" ? "linkSelected" : ""} onClick={() => onChangeSideBar('Accueil')}>Accueil</Link>
          </li>
          <li>
            <Link to="/tasks" className={location.pathname === "/tasks" ? "linkSelected" : ""} onClick={() => onChangeSideBar('Tâches')}>Tâches</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "linkSelected" : ""} onClick={() => onChangeSideBar('A propos')}>A propos</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
