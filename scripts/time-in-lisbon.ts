// Name: Time in Lisbon
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

const timeInLisbon = (date: Date) => {
  // format time in US locale but with timezone set to Lisbon
  return date.toLocaleTimeString('en-US', {
    timeZone: 'Europe/Lisbon',
    hour12: false,
  });
};

const w = await widget(
  `<h1 class="min-w-max p-8 tabular-nums">Lisbon: {{time}}</h1>`,
  {
    state: {
      time: timeInLisbon(new Date()),
    },
    alwaysOnTop: true,
  },
);

setInterval(() => {
  w.setState({
    time: timeInLisbon(new Date()),
  });
}, 1000);
