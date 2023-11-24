// Time
export function getTime(time: number) {
  return `${new Date(time).toLocaleTimeString('en-US', {
    timeStyle: 'short',
  })}`;
}

// get Date
export function getDate(time: number) {
  return `${new Date(time).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  })}`;
}

// get TimeZone
export function getTimeZone(time: number) {
  return `${(/\((.*)\)/.exec(new Date(time).toString()) || 'GMT')[1]
    .split(' ')
    .map(i => i[0].toUpperCase())
    .join('')}`;
}

// get Date and Time
export function getDateTime(time: number) {
  return `${getDate(time)} ${getTime(time)} ${getTimeZone(time)}`;
}

// get Day
export function getDay(time: number) {
  const no_date = new Date(time).getDate();
  const today = new Date().getDate();
  const yesterday = new Date().getDate() - 1;
  const tomorrow = new Date().getDate() + 1;
  if (no_date === today) {
    return 'Today';
  }
  if (no_date === yesterday) {
    return 'Yesterday';
  }
  if (no_date === tomorrow) {
    return 'Tomorrow';
  }
  return getDate(time);
}

export function getTimeRemaing(time: number) {
  const timeDiff = Date.now() - time;
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
  return `${hours !== 0 ? `${hours}h` : ''} ${
    minutes !== 0 ? `${minutes}m` : ''
  }`;
}
