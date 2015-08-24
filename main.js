/* global Beanstalk:true*/
Beanstalk = {
  _workers: {}
};

Beanstalk.register = function (task, func) {
  if (this._workers[task]) {
    throw new Error('Already registered a Beanstalk worker for ' + task);
  }

  this._workers[task] = func;
};

Beanstalk.handle = function (msg) {
  check(msg, {
    task: String,
    data: Match.Optional(Object)
  });

  var worker = this._workers[msg.task];
  if (worker) {
    worker(msg.data);
  } else {
    throw new Meteor.Error(400, 'No worker registered for task "' + msg.task + '"');
  }
};

// REGISTER THE ENDPOINTS

// Endpoint the SQS daemon hits
Meteor.method('worker', function (msg) {
  Beanstalk.handle(msg);
}, {
  url: '/'
});

// Health check for Beanstalk
Meteor.method('health', function () {
  return 'OK';
}, {
  url: '/health',
  httpMethod: 'get'
});
