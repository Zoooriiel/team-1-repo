//This class has a static property called successResponse which is an object that represents a successful HTTP response. It has properties like ok, status, statusText, json, text, and headers that can be used to mock a successful HTTP response.
//Mock class also has a static property called notFoundResponse which is an object that represents a "Not Found" HTTP response.
//this file is used for mocking HTTP responses in your codebase
// mockToken

class Mock{

    constructor(){
        // TODO: WIP
    }
    
    // Static variables
    /* ************** */
    
    // !! Mock response 200 SUCCESS (akin to response.status === 200)
    static successResponse = {                                  
        ok: true,                                                   // Indicates the response was successful
        status: 200,                                                // HTTP status code for Not Found
        statusText: 'OK',                                           // Corresponding status text
        json: async () => ({ message: 'Success!' }),                // Mocked JSON response
        text: async () => 'Success!',                               // Mocked plain text response
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    // !! Mock response 404 NOT_FOUND (akin to response.status === 400)
    static notFoundResponse = {                                 
        ok: false,                                                  // Indicates the response was NOT successful
        status: 404,                                                // HTTP status code for Not Found
        statusText: 'NOT_FOUND',                                    // Corresponding status text
        json: async () => ({ error: 'Resource not found' }),        // Mocked JSON response
        text: async () => 'Resource not found',                     // Mocked plain text response
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    // !! Mock response 403 FORBIDDEN (akin to response.status === 403)
    static forbiddenResponse = {                                 
        ok: false,                                                  // Indicates the response was forbidden
        status: 403,                                                // HTTP status code for Forbidden
        statusText: 'FORBIDDEN',                                    // Corresponding status text
        json: async () => ({ error: 'Forbidden' }),                 // Mocked JSON response
        text: async () => 'Forbidden',                              // Mocked plain text response
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    // !! Mock token containing the username (username: momorunner) email (email: martin@example.com), role (role: ADMIN) and Unix Timestamps: issued at (iat: 6st Sept 2024) and expiry (exp: 6st Sept 2025)
    static mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vbW9ydW5uZXIiLCJlbWFpbCI6Im1hcnRpbkBleGFtcGxlLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyNTU5MDQwNywiZXhwIjoxNzU3MTI2NDA3fQ.zXMOdhfVq4ILL0JLKq0Iq2zR3f2fBdJA37F9dSQYSm4";
    
    // Static methods
    /* ************** */

    static getMockSuccess(){                                        // Returns mock OK status
        return this.successResponse;
    }

    static getMockNotFound(){                                       // Returns mock NOT_FOUND status
        return this.successResponse;
    }

    static getMockForbidden(){                                      // Returns mock FORBIDDEN status
        return this.forbiddenResponse;
    }

    static getToken(status = false){                                // Returns mock NOT_FOUND status
        return status ? this.mockToken : status;
    }

    static fetchMockItems(currPage = 1){                            // Returns mock list of products
        
        const items = [];                                       
        const currentPage = currPage;                               // currentPage = page passed in
        const perPage = 6;                                          // Number of Items per page    
        const totalItems = 12;                                      // Total Number of Items
        const totalPages = Math.ceil(totalItems / perPage);         // Calc. total pages

        const idx = (currentPage - 1) * (perPage - 1) + 1;          // currentPage = 1: idx = (1 - 1) * (6 - 1) + 1 = 1

        for (let index = idx; index < idx + perPage && index <= totalItems; index++) {

                let min = 39.90;                                    // Min. px range
                let max = 99.90;                                    // max. px range
                let price = (Math.random() * (max - min)) + min;    // Randomized range
                price = price.toFixed(2);                           // Set to 2 dec places
                price = price.slice(0, -1) + '0';                   // Set price to end with a '0'

                items.push({
                        "name": "Product " + index,
                        "price": price,
                        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit laborum. Commodi omnis iusto vero, excepturi unde reprehenderit.",
                        "image": "img/products/product" + index + ".jpg",
                        "id": index
                });
        }
        
        // return new Promise((resolve, reject) => {                   // Return a reject for simulation
        //     reject("No results found");
        // });

        const itemsResponse = {
            "data": items,                                          // Items created
            "page": currentPage,                                    // Identify the current page
            "per_page": perPage,                                    // Limits the items per page
            "total": totalItems,                                    // Identify the number of pages
            "total_pages": totalPages                               // Total number of pages based on items per page
        };

        return new Promise((resolve) => {                           // Simulate fectching thumbnails with pagination from a url
                setTimeout(() => {                                  // Simulate a network delay response
                    resolve(itemsResponse)                          // Return the response data with limit, offset and totalResults
                }, 2000);                                           // Delay of 1000 ms == 1 sec
        });

    }

    // Class methods (TBC)
    /* **************** */

}