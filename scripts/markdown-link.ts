// Name: Markdown Link

import "@johnlindquist/kit";

const url = await arg("URL");
const selectedText = await getSelectedText();

await setSelectedText(`[${selectedText}](${url})`);
