// Name: useState
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

const name = await arg('Name of the state?');
const initialValue = await arg('Initial value?');

const snippet = `const [${name}, set${name[0].toUpperCase()}${name.slice(
  1,
)}] = useState(${initialValue});`;

await setSelectedText(snippet);
