import puppeteer from 'puppeteer';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    const name="xbox series x";
    const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(name)}`;
    // Navigate the page to a URL
    await page.goto(url);
    
    await page.waitForSelector('ul.srp-results.srp-list.clearfix', { timeout: 10000 });

    const products = await page.$$eval('ul.srp-results.srp-list.clearfix > li.s-item', items => {
        return items.map(item => {
          const url = item.querySelector('.s-item__link')?.href || null;
          const priceRaw = item.querySelector('.s-item__price')?.textContent.trim() || null;
          const shippingRaw = item.querySelector('.s-item__shipping, .s-item__logisticsCost')?.textContent.trim() || '';
          const condition = item.querySelector('.SECONDARY_INFO')?.textContent.trim() || null;
          const freeReturns = !!item.querySelector('.s-item__free-returns');
      
          // Clean up price (e.g., "$398.99" -> 398.99)
          const priceMatch = priceRaw?.match(/[\d,.]+/);
          const price = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')).toFixed(2) : null;
      
          // Clean up shipping (e.g., "+$55.05 delivery" or "Free delivery" -> 0.00)
          let shipping = 0.00;
          if (/free/i.test(shippingRaw)) {
            shipping = 0.00;
          } else {
            const shippingMatch = shippingRaw.match(/[\d,.]+/);
            shipping = shippingMatch ? parseFloat(shippingMatch[0].replace(/,/g, '')).toFixed(2) : '0.00';
          }
      
            // Check if the item is marked as sponsored
            const sponsoredText = item.textContent.toLowerCase();
            const sponsored = sponsoredText.includes('sponsored');
          return {
            url,
            price: price ? parseFloat(price) : null,
            shipping: parseFloat(shipping),
            condition,
            freeReturns,
            sponsored
          };
        });
    });
      
    console.log(products);
    await browser.close();
  })();