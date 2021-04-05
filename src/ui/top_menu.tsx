import React from 'react';
import ARIcon from '../icons/ar';
import { IoMdSettings } from 'react-icons/io';
import { IconButton } from './base/icon_button';

const getHoursAndMinutes = (date: Date) => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
});

const initialTime = getHoursAndMinutes(new Date());

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
        onClick={() => alert('NOT YET IMPLEMENTED')}
      />
    </div>
  );
};
