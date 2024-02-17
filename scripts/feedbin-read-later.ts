// Name: Feedbin Read Later
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774
// Shortcut: cmd+shift+opt+ctrl+l

import '@johnlindquist/kit';

const feedbinUsername = await env('FEEDBIN_USERNAME');
const feedbinPassword = await env('FEEDBIN_PASSWORD', () =>
  arg({
    placeholder: 'Feedbin Password',
    secret: true,
  }),
);

const url = await getSelectedText();

await post(
  `https://api.feedbin.com/v2/pages.json`,
  { url },
  {
    headers: {
      Authorization: `Basic ${btoa(`${feedbinUsername}:${feedbinPassword}`)}`,
    },
  },
);
await toast('Saved to Read Later');
