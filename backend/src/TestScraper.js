class TestScraper {
    getWalmartProducts(name) {
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

    getAmazonProducts(name) {
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

    getEbayProducts(name) {
        return {
            seller: "Ebay",
            products: [
                {
                    url: "fake-url-e1",
                    price: 50,
                    shippingCost: 7,
                    freeReturns: false,
                },
                {
                    url: "fake-url-e2",
                    price: 60,
                    shippingCost: 0,
                    freeReturns: true,
                },
            ]
        }
    }

    getTargetProducts(name) {
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

export { TestScraper };