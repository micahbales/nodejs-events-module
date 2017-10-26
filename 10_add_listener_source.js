EventEmitter.prototype.addListener = function addListener(type, listener) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('listener must be a function');

  events = this._events;
  if (!events) {
    events = this._events = {};
    this._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      this.emit('newListener', type,
                listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = this._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++this._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = [existing, listener];
    } else {
      // If we've already got an array, just append.
      existing.push(listener);
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(this);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d %s listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      existing.length, type);
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;
