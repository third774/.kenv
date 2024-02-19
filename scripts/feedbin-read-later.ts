// Name: Feedbin Read Later
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

const feedbinUsername = await env('FEEDBIN_USERNAME');
const feedbinPassword = await env('FEEDBIN_PASSWORD', { secret: true });
const Authorization = `Basic ${btoa(`${feedbinUsername}:${feedbinPassword}`)}`;
const headers = { Authorization };

const url = await getSelectedText();

if (URL.canParse(url)) {
  await post(`https://api.feedbin.com/v2/pages.json`, { url }, { headers });
  await notify('Successfully added to Read Later.');
} else {
  await notify('Invalid URL!');
}
