const endDay = '23:59:59';
const startDay = '00:00:00';

export const checkTimeInRange = ({ start, end }, time) => {
  if (start < end) {
    return time > start && time < end;
  }

  return (time > start && time <= endDay) || (time >= startDay && time < end);
};
