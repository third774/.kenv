// Name: Time in Berlin
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

const timeInBerlin = (date: Date) => {
  // format time in US locale but with timezone set to Berlin
  return date.toLocaleTimeString('en-US', {
    timeZone: 'Europe/Berlin',
    hour12: false,
  });
};

const w = await widget(
  `<h1 class="min-w-max p-8 tabular-nums">Berlin: {{time}}</h1>`,
  {
    state: {
      time: timeInBerlin(new Date()),
    },
  },
);

setInterval(() => {
  w.setState({
    time: timeInBerlin(new Date()),
  });
}, 1000);
