// Name: Message
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';
// @ts-expect-error
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// open the user's contacts sqlite database
const db = await open({
  filename: home(
    'Library',
    'Application Support',
    'AddressBook',
    'AddressBook-v22.abcddb',
  ),
  driver: sqlite3.Database,
});

const contacts = await db.all(
  `SELECT ZFIRSTNAME, ZLASTNAME, ZORGANIZATION, ZPHONE, ZEMAIL, ZADDRESSSTREET, ZADDRESSCITY, ZADDRESSSTATE, ZADDRESSZIP, ZADDRESSCOUNTRY`,
);

console.log(contacts);
