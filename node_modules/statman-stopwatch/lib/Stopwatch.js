var now = require("performance-now");
const isBoolean = require('lodash.isboolean');
const isEmpty = require('lodash.isempty');
const uuid = require('uuid/v4');
var format = require('string-template');

const STATES = {
    INIT: 'init',
    RUNNING: 'running',
    STOPPED: 'stopped',
    SPLIT: 'split'
};

function Stopwatch(name, autostart) {
    var self = this;

    if (isBoolean(name)) {
        autostart = name;
        name = null;
    }

    if (isEmpty(name)) {
        name = uuid();
    }

    self._name = name;

    self.reset();

    if (autostart) this.start();
}

Stopwatch.prototype.STATES = STATES;

Stopwatch.prototype.name = function () {
    var self = this;
    return self._name;
};

Stopwatch.prototype.start = function () {
    var self = this;

    if (self.state() !== STATES.STOPPED && self.state() !== STATES.INIT) {
        throw new Error('Cannot start a stopwatch that is currently running (' + self.state() + ')');
    }

    self._state = STATES.RUNNING;
    self.startTime = now();
};

Stopwatch.prototype.stop = function () {
    var self = this;
    self.stopTime = now();
    self._state = STATES.STOPPED;
    return this.read();
};

Stopwatch.prototype.split = function () {
    var self = this;

    if (self.state() !== STATES.RUNNING) {
        throw new Error('Cannot split time on a stopwatch that is not currently running');
    }

    self.stopTime = now();
    self._state = STATES.SPLIT;
    return this.read();
};

Stopwatch.prototype.unsplit = function () {
    var self = this;

    if (self.state() !== STATES.SPLIT) {
        throw new Error('Cannot unsplit time on a stopwatch that is not currently split');
    }

    self.stopTime = null;
    self._state = STATES.RUNNING;
    return this.read();
};

Stopwatch.prototype.state = function () {
    return this._state;
};

Stopwatch.prototype.reset = function () {
    var self = this;
    self._state = STATES.INIT;
    self.startTime = null;
    self.stopTime = null;
};

Stopwatch.prototype.splitTime = function () {
    var self = this;

    if (self.state() !== STATES.SPLIT) {
        throw new Error('Cannot get split time on a stopwatch that is not currently split');
    }

    var startTime = self.startTime;
    var stopTime = self.stopTime;
    var delta = calculateDelta(startTime, stopTime);
    return delta;

    function calculateDelta(start, end) {
        return end - start;
    }
};

Stopwatch.prototype.read = Stopwatch.prototype.time = function () {
    var self = this;
    var startTime = self.startTime;
    var nowTime;
    var delta;

    if (startTime) {
        if (self.stopTime) {
            nowTime = self.stopTime;
        } else {
            nowTime = now();
        }

        delta = calculateDelta(startTime, nowTime);
    } else {
        nowTime = undefined;
        delta = NaN;
    }

    return delta;

    function calculateDelta(start, end) {
        return end - start;
    }
};

Stopwatch.prototype.toString = function () {
    var self = this;
    var template;
    template = "[{name} => state:{state}; value:{value}]";
    return format(template, {name: self.name(), state: self.state(), value: self.read().toFixed(2)});
};

module.exports = Stopwatch;