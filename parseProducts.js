"use client"
const axios = require('axios');
const cheerio = require('cheerio');

export async function fetchAndAnalyzeData(req, res) {
    try {
        const response = await axios.get('https://www.olx.kz/elektronika/');
        const html = response.data;

        const $ = cheerio.load(html);
        const title = $('.css-u2ayx9 h6').text().trim();

        console.log('Title:', title);
        res.status(200).send('Data fetched and analyzed successfully.');
    } catch (error) {
        console.error('Error fetching data:', error); 
        res.status(500).send('Error fetching data.');
    }
}
