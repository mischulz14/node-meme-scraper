// https://memegen-link-examples-upleveled.netlify.app/
import fs from 'fs';
import Path, { dirname } from 'path';
import http from 'http';
import { load } from 'cheerio';
import axios from 'axios';
import { count } from 'console';
import path from 'path';

const path = Path.resolve(__dirname, 'memes');
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
  })
  .catch((error) => console.log(error));

async function download() {}

// function downloadFile(imgUrl) {
//   const file = fs.createWriteStream(`0${counter}.jpg`);
//   console.log(file);
//   http
//     .get(imgUrl, function (response) {
//       response.pipe(file);

//       // after download completed close filestream
//       file.on('finish', () => {
//         file.close();
//         console.log('Download Completed');
//       });
//     })
//     .on('error', (err) => console.log(err));
// }

// firstTenMemes.forEach((meme) => {
//   downloadFile(meme);
//   counter++;
// });

// Connect to the URL and request / fetch the HTML contents of the website from the URL
// Save this to a string
// Find the src of the images and store the image URLs in an array of strings
// Extract the first 10 from the array of image URLs
// For each image in the 10 image array:
// Fetch image data (string) from the image URL
// Create a file named with a leading zero, a number starting with 1, and a .jpg extension
// Write the image data to that file
// Create a directory named memes
// Create a .gitignore file and add the memes directory
// Check to make sure that the program can run multiple times without showing an error message
