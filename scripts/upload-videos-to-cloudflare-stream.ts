// Name: Upload Videos to Cloudflare Stream
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';
import { Channel } from '@johnlindquist/kit/core/enum';
import { createReadStream } from 'fs';
const tus = await npm('tus-js-client');
const stringify = await npm('safe-stable-stringify');

type Files = FilesItem[];
interface FilesItem {
  name: string;
  path: string;
  lastModified: number;
  lastModifiedDate: string;
  webkitRelativePath: string;
  size: number;
  type: string;
  progress?: number;
  dashboardUrl?: string;
}

let files: Files = await drop('Drop videos here');

const streamAccountId = await env('STREAM_ACCOUNT_ID');
const streamApiToken = await env('STREAM_API_TOKEN', {
  placeholder: 'Stream API Token',
  secret: true,
});

const w = await widget(
  `
  <div class="p-8 min-w-max">
    <h1>Uploading to Cloudflare Stream...</h1>
    <ul>
      <li v-for="file in files">
        <a v-if="file.dashboardUrl" class="no-drag" :href="file.dashboardUrl">{{ file.name }}:</a>
        <span v-else>{{ file.name }}:</span>
        {{ file.progress ? file.progress.toFixed(2) : 0 }}%
      </li>
    </ul>
  </div>
`,
  {
    alwaysOnTop: true,
    state: {
      files,
    },
  },
);

// for each file, upload with tus
files.forEach(async ({ name, path, size }) => {
  const file = createReadStream(path);
  let mediaId = '';

  const options = {
    endpoint: `https://api.cloudflare.com/client/v4/accounts/${streamAccountId}/stream`,
    headers: {
      Authorization: `Bearer ${streamApiToken}`,
    },
    chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
    retryDelays: [0, 3000, 5000, 10000, 20000], // Indicates to tus-js-client the delays after which it will retry if the upload fails
    metadata: {
      name,
      filetype: 'video/mp4',
    },
    uploadSize: size,
    onError: async function (error) {
      global.send(Channel.CONSOLE_ERROR, stringify(error));
      throw error;
    },
    onProgress: function (bytesUploaded, bytesTotal) {
      var percentage = (bytesUploaded / bytesTotal) * 100;
      files = files.map((f) =>
        f.path === file.path ? { ...f, progress: percentage } : f,
      );
      w.setState({
        files,
      });
    },
    onSuccess: function () {
      console.log('Upload finished: ', name);
      files = files.map((f) =>
        f.path === file.path ? { ...f, progress: 100 } : f,
      );
      w.setState({
        files,
      });
      if (files.every((f) => f.progress === 100)) {
        notify('All uploads finished');
      } else {
        notify(`Upload finished: ${name}`);
      }
    },
    onAfterResponse: function (req, res) {
      return new Promise<void>((resolve) => {
        var mediaIdHeader = res.getHeader('stream-media-id');
        if (mediaIdHeader && !mediaId) {
          mediaId = mediaIdHeader;
          files = files.map((f) =>
            f.path === file.path
              ? {
                  ...f,
                  dashboardUrl: `https://dash.cloudflare.com/${streamAccountId}/stream/videos/${mediaId}`,
                }
              : f,
          );
          console.log('setting state with updated files', files);
          w.setState({
            files,
          });
        }
        resolve();
      });
    },
  };

  const upload = new tus.Upload(file, options);
  console.log('starting upload', name);
  upload.start();
});
