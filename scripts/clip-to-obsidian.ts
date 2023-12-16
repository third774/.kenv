// Name: Clip to Obsidian
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

let js = `
  document.body.innerText
`;

let result = await applescript(`
tell application "Arc" to tell window 1
  get execute active tab javascript "

  ${js}

"
end tell
`);

console.log({ result });
