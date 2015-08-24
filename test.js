/* global Beanstalk:false - from dispatch:beanstalk-worker */
describe('beanstalk', function() {
  afterEach(function() {
    Beanstalk._workers = {};
  });
  it('should let you register a worker', function() {
    Beanstalk.register('foo', function() {
      return true;
    });

    expect(Beanstalk._workers.foo).toEqual(jasmine.any(Function));
  });

  it('should not let you re-register a worker', function() {
    Beanstalk.register('foo', function() {
      return true;
    });

    expect(function() {
      Beanstalk.register('foo', function() {
        return true;
      });
    }).toThrow();
  });

  it('should trigger a worker by msg.task', function() {
    var msg = {
      task: 'foo',
      data: {
        bar: 'baz'
      }
    };

    Beanstalk.register('foo', function() {
      return true;
    });

    spyOn(Beanstalk._workers, 'foo').and.returnValue(true);

    Beanstalk.handle(msg);
    expect(Beanstalk._workers.foo).toHaveBeenCalledWith({
      bar: 'baz'
    });
  });

  it('should throw an error if no worker is registered for a task', function() {
    var msg = {
      task: 'foo',
      data: {
        bar: 'baz'
      }
    };

    expect(function() {
      Beanstalk.handle(msg);
    }).toThrow();
  });
});
