import React from 'react';
import { FaUtensilSpoon as SpoonIcon } from 'react-icons/fa';
import { IoMdEgg as EggIcon, IoMdBrush as BrushIcon } from 'react-icons/io';

export const BottomMenu = () => {
  return (
    <ul
      className="glass-pane rounded-t-xl flex justify-around items-center"
      style={{ height: 100, padding: '0 16px', fontSize: 16, textAlign: 'center' }}
    >
      <li>
        <div style={{ height: 40 }}>
          <SpoonIcon
            style={{ width: '100%', height: '100%', transform: 'rotate(-0deg) scale(0.8)' }}
          />
        </div>
        <div style={{ paddingTop: 4 }}>spoon</div>
      </li>
      <li style={{ color: 'rgba(22, 80, 167, 0.8)', transform: 'scale(1.1)' }}>
        <div style={{ height: 40 }}>
          <EggIcon style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ paddingTop: 4 }}>egg</div>
      </li>
      <li>
        <div style={{ height: 40 }}>
          <BrushIcon
            style={{ width: '100%', height: '100%', transform: 'rotate(90deg) scale(0.9)' }}
          />
        </div>
        <div style={{ paddingTop: 4 }}>paint</div>{' '}
      </li>
    </ul>
  );
};
