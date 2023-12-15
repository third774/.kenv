// Name: Markdown Link
// Author: Kevin Kipp
// Twitter: @kevin_kipp
// Github: https://github.com/third774

import "@johnlindquist/kit";

const url = await arg("URL");
const selectedText = await getSelectedText();

await setSelectedText(`[${selectedText}](${url})`);
