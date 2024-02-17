// Name: Google
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

let q = await getSelectedText();

open(`https://www.google.com/search?${new URLSearchParams({ q })}`);
