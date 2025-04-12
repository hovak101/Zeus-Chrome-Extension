import axios from 'axios';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

export async function getEbayInfo(name) {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(name)}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Referer": "https://www.google.com/",
      "Connection": "keep-alive"
    },
    timeout: 10000,
  });

  const html = response.data;
  const $ = cheerio.load(html);

  const items = $('li.s-item');

  for (let i = 0; i < items.length; i++) {
    const item = $(items[i]);

    const url = item.find('a.s-item__link').attr('href');
    const price = item.find('.s-item__price').first().text();
    const isSponsored = item.text().includes('Sponsored');

    if (!isSponsored && url && price) {
      return {
        seller: "Ebay",
        url: url,
        price: parseFloat(price.slice(1, price.length)),
        shippingCost: 0,
        freeReturns: true,
      }
    }
  }

  return null;
}

export async function getTargetInfo(name) {
  const params = {
    key: "9f36aeafbe60771e321a7cc95a78140772ab3e96",
    channel: "WEB",
    count: "3",
    default_purchasability_filter: "true",
    include_dmc_dmr: "true",
    include_sponsored: "false",
    include_review_summarization: "false",
    keyword: name,
    new_search: "true",
    offset: "0",
    page: `/s/${name}`,
    platform: "desktop",
    pricing_store_id: "1427",
    scheduled_delivery_store_id: "1427",
    spellcheck: "true",
    store_ids: "1427,323,2830,2584,324",
    useragent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    visitor_id: "01960EC1FCC70201A6A3927D17999FE1",
    zip: "95129",
  };

  const baseUrl = "https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2";
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${baseUrl}?${queryString}`;

  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.5",
      "user-agent": params.useragent,
      referer: "https://www.target.com/",
      "referrer-policy": "no-referrer-when-downgrade",
    },
  });

  const data = await response.json();
  const products = data.data.search.products;
  if (products) {
    const price = parseFloat(products[0].price.current_retail);
    const url = products[0].item.enrichment.buy_url;
    return {
      seller: "Target",
      url: url,
      price: parseFloat(price),
      shippingCost: 0,
      freeReturns: true,
    }
  }
}

export async function getAmazonInfo(name) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(name)}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Referer": "https://www.google.com/",
      "Connection": "keep-alive"
    },
    timeout: 10000,
  });

  const html = response.data;
  const $ = cheerio.load(html);

  const products = $('div[data-component-type="s-search-result"]');

  for (let i = 0; i < products.length; i++) {
    const element = $(products[i]);

    const relativeUrl = element.find('a.a-link-normal[href*="/dp/"]').attr('href');
    const productUrl = relativeUrl ? `https://www.amazon.com${relativeUrl}` : null;

    const priceText = element.find('span.a-price span.a-offscreen').first().text().replace(/[^\d\.]/g, '');
    const price = priceText ? parseFloat(priceText) : null;

    const isSponsored = element.text().toLowerCase().includes('sponsored');

    if (!isSponsored && productUrl && price !== null) {
      return {
        seller: "Amazon",
        url: productUrl,
        price,
        shippingCost: 0,
        freeReturns: true
      };
    }
  } 

  return null;
}

export async function getWalmartInfo(name) {
  const url = `https://www.walmart.com/search?q=${name}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Referer": "https://www.google.com/",
      "Connection": "keep-alive",  
    },
    timeout: 10000,
  })

  const html = response.data;
  const $ = cheerio.load(html);

  const itemStack = $('[data-testid="item-stack"]');
  const baseUrl = 'https://www.walmart.com';

  const items = itemStack.children('div');
  for (let i = 0; i < items.length; i++) {
    const el = items[i];
    const item = $(el);

    const priceElement = item.find('[data-testid="list-view"]')
                              .find('[data-automation-id="product-price"]')
                              .children().eq(0);
    const dollarPrice = priceElement.children().eq(2).html();
    const centPrice = priceElement.children().eq(3).html();

    const linkElement = item.find('a').first();
    const rawHref = linkElement.attr('href');

    if (rawHref && rawHref.startsWith('/ip/')) {
      const fullUrl = baseUrl + rawHref;
      return {
        seller: "Walmart",
        url: fullUrl,
        price: parseFloat(dollarPrice) + parseFloat(centPrice) / 100,
        shippingCost: 0,
        freeReturns: true,
      };
    }
  }

  return null; 
}