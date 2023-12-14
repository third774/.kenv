// Name: New Astro Blog Post

import "@johnlindquist/kit";

const title = await arg("What's the title of the post?");
const description = await arg("What's the description of the post?");
const slug = title.toLowerCase().split(" ").join("-");

const blogCollectionPath = await env("ASTRO_BLOG_COLLECTION_PATH");

const content = `---
title: ${title}${description ? `\ndescription: ${description}` : ""}
published: ${new Date().toISOString()}
---
`;

const filePath = `${blogCollectionPath}/${slug}.md`;

const editedContent = await editor(content);

await writeFile(filePath, editedContent);

await exec(`/opt/homebrew/bin/code ${filePath}`);
