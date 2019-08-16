# Lambda IoT Rule
Deploy a serverless backend that can both send and receive messages on the AWS IoT topic stream. This includes an AWS Lambda function than can publish an IoT message and a simple AWS IoT Rule that forwards messages from a specific topic to an AWS Lambda function that then updates a DynamoDB table.

```bash
.
├── README.MD                   <-- This instructions file
├── src 
│  └── topicPublisher              <-- Source code for a lambda function
│       └── app.js                  <-- Lambda handler to publish messages on an IoT topic stream
│       └── package.json            <-- NodeJS dependencies and scripts
│  └── topicSubscriber
│       └── app.js                  <-- Lambda handler for messages forwarded from the IoT topic stream
│       └── package.json            <-- NodeJS dependencies and scripts
├── template.yaml               <-- SAM template
```

## Services Deployed

* Two AWS Lambda Functions (Described in the next section)
* A DynamoDB table
* An AWS IoT Rule 
* An Amazon API Gateway endpoint

## topicPublisher

Receives input from an API Gateway endpoint that is generated and can be found by clicking on the API Gateway node in the main Lambda editor view. Its a REST POST endpoint and will forward the body of the message to the defined AWS IoT topic.

## topicSubscriber

This Lambda function is invoked by an AWS IoT rule that forwards any messages on the defined AWS IoT topic. It then creates an entry in the generated DynamoDB table as a JSON object consisting of an ID, timestamp, and the forwarded payload.

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)

## Installation Instructions

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.
1. Go to the app's page on the [Serverless Application Repository](https://serverlessrepo.aws.amazon.com/applications/) and click "Deploy"
1. Provide the required app parameters (see parameter details below) and click "Deploy"

## Parameter Details

* PublishTopic: (Required) Provide a topic to publish on. The default will publish on topic_1
* SubscribeTopic: (Required) Provide a topic for the IoT rule to query. The default will trigger on any message published to topic_2

## Using this Application

* Navigate to [AWS IoT Core](https://console.aws.amazon.com/iot) and click on 'Test'
* Publish a message on the AWS IoT topic set in your query.
* To confirm the function responded to the event, check the CloudWatch logs for the Lambda function or the contents of the DynamoDB table that was generated for this application. 

==============================================

Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
