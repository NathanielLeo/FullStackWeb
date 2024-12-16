import React from 'react';
import messengerIcon from './images/message_icon.png'; 
import zaloIcon from './images/zalo_icon.png'; 

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 space-y-3">
      <div className="bg-blue-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow">
        <img src={messengerIcon} alt="Messenger" className="w-8 h-8" />
      </div>
      <div className="bg-blue-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow">
        <img src={zaloIcon} alt="Zalo" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default FloatingButtons;
