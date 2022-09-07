// https://memegen-link-examples-upleveled.netlify.app/

const PORT = 8000;
import express from 'express';
import { load } from 'cheerio';
import axios from 'axios';

//start server with express
const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// put the url into axios
axios('https://www.internetingishard.com/html-and-css/advanced-positioning/')
  .then((response) => {
    // this is how you get the data:
    const html = response.data;
    // console.log(html);

    // this is how you can scrape stuff with cheerio:
    const getStuffWithCheerio = load(html);
    // select the element id or class with cheerio
    getStuffWithCheerio('.main-nav__name', html).each(function () {
      const text = getStuffWithCheerio(this).text();
      const urlIAmLookingFor = getStuffWithCheerio(this).attr('href');

      console.log(text);
      console.log(urlIAmLookingFor);
    });
  })
  .catch((error) => console.log(error));

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
