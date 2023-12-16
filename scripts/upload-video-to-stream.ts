// Name: Upload Video to Stream

import '@johnlindquist/kit';

let filePath = await selectFile('Select a video file');

const fileName = filePath.split('/').pop();

const streamAccountId = await env('STREAM_ACCOUNT_ID');
const streamApiToken = await env('STREAM_API_TOKEN', () =>
  arg({
    placeholder: 'Stream API Token',
    secret: true,
  }),
);

// convert to fetch request with form data

const formData = new FormData();

// Read the file into a Buffer
const fileBuffer = await readFile(filePath);

// convert to blob
const blob = new Blob([fileBuffer], { type: 'video/mp4' });

// Append the buffer to the FormData
formData.append('file', blob, fileName);

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${streamAccountId}/stream`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${streamApiToken}`,
    },
    body: formData,
  },
);

const json = await response.json();

open(
  `https://dash.cloudflare.com/${streamAccountId}/stream/videos/${json.result.uid}`,
);
