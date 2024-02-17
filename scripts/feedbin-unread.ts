// Name: Feedbin Unread
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

const feedbinUsername = await env('FEEDBIN_USERNAME', {
  placeholder: 'Feedbin Username',
});
const feedbinPassword = await env('FEEDBIN_PASSWORD', {
  secret: true,
  placeholder: 'Feedbin Password',
});

const headers = {
  Authorization: `Basic ${btoa(`${feedbinUsername}:${feedbinPassword}`)}`,
};

type Entries = EntriesItem[];
interface EntriesItem {
  author: null;
  content: string;
  created_at: string;
  extracted_content_url: string;
  feed_id: number;
  id: number;
  published: string;
  summary: string;
  title: string;
  url: string;
}

const selection = await arg<EntriesItem>('Article Title', async () =>
  get<Entries>(`https://api.feedbin.com/v2/entries.json?read=false`, {
    headers,
  }).then(({ data }) =>
    data.map((item: any) => ({
      name: item.title,
      description: item.url,
      value: item,
    })),
  ),
);

open(selection.url);
await post(
  `https://api.feedbin.com/v2/unread_entries/delete.json`,
  { unread_entries: [selection.id] },
  { headers },
);
