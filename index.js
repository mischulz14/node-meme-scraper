// https://memegen-link-examples-upleveled.netlify.app/
import fs from 'fs';
import Path, { dirname } from 'path';
import https from 'https';
import { load } from 'cheerio';
import axios from 'axios';
import { type } from 'os';

const urlArray = [];
let firstTenMemes = [];
let counter = 1;

// put the url into axios
axios('https://memegen-link-examples-upleveled.netlify.app/')
  .then((response) => {
    // this is how you get the data:
    const html = response.data;
    // console.log(html);

    // this is how you can scrape stuff with cheerio:
    const getStuffWithCheerio = load(html);
    // select the element with cheerio
    getStuffWithCheerio('img', html).each(function () {
      // getting the src attribute with cheerio
      const urlIAmLookingFor = getStuffWithCheerio(this).attr('src');
      urlArray.push(urlIAmLookingFor);
    });

    // getting the first ten memes
    firstTenMemes = urlArray.slice(0, 10);
    firstTenMemes.forEach((meme) => {
      saveImgToFolder(meme, `./memes/0${counter}.jpg`);
      counter++;
    });
  })
  .catch((error) => console.log(error));

function saveImgToFolder(url, path) {
  const localPath = fs.createWriteStream(path);

  const request = https.get(url, function (response) {
    response.pipe(localPath);
  });
}
