import fetch from 'node-fetch';
import fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

async function getTargetInfo(name) {
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

getTargetInfo("ps5").then(result => console.log(result));