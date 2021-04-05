import React from 'react';
import ARIcon from '../icons/ar';
import { IoMdSettings } from 'react-icons/io';

const getHoursAndMinutes = (date: Date) => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
});

const initialTime = getHoursAndMinutes(new Date());

export const TopMenu = () => {
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
      className="glass-pane rounded-b-xl flex justify-between items-center"
      style={{ height: 50, padding: '0 16px', fontSize: 20 }}
    >
      <div>
        <ARIcon fill="black" fillOpacity={0.5} />
      </div>
      <div>
        {hours === 0 || hours === 12 ? 12 : hours % 12}
        <span>:</span>
        {minutes < 10 && 0}
        {minutes}
        {ampm}
      </div>
      <div>
        <IoMdSettings fill="black" fillOpacity={0.5} size={25} />
      </div>
    </div>
  );
};
