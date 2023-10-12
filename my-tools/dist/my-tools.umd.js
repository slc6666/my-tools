(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["my-tools"] = factory();
	else
		root["my-tools"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 7045:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var makeBuiltIn = __webpack_require__(6339);
var defineProperty = __webpack_require__(3070);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(7854);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 4154:
/***/ (function(module) {


var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8113:
/***/ (function(module) {


module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 7293:
/***/ (function(module) {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aCallable = __webpack_require__(9662);
var isNullOrUndefined = __webpack_require__(8554);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {


module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_WEAK_MAP = __webpack_require__(4811);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 614:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 8554:
/***/ (function(module) {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(614);
var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {


module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isNullOrUndefined = __webpack_require__(8554);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.33.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.33.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 6293:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(648);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module) {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(6293);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 8053:
/***/ (function(module) {


var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 4811:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(6293);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 6229:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var defineBuiltIn = __webpack_require__(8052);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(1340);
var validateArgumentsLength = __webpack_require__(8053);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var append = uncurryThis(URLSearchParamsPrototype.append);
var $delete = uncurryThis(URLSearchParamsPrototype['delete']);
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);
var push = uncurryThis([].push);
var params = new $URLSearchParams('a=1&a=2&b=3');

params['delete']('a', 1);
// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
params['delete']('b', undefined);

if (params + '' !== 'a=2') {
  defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $delete(this, name);
    var entries = [];
    forEach(this, function (v, k) { // also validates `this`
      push(entries, { key: k, value: v });
    });
    validateArgumentsLength(length, 1);
    var key = toString(name);
    var value = toString($value);
    var index = 0;
    var dindex = 0;
    var found = false;
    var entriesLength = entries.length;
    var entry;
    while (index < entriesLength) {
      entry = entries[index++];
      if (found || entry.key === key) {
        found = true;
        $delete(this, entry.key);
      } else dindex++;
    }
    while (dindex < entriesLength) {
      entry = entries[dindex++];
      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
    }
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 7330:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var defineBuiltIn = __webpack_require__(8052);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(1340);
var validateArgumentsLength = __webpack_require__(8053);

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype = $URLSearchParams.prototype;
var getAll = uncurryThis(URLSearchParamsPrototype.getAll);
var $has = uncurryThis(URLSearchParamsPrototype.has);
var params = new $URLSearchParams('a=1');

// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
if (params.has('a', 2) || !params.has('a', undefined)) {
  defineBuiltIn(URLSearchParamsPrototype, 'has', function has(name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $has(this, name);
    var values = getAll(this, name); // also validates `this`
    validateArgumentsLength(length, 1);
    var value = toString($value);
    var index = 0;
    while (index < values.length) {
      if (values[index++] === value) return true;
    } return false;
  }, { enumerable: true, unsafe: true });
}


/***/ }),

/***/ 2062:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(9781);
var uncurryThis = __webpack_require__(1702);
var defineBuiltInAccessor = __webpack_require__(7045);

var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
    get: function size() {
      var count = 0;
      forEach(this, function () { count++; });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  commonDialog: function() { return /* reexport */ components_commonDialog; },
  myBtn: function() { return /* reexport */ components_myBtn; },
  request: function() { return /* reexport */ request; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/components/myBtn/index.vue?vue&type=template&id=5dd9b9e9&scoped=true&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('button', {
    staticClass: "button default",
    on: {
      "click": function ($event) {
        return _vm.handleClick('默认按钮');
      }
    }
  }, [_vm._v(" 默认按钮 ")]), _c('button', {
    staticClass: "button secondary",
    on: {
      "click": function ($event) {
        return _vm.handleClick('次要按钮');
      }
    }
  }, [_vm._v(" 次要按钮 ")]), _c('button', {
    staticClass: "button success",
    on: {
      "click": function ($event) {
        return _vm.handleClick('成功按钮');
      }
    }
  }, [_vm._v(" 成功按钮 ")]), _c('button', {
    staticClass: "button warning",
    on: {
      "click": function ($event) {
        return _vm.handleClick('警告按钮');
      }
    }
  }, [_vm._v(" 警告按钮 ")])]);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/components/myBtn/index.vue?vue&type=script&lang=js&
/* harmony default export */ var myBtnvue_type_script_lang_js_ = ({
  name: "my-btn",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    handleClick(a) {
      console.log(a);
    }
  }
});
;// CONCATENATED MODULE: ./src/package/components/myBtn/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_myBtnvue_type_script_lang_js_ = (myBtnvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/components/myBtn/index.vue?vue&type=style&index=0&id=5dd9b9e9&prod&scoped=true&lang=scss&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/package/components/myBtn/index.vue?vue&type=style&index=0&id=5dd9b9e9&prod&scoped=true&lang=scss&

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/package/components/myBtn/index.vue



;


/* normalize component */

var component = normalizeComponent(
  components_myBtnvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "5dd9b9e9",
  null
  
)

/* harmony default export */ var myBtn = (component.exports);
;// CONCATENATED MODULE: ./src/package/components/myBtn/index.js

/* istanbul ignore next */
myBtn.install = function (Vue) {
  Vue.component(myBtn.name, myBtn);
};
/* harmony default export */ var components_myBtn = (myBtn);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/components/commonDialog/index.vue?vue&type=template&id=1304ba96&scoped=true&
var commonDialogvue_type_template_id_1304ba96_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('el-dialog', {
    attrs: {
      "title": _vm.title,
      "visible": _vm.dialogFormVisible
    },
    on: {
      "update:visible": function ($event) {
        _vm.dialogFormVisible = $event;
      }
    }
  }, [_c('el-form', {
    ref: "ruleForm",
    attrs: {
      "model": _vm.form,
      "rules": _vm.rules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "Username",
      "prop": "username"
    }
  }, [_c('el-input', {
    attrs: {
      "autocomplete": "off",
      "placeholder": "Username"
    },
    model: {
      value: _vm.form.username,
      callback: function ($$v) {
        _vm.$set(_vm.form, "username", $$v);
      },
      expression: "form.username"
    }
  })], 1), _c('el-form-item', {
    attrs: {
      "label": "Email Address",
      "prop": "email"
    }
  }, [_c('el-input', {
    attrs: {
      "autocomplete": "off",
      "placeholder": "Email Address"
    },
    model: {
      value: _vm.form.email,
      callback: function ($$v) {
        _vm.$set(_vm.form, "email", $$v);
      },
      expression: "form.email"
    }
  })], 1), _c('el-form-item', {
    attrs: {
      "label": "Country",
      "prop": "country"
    }
  }, [_c('el-select', {
    attrs: {
      "filterable": "",
      "placeholder": "Please Choose"
    },
    model: {
      value: _vm.form.country,
      callback: function ($$v) {
        _vm.$set(_vm.form, "country", $$v);
      },
      expression: "form.country"
    }
  }, _vm._l(_vm.countryData, function (item, i) {
    return _c('el-option', {
      key: i,
      attrs: {
        "value": item.country_code,
        "label": item.english_name
      }
    });
  }), 1)], 1), _c('el-form-item', {
    attrs: {
      "label": "Contact Number",
      "prop": "whatsApp"
    }
  }, [_c('el-input', {
    attrs: {
      "autocomplete": "off",
      "placeholder": "Example: 18250151260"
    },
    model: {
      value: _vm.form.whatsApp,
      callback: function ($$v) {
        _vm.$set(_vm.form, "whatsApp", $$v);
      },
      expression: "form.whatsApp"
    }
  })], 1)], 1), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    style: _vm.btn.style,
    attrs: {
      "type": "primary",
      "loading": _vm.loading
    },
    on: {
      "click": _vm.handleSubmit
    }
  }, [_vm._v(" " + _vm._s(_vm.btn.text) + " ")])], 1)], 1);
};
var commonDialogvue_type_template_id_1304ba96_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./src/package/utils/countryData.js
let countryData = [{
  english_name: "Andorra",
  chinese_name: "安道尔",
  country_code: "AD",
  phone_code: "376"
}, {
  english_name: "United Arab Emirates",
  chinese_name: "阿拉伯联合酋长国",
  country_code: "AE",
  phone_code: "971"
}, {
  english_name: "Afghanistan",
  chinese_name: "阿富汗",
  country_code: "AF",
  phone_code: "93"
}, {
  english_name: "Antigua and Barbuda",
  chinese_name: "安提瓜和巴布达",
  country_code: "AG",
  phone_code: "1268"
}, {
  english_name: "Anguilla",
  chinese_name: "安圭拉",
  country_code: "AI",
  phone_code: "1264"
}, {
  english_name: "Albania",
  chinese_name: "阿尔巴尼亚",
  country_code: "AL",
  phone_code: "355"
}, {
  english_name: "Armenia",
  chinese_name: "亚美尼亚",
  country_code: "AM",
  phone_code: "374"
}, {
  english_name: "Angola",
  chinese_name: "安哥拉",
  country_code: "AO",
  phone_code: "244"
}, {
  english_name: "Argentina",
  chinese_name: "阿根廷",
  country_code: "AR",
  phone_code: "54"
}, {
  english_name: "American Samoa",
  chinese_name: "美属萨摩亚",
  country_code: "AS",
  phone_code: "1684"
}, {
  english_name: "Austria",
  chinese_name: "奥地利",
  country_code: "AT",
  phone_code: "43"
}, {
  english_name: "Australia",
  chinese_name: "澳大利亚",
  country_code: "AU",
  phone_code: "61"
}, {
  english_name: "Aruba",
  chinese_name: "阿鲁巴",
  country_code: "AW",
  phone_code: "297"
}, {
  english_name: "Azerbaijan",
  chinese_name: "阿塞拜疆",
  country_code: "AZ",
  phone_code: "994"
}, {
  english_name: "Bosniaand Herzegovina",
  chinese_name: "波斯尼亚和黑塞哥维那",
  country_code: "BA",
  phone_code: "387"
}, {
  english_name: "Barbados",
  chinese_name: "巴巴多斯",
  country_code: "BB",
  phone_code: "1246"
}, {
  english_name: "Bangladesh",
  chinese_name: "孟加拉国",
  country_code: "BD",
  phone_code: "880"
}, {
  english_name: "Belgium",
  chinese_name: "比利时",
  country_code: "BE",
  phone_code: "32"
}, {
  english_name: "Burkina Faso",
  chinese_name: "布基纳法索",
  country_code: "BF",
  phone_code: "226"
}, {
  english_name: "Bulgaria",
  chinese_name: "保加利亚",
  country_code: "BG",
  phone_code: "359"
}, {
  english_name: "Bahrain",
  chinese_name: "巴林",
  country_code: "BH",
  phone_code: "973"
}, {
  english_name: "Burundi",
  chinese_name: "布隆迪",
  country_code: "BI",
  phone_code: "257"
}, {
  english_name: "Benin",
  chinese_name: "贝宁",
  country_code: "BJ",
  phone_code: "229"
}, {
  english_name: "Bermuda",
  chinese_name: "百慕大群岛",
  country_code: "BM",
  phone_code: "1441"
}, {
  english_name: "Brunei",
  chinese_name: "文莱",
  country_code: "BN",
  phone_code: "673"
}, {
  english_name: "Bolivia",
  chinese_name: "玻利维亚",
  country_code: "BO",
  phone_code: "591"
}, {
  english_name: "Caribisch Nederland",
  chinese_name: "荷兰加勒比",
  country_code: "BQ",
  phone_code: "599"
}, {
  english_name: "Brazil",
  chinese_name: "巴西",
  country_code: "BR",
  phone_code: "55"
}, {
  english_name: "Bahamas",
  chinese_name: "巴哈马",
  country_code: "BS",
  phone_code: "1242"
}, {
  english_name: "Bhutan",
  chinese_name: "不丹",
  country_code: "BT",
  phone_code: "975"
}, {
  english_name: "Botswana",
  chinese_name: "博茨瓦纳",
  country_code: "BW",
  phone_code: "267"
}, {
  english_name: "Belarus",
  chinese_name: "白俄罗斯",
  country_code: "BY",
  phone_code: "375"
}, {
  english_name: "Belize",
  chinese_name: "伯利兹",
  country_code: "BZ",
  phone_code: "501"
}, {
  english_name: "Canada",
  chinese_name: "加拿大",
  country_code: "CA",
  phone_code: "1"
}, {
  english_name: "Democratic Republic of theCongo",
  chinese_name: "刚果民主共和国",
  country_code: "CD",
  phone_code: "243"
}, {
  english_name: "Central African Republic",
  chinese_name: "中非共和国",
  country_code: "CF",
  phone_code: "236"
}, {
  english_name: "Republic Of The Congo",
  chinese_name: "刚果共和国",
  country_code: "CG",
  phone_code: "242"
}, {
  english_name: "Switzerland",
  chinese_name: "瑞士",
  country_code: "CH",
  phone_code: "41"
}, {
  english_name: "Ivory Coast",
  chinese_name: "象牙海岸",
  country_code: "CI",
  phone_code: "225"
}, {
  english_name: "Cook Islands",
  chinese_name: "库克群岛",
  country_code: "CK",
  phone_code: "682"
}, {
  english_name: "Chile",
  chinese_name: "智利",
  country_code: "CL",
  phone_code: "56"
}, {
  english_name: "Cameroon",
  chinese_name: "喀麦隆",
  country_code: "CM",
  phone_code: "237"
}, {
  english_name: "China",
  chinese_name: "中国",
  country_code: "CN",
  phone_code: "86"
}, {
  english_name: "Colombia",
  chinese_name: "哥伦比亚",
  country_code: "CO",
  phone_code: "57"
}, {
  english_name: "CostaRica",
  chinese_name: "哥斯达黎加",
  country_code: "CR",
  phone_code: "506"
}, {
  english_name: "Cuba",
  chinese_name: "古巴",
  country_code: "CU",
  phone_code: "53"
}, {
  english_name: "Cape Verde",
  chinese_name: "开普",
  country_code: "CV",
  phone_code: "238"
}, {
  english_name: "Curacao",
  chinese_name: "库拉索",
  country_code: "CW",
  phone_code: "599"
}, {
  english_name: "Cyprus",
  chinese_name: "塞浦路斯",
  country_code: "CY",
  phone_code: "357"
}, {
  english_name: "Czech",
  chinese_name: "捷克",
  country_code: "CZ",
  phone_code: "420"
}, {
  english_name: "Germany",
  chinese_name: "德国",
  country_code: "DE",
  phone_code: "49"
}, {
  english_name: "Djibouti",
  chinese_name: "吉布提",
  country_code: "DJ",
  phone_code: "253"
}, {
  english_name: "Denmark",
  chinese_name: "丹麦",
  country_code: "DK",
  phone_code: "45"
}, {
  english_name: "Dominica",
  chinese_name: "多米尼加",
  country_code: "DM",
  phone_code: "1767"
}, {
  english_name: "dominican republic",
  chinese_name: "多米尼加共和国",
  country_code: "DO",
  phone_code: "1809"
}, {
  english_name: "Algeria",
  chinese_name: "阿尔及利亚",
  country_code: "DZ",
  phone_code: "213"
}, {
  english_name: "Ecuador",
  chinese_name: "厄瓜多尔",
  country_code: "EC",
  phone_code: "593"
}, {
  english_name: "Estonia",
  chinese_name: "爱沙尼亚",
  country_code: "EE",
  phone_code: "372"
}, {
  english_name: "Egypt",
  chinese_name: "埃及",
  country_code: "EG",
  phone_code: "20"
}, {
  english_name: "Eritrea",
  chinese_name: "厄立特里亚",
  country_code: "ER",
  phone_code: "291"
}, {
  english_name: "Spain",
  chinese_name: "西班牙",
  country_code: "ES",
  phone_code: "34"
}, {
  english_name: "Ethiopia",
  chinese_name: "埃塞俄比亚",
  country_code: "ET",
  phone_code: "251"
}, {
  english_name: "Finland",
  chinese_name: "芬兰",
  country_code: "FI",
  phone_code: "358"
}, {
  english_name: "Fiji",
  chinese_name: "斐济",
  country_code: "FJ",
  phone_code: "679"
}, {
  english_name: "Micronesia",
  chinese_name: "密克罗尼西亚",
  country_code: "FM",
  phone_code: "691"
}, {
  english_name: "Faroe Islands",
  chinese_name: "法罗群岛",
  country_code: "FO",
  phone_code: "298"
}, {
  english_name: "France",
  chinese_name: "法国",
  country_code: "FR",
  phone_code: "33"
}, {
  english_name: "Gabon",
  chinese_name: "加蓬",
  country_code: "GA",
  phone_code: "241"
}, {
  english_name: "United Kingdom",
  chinese_name: "英国",
  country_code: "GB",
  phone_code: "44"
}, {
  english_name: "Grenada",
  chinese_name: "格林纳达",
  country_code: "GD",
  phone_code: "1473"
}, {
  english_name: "Georgia",
  chinese_name: "格鲁吉亚",
  country_code: "GE",
  phone_code: "995"
}, {
  english_name: "French Guiana",
  chinese_name: "法属圭亚那",
  country_code: "GF",
  phone_code: "594"
}, {
  english_name: "Ghana",
  chinese_name: "加纳",
  country_code: "GH",
  phone_code: "233"
}, {
  english_name: "Gibraltar",
  chinese_name: "直布罗陀",
  country_code: "GI",
  phone_code: "350"
}, {
  english_name: "Greenland",
  chinese_name: "格陵兰岛",
  country_code: "GL",
  phone_code: "299"
}, {
  english_name: "Gambia",
  chinese_name: "冈比亚",
  country_code: "GM",
  phone_code: "220"
}, {
  english_name: "Guinea",
  chinese_name: "几内亚",
  country_code: "GN",
  phone_code: "224"
}, {
  english_name: "Guadeloupe",
  chinese_name: "瓜德罗普岛",
  country_code: "GP",
  phone_code: "590"
}, {
  english_name: "Equatorial Guinea",
  chinese_name: "赤道几内亚",
  country_code: "GQ",
  phone_code: "240"
}, {
  english_name: "Greece",
  chinese_name: "希腊",
  country_code: "GR",
  phone_code: "30"
}, {
  english_name: "Guatemala",
  chinese_name: "瓜地马拉",
  country_code: "GT",
  phone_code: "502"
}, {
  english_name: "Guam",
  chinese_name: "关岛",
  country_code: "GU",
  phone_code: "1671"
}, {
  english_name: "Guinea-Bissau",
  chinese_name: "几内亚比绍共和国",
  country_code: "GW",
  phone_code: "245"
}, {
  english_name: "Guyana",
  chinese_name: "圭亚那",
  country_code: "GY",
  phone_code: "592"
}, {
  english_name: "Hong Kong",
  chinese_name: "中国香港",
  country_code: "HK",
  phone_code: "852"
}, {
  english_name: "Honduras",
  chinese_name: "洪都拉斯",
  country_code: "HN",
  phone_code: "504"
}, {
  english_name: "Croatia",
  chinese_name: "克罗地亚",
  country_code: "HR",
  phone_code: "385"
}, {
  english_name: "Haiti",
  chinese_name: "海地",
  country_code: "HT",
  phone_code: "509"
}, {
  english_name: "Hungary",
  chinese_name: "匈牙利",
  country_code: "HU",
  phone_code: "36"
}, {
  english_name: "Indonesia",
  chinese_name: "印度尼西亚",
  country_code: "ID",
  phone_code: "62"
}, {
  english_name: "Ireland",
  chinese_name: "爱尔兰",
  country_code: "IE",
  phone_code: "353"
}, {
  english_name: "Israel",
  chinese_name: "以色列",
  country_code: "IL",
  phone_code: "972"
}, {
  english_name: "India",
  chinese_name: "印度",
  country_code: "IN",
  phone_code: "91"
}, {
  english_name: "Iraq",
  chinese_name: "伊拉克",
  country_code: "IQ",
  phone_code: "964"
}, {
  english_name: "Iran",
  chinese_name: "伊朗",
  country_code: "IR",
  phone_code: "98"
}, {
  english_name: "Iceland",
  chinese_name: "冰岛",
  country_code: "IS",
  phone_code: "354"
}, {
  english_name: "Italy",
  chinese_name: "意大利",
  country_code: "IT",
  phone_code: "39"
}, {
  english_name: "Jamaica",
  chinese_name: "牙买加",
  country_code: "JM",
  phone_code: "1876"
}, {
  english_name: "Jordan",
  chinese_name: "约旦",
  country_code: "JO",
  phone_code: "962"
}, {
  english_name: "Japan",
  chinese_name: "日本",
  country_code: "JP",
  phone_code: "81"
}, {
  english_name: "Kenya",
  chinese_name: "肯尼亚",
  country_code: "KE",
  phone_code: "254"
}, {
  english_name: "Kyrgyzstan",
  chinese_name: "吉尔吉斯斯坦",
  country_code: "KG",
  phone_code: "996"
}, {
  english_name: "Cambodia",
  chinese_name: "柬埔寨",
  country_code: "KH",
  phone_code: "855"
}, {
  english_name: "Kiribati",
  chinese_name: "基里巴斯",
  country_code: "KI",
  phone_code: "686"
}, {
  english_name: "Comoros",
  chinese_name: "科摩罗",
  country_code: "KM",
  phone_code: "269"
}, {
  english_name: "Saint Kitts and Nevis",
  chinese_name: "圣基茨和尼维斯",
  country_code: "KN",
  phone_code: "1869"
}, {
  english_name: "Korea Democratic Rep.",
  chinese_name: "朝鲜",
  country_code: "KP",
  phone_code: "850"
}, {
  english_name: "South Korea",
  chinese_name: "韩国",
  country_code: "KR",
  phone_code: "82"
}, {
  english_name: "Kuwait",
  chinese_name: "科威特",
  country_code: "KW",
  phone_code: "965"
}, {
  english_name: "Cayman Islands",
  chinese_name: "开曼群岛",
  country_code: "KY",
  phone_code: "1345"
}, {
  english_name: "Kazakhstan",
  chinese_name: "哈萨克斯坦",
  country_code: "KZ",
  phone_code: "7"
}, {
  english_name: "Laos",
  chinese_name: "老挝",
  country_code: "LA",
  phone_code: "856"
}, {
  english_name: "Lebanon",
  chinese_name: "黎巴嫩",
  country_code: "LB",
  phone_code: "961"
}, {
  english_name: "Saint Lucia",
  chinese_name: "圣露西亚",
  country_code: "LC",
  phone_code: "1758"
}, {
  english_name: "Liechtenstein",
  chinese_name: "列支敦士登",
  country_code: "LI",
  phone_code: "423"
}, {
  english_name: "Sri Lanka",
  chinese_name: "斯里兰卡",
  country_code: "LK",
  phone_code: "94"
}, {
  english_name: "Liberia",
  chinese_name: "利比里亚",
  country_code: "LR",
  phone_code: "231"
}, {
  english_name: "Lesotho",
  chinese_name: "莱索托",
  country_code: "LS",
  phone_code: "266"
}, {
  english_name: "Lithuania",
  chinese_name: "立陶宛",
  country_code: "LT",
  phone_code: "370"
}, {
  english_name: "Luxembourg",
  chinese_name: "卢森堡",
  country_code: "LU",
  phone_code: "352"
}, {
  english_name: "Latvia",
  chinese_name: "拉脱维亚",
  country_code: "LV",
  phone_code: "371"
}, {
  english_name: "Libya",
  chinese_name: "利比亚",
  country_code: "LY",
  phone_code: "218"
}, {
  english_name: "Morocco",
  chinese_name: "摩洛哥",
  country_code: "MA",
  phone_code: "212"
}, {
  english_name: "Monaco",
  chinese_name: "摩纳哥",
  country_code: "MC",
  phone_code: "377"
}, {
  english_name: "Moldova",
  chinese_name: "摩尔多瓦",
  country_code: "MD",
  phone_code: "373"
}, {
  english_name: "Montenegro",
  chinese_name: "黑山",
  country_code: "ME",
  phone_code: "382"
}, {
  english_name: "Madagascar",
  chinese_name: "马达加斯加",
  country_code: "MG",
  phone_code: "261"
}, {
  english_name: "Marshall Islands",
  chinese_name: "马绍尔群岛",
  country_code: "MH",
  phone_code: "692"
}, {
  english_name: "Macedonia",
  chinese_name: "马其顿",
  country_code: "MK",
  phone_code: "389"
}, {
  english_name: "Mali",
  chinese_name: "马里",
  country_code: "ML",
  phone_code: "223"
}, {
  english_name: "Myanmar",
  chinese_name: "缅甸",
  country_code: "MM",
  phone_code: "95"
}, {
  english_name: "Mongolia",
  chinese_name: "蒙古",
  country_code: "MN",
  phone_code: "976"
}, {
  english_name: "Macau",
  chinese_name: "中国澳门",
  country_code: "MO",
  phone_code: "853"
}, {
  english_name: "Mauritania",
  chinese_name: "毛里塔尼亚",
  country_code: "MR",
  phone_code: "222"
}, {
  english_name: "Montserrat",
  chinese_name: "蒙特塞拉特岛",
  country_code: "MS",
  phone_code: "1664"
}, {
  english_name: "Malta",
  chinese_name: "马耳他",
  country_code: "MT",
  phone_code: "356"
}, {
  english_name: "Mauritius",
  chinese_name: "毛里求斯",
  country_code: "MU",
  phone_code: "230"
}, {
  english_name: "Maldives",
  chinese_name: "马尔代夫",
  country_code: "MV",
  phone_code: "960"
}, {
  english_name: "Malawi",
  chinese_name: "马拉维",
  country_code: "MW",
  phone_code: "265"
}, {
  english_name: "Mexico",
  chinese_name: "墨西哥",
  country_code: "MX",
  phone_code: "52"
}, {
  english_name: "Malaysia",
  chinese_name: "马来西亚",
  country_code: "MY",
  phone_code: "60"
}, {
  english_name: "Mozambique",
  chinese_name: "莫桑比克",
  country_code: "MZ",
  phone_code: "258"
}, {
  english_name: "Namibia",
  chinese_name: "纳米比亚",
  country_code: "NA",
  phone_code: "264"
}, {
  english_name: "New Caledonia",
  chinese_name: "新喀里多尼亚",
  country_code: "NC",
  phone_code: "687"
}, {
  english_name: "Niger",
  chinese_name: "尼日尔",
  country_code: "NE",
  phone_code: "227"
}, {
  english_name: "Nigeria",
  chinese_name: "尼日利亚",
  country_code: "NG",
  phone_code: "234"
}, {
  english_name: "Nicaragua",
  chinese_name: "尼加拉瓜",
  country_code: "NI",
  phone_code: "505"
}, {
  english_name: "Netherlands",
  chinese_name: "荷兰",
  country_code: "NL",
  phone_code: "31"
}, {
  english_name: "Norway",
  chinese_name: "挪威",
  country_code: "NO",
  phone_code: "47"
}, {
  english_name: "Nepal",
  chinese_name: "尼泊尔",
  country_code: "NP",
  phone_code: "977"
}, {
  english_name: "Nauru",
  chinese_name: "拿鲁岛",
  country_code: "NR",
  phone_code: "674"
}, {
  english_name: "New Zealand",
  chinese_name: "新西兰",
  country_code: "NZ",
  phone_code: "64"
}, {
  english_name: "Oman",
  chinese_name: "阿曼",
  country_code: "OM",
  phone_code: "968"
}, {
  english_name: "Panama",
  chinese_name: "巴拿马",
  country_code: "PA",
  phone_code: "507"
}, {
  english_name: "Peru",
  chinese_name: "秘鲁",
  country_code: "PE",
  phone_code: "51"
}, {
  english_name: "French Polynesia",
  chinese_name: "法属波利尼西亚",
  country_code: "PF",
  phone_code: "689"
}, {
  english_name: "Papua New Guinea",
  chinese_name: "巴布亚新几内亚",
  country_code: "PG",
  phone_code: "675"
}, {
  english_name: "Philippines",
  chinese_name: "菲律宾",
  country_code: "PH",
  phone_code: "63"
}, {
  english_name: "Pakistan",
  chinese_name: "巴基斯坦",
  country_code: "PK",
  phone_code: "92"
}, {
  english_name: "Poland",
  chinese_name: "波兰",
  country_code: "PL",
  phone_code: "48"
}, {
  english_name: "Saint Pierreand Miquelon",
  chinese_name: "圣彼埃尔和密克隆岛",
  country_code: "PM",
  phone_code: "508"
}, {
  english_name: "Puerto Rico",
  chinese_name: "波多黎各",
  country_code: "PR",
  phone_code: "1787"
}, {
  english_name: "Portugal",
  chinese_name: "葡萄牙",
  country_code: "PT",
  phone_code: "351"
}, {
  english_name: "Palau",
  chinese_name: "帕劳",
  country_code: "PW",
  phone_code: "680"
}, {
  english_name: "Paraguay",
  chinese_name: "巴拉圭",
  country_code: "PY",
  phone_code: "595"
}, {
  english_name: "Qatar",
  chinese_name: "卡塔尔",
  country_code: "QA",
  phone_code: "974"
}, {
  english_name: "Réunion Island",
  chinese_name: "留尼汪",
  country_code: "RE",
  phone_code: "262"
}, {
  english_name: "Romania",
  chinese_name: "罗马尼亚",
  country_code: "RO",
  phone_code: "40"
}, {
  english_name: "Serbia",
  chinese_name: "塞尔维亚",
  country_code: "RS",
  phone_code: "381"
}, {
  english_name: "Russia",
  chinese_name: "俄罗斯",
  country_code: "RU",
  phone_code: "7"
}, {
  english_name: "Rwanda",
  chinese_name: "卢旺达",
  country_code: "RW",
  phone_code: "250"
}, {
  english_name: "Saudi Arabia",
  chinese_name: "沙特阿拉伯",
  country_code: "SA",
  phone_code: "966"
}, {
  english_name: "Solomon Islands",
  chinese_name: "所罗门群岛",
  country_code: "SB",
  phone_code: "677"
}, {
  english_name: "Seychelles",
  chinese_name: "塞舌尔",
  country_code: "SC",
  phone_code: "248"
}, {
  english_name: "Sudan",
  chinese_name: "苏丹",
  country_code: "SD",
  phone_code: "249"
}, {
  english_name: "Sweden",
  chinese_name: "瑞典",
  country_code: "SE",
  phone_code: "46"
}, {
  english_name: "Singapore",
  chinese_name: "新加坡",
  country_code: "SG",
  phone_code: "65"
}, {
  english_name: "Slovenia",
  chinese_name: "斯洛文尼亚",
  country_code: "SI",
  phone_code: "386"
}, {
  english_name: "Slovakia",
  chinese_name: "斯洛伐克",
  country_code: "SK",
  phone_code: "421"
}, {
  english_name: "Sierra Leone",
  chinese_name: "塞拉利昂",
  country_code: "SL",
  phone_code: "232"
}, {
  english_name: "San Marino",
  chinese_name: "圣马力诺",
  country_code: "SM",
  phone_code: "378"
}, {
  english_name: "Senegal",
  chinese_name: "塞内加尔",
  country_code: "SN",
  phone_code: "221"
}, {
  english_name: "Somalia",
  chinese_name: "索马里",
  country_code: "SO",
  phone_code: "252"
}, {
  english_name: "Suriname",
  chinese_name: "苏里南",
  country_code: "SR",
  phone_code: "597"
}, {
  english_name: "Sao Tome and Principe",
  chinese_name: "圣多美和普林西比",
  country_code: "ST",
  phone_code: "239"
}, {
  english_name: "ElSalvador",
  chinese_name: "萨尔瓦多",
  country_code: "SV",
  phone_code: "503"
}, {
  english_name: "Syria",
  chinese_name: "叙利亚",
  country_code: "SY",
  phone_code: "963"
}, {
  english_name: "Swaziland",
  chinese_name: "斯威士兰",
  country_code: "SZ",
  phone_code: "268"
}, {
  english_name: "Turksand Caicos Islands",
  chinese_name: "特克斯和凯科斯群岛",
  country_code: "TC",
  phone_code: "1649"
}, {
  english_name: "Chad",
  chinese_name: "乍得",
  country_code: "TD",
  phone_code: "235"
}, {
  english_name: "Togo",
  chinese_name: "多哥",
  country_code: "TG",
  phone_code: "228"
}, {
  english_name: "Thailand",
  chinese_name: "泰国",
  country_code: "TH",
  phone_code: "66"
}, {
  english_name: "Tajikistan",
  chinese_name: "塔吉克斯坦",
  country_code: "TJ",
  phone_code: "992"
}, {
  english_name: "East Timor",
  chinese_name: "东帝汶",
  country_code: "TL",
  phone_code: "670"
}, {
  english_name: "Turkmenistan",
  chinese_name: "土库曼斯坦",
  country_code: "TM",
  phone_code: "993"
}, {
  english_name: "Tunisia",
  chinese_name: "突尼斯",
  country_code: "TN",
  phone_code: "216"
}, {
  english_name: "Tonga",
  chinese_name: "汤加",
  country_code: "TO",
  phone_code: "676"
}, {
  english_name: "Turkey",
  chinese_name: "土耳其",
  country_code: "TR",
  phone_code: "90"
}, {
  english_name: "Trinidadand Tobago",
  chinese_name: "特立尼达和多巴哥",
  country_code: "TT",
  phone_code: "1868"
}, {
  english_name: "Taiwan",
  chinese_name: "中国台湾",
  country_code: "TW",
  phone_code: "886"
}, {
  english_name: "Tanzania",
  chinese_name: "坦桑尼亚",
  country_code: "TZ",
  phone_code: "255"
}, {
  english_name: "Ukraine",
  chinese_name: "乌克兰",
  country_code: "UA",
  phone_code: "380"
}, {
  english_name: "Uganda",
  chinese_name: "乌干达",
  country_code: "UG",
  phone_code: "256"
}, {
  english_name: "United States",
  chinese_name: "美国",
  country_code: "US",
  phone_code: "1"
}, {
  english_name: "Uruguay",
  chinese_name: "乌拉圭",
  country_code: "UY",
  phone_code: "598"
}, {
  english_name: "Uzbekistan",
  chinese_name: "乌兹别克斯坦",
  country_code: "UZ",
  phone_code: "998"
}, {
  english_name: "Saint Vincent and The Grenadines",
  chinese_name: "圣文森特和格林纳丁斯",
  country_code: "VC",
  phone_code: "1784"
}, {
  english_name: "Venezuela",
  chinese_name: "委内瑞拉",
  country_code: "VE",
  phone_code: "58"
}, {
  english_name: "VirginIslands,British",
  chinese_name: "英属处女群岛",
  country_code: "VG",
  phone_code: "1284"
}, {
  english_name: "Vietnam",
  chinese_name: "越南",
  country_code: "VN",
  phone_code: "84"
}, {
  english_name: "Vanuatu",
  chinese_name: "瓦努阿图",
  country_code: "VU",
  phone_code: "678"
}, {
  english_name: "Samoa",
  chinese_name: "萨摩亚",
  country_code: "WS",
  phone_code: "685"
}, {
  english_name: "Yemen",
  chinese_name: "也门",
  country_code: "YE",
  phone_code: "967"
}, {
  english_name: "Mayotte",
  chinese_name: "马约特",
  country_code: "YT",
  phone_code: "269"
}, {
  english_name: "South Africa",
  chinese_name: "南非",
  country_code: "ZA",
  phone_code: "27"
}, {
  english_name: "Zambia",
  chinese_name: "赞比亚",
  country_code: "ZM",
  phone_code: "260"
}, {
  english_name: "Zimbabwe",
  chinese_name: "津巴布韦",
  country_code: "ZW",
  phone_code: "263"
}];
/* harmony default export */ var utils_countryData = (countryData);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/components/commonDialog/index.vue?vue&type=script&lang=js&

/* harmony default export */ var commonDialogvue_type_script_lang_js_ = ({
  name: "commonDialog",
  components: {},
  props: {
    title: {
      type: String,
      default: "Request a Brochure"
    },
    btn: {
      type: Object,
      default: () => {
        return {
          style: {},
          text: "Submit"
        };
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    visiable: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      downloadUrl: "",
      form: {
        whatsApp: "",
        country: "",
        email: "",
        username: ""
      },
      rules: {
        username: [{
          required: true,
          message: "Please Enter",
          trigger: "blur"
        }],
        whatsApp: [{
          required: true,
          message: "Please Enter",
          trigger: "blur"
        }],
        country: [{
          required: true,
          message: "Please Select",
          trigger: "blur"
        }],
        email: [{
          required: true,
          message: "Please Enter",
          trigger: "blur"
        }, {
          type: "email",
          message: "Please input the correct email address",
          trigger: ["blur"]
        }]
      },
      countryData: utils_countryData
    };
  },
  computed: {
    dialogFormVisible: {
      get() {
        return this.visiable;
      },
      set(val) {
        this.$emit("update:visiable", val);
      }
    }
  },
  mounted() {},
  methods: {
    handleSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$emit("valid", {
            countryMsg: this.countryData.find(item => item.country_code === this.form.country),
            ...this.form
          });
        }
      });
    }
  }
});
;// CONCATENATED MODULE: ./src/package/components/commonDialog/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_commonDialogvue_type_script_lang_js_ = (commonDialogvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/components/commonDialog/index.vue?vue&type=style&index=0&id=1304ba96&prod&lang=scss&scoped=true&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/package/components/commonDialog/index.vue?vue&type=style&index=0&id=1304ba96&prod&lang=scss&scoped=true&

;// CONCATENATED MODULE: ./src/package/components/commonDialog/index.vue



;


/* normalize component */

var commonDialog_component = normalizeComponent(
  components_commonDialogvue_type_script_lang_js_,
  commonDialogvue_type_template_id_1304ba96_scoped_true_render,
  commonDialogvue_type_template_id_1304ba96_scoped_true_staticRenderFns,
  false,
  null,
  "1304ba96",
  null
  
)

/* harmony default export */ var commonDialog = (commonDialog_component.exports);
;// CONCATENATED MODULE: ./src/package/components/commonDialog/index.js

/* istanbul ignore next */
commonDialog.install = function (Vue) {
  Vue.component(commonDialog.name, commonDialog);
};
/* harmony default export */ var components_commonDialog = (commonDialog);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.delete.js
var web_url_search_params_delete = __webpack_require__(6229);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.has.js
var web_url_search_params_has = __webpack_require__(7330);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.size.js
var web_url_search_params_size = __webpack_require__(2062);
;// CONCATENATED MODULE: ./src/package/utils/tools.js



// 通用的 fetch 请求函数
function customFetch(url, method, data = null) {
  const headers = {
    // 可以设置请求头，例如 'Content-Type' 或 'Authorization'
    "Content-Type": "application/json;charset=UTF-8"
  };

  // 如果是 GET 请求，将参数附加到 URL 的查询字符串中
  if (method === "GET" && data) {
    const params = new URLSearchParams(data);
    console.log(params.toString());
    url = `${url}?${params.toString()}`;
    console.log(url);
  }
  const options = {
    method,
    headers
    // 这里可以根据需要设置其他选项，如身份验证、跨域请求等
  };

  if (method === "POST" && data) {
    options.body = JSON.stringify(data);
  }

  // 发起 fetch 请求
  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // 解析响应数据
  }).catch(error => {
    console.error("Fetch error:", error);
  });
}

;// CONCATENATED MODULE: ./src/package/utils/request.js

/**
 * Retrieves data from the specified API endpoint.
 *
 * @param {string} type - The type of data to retrieve (options: "phone","whatsapp").
 * @param {string} phone_number - The phone number to validate.(example: "15812341929")
 * @param {string} country_code - The country code of the phone number. (example: "CN")
 * @return {Promise} A promise that resolves to the retrieved data.
 */
const checkNumber = async (type = "phone", phone_number, country_code) => {
  const url = `https://publicsys.spotoclub.net/api/tool/${type}-validate`;
  return await customFetch(url, "GET", {
    phone_number,
    country_code
  });
};
/**
 * Retrieves the IP address from the specified URL.
 *
 * @return {Promise<string>} The IP address as a string.
 */
const getIP = async () => {
  const url = "https://publicsys.spotoclub.net/api/tool/getdefaultipinfo";
  return await customFetch(url, "GET");
};
/* harmony default export */ var request = ({
  getIP,
  checkNumber
});
;// CONCATENATED MODULE: ./src/package/index.js




;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js



}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=my-tools.umd.js.map