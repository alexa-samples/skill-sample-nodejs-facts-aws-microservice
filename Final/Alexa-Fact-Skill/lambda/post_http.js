// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/
const https = require("https");

module.exports = function (baseURL, urlPath) {
    var options = {
        hostname: baseURL,
        port: 443,
        path: urlPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "*/*"
        }
    };
    
    return new Promise((resolve, reject) => {
        var req = https.request(options, (response) => {
            const { statusCode } = response;
            const contentType = response.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error(`Request Failed. Status: ${statusCode}`);
            } else if (!/^.*\/json/.test(contentType)) {
                error = new Error('Invalid content-type' + `Expected application/json but got ${contentType}`);
            }

            if (error) {
                response.resume();
                reject(error)
            }

            // response.setEncoding('utf8');

            let rawData = '';
            response.on('data', chunk => { rawData += chunk });

            response.on('end', () => {
                resolve(rawData);
            });
        
        });
        
        // req.write(postData);
        req.end();
    });
}