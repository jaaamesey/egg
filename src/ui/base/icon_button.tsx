import '@material/ripple/dist/mdc.ripple.min.css';
import { MDCRipple } from '@material/ripple/component';
import React from 'react';

const activeColor = 'rgba(22, 80, 167, 0.8)';

export const IconButton = ({
  Icon,
  active,
  onClick,
  size,
}: {
  Icon: (props: { fill: string; fillOpacity: number; size?: number }) => React.ReactElement;
  active?: boolean;
  onClick?: () => void;
  size?: number;
}) => {
  const activeStyle = {
    color: activeColor,
    ['--mdc-ripple-color' as any]: activeColor,
  };

  return (
    <div
      className="flex flex-col justify-center px-3 h-full rounded-md transition-colors duration-50 mdc-ripple-surface"
      ref={(el) => el && MDCRipple.attachTo(el, { isUnbounded: false })}
      onClick={onClick}
      style={active ? activeStyle : undefined}
    >
      <Icon fill={active ? activeColor : 'black'} fillOpacity={active ? 1 : 0.5} size={size} />
    </div>
  );
};
