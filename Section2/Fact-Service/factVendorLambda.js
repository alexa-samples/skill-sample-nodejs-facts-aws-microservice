// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/
'use strict';

exports.get = async function(event, context, callback) {
    const data = [
        'A year on Mercury is just 88 days long.',
        'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
        'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
        'On Mars, the Sun appears about half the size as it does on Earth.',
        'Earth is the only planet not named after a god.',
        'Jupiter has the shortest day of all the planets.',
        'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
        'The Sun contains 99.86% of the mass in the Solar System.',
        'The Sun is an almost perfect sphere.',
        'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
        'Saturn radiates two and a half times more energy into space than it receives from the sun.',
        'The temperature inside the Sun can reach 15 million degrees Celsius.',
        'The Moon is moving approximately 3.8 cm away from our planet every year.',
    ];
    
    const factIndex = Math.floor(Math.random() * data.length);
    const fact = data[factIndex];

    var result = {
        statusCode: 200,
        body: JSON.stringify(fact),
        headers: {'content-type': 'text/json'}
    };
    
    callback(null, result);
}
