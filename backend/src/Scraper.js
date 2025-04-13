import puppeteer from 'puppeteer';

class Scraper {
    async init() {
        // Check if running in production (like Railway)
        const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
        
        // Base options that work well locally
        const options = {
            headless: "new"
        };
        
        // Add extra args only in production environment
        if (isProduction) {
            options.args = [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--no-zygote'
            ];
        }
        
        this.browser = await puppeteer.launch(options);
    }
    
    async getWalmartProducts(query) {
        return {
            seller: "Walmart",
            products: [
                {
                    url: "fake-url-w1",
                    price: 10,
                    shippingCost: 2,
                    freeReturns: false,
                },
                {
                    url: "fake-url-w2",
                    price: 20,
                    shippingCost: 0,
                    freeReturns: true,
                },
            ]
        }
    }

    async getAmazonProducts(query) {
        return {
            seller: "Amazon",
            products: [
                {
                    url: "fake-url-a1",
                    price: 30,
                    shippingCost: 0,
                    freeReturns: true,
                },
                {
                    url: "fake-url-a2",
                    price: 40,
                    shippingCost: 5,
                    freeReturns: false,
                },
            ]
        }
    }

    async getEbayProducts(query) {
        console.log(query);
        const page = await this.browser.newPage();
        const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`;
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
            
                return {
                url,
                price: price ? parseFloat(price) : null,
                shippingCost: parseFloat(shipping),
                freeReturns,
                };
            });
        });

        return {
            seller: "Ebay",
            products: products
        }
    }

    async getTargetProducts(query) {
        return {
            seller: "Target",
            products: [
                {
                    url: "fake-url-t1",
                    price: 70,
                    shippingCost: 0,
                    freeReturns: true,
                },
                {
                    url: "fake-url-t2",
                    price: 80,
                    shippingCost: 3,
                    freeReturns: false,
                },
            ]
        }
    }
}

export { Scraper };

