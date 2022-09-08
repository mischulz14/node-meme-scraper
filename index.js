import fs from 'node:fs';
import https from 'node:https';
import axios from 'axios';
import { load } from 'cheerio';

const urlArray = [];
let firstTenMemes = [];
let counter = 1;

/**
 * It takes a URL and a path, and downloads the image at the URL to the path
 * @param url - The URL of the image you want to download.
 * @param path - The path to the folder where you want to save the image.
 */
function saveImgToFolder(url, path) {
  const localPath = fs.createWriteStream(path);

  https.get(url, function (response) {
    response.pipe(localPath);
    console.log('success');
  });

  // download(url, path).then(console.log('success')); --> alternative!
}

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

    // downloading each meme, giving it the right name and put them into the right folder
    firstTenMemes.forEach((meme) => {
      saveImgToFolder(meme, `./memes/0${counter}.jpg`);
      counter++;
    });
  })
  .catch((error) => console.log(error));
