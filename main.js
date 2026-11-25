(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.3/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{tail: tail, nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\u000A    ',
		A2($elm$core$String$split, '\u000A', str));
};
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\u000A\u000A(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\u0027' + (f + '\u0027]'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\u000A\u000A',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\u000A\u000A';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\u000A\u000A    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\u000A\u000A' + msg));
			}
		}
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Main$Line = F2(
	function (kind, content) {
		return {kind: kind, content: content};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$Output = {$: 'Output'};
var $author$project$Main$AllWork = {$: 'AllWork'};
var $author$project$Main$AllTools = {$: 'AllTools'};
var $author$project$Main$init = function (flags) {
	return _Utils_Tuple2(
		{
			dark: flags.dark,
			node: 'core',
			layer: 0,
			stage: 0,
			active: 'about',
			copied: '',
			number: '12345678',
			playing: false,
			workCat: $author$project$Main$AllWork,
			menuOpen: false,
			toolLang: $author$project$Main$AllTools,
			backupDay: 455,
			quizIndex: 0,
			termInput: '',
			termLines: _List_fromArray(
				[
					A2($author$project$Main$Line, $author$project$Main$Output, 'mojahed-shell v2.0'),
					A2($author$project$Main$Line, $author$project$Main$Output, 'Type \u0027help\u0027, or tap a command below. Try \u0027neofetch\u0027.')
				]),
			quizAnswers: _List_Nil
		},
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var $elm$html$Html$Lazy$lazy = $elm$virtual_dom$VirtualDom$lazy;
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$i = _VirtualDom_node('i');
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $author$project$Main$icon = function (name) {
	return A2(
		$elm$html$Html$i,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('fa-solid fa-' + name),
				A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
			]),
		_List_Nil);
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$section = _VirtualDom_node('section');
var $author$project$Main$card = F4(
	function (anchor, iconName, heading, children) {
		return A2(
			$elm$html$Html$section,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('card reveal'),
					$elm$html$Html$Attributes$id(anchor)
				]),
			A2(
				$elm$core$List$cons,
				A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-title')
						]),
					_List_fromArray(
						[
							$author$project$Main$icon(iconName),
							$elm$html$Html$text(heading)
						])),
				children));
	});
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$core$Basics$ge = _Utils_ge;
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$Main$Answer = function (a) {
	return {$: 'Answer', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Char$fromCode = _Char_fromCode;
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $author$project$Main$Question = F4(
	function (prompt, options, answer, why) {
		return {why: why, answer: answer, prompt: prompt, options: options};
	});
var $author$project$Main$questions = _List_fromArray(
	[
		A4(
		$author$project$Main$Question,
		'A Laravel page lists 100 posts with their authors and runs 101 queries. Best fix?',
		_List_fromArray(
			['Add a bigger server', 'Cache the whole page forever', 'Eager load: Post::with(\u0027author\u0027)', 'Add an index on posts.id']),
		2,
		'The classic N+1. Eager loading fetches every author in one extra query, so 101 queries become 2.'),
		A4(
		$author$project$Main$Question,
		'Your server has ~4 GB free for PHP and each PHP-FPM worker uses ~80 MB. A sane pm.max_children?',
		_List_fromArray(
			['10', '50', '200', '1000']),
		1,
		'4096 ÷ 80 ≈ 51. Go much higher and the server swaps, and everything gets slower, not faster.'),
		A4(
		$author$project$Main$Question,
		'Another process reads a file you\u0027re writing. Safest way to write it?',
		_List_fromArray(
			['Write directly and hope', 'Write to file.tmp, then rename()', 'Write it twice', 'sleep(1) before reading']),
		1,
		'rename() is atomic on the same filesystem. Readers see the old file or the new one, never half of one.'),
		A4(
		$author$project$Main$Question,
		'A journal entry\u0027s debits don\u0027t equal its credits. What should the system do?',
		_List_fromArray(
			['Save it and flag it', 'Post the difference to a suspense account', 'Reject the whole entry in a transaction', 'Round it']),
		2,
		'Double-entry is an invariant, not a suggestion. Reject the whole entry, and the ledger can never drift.'),
		A4(
		$author$project$Main$Question,
		'How is 1,23,45,678 read in Bangladesh?',
		_List_fromArray(
			['12 million 345 thousand…', '1 crore, 23 lakh, 45 thousand, 678', '123 lakh, 45,678', '1.2 billion']),
		1,
		'South Asian grouping: thousand, then lakh (1,00,000), then crore (1,00,00,000). Try the converter below.'),
		A4(
		$author$project$Main$Question,
		'A user uploads \u0022photo.php.jpg\u0022 into a public folder the server runs PHP in. Biggest risk?',
		_List_fromArray(
			['Disk fills up', 'Remote code execution', 'The image looks blurry', 'Nothing, it ends in .jpg']),
		1,
		'Misconfigured handlers can execute it. Store uploads outside the web root, check real MIME types, and disable execution there.')
	]);
var $author$project$Main$RestartQuiz = {$: 'RestartQuiz'};
var $author$project$Main$quizVerdict = function (score) {
	return _Utils_eq(
		score,
		$elm$core$List$length($author$project$Main$questions)) ? 'Perfect. We should work together. Seriously, get in touch.' : ((score >= 4) ? 'Senior instincts. Production would be safe with you.' : ((score >= 2) ? 'Solid start. Every one of these was learned the hard way.' : 'No worries, now you know. That\u0027s how production teaches everyone.'));
};
var $author$project$Main$NextQuestion = {$: 'NextQuestion'};
var $author$project$Main$viewQuiz = F2(
	function (index, answers) {
		var answered = _Utils_cmp(
			$elm$core$List$length(answers),
			index) > 0;
		var chosen = $elm$core$List$head(
			A2($elm$core$List$drop, index, answers));
		var total = $elm$core$List$length($author$project$Main$questions);
		var score = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				$elm$core$Basics$identity,
				A3(
					$elm$core$List$map2,
					F2(
						function (q, ans) {
							return _Utils_eq(q.answer, ans);
						}),
					$author$project$Main$questions,
					answers)));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('lab-box quiz')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('lab-head')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h3,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Main$icon('fire'),
									$elm$html$Html$text('Production Pop Quiz')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('score')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'Score ' + ($elm$core$String$fromInt(score) + ('/' + $elm$core$String$fromInt(total))))
								]))
						])),
					function () {
					if (_Utils_cmp(index, total) > -1) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('quiz-end')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('big-score')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(score) + (' / ' + $elm$core$String$fromInt(total)))
										])),
									A2(
									$elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(
											$author$project$Main$quizVerdict(score))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('row')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('btn btn-outline'),
													$elm$html$Html$Events$onClick($author$project$Main$RestartQuiz)
												]),
											_List_fromArray(
												[
													$author$project$Main$icon('rotate-right'),
													$elm$html$Html$text('Try again')
												])),
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('btn btn-primary'),
													$elm$html$Html$Attributes$href('#contact')
												]),
											_List_fromArray(
												[
													$author$project$Main$icon('paper-plane'),
													$elm$html$Html$text('Get in touch')
												]))
										]))
								]));
					} else {
						var _v0 = $elm$core$List$head(
							A2($elm$core$List$drop, index, $author$project$Main$questions));
						if (_v0.$ === 'Just') {
							var q = _v0.a;
							return A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('quiz-progress')
											]),
										A2(
											$elm$core$List$indexedMap,
											F2(
												function (qi, _v1) {
													return A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$classList(
																_List_fromArray(
																	[
																		_Utils_Tuple2('qp', true),
																		_Utils_Tuple2(
																		'now',
																		_Utils_eq(qi, index)),
																		_Utils_Tuple2(
																		'past',
																		_Utils_cmp(qi, index) < 0)
																	]))
															]),
														_List_Nil);
												}),
											$author$project$Main$questions)),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('q-prompt')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('mono-accent')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														'Q' + ($elm$core$String$fromInt(index + 1) + '. '))
													])),
												$elm$html$Html$text(q.prompt)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('options')
											]),
										A2(
											$elm$core$List$indexedMap,
											F2(
												function (oi, opt) {
													return A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$classList(
																_List_fromArray(
																	[
																		_Utils_Tuple2('option', true),
																		_Utils_Tuple2(
																		'right',
																		answered && _Utils_eq(oi, q.answer)),
																		_Utils_Tuple2(
																		'wrong',
																		answered && (_Utils_eq(
																			chosen,
																			$elm$core$Maybe$Just(oi)) && (!_Utils_eq(oi, q.answer))))
																	])),
																$elm$html$Html$Events$onClick(
																$author$project$Main$Answer(oi)),
																$elm$html$Html$Attributes$disabled(answered)
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$span,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$class('opt-key')
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		$elm$core$String$fromChar(
																			$elm$core$Char$fromCode(65 + oi)))
																	])),
																$elm$html$Html$text(opt)
															]));
												}),
											q.options)),
										answered ? A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('why')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$p,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$strong,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																_Utils_eq(
																	chosen,
																	$elm$core$Maybe$Just(q.answer)) ? '✔ Correct. ' : '✘ Not quite. ')
															])),
														$elm$html$Html$text(q.why)
													])),
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('btn btn-primary'),
														$elm$html$Html$Events$onClick($author$project$Main$NextQuestion)
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(
														_Utils_eq(index, total - 1) ? 'See my score' : 'Next question'),
														$author$project$Main$icon('arrow-right')
													]))
											])) : $elm$html$Html$text('')
									]));
						} else {
							return $elm$html$Html$text('');
						}
					}
				}()
				]));
	});
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$String$foldl = _String_foldl;
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$small = _VirtualDom_node('small');
var $elm$core$String$toInt = _String_toInt;
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $elm$core$String$filter = _String_filter;
var $elm$core$String$length = _String_length;
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $author$project$Main$SetNumber = function (a) {
	return {$: 'SetNumber', a: a};
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm$html$Html$Attributes$autocomplete = function (bool) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var $elm$core$String$slice = _String_slice;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $author$project$Main$groupWestern = function (digits) {
	return ($elm$core$String$length(digits) <= 3) ? digits : ($author$project$Main$groupWestern(
		A2($elm$core$String$dropRight, 3, digits)) + (',' + A2($elm$core$String$right, 3, digits)));
};
var $elm$core$String$trim = _String_trim;
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Main$readSouthAsian = function (n) {
	var parts = A2(
		$elm$core$List$map,
		function (_v1) {
			var amount = _v1.a;
			var unit = _v1.b;
			return $elm$core$String$trim(
				$elm$core$String$fromInt(amount) + (' ' + unit));
		},
		A2(
			$elm$core$List$filter,
			function (_v0) {
				var amount = _v0.a;
				return amount > 0;
			},
			_List_fromArray(
				[
					_Utils_Tuple2((n / 10000000) | 0, 'crore'),
					_Utils_Tuple2(
					A2($elm$core$Basics$modBy, 100, (n / 100000) | 0),
					'lakh'),
					_Utils_Tuple2(
					A2($elm$core$Basics$modBy, 100, (n / 1000) | 0),
					'thousand'),
					_Utils_Tuple2(
					A2($elm$core$Basics$modBy, 1000, n),
					'')
				])));
	return (!n) ? 'zero' : A2($elm$core$String$join, ', ', parts);
};
var $elm$core$String$map = _String_map;
var $author$project$Main$toBanglaDigits = $elm$core$String$map(
	function (c) {
		return $elm$core$Char$isDigit(c) ? $elm$core$Char$fromCode(
			(2534 + $elm$core$Char$toCode(c)) - $elm$core$Char$toCode(
				_Utils_chr('0'))) : c;
	});
var $author$project$Main$groupSouthAsian = function (digits) {
	var pairs = function (s) {
		return ($elm$core$String$length(s) <= 2) ? s : (pairs(
			A2($elm$core$String$dropRight, 2, s)) + (',' + A2($elm$core$String$right, 2, s)));
	};
	return ($elm$core$String$length(digits) <= 3) ? digits : (pairs(
		A2($elm$core$String$dropRight, 3, digits)) + (',' + A2($elm$core$String$right, 3, digits)));
};
var $author$project$Main$viewBangla = function (raw) {
	var digits = A2($elm$core$String$filter, $elm$core$Char$isDigit, raw);
	var trimmed = function () {
		var t = A3(
			$elm$core$String$foldl,
			F2(
				function (c, acc) {
					return ((acc === '') && _Utils_eq(
						c,
						_Utils_chr('0'))) ? '' : _Utils_ap(
						acc,
						$elm$core$String$fromChar(c));
				}),
			'',
			digits);
		return ((t === '') && (digits !== '')) ? '0' : t;
	}();
	var grouped = $author$project$Main$groupSouthAsian(trimmed);
	var reading = ($elm$core$String$length(trimmed) > 15) ? 'That\u0027s beyond what I\u0027d ever invoice. Try something smaller.' : A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$author$project$Main$readSouthAsian,
			$elm$core$String$toInt(trimmed)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('lab-box')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lab-head')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h3,
						_List_Nil,
						_List_fromArray(
							[
								$author$project$Main$icon('language'),
								$elm$html$Html$text('Numbers, the Bangladeshi Way')
							]))
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('muted')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Bangladesh groups digits in lakh and crore, not millions, and writes them in Bangla. Eduplus prints fees, results and receipts this way. Type a number:')
					])),
				A2(
				$elm$html$Html$label,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$for('bn-input'),
						$elm$html$Html$Attributes$class('sr-only')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Number')
					])),
				A2(
				$elm$html$Html$input,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('bn-input'),
						$elm$html$Html$Attributes$class('bn-input'),
						$elm$html$Html$Attributes$value(raw),
						$elm$html$Html$Events$onInput($author$project$Main$SetNumber),
						A2($elm$html$Html$Attributes$attribute, 'inputmode', 'numeric'),
						$elm$html$Html$Attributes$autocomplete(false),
						$elm$html$Html$Attributes$placeholder('e.g. 12345678')
					]),
				_List_Nil),
				(trimmed === '') ? A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('muted')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Digits only, please.')
					])) : A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bn-out')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bn-cell')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$small,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Western')
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										$author$project$Main$groupWestern(trimmed))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bn-cell')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$small,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('South Asian')
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(grouped)
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bn-cell bn-big')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$small,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('বাংলা')
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										'৳ ' + $author$project$Main$toBanglaDigits(grouped))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bn-cell bn-wide')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$small,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Read as')
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(reading)
									]))
							]))
					]))
			]));
};
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $author$project$Main$chip = function (caption) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('chip')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(caption)
			]));
};
var $author$project$Main$Layer = F5(
	function (icon, name, tech, what, note) {
		return {icon: icon, name: name, note: note, tech: tech, what: what};
	});
var $author$project$Main$layers = _List_fromArray(
	[
		A5($author$project$Main$Layer, 'laptop', 'Client', 'Browser · Alpine.js · Flutter', 'The user taps a button. A web page or a mobile app sends an HTTPS request.', 'The fastest request is the one you never send. Cache headers and ETags let the browser skip the round trip.'),
		A5($author$project$Main$Layer, 'server', 'Web server', 'Nginx · TLS · compression', 'Nginx terminates TLS, compresses responses, serves static files and applies rate limits.', 'Static files never touch PHP. That keeps every PHP worker free for real work.'),
		A5($author$project$Main$Layer, 'gears', 'PHP runtime', 'PHP-FPM worker pool', 'A pool of PHP workers picks up the request. Too few and requests queue; too many and the server swaps.', 'Size the pool from memory, not guesswork: free RAM ÷ memory per worker.'),
		A5($author$project$Main$Layer, 'code', 'Application', 'Laravel · middleware · services', 'Middleware authenticates and resolves the tenant, routing picks a controller, and a service does the work.', 'Thin controllers, Form Request validation, business rules in services.'),
		A5($author$project$Main$Layer, 'bolt', 'Cache & queues', 'Redis · workers · Go side-cars', 'Expensive reads come from cache. Slow jobs like SMS, PDFs and vendor polling run off the request path.', 'If the user doesn\u0027t need to wait for it, they shouldn\u0027t.'),
		A5($author$project$Main$Layer, 'database', 'Database', 'MySQL · indexes · transactions', 'Indexed queries, wrapped in transactions wherever data must stay consistent, such as every journal entry.', 'Eager loading with with() turns 101 queries into 2.')
	]);
var $author$project$Main$pressed = function (on) {
	return A2(
		$elm$html$Html$Attributes$attribute,
		'aria-pressed',
		on ? 'true' : 'false');
};
var $author$project$Main$SelectLayer = function (a) {
	return {$: 'SelectLayer', a: a};
};
var $author$project$Main$securityPractices = _List_fromArray(
	['HTTPS everywhere', 'Validated input', 'Prepared statements', 'CSRF protection', 'Least privilege', 'Integrity baselines', 'Regular audits']);
var $author$project$Main$viewAnatomy = function (index) {
	var layerBtn = F2(
		function (n, l) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('layer', true),
								_Utils_Tuple2(
								'active',
								_Utils_eq(n, index)),
								_Utils_Tuple2(
								'passed',
								_Utils_cmp(n, index) < 0)
							])),
						$elm$html$Html$Events$onClick(
						$author$project$Main$SelectLayer(n)),
						$author$project$Main$pressed(
						_Utils_eq(n, index))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('layer-icon')
							]),
						_List_fromArray(
							[
								$author$project$Main$icon(l.icon)
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('layer-text')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('layer-name')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(l.name)
									])),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('layer-tech')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(l.tech)
									]))
							]))
					]));
		});
	var current = $elm$core$List$head(
		A2($elm$core$List$drop, index, $author$project$Main$layers));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('lab-box')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lab-head')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h3,
						_List_Nil,
						_List_fromArray(
							[
								$author$project$Main$icon('route'),
								$elm$html$Html$text('Anatomy of a Request')
							]))
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('muted')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Every click on a Laravel app travels through these layers. Pick one.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('anatomy')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('layers')
							]),
						A2($elm$core$List$indexedMap, layerBtn, $author$project$Main$layers)),
						function () {
						if (current.$ === 'Just') {
							var l = current.a;
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('layer-detail'),
										A2($elm$html$Html$Attributes$attribute, 'aria-live', 'polite')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h4,
										_List_Nil,
										_List_fromArray(
											[
												$author$project$Main$icon(l.icon),
												$elm$html$Html$text(' ' + l.name)
											])),
										A2(
										$elm$html$Html$p,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(l.what)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('note')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$strong,
												_List_Nil,
												_List_fromArray(
													[
														$author$project$Main$icon('lightbulb'),
														$elm$html$Html$text(' Engineering note: ')
													])),
												$elm$html$Html$text(l.note)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('row')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('btn btn-outline btn-sm'),
														$elm$html$Html$Events$onClick(
														$author$project$Main$SelectLayer(index - 1)),
														$elm$html$Html$Attributes$disabled(!index)
													]),
												_List_fromArray(
													[
														$author$project$Main$icon('arrow-up'),
														$elm$html$Html$text('Up')
													])),
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('btn btn-primary btn-sm'),
														$elm$html$Html$Events$onClick(
														$author$project$Main$SelectLayer(index + 1)),
														$elm$html$Html$Attributes$disabled(
														_Utils_eq(
															index,
															$elm$core$List$length($author$project$Main$layers) - 1))
													]),
												_List_fromArray(
													[
														$author$project$Main$icon('arrow-down'),
														$elm$html$Html$text('Deeper')
													]))
											]))
									]));
						} else {
							return $elm$html$Html$text('');
						}
					}()
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('security-strip')
					]),
				A2(
					$elm$core$List$cons,
					A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('strip-label')
							]),
						_List_fromArray(
							[
								$author$project$Main$icon('lock'),
								$elm$html$Html$text(' Across every layer:')
							])),
					A2($elm$core$List$map, $author$project$Main$chip, $author$project$Main$securityPractices)))
			]));
};
var $elm$html$Html$form = _VirtualDom_node('form');
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var $elm$html$Html$Events$onSubmit = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysPreventDefault,
			$elm$json$Json$Decode$succeed(msg)));
};
var $author$project$Main$TermInput = function (a) {
	return {$: 'TermInput', a: a};
};
var $author$project$Main$RunCommand = function (a) {
	return {$: 'RunCommand', a: a};
};
var $author$project$Main$TermSubmit = {$: 'TermSubmit'};
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $author$project$Main$suggestedCommands = _List_fromArray(
	['neofetch', 'whoami', 'git log', 'ping eduplus', 'joke', 'sudo hire']);
var $author$project$Main$viewTerminal = function (model) {
	var viewLine = function (l) {
		var _v0 = l.kind;
		switch (_v0.$) {
			case 'Command':
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('t-line')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('t-prompt')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('visitor@mojahed:~$ ')
								])),
							$elm$html$Html$text(l.content)
						]));
			case 'Output':
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('t-line t-out')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(l.content)
						]));
			default:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('t-line t-err')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(l.content)
						]));
		}
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('lab-box')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lab-head')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h3,
						_List_Nil,
						_List_fromArray(
							[
								$author$project$Main$icon('terminal'),
								$elm$html$Html$text('mojahed-shell')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('terminal')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('t-bar')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('dot d1')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('dot d2')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('dot d3')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('t-title')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('visitor@mojahed: ~')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('t-body'),
								A2($elm$html$Html$Attributes$attribute, 'role', 'log'),
								A2($elm$html$Html$Attributes$attribute, 'aria-live', 'polite')
							]),
						A2($elm$core$List$map, viewLine, model.termLines)),
						A2(
						$elm$html$Html$form,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('t-input'),
								$elm$html$Html$Events$onSubmit($author$project$Main$TermSubmit)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$for('t-cmd'),
										$elm$html$Html$Attributes$class('t-prompt')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('visitor@mojahed:~$')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$id('t-cmd'),
										$elm$html$Html$Attributes$value(model.termInput),
										$elm$html$Html$Events$onInput($author$project$Main$TermInput),
										$elm$html$Html$Attributes$autocomplete(false),
										$elm$html$Html$Attributes$spellcheck(false),
										A2($elm$html$Html$Attributes$attribute, 'autocapitalize', 'off'),
										A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Terminal command')
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('chips cmd-chips')
					]),
				A2(
					$elm$core$List$map,
					function (c) {
						return A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('chip chip-btn'),
									$elm$html$Html$Events$onClick(
									$author$project$Main$RunCommand(c))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(c)
								]));
					},
					$author$project$Main$suggestedCommands))
			]));
};
var $author$project$Main$viewLab = function (model) {
	return A4(
		$author$project$Main$card,
		'lab',
		'flask',
		'The Lab',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lead')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Four small things to play with.')
					])),
				A2($author$project$Main$viewQuiz, model.quizIndex, model.quizAnswers),
				$author$project$Main$viewAnatomy(model.layer),
				$author$project$Main$viewBangla(model.number),
				$author$project$Main$viewTerminal(model)
			]));
};
var $author$project$Main$Stat = F2(
	function (value, label) {
		return {label: label, value: value};
	});
var $author$project$Main$stats = _List_fromArray(
	[
		A2($author$project$Main$Stat, '4+', 'Years in Production'),
		A2($author$project$Main$Stat, '50+', 'Websites Delivered'),
		A2($author$project$Main$Stat, '100+', 'Schools on One Hub'),
		A2($author$project$Main$Stat, 'Top', 'Rated on Upwork')
	]);
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$Main$newTab = _List_fromArray(
	[
		$elm$html$Html$Attributes$target('_blank'),
		$elm$html$Html$Attributes$rel('noopener noreferrer')
	]);
var $author$project$Main$extLink = F3(
	function (url, attrs, children) {
		return A2(
			$elm$html$Html$a,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$href(url),
				_Utils_ap($author$project$Main$newTab, attrs)),
			children);
	});
var $author$project$Main$companyUrl = 'https://lighttechnologiesbd.com';
var $author$project$Main$Focus = F3(
	function (icon, title, body) {
		return {body: body, icon: icon, title: title};
	});
var $author$project$Main$focusAreas = _List_fromArray(
	[
		A3($author$project$Main$Focus, 'layer-group', 'Product Engineering', 'Multi-tenant Laravel systems: exams, results, fees, payroll, inventory and double-entry accounting.'),
		A3($author$project$Main$Focus, 'microchip', 'Systems & Tooling', 'Single-binary Go tools for WebSockets, tunnels, storage and monitoring, so the products stay light.'),
		A3($author$project$Main$Focus, 'shield-halved', 'Linux & Security', 'Production servers, hardened and watched: integrity baselines, malware scans, audits, backups.')
	]);
var $author$project$Main$viewAbout = function (_v0) {
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card reveal-off'),
				$elm$html$Html$Attributes$id('about')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('stats')
					]),
				A2(
					$elm$core$List$map,
					function (s) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('stat')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('stat-value')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(s.value)
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('stat-label')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(s.label)
										]))
								]));
					},
					$author$project$Main$stats)),
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-title')
					]),
				_List_fromArray(
					[
						$author$project$Main$icon('user-tie'),
						$elm$html$Html$text('Profile Summary')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('I\u0027m the '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('CTO & Lead Software Engineer')
							])),
						$elm$html$Html$text(' at '),
						A3(
						$author$project$Main$extLink,
						$author$project$Main$companyUrl,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Light Technologies')
							])),
						$elm$html$Html$text(', where I lead the technical vision and every product we ship. That includes the '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Eduplus')
							])),
						$elm$html$Html$text(' platform used by schools, colleges and madrasas across Bangladesh, and enterprise systems such as a '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('208-model publication ERP')
							])),
						$elm$html$Html$text('.')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('I work across the whole stack. I\u0027ll model a double-entry ledger in the morning, write a '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('WebSocket server in Go')
							])),
						$elm$html$Html$text(' after lunch, and harden the '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Linux server')
							])),
						$elm$html$Html$text(' it deploys to before I go home. I\u0027m also a '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Top Rated freelancer on Upwork')
							])),
						$elm$html$Html$text('.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('focus-grid')
					]),
				A2(
					$elm$core$List$map,
					function (f) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('focus')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('focus-icon')
										]),
									_List_fromArray(
										[
											$author$project$Main$icon(f.icon)
										])),
									A2(
									$elm$html$Html$h3,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(f.title)
										])),
									A2(
									$elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(f.body)
										]))
								]));
					},
					$author$project$Main$focusAreas)),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('scroll-hint'),
						$elm$html$Html$Attributes$href('#experience')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('That\u0027s the short version. Scroll for the long, fun one'),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bounce')
							]),
						_List_fromArray(
							[
								$author$project$Main$icon('arrow-down')
							]))
					]))
			]));
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$html$Html$code = _VirtualDom_node('code');
var $author$project$Main$code = function (s) {
	return A2(
		$elm$html$Html$code,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(s)
			]));
};
var $author$project$Main$brand = function (name) {
	return A2(
		$elm$html$Html$i,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('fa-brands fa-' + name),
				A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
			]),
		_List_Nil);
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $author$project$Main$pad2 = function (n) {
	return A3(
		$elm$core$String$padLeft,
		2,
		_Utils_chr('0'),
		$elm$core$String$fromInt(n));
};
var $author$project$Main$isLeap = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $author$project$Main$monthLength = F2(
	function (y, m) {
		switch (m) {
			case 2:
				return $author$project$Main$isLeap(y) ? 29 : 28;
			case 4:
				return 30;
			case 6:
				return 30;
			case 9:
				return 30;
			case 11:
				return 30;
			default:
				return 31;
		}
	});
var $author$project$Main$walkDate = F3(
	function (y, m, rest) {
		walkDate:
		while (true) {
			var len = A2($author$project$Main$monthLength, y, m);
			if (_Utils_cmp(rest, len) < 0) {
				return _Utils_Tuple3(y, m, rest + 1);
			} else {
				if (m === 12) {
					var $temp$y = y + 1,
						$temp$m = 1,
						$temp$rest = rest - len;
					y = $temp$y;
					m = $temp$m;
					rest = $temp$rest;
					continue walkDate;
				} else {
					var $temp$y = y,
						$temp$m = m + 1,
						$temp$rest = rest - len;
					y = $temp$y;
					m = $temp$m;
					rest = $temp$rest;
					continue walkDate;
				}
			}
		}
	});
var $author$project$Main$dayToDate = function (n) {
	return A3($author$project$Main$walkDate, 2026, 1, n);
};
var $author$project$Main$isoDay = function (n) {
	var _v0 = $author$project$Main$dayToDate(n);
	var y = _v0.a;
	var m = _v0.b;
	var d = _v0.c;
	return $elm$core$String$fromInt(y) + ('-' + ($author$project$Main$pad2(m) + ('-' + $author$project$Main$pad2(d))));
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Main$monthNames = _List_fromArray(
	['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
var $author$project$Main$monthFile = function (i) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		$elm$core$List$head(
			A2(
				$elm$core$List$drop,
				A2($elm$core$Basics$modBy, 12, i),
				$author$project$Main$monthNames))) + ('-' + $elm$core$String$fromInt(2026 + ((i / 12) | 0)));
};
var $author$project$Main$Provider = F5(
	function (icon, isBrand, name, sub, items) {
		return {sub: sub, icon: icon, name: name, items: items, isBrand: isBrand};
	});
var $author$project$Main$providers = _List_fromArray(
	[
		A5(
		$author$project$Main$Provider,
		'aws',
		true,
		'Amazon Web Services',
		'Compute, data & delivery',
		_List_fromArray(
			['EC2', 'RDS', 'Elastic Load Balancing', 'S3', 'Route 53'])),
		A5(
		$author$project$Main$Provider,
		'server',
		false,
		'Hetzner',
		'Servers & object storage',
		_List_fromArray(
			['Dedicated & cloud servers', 'Object Storage (S3-compatible)', 'Backup target'])),
		A5(
		$author$project$Main$Provider,
		'network-wired',
		false,
		'Linode',
		'Company servers',
		_List_fromArray(
			['VPS', 'Production hosting'])),
		A5(
		$author$project$Main$Provider,
		'digital-ocean',
		true,
		'DigitalOcean',
		'Client projects',
		_List_fromArray(
			['Droplets'])),
		A5(
		$author$project$Main$Provider,
		'google',
		true,
		'Google Cloud',
		'Compute',
		_List_fromArray(
			['Cloud servers'])),
		A5(
		$author$project$Main$Provider,
		'gauge-high',
		false,
		'WHM / cPanel · HestiaCP',
		'Hosting fleet',
		_List_fromArray(
			['School & client sites', 'Automated cPanel accounts', 'Let\u0027s Encrypt']))
	]);
var $author$project$Main$SetBackupDay = function (a) {
	return {$: 'SetBackupDay', a: a};
};
var $author$project$Main$backupMaxDay = 729;
var $author$project$Main$backupPipeline = _List_fromArray(
	[
		_Utils_Tuple2('clock', 'cron, nightly'),
		_Utils_Tuple2('database', 'mysqldump every database'),
		_Utils_Tuple2('images', 'collect media assets + .backupme files'),
		_Utils_Tuple2('file-zipper', 'zip the day'),
		_Utils_Tuple2('cloud-arrow-up', 'aws s3 cp → object storage'),
		_Utils_Tuple2('rotate', 'rotate: 10 daily, 12 monthly')
	]);
var $author$project$Main$viewCloud = function (day) {
	var provider = function (pv) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('provider')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('provider-icon')
						]),
					_List_fromArray(
						[
							pv.isBrand ? $author$project$Main$brand(pv.icon) : $author$project$Main$icon(pv.icon)
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h3,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(pv.name)
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mono-accent')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(pv.sub)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('chips')
								]),
							A2($elm$core$List$map, $author$project$Main$chip, pv.items))
						]))
				]));
	};
	var logLine = function (_v2) {
		var ic = _v2.a;
		var msg = _v2.b;
		var kind = _v2.c;
		return A2(
			$elm$html$Html$li,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('log-' + kind)
				]),
			_List_fromArray(
				[
					$author$project$Main$icon(ic),
					$elm$html$Html$text(' ' + msg)
				]));
	};
	var dailies = A2(
		$elm$core$List$range,
		A2($elm$core$Basics$max, 0, day - 9),
		day);
	var step = function (_v1) {
		var ic = _v1.a;
		var label_ = _v1.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('pipe-step')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pipe-icon')
						]),
					_List_fromArray(
						[
							$author$project$Main$icon(ic)
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(label_)
						]))
				]));
	};
	var file = F2(
		function (isNew, name) {
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('zip', true),
								_Utils_Tuple2('new', isNew)
							]))
					]),
				_List_fromArray(
					[
						$author$project$Main$icon('file-zipper'),
						$elm$html$Html$text(name)
					]));
		});
	var _v0 = $author$project$Main$dayToDate(day);
	var y = _v0.a;
	var m = _v0.b;
	var d = _v0.c;
	var monthsDone = ((y - 2026) * 12) + (m - 1);
	var monthlies = A2(
		$elm$core$List$range,
		A2($elm$core$Basics$max, 0, monthsDone - 12),
		monthsDone - 1);
	var events = $elm$core$List$concat(
		_List_fromArray(
			[
				((d === 1) && (monthsDone > 0)) ? _List_fromArray(
				[
					_Utils_Tuple3(
					'arrow-up-right-dots',
					'promoted daily/' + ($author$project$Main$isoDay(day - 1) + ('.zip → monthly/' + ($author$project$Main$monthFile(monthsDone - 1) + '.zip'))),
					'promote')
				]) : _List_Nil,
				((d === 1) && (monthsDone > 12)) ? _List_fromArray(
				[
					_Utils_Tuple3(
					'trash-can',
					'removed monthly/' + ($author$project$Main$monthFile(monthsDone - 13) + '.zip (older than 12 months)'),
					'remove')
				]) : _List_Nil,
				_List_fromArray(
				[
					_Utils_Tuple3(
					'cloud-arrow-up',
					'uploaded daily/' + ($author$project$Main$isoDay(day) + '.zip'),
					'upload')
				]),
				(day >= 10) ? _List_fromArray(
				[
					_Utils_Tuple3(
					'trash-can',
					'removed daily/' + ($author$project$Main$isoDay(day - 10) + '.zip (older than 10 days)'),
					'remove')
				]) : _List_Nil
			]));
	var nextFirst = ((day + A2($author$project$Main$monthLength, y, m)) - d) + 1;
	return A4(
		$author$project$Main$card,
		'cloud',
		'cloud',
		'Cloud & Infrastructure',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lead')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('I\u0027ve run production on '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('AWS')
							])),
						$elm$html$Html$text(' (EC2, RDS, load balancers, S3, Route 53), '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Hetzner')
							])),
						$elm$html$Html$text(', '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Linode')
							])),
						$elm$html$Html$text(', '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('DigitalOcean')
							])),
						$elm$html$Html$text(' and '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Google Cloud')
							])),
						$elm$html$Html$text(', plus a fleet of WHM/cPanel servers for school and client sites.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('provider-grid')
					]),
				A2($elm$core$List$map, provider, $author$project$Main$providers)),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lab-box backup')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lab-head')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$icon('shield-heart'),
										$elm$html$Html$text('Backups that survive bad days')
									])),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('score')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('10 daily · 12 monthly')
									]))
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('muted')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Every night, two Bash jobs on each WHM server dump every MySQL database and collect the media assets (images, PDFs, JSON, audio, video, plus any file a site marks with '),
								$author$project$Main$code('.backupme'),
								$elm$html$Html$text('). They zip the day and push it off-site to S3-compatible object storage with the AWS CLI. On the 1st of each month, the last daily backup is promoted to '),
								$author$project$Main$code('monthly/'),
								$elm$html$Html$text('. That keeps 10 days of fine-grained restores and a year of month-ends, at a fraction of the storage.')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pipeline')
							]),
						A2($elm$core$List$map, step, $author$project$Main$backupPipeline)),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('sim')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('sim-head')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('sim-title')
											]),
										_List_fromArray(
											[
												$author$project$Main$icon('clock-rotate-left'),
												$elm$html$Html$text(' Time-travel the bucket')
											])),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('sim-date')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$author$project$Main$isoDay(day))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('sim-controls')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-outline btn-sm'),
												$elm$html$Html$Events$onClick(
												$author$project$Main$SetBackupDay(day - 1)),
												$elm$html$Html$Attributes$disabled(!day)
											]),
										_List_fromArray(
											[
												$author$project$Main$icon('minus'),
												$elm$html$Html$text('1 day')
											])),
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('range'),
												$elm$html$Html$Attributes$min('0'),
												$elm$html$Html$Attributes$max(
												$elm$core$String$fromInt($author$project$Main$backupMaxDay)),
												$elm$html$Html$Attributes$value(
												$elm$core$String$fromInt(day)),
												$elm$html$Html$Events$onInput(
												function (s) {
													return $author$project$Main$SetBackupDay(
														A2(
															$elm$core$Maybe$withDefault,
															day,
															$elm$core$String$toInt(s)));
												}),
												$elm$html$Html$Attributes$class('sim-range'),
												A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Simulated date')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-outline btn-sm'),
												$elm$html$Html$Events$onClick(
												$author$project$Main$SetBackupDay(day + 1)),
												$elm$html$Html$Attributes$disabled(
												_Utils_eq(day, $author$project$Main$backupMaxDay))
											]),
										_List_fromArray(
											[
												$author$project$Main$icon('plus'),
												$elm$html$Html$text('1 day')
											])),
										A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-primary btn-sm'),
												$elm$html$Html$Events$onClick(
												$author$project$Main$SetBackupDay(nextFirst)),
												$elm$html$Html$Attributes$disabled(
												_Utils_cmp(nextFirst, $author$project$Main$backupMaxDay) > 0)
											]),
										_List_fromArray(
											[
												$author$project$Main$icon('forward'),
												$elm$html$Html$text('Next 1st')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bucket')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('folder')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('folder-name')
													]),
												_List_fromArray(
													[
														$author$project$Main$icon('folder-open'),
														$elm$html$Html$text(' s3://backups/db-backup/daily/ '),
														A2(
														$elm$html$Html$small,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																'(' + ($elm$core$String$fromInt(
																	$elm$core$List$length(dailies)) + '/10)'))
															]))
													])),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('zips')
													]),
												A2(
													$elm$core$List$map,
													function (n) {
														return A2(
															file,
															_Utils_eq(n, day),
															$author$project$Main$isoDay(n) + '.zip');
													},
													$elm$core$List$reverse(dailies)))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('folder')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('folder-name')
													]),
												_List_fromArray(
													[
														$author$project$Main$icon('folder-open'),
														$elm$html$Html$text(' s3://backups/db-backup/monthly/ '),
														A2(
														$elm$html$Html$small,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																'(' + ($elm$core$String$fromInt(
																	$elm$core$List$length(monthlies)) + '/12)'))
															]))
													])),
												$elm$core$List$isEmpty(monthlies) ? A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('muted empty-folder')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Empty until the first month completes. Try \u0022Next 1st\u0022.')
													])) : A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('zips')
													]),
												A2(
													$elm$core$List$map,
													function (i) {
														return A2(
															file,
															(d === 1) && _Utils_eq(i, monthsDone - 1),
															$author$project$Main$monthFile(i) + '.zip');
													},
													$elm$core$List$reverse(monthlies)))
											]))
									])),
								A2(
								$elm$html$Html$ul,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('sim-log'),
										A2($elm$html$Html$Attributes$attribute, 'aria-live', 'polite')
									]),
								A2($elm$core$List$map, logLine, events))
							]))
					]))
			]));
};
var $author$project$Main$Tool = F4(
	function (name, lang, langLabel, body) {
		return {body: body, lang: lang, name: name, langLabel: langLabel};
	});
var $author$project$Main$GoLang = {$: 'GoLang'};
var $author$project$Main$PhpLang = {$: 'PhpLang'};
var $author$project$Main$WebLang = {$: 'WebLang'};
var $author$project$Main$tools = _List_fromArray(
	[
		A4($author$project$Main$Tool, 'MdsSocket', $author$project$Main$GoLang, 'Go', 'Standalone WebSocket server with rooms, presence, live counts, keys & tokens and its own TLS. Built to run for years untouched.'),
		A4($author$project$Main$Tool, 'EduplusQR', $author$project$Main$GoLang, 'Go', 'Its own QR encoder (all 40 versions), 15 barcode types, Bangla QR payment payloads, and self-verification of every image.'),
		A4($author$project$Main$Tool, 'jilapi', $author$project$Main$GoLang, 'Go', 'AES-256-GCM + Argon2id + X25519/HKDF + Ed25519. Encrypts files of any size in constant memory.'),
		A4($author$project$Main$Tool, 'MdsOstrich', $author$project$Main$GoLang, 'Go', 'Cross-platform CLI for system info, server admin, file transfer and remote management.'),
		A4($author$project$Main$Tool, 'MdsNetwork', $author$project$Main$GoLang, 'Go', 'Browser SSH into teammates\u0027 PCs through a VPS relay. No VPN, no open ports.'),
		A4($author$project$Main$Tool, 'mdstunnel', $author$project$Main$GoLang, 'Go', 'Share a local dev server on the internet through your own VPS. Pure stdlib.'),
		A4($author$project$Main$Tool, 'MdsCurl', $author$project$Main$GoLang, 'Go', 'Concurrent HTTP fetcher PHP fires and forgets, with atomic file writes.'),
		A4($author$project$Main$Tool, 'Tinkercode', $author$project$Main$GoLang, 'Go', 'Self-hosted Laravel code runner. The WebSocket server (RFC 6455) is written from scratch.'),
		A4($author$project$Main$Tool, 'mdsuitest', $author$project$Main$GoLang, 'Go', 'Headed-Chrome UI tests from JSON over DevTools Protocol. No Node, no Playwright.'),
		A4($author$project$Main$Tool, 'mdtorag', $author$project$Main$GoLang, 'Go', 'Markdown docs into a RAG vector index with local Ollama embeddings.'),
		A4($author$project$Main$Tool, 'MdsImage', $author$project$Main$GoLang, 'Go', 'Resize, crop, effects, watermarks and batches in pure Go. No ImageMagick.'),
		A4($author$project$Main$Tool, 'Gitwatch', $author$project$Main$GoLang, 'Go', 'Real-time Git conflict watcher: see who is editing what before you collide.'),
		A4($author$project$Main$Tool, 'MdsType', $author$project$Main$GoLang, 'Go', 'Click-to-talk dictation over the network, typed into any focused window.'),
		A4($author$project$Main$Tool, 'mojahed/aiapi', $author$project$Main$PhpLang, 'PHP', 'One Laravel interface for OpenAI, Claude, Gemini, Ollama, Groq, DeepSeek and more.'),
		A4($author$project$Main$Tool, 'mojahed/spa', $author$project$Main$PhpLang, 'PHP', 'SPA feel for Laravel with Alpine.js + Axios. No build step, no npm, no Vite.'),
		A4($author$project$Main$Tool, 'mojahed/webpush', $author$project$Main$PhpLang, 'PHP', 'Web Push (VAPID + RFC 8291 aes128gcm) with zero third-party dependencies.'),
		A4($author$project$Main$Tool, 'mojahed/converts', $author$project$Main$PhpLang, 'PHP', 'Bangla ↔ English digits, numbers, dates, units and hashes.'),
		A4($author$project$Main$Tool, 'eduplus/attendance', $author$project$Main$PhpLang, 'PHP', 'SDK for the centralized Eduplus Attendance API.'),
		A4($author$project$Main$Tool, 'MdsChatBot', $author$project$Main$WebLang, 'JS', 'Zero-dependency, CDN-ready floating chatbot widget. One file.'),
		A4($author$project$Main$Tool, 'Md\u0027s Filler', $author$project$Main$WebLang, 'Chrome', 'Fills forms with realistic Bangladeshi test data, locally, in one click.'),
		A4($author$project$Main$Tool, 'Eduplus Mark Input', $author$project$Main$WebLang, 'Chrome', 'Bulk-fills exam marks to test result processing.')
	]);
var $elm$core$String$toLower = _String_toLower;
var $author$project$Main$githubUrl = 'https://github.com/md-mojahed';
var $author$project$Main$SetToolLang = function (a) {
	return {$: 'SetToolLang', a: a};
};
var $author$project$Main$toolLangName = function (lang) {
	switch (lang.$) {
		case 'AllTools':
			return 'All';
		case 'GoLang':
			return 'Go';
		case 'PhpLang':
			return 'PHP';
		default:
			return 'JS & Chrome';
	}
};
var $author$project$Main$viewTools = function (current) {
	var toolCard = function (t) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('tool')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('tool-top')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h3,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(t.name)
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									'lang lang-' + $elm$core$String$toLower(t.langLabel))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(t.langLabel)
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(t.body)
						]))
				]));
	};
	var visible = A2(
		$elm$core$List$filter,
		function (t) {
			return _Utils_eq(current, $author$project$Main$AllTools) || _Utils_eq(t.lang, current);
		},
		$author$project$Main$tools);
	var tab = function (lang) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('filter-btn', true),
							_Utils_Tuple2(
							'active',
							_Utils_eq(lang, current))
						])),
					$elm$html$Html$Events$onClick(
					$author$project$Main$SetToolLang(lang)),
					$author$project$Main$pressed(
					_Utils_eq(lang, current))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$author$project$Main$toolLangName(lang))
				]));
	};
	return A4(
		$author$project$Main$card,
		'tools',
		'toolbox',
		'Mojahed Dev Suite',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lead')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('When the tool I need doesn\u0027t exist, or is too heavy, I write it. Most are single binaries with zero runtime dependencies. Some are on '),
						A3(
						$author$project$Main$extLink,
						$author$project$Main$githubUrl,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('GitHub')
							])),
						$elm$html$Html$text('.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('upstream')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('upstream-icon')
							]),
						_List_fromArray(
							[
								$author$project$Main$brand('github')
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('upstream-text')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('upstream-kicker')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Open-source contribution')
									])),
								A2(
								$elm$html$Html$strong,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('HestiaCP: open-source web hosting control panel')
									]))
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('badge-merged')
							]),
						_List_fromArray(
							[
								$author$project$Main$icon('code-merge'),
								$elm$html$Html$text('Merged')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('filters')
					]),
				A2(
					$elm$core$List$map,
					tab,
					_List_fromArray(
						[$author$project$Main$AllTools, $author$project$Main$GoLang, $author$project$Main$PhpLang, $author$project$Main$WebLang]))),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('tool-grid')
					]),
				A2($elm$core$List$map, toolCard, visible))
			]));
};
var $elm$html$Html$footer = _VirtualDom_node('footer');
var $author$project$Main$fullName = 'Md Mojahedul Islam';
var $author$project$Main$viewFooter = function (_v0) {
	return A2(
		$elm$html$Html$footer,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('footer')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('© 2026 ' + ($author$project$Main$fullName + ' • CTO & Lead Software Engineer'))
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('muted')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('You scrolled all the way down. Thank you!')
					]))
			]));
};
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Main$cvUrl = 'assets/Md-Mojahedul-Islam-CV.pdf';
var $elm$html$Html$header = _VirtualDom_node('header');
var $author$project$Main$NavItem = F2(
	function (anchor, label) {
		return {label: label, anchor: anchor};
	});
var $author$project$Main$navItems = _List_fromArray(
	[
		A2($author$project$Main$NavItem, 'about', 'About'),
		A2($author$project$Main$NavItem, 'experience', 'Experience'),
		A2($author$project$Main$NavItem, 'projects', 'Projects'),
		A2($author$project$Main$NavItem, 'eduplus', 'Eduplus'),
		A2($author$project$Main$NavItem, 'publication', 'ERP'),
		A2($author$project$Main$NavItem, 'cloud', 'Cloud'),
		A2($author$project$Main$NavItem, 'tools', 'Tools'),
		A2($author$project$Main$NavItem, 'lab', 'Lab'),
		A2($author$project$Main$NavItem, 'skills', 'Skills'),
		A2($author$project$Main$NavItem, 'contact', 'Contact')
	]);
var $author$project$Main$CloseMenu = {$: 'CloseMenu'};
var $author$project$Main$ToggleMenu = {$: 'ToggleMenu'};
var $author$project$Main$ToggleTheme = {$: 'ToggleTheme'};
var $author$project$Main$viewNavbar = function (model) {
	return A2(
		$elm$html$Html$header,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('navbar')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('nav-inner')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('nav-brand'),
								$elm$html$Html$Attributes$href('#about')
							]),
						_List_fromArray(
							[
								$author$project$Main$icon('terminal'),
								$elm$html$Html$text('MD '),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('MOJAHED')
									]))
							])),
						A2(
						$elm$html$Html$nav,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('nav-menu', true),
										_Utils_Tuple2('open', model.menuOpen)
									]))
							]),
						A2(
							$elm$core$List$map,
							function (item) {
								return A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('#' + item.anchor),
											$elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('nav-link', true),
													_Utils_Tuple2(
													'active',
													_Utils_eq(item.anchor, model.active))
												])),
											$elm$html$Html$Events$onClick($author$project$Main$CloseMenu)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(item.label)
										]));
							},
							$author$project$Main$navItems)),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('nav-actions')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-primary btn-cv'),
										$elm$html$Html$Attributes$href($author$project$Main$cvUrl),
										A2($elm$html$Html$Attributes$attribute, 'download', '')
									]),
								_List_fromArray(
									[
										$author$project$Main$icon('file-arrow-down'),
										$elm$html$Html$text('Download CV')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('theme-btn'),
										$elm$html$Html$Events$onClick($author$project$Main$ToggleTheme)
									]),
								model.dark ? _List_fromArray(
									[
										$author$project$Main$icon('sun'),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('hide-sm')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Light')
											]))
									]) : _List_fromArray(
									[
										$author$project$Main$icon('moon'),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('hide-sm')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Dark')
											]))
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('menu-btn'),
										$elm$html$Html$Events$onClick($author$project$Main$ToggleMenu),
										A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Menu')
									]),
								_List_fromArray(
									[
										$author$project$Main$icon(
										model.menuOpen ? 'xmark' : 'bars')
									]))
							]))
					]))
			]));
};
var $author$project$Main$SkillGroup = F2(
	function (title, items) {
		return {items: items, title: title};
	});
var $author$project$Main$skillGroups = _List_fromArray(
	[
		A2(
		$author$project$Main$SkillGroup,
		'Backend',
		_List_fromArray(
			['PHP 8.3', 'Laravel 13', 'Go', 'Node.js', 'Python', 'REST APIs', 'Pest'])),
		A2(
		$author$project$Main$SkillGroup,
		'Frontend & Mobile',
		_List_fromArray(
			['Blade', 'Alpine.js', 'Vue.js', 'Bootstrap 5', 'Flutter'])),
		A2(
		$author$project$Main$SkillGroup,
		'Data & Domains',
		_List_fromArray(
			['MySQL', 'Redis', 'SQLite', 'Double-entry accounting', 'Payroll', 'Inventory', 'Multi-tenancy'])),
		A2(
		$author$project$Main$SkillGroup,
		'Realtime & Integrations',
		_List_fromArray(
			['WebSockets', 'WebRTC', 'Web Push', 'SSLCommerz', 'Meet / Zoom APIs', 'SMS gateways', 'LLM APIs & RAG'])),
		A2(
		$author$project$Main$SkillGroup,
		'Cloud',
		_List_fromArray(
			['AWS EC2', 'AWS RDS', 'Elastic Load Balancing', 'AWS S3', 'Route 53', 'Hetzner', 'Hetzner Object Storage', 'Linode', 'DigitalOcean', 'Google Cloud'])),
		A2(
		$author$project$Main$SkillGroup,
		'Server & DevOps',
		_List_fromArray(
			['Linux', 'WHM / cPanel', 'HestiaCP', 'Nginx / Apache', 'systemd', 'Bash automation', 'Backups & rotation', 'Let\u0027s Encrypt', 'CI/CD', 'Cross-platform builds'])),
		A2(
		$author$project$Main$SkillGroup,
		'Security',
		_List_fromArray(
			['Penetration testing', 'Vulnerability assessment', 'Hardening', 'Malware response', 'Applied cryptography']))
	]);
var $author$project$Main$viewSkills = function (_v0) {
	return A4(
		$author$project$Main$card,
		'skills',
		'laptop-code',
		'Technical Skills Matrix',
		A2(
			$elm$core$List$map,
			function (g) {
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('skill-group')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h3,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(g.title + ':')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('chips')
								]),
							A2(
								$elm$core$List$map,
								function (s) {
									return A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('chip chip-blue')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(s)
											]));
								},
								g.items))
						]));
			},
			$author$project$Main$skillGroups));
};
var $author$project$Main$email = 'dev.mojahedul@gmail.com';
var $author$project$Main$upworkUrl = 'https://www.upwork.com/freelancers/~017a04691e484ba543';
var $author$project$Main$whatsappUrl = 'https://wa.me/8801861583588';
var $author$project$Main$phoneDisplay = '+880 1861 583588';
var $author$project$Main$viewContact = function (_v0) {
	return A4(
		$author$project$Main$card,
		'contact',
		'paper-plane',
		'Let\u0027s Build Something',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('contact')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('contact-big')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Have a system that needs building, fixing or scaling?')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('muted')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('I usually reply within 2–4 hours during business hours (Dhaka, GMT+6).')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('row')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-primary'),
												$elm$html$Html$Attributes$href('mailto:' + $author$project$Main$email)
											]),
										_List_fromArray(
											[
												$author$project$Main$icon('envelope'),
												$elm$html$Html$text('Email me')
											])),
										A3(
										$author$project$Main$extLink,
										$author$project$Main$whatsappUrl,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-outline')
											]),
										_List_fromArray(
											[
												$author$project$Main$brand('whatsapp'),
												$elm$html$Html$text('WhatsApp')
											])),
										A3(
										$author$project$Main$extLink,
										$author$project$Main$upworkUrl,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('btn btn-outline')
											]),
										_List_fromArray(
											[
												$author$project$Main$brand('upwork'),
												$elm$html$Html$text('Hire on Upwork')
											]))
									]))
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('contact-list')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$icon('envelope'),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('mailto:' + $author$project$Main$email)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Main$email)
											]))
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$icon('phone'),
										A3(
										$author$project$Main$extLink,
										$author$project$Main$whatsappUrl,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Main$phoneDisplay)
											]))
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$icon('location-dot'),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Dhaka, Bangladesh')
											]))
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$brand('github'),
										A3(
										$author$project$Main$extLink,
										$author$project$Main$githubUrl,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('github.com/md-mojahed')
											]))
									]))
							]))
					]))
			]));
};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $elm$svg$Svg$Attributes$dy = _VirtualDom_attribute('dy');
var $elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var $elm$svg$Svg$Attributes$dur = _VirtualDom_attribute('dur');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$path = _VirtualDom_attribute('path');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$begin = _VirtualDom_attribute('begin');
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Main$nodePos = function (key) {
	switch (key) {
		case 'core':
			return _Utils_Tuple2(450, 225);
		case 'website':
			return _Utils_Tuple2(120, 50);
		case 'admission':
			return _Utils_Tuple2(330, 50);
		case 'teacher':
			return _Utils_Tuple2(570, 50);
		case 'student':
			return _Utils_Tuple2(780, 50);
		case 'analytics':
			return _Utils_Tuple2(105, 185);
		case 'monitor':
			return _Utils_Tuple2(105, 265);
		case 'attendance':
			return _Utils_Tuple2(795, 150);
		case 'sms':
			return _Utils_Tuple2(795, 225);
		case 'meeting':
			return _Utils_Tuple2(795, 300);
		case 'pgw':
			return _Utils_Tuple2(300, 360);
		case 'cdn':
			return _Utils_Tuple2(600, 360);
		case 'shop':
			return _Utils_Tuple2(150, 455);
		case 'game':
			return _Utils_Tuple2(370, 455);
		case 'socket':
			return _Utils_Tuple2(590, 455);
		case 'messenger':
			return _Utils_Tuple2(800, 455);
		default:
			return _Utils_Tuple2(450, 225);
	}
};
var $elm$svg$Svg$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$Main$EcoNode = F6(
	function (key, name, icon, group, body, links) {
		return {key: key, body: body, icon: icon, name: name, group: group, links: links};
	});
var $author$project$Main$ecoNodes = _List_fromArray(
	[
		A6(
		$author$project$Main$EcoNode,
		'core',
		'Eduplus ERP / Lite',
		'database',
		'core',
		'The source of truth: students, classes, exams, results, fees, accounts and HR. Lite runs many institutions from one multi-tenant codebase.',
		_List_fromArray(
			['website', 'admission', 'teacher', 'student', 'attendance', 'pgw', 'sms', 'meeting', 'cdn', 'analytics', 'monitor'])),
		A6(
		$author$project$Main$EcoNode,
		'website',
		'School website',
		'globe',
		'people',
		'Each institution\u0027s public face: notices, events, albums and admission links.',
		_List_fromArray(
			['core', 'admission'])),
		A6(
		$author$project$Main$EcoNode,
		'admission',
		'Online admission',
		'user-plus',
		'people',
		'Applicants apply and pay online. Accepted students flow into the ERP, so nobody types them twice.',
		_List_fromArray(
			['core', 'pgw', 'sms'])),
		A6(
		$author$project$Main$EcoNode,
		'teacher',
		'Teacher app',
		'chalkboard-user',
		'people',
		'Flutter app for attendance, routines, marks and online classes, over a token-secured API.',
		_List_fromArray(
			['core', 'meeting'])),
		A6(
		$author$project$Main$EcoNode,
		'student',
		'Student app',
		'mobile-screen',
		'people',
		'Students and guardians see results, routines, notices and fees.',
		_List_fromArray(
			['core', 'pgw'])),
		A6(
		$author$project$Main$EcoNode,
		'attendance',
		'Attendance hub',
		'fingerprint',
		'services',
		'Collects device logs from many vendors for 100+ schools and hands them to the core.',
		_List_fromArray(
			['core', 'sms'])),
		A6(
		$author$project$Main$EcoNode,
		'sms',
		'SMS pipe',
		'comment-sms',
		'services',
		'One outbound SMS pipeline for absence alerts, results, OTPs and payment receipts.',
		_List_fromArray(
			['core', 'attendance', 'admission'])),
		A6(
		$author$project$Main$EcoNode,
		'pgw',
		'Payment gateway',
		'credit-card',
		'services',
		'One SSLCommerz integration for fees, admission, subscriptions and shop orders.',
		_List_fromArray(
			['core', 'admission', 'student', 'game', 'shop'])),
		A6(
		$author$project$Main$EcoNode,
		'meeting',
		'Meeting API',
		'video',
		'services',
		'Google Meet / Zoom links behind one API, so a class starts from the routine.',
		_List_fromArray(
			['core', 'teacher'])),
		A6(
		$author$project$Main$EcoNode,
		'cdn',
		'CDN',
		'cloud',
		'services',
		'Self-hosted S3-style storage on NVMe, served by Go.',
		_List_fromArray(
			['core', 'messenger', 'shop'])),
		A6(
		$author$project$Main$EcoNode,
		'socket',
		'MdsSocket',
		'bolt',
		'services',
		'A Go WebSocket server for chat, presence and WebRTC signaling.',
		_List_fromArray(
			['messenger', 'game'])),
		A6(
		$author$project$Main$EcoNode,
		'game',
		'Eduplus Game',
		'gamepad',
		'ontop',
		'Quiz games on the curriculum tree, with leaderboards and certificates.',
		_List_fromArray(
			['pgw', 'shop', 'socket'])),
		A6(
		$author$project$Main$EcoNode,
		'shop',
		'Eduplus Shop',
		'bag-shopping',
		'ontop',
		'Pay with money, or with points earned in the game.',
		_List_fromArray(
			['game', 'pgw', 'cdn'])),
		A6(
		$author$project$Main$EcoNode,
		'messenger',
		'Messenger',
		'comments',
		'ontop',
		'Chat, groups, attachments, push notifications and calls.',
		_List_fromArray(
			['socket', 'cdn'])),
		A6(
		$author$project$Main$EcoNode,
		'analytics',
		'Analytics',
		'chart-line',
		'watch',
		'Knows every domain running Eduplus and flags unlicensed ones.',
		_List_fromArray(
			['core'])),
		A6(
		$author$project$Main$EcoNode,
		'monitor',
		'Monitor',
		'shield-halved',
		'watch',
		'Watches the servers: changed files, malware, health, disk, logs, backups.',
		_List_fromArray(
			['core']))
	]);
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Main$ecoEdges = function () {
	var addEdge = F2(
		function (_v0, acc) {
			var x = _v0.a;
			var y = _v0.b;
			return (A2(
				$elm$core$List$member,
				_Utils_Tuple2(x, y),
				acc) || A2(
				$elm$core$List$member,
				_Utils_Tuple2(y, x),
				acc)) ? acc : _Utils_ap(
				acc,
				_List_fromArray(
					[
						_Utils_Tuple2(x, y)
					]));
		});
	return A3(
		$elm$core$List$foldl,
		addEdge,
		_List_Nil,
		A2(
			$elm$core$List$concatMap,
			function (n) {
				return A2(
					$elm$core$List$map,
					function (l) {
						return _Utils_Tuple2(n.key, l);
					},
					n.links);
			},
			$author$project$Main$ecoNodes));
}();
var $author$project$Main$findNode = function (key) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			function (n) {
				return _Utils_eq(n.key, key);
			},
			$author$project$Main$ecoNodes));
};
var $author$project$Main$nodeName = function (key) {
	return A2(
		$elm$core$Maybe$withDefault,
		key,
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.name;
			},
			$author$project$Main$findNode(key)));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$Main$SelectNode = function (a) {
	return {$: 'SelectNode', a: a};
};
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$svg$Svg$Attributes$repeatCount = _VirtualDom_attribute('repeatCount');
var $elm$svg$Svg$animateMotion = $elm$svg$Svg$trustedNode('animateMotion');
var $author$project$Main$viewEduplus = function (selected) {
	var current = $author$project$Main$findNode(selected);
	var linked = A2(
		$elm$core$Maybe$withDefault,
		_List_Nil,
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.links;
			},
			current));
	var nodeView = function (n) {
		var isCore = n.key === 'core';
		var state = _Utils_eq(n.key, selected) ? ' selected' : (A2($elm$core$List$member, n.key, linked) ? ' linked' : ' dim');
		var _v5 = $author$project$Main$nodePos(n.key);
		var cx = _v5.a;
		var cy = _v5.b;
		var w = isCore ? 190 : 138;
		var h = isCore ? 58 : 36;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class(
					'gnode' + (state + (isCore ? ' core' : ''))),
					$elm$svg$Svg$Attributes$transform(
					'translate(' + ($elm$core$String$fromFloat(cx) + (' ' + ($elm$core$String$fromFloat(cy) + ')')))),
					$elm$svg$Svg$Events$onClick(
					$author$project$Main$SelectNode(n.key)),
					A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
					A2($elm$html$Html$Attributes$attribute, 'tabindex', '0'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', n.name)
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromFloat((-w) / 2)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromFloat((-h) / 2)),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromFloat(w)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromFloat(h)),
							$elm$svg$Svg$Attributes$rx('10')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$textAnchor('middle'),
							$elm$svg$Svg$Attributes$dy('.35em')
						]),
					_List_fromArray(
						[
							$elm$svg$Svg$text(n.name)
						]))
				]));
	};
	var detail = function () {
		if (current.$ === 'Just') {
			var n = current.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('eco-detail'),
						A2($elm$html$Html$Attributes$attribute, 'aria-live', 'polite')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('eco-detail-icon')
							]),
						_List_fromArray(
							[
								$author$project$Main$icon(n.icon)
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(n.name)
									])),
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(n.body)
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('eco-talks')
									]),
								A2(
									$elm$core$List$cons,
									A2(
										$elm$html$Html$strong,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Talks to: ')
											])),
									A2(
										$elm$core$List$intersperse,
										$elm$html$Html$text(' '),
										A2(
											$elm$core$List$map,
											function (k) {
												return A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('talk-chip'),
															$elm$html$Html$Events$onClick(
															$author$project$Main$SelectNode(k))
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$Main$nodeName(k))
														]));
											},
											n.links))))
							]))
					]));
		} else {
			return $elm$html$Html$text('');
		}
	}();
	var isHot = function (_v3) {
		var x = _v3.a;
		var y = _v3.b;
		return _Utils_eq(x, selected) || _Utils_eq(y, selected);
	};
	var edgeView = F2(
		function (index, _v2) {
			var x = _v2.a;
			var y = _v2.b;
			var _v0 = $author$project$Main$nodePos(y);
			var x2 = _v0.a;
			var y2 = _v0.b;
			var _v1 = $author$project$Main$nodePos(x);
			var x1 = _v1.a;
			var y1 = _v1.b;
			var hot = isHot(
				_Utils_Tuple2(x, y));
			var d = 'M' + ($elm$core$String$fromFloat(x1) + (' ' + ($elm$core$String$fromFloat(y1) + (' L' + ($elm$core$String$fromFloat(x2) + (' ' + $elm$core$String$fromFloat(y2)))))));
			var packet = function (delay) {
				return A2(
					$elm$svg$Svg$circle,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$r(
							hot ? '4.5' : '2.6'),
							$elm$svg$Svg$Attributes$class('packet')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$animateMotion,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$dur(
									hot ? '1.6s' : '3.4s'),
									$elm$svg$Svg$Attributes$repeatCount('indefinite'),
									$elm$svg$Svg$Attributes$begin(
									$elm$core$String$fromFloat(delay) + 's'),
									$elm$svg$Svg$Attributes$path(d)
								]),
							_List_Nil)
						]));
			};
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class(
						hot ? 'edge hot' : 'edge')
					]),
				A2(
					$elm$core$List$cons,
					A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$d(d)
							]),
						_List_Nil),
					hot ? _List_fromArray(
						[
							packet(0),
							packet(0.8)
						]) : _List_fromArray(
						[
							packet(
							A2($elm$core$Basics$modBy, 7, index) * 0.45)
						])));
		});
	return A4(
		$author$project$Main$card,
		'eduplus',
		'circle-nodes',
		'Inside Eduplus',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lead')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Eduplus isn\u0027t one app. It\u0027s an ecosystem of products and shared services I designed to fit together. Little dots are requests in flight. '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Click any box')
							])),
						$elm$html$Html$text(' to see what it does and who it talks to.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('eco-stage')
					]),
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$svg,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$viewBox('0 0 900 505'),
								$elm$svg$Svg$Attributes$class('eco-svg'),
								A2($elm$html$Html$Attributes$attribute, 'role', 'img'),
								A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Map of the Eduplus ecosystem')
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$g,
								_List_Nil,
								A2($elm$core$List$indexedMap, edgeView, $author$project$Main$ecoEdges)),
								A2(
								$elm$svg$Svg$g,
								_List_Nil,
								A2(
									$elm$core$List$map,
									nodeView,
									$elm$core$List$reverse($author$project$Main$ecoNodes)))
							]))
					])),
				detail
			]));
};
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $author$project$Main$Copy = F2(
	function (a, b) {
		return {$: 'Copy', a: a, b: b};
	});
var $elm$html$Html$aside = _VirtualDom_node('aside');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $author$project$Main$photoUrl = 'assets/photo.jpg';
var $author$project$Main$linkedinUrl = 'https://www.linkedin.com/in/md-mojahed';
var $author$project$Main$viewSidebar = function (copied) {
	var copyBtn = F2(
		function (key, content) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('copy-btn'),
						$elm$html$Html$Events$onClick(
						A2($author$project$Main$Copy, key, content)),
						$elm$html$Html$Attributes$title('Copy'),
						A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Copy ' + key)
					]),
				_List_fromArray(
					[
						$author$project$Main$icon(
						_Utils_eq(copied, key) ? 'check' : 'copy')
					]));
		});
	return A2(
		$elm$html$Html$aside,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('sidebar')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('avatar-ring')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('avatar'),
								$elm$html$Html$Attributes$src($author$project$Main$photoUrl),
								$elm$html$Html$Attributes$alt($author$project$Main$fullName),
								$elm$html$Html$Attributes$width(150),
								$elm$html$Html$Attributes$height(150)
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('author-name')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('MD MOJAHEDUL ISLAM')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('author-role')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('CTO & Lead Software Engineer')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('author-keys')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Laravel • Go • Linux • Security • System Architecture')
					])),
				A3(
				$author$project$Main$extLink,
				$author$project$Main$companyUrl,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('affil')
					]),
				_List_fromArray(
					[
						$author$project$Main$icon('building'),
						$elm$html$Html$text('Light Technologies')
					])),
				A2(
				$elm$html$Html$ul,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('side-links')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A3(
								$author$project$Main$extLink,
								$author$project$Main$githubUrl,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$brand('github'),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('GitHub')
											]))
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A3(
								$author$project$Main$extLink,
								$author$project$Main$linkedinUrl,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$brand('linkedin'),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('LinkedIn')
											]))
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A3(
								$author$project$Main$extLink,
								$author$project$Main$upworkUrl,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$brand('upwork'),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Upwork · Top Rated')
											]))
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A3(
								$author$project$Main$extLink,
								$author$project$Main$whatsappUrl,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$brand('whatsapp'),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('WhatsApp')
											]))
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('with-copy')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('mailto:' + $author$project$Main$email)
									]),
								_List_fromArray(
									[
										$author$project$Main$icon('envelope'),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('ellipsis')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Main$email)
											]))
									])),
								A2(copyBtn, 'email', $author$project$Main$email)
							])),
						A2(
						$elm$html$Html$li,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('with-copy')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('tel:+8801861583588')
									]),
								_List_fromArray(
									[
										$author$project$Main$icon('phone'),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Main$phoneDisplay)
											]))
									])),
								A2(copyBtn, 'phone', '+8801861583588')
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('plain')
									]),
								_List_fromArray(
									[
										$author$project$Main$icon('location-dot'),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Dhaka, Bangladesh')
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('btn btn-primary btn-block'),
						$elm$html$Html$Attributes$href($author$project$Main$cvUrl),
						A2($elm$html$Html$Attributes$attribute, 'download', '')
					]),
				_List_fromArray(
					[
						$author$project$Main$icon('file-arrow-down'),
						$elm$html$Html$text('Download CV (PDF)')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('status')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pulse')
							]),
						_List_Nil),
						$elm$html$Html$text('Open to new projects')
					])),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('side-game'),
						$elm$html$Html$Attributes$href('game/')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('🦆')
							])),
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$strong,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Need a breather?')
									])),
								A2(
								$elm$html$Html$small,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Play Duck Drift, 3 min')
									]))
							]))
					]))
			]));
};
var $author$project$Main$viewBreather = function (_v0) {
	var point = F3(
		function (ic, title, body) {
			return A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('hl-icon')
							]),
						_List_fromArray(
							[
								$author$project$Main$icon(ic)
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$strong,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(title)
									])),
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(body)
									]))
							]))
					]));
		});
	return A4(
		$author$project$Main$card,
		'breather',
		'spa',
		'Take a Breather',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('breather')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('breather-text')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('lead')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Deadline close? Prod on fire? I made '),
										A2(
										$elm$html$Html$strong,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Duck Drift')
											])),
										$elm$html$Html$text(', a 1–3 minute game for developers under pressure. You steer a rubber duck by breathing, and the sky slowly turns from night to sunrise.')
									])),
								A2(
								$elm$html$Html$ul,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('breather-points')
									]),
								_List_fromArray(
									[
										A3(point, 'wind', 'Breathe to play', 'Hold to breathe in for 4 seconds, release to breathe out for 6. That\u0027s about 6 breaths a minute with a longer exhale, the pace research links to a calmer nervous system.'),
										A3(point, 'cloud', 'Let worries go', '\u0022merge conflict\u0022, \u0022CI is red\u0022, \u002247 unread on Slack\u0022: drift through each cloud and it bursts into stars with a kinder thought.'),
										A3(point, 'heart', 'No way to lose', 'No lives, no game over, every note in harmony. Before and after, you rate how tense you feel.'),
										A3(point, 'lock', 'Stays on your device', 'Scores live only in your browser. Save a postcard PNG if you want to share it.')
									])),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn btn-primary'),
										$elm$html$Html$Attributes$href('game/')
									]),
								_List_fromArray(
									[
										$author$project$Main$icon('play'),
										$elm$html$Html$text('Play Duck Drift')
									]))
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('breather-art'),
								$elm$html$Html$Attributes$href('game/'),
								A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Play Duck Drift')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('ba-moon')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('ba-path')
									]),
								_List_Nil),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('ba-duck')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('🦆')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('ba-cloud')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('prod is down')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('ba-cue')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('breathe with the duck')
									]))
							]))
					]))
			]));
};
var $author$project$Main$Work = F6(
	function (name, kicker, body, badge, tags, cat) {
		return {cat: cat, body: body, name: name, tags: tags, badge: badge, kicker: kicker};
	});
var $author$project$Main$BizWork = {$: 'BizWork'};
var $author$project$Main$EduWork = {$: 'EduWork'};
var $author$project$Main$PlatformWork = {$: 'PlatformWork'};
var $author$project$Main$works = _List_fromArray(
	[
		A6(
		$author$project$Main$Work,
		'Eduplus ERP: One Platform to Run an Institution',
		'Schools, colleges & madrasas · Bangladesh',
		'Admissions, routines, attendance, exams, results, fees, accounts, HR and SMS, built around Bangladeshi boards, grading and fee structures.',
		'Flagship',
		_List_fromArray(
			['Laravel 13', 'Pest 4', 'MySQL']),
		$author$project$Main$EduWork),
		A6(
		$author$project$Main$Work,
		'EduPlus Lite: Multi-tenant Education Portal',
		'Many institutions, one codebase',
		'Each tenant gets its own data, branding and payment setup, with PDF reports, Excel exports, SMS and virtual classrooms built in.',
		'Multi-tenant',
		_List_fromArray(
			['Laravel 13', 'Alpine.js', 'ApexCharts']),
		$author$project$Main$EduWork),
		A6(
		$author$project$Main$Work,
		'Eduplus Teacher App',
		'Flutter · Android & iOS',
		'Attendance, today\u0027s routine, one-tap online classes and exam mark entry from a phone. Institute-level theming and forced updates.',
		'Mobile',
		_List_fromArray(
			['Flutter', 'Sanctum API']),
		$author$project$Main$EduWork),
		A6(
		$author$project$Main$Work,
		'School Website CMS',
		'Institution websites',
		'Notices, events, photo and video albums, staff profiles, clubs, \u0022stars of the institution\u0022, short URLs and a visitor counter, all managed by the school.',
		'CMS',
		_List_fromArray(
			['Laravel', 'Blade']),
		$author$project$Main$EduWork),
		A6(
		$author$project$Main$Work,
		'Eduplus Game & Shop',
		'Gamified learning',
		'Timed quizzes over a curriculum tree, with leaderboards, certificates and subscriptions. Points earned in the game are spent in the shop.',
		'Gamification',
		_List_fromArray(
			['Laravel', 'SSLCommerz', 'REST API']),
		$author$project$Main$EduWork),
		A6(
		$author$project$Main$Work,
		'Publication ERP for a Book Publisher',
		'208 models · 118 migrations',
		'Costing, paper purchasing, printing press, bindery, warehouses, sale centers, author royalties with TDS, payroll, provident fund and a full general ledger.',
		'Enterprise',
		_List_fromArray(
			['Laravel', 'Accounting', 'Inventory']),
		$author$project$Main$BizWork),
		A6(
		$author$project$Main$Work,
		'TravelPlus',
		'Hajj, Umrah & tour agencies',
		'Built for staff who don\u0027t want a \u0022deep\u0022 system: minimum typing, mostly dropdowns, and income, expenses and dues calculated automatically.',
		'SaaS',
		_List_fromArray(
			['Laravel 13', 'Alpine.js']),
		$author$project$Main$BizWork),
		A6(
		$author$project$Main$Work,
		'MediFind BD',
		'Healthcare directory',
		'Find hospitals, doctors and blood donors by division, district and area, then book an appointment.',
		'Public',
		_List_fromArray(
			['Laravel 13', 'Bootstrap 5']),
		$author$project$Main$BizWork),
		A6(
		$author$project$Main$Work,
		'Rahma Organics',
		'E-commerce',
		'Cash-on-delivery shop with guest checkout, live order tracking and delivery zones. The admin dashboard shows revenue trends and low-stock alerts.',
		'Commerce',
		_List_fromArray(
			['Laravel', 'Alpine.js']),
		$author$project$Main$BizWork),
		A6(
		$author$project$Main$Work,
		'Eduplus Attendance Hub',
		'Centralized data collection',
		'Pulls attendance logs from many device vendors\u0027 APIs, normalizes them and serves 100+ school projects. Concurrent fetches run as a Go binary.',
		'100+ schools',
		_List_fromArray(
			['Laravel 13', 'Go', 'MdsCurl']),
		$author$project$Main$PlatformWork),
		A6(
		$author$project$Main$Work,
		'Eduplus CDN',
		'Self-hosted, S3-style storage',
		'A Laravel control plane for clients, keys and buckets, and a Go data plane serving files from NVMe with in-memory config refreshed by poll plus push.',
		'Infra',
		_List_fromArray(
			['Go', 'Laravel', 'TLS']),
		$author$project$Main$PlatformWork),
		A6(
		$author$project$Main$Work,
		'Light Tech Monitor',
		'Server security dashboard',
		'Modified files, malware detections, HTTP health, disk, PHP error logs, processes, file integrity, backups and traffic, with email alerts.',
		'Security',
		_List_fromArray(
			['Laravel 13', 'Linux', 'WHM']),
		$author$project$Main$PlatformWork),
		A6(
		$author$project$Main$Work,
		'Eduplus Messenger',
		'Real-time chat & calls',
		'Direct and group chat, attachments, reactions, typing indicators, read receipts, presence, web push and WebRTC audio/video calls.',
		'Realtime',
		_List_fromArray(
			['WebRTC', 'MdsSocket', 'Web Push']),
		$author$project$Main$PlatformWork),
		A6(
		$author$project$Main$Work,
		'Eduplus Analytics',
		'Deployment intelligence',
		'Knows every domain running Eduplus. Unknown domains are flagged as unlicensed deployments.',
		'Anti-piracy',
		_List_fromArray(
			['Laravel', 'Analytics']),
		$author$project$Main$PlatformWork)
	]);
var $author$project$Main$catIcon = function (cat) {
	switch (cat.$) {
		case 'EduWork':
			return 'graduation-cap';
		case 'BizWork':
			return 'briefcase';
		case 'PlatformWork':
			return 'server';
		default:
			return 'layer-group';
	}
};
var $author$project$Main$SetWorkCat = function (a) {
	return {$: 'SetWorkCat', a: a};
};
var $author$project$Main$workCatName = function (cat) {
	switch (cat.$) {
		case 'AllWork':
			return 'All';
		case 'EduWork':
			return 'Education';
		case 'BizWork':
			return 'Business';
		default:
			return 'Platform';
	}
};
var $author$project$Main$viewProjects = function (current) {
	var visible = A2(
		$elm$core$List$filter,
		function (w) {
			return _Utils_eq(current, $author$project$Main$AllWork) || _Utils_eq(w.cat, current);
		},
		$author$project$Main$works);
	var entry = function (w) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('pub')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h3,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(w.name)
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pub-venue')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(w.kicker)
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pub-body')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(w.body)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pub-badges')
						]),
					A2(
						$elm$core$List$cons,
						A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									'badge-cat cat-' + $elm$core$String$toLower(
										$author$project$Main$workCatName(w.cat)))
								]),
							_List_fromArray(
								[
									$author$project$Main$icon(
									$author$project$Main$catIcon(w.cat)),
									$elm$html$Html$text(w.badge)
								])),
						A2($elm$core$List$map, $author$project$Main$chip, w.tags)))
				]));
	};
	var count = function (cat) {
		return _Utils_eq(cat, $author$project$Main$AllWork) ? $elm$core$List$length($author$project$Main$works) : $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				function (w) {
					return _Utils_eq(w.cat, cat);
				},
				$author$project$Main$works));
	};
	var tab = function (cat) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('filter-btn', true),
							_Utils_Tuple2(
							'active',
							_Utils_eq(cat, current))
						])),
					$elm$html$Html$Events$onClick(
					$author$project$Main$SetWorkCat(cat)),
					$author$project$Main$pressed(
					_Utils_eq(cat, current))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$author$project$Main$workCatName(cat) + (' (' + ($elm$core$String$fromInt(
						count(cat)) + ')')))
				]));
	};
	return A4(
		$author$project$Main$card,
		'projects',
		'diagram-project',
		'Products & Projects',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lead')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Systems I\u0027ve architected and led as lead developer at Light Technologies. Most are private client systems, so here is what they do and how they\u0027re built rather than links to code.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('filters'),
						A2($elm$html$Html$Attributes$attribute, 'role', 'group'),
						A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Filter projects')
					]),
				A2(
					$elm$core$List$map,
					tab,
					_List_fromArray(
						[$author$project$Main$AllWork, $author$project$Main$EduWork, $author$project$Main$BizWork, $author$project$Main$PlatformWork]))),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('pub-list')
					]),
				A2($elm$core$List$map, entry, visible))
			]));
};
var $author$project$Main$Org = F5(
	function (icon, name, url, place, roles) {
		return {url: url, icon: icon, name: name, place: place, roles: roles};
	});
var $author$project$Main$Role = F5(
	function (title, period, current, body, points) {
		return {body: body, title: title, period: period, points: points, current: current};
	});
var $author$project$Main$orgs = _List_fromArray(
	[
		A5(
		$author$project$Main$Org,
		'building',
		'Light Technologies',
		$author$project$Main$companyUrl,
		'Dhaka, Bangladesh',
		_List_fromArray(
			[
				A5(
				$author$project$Main$Role,
				'CTO & Lead Software Engineer',
				'2021 – Present',
				true,
				'Lead the technical vision and all product development at a BASIS-member software company (est. 2013) with 50+ people and 150+ clients.',
				_List_fromArray(
					['Architected the Eduplus product family: ERP, multi-tenant Lite, teacher app, school websites, admission, game and shop.', 'Designed shared platform services (attendance hub, CDN, payment gateway, SMS pipe, meeting API) used by every product.', 'Built a 208-model publication ERP covering press, bindery, warehouse, sales, royalties, payroll and the general ledger.', 'Run the production Linux/WHM servers and wrote the monitoring & security dashboard that watches them.', 'Built the company\u0027s off-site backups: nightly MySQL and asset backups pushed to S3-compatible object storage with 10-daily / 12-monthly rotation.'])),
				A5($author$project$Main$Role, 'Lead Software Engineer', 'Earlier', false, 'Led day-to-day engineering and delivery of client systems and the first generation of Eduplus.', _List_Nil)
			])),
		A5(
		$author$project$Main$Org,
		'briefcase',
		'Upwork',
		$author$project$Main$upworkUrl,
		'Remote · Worldwide',
		_List_fromArray(
			[
				A5($author$project$Main$Role, 'Top Rated Freelancer', '2019 – Present', true, 'Laravel, Vue.js, API and server-administration work for international clients: 37+ projects with a 100% job success rate. Known for clear communication and replies within 2–4 hours.', _List_Nil)
			])),
		A5(
		$author$project$Main$Org,
		'cloud',
		'Cloud & Server Administration',
		'#cloud',
		'AWS · Hetzner · Linode · DigitalOcean · Google Cloud',
		_List_fromArray(
			[
				A5(
				$author$project$Main$Role,
				'System Administrator',
				'2020 – Present',
				true,
				'Linux servers and cloud infrastructure for Light Technologies and client projects, including WithImpact.com.',
				_List_fromArray(
					['AWS: EC2 instances behind load balancers, RDS databases, S3 storage and Route 53 DNS.', 'Hetzner, Linode, DigitalOcean and Google Cloud servers, plus WHM/cPanel hosting, with automated cPanel provisioning for school websites.', 'Off-site backups to S3-compatible object storage, Let\u0027s Encrypt automation, and CI/CD from Bitbucket to cPanel.']))
			]))
	]);
var $elm$core$String$startsWith = _String_startsWith;
var $author$project$Main$viewExperience = function (_v0) {
	var role = function (r) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('tl-item', true),
							_Utils_Tuple2('current', r.current)
						]))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h4,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(r.title),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2('date-badge', true),
											_Utils_Tuple2('green', r.current)
										]))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(r.period)
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(r.body)
						])),
					$elm$core$List$isEmpty(r.points) ? $elm$html$Html$text('') : A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('tl-points')
						]),
					A2(
						$elm$core$List$map,
						function (pt) {
							return A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(pt)
									]));
						},
						r.points))
				]));
	};
	var block = function (o) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('org-block')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('org-head')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h3,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Main$icon(o.icon),
									A2($elm$core$String$startsWith, '#', o.url) ? A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href(o.url)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(o.name)
										])) : A3(
									$author$project$Main$extLink,
									o.url,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(o.name)
										]))
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mono-accent')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(o.place)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('timeline')
						]),
					A2($elm$core$List$map, role, o.roles))
				]));
	};
	return A4(
		$author$project$Main$card,
		'experience',
		'briefcase',
		'Professional Experience',
		A2($elm$core$List$map, block, $author$project$Main$orgs));
};
var $author$project$Main$Highlight = F4(
	function (icon, title, sub, body) {
		return {sub: sub, body: body, icon: icon, title: title};
	});
var $author$project$Main$highlights = _List_fromArray(
	[
		A4($author$project$Main$Highlight, 'star', 'Top Rated on Upwork', 'Freelance', 'Earned through consistent delivery and client feedback.'),
		A4($author$project$Main$Highlight, 'school', '100+ Schools on One Hub', 'Eduplus Attendance', 'One normalized attendance pipeline across many device vendors.'),
		A4($author$project$Main$Highlight, 'book-open', '208-Model ERP', 'Publication ERP', 'Press to royalty, with every taka posted as a balanced journal.'),
		A4($author$project$Main$Highlight, 'toolbox', '21 Self-built Tools', 'Mojahed Dev Suite', 'Go binaries, PHP packages and browser extensions my team uses daily.')
	]);
var $author$project$Main$viewHighlights = function (_v0) {
	return A4(
		$author$project$Main$card,
		'highlights',
		'award',
		'Highlights',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hl-grid')
					]),
				A2(
					$elm$core$List$map,
					function (h) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('hl')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('hl-icon')
										]),
									_List_fromArray(
										[
											$author$project$Main$icon(h.icon)
										])),
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h3,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(h.title)
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('mono-accent')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(h.sub)
												])),
											A2(
											$elm$html$Html$p,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(h.body)
												]))
										]))
								]));
					},
					$author$project$Main$highlights))
			]));
};
var $author$project$Main$Principle = F4(
	function (icon, title, body, evidence) {
		return {body: body, icon: icon, title: title, evidence: evidence};
	});
var $author$project$Main$principles = _List_fromArray(
	[
		A4($author$project$Main$Principle, 'cube', 'No build step unless it earns its place', 'Most of my Laravel apps ship Blade with Alpine.js and Bootstrap and no npm at all. Fewer moving parts means fewer 2 a.m. surprises.', 'TravelPlus · MediFind · Attendance · Monitor'),
		A4($author$project$Main$Principle, 'box', 'One binary, zero dependencies', 'Infrastructure tools are single static Go binaries for Linux, macOS and Windows. Copy the file and it works.', 'MdsSocket · jilapi · MdsCurl · EduplusQR'),
		A4($author$project$Main$Principle, 'file-shield', 'Write atomically', 'Write to a .tmp file, then rename. A crash can never leave a half-written file for someone else to read.', 'MdsCurl outputs · logs'),
		A4($author$project$Main$Principle, 'location-dot', 'Local first', 'Bangladeshi boards and grading, Bangla digits, lakh and crore, Taka, Bangla QR. Software should fit the place it\u0027s used.', 'Eduplus · MdsConvert · EduplusQR'),
		A4($author$project$Main$Principle, 'user-lock', 'Privacy is a design decision', 'In a family messaging app I designed, call audio and video are never stored anywhere. Only call-history metadata is kept.', 'Tuki (design spec)'),
		A4($author$project$Main$Principle, 'eye', 'If it runs, watch it', 'Every server gets health checks, integrity baselines, malware scans and alerts. Every deployment of our software is known.', 'Monitor · Analytics')
	]);
var $author$project$Main$viewPrinciples = function (_v0) {
	return A4(
		$author$project$Main$card,
		'principles',
		'compass',
		'How I Build',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lead')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Opinions are cheap, so each one comes with where you can see it in my work.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('principles')
					]),
				A2(
					$elm$core$List$map,
					function (pr) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('principle')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('hl-icon')
										]),
									_List_fromArray(
										[
											$author$project$Main$icon(pr.icon)
										])),
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h3,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(pr.title)
												])),
											A2(
											$elm$html$Html$p,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(pr.body)
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('evidence')
												]),
											_List_fromArray(
												[
													$author$project$Main$icon('magnifying-glass'),
													$elm$html$Html$text(' Seen in: ' + pr.evidence)
												]))
										]))
								]));
					},
					$author$project$Main$principles))
			]));
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Main$taka = function (n) {
	return '৳ ' + $author$project$Main$groupSouthAsian(
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Main$Stage = F7(
	function (icon, _short, title, body, models, note, postings) {
		return {body: body, icon: icon, note: note, _short: _short, title: title, models: models, postings: postings};
	});
var $author$project$Main$Posting = F3(
	function (account, debit, credit) {
		return {debit: debit, credit: credit, account: account};
	});
var $author$project$Main$stages = _List_fromArray(
	[
		A7(
		$author$project$Main$Stage,
		'feather-pointed',
		'Author',
		'Author & edition',
		'A book has many editions, and each print run records exactly which authors it pays. Royalties start here, not at the end.',
		_List_fromArray(
			['Author', 'Book', 'BookEdition', 'BookPrintRun', 'BookPrintRunAuthor', 'RoyaltyAccount']),
		'Modelling the print run, not just the book, keeps royalties correct when a second edition adds a co-author.',
		_List_Nil),
		A7(
		$author$project$Main$Stage,
		'calculator',
		'Costing',
		'Costing sheet',
		'Before anything is printed, a costing sheet prices paper, plates, printing and binding, then goes through layered approvals.',
		_List_fromArray(
			['CostingSheet', 'CostingLine', 'CostingSheetApprovalLayer', 'PaperVariation', 'BookPriceTier']),
		'Approval is data, not code. Layers are rows, so the publisher can change who signs without a deploy.',
		_List_Nil),
		A7(
		$author$project$Main$Stage,
		'scroll',
		'Paper',
		'Paper & purchasing',
		'Requisitions collect vendor quotes and become purchase orders. Paper arrives against a goods receipt note.',
		_List_fromArray(
			['PurchaseRequisition', 'PurchaseRequisitionQuote', 'PurchaseOrder', 'GoodsReceiptNote', 'VendorPayment']),
		'Every receipt points back to the order line it fulfils, so partial deliveries never get lost.',
		_List_fromArray(
			[
				A3($author$project$Main$Posting, 'Paper inventory', 480000, 0),
				A3($author$project$Main$Posting, 'Accounts payable: paper mill', 0, 480000)
			])),
		A7(
		$author$project$Main$Stage,
		'print',
		'Press',
		'Printing press',
		'A press plan assigns forms to machines with targets. Production is logged per machine, and paper and plates are tracked.',
		_List_fromArray(
			['PressPlan', 'PressPlanMachine', 'PressProduction', 'PressPaperReceipt', 'PressPlateRate', 'PressBill']),
		'The press is modelled as its own business with its own customers, rates and income, because it is one.',
		_List_fromArray(
			[
				A3($author$project$Main$Posting, 'Work in progress: printing', 610000, 0),
				A3($author$project$Main$Posting, 'Paper inventory', 0, 480000),
				A3($author$project$Main$Posting, 'Press charges payable', 0, 130000)
			])),
		A7(
		$author$project$Main$Stage,
		'book',
		'Bindery',
		'Bindery',
		'Printed forms go to internal or outside binders. Materials, work, deliveries and returns are tracked, and binders are paid per rate.',
		_List_fromArray(
			['BinderyOrder', 'BinderySend', 'BinderyWork', 'BinderyDelivery', 'BinderyReturn', 'BinderyBinderBill']),
		'Sent minus returned minus delivered must balance, so waste becomes visible instead of disappearing.',
		_List_fromArray(
			[
				A3($author$project$Main$Posting, 'Work in progress: binding', 150000, 0),
				A3($author$project$Main$Posting, 'Binder bills payable', 0, 150000)
			])),
		A7(
		$author$project$Main$Stage,
		'warehouse',
		'Stock',
		'Warehouse',
		'Finished books are received into warehouses in batches, moved between sale centers and adjusted when counts disagree.',
		_List_fromArray(
			['BookReceipt', 'Warehouse', 'StockBatch', 'StockMovement', 'StockTransfer', 'UomConversion']),
		'Stock is never a number in a column. It is the sum of movements, so \u0022why is it this number?\u0022 always has an answer.',
		_List_fromArray(
			[
				A3($author$project$Main$Posting, 'Finished books inventory', 760000, 0),
				A3($author$project$Main$Posting, 'Work in progress: printing', 0, 610000),
				A3($author$project$Main$Posting, 'Work in progress: binding', 0, 150000)
			])),
		A7(
		$author$project$Main$Stage,
		'cash-register',
		'Sales',
		'Sales',
		'Invoices, a POS with hold memos, discounts, returns, and orders between the group\u0027s sister concerns.',
		_List_fromArray(
			['SalesInvoice', 'SalesReturn', 'SaleCenter', 'PosHoldMemo', 'BookDiscount', 'IntercoOrder']),
		'Inter-company orders post to both companies\u0027 books at once, so the group consolidates without spreadsheets.',
		_List_fromArray(
			[
				A3($author$project$Main$Posting, 'Cash & receivables', 1250000, 0),
				A3($author$project$Main$Posting, 'Book sales', 0, 1250000),
				A3($author$project$Main$Posting, 'Cost of books sold', 760000, 0),
				A3($author$project$Main$Posting, 'Finished books inventory', 0, 760000)
			])),
		A7(
		$author$project$Main$Stage,
		'hand-holding-dollar',
		'Royalty',
		'Royalty & closing',
		'Sales feed author royalties. Tax is deducted at source and deposited, and the fiscal period closes.',
		_List_fromArray(
			['RoyaltyTransaction', 'TdsDeduction', 'RoyaltyTdsDeposit', 'JournalEntry', 'JournalLine', 'FiscalYear']),
		'Debits equal credits or nothing is saved. Closed periods lock, so last year\u0027s numbers can\u0027t quietly change.',
		_List_fromArray(
			[
				A3($author$project$Main$Posting, 'Royalty expense', 187500, 0),
				A3($author$project$Main$Posting, 'Royalty payable: authors', 0, 168750),
				A3($author$project$Main$Posting, 'TDS payable', 0, 18750)
			]))
	]);
var $author$project$Main$TogglePlay = {$: 'TogglePlay'};
var $author$project$Main$SelectStage = function (a) {
	return {$: 'SelectStage', a: a};
};
var $author$project$Main$aroundTheBook = _List_fromArray(
	['Payroll runs', 'Provident fund', 'Loans & advances', 'Overtime & bonuses', 'Leave & holidays', 'Fixed assets & depreciation', 'Rental properties', 'Staff clinic', 'Board resolutions']);
var $author$project$Main$viewPublication = F2(
	function (index, playing) {
		var current = $elm$core$List$head(
			A2($elm$core$List$drop, index, $author$project$Main$stages));
		var ledger = function (postings) {
			if ($elm$core$List$isEmpty(postings)) {
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('ledger empty')
						]),
					_List_fromArray(
						[
							$author$project$Main$icon('circle-info'),
							$elm$html$Html$text(' No money moves at this stage, but the ledger is already ready for it.')
						]));
			} else {
				var amount = function (n) {
					return (!n) ? '' : $author$project$Main$taka(n);
				};
				var row = function (pst) {
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('l-row', true),
										_Utils_Tuple2('cr', pst.credit > 0)
									]))
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('l-acc')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(pst.account)
									])),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('l-num')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										amount(pst.debit))
									])),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('l-num')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										amount(pst.credit))
									]))
							]));
				};
				var dr = $elm$core$List$sum(
					A2(
						$elm$core$List$map,
						function ($) {
							return $.debit;
						},
						postings));
				var cr = $elm$core$List$sum(
					A2(
						$elm$core$List$map,
						function ($) {
							return $.credit;
						},
						postings));
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('ledger')
						]),
					_Utils_ap(
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('l-row l-head')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Journal entry · sample')
											])),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('l-num')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Debit')
											])),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('l-num')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Credit')
											]))
									]))
							]),
						_Utils_ap(
							A2($elm$core$List$map, row, postings),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('l-row l-total')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_Nil,
											_List_fromArray(
												[
													_Utils_eq(dr, cr) ? A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('balanced')
														]),
													_List_fromArray(
														[
															$author$project$Main$icon('scale-balanced'),
															$elm$html$Html$text(' Balanced')
														])) : A2(
													$elm$html$Html$span,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Unbalanced!')
														]))
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('l-num')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													$author$project$Main$taka(dr))
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('l-num')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													$author$project$Main$taka(cr))
												]))
										]))
								]))));
			}
		};
		var total = $elm$core$List$length($author$project$Main$stages);
		var station = F2(
			function (i, s) {
				return A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('station', true),
									_Utils_Tuple2(
									'active',
									_Utils_eq(i, index)),
									_Utils_Tuple2(
									'done',
									_Utils_cmp(i, index) < 0)
								])),
							$elm$html$Html$Events$onClick(
							$author$project$Main$SelectStage(i)),
							$author$project$Main$pressed(
							_Utils_eq(i, index)),
							A2(
							$elm$html$Html$Attributes$style,
							'left',
							$elm$core$String$fromFloat((i / (total - 1)) * 100) + '%')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('station-dot')
								]),
							_List_fromArray(
								[
									$author$project$Main$icon(s.icon)
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('station-label')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(s._short)
								]))
						]));
			});
		var progress = (index / (total - 1)) * 100;
		return A4(
			$author$project$Main$card,
			'publication',
			'book-open',
			'A Book\u0027s Journey Through My ERP',
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('lead')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('I built an ERP for one of Bangladesh\u0027s book publishers. It has '),
							A2(
							$elm$html$Html$strong,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('208 models')
								])),
							$elm$html$Html$text(' and follows a book from the author\u0027s manuscript to the royalty cheque. Press play and watch the book travel, with the double-entry ledger posting as it goes.')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('journey')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('track')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('track-fill'),
											A2(
											$elm$html$Html$Attributes$style,
											'width',
											$elm$core$String$fromFloat(progress) + '%')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('book-token'),
											A2(
											$elm$html$Html$Attributes$style,
											'left',
											$elm$core$String$fromFloat(progress) + '%')
										]),
									_List_fromArray(
										[
											$author$project$Main$icon('book')
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('stations')
								]),
							A2($elm$core$List$indexedMap, station, $author$project$Main$stages))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('journey-controls')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('btn btn-primary'),
									$elm$html$Html$Events$onClick($author$project$Main$TogglePlay)
								]),
							playing ? _List_fromArray(
								[
									$author$project$Main$icon('pause'),
									$elm$html$Html$text('Pause')
								]) : (_Utils_eq(index, total - 1) ? _List_fromArray(
								[
									$author$project$Main$icon('rotate-right'),
									$elm$html$Html$text('Replay the journey')
								]) : _List_fromArray(
								[
									$author$project$Main$icon('play'),
									$elm$html$Html$text('Play the journey')
								]))),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('btn btn-outline'),
									$elm$html$Html$Events$onClick(
									$author$project$Main$SelectStage(index - 1)),
									$elm$html$Html$Attributes$disabled(!index)
								]),
							_List_fromArray(
								[
									$author$project$Main$icon('arrow-left')
								])),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('btn btn-outline'),
									$elm$html$Html$Events$onClick(
									$author$project$Main$SelectStage(index + 1)),
									$elm$html$Html$Attributes$disabled(
									_Utils_eq(index, total - 1))
								]),
							_List_fromArray(
								[
									$author$project$Main$icon('arrow-right')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mono-accent')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'Stage ' + ($elm$core$String$fromInt(index + 1) + (' / ' + $elm$core$String$fromInt(total))))
								]))
						])),
					function () {
					if (current.$ === 'Just') {
						var s = current.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('stage-grid'),
									A2($elm$html$Html$Attributes$attribute, 'aria-live', 'polite')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('stage-text')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h3,
											_List_Nil,
											_List_fromArray(
												[
													$author$project$Main$icon(s.icon),
													$elm$html$Html$text(s.title)
												])),
											A2(
											$elm$html$Html$p,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(s.body)
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('models')
												]),
											A2($elm$core$List$map, $author$project$Main$code, s.models)),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('note')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$strong,
													_List_Nil,
													_List_fromArray(
														[
															$author$project$Main$icon('lightbulb'),
															$elm$html$Html$text(' Design note: ')
														])),
													$elm$html$Html$text(s.note)
												]))
										])),
									ledger(s.postings)
								]));
					} else {
						return $elm$html$Html$text('');
					}
				}(),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('around')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h4,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Around the book, the rest of the company runs on it too:')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('chips')
								]),
							A2($elm$core$List$map, $author$project$Main$chip, $author$project$Main$aroundTheBook))
						]))
				]));
	});
var $author$project$Main$Service = F3(
	function (icon, title, body) {
		return {body: body, icon: icon, title: title};
	});
var $author$project$Main$services = _List_fromArray(
	[
		A3($author$project$Main$Service, 'code', 'Web Applications', 'Laravel systems, from a focused tool to a 200-model ERP.'),
		A3($author$project$Main$Service, 'mobile-screen', 'Mobile Apps', 'Flutter apps and the APIs behind them.'),
		A3($author$project$Main$Service, 'plug', 'APIs & Integrations', 'Payments, SMS, meetings and LLMs, with clean contracts.'),
		A3($author$project$Main$Service, 'terminal', 'Server Administration', 'Linux servers set up, tuned, monitored and kept fast.'),
		A3($author$project$Main$Service, 'user-shield', 'Security', 'Audits, hardening and penetration testing.')
	]);
var $author$project$Main$viewEducationServices = function (_v0) {
	return A4(
		$author$project$Main$card,
		'education',
		'graduation-cap',
		'Education & Services',
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('org-block')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('org-head')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Bachelor of Science in Computer Science & Engineering')
									])),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mono-accent')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('2019 – 2023')
									]))
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('edu-org')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Bangladesh University • Dhaka, Bangladesh')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('muted')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Most of what\u0027s on this page I learned after that, by building it.')
							]))
					])),
				A2(
				$elm$html$Html$h3,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('sub-title')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('What I can do for you')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('service-grid')
					]),
				A2(
					$elm$core$List$map,
					function (s) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('service')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('hl-icon')
										]),
									_List_fromArray(
										[
											$author$project$Main$icon(s.icon)
										])),
									A2(
									$elm$html$Html$h4,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(s.title)
										])),
									A2(
									$elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(s.body)
										]))
								]));
					},
					$author$project$Main$services))
			]));
};
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('page')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('progress'),
						A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
					]),
				_List_Nil),
				$author$project$Main$viewNavbar(model),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('layout')
					]),
				_List_fromArray(
					[
						$author$project$Main$viewSidebar(model.copied),
						A2(
						$elm$html$Html$main_,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('content')
							]),
						_List_fromArray(
							[
								$author$project$Main$viewAbout(_Utils_Tuple0),
								$author$project$Main$viewExperience(_Utils_Tuple0),
								A2($elm$html$Html$Lazy$lazy, $author$project$Main$viewProjects, model.workCat),
								$author$project$Main$viewHighlights(_Utils_Tuple0),
								$author$project$Main$viewEduplus(model.node),
								A2($author$project$Main$viewPublication, model.stage, model.playing),
								A2($elm$html$Html$Lazy$lazy, $author$project$Main$viewCloud, model.backupDay),
								A2($elm$html$Html$Lazy$lazy, $author$project$Main$viewTools, model.toolLang),
								$author$project$Main$viewBreather(_Utils_Tuple0),
								$author$project$Main$viewLab(model),
								$author$project$Main$viewPrinciples(_Utils_Tuple0),
								$author$project$Main$viewSkills(_Utils_Tuple0),
								$author$project$Main$viewEducationServices(_Utils_Tuple0),
								$author$project$Main$viewContact(_Utils_Tuple0),
								$author$project$Main$viewFooter(_Utils_Tuple0)
							]))
					]))
			]));
};
var $elm$core$Basics$not = _Basics_not;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $author$project$Main$copyText = _Platform_outgoingPort('copyText', $elm$json$Json$Encode$string);
var $author$project$Main$saveTheme = _Platform_outgoingPort('saveTheme', $elm$json$Json$Encode$string);
var $author$project$Main$Command = {$: 'Command'};
var $author$project$Main$Failure = {$: 'Failure'};
var $author$project$Main$hireLines = _List_fromArray(
	['[sudo] password for visitor: ********', 'Access granted ✔', 'Send the details to ' + $author$project$Main$email, 'or message ' + ($author$project$Main$phoneDisplay + ' on WhatsApp. I usually reply within 2–4 hours.')]);
var $author$project$Main$gitLogLines = _List_fromArray(
	['commit abe0c7a  (hestiacp/hestiacp, merged)', 'Author: Md Mojahedul Islam', 'Date:   Sep 2026', '', '    docs: add index.php fix for /phpmyadmin/ 404 on IP access']);
var $author$project$Main$respond = function (command) {
	switch (command) {
		case 'help':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['Available commands:', '  neofetch     system info, the fun way', '  whoami       who I am', '  stack        the tools I work with', '  products     what I lead at Light Technologies', '  mds          my own tool suite', '  uptime       numbers so far', '  cloud        where my servers live', '  backup       how the backups rotate', '  ping eduplus is the platform alive?', '  git log      my upstream open-source commits', '  joke         a programmer joke', '  contact      how to reach me', '  sudo hire    go on, try it', '  clear        clear the screen']));
		case 'neofetch':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['    ▄▄▄▄▄▄▄       visitor@mojahed', '   █ ▄▄▄▄▄ █      ───────────────', '   █ █ M █ █      OS: Linux (of course)', '   █ ▀▀▀▀▀ █      Host: Light Technologies, Dhaka', '    ▀▀▀▀▀▀▀       Role: CTO & Lead Software Engineer', '                  Uptime: 4+ years in production', '                  Shell: bash, and this one', '                  Languages: PHP, Go, JS, Python, Dart', '                  Packages: 21 tools in Mojahed Dev Suite', '                  Memory: 208 Eloquent models, all remembered']));
		case 'whoami':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[$author$project$Main$fullName, 'CTO & Lead Software Engineer @ Light Technologies', 'Software engineer · Linux system administrator · Dhaka, Bangladesh']));
		case 'stack':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['backend    PHP 8.3 · Laravel 13 · Go · Node.js · Python', 'frontend   Blade · Alpine.js · Vue.js · Bootstrap 5', 'mobile     Flutter', 'realtime   WebSockets (MdsSocket) · WebRTC · Web Push', 'ops        Linux · WHM/cPanel · Nginx · systemd · MySQL · Redis', 'security   pentesting · hardening · audits · AES-256-GCM']));
		case 'products':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['Eduplus      ERP · Lite · teacher app · website · admission', 'Platform     attendance hub · CDN · payments · SMS · meetings', 'Business     publication ERP · TravelPlus · MediFind · shops']));
		case 'mds':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['Mojahed Dev Suite: single-binary tools, zero runtime deps.', 'MdsSocket  MdsOstrich  EduplusQR  jilapi  mdstunnel', 'MdsNetwork  MdsCurl  MdsImage  Tinkercode  mdsuitest  mdtorag']));
		case 'cloud':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['aws           EC2 · RDS · ELB · S3 · Route 53', 'hetzner       servers · Object Storage (S3-compatible)', 'linode        VPS', 'digitalocean  droplets', 'gcp           compute', 'hosting       WHM/cPanel · HestiaCP']));
		case 'backup':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['cron  →  mysqldump every DB  +  collect media assets', '      →  zip  →  aws s3 cp --endpoint-url <object storage>', 'keep  →  10 daily · 12 monthly (promoted on the 1st)', 'Scroll to the Cloud section to time-travel through it.']));
		case 'uptime':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['up 4+ years · load average: high, happily', '50+ production websites · 5+ mobile apps', '100+ schools on one attendance hub', 'Top Rated on Upwork']));
		case 'ping eduplus':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['PING eduplus: 56 data bytes', '64 bytes from schools: icmp_seq=1 ttl=64 time=0.42 ms', '64 bytes from teachers: icmp_seq=2 ttl=64 time=0.39 ms', '64 bytes from guardians: icmp_seq=3 ttl=64 time=0.41 ms', '--- 3 packets transmitted, 3 received, 0% packet loss ---']));
		case 'joke':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['Why did the Laravel developer go broke?', 'Because he used up all his cache.']));
		case 'contact':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['email      ' + $author$project$Main$email, 'phone      ' + $author$project$Main$phoneDisplay, 'replies    usually within 2–4 hours (business hours)']));
		case 'sudo hire':
			return $elm$core$Maybe$Just($author$project$Main$hireLines);
		case 'sudo hire me':
			return $elm$core$Maybe$Just($author$project$Main$hireLines);
		case 'hire':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['Permission denied. Hiring needs root. Try: sudo hire']));
		case 'ls':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['eduplus/  publication-erp/  mds/  principles.txt  contact.txt']));
		case 'cat principles.txt':
			return $elm$core$Maybe$Just(
				A2(
					$elm$core$List$map,
					function ($) {
						return $.title;
					},
					$author$project$Main$principles));
		case 'pwd':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['/home/mojahed']));
		case 'uname -a':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['Linux mojahed x86_64 GNU/Linux']));
		case 'git log':
			return $elm$core$Maybe$Just($author$project$Main$gitLogLines);
		case 'git log --author=mojahed':
			return $elm$core$Maybe$Just($author$project$Main$gitLogLines);
		case 'rm -rf /':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['Nice try. This machine is looked after by a white hat. 🛡']));
		case 'exit':
			return $elm$core$Maybe$Just(
				_List_fromArray(
					['There\u0027s no exit from a good conversation. Try \u0027contact\u0027 :)']));
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Main$keepLast = F2(
	function (n, list) {
		return A2(
			$elm$core$List$drop,
			$elm$core$List$length(list) - n,
			list);
	});
var $author$project$Main$runCommand = F2(
	function (raw, lines) {
		var command = $elm$core$String$toLower(
			$elm$core$String$trim(raw));
		var echo = A2(
			$author$project$Main$Line,
			$author$project$Main$Command,
			$elm$core$String$trim(raw));
		if (command === '') {
			return lines;
		} else {
			if (command === 'clear') {
				return _List_Nil;
			} else {
				var _v0 = $author$project$Main$respond(command);
				if (_v0.$ === 'Just') {
					var output = _v0.a;
					return A2(
						$author$project$Main$keepLast,
						120,
						_Utils_ap(
							lines,
							A2(
								$elm$core$List$cons,
								echo,
								A2(
									$elm$core$List$map,
									$author$project$Main$Line($author$project$Main$Output),
									output))));
				} else {
					return A2(
						$author$project$Main$keepLast,
						120,
						_Utils_ap(
							lines,
							_List_fromArray(
								[
									echo,
									A2(
									$author$project$Main$Line,
									$author$project$Main$Failure,
									'command not found: ' + $elm$core$String$trim(raw)),
									A2($author$project$Main$Line, $author$project$Main$Output, 'Type \u0027help\u0027 to see available commands.')
								])));
				}
			}
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'ToggleTheme':
				var dark = !model.dark;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{dark: dark}),
					$author$project$Main$saveTheme(
						dark ? 'dark' : 'light'));
			case 'ToggleMenu':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{menuOpen: !model.menuOpen}),
					$elm$core$Platform$Cmd$none);
			case 'CloseMenu':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{menuOpen: false}),
					$elm$core$Platform$Cmd$none);
			case 'SetActive':
				var anchor = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{active: anchor}),
					$elm$core$Platform$Cmd$none);
			case 'Copy':
				var key = msg.a;
				var content = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{copied: key}),
					$author$project$Main$copyText(content));
			case 'SetWorkCat':
				var cat = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{workCat: cat}),
					$elm$core$Platform$Cmd$none);
			case 'SetToolLang':
				var lang = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{toolLang: lang}),
					$elm$core$Platform$Cmd$none);
			case 'SelectNode':
				var key = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{node: key}),
					$elm$core$Platform$Cmd$none);
			case 'SelectStage':
				var index = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							stage: A3(
								$elm$core$Basics$clamp,
								0,
								$elm$core$List$length($author$project$Main$stages) - 1,
								index),
							playing: false
						}),
					$elm$core$Platform$Cmd$none);
			case 'TogglePlay':
				return model.playing ? _Utils_Tuple2(
					_Utils_update(
						model,
						{playing: false}),
					$elm$core$Platform$Cmd$none) : ((_Utils_cmp(
					model.stage,
					$elm$core$List$length($author$project$Main$stages) - 1) > -1) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{stage: 0, playing: true}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{playing: true}),
					$elm$core$Platform$Cmd$none));
			case 'Tick':
				return (_Utils_cmp(
					model.stage,
					$elm$core$List$length($author$project$Main$stages) - 1) > -1) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{playing: false}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{stage: model.stage + 1}),
					$elm$core$Platform$Cmd$none);
			case 'SelectLayer':
				var index = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							layer: A3(
								$elm$core$Basics$clamp,
								0,
								$elm$core$List$length($author$project$Main$layers) - 1,
								index)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetNumber':
				var typed = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							number: A2($elm$core$String$left, 24, typed)
						}),
					$elm$core$Platform$Cmd$none);
			case 'Answer':
				var choice = msg.a;
				return (_Utils_cmp(
					$elm$core$List$length(model.quizAnswers),
					model.quizIndex) > 0) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							quizAnswers: _Utils_ap(
								model.quizAnswers,
								_List_fromArray(
									[choice]))
						}),
					$elm$core$Platform$Cmd$none);
			case 'NextQuestion':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{quizIndex: model.quizIndex + 1}),
					$elm$core$Platform$Cmd$none);
			case 'RestartQuiz':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{quizIndex: 0, quizAnswers: _List_Nil}),
					$elm$core$Platform$Cmd$none);
			case 'TermInput':
				var typed = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{termInput: typed}),
					$elm$core$Platform$Cmd$none);
			case 'TermSubmit':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							termInput: '',
							termLines: A2($author$project$Main$runCommand, model.termInput, model.termLines)
						}),
					$elm$core$Platform$Cmd$none);
			case 'RunCommand':
				var command = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							termInput: '',
							termLines: A2($author$project$Main$runCommand, command, model.termLines)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var day = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							backupDay: A3($elm$core$Basics$clamp, 0, $author$project$Main$backupMaxDay, day)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {host: host, path: path, port_: port_, query: query, fragment: fragment, protocol: protocol};
	});
var $elm$core$String$contains = _String_contains;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$Tick = {$: 'Tick'};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {taggers: taggers, processes: processes};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Main$SetActive = function (a) {
	return {$: 'SetActive', a: a};
};
var $author$project$Main$activeSection = _Platform_incomingPort('activeSection', $elm$json$Json$Decode$string);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Main$activeSection($author$project$Main$SetActive),
				model.playing ? A2(
				$elm$time$Time$every,
				1900,
				function (_v0) {
					return $author$project$Main$Tick;
				}) : $elm$core$Platform$Sub$none
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, view: $author$project$Main$view, update: $author$project$Main$update, subscriptions: $author$project$Main$subscriptions});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (dark) {
			return $elm$json$Json$Decode$succeed(
				{dark: dark});
		},
		A2($elm$json$Json$Decode$field, 'dark', $elm$json$Json$Decode$bool)))(0)}});}(this));