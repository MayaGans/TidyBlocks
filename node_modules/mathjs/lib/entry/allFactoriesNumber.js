"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = void 0;

var allFactories = _interopRequireWildcard(require("../factoriesNumber"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// creating all factories here in a separate file is needed to get tree-shaking working
var all = allFactories;
exports.all = all;