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
