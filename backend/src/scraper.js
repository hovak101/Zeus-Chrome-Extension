import axios from 'axios';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';

// // all functions should timeout after 15 seconds
export async function getEbayInfo() {
  return {
    seller: "Ebay",
    url: "fake-url-1",
    price: 40,
    shippingCost: 0,
    freeReturns: true,
  };
}
// export async function getEbayInfo(name) {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(name)}`;
//   // Navigate the page to a URL
//   await page.goto(url);
  
//   await page.waitForSelector('ul.srp-results.srp-list.clearfix', { timeout: 10000 });

//   const products = await page.$$eval('ul.srp-results.srp-list.clearfix > li.s-item', items => {
//       return items.map(item => {
//         const url = item.querySelector('.s-item__link')?.href || null;
//         const priceRaw = item.querySelector('.s-item__price')?.textContent.trim() || null;
//         const shippingRaw = item.querySelector('.s-item__shipping, .s-item__logisticsCost')?.textContent.trim() || '';
//         const condition = item.querySelector('.SECONDARY_INFO')?.textContent.trim() || null;
//         const freeReturns = !!item.querySelector('.s-item__free-returns');
    
//         // Clean up price (e.g., "$398.99" -> 398.99)
//         const priceMatch = priceRaw?.match(/[\d,.]+/);
//         const price = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')).toFixed(2) : null;
    
//         // Clean up shipping (e.g., "+$55.05 delivery" or "Free delivery" -> 0.00)
//         let shipping = 0.00;
//         if (/free/i.test(shippingRaw)) {
//           shipping = 0.00;
//         } else {
//           const shippingMatch = shippingRaw.match(/[\d,.]+/);
//           shipping = shippingMatch ? parseFloat(shippingMatch[0].replace(/,/g, '')).toFixed(2) : '0.00';
//         }
    
//           // Check if the item is marked as sponsored
//           const sponsoredText = item.textContent.toLowerCase();
//           const sponsored = sponsoredText.includes('sponsored');
//         return {
//           seller: "Ebay",
//           url,
//           price: price ? parseFloat(price) : null,
//           shippingCost: parseFloat(shipping),
//           condition,
//           freeReturns,
//           sponsored
//         };
//       });
//   });

//   if(products.length > 0) {
//     return products[0];
//   }

//   return null;
// }

export async function getTargetInfo(name) {
  return {
    seller: "Target",
    url: "fake-url-2",
    price: 30,
    shippingCost: 0,
    freeReturns: true,
  };
}
// export async function getTargetInfo(name) {
//   const params = {
//     key: "9f36aeafbe60771e321a7cc95a78140772ab3e96",
//     channel: "WEB",
//     count: "3",
//     default_purchasability_filter: "true",
//     include_dmc_dmr: "true",
//     include_sponsored: "false",
//     include_review_summarization: "false",
//     keyword: name,
//     new_search: "true",
//     offset: "0",
//     page: `/s/${name}`,
//     platform: "desktop",
//     pricing_store_id: "1427",
//     scheduled_delivery_store_id: "1427",
//     spellcheck: "true",
//     store_ids: "1427,323,2830,2584,324",
//     useragent:
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
//     visitor_id: "01960EC1FCC70201A6A3927D17999FE1",
//     zip: "95129",
//   };

//   const baseUrl = "https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2";
//   const queryString = new URLSearchParams(params).toString();
//   const fullUrl = `${baseUrl}?${queryString}`;

//   const response = await fetch(fullUrl, {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       "accept-language": "en-US,en;q=0.5",
//       "user-agent": params.useragent,
//       referer: "https://www.target.com/",
//       "referrer-policy": "no-referrer-when-downgrade",
//     },
//   });

//   const data = await response.json();
//   const products = data.data.search.products;
//   if (products) {
//     const price = parseFloat(products[0].price.current_retail);
//     const url = products[0].item.enrichment.buy_url;
//     return {
//       seller: "Target",
//       url: url,
//       price: parseFloat(price),
//       shippingCost: 0,
//       freeReturns: true,
//     }
//   }
// }

export async function getAmazonInfo(name) {
  return {
    seller: "Target",
    url: "fake-url-3",
    price: 45,
    shippingCost: 0,
    freeReturns: true,
  };
}
// export async function getAmazonInfo(name) {
//   const url = `https://www.amazon.com/s?k=${encodeURIComponent(name)}`;

//   const response = await axios.get(url, {
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
//       "Accept":
//         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
//       "Accept-Language": "en-US,en;q=0.9",
//       "Cache-Control": "no-cache",
//       "Pragma": "no-cache",
//       "Referer": "https://www.google.com/",
//       "Connection": "keep-alive"
//     },
//     timeout: 10000,
//   });

//   const html = response.data;
//   const $ = cheerio.load(html);

//   const products = $('div[data-component-type="s-search-result"]');

//   for (let i = 0; i < products.length; i++) {
//     const element = $(products[i]);

//     const relativeUrl = element.find('a.a-link-normal[href*="/dp/"]').attr('href');
//     const productUrl = relativeUrl ? `https://www.amazon.com${relativeUrl}` : null;

//     const priceText = element.find('span.a-price span.a-offscreen').first().text().replace(/[^\d\.]/g, '');
//     const price = priceText ? parseFloat(priceText) : null;

//     const isSponsored = element.text().toLowerCase().includes('sponsored');

//     if (!isSponsored && productUrl && price !== null) {
//       return {
//         seller: "Amazon",
//         url: productUrl,
//         price,
//         shippingCost: 0,
//         freeReturns: true
//       };
//     }
//   } 

//   return null;
// }

export async function getWalmartInfo(name) {
  return {
    seller: "Walmart",
    url: "fake-url-4",
    price: 35,
    shippingCost: 0,
    freeReturns: true,
  };
}
// export async function getWalmartInfo(name) {
//   const url = `https://www.walmart.com/search?q=${name}`;

//   const response = await axios.get(url, {
//     headers: {
//       "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
//           "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
//       "Accept":
//         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
//       "Accept-Language": "en-US,en;q=0.9",
//       "Cache-Control": "no-cache",
//       "Pragma": "no-cache",
//       "Referer": "https://www.google.com/",
//       "Connection": "keep-alive",  
//     },
//     timeout: 10000,
//   })

//   const html = response.data;
//   const $ = cheerio.load(html);

//   const itemStack = $('[data-testid="item-stack"]');
//   const baseUrl = 'https://www.walmart.com';

//   const items = itemStack.children('div');
//   for (let i = 0; i < items.length; i++) {
//     const el = items[i];
//     const item = $(el);

//     const priceElement = item.find('[data-testid="list-view"]')
//                               .find('[data-automation-id="product-price"]')
//                               .children().eq(0);
//     const dollarPrice = priceElement.children().eq(2).html();
//     const centPrice = priceElement.children().eq(3).html();

//     const linkElement = item.find('a').first();
//     const rawHref = linkElement.attr('href');

//     if (rawHref && rawHref.startsWith('/ip/')) {
//       const fullUrl = baseUrl + rawHref;
//       return {
//         seller: "Walmart",
//         url: fullUrl,
//         price: parseFloat(dollarPrice) + parseFloat(centPrice) / 100,
//         shippingCost: 0,
//         freeReturns: true,
//       };
//     }
//   }

//   return null; 
// }