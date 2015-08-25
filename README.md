This package is meant to be used inside of a larger Meteor application run inside of the [AWS Elastic Beanstalk worker tier](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-tiers.html).

# How it works
You should read the documentation above. However, in general, this package registers REST endpoints for handling an incoming SQS message (`POST /`) and a health check (`GET /health`). If the worker functions throw an error, then the message will "fail". Otherwise, the message will "succeed", and the SQS daemon will remove the message from the queue.

# Infrastructure
## Setting up in EB
1. Create a new worker environment. You can either have it create a queue for you or use an existing queue. If you use an existing queue, be sure to create a redrive strategy and set up a dead letter queue, otherwise your failed messages will be processed infinitely.

2. Under "Configuration -> Worker Configuration", set the "HTTP Path" setting to "/".

3. Under "Configuration -> Health", set the "Application health check URL" to "/health"

## Deploying
Your environment type should either be `Node.JS` or `Docker`. With Docker, we recommend using one of [these](https://github.com/meteorhacks/meteord) images.

You can use either the [AWS CLI tool](https://aws.amazon.com/cli/) or the [Elastic Beanstalk CLI tool](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html). In our experience, the EB CLI tool is easier for rapid deployment in development, but the AWS CLI tool is better for docker-based deployments and versioning.

# Usage

## Message Format
Message format is assumed to be as follows:

```json
{
  "task":"<task name>",
  "data":"<arbitrary JSON data>"
}
```

## Add the Package
```
$ meteor add dispatch:beanstalk-worker
```

## Register Workers
```javascript
Beanstalk.register('taskName', function(data) {
  console.log('Doing something with the data...');
});
```

## Run Locally
You can run this just as you would a normal Meteor application. Workers are automatically called when you `POST` to `/`.

## Testing
### TDD tests:
```
$ ./run-tests.sh
```

### CI tests:
```
$ ./run-tests.sh ci
```

