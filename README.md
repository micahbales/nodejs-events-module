# The Event Loop

The Event Loop is the beating heart of Node.js, allowing the single-threaded
Javascript language perform non-blocking, asynchronous operations.

## The Kernel Does What Javascript Can't

While Javascript can only do one thing at a time, the server's operating system
is not so constrained. Most modern kernels are multi-threaded, and so are
capable of handling multiple operations in the background. By passing off
time-intensive operations to the OS, Node allows the computer's cores to
process and return them when they're ready.

Meanwhile, Node continues its synchronous operations in the Event Loop.

## The Phases of the Event Loop

The Event Loop happens in distinct stages. In each one, a queue of FIFO
callbacks are executed before moving on to the next phase.

### Timers

This phase executes callbacks scheduled by timers, such as `setTimeout()`
and `setInterval()`.

### I/O Callbacks

In this phase, Node executes any callbacks that are not close callbacks,
ones scheduled by timers, or `setImmediate()`. This phase executes callbacks
for some system operations, such as types of TCP errors.

### Idle, Prepare

Used only internally.

### Poll

This is where Node stops to retrieve new I/O events. Node will block here as
needed. Essentially, whatever callbacks have returned from the system kernel
will form a queue that is executed, in FIFO order, until the queue is empty.

Poll events can be queued even while polling events are being processed. This
can lead to the poll phase greatly exceeding the threshold of timers.

### Check

`setImmediate()` callbacks are executed here. This means that operations can be
specifically timed to occur immediately after all callbacks are executed from
the queue in the polling phase. If the poll phase becomes idle, Node may
immediately move to the Check phase to execute callbacks scheduled with
`setImmediate()`.

### Close Callbacks

This phase is where the `close` event is emitted when sockets or handles are
closed abruptly. (For example, `socket.destroy()`).

## `setImmediate()` vs `setTimeout()`

The `setImmediate()` and `setTimeout()` functions are similar, but behave
differently depending on when they are called.

  * `setImmediate()` executes a script after the Poll phase completes
  * `setTimeout()` schedules a script to be run after a set period

## `process.nextTick()`

`process.nextTick()` is not technically part of the Event Loop, but it plays
a major role in sequencing events. Simply put, `process.nextTick()` executes
an operation immediately after the current phase ends.

The Node.js Guides recommend against using `process.nextTick()` in most
circumstances. Instead, use `setImmediate()`. It's easier to reason about,
and it leads to code that is more broadly compatible across environments,
including the browser.

(For circumstances where you might still want to use `process.nextTick()`,
check out the [Node.js Guides](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/).)

# The Events Module

We've seen how the Event Loop makes it possible for Javascript to operate in
ways that are non-blocking and asynchronous. Perhaps not surprisingly, the
Events Module is one of the major places where this plays out in practice.

## 1. Emitters and Listeners

Much of Node's core API is built around an asynchronous, event-driven
architecture. This architecture is rooted in two types of objects:
emitters and listeners.

Emitters periodically fire named events that cause listeners (a type of
function object) to be called.

*See `01_emitters_listeners.js` for a simple example of how listeners and
emitters are created and interact.*

## 2. Passing Arguments and `this` to Listeners

The `eventEmitter.emit()` method allows us to pass an arbitrary set of
arguments to listener functions. When a standard listener function is called,
`this` will refer to the `EventEmitter` to which the listener is attached.

It's allowed, but not recommended, to use arrow functions with listeners.
If you do, `this` will not reference the `EventEmitter` instance.

*`02_arguments_this.js` shows how `this` works in listener functions of both
standard and arrow types.*

## 3. Asynchronous vs Synchronous

When an `EventListener` is activated by `.emit()`, it calls all of its
listeners in the order that they were registered. This helps ensure that
events are properly sequenced, and avoids race conditions and other errors.
If we need a listener function to operate asynchronously, we can achieve
this by using `setImmediate()` or `process.nextTick()`.

*For an example of this, check out `02_arguments_this.js`*

## 4. Handling Events Just One Time

Normally, when we attach listeners using the `emitter.on()` method, their
callbacks will be fired every time an event is emitted. But sometimes we don't
want a repeat performance; we just want the callback to go off once, and then
stop.

A handy way to achieve this effect is to employ `emitter.once()`. Using this
method, when the event is emitted the listener is unregistered and *then*
called. (Think of it as an function being popped off of an array and invoked.)

*See `04_on_once.js` for an example of how this works.*

## 5. Errors As Events  

What happens when an error occurs within an `EventEmitter` instance? Node.js
treats such errors as a special case of event. If there's no listener registered for `'error'` when an `'error'` event occurs, then Node registers
the error, prints a stack trace, and exits.

No one wants Node to blow up, so it's a really good idea to register a
listener for the `'error'` event. A great way to make sure that errors are
always handled is to register a listener on the `process` object's
`uncaughtException` event.

That's just a fallback, though. It's best practice to alway add a listener to each `emitter` instance, to catch error events.

*Check out 05_error_event for examples*

## 6. Removing Listeners

So far we've covered how to add listeners, but we can also easily remove them
using `emitter.removeListener` and `emitter.removeAllListeners()`.

*See 06_remove_listeners for code examples*

## 7. Ordering Listeners

Under normal circumstances, when an event is emitted, its listeners are
invoked in the order that they were registered. However, it is possible to
change the sequence of listeners, using `emitter.prependListener()` and
`emitter.prependOnceListener()`.

*See 07_prepend_listeners for code examples*

## 8. Listing Events & Listeners

Sometimes, it's helpful to be able to iterate through all our events. We can
do that with `emitter.eventNames()`, which produces a nice array of all events
registered with an emitter.

By using `emitter.listeners(eventName)`, we can get an array of every function
that is triggered by a particular event.

*See 08_listing_events_listeners for code examples*

## 9. Maximum Listeners

By default, Node.js limits the number of listeners that can be registered for a
single event to 10. This limit is put in place to help avoid memory leaks.
However, there are several ways that Node.js allows us to change the default
listener maximum.

To change the maximum number of listeners for a particular event, we can use
`emitter.setMaxListeners(n)`. It is also possible to change the global
maximum for all listeners via `EventEmitter.defaultMaxListeners()`.

(Note: It is possible to exceed the maximum number of listeners for an event.
If you do, `EventEmitter` will output a trace warning to stderr, indicating that
a "possible EventEmitter memory leak" has been detected.)

*See 09_max_listeners for code examples*
