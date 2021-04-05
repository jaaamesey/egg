import React from 'react';
import '@material/ripple/dist/mdc.ripple.min.css';
import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import { FaUtensilSpoon as SpoonIcon } from 'react-icons/fa';
import { IoMdEgg as EggIcon, IoMdBrush as BrushIcon } from 'react-icons/io';
import classNames from 'classnames';

const BottomMenuButton = ({
  children,
  label,
  active,
  onClick,
  className,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  const activeColor = 'rgba(22, 80, 167, 0.8)';
  const activeStyle = {
    color: activeColor,
    ['--mdc-ripple-color' as any]: activeColor,
  };

  return (
    <li
      className={classNames(
        'h-full w-full flex flex-col justify-center transition-colors duration-50',
        className,
        'mdc-ripple-surface',
      )}
      ref={(el) => el && MDCRipple.attachTo(el)}
      onClick={onClick}
      style={active ? activeStyle : undefined}
    >
      <div
        className="transition-transform duration-300"
        style={{
          height: 42,
          paddingBottom: 1,
          transform: `scale(${active ? 1.2 : 1})`,
        }}
      >
        {children}
      </div>
      <div
        className="transition-transform duration-300"
        style={{ paddingTop: 6, transform: `scale(${active ? 1.1 : 1})` }}
      >
        {label}
      </div>
    </li>
  );
};

export const BottomMenu = () => {
  const [active, setActive] = React.useState(1);
  const buttons = [
    {
      label: 'spoon',
      children: <SpoonIcon style={{ width: '100%', height: '100%', transform: 'scale(0.8)' }} />,
    },
    {
      label: 'egg',
      children: <EggIcon style={{ width: '100%', height: '100%' }} />,
    },
    {
      label: 'paint',
      children: (
        <BrushIcon
          style={{ width: '100%', height: '100%', transform: 'rotate(90deg) scale(0.9)' }}
        />
      ),
    },
  ];
  return (
    <ul
      className="glass-pane rounded-t-xl flex justify-between items-center overflow-hidden"
      style={{ height: 100, fontSize: 16, textAlign: 'center' }}
    >
      {buttons.map(({ label, children }, index) => (
        <BottomMenuButton
          className={classNames(
            index !== 0 && 'rounded-l-lg',
            index !== buttons.length - 1 && 'rounded-r-lg',
          )}
          label={label}
          key={label}
          active={index === active}
          onClick={() => setActive(index)}
        >
          {children}
        </BottomMenuButton>
      ))}
    </ul>
  );
};
