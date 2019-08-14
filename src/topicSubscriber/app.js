/*
  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var AWS = require('aws-sdk');
var uuidv1 = require('uuid/v1');

var dynamo = new AWS.DynamoDB.DocumentClient();
var table = process.env.TABLE_NAME;

exports.handler = function(event, context, callback) {
    //console.log('Received event:', JSON.stringify(event, null, 2));

   var params = {
    TableName:table,

    Item:{
        "id": uuidv1(),
        "timestamp": Date.now().toString(),
        "payload": JSON.stringify(event, null, 2)
        }
    };
       
    console.log("Adding event to database");
    dynamo.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add event. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            callback(null,'DynamoDB updated successfully');
        }
    });
}
