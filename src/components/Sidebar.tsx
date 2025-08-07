
import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useContactSidebar } from './ContactSidebar';

const Sidebar = () => {
  const { open } = useContactSidebar();
  const [isHidden, setIsHidden] = useState(false);

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="fixed top-60 left-0 z-50 flex flex-col items-center" style={{ height: 250 }}>
      <div className="w-12 h-9 bg-black rounded-tr-xl flex items-center justify-center">
        <span 
          className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform"
          onClick={toggleSidebar}
        >
          {isHidden ? '→' : '←'}
        </span>
      </div>

      <div
        className={`w-12 flex-1 bg-purple-600 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 ${
          isHidden ? '-translate-x-12' : 'translate-x-0'
        }`}
        onClick={open}
      >
        <span
          className="text-white font-bold text-sm"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Contact Us
        </span>
        <Mail className="text-white mt-2" style={{ transform: "rotate(90deg)" }} />
      </div>

      <div className={`w-12 h-12 bg-green-400 rounded-br-xl flex items-center justify-center cursor-pointer transition-transform duration-300 ${
        isHidden ? '-translate-x-12' : 'translate-x-0'
      }`}>
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;
