// Name: New Astro Blog Post

import '@johnlindquist/kit';

const title = await arg("What's the title of the post?");
const description = await arg("What's the description of the post?");
const slug = title.toLowerCase().split(' ').join('-');

const astroBlogProjectPath = await env('ASTRO_BLOG_PROJECT_PATH');
const blogCollectionPath = await env(
  'ASTRO_BLOG_COLLECTION_PATH',
  async () => 'src/content/blog',
);

const content = `---
{
  "title": "${title}",${
    description ? `\n  "description": "${description}",` : ''
  }
  "published": "${new Date().toISOString()}"
}
---

`;

const filePath = `${astroBlogProjectPath}/${blogCollectionPath}/${slug}.md`;
const editedContent = await editor(content);

console.log({
  filePath,
  astroBlogProjectPath,
  blogCollectionPath,
});

await writeFile(filePath, editedContent);
await exec(`/opt/homebrew/bin/code ${astroBlogProjectPath}`);
await exec(`/opt/homebrew/bin/code ${filePath}`);
