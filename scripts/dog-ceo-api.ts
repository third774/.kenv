// Name: Dog CEO API

import '@johnlindquist/kit';

export interface BreedApi {
  message: Record<string, string[]>;
  status: string;
}

const breeds = await fetch('https://dog.ceo/api/breeds/list/all').then((res) =>
  res.json(),
);

const breed = await arg(
  'What breed of dog do you want?',
  Object.keys(breeds.message).flatMap((breed) =>
    [].concat(
      breed,
      breeds.message[breed].map((sub) => ({
        name: `${sub} ${breed}`,
        value: `${breed}/${sub}`,
      })),
    ),
  ),
);

const images = await fetch(`https://dog.ceo/api/breed/${breed}/images`).then(
  (res) => res.json(),
);

// pick random image
const image = images.message[Math.floor(Math.random() * images.message.length)];

// show image
await div(`
  <h1>${breed}</h1>
  <img class="w-full" src="${image}" />
`);
