// Name: Perplexity
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

const q = await arg('Ask a question');
const focus = await arg({
  placeholder: 'Focus',
  hint: 'Select sources to search from',
  choices: [
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'Academic',
      value: 'scholar',
    },
    {
      name: 'Writing',
      value: 'writing',
    },
    {
      name: 'Wolfram Alpha',
      value: 'wolfram',
    },
    {
      name: 'YouTube',
      value: 'youtube',
    },
    {
      name: 'Reddit',
      value: 'reddit',
    },
  ],
});
const copilot = 'true';

const params = new URLSearchParams({ q, focus, copilot });

open(`https://perplexity.ai/?${params}`);
