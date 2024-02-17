// Name: Random MDN Article
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';
import xml2js from 'xml2js';

export interface Env {}

interface Sitemap {
  urlset: Urlset;
}
interface Urlset {
  $: $;
  url: UrlItem[];
}
interface $ {
  xmlns: string;
}
interface UrlItem {
  loc: string[];
  lastmod: string[];
}

// parse xml sitemap
const sitemapString = await fetch(
  'https://developer.mozilla.org/sitemaps/en-us/sitemap.xml.gz',
).then((res) => res.text());

const parsed: Sitemap = await xml2js.parseStringPromise(sitemapString);

// pick a random url
const [randomUrl] =
  parsed.urlset.url[Math.floor(Math.random() * parsed.urlset.url.length)].loc;

open(randomUrl);
