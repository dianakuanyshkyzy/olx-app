// utils/scrapeUtils.ts
"use client"
import axios from 'axios';
import cheerio from 'cheerio';

export async function scrapeOLXData() {
    try {
        const response = await axios.get('https://www.olx.kz/elektronika/');
        const html = response.data;
        const $ = cheerio.load(html);

        const titles = $('.css-u2ayx9 h6').map((index, element) => $(element).text().trim()).get();
        const prices = $('.css-tyui9s').map((index, element) => $(element).text().trim()).get();
        const bu = $('.css-3lkihg').map((index, element) => $(element).text().trim()).get();
        const location_date = $('.css-1a4brun').map((index, element) => $(element).text().trim()).get();
        const imag = $('.css-gl6djm img').map((index, element) => $(element).attr('src')).get();
        
        const scrapedData = titles.map((title, index) => ({
            title,
            prices,  
            bu, 
            location_date, 
            imag, 
        }));


        return scrapedData;
    } catch (error) {
        console.error('Error scraping data:', error);
        return null;
    }
}
