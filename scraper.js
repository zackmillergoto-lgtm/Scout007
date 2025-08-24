// How to run this script:
// 1. Make sure you have Node.js installed.
// 2. Run `npm install && node scraper.js` in the same directory as this script.
// 3. The script will then print the scraped data.
// NOTE: The originally requested sections "Demos" and "Starters & Frameworks" could not be found.
// This script has been adapted to scrape the "Tutorials" and "Books" sections instead as a demonstration.

const axios = require('axios');
const cheerio = require('cheerio');
const showdown = require('showdown');

// This URL points to the raw Markdown content of the README.
const url = 'https://raw.githubusercontent.com/tourniquet/awesome-phaser/master/README.md';

async function scrapeAwesomePhaser() {
  try {
    const { data: markdownContent } = await axios.get(url);

    // Convert Markdown to HTML
    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(markdownContent);

    // Load the generated HTML into Cheerio
    const $ = cheerio.load(htmlContent);

    console.log('=== 侦察报告：Awesome Phaser ===\n');
    console.log('NOTE: The requested "Demos" and "Starters & Frameworks" sections were not found.');
    console.log('Scraping "Tutorials" and "Books" instead.\n');


    // The sections we are scraping. Note: these are h3 in the source markdown.
    const sections = ['Tutorials', 'Books'];

    sections.forEach(sectionTitle => {
      console.log(`--- ${sectionTitle} ---`);

      // Find the header for the section
      const header = $(`h3:contains("${sectionTitle}")`);

      // The list of items is the next `ul` element
      const list = header.next('ul');

      list.find('li').each((index, element) => {
        const listItem = $(element);
        const link = listItem.find('a').first();

        const name = link.text().trim();
        const href = link.attr('href');

        // The description is the text that is not part of the link.
        // In this markdown, there isn't a separate description, so we'll leave it blank.
        const description = "";

        console.log(`${index + 1}. [${name}]`);
        console.log(`   URL: ${href}`);
        console.log(`   Description: ${description}`);
        console.log();
      });
    });

  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

scrapeAwesomePhaser();
