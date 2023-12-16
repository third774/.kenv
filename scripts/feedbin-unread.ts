// Name: Feedbin Unread
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

const feedbinUsername = await env('FEEDBIN_USERNAME');
const feedbinPassword = await env('FEEDBIN_PASSWORD', () =>
  arg({
    placeholder: 'Feedbin Password',
    secret: true,
  }),
);
const options = {
  headers: {
    Authorization: `Basic ${btoa(`${feedbinUsername}:${feedbinPassword}`)}`,
  },
};

const { data } = await get(
  `https://api.feedbin.com/v2/entries.json?read=false`,
  options,
);

const selection = await arg<any>(
  data.length > 0 ? 'Article Title' : 'No unread articles',
  data.map((item: any) => ({
    name: item.title,
    description: item.url,
    value: item,
  })),
);

await open(selection.url);
await post(
  `https://api.feedbin.com/v2/unread_entries/delete.json`,
  { unread_entries: [selection.id] },
  options,
);
