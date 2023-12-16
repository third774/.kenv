// Name: New Astro Blog Post

import '@johnlindquist/kit';

const astroBlogProjectPath = await env('ASTRO_BLOG_PROJECT_PATH', () =>
  path({
    onlyDirs: true,
  }),
);

const blogCollectionPath = await env('ASTRO_BLOG_COLLECTION_PATH', () =>
  path({
    startPath: astroBlogProjectPath,
    onlyDirs: true,
  }),
);

const title = await arg('Title');
const description = await arg("What's the description of the post?");
const slug = title
  .toLowerCase()
  .split(' ')
  .join('-')
  .replace(/[^a-z0-9-]/g, '');

const content = `---
{
  "title": "${title}",${
    description ? `\n  "description": "${description}",` : ''
  }
  "published": "${new Date().toISOString()}"
}
---

`;

const filePath = `${blogCollectionPath}/${slug}.md`;
const editedContent = await editor(content);

await writeFile(filePath, editedContent);
await exec(`/opt/homebrew/bin/code ${astroBlogProjectPath}`);
await exec(`/opt/homebrew/bin/code ${filePath}`);
