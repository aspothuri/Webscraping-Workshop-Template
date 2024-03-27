
import axios from 'axios'
import cheerio from 'cheerio'

async function newsscraper(ticker_symbol) {
    const headlines = [];
    const urls = [];
    return {headlines, urls};
}

export default newsscraper;