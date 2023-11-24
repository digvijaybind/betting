import { useCallback, useEffect, useState } from 'react';

const useGetRemaingTimeString = (start_at: number) => {
  const [time, setTime] = useState('');
  const designDate = useCallback(
    (time: number) => {
      let dateInMillis = time * 1000;
      const date1 = new Date();
      const date2 = new Date(dateInMillis);

      if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
      }

      const diff = date2 - date1;

      let msec = diff;
      let hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      let mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      let ss = Math.floor(msec / 1000);
      msec -= ss * 1000;
      let days = Math.floor(hh / 24);
      if (hh < 1) {
        return `${mm}m ${ss}s`;
      }

      if (hh < 2) {
        return `${hh}h ${mm}m ${ss}s`;
      }

      if (hh < 24) {
        return `${hh}h ${mm}m`;
      }

      if (hh < 48) {
        return `${hh}h`;
      }

      if (days < 7) {
        hh = hh - days * 24;
        return `${days}d ${hh}h`;
      }

      return `${hh}:${mm}:${ss}`;
    },
    [time],
  );

  useEffect(() => {
    setInterval(() => {
      setTime(designDate(start_at));
    }, 1000);
  }, []);

  return time;
};

export default useGetRemaingTimeString;
