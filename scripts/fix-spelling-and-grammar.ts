// Name: Fix Spelling and Grammar
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: await env('OPENAI_API_KEY', {
    secret: true,
  }),
});

const text = await getSelectedText();

const completion = await openai.chat.completions.create({
  messages: [
    {
      role: 'user',
      content: `You are an editor and you are tasked with fixing the spelling and grammar of the following text:
---
Text to fix:
${text}
---

The corrected text is:`,
    },
  ],
  model: 'gpt-3.5-turbo',
  temperature: 0,
});

const insertText = await editor(completion.choices[0].message.content);

await setSelectedText(insertText);
