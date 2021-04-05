import React from 'react';
import ARIcon from '../icons/ar';
import { IoMdSettings } from 'react-icons/io';
import { MDCRipple } from '@material/ripple';

const getHoursAndMinutes = (date: Date) => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
});

const initialTime = getHoursAndMinutes(new Date());

const activeColor = 'rgba(22, 80, 167, 0.8)';

const IconButton = ({
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

export const TopMenu = ({ ar, onARClicked }: { ar: boolean; onARClicked: () => void }) => {
  const [hours, setHours] = React.useState(initialTime.hours);
  const [minutes, setMinutes] = React.useState(initialTime.minutes);
  const ampm = hours >= 12 ? 'pm' : 'am';
  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = getHoursAndMinutes(new Date());
      setHours(currentTime.hours);
      setMinutes(currentTime.minutes);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="glass-pane rounded-b-xl flex justify-between items-center overflow-hidden"
      style={{ height: 50, fontSize: 20 }}
    >
      <IconButton Icon={ARIcon} active={ar} onClick={onARClicked} />
      <div>
        {hours === 0 || hours === 12 ? 12 : hours % 12}
        <span className="animate-pulse">:</span>
        {minutes < 10 && 0}
        {minutes}
        {ampm}
      </div>
      <IconButton
        Icon={IoMdSettings}
        size={25}
        active={false}
        onClick={() => console.log('NOT YET IMPLEMENTED')}
      />
    </div>
  );
};
