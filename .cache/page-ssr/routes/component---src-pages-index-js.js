exports.id = 678;
exports.ids = [678];
exports.modules = {

/***/ 4184:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ 9960:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
/** Types of elements found in htmlparser2's DOM */
var ElementType;
(function (ElementType) {
    /** Type for the root element of a document */
    ElementType["Root"] = "root";
    /** Type for Text */
    ElementType["Text"] = "text";
    /** Type for <? ... ?> */
    ElementType["Directive"] = "directive";
    /** Type for <!-- ... --> */
    ElementType["Comment"] = "comment";
    /** Type for <script> tags */
    ElementType["Script"] = "script";
    /** Type for <style> tags */
    ElementType["Style"] = "style";
    /** Type for Any tag */
    ElementType["Tag"] = "tag";
    /** Type for <![CDATA[ ... ]]> */
    ElementType["CDATA"] = "cdata";
    /** Type for <!doctype ...> */
    ElementType["Doctype"] = "doctype";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */
function isTag(elem) {
    return (elem.type === ElementType.Tag ||
        elem.type === ElementType.Script ||
        elem.type === ElementType.Style);
}
exports.isTag = isTag;
// Exports for backwards compatibility
/** Type for the root element of a document */
exports.Root = ElementType.Root;
/** Type for Text */
exports.Text = ElementType.Text;
/** Type for <? ... ?> */
exports.Directive = ElementType.Directive;
/** Type for <!-- ... --> */
exports.Comment = ElementType.Comment;
/** Type for <script> tags */
exports.Script = ElementType.Script;
/** Type for <style> tags */
exports.Style = ElementType.Style;
/** Type for Any tag */
exports.Tag = ElementType.Tag;
/** Type for <![CDATA[ ... ]]> */
exports.CDATA = ElementType.CDATA;
/** Type for <!doctype ...> */
exports.Doctype = ElementType.Doctype;


/***/ }),

/***/ 7915:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomHandler = void 0;
var domelementtype_1 = __webpack_require__(9960);
var node_1 = __webpack_require__(7790);
__exportStar(__webpack_require__(7790), exports);
var reWhitespace = /\s+/g;
// Default options
var defaultOpts = {
    normalizeWhitespace: false,
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false,
};
var DomHandler = /** @class */ (function () {
    /**
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */
    function DomHandler(callback, options, elementCB) {
        /** The elements of the DOM */
        this.dom = [];
        /** The root element for the DOM */
        this.root = new node_1.Document(this.dom);
        /** Indicated whether parsing has been completed. */
        this.done = false;
        /** Stack of open tags. */
        this.tagStack = [this.root];
        /** A data node that is still being written to. */
        this.lastNode = null;
        /** Reference to the parser instance. Used for location information. */
        this.parser = null;
        // Make it possible to skip arguments, for backwards-compatibility
        if (typeof options === "function") {
            elementCB = options;
            options = defaultOpts;
        }
        if (typeof callback === "object") {
            options = callback;
            callback = undefined;
        }
        this.callback = callback !== null && callback !== void 0 ? callback : null;
        this.options = options !== null && options !== void 0 ? options : defaultOpts;
        this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
    }
    DomHandler.prototype.onparserinit = function (parser) {
        this.parser = parser;
    };
    // Resets the handler back to starting state
    DomHandler.prototype.onreset = function () {
        this.dom = [];
        this.root = new node_1.Document(this.dom);
        this.done = false;
        this.tagStack = [this.root];
        this.lastNode = null;
        this.parser = null;
    };
    // Signals the handler that parsing is done
    DomHandler.prototype.onend = function () {
        if (this.done)
            return;
        this.done = true;
        this.parser = null;
        this.handleCallback(null);
    };
    DomHandler.prototype.onerror = function (error) {
        this.handleCallback(error);
    };
    DomHandler.prototype.onclosetag = function () {
        this.lastNode = null;
        var elem = this.tagStack.pop();
        if (this.options.withEndIndices) {
            elem.endIndex = this.parser.endIndex;
        }
        if (this.elementCB)
            this.elementCB(elem);
    };
    DomHandler.prototype.onopentag = function (name, attribs) {
        var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : undefined;
        var element = new node_1.Element(name, attribs, undefined, type);
        this.addNode(element);
        this.tagStack.push(element);
    };
    DomHandler.prototype.ontext = function (data) {
        var normalizeWhitespace = this.options.normalizeWhitespace;
        var lastNode = this.lastNode;
        if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
            if (normalizeWhitespace) {
                lastNode.data = (lastNode.data + data).replace(reWhitespace, " ");
            }
            else {
                lastNode.data += data;
            }
            if (this.options.withEndIndices) {
                lastNode.endIndex = this.parser.endIndex;
            }
        }
        else {
            if (normalizeWhitespace) {
                data = data.replace(reWhitespace, " ");
            }
            var node = new node_1.Text(data);
            this.addNode(node);
            this.lastNode = node;
        }
    };
    DomHandler.prototype.oncomment = function (data) {
        if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
            this.lastNode.data += data;
            return;
        }
        var node = new node_1.Comment(data);
        this.addNode(node);
        this.lastNode = node;
    };
    DomHandler.prototype.oncommentend = function () {
        this.lastNode = null;
    };
    DomHandler.prototype.oncdatastart = function () {
        var text = new node_1.Text("");
        var node = new node_1.NodeWithChildren(domelementtype_1.ElementType.CDATA, [text]);
        this.addNode(node);
        text.parent = node;
        this.lastNode = text;
    };
    DomHandler.prototype.oncdataend = function () {
        this.lastNode = null;
    };
    DomHandler.prototype.onprocessinginstruction = function (name, data) {
        var node = new node_1.ProcessingInstruction(name, data);
        this.addNode(node);
    };
    DomHandler.prototype.handleCallback = function (error) {
        if (typeof this.callback === "function") {
            this.callback(error, this.dom);
        }
        else if (error) {
            throw error;
        }
    };
    DomHandler.prototype.addNode = function (node) {
        var parent = this.tagStack[this.tagStack.length - 1];
        var previousSibling = parent.children[parent.children.length - 1];
        if (this.options.withStartIndices) {
            node.startIndex = this.parser.startIndex;
        }
        if (this.options.withEndIndices) {
            node.endIndex = this.parser.endIndex;
        }
        parent.children.push(node);
        if (previousSibling) {
            node.prev = previousSibling;
            previousSibling.next = node;
        }
        node.parent = parent;
        this.lastNode = null;
    };
    return DomHandler;
}());
exports.DomHandler = DomHandler;
exports["default"] = DomHandler;


/***/ }),

/***/ 7790:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloneNode = exports.hasChildren = exports.isDocument = exports.isDirective = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = exports.Element = exports.Document = exports.NodeWithChildren = exports.ProcessingInstruction = exports.Comment = exports.Text = exports.DataNode = exports.Node = void 0;
var domelementtype_1 = __webpack_require__(9960);
var nodeTypes = new Map([
    [domelementtype_1.ElementType.Tag, 1],
    [domelementtype_1.ElementType.Script, 1],
    [domelementtype_1.ElementType.Style, 1],
    [domelementtype_1.ElementType.Directive, 1],
    [domelementtype_1.ElementType.Text, 3],
    [domelementtype_1.ElementType.CDATA, 4],
    [domelementtype_1.ElementType.Comment, 8],
    [domelementtype_1.ElementType.Root, 9],
]);
/**
 * This object will be used as the prototype for Nodes when creating a
 * DOM-Level-1-compliant structure.
 */
var Node = /** @class */ (function () {
    /**
     *
     * @param type The type of the node.
     */
    function Node(type) {
        this.type = type;
        /** Parent of the node */
        this.parent = null;
        /** Previous sibling */
        this.prev = null;
        /** Next sibling */
        this.next = null;
        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
        this.startIndex = null;
        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
        this.endIndex = null;
    }
    Object.defineProperty(Node.prototype, "nodeType", {
        // Read-only aliases
        get: function () {
            var _a;
            return (_a = nodeTypes.get(this.type)) !== null && _a !== void 0 ? _a : 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "parentNode", {
        // Read-write aliases for properties
        get: function () {
            return this.parent;
        },
        set: function (parent) {
            this.parent = parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "previousSibling", {
        get: function () {
            return this.prev;
        },
        set: function (prev) {
            this.prev = prev;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "nextSibling", {
        get: function () {
            return this.next;
        },
        set: function (next) {
            this.next = next;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Clone this node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */
    Node.prototype.cloneNode = function (recursive) {
        if (recursive === void 0) { recursive = false; }
        return cloneNode(this, recursive);
    };
    return Node;
}());
exports.Node = Node;
/**
 * A node that contains some data.
 */
var DataNode = /** @class */ (function (_super) {
    __extends(DataNode, _super);
    /**
     * @param type The type of the node
     * @param data The content of the data node
     */
    function DataNode(type, data) {
        var _this = _super.call(this, type) || this;
        _this.data = data;
        return _this;
    }
    Object.defineProperty(DataNode.prototype, "nodeValue", {
        get: function () {
            return this.data;
        },
        set: function (data) {
            this.data = data;
        },
        enumerable: false,
        configurable: true
    });
    return DataNode;
}(Node));
exports.DataNode = DataNode;
/**
 * Text within the document.
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(data) {
        return _super.call(this, domelementtype_1.ElementType.Text, data) || this;
    }
    return Text;
}(DataNode));
exports.Text = Text;
/**
 * Comments within the document.
 */
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment(data) {
        return _super.call(this, domelementtype_1.ElementType.Comment, data) || this;
    }
    return Comment;
}(DataNode));
exports.Comment = Comment;
/**
 * Processing instructions, including doc types.
 */
var ProcessingInstruction = /** @class */ (function (_super) {
    __extends(ProcessingInstruction, _super);
    function ProcessingInstruction(name, data) {
        var _this = _super.call(this, domelementtype_1.ElementType.Directive, data) || this;
        _this.name = name;
        return _this;
    }
    return ProcessingInstruction;
}(DataNode));
exports.ProcessingInstruction = ProcessingInstruction;
/**
 * A `Node` that can have children.
 */
var NodeWithChildren = /** @class */ (function (_super) {
    __extends(NodeWithChildren, _super);
    /**
     * @param type Type of the node.
     * @param children Children of the node. Only certain node types can have children.
     */
    function NodeWithChildren(type, children) {
        var _this = _super.call(this, type) || this;
        _this.children = children;
        return _this;
    }
    Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
        // Aliases
        get: function () {
            var _a;
            return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
        get: function () {
            return this.children.length > 0
                ? this.children[this.children.length - 1]
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
        get: function () {
            return this.children;
        },
        set: function (children) {
            this.children = children;
        },
        enumerable: false,
        configurable: true
    });
    return NodeWithChildren;
}(Node));
exports.NodeWithChildren = NodeWithChildren;
/**
 * The root node of the document.
 */
var Document = /** @class */ (function (_super) {
    __extends(Document, _super);
    function Document(children) {
        return _super.call(this, domelementtype_1.ElementType.Root, children) || this;
    }
    return Document;
}(NodeWithChildren));
exports.Document = Document;
/**
 * An element within the DOM.
 */
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    /**
     * @param name Name of the tag, eg. `div`, `span`.
     * @param attribs Object mapping attribute names to attribute values.
     * @param children Children of the node.
     */
    function Element(name, attribs, children, type) {
        if (children === void 0) { children = []; }
        if (type === void 0) { type = name === "script"
            ? domelementtype_1.ElementType.Script
            : name === "style"
                ? domelementtype_1.ElementType.Style
                : domelementtype_1.ElementType.Tag; }
        var _this = _super.call(this, type, children) || this;
        _this.name = name;
        _this.attribs = attribs;
        return _this;
    }
    Object.defineProperty(Element.prototype, "tagName", {
        // DOM Level 1 aliases
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "attributes", {
        get: function () {
            var _this = this;
            return Object.keys(this.attribs).map(function (name) {
                var _a, _b;
                return ({
                    name: name,
                    value: _this.attribs[name],
                    namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
                    prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    return Element;
}(NodeWithChildren));
exports.Element = Element;
/**
 * @param node Node to check.
 * @returns `true` if the node is a `Element`, `false` otherwise.
 */
function isTag(node) {
    return (0, domelementtype_1.isTag)(node);
}
exports.isTag = isTag;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
 */
function isCDATA(node) {
    return node.type === domelementtype_1.ElementType.CDATA;
}
exports.isCDATA = isCDATA;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Text`, `false` otherwise.
 */
function isText(node) {
    return node.type === domelementtype_1.ElementType.Text;
}
exports.isText = isText;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Comment`, `false` otherwise.
 */
function isComment(node) {
    return node.type === domelementtype_1.ElementType.Comment;
}
exports.isComment = isComment;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */
function isDirective(node) {
    return node.type === domelementtype_1.ElementType.Directive;
}
exports.isDirective = isDirective;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */
function isDocument(node) {
    return node.type === domelementtype_1.ElementType.Root;
}
exports.isDocument = isDocument;
/**
 * @param node Node to check.
 * @returns `true` if the node is a `NodeWithChildren` (has children), `false` otherwise.
 */
function hasChildren(node) {
    return Object.prototype.hasOwnProperty.call(node, "children");
}
exports.hasChildren = hasChildren;
/**
 * Clone a node, and optionally its children.
 *
 * @param recursive Clone child nodes as well.
 * @returns A clone of the node.
 */
function cloneNode(node, recursive) {
    if (recursive === void 0) { recursive = false; }
    var result;
    if (isText(node)) {
        result = new Text(node.data);
    }
    else if (isComment(node)) {
        result = new Comment(node.data);
    }
    else if (isTag(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_1 = new Element(node.name, __assign({}, node.attribs), children);
        children.forEach(function (child) { return (child.parent = clone_1); });
        if (node["x-attribsNamespace"]) {
            clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
        }
        if (node["x-attribsPrefix"]) {
            clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
        }
        result = clone_1;
    }
    else if (isCDATA(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_2 = new NodeWithChildren(domelementtype_1.ElementType.CDATA, children);
        children.forEach(function (child) { return (child.parent = clone_2); });
        result = clone_2;
    }
    else if (isDocument(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_3 = new Document(children);
        children.forEach(function (child) { return (child.parent = clone_3); });
        if (node["x-mode"]) {
            clone_3["x-mode"] = node["x-mode"];
        }
        result = clone_3;
    }
    else if (isDirective(node)) {
        var instruction = new ProcessingInstruction(node.name, node.data);
        if (node["x-name"] != null) {
            instruction["x-name"] = node["x-name"];
            instruction["x-publicId"] = node["x-publicId"];
            instruction["x-systemId"] = node["x-systemId"];
        }
        result = instruction;
    }
    else {
        throw new Error("Not implemented yet: " + node.type);
    }
    result.startIndex = node.startIndex;
    result.endIndex = node.endIndex;
    return result;
}
exports.cloneNode = cloneNode;
function cloneChildren(childs) {
    var children = childs.map(function (child) { return cloneNode(child, true); });
    for (var i = 1; i < children.length; i++) {
        children[i].prev = children[i - 1];
        children[i - 1].next = children[i];
    }
    return children;
}


/***/ }),

/***/ 2988:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var QueryHandler = __webpack_require__(1755);
var each = (__webpack_require__(6665).each);

/**
 * Represents a single media query, manages it's state and registered handlers for this query
 *
 * @constructor
 * @param {string} query the media query string
 * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
 */
function MediaQuery(query, isUnconditional) {
    this.query = query;
    this.isUnconditional = isUnconditional;
    this.handlers = [];
    this.mql = window.matchMedia(query);

    var self = this;
    this.listener = function(mql) {
        // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
        self.mql = mql.currentTarget || mql;
        self.assess();
    };
    this.mql.addListener(this.listener);
}

MediaQuery.prototype = {

    constuctor : MediaQuery,

    /**
     * add a handler for this query, triggering if already active
     *
     * @param {object} handler
     * @param {function} handler.match callback for when query is activated
     * @param {function} [handler.unmatch] callback for when query is deactivated
     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
     */
    addHandler : function(handler) {
        var qh = new QueryHandler(handler);
        this.handlers.push(qh);

        this.matches() && qh.on();
    },

    /**
     * removes the given handler from the collection, and calls it's destroy methods
     *
     * @param {object || function} handler the handler to remove
     */
    removeHandler : function(handler) {
        var handlers = this.handlers;
        each(handlers, function(h, i) {
            if(h.equals(handler)) {
                h.destroy();
                return !handlers.splice(i,1); //remove from array and exit each early
            }
        });
    },

    /**
     * Determine whether the media query should be considered a match
     *
     * @return {Boolean} true if media query can be considered a match, false otherwise
     */
    matches : function() {
        return this.mql.matches || this.isUnconditional;
    },

    /**
     * Clears all handlers and unbinds events
     */
    clear : function() {
        each(this.handlers, function(handler) {
            handler.destroy();
        });
        this.mql.removeListener(this.listener);
        this.handlers.length = 0; //clear array
    },

    /*
        * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
        */
    assess : function() {
        var action = this.matches() ? 'on' : 'off';

        each(this.handlers, function(handler) {
            handler[action]();
        });
    }
};

module.exports = MediaQuery;


/***/ }),

/***/ 8177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MediaQuery = __webpack_require__(2988);
var Util = __webpack_require__(6665);
var each = Util.each;
var isFunction = Util.isFunction;
var isArray = Util.isArray;

/**
 * Allows for registration of query handlers.
 * Manages the query handler's state and is responsible for wiring up browser events
 *
 * @constructor
 */
function MediaQueryDispatch () {
    if(!window.matchMedia) {
        throw new Error('matchMedia not present, legacy browsers require a polyfill');
    }

    this.queries = {};
    this.browserIsIncapable = !window.matchMedia('only all').matches;
}

MediaQueryDispatch.prototype = {

    constructor : MediaQueryDispatch,

    /**
     * Registers a handler for the given media query
     *
     * @param {string} q the media query
     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
     * @param {function} options.match fired when query matched
     * @param {function} [options.unmatch] fired when a query is no longer matched
     * @param {function} [options.setup] fired when handler first triggered
     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
     */
    register : function(q, options, shouldDegrade) {
        var queries         = this.queries,
            isUnconditional = shouldDegrade && this.browserIsIncapable;

        if(!queries[q]) {
            queries[q] = new MediaQuery(q, isUnconditional);
        }

        //normalise to object in an array
        if(isFunction(options)) {
            options = { match : options };
        }
        if(!isArray(options)) {
            options = [options];
        }
        each(options, function(handler) {
            if (isFunction(handler)) {
                handler = { match : handler };
            }
            queries[q].addHandler(handler);
        });

        return this;
    },

    /**
     * unregisters a query and all it's handlers, or a specific handler for a query
     *
     * @param {string} q the media query to target
     * @param {object || function} [handler] specific handler to unregister
     */
    unregister : function(q, handler) {
        var query = this.queries[q];

        if(query) {
            if(handler) {
                query.removeHandler(handler);
            }
            else {
                query.clear();
                delete this.queries[q];
            }
        }

        return this;
    }
};

module.exports = MediaQueryDispatch;


/***/ }),

/***/ 1755:
/***/ ((module) => {

/**
 * Delegate to handle a media query being matched and unmatched.
 *
 * @param {object} options
 * @param {function} options.match callback for when the media query is matched
 * @param {function} [options.unmatch] callback for when the media query is unmatched
 * @param {function} [options.setup] one-time callback triggered the first time a query is matched
 * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
 * @constructor
 */
function QueryHandler(options) {
    this.options = options;
    !options.deferSetup && this.setup();
}

QueryHandler.prototype = {

    constructor : QueryHandler,

    /**
     * coordinates setup of the handler
     *
     * @function
     */
    setup : function() {
        if(this.options.setup) {
            this.options.setup();
        }
        this.initialised = true;
    },

    /**
     * coordinates setup and triggering of the handler
     *
     * @function
     */
    on : function() {
        !this.initialised && this.setup();
        this.options.match && this.options.match();
    },

    /**
     * coordinates the unmatch event for the handler
     *
     * @function
     */
    off : function() {
        this.options.unmatch && this.options.unmatch();
    },

    /**
     * called when a handler is to be destroyed.
     * delegates to the destroy or unmatch callbacks, depending on availability.
     *
     * @function
     */
    destroy : function() {
        this.options.destroy ? this.options.destroy() : this.off();
    },

    /**
     * determines equality by reference.
     * if object is supplied compare options, if function, compare match callback
     *
     * @function
     * @param {object || function} [target] the target for comparison
     */
    equals : function(target) {
        return this.options === target || this.options.match === target;
    }

};

module.exports = QueryHandler;


/***/ }),

/***/ 6665:
/***/ ((module) => {

/**
 * Helper function for iterating over a collection
 *
 * @param collection
 * @param fn
 */
function each(collection, fn) {
    var i      = 0,
        length = collection.length,
        cont;

    for(i; i < length; i++) {
        cont = fn(collection[i], i);
        if(cont === false) {
            break; //allow early exit
        }
    }
}

/**
 * Helper function for determining whether target object is an array
 *
 * @param target the object under test
 * @return {Boolean} true if array, false otherwise
 */
function isArray(target) {
    return Object.prototype.toString.apply(target) === '[object Array]';
}

/**
 * Helper function for determining whether target object is a function
 *
 * @param target the object under test
 * @return {Boolean} true if function, false otherwise
 */
function isFunction(target) {
    return typeof target === 'function';
}

module.exports = {
    isFunction : isFunction,
    isArray : isArray,
    each : each
};


/***/ }),

/***/ 4974:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MediaQueryDispatch = __webpack_require__(8177);
module.exports = new MediaQueryDispatch();


/***/ }),

/***/ 26:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var decode_json_1 = __importDefault(__webpack_require__(3600));
// Adapted from https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
var fromCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.fromCodePoint ||
    function (codePoint) {
        var output = "";
        if (codePoint > 0xffff) {
            codePoint -= 0x10000;
            output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
            codePoint = 0xdc00 | (codePoint & 0x3ff);
        }
        output += String.fromCharCode(codePoint);
        return output;
    };
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }
    if (codePoint in decode_json_1.default) {
        codePoint = decode_json_1.default[codePoint];
    }
    return fromCodePoint(codePoint);
}
exports["default"] = decodeCodePoint;


/***/ }),

/***/ 8776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HN": () => (/* binding */ Y),
/* harmony export */   "Jv": () => (/* binding */ J),
/* harmony export */   "gJ": () => (/* binding */ R)
/* harmony export */ });
/* unused harmony exports MainImage, Placeholder, generateImageData, getImageData, getLowResolutionImageURL, getSrc, getSrcSet, withArtDirection */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1051);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var common_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5863);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1224);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i]);}return e;},s.apply(this,arguments);}function l(e,t){if(null==e)return{};var a,i,r={},n=Object.keys(e);for(i=0;i<n.length;i++)t.indexOf(a=n[i])>=0||(r[a]=e[a]);return r;}var d,u=(/* unused pure expression or super */ null && ([.25,.5,1,2])),c=(/* unused pure expression or super */ null && ([750,1080,1366,1920])),h=(/* unused pure expression or super */ null && ([320,654,768,1024,1366,1600,1920,2048,2560,3440,3840,4096])),g=function(e){return console.warn(e);},p=function(e,t){return e-t;},m=function(e){return e.map(function(e){return e.src+" "+e.width+"w";}).join(",\n");};function f(e){var t=e.lastIndexOf(".");if(-1!==t){var a=e.substr(t+1);if("jpeg"===a)return"jpg";if(3===a.length||4===a.length)return a;}}function v(e){var t=e.layout,a=void 0===t?"constrained":t,i=e.width,n=e.height,o=e.sourceMetadata,l=e.breakpoints,d=e.aspectRatio,u=e.formats,c=void 0===u?["auto","webp"]:u;return c=c.map(function(e){return e.toLowerCase();}),a=r(a),i&&n?s({},e,{formats:c,layout:a,aspectRatio:i/n}):(o.width&&o.height&&!d&&(d=o.width/o.height),"fullWidth"===a?(i=i||o.width||l[l.length-1],n=n||Math.round(i/(d||1.3333333333333333))):(i||(i=n&&d?n*d:o.width?o.width:n?Math.round(n/1.3333333333333333):800),d&&!n?n=Math.round(i/d):d||(d=i/n)),s({},e,{width:i,height:n,aspectRatio:d,layout:a,formats:c}));}function w(e,t){var a;return void 0===t&&(t=20),null==(a=(0,(e=v(e)).generateImageSource)(e.filename,t,Math.round(t/e.aspectRatio),e.sourceMetadata.format||"jpg",e.fit,e.options))?void 0:a.src;}function y(e){var t,a=(e=v(e)).pluginName,r=e.sourceMetadata,n=e.generateImageSource,o=e.layout,l=e.fit,h=e.options,p=e.width,w=e.height,y=e.filename,M=e.reporter,S=void 0===M?{warn:g}:M,N=e.backgroundColor,R=e.placeholderURL;if(a||S.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'),"function"!=typeof n)throw new Error("generateImageSource must be a function");r&&(r.width||r.height)?r.format||(r.format=f(y)):r={width:p,height:w,format:(null==(t=r)?void 0:t.format)||f(y)||"auto"};var x=new Set(e.formats);(0===x.size||x.has("auto")||x.has(""))&&(x.delete("auto"),x.delete(""),x.add(r.format)),x.has("jpg")&&x.has("png")&&(S.warn("["+a+"] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"),x.delete("jpg"===r.format?"png":"jpg"));var I=function(e){var t=e.filename,a=e.layout,r=void 0===a?"constrained":a,n=e.sourceMetadata,o=e.reporter,l=void 0===o?{warn:g}:o,h=e.breakpoints,p=void 0===h?c:h,m=Object.entries({width:e.width,height:e.height}).filter(function(e){var t=e[1];return"number"==typeof t&&t<1;});if(m.length)throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are "+m.map(function(e){return e.join(": ");}).join(", "));return"fixed"===r?function(e){var t=e.filename,a=e.sourceMetadata,r=e.width,n=e.height,o=e.fit,s=void 0===o?"cover":o,l=e.outputPixelDensities,c=e.reporter,h=void 0===c?{warn:g}:c,p=a.width/a.height,m=b(void 0===l?u:l);if(r&&n){var f=k(a,{width:r,height:n,fit:s});r=f.width,n=f.height,p=f.aspectRatio;}r?n||(n=Math.round(r/p)):r=n?Math.round(n*p):800;var v,w,y=r;if(a.width<r||a.height<n){var E=a.width<r?"width":"height";h.warn(i(d||(v=["\n    The requested ",' "','px" for the image '," was larger than the actual image "," of ","px. If possible, replace the current image with a larger one."],w||(w=v.slice(0)),v.raw=w,d=v),E,"width"===E?r:n,t,E,a[E])),"width"===E?(r=a.width,n=Math.round(r/p)):r=(n=a.height)*p;}return{sizes:m.filter(function(e){return e>=1;}).map(function(e){return Math.round(e*r);}).filter(function(e){return e<=a.width;}),aspectRatio:p,presentationWidth:y,presentationHeight:Math.round(y/p),unscaledWidth:r};}(e):"constrained"===r?E(e):"fullWidth"===r?E(s({breakpoints:p},e)):(l.warn("No valid layout was provided for the image at "+t+". Valid image layouts are fixed, fullWidth, and constrained. Found "+r),{sizes:[n.width],presentationWidth:n.width,presentationHeight:n.height,aspectRatio:n.width/n.height,unscaledWidth:n.width});}(s({},e,{sourceMetadata:r})),W={sources:[]},j=e.sizes;j||(j=function(e,t){switch(t){case"constrained":return"(min-width: "+e+"px) "+e+"px, 100vw";case"fixed":return e+"px";case"fullWidth":return"100vw";default:return;}}(I.presentationWidth,o)),x.forEach(function(e){var t=I.sizes.map(function(t){var i=n(y,t,Math.round(t/I.aspectRatio),e,l,h);if(null!=i&&i.width&&i.height&&i.src&&i.format)return i;S.warn("["+a+"] The resolver for image "+y+" returned an invalid value.");}).filter(Boolean);if("jpg"===e||"png"===e||"auto"===e){var i=t.find(function(e){return e.width===I.unscaledWidth;})||t[0];i&&(W.fallback={src:i.src,srcSet:m(t),sizes:j});}else{var r;null==(r=W.sources)||r.push({srcSet:m(t),sizes:j,type:"image/"+e});}});var _={images:W,layout:o,backgroundColor:N};switch(R&&(_.placeholder={fallback:R}),o){case"fixed":_.width=I.presentationWidth,_.height=I.presentationHeight;break;case"fullWidth":_.width=1,_.height=1/I.aspectRatio;break;case"constrained":_.width=e.width||I.presentationWidth||1,_.height=(_.width||1)/I.aspectRatio;}return _;}var b=function(e){return Array.from(new Set([1].concat(e))).sort(p);};function E(e){var t,a=e.sourceMetadata,i=e.width,r=e.height,n=e.fit,o=void 0===n?"cover":n,s=e.outputPixelDensities,l=e.breakpoints,d=e.layout,c=a.width/a.height,h=b(void 0===s?u:s);if(i&&r){var g=k(a,{width:i,height:r,fit:o});i=g.width,r=g.height,c=g.aspectRatio;}i=i&&Math.min(i,a.width),r=r&&Math.min(r,a.height),i||r||(r=(i=Math.min(800,a.width))/c),i||(i=r*c);var m=i;return(a.width<i||a.height<r)&&(i=a.width,r=a.height),i=Math.round(i),(null==l?void 0:l.length)>0?(t=l.filter(function(e){return e<=a.width;})).length<l.length&&!t.includes(a.width)&&t.push(a.width):t=(t=h.map(function(e){return Math.round(e*i);})).filter(function(e){return e<=a.width;}),"constrained"!==d||t.includes(i)||t.push(i),{sizes:t=t.sort(p),aspectRatio:c,presentationWidth:m,presentationHeight:Math.round(m/c),unscaledWidth:i};}function k(e,t){var a=e.width/e.height,i=t.width,r=t.height;switch(t.fit){case"fill":i=t.width?t.width:e.width,r=t.height?t.height:e.height;break;case"inside":var n=t.width?t.width:Number.MAX_SAFE_INTEGER,o=t.height?t.height:Number.MAX_SAFE_INTEGER;i=Math.min(n,Math.round(o*a)),r=Math.min(o,Math.round(n/a));break;case"outside":var s=t.width?t.width:0,l=t.height?t.height:0;i=Math.max(s,Math.round(l*a)),r=Math.max(l,Math.round(s/a));break;default:t.width&&!t.height&&(i=t.width,r=Math.round(t.width/a)),t.height&&!t.width&&(i=Math.round(t.height*a),r=t.height);}return{width:i,height:r,aspectRatio:i/r};}var M=(/* unused pure expression or super */ null && (["baseUrl","urlBuilder","sourceWidth","sourceHeight","pluginName","formats","breakpoints","options"])),S=(/* unused pure expression or super */ null && (["images","placeholder"]));function N(){return true&&true;}new Set();var R=function(e){var t;return function(e){var t,a;return Boolean(null==e||null==(t=e.images)||null==(a=t.fallback)?void 0:a.src);}(e)?e:function(e){return Boolean(null==e?void 0:e.gatsbyImageData);}(e)?e.gatsbyImageData:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData;},x=function(e){var t,a,i;return null==(t=R(e))||null==(a=t.images)||null==(i=a.fallback)?void 0:i.src;},I=function(e){var t,a,i;return null==(t=R(e))||null==(a=t.images)||null==(i=a.fallback)?void 0:i.srcSet;};function W(e){var t,a=e.baseUrl,i=e.urlBuilder,r=e.sourceWidth,n=e.sourceHeight,o=e.pluginName,d=void 0===o?"getImageData":o,u=e.formats,c=void 0===u?["auto"]:u,g=e.breakpoints,p=e.options,m=l(e,M);return null!=(t=g)&&t.length||"fullWidth"!==m.layout&&"FULL_WIDTH"!==m.layout||(g=h),y(s({},m,{pluginName:d,generateImageSource:function(e,t,a,r){return{width:t,height:a,format:r,src:i({baseUrl:e,width:t,height:a,options:p,format:r})};},filename:a,formats:c,breakpoints:g,sourceMetadata:{width:r,height:n,format:"auto"}}));}function j(e,t){var a,i,r,n=e.images,o=e.placeholder,d=s({},l(e,S),{images:s({},n,{sources:[]}),placeholder:o&&s({},o,{sources:[]})});return t.forEach(function(t){var a,i=t.media,r=t.image;i?(r.layout!==e.layout&&"development"==="production"&&0,(a=d.images.sources).push.apply(a,r.images.sources.map(function(e){return s({},e,{media:i});}).concat([{media:i,srcSet:r.images.fallback.srcSet}])),d.placeholder&&d.placeholder.sources.push({media:i,srcSet:r.placeholder.fallback})): false&&0;}),(a=d.images.sources).push.apply(a,n.sources),null!=o&&o.sources&&(null==(i=d.placeholder)||(r=i.sources).push.apply(r,o.sources)),d;}var _,T=["src","srcSet","loading","alt","shouldLoad","innerRef"],A=["fallback","sources","shouldLoad"],O=function(t){var a=t.src,i=t.srcSet,r=t.loading,n=t.alt,o=void 0===n?"":n,d=t.shouldLoad,u=t.innerRef,c=l(t,T);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img",s({},c,{decoding:"async",loading:r,src:d?a:void 0,"data-src":d?void 0:a,srcSet:d?i:void 0,"data-srcset":d?void 0:i,alt:o,ref:u}));},z=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function(t,a){var i=t.fallback,r=t.sources,n=void 0===r?[]:r,o=t.shouldLoad,d=void 0===o||o,u=l(t,A),c=u.sizes||(null==i?void 0:i.sizes),h=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(O,s({},u,i,{sizes:c,shouldLoad:d,innerRef:a}));return n.length?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture",null,n.map(function(t){var a=t.media,i=t.srcSet,r=t.type;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source",{key:a+"-"+r+"-"+i,type:r,media:a,srcSet:d?i:void 0,"data-srcset":d?void 0:i,sizes:c});}),h):h;});O.propTypes={src:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,alt:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,sizes:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,shouldLoad:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool},z.displayName="Picture",z.propTypes={alt:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,shouldLoad:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool,fallback:prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({src:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,sizes:prop_types__WEBPACK_IMPORTED_MODULE_3__.string}),sources:prop_types__WEBPACK_IMPORTED_MODULE_3__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({media:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,type:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,sizes:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired}),prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({media:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,type:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,sizes:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired})]))};var L=["fallback"],C=function(t){var a=t.fallback,i=l(t,L);return a?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z,s({},i,{fallback:{src:a},"aria-hidden":!0,alt:""})):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",s({},i));};C.displayName="Placeholder",C.propTypes={fallback:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,sources:null==(_=z.propTypes)?void 0:_.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null;}};var q=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function(t,a){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment),null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z,s({ref:a},t)),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z,s({},t,{shouldLoad:!0}))));});q.displayName="MainImage",q.propTypes=z.propTypes;var D=["children"],P=function(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script",{type:"module",dangerouslySetInnerHTML:{__html:'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1)}}'}});},H=function(t){var a=t.layout,i=t.width,r=t.height;return"fullWidth"===a?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{"aria-hidden":!0,style:{paddingTop:r/i*100+"%"}}):"constrained"===a?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{style:{maxWidth:i,display:"block"}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+r+"' width='"+i+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null;},F=function(t){var i=t.children,r=l(t,D);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(H,s({},r)),i,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(P,null));},B=["as","children"],G=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],V=["style","className"],U=function(e){return e.replace(/\n/g,"");},X=function(t){var a=t.as,i=void 0===a?"div":a,r=t.children,n=l(t,B);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i,s({},n),r);},Y=function(t){var a=t.as,i=t.className,r=t.class,n=t.style,o=t.image,d=t.loading,u=void 0===d?"lazy":d,c=t.imgClassName,h=t.imgStyle,g=t.backgroundColor,p=t.objectFit,m=t.objectPosition,f=l(t,G);if(!o)return console.warn("[gatsby-plugin-image] Missing image prop"),null;r&&(i=r),h=s({objectFit:p,objectPosition:m,backgroundColor:g},h);var v=o.width,w=o.height,y=o.layout,b=o.images,E=o.placeholder,k=o.backgroundColor,M=function(e,t,a){var i={},r="gatsby-image-wrapper";return N()||(i.position="relative",i.overflow="hidden"),"fixed"===a?(i.width=e,i.height=t):"constrained"===a&&(N()||(i.display="inline-block",i.verticalAlign="top"),r="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:r,"data-gatsby-image-wrapper":"",style:i};}(v,w,y),S=M.style,R=M.className,x=l(M,V),I={fallback:void 0,sources:[]};return b.fallback&&(I.fallback=s({},b.fallback,{srcSet:b.fallback.srcSet?U(b.fallback.srcSet):void 0})),b.sources&&(I.sources=b.sources.map(function(e){return s({},e,{srcSet:U(e.srcSet)});})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(X,s({},x,{as:a,style:s({},S,n,{backgroundColor:g}),className:R+(i?" "+i:"")}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F,{layout:y,width:v,height:w},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C,s({},function(e,t,a,i,r,n,o,l){var d={};n&&(d.backgroundColor=n,"fixed"===a?(d.width=i,d.height=r,d.backgroundColor=n,d.position="relative"):("constrained"===a||"fullWidth"===a)&&(d.position="absolute",d.top=0,d.left=0,d.bottom=0,d.right=0)),o&&(d.objectFit=o),l&&(d.objectPosition=l);var u=s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:1,transition:"opacity 500ms linear"},d)});return N()||(u.style={height:"100%",left:0,position:"absolute",top:0,width:"100%"}),u;}(E,0,y,v,w,k,p,m))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(q,s({"data-gatsby-image-ssr":"",className:c},f,function(e,t,a,i,r,n,o,l){return void 0===l&&(l={}),N()||(l=s({height:"100%",left:0,position:"absolute",top:0,transform:"translateZ(0)",transition:"opacity 250ms linear",width:"100%",willChange:"opacity"},l)),s({},a,{loading:i,shouldLoad:e,"data-main-image":"",style:s({},l,{opacity:0}),onLoad:function(e){var t=e.currentTarget,a=new Image();a.src=t.currentSrc,a.decode?a.decode().catch(function(){}).then(function(){r(!0);}):r(!0);},ref:void 0});}("eager"===u,0,I,u,void 0,0,0,h)))));},Z=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions"],J=function(t){return function(a){var i=a.src,r=a.__imageData,n=a.__error,o=l(a,Z);return n&&console.warn(n),r?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t,s({image:r},o)):(console.warn("Image not loaded",i),n||"development"!=="production"||0,null);};}(Y),K=function(e,t){return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?prop_types__WEBPACK_IMPORTED_MODULE_3___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_3___default()),[e,t].concat([].slice.call(arguments,2))):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.");},Q=new Set(["fixed","fullWidth","constrained"]),$={src:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired),alt:function(e,t,a){return e.alt||""===e.alt?prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_3___default()),[e,t,a].concat([].slice.call(arguments,3))):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');},width:K,height:K,sizes:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),layout:function(e){if(void 0!==e.layout&&!Q.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');}};J.displayName="StaticImage",J.propTypes=$;

/***/ }),

/***/ 1224:
/***/ ((module) => {

"use strict";
const preserveCamelCase=string=>{let isLastCharLower=false;let isLastCharUpper=false;let isLastLastCharUpper=false;for(let i=0;i<string.length;i++){const character=string[i];if(isLastCharLower&&/[a-zA-Z]/.test(character)&&character.toUpperCase()===character){string=string.slice(0,i)+'-'+string.slice(i);isLastCharLower=false;isLastLastCharUpper=isLastCharUpper;isLastCharUpper=true;i++;}else if(isLastCharUpper&&isLastLastCharUpper&&/[a-zA-Z]/.test(character)&&character.toLowerCase()===character){string=string.slice(0,i-1)+'-'+string.slice(i-1);isLastLastCharUpper=isLastCharUpper;isLastCharUpper=false;isLastCharLower=true;}else{isLastCharLower=character.toLowerCase()===character&&character.toUpperCase()!==character;isLastLastCharUpper=isLastCharUpper;isLastCharUpper=character.toUpperCase()===character&&character.toLowerCase()!==character;}}return string;};const camelCase=(input,options)=>{if(!(typeof input==='string'||Array.isArray(input))){throw new TypeError('Expected the input to be `string | string[]`');}options=Object.assign({pascalCase:false},options);const postProcess=x=>options.pascalCase?x.charAt(0).toUpperCase()+x.slice(1):x;if(Array.isArray(input)){input=input.map(x=>x.trim()).filter(x=>x.length).join('-');}else{input=input.trim();}if(input.length===0){return'';}if(input.length===1){return options.pascalCase?input.toUpperCase():input.toLowerCase();}const hasUpperCase=input!==input.toLowerCase();if(hasUpperCase){input=preserveCamelCase(input);}input=input.replace(/^[_.\- ]+/,'').toLowerCase().replace(/[_.\- ]+(\w|$)/g,(_,p1)=>p1.toUpperCase()).replace(/\d+(\w|$)/g,m=>m.toUpperCase());return postProcess(input);};module.exports=camelCase;// TODO: Remove this for the next major release
module.exports["default"]=camelCase;

/***/ }),

/***/ 8966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "C:\\Users\\home\\Desktop\\WORKSPACE\\FREELANCER\\BeCapital\\becapital\\node_modules\\react\\index.js"
var external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_ = __webpack_require__(1051);
var external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_);
// EXTERNAL MODULE: ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(8776);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(2031);
;// CONCATENATED MODULE: ./src/components/Header/SubMenu/index.js
const isCurrent=({current})=>{return current?{className:"header__menu_link_current"}:{};};const SubMenu=()=>/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.StaticQuery,{query:"956638909",render:data=>/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"header__submenu_items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"header__submenu_item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://maquinadossonhos.be.capital/",target:"_blank",rel:"noopener noreferrer",className:"header__submenu_link"},"Planejamento Financeiro")),data.allWpServico.edges.map(page=>/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"header__submenu_item",key:page.node.id},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:`/${page.node.slug}`,className:"header__submenu_link",getProps:isCurrent},page.node.title))))});/* harmony default export */ const Header_SubMenu = (SubMenu);
;// CONCATENATED MODULE: ./src/components/Header/Header.js
const Header=()=>{const{0:isActive,1:setActive}=(0,external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_.useState)(false);const toggleClass=()=>{setActive(!isActive);document.querySelector('.header').classList.toggle('active');};const isCurrent=({current})=>{return current?{className:"header__menu_link_current"}:{};};return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement((external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("header",{className:"header"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"header__content"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_becapital_2x.png",alt:"logo BeCapital",className:"header__logo header__logo--mobile",__imageData:__webpack_require__(4539)}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_2_becapital_1x.png",alt:"logo BeCapital",className:"header__logo header__logo--desktop",__imageData:__webpack_require__(7766)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("button",{className:"burguer__container",onClick:toggleClass,onKeyDown:toggleClass},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",null),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",null),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",null)),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:isActive?'header__menu active':'header__menu'},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("button",{className:isActive?'burguer__container active':'burguer__container',onClick:toggleClass,onKeyDown:toggleClass},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",null),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",null),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",null)),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("nav",{className:"header__menu_nav"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"header__menu_items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"header__menu_item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/",className:"header__menu_link",getProps:isCurrent},"Home")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"header__menu_item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/somos-becapital/",className:"header__menu_link",getProps:isCurrent},"Somos BeCapital")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"header__menu_item header__menu_item--children"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",{className:"header__menu_link--children"},"Seja BeCapital ",/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"6",height:"5",viewBox:"0 0 6 5",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M3 5L0.401925 0.5L5.59808 0.5L3 5Z",fill:"#EA5E45"}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("nav",{className:"header__submenu"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(Header_SubMenu,null))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"header__menu_item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/blog/",className:"header__menu_link",getProps:isCurrent},"Blog")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"header__menu_item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/carreiras/",className:"header__menu_link",getProps:isCurrent},"Carreiras")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"header__menu_item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://becapitalresearch.com/",target:"_blank",rel:"noopener noreferrer",className:"header__menu_link header__menu_link--italic"},"Research")))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"button__container header__button_cta"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://app.be.capital/#/auth",target:"_blank",rel:"noopener noreferrer",className:"button button__primary"},"Login"))))));};/* harmony default export */ const Header_Header = (Header);
;// CONCATENATED MODULE: ./src/components/Footer/InvestimentosMenu/index.js
const InvestimentosMenu_SubMenu=()=>/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.StaticQuery,{query:"956638909",render:data=>/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"footer__menu"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"menu__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://maquinadossonhos.be.capital/",className:"menu__link"},"Planejamento Financeiro")),data.allWpServico.edges.map(page=>/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"menu__item",key:page.node.id},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:`/${page.node.slug}`,className:"menu__link"},page.node.title))))});/* harmony default export */ const InvestimentosMenu = (InvestimentosMenu_SubMenu);
;// CONCATENATED MODULE: ./src/components/Footer/index.js
const Footer=()=>{return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement((external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("footer",{className:"footer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"footer__section footer__section--header"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_becapital_2x.png",alt:"logo BeCapital",className:"footer__logo",__imageData:__webpack_require__(4539)}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"footer__title footer--andress"},"Av. Rio Branco, 108 | 8\xBA andar - Centro - Rio de Janeiro - RJ"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"mailto:imprensa@be.capital",className:"footer__link"},"imprensa@be.capital"))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"footer__section footer__section--main"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--column"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h3",{className:"footer__title"},"Investimentos"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(InvestimentosMenu,null)),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--column"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h3",{className:"footer__title"},"Conte\xFAdos"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"footer__menu"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"menu__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://www.youtube.com/channel/UCLImIm6777cZiGmjaRuFcwQ?view_as=subscriber",className:"menu__link",target:"_blank",rel:"noopener noreferrer"},"Canal no Youtube")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"menu__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://t.me/becapitalresearch",className:"menu__link",target:"_blank",rel:"noopener noreferrer"},"Grupo no Telegram")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"menu__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/blog/",className:"menu__link"},"Blog")))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--column"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h3",{className:"footer__title"},"Nossa Empresa"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"footer__menu"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"menu__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/somos-becapital/",className:"menu__link"},"A BeCapital")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"menu__item width200"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://api.whatsapp.com/send?phone=5521965431886&text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20planejamento%20financeiro.%20O%20que%20devo%20fazer%3F%20Poderia%20me%20ajudar%3F",className:"menu__link"}," Fale com a Beca - Atendimento da BeCapital ")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"menu__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/carreiras/",className:"menu__link"},"P\xE1gina de Carreiras")))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--column"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/qrcode_3x.png",alt:"QRCode BeCapital",className:"qrcode",__imageData:__webpack_require__(3701)})))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"footer__section footer__section--footer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--column"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h3",{className:"footer__title"},"Siga a BeCapital"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"footer__social social__menu"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"social__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://www.instagram.com/becapital.oficial/",className:"social__link",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/icon_instagram_orange.png",alt:"Logo Instagram",__imageData:__webpack_require__(642)}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"social__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://www.youtube.com/channel/UCLImIm6777cZiGmjaRuFcwQ?view_as=subscriber",className:"social__link",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/icon_youtube_orange.png",alt:"Logo Youtube",__imageData:__webpack_require__(1088)}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"social__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://www.linkedin.com/company/71399542/",className:"social__link",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/icon_linkedin_orange.png",alt:"Logo Linkedin",__imageData:__webpack_require__(936)}))))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--column"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h3",{className:"footer__title"},"Hor\xE1rio de atendimento"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"footer__text"},"Segunda a Sexta de 9h \xE0s 18h")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--column"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h3",{className:"footer__title"},"Contato para atendimento"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"footer__text"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"tel:+552139939670"},"(21) 3993 - 9670"))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"footer__section--column"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://www2.susep.gov.br/safe/Corretores/pesquisa",className:"social__link",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_susep_1x.png",alt:"Logo SUSEP",__imageData:__webpack_require__(1734)}))))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"footer__section footer__end"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("small",{className:"footer__title"},"BeCapital ",/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("strong",null,"\xAE")," Todos os direitos reservados - CNPJ: 36.664.223/0001-09"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("small",{className:"footer__text"},"A BeCapital Live Corretora de Seguros LTDA  (CNPJ 29.761.563/0001-84) est\xE1 registrada na Susep com o c\xF3digo 212113018, estando autorizada a comercializar produtos como: micro-seguros, plano de capitaliza\xE7\xE3o, seguro de pessoas, plano de previd\xEAncia complementar e seguro de danos.")))));};/* harmony default export */ const components_Footer = (Footer);
;// CONCATENATED MODULE: ./src/components/layout.js
function Layout({children}){return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement((external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(Header_Header,null),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("main",null,children),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(components_Footer,null));}

/***/ }),

/***/ 6179:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1051);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4593);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2031);
/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */const Seo=({description,lang,meta,title})=>{var _wp$generalSettings,_wp$generalSettings2;const{wp,wpUser}=(0,gatsby__WEBPACK_IMPORTED_MODULE_3__.useStaticQuery)("848497233");const metaDescription=description||((_wp$generalSettings=wp.generalSettings)===null||_wp$generalSettings===void 0?void 0:_wp$generalSettings.description);const defaultTitle=(_wp$generalSettings2=wp.generalSettings)===null||_wp$generalSettings2===void 0?void 0:_wp$generalSettings2.title;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet,{htmlAttributes:{lang},title:title,titleTemplate:defaultTitle?`%s  ${defaultTitle}`:null,meta:[{name:`description`,content:metaDescription},{property:`og:title`,content:title},{property:`og:description`,content:metaDescription},{property:`og:type`,content:`website`},{name:`twitter:card`,content:`summary`},{name:`twitter:creator`,content:(wpUser===null||wpUser===void 0?void 0:wpUser.twitter)||``},{name:`twitter:title`,content:title},{name:`twitter:description`,content:metaDescription}].concat(meta)});};Seo.defaultProps={lang:`pt-br`,meta:[],description:``};Seo.propTypes={description:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),lang:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),meta:prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)),title:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired)};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ 3893:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages)
});

// EXTERNAL MODULE: external "C:\\Users\\home\\Desktop\\WORKSPACE\\FREELANCER\\BeCapital\\becapital\\node_modules\\react\\index.js"
var external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_ = __webpack_require__(1051);
var external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_);
// EXTERNAL MODULE: ./src/components/layout.js + 4 modules
var layout = __webpack_require__(8966);
// EXTERNAL MODULE: ./node_modules/react-slick/lib/index.js
var lib = __webpack_require__(6066);
// EXTERNAL MODULE: ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
var gatsby_image_module = __webpack_require__(8776);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(2031);
;// CONCATENATED MODULE: ./src/components/Slides/SlidesServices/index.js
function SampleNextArrow(props){const{className,onClick}=props;return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:className,onClick:onClick,onKeyDown:onClick,role:"button",tabIndex:"0"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"30",height:"71",viewBox:"0 0 41 71",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M39.0628 38.7462C40.9083 36.9007 40.9083 33.9086 39.0628 32.0631L8.98884 1.98915C7.14335 0.143661 4.15122 0.143661 2.30573 1.98915C0.460247 3.83464 0.460247 6.82676 2.30573 8.67225L29.0381 35.4047L2.30573 62.1371C0.460247 63.9826 0.460247 66.9747 2.30573 68.8202C4.15122 70.6657 7.14335 70.6657 8.98884 68.8202L39.0628 38.7462ZM29.9454 40.1303H35.7213V30.679H29.9454V40.1303Z",fill:"#1A4A73"})));}function SamplePrevArrow(props){const{className,onClick}=props;return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:className,onClick:onClick,onKeyDown:onClick,role:"button",tabIndex:"0"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"30",height:"71",viewBox:"0 0 41 71",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M2.32855 32.0631C0.483066 33.9086 0.483066 36.9007 2.32855 38.7462L32.4025 68.8202C34.248 70.6657 37.2401 70.6657 39.0856 68.8202C40.9311 66.9747 40.9311 63.9826 39.0856 62.1371L12.3532 35.4047L39.0856 8.67225C40.9311 6.82676 40.9311 3.83464 39.0856 1.98915C37.2401 0.143661 34.248 0.143661 32.4025 1.98915L2.32855 32.0631ZM13.0211 30.679H5.6701V40.1303H13.0211V30.679Z",fill:"#1A4A73"})));}class CenterMode extends external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_.Component{render(){const settings={className:"center",centerMode:true,focusOnSelect:true,infinite:true,touchMove:true,centerPadding:"50px",slidesToShow:1,speed:500,dots:false,nav:false,nextArrow:/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(SampleNextArrow,null),prevArrow:/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(SamplePrevArrow,null)};return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement((external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__slide-services"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"section__title"},"Seja BeCapital"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"section__subtitle"},"Um portf\xF3lio de servi\xE7os e produtos para quem quer transformar o sonho em meta."),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(lib/* default */.Z,Object.assign({},settings,{className:"slide-services__items slide-services"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"slide-services__custom-item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("article",{className:"slide-services__article"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",{className:"slide-services__icon"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"45",height:"46",viewBox:"0 0 45 46",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M40.6423 0.041626H12.1864C10.1984 0.041626 8.58691 1.64235 8.58691 3.61694V29.3524C8.58691 31.327 10.1984 32.9277 12.1864 32.9277H40.6423C42.6303 32.9277 44.2418 31.327 44.2418 29.3524V3.61694C44.2418 1.64235 42.6303 0.041626 40.6423 0.041626Z",fill:"#F69F92"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M32.7813 40.5169H4.76676C3.75359 40.5169 2.78191 40.1171 2.06549 39.4055C1.34907 38.6939 0.946594 37.7287 0.946594 36.7224L0.946594 11.4253C0.946594 10.419 1.34907 9.45381 2.06549 8.7422C2.78191 8.03058 3.75359 7.6308 4.76676 7.6308H32.7813C33.7945 7.6308 34.7662 8.03058 35.4826 8.7422C36.199 9.45381 36.6015 10.419 36.6015 11.4253V36.7224C36.6015 37.7287 36.199 38.6939 35.4826 39.4055C34.7662 40.1171 33.7945 40.5169 32.7813 40.5169ZM4.76676 10.1605C4.4304 10.1649 4.10906 10.2995 3.8712 10.5358C3.63334 10.7721 3.49777 11.0912 3.49337 11.4253V36.7224C3.49777 37.0565 3.63334 37.3756 3.8712 37.6119C4.10906 37.8482 4.4304 37.9828 4.76676 37.9872H32.7813C33.1177 37.9828 33.439 37.8482 33.6769 37.6119C33.9147 37.3756 34.0503 37.0565 34.0547 36.7224V11.4253C34.0503 11.0912 33.9147 10.7721 33.6769 10.5358C33.439 10.2995 33.1177 10.1649 32.7813 10.1605H4.76676Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M37.8749 45.5763H9.8603C9.52258 45.5763 9.19869 45.443 8.95988 45.2058C8.72107 44.9686 8.58691 44.6469 8.58691 44.3114C8.58691 43.976 8.72107 43.6542 8.95988 43.417C9.19869 43.1798 9.52258 43.0466 9.8603 43.0466H37.8749C38.2112 43.0422 38.5326 42.9075 38.7704 42.6713C39.0083 42.435 39.1438 42.1158 39.1482 41.7817V16.1474C39.1482 15.812 39.2824 15.4902 39.5212 15.253C39.76 15.0158 40.0839 14.8826 40.4216 14.8826C40.7594 14.8826 41.0832 15.0158 41.3221 15.253C41.5609 15.4902 41.695 15.812 41.695 16.1474V41.7817C41.695 42.7881 41.2925 43.7533 40.5761 44.4649C39.8597 45.1765 38.888 45.5763 37.8749 45.5763Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M22.5943 32.9278H14.9539C14.2785 32.9278 13.6307 32.6612 13.1531 32.1868C12.6755 31.7124 12.4072 31.069 12.4072 30.3981V20.7009C12.4072 20.3654 12.5413 20.0437 12.7801 19.8065C13.0189 19.5693 13.3428 19.436 13.6806 19.436C14.0183 19.436 14.3422 19.5693 14.581 19.8065C14.8198 20.0437 14.9539 20.3654 14.9539 20.7009V30.3981H22.5943V20.7009C22.5943 20.3654 22.7284 20.0437 22.9672 19.8065C23.206 19.5693 23.5299 19.436 23.8677 19.436C24.2054 19.436 24.5293 19.5693 24.7681 19.8065C25.0069 20.0437 25.141 20.3654 25.141 20.7009V30.3981C25.141 31.069 24.8727 31.7124 24.3951 32.1868C23.9175 32.6612 23.2697 32.9278 22.5943 32.9278Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M26.4144 24.0738C26.1181 24.0715 25.8311 23.9706 25.5994 23.7871L18.808 18.1375L12.0166 23.7871C11.7554 24.0108 11.4155 24.1222 11.0716 24.0969C10.7277 24.0716 10.4081 23.9117 10.1829 23.6522C9.95775 23.3928 9.84558 23.0552 9.87105 22.7136C9.89652 22.372 10.0576 22.0545 10.3187 21.8308L17.9251 15.5066C18.1586 15.2992 18.4608 15.1845 18.774 15.1845C19.0873 15.1845 19.3895 15.2992 19.623 15.5066L27.2633 21.8308C27.4694 21.9984 27.6174 22.2258 27.6865 22.4813C27.7557 22.7367 27.7425 23.0072 27.6488 23.2548C27.5551 23.5024 27.3856 23.7146 27.1641 23.8615C26.9427 24.0084 26.6805 24.0827 26.4144 24.0738Z",fill:"#1A4A71"}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"slide-services__title"},"Cons\xF3rcios"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"slide-services__text"},"Ao adquirir um cons\xF3rcio, voc\xEA planeja a aquisi\xE7\xE3o de um servi\xE7o, produto ou bem sem precisar se descapitalizar por completo. Voc\xEA se une a um grupo de pessoas que t\xEAm o mesmo objetivo que o seu, criando um formato de \"poupan\xE7a\", ou seja, cada um compra uma cota e paga em parcelas mensais, sem juros. Ao ser contemplado (a), voc\xEA resgata o valor integral necess\xE1rio para sua aquisi\xE7\xE3o. "),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/consorcios/",className:"slide-services__link"},"saiba mais")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__logos"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"logos__items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_itau_consorcio_1x.png",alt:"Logo Ita\xFA Consorcio",__imageData:__webpack_require__(1061)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_porto_seguro_1x.png",alt:"Logo Porto Seguro",__imageData:__webpack_require__(6927)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_caixa_1x.png",alt:"Logo Caixa",__imageData:__webpack_require__(8779)})))))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"slide-services__custom-item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("article",{className:"slide-services__article"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",{className:"slide-services__icon"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"52",height:"52",viewBox:"0 0 52 52",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M36.5929 31.1873C45.0532 31.1873 51.9116 24.368 51.9116 15.956C51.9116 7.54396 45.0532 0.72467 36.5929 0.72467C28.1327 0.72467 21.2743 7.54396 21.2743 15.956C21.2743 24.368 28.1327 31.1873 36.5929 31.1873Z",fill:"#F69F92"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M29.2167 38.0314C26.2367 38.035 23.3226 37.1597 20.8431 35.5162C18.3636 33.8726 16.4301 31.5348 15.2872 28.7984C14.1444 26.062 13.8434 23.05 14.4226 20.1435C15.0017 17.2371 16.4349 14.5667 18.5408 12.4703C20.6467 10.3739 23.3306 8.94564 26.253 8.36627C29.1755 7.7869 32.2051 8.08243 34.9585 9.21548C37.712 10.3485 40.0656 12.2682 41.7216 14.7316C43.3775 17.1949 44.2614 20.0913 44.2614 23.0543C44.2566 27.0219 42.6706 30.8258 39.8507 33.633C37.0308 36.4402 33.207 38.0218 29.2167 38.0314ZM29.2167 10.8003C26.7791 10.8003 24.3964 11.5189 22.3696 12.8654C20.3429 14.2119 18.7633 16.1257 17.8305 18.3649C16.8977 20.604 16.6536 23.0679 17.1292 25.4449C17.6047 27.822 18.7785 30.0054 20.5021 31.7192C22.2257 33.433 24.4216 34.6 26.8123 35.0729C29.203 35.5457 31.681 35.303 33.933 34.3755C36.1849 33.4481 38.1097 31.8774 39.4639 29.8623C40.8181 27.8471 41.5409 25.4779 41.5409 23.0543C41.5409 19.8043 40.2425 16.6875 37.9312 14.3894C35.62 12.0913 32.4853 10.8003 29.2167 10.8003Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M15.5231 46.2008C15.1599 46.2008 14.8116 46.0573 14.5548 45.802C14.298 45.5467 14.1537 45.2003 14.1537 44.8392V43.4777H12.7843C12.4212 43.4777 12.0729 43.3342 11.816 43.0789C11.5592 42.8235 11.415 42.4772 11.415 42.1161C11.415 41.755 11.5592 41.4087 11.816 41.1534C12.0729 40.898 12.4212 40.7546 12.7843 40.7546H16.436C16.6539 40.7541 16.8665 40.6879 17.0458 40.5647C17.2251 40.4415 17.3626 40.2672 17.4402 40.0647C17.5396 39.8014 17.5396 39.5111 17.4402 39.2478C17.3304 38.9911 17.1287 38.7841 16.8742 38.6668L13.2225 37.1782C12.511 36.9005 11.9003 36.4158 11.4703 35.7874C11.0403 35.1591 10.811 34.4163 10.8124 33.6563C10.8124 33.2952 10.9567 32.9489 11.2135 32.6935C11.4703 32.4382 11.8186 32.2947 12.1818 32.2947C12.545 32.2947 12.8933 32.4382 13.1501 32.6935C13.4069 32.9489 13.5512 33.2952 13.5512 33.6563C13.5527 33.8703 13.6175 34.0791 13.7377 34.2567C13.8578 34.4343 14.0279 34.5727 14.2267 34.6548L18.0062 36.1434C18.9427 36.5225 19.6908 37.2541 20.0874 38.1789C20.4841 39.1037 20.4973 40.1469 20.1241 41.0813C19.8628 41.7404 19.4187 42.3121 18.8433 42.7299C18.2679 43.1477 17.5851 43.3944 16.8742 43.4414V44.8392C16.8696 45.1958 16.7263 45.5368 16.4744 45.7906C16.2225 46.0444 15.8816 46.1914 15.5231 46.2008Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M15.5234 51.647C12.0549 51.6484 8.69222 50.4596 6.00319 48.2813C3.31416 46.103 1.46358 43.0687 0.763969 39.6908C0.0643559 36.313 0.55858 32.7986 2.16318 29.7411C3.76778 26.6836 6.38443 24.2704 9.57123 22.909C9.74465 22.8367 9.93091 22.7996 10.119 22.8001C10.434 22.8017 10.7388 22.9113 10.982 23.1104C11.2253 23.3094 11.3921 23.5858 11.4542 23.8928C11.5164 24.1999 11.4703 24.5189 11.3235 24.7961C11.1767 25.0732 10.9383 25.2916 10.6485 25.4143C7.98262 26.494 5.78095 28.4674 4.42537 30.9922C3.06979 33.5171 2.64583 36.4341 3.22702 39.2372C3.80821 42.0404 5.3579 44.5528 7.60725 46.3387C9.85661 48.1247 12.6637 49.0714 15.5417 49.0147C17.2071 48.9888 18.8488 48.6178 20.3618 47.9254C23.2661 46.6968 25.5814 44.4012 26.8252 41.517C26.9294 41.2701 27.1044 41.0591 27.3285 40.9106C27.5526 40.7621 27.8157 40.6825 28.085 40.6819C28.2741 40.6895 28.4599 40.7326 28.6328 40.809C28.8009 40.88 28.953 40.9836 29.0802 41.1139C29.2074 41.2442 29.3071 41.3984 29.3734 41.5676C29.4398 41.7367 29.4714 41.9174 29.4665 42.0989C29.4616 42.2804 29.4202 42.4591 29.3449 42.6244C27.8267 46.1491 25.0022 48.9574 21.4573 50.467C19.5846 51.2743 17.5645 51.6883 15.5234 51.6833V51.647Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M29.2167 32.5852C29.0353 32.5876 28.8553 32.5542 28.687 32.4868C28.5188 32.4195 28.3657 32.3196 28.2366 32.1929C28.1075 32.0662 28.005 31.9153 27.935 31.7489C27.8651 31.5825 27.829 31.404 27.8291 31.2236V29.8621H26.4597C26.0965 29.8621 25.7482 29.7186 25.4914 29.4633C25.2346 29.208 25.0903 28.8616 25.0903 28.5005C25.0903 28.1394 25.2346 27.7931 25.4914 27.5378C25.7482 27.2824 26.0965 27.139 26.4597 27.139H30.1113C30.2877 27.1307 30.4597 27.0809 30.6129 26.9935C30.7661 26.9062 30.8962 26.7839 30.9925 26.6367C31.0888 26.4895 31.1486 26.3217 31.1668 26.147C31.185 25.9723 31.1612 25.7959 31.0973 25.6322C30.9831 25.3723 30.7744 25.1648 30.513 25.0512L26.7336 23.5626C26.1469 23.3293 25.6277 22.9548 25.2226 22.4727C24.8175 21.9906 24.539 21.4161 24.4123 20.8006C24.2856 20.1851 24.3146 19.548 24.4967 18.9464C24.6788 18.3448 25.0082 17.7976 25.4555 17.3539C26.0966 16.7294 26.9352 16.3445 27.8291 16.2646V14.8849C27.8291 14.5238 27.9733 14.1775 28.2301 13.9222C28.4869 13.6668 28.8352 13.5234 29.1984 13.5234C29.5616 13.5234 29.9099 13.6668 30.1667 13.9222C30.4235 14.1775 30.5678 14.5238 30.5678 14.8849V16.2465H31.9372C32.3003 16.2465 32.6486 16.3899 32.9054 16.6453C33.1623 16.9006 33.3065 17.2469 33.3065 17.6081C33.3065 17.9692 33.1623 18.3155 32.9054 18.5708C32.6486 18.8262 32.3003 18.9696 31.9372 18.9696H28.2855C27.9995 18.9708 27.725 19.0813 27.5187 19.2782C27.419 19.3787 27.3402 19.4978 27.2869 19.6287C27.2337 19.7595 27.2069 19.8995 27.2083 20.0407C27.2098 20.2547 27.2747 20.4635 27.3948 20.6411C27.5149 20.8187 27.685 20.9571 27.8838 21.0392L31.6633 22.5278C32.5973 22.9097 33.3442 23.6393 33.7447 24.5611C33.9836 25.1065 34.0894 25.7003 34.0537 26.2941C34.0179 26.8879 33.8416 27.4649 33.539 27.9781C33.2365 28.4913 32.8162 28.9262 32.3126 29.2472C31.8089 29.5683 31.2361 29.7666 30.6408 29.8258V31.2236C30.6385 31.4064 30.5996 31.5869 30.5265 31.7546C30.4535 31.9223 30.3476 32.0738 30.2151 32.2005C30.0826 32.3272 29.9261 32.4264 29.7547 32.4925C29.5833 32.5585 29.4004 32.59 29.2167 32.5852Z",fill:"#1A4A71"}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"slide-services__title"},"C\xE2mbio"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"slide-services__text"},"Se voc\xEA vai viajar pra fora do pa\xEDs, ou receber e realizar um pagamento internacional, conte com a BeCapital na sua bagagem. Realizamos opera\xE7\xF5es de c\xE2mbio para pessoas f\xEDsica e jur\xEDdica, com taxas e condi\xE7\xF5es competitivas no mercado. Atuamos com envio de remessas para o exterior e venda de moedas. Trabalhamos com todas elas! Ent\xE3o, para qualquer lugar que voc\xEA for, estaremos sempre com voc\xEA."),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/cambio/",className:"slide-services__link"},"saiba mais")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__logos"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"logos__items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_advanced.png",alt:"Logo Advanced",__imageData:__webpack_require__(7985)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_banco_daycoval.png",alt:"Logo Banco Daycoval",__imageData:__webpack_require__(4594)})))))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"slide-services__custom-item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("article",{className:"slide-services__article"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",{className:"slide-services__icon"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"65",height:"68",viewBox:"0 0 65 68",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M51.26 1H18.58C15.7992 1 13.545 3.23858 13.545 6V45.5283C13.545 48.2897 15.7992 50.5283 18.58 50.5283H51.26C54.0408 50.5283 56.295 48.2897 56.295 45.5283V6C56.295 3.23858 54.0408 1 51.26 1Z",fill:"#F69F92"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M45.2275 58.9245H40.4775C40.0051 58.9245 39.552 58.7381 39.218 58.4064C38.8839 58.0747 38.6962 57.6247 38.6962 57.1556C38.6962 56.6865 38.8839 56.2366 39.218 55.9048C39.552 55.5731 40.0051 55.3867 40.4775 55.3867H45.2275C45.5557 55.3904 45.8748 55.2795 46.1291 55.0733C46.3834 54.8672 46.5567 54.579 46.6189 54.259C46.6811 53.9389 46.6282 53.6074 46.4694 53.3221C46.3106 53.0368 46.056 52.816 45.75 52.6981L40.8575 50.7641C39.8292 50.3119 38.9859 49.5264 38.4659 48.5362C37.9459 47.5459 37.7799 46.4096 37.9952 45.3135C38.2104 44.2173 38.7941 43.2262 39.6507 42.5025C40.5073 41.7789 41.5859 41.3655 42.71 41.3301H47.46C47.9324 41.3301 48.3855 41.5165 48.7195 41.8482C49.0536 42.18 49.2413 42.6299 49.2413 43.099C49.2413 43.5681 49.0536 44.0181 48.7195 44.3498C48.3855 44.6815 47.9324 44.8679 47.46 44.8679H42.71C42.3835 44.8677 42.0673 44.9807 41.8158 45.1874C41.5643 45.3941 41.3934 45.6815 41.3325 46C41.2606 46.3183 41.3076 46.6517 41.4649 46.9381C41.6222 47.2245 41.8791 47.4443 42.1875 47.5566L47.08 49.5141C48.1083 49.9663 48.9516 50.7518 49.4716 51.742C49.9916 52.7323 50.1576 53.8686 49.9423 54.9647C49.7271 56.0609 49.1434 57.052 48.2868 57.7757C47.4302 58.4993 46.3516 58.9127 45.2275 58.9481V58.9245Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M43.9687 44.7736C43.4963 44.7736 43.0432 44.5872 42.7092 44.2555C42.3751 43.9238 42.1875 43.4738 42.1875 43.0047V41.2358C42.1875 40.7667 42.3751 40.3168 42.7092 39.9851C43.0432 39.6533 43.4963 39.467 43.9687 39.467C44.4411 39.467 44.8942 39.6533 45.2283 39.9851C45.5623 40.3168 45.75 40.7667 45.75 41.2358V43.0047C45.75 43.4738 45.5623 43.9238 45.2283 44.2555C44.8942 44.5872 44.4411 44.7736 43.9687 44.7736Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M43.9687 60.6934C43.4963 60.6934 43.0432 60.507 42.7092 60.1753C42.3751 59.8436 42.1875 59.3937 42.1875 58.9245V57.1556C42.1875 56.6865 42.3751 56.2366 42.7092 55.9049C43.0432 55.5731 43.4963 55.3868 43.9687 55.3868C44.4411 55.3868 44.8942 55.5731 45.2283 55.9049C45.5623 56.2366 45.75 56.6865 45.75 57.1556V58.9245C45.75 59.3937 45.5623 59.8436 45.2283 60.1753C44.8942 60.507 44.4411 60.6934 43.9687 60.6934Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M43.9687 66C40.7981 66 37.6986 65.0663 35.0623 63.317C32.4259 61.5677 30.3712 59.0814 29.1578 56.1724C27.9444 53.2634 27.627 50.0625 28.2455 46.9744C28.8641 43.8862 30.3909 41.0496 32.6329 38.8232C34.8749 36.5967 37.7314 35.0805 40.8412 34.4662C43.951 33.852 47.1743 34.1672 50.1036 35.3722C53.033 36.5771 55.5367 38.6176 57.2982 41.2356C59.0598 43.8536 60 46.9315 60 50.0802C60 52.1708 59.5853 54.2409 58.7797 56.1724C57.974 58.1039 56.7932 59.8589 55.3045 61.3372C53.8159 62.8155 52.0486 63.9881 50.1036 64.7882C48.1586 65.5882 46.074 66 43.9687 66ZM43.9687 37.6981C41.5027 37.6981 39.092 38.4243 37.0415 39.7848C34.991 41.1454 33.3928 43.0792 32.4491 45.3417C31.5054 47.6043 31.2585 50.0939 31.7396 52.4958C32.2207 54.8977 33.4082 57.1039 35.152 58.8356C36.8958 60.5673 39.1175 61.7466 41.5362 62.2243C43.9549 62.7021 46.462 62.4569 48.7403 61.5197C51.0187 60.5825 52.966 58.9955 54.3361 56.9593C55.7062 54.9231 56.4375 52.5291 56.4375 50.0802C56.4312 46.7981 55.1155 43.6523 52.7785 41.3316C50.4416 39.0109 47.2737 37.7043 43.9687 37.6981Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M22.5937 48.3113H11.9062C11.4338 48.3113 10.9807 48.125 10.6467 47.7932C10.3127 47.4615 10.125 47.0116 10.125 46.5425V25.316C10.125 24.8469 10.3127 24.397 10.6467 24.0653C10.9807 23.7335 11.4338 23.5472 11.9062 23.5472C12.3787 23.5472 12.8317 23.7335 13.1658 24.0653C13.4998 24.397 13.6875 24.8469 13.6875 25.316V44.7736H22.5937C23.0662 44.7736 23.5192 44.96 23.8533 45.2917C24.1873 45.6234 24.375 46.0733 24.375 46.5425C24.375 47.0116 24.1873 47.4615 23.8533 47.7932C23.5192 48.125 23.0662 48.3113 22.5937 48.3113Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M11.9062 41.2359C11.6722 41.237 11.4403 41.1917 11.2242 41.1026C11.008 41.0135 10.8119 40.8824 10.6475 40.717C10.3139 40.3854 10.1266 39.9358 10.1266 39.467C10.1266 38.9983 10.3139 38.5487 10.6475 38.217L17.0362 31.8727C18.0528 30.9068 19.4055 30.3677 20.8125 30.3677C22.2194 30.3677 23.5721 30.9068 24.5887 31.8727L25.9662 33.2406C26.1569 33.4341 26.3898 33.5816 26.6469 33.6717C26.904 33.7617 27.1785 33.792 27.4493 33.7601C27.72 33.7282 27.9798 33.635 28.2085 33.4877C28.4373 33.3404 28.629 33.1429 28.7687 32.9104L29.6 31.4953C29.8425 31.0919 30.2365 30.8006 30.6952 30.6856C31.154 30.5706 31.64 30.6413 32.0462 30.8821C32.4525 31.123 32.7458 31.5142 32.8616 31.9698C32.9774 32.4253 32.9062 32.9079 32.6637 33.3114L31.8087 34.7265C31.3934 35.421 30.8233 36.0116 30.1421 36.4531C29.461 36.8945 28.687 37.175 27.8796 37.273C27.0722 37.3709 26.253 37.2837 25.4849 37.0181C24.7168 36.7524 24.0202 36.3154 23.4487 35.7406L22 34.3727C21.6602 34.0525 21.2096 33.874 20.7412 33.874C20.2728 33.874 19.8223 34.0525 19.4825 34.3727L13.165 40.717C13.0005 40.8824 12.8045 41.0135 12.5883 41.1026C12.3722 41.1917 12.1403 41.237 11.9062 41.2359Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M20.8125 58.9245H8.34372C6.92647 58.9245 5.56727 58.3655 4.56512 57.3703C3.56297 56.3751 2.99997 55.0253 2.99997 53.6179L2.99997 14.7028C2.99997 13.2954 3.56297 11.9457 4.56512 10.9505C5.56727 9.95533 6.92647 9.39624 8.34372 9.39624H33.59C35.0057 9.4026 36.3621 9.96172 37.3662 10.9528L44.1825 17.7217C44.682 18.2116 45.078 18.7957 45.3472 19.4397C45.6163 20.0836 45.7533 20.7745 45.75 21.4717V27.0849C45.75 27.5541 45.5623 28.004 45.2283 28.3357C44.8942 28.6674 44.4411 28.8538 43.9687 28.8538C43.4963 28.8538 43.0432 28.6674 42.7092 28.3357C42.3751 28.004 42.1875 27.5541 42.1875 27.0849V21.4717C42.182 21.0038 41.9948 20.556 41.665 20.2217L34.8487 13.4528C34.515 13.121 34.0622 12.9344 33.59 12.934H8.34372C7.87322 12.9401 7.42371 13.1284 7.09099 13.4588C6.75826 13.7892 6.56862 14.2356 6.56247 14.7028V53.6179C6.56247 54.0871 6.75014 54.537 7.08419 54.8687C7.41823 55.2004 7.8713 55.3868 8.34372 55.3868H20.8125C21.2849 55.3868 21.738 55.5732 22.072 55.9049C22.4061 56.2366 22.5937 56.6865 22.5937 57.1557C22.5937 57.6248 22.4061 58.0747 22.072 58.4065C21.738 58.7382 21.2849 58.9245 20.8125 58.9245Z",fill:"#1A4A71"}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"slide-services__title"},"Planejamento Financeiro"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"slide-services__text"},"Qual \xE9 o seu objetivo de vida hoje? O que voc\xEA deseja alcan\xE7ar? Seja o que for, o nosso time desenvolve todas as etapas necess\xE1rias para voc\xEA conseguir conquistar o que voc\xEA quer. Sabemos, por\xE9m, que essa trajet\xF3ria envolve a possibilidade de imprevistos. Eles s\xE3o aquela parte turbulenta do sonho. E como resolv\xEA-los? A BeCapital existe para planejar, executar e transformar os seus sonhos em conquistas concretas."),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://maquinadossonhos.be.capital/",target:"_blank",rel:"noopener noreferrer",className:"slide-services__link"},"saiba mais")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__logos"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"logos__items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_itau_consorcio_1x.png",alt:"Logo Ita\xFA Consorcio",__imageData:__webpack_require__(1061)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_porto_seguro_1x.png",alt:"Logo Porto Seguro",__imageData:__webpack_require__(6927)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_caixa_1x.png",alt:"Logo Caixa",__imageData:__webpack_require__(8779)})))))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"slide-services__custom-item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("article",{className:"slide-services__article"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",{className:"slide-services__icon"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"47",height:"39",viewBox:"0 0 47 39",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("g",{"clip-path":"url(#clip0)"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M42.979 0.0328369H10.5095C8.44042 0.0328369 6.76306 1.71634 6.76306 3.79305V28.8611C6.76306 30.9378 8.44042 32.6213 10.5095 32.6213H42.979C45.0481 32.6213 46.7255 30.9378 46.7255 28.8611V3.79305C46.7255 1.71634 45.0481 0.0328369 42.979 0.0328369Z",fill:"#F69F92"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M4.2654 38.8883C3.27177 38.8883 2.31884 38.4922 1.61624 37.787C0.913638 37.0818 0.518921 36.1254 0.518921 35.1281L0.518921 10.0601C0.518921 9.06281 0.913638 8.10638 1.61624 7.40121C2.31884 6.69603 3.27177 6.29987 4.2654 6.29987H36.7348C37.7285 6.29987 38.6814 6.69603 39.384 7.40121C40.0866 8.10638 40.4813 9.06281 40.4813 10.0601V35.1281C40.4813 36.1254 40.0866 37.0818 39.384 37.787C38.6814 38.4922 37.7285 38.8883 36.7348 38.8883H4.2654ZM3.01657 35.1281C3.02088 35.4592 3.15384 35.7755 3.38711 36.0096C3.62038 36.2438 3.93553 36.3772 4.2654 36.3815H36.7348C37.0647 36.3772 37.3799 36.2438 37.6131 36.0096C37.8464 35.7755 37.9794 35.4592 37.9837 35.1281V16.3271H3.01657V35.1281ZM37.9837 13.8203V10.0601C37.9794 9.729 37.8464 9.4127 37.6131 9.17857C37.3799 8.94444 37.0647 8.811 36.7348 8.80667H4.2654C3.93553 8.811 3.62038 8.94444 3.38711 9.17857C3.15384 9.4127 3.02088 9.729 3.01657 10.0601V13.8203H37.9837Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M24.2466 23.8474C23.9154 23.8474 23.5977 23.7154 23.3635 23.4803C23.1293 23.2453 22.9977 22.9265 22.9977 22.594C22.9977 22.2616 23.1293 21.9428 23.3635 21.7078C23.5977 21.4727 23.9154 21.3406 24.2466 21.3406H34.2372C34.5684 21.3406 34.886 21.4727 35.1202 21.7078C35.3544 21.9428 35.486 22.2616 35.486 22.594C35.486 22.9265 35.3544 23.2453 35.1202 23.4803C34.886 23.7154 34.5684 23.8474 34.2372 23.8474H24.2466Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M24.2466 31.3679C23.9154 31.3679 23.5977 31.2358 23.3635 31.0008C23.1293 30.7657 22.9977 30.4469 22.9977 30.1145C22.9977 29.7821 23.1293 29.4633 23.3635 29.2282C23.5977 28.9931 23.9154 28.8611 24.2466 28.8611H29.2419C29.5731 28.8611 29.8907 28.9931 30.1249 29.2282C30.3591 29.4633 30.4907 29.7821 30.4907 30.1145C30.4907 30.4469 30.3591 30.7657 30.1249 31.0008C29.8907 31.2358 29.5731 31.3679 29.2419 31.3679H24.2466Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M13.0072 32.6214C12.6773 32.617 12.3622 32.4836 12.1289 32.2495C11.8956 32.0153 11.7627 31.699 11.7584 31.368V27.6078H8.01189C7.68068 27.6078 7.36303 27.4757 7.12883 27.2406C6.89463 27.0056 6.76306 26.6868 6.76306 26.3544C6.76306 26.0219 6.89463 25.7031 7.12883 25.4681C7.36303 25.233 7.68068 25.101 8.01189 25.101H11.7584V21.3407C11.7584 21.0083 11.8899 20.6895 12.1241 20.4545C12.3583 20.2194 12.676 20.0873 13.0072 20.0873C13.3384 20.0873 13.656 20.2194 13.8902 20.4545C14.1244 20.6895 14.256 21.0083 14.256 21.3407V25.101H18.0025C18.3337 25.101 18.6513 25.233 18.8855 25.4681C19.1197 25.7031 19.2513 26.0219 19.2513 26.3544C19.2513 26.6868 19.1197 27.0056 18.8855 27.2406C18.6513 27.4757 18.3337 27.6078 18.0025 27.6078H14.256V31.368C14.2517 31.699 14.1187 32.0153 13.8855 32.2495C13.6522 32.4836 13.3371 32.617 13.0072 32.6214Z",fill:"#1A4A71"})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("defs",null,/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("clipPath",{id:"clip0"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("rect",{width:"46.2065",height:"38.8555",fill:"white",transform:"translate(0.518921 0.0328369)"}))))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"slide-services__title"},"Plano de Sa\xFAde"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"slide-services__text"},"Ter um plano de sa\xFAde \xE9 a alternativa mais eficaz na redu\xE7\xE3o dos seus custos. Voc\xEA n\xE3o vai desembolsar toda vez que precisar fazer um exame, uma consulta ou at\xE9 uma cirurgia mais complexa. Nossos planos apresentam diferentes coberturas para te atender de acordo com as suas necessidades. E o melhor: trabalhamos com as principais empresas do mercado."),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/plano-de-saude/",className:"slide-services__link"},"saiba mais")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__logos"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"logos__items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_amil.png",alt:"Logo Amil",__imageData:__webpack_require__(1153)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_bradesco-saude.png",alt:"Logo Bradesco Sa\xFAde",__imageData:__webpack_require__(8710)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_goldencross.png",alt:"Logo Golden Cross",__imageData:__webpack_require__(5556)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_notredame.png",alt:"Logo Notredame",__imageData:__webpack_require__(5844)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_sulamerica_saude.png",alt:"Logo Sulamerica Sa\xFAde",__imageData:__webpack_require__(9031)})))))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"slide-services__custom-item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("article",{className:"slide-services__article"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",{className:"slide-services__icon"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"54",height:"50",viewBox:"0 0 54 50",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M8.37329 22.7681C8.37329 16.7977 10.7457 11.0719 14.9686 6.85015C19.1915 2.62845 24.919 0.256714 30.891 0.256714C36.8631 0.256714 42.5906 2.62845 46.8135 6.85015C51.0364 11.0719 53.4088 16.7977 53.4088 22.7681",fill:"#F69F92"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M19.936 49.6071C18.8031 49.6071 17.7165 49.1572 16.9153 48.3563C16.1142 47.5554 15.6641 46.4691 15.6641 45.3364C15.6641 44.9589 15.8142 44.5968 16.0812 44.3298C16.3483 44.0628 16.7104 43.9129 17.0881 43.9129C17.4658 43.9129 17.828 44.0628 18.095 44.3298C18.362 44.5968 18.5121 44.9589 18.5121 45.3364C18.5121 45.714 18.6621 46.0761 18.9291 46.343C19.1962 46.61 19.5584 46.76 19.936 46.76C20.3137 46.76 20.6759 46.61 20.9429 46.343C21.21 46.0761 21.36 45.714 21.36 45.3364V28.2536C19.5804 28.5389 17.9379 29.3832 16.6704 30.6642C16.4036 30.9312 16.0417 31.0814 15.6641 31.0817C15.456 31.0877 15.2489 31.0503 15.0561 30.9718C14.8632 30.8934 14.6888 30.7757 14.5439 30.6262V30.5123C13.9154 29.7531 13.1416 29.1269 12.2679 28.6706C11.3941 28.2143 10.438 27.937 9.45562 27.855C9.22186 27.8355 8.98688 27.8355 8.75312 27.855C6.95283 27.7889 5.19046 28.383 3.7977 29.5253L2.25981 30.797C2.0056 31.0144 1.68296 31.1353 1.34847 31.1387C1.13942 31.1328 0.933327 31.0877 0.740909 31.0058C0.511822 30.8782 0.321838 30.6907 0.191376 30.4633C0.0609138 30.2359 -0.00509486 29.9772 0.000444087 29.7151C-0.0109018 23.913 2.19306 18.3252 6.1625 14.0924C10.1319 9.85948 15.5676 7.30059 21.36 6.93796V5.51439C21.36 5.13684 21.51 4.77475 21.7771 4.50777C22.0441 4.2408 22.4063 4.09082 22.784 4.09082C23.1617 4.09082 23.5238 4.2408 23.7909 4.50777C24.0579 4.77475 24.208 5.13684 24.208 5.51439V6.97592C29.9938 7.33815 35.424 9.8917 39.3925 14.1165C43.3609 18.3413 45.5692 23.9195 45.5675 29.7151C45.5659 29.9851 45.4885 30.2491 45.3442 30.4773C45.1999 30.7055 44.9944 30.8886 44.7511 31.0058C44.5587 31.0877 44.3526 31.1328 44.1436 31.1387C43.8091 31.1353 43.4864 31.0144 43.2322 30.797L41.5614 29.4114C40.0054 28.1732 38.0211 27.6036 36.045 27.8278C34.0689 28.0521 32.2629 29.0518 31.024 30.6072C30.8881 30.7681 30.7198 30.8987 30.5301 30.9902C30.3403 31.0818 30.1334 31.1324 29.9228 31.1387C29.727 31.1376 29.5334 31.0966 29.3538 31.0183C29.1743 30.94 29.0126 30.8259 28.8786 30.6831C27.6079 29.4239 25.9746 28.5941 24.208 28.3105V45.3934C24.193 46.5161 23.7363 47.5878 22.9368 48.3765C22.1373 49.1651 21.0592 49.6072 19.936 49.6071ZM22.784 25.3305C25.3246 25.3358 27.7931 26.1762 29.8089 27.7221C31.4914 26.1505 33.6493 25.1835 35.9424 24.9739C38.2355 24.7642 40.5331 25.3238 42.4728 26.5643C41.7284 21.8791 39.3367 17.6131 35.7278 14.533C32.1188 11.4529 27.5292 9.76071 22.784 9.76071C18.0388 9.76071 13.4492 11.4529 9.84021 14.533C6.23124 17.6131 3.8396 21.8791 3.09521 26.5643C4.75695 25.4879 6.69715 24.9205 8.67718 24.9319H9.62649C11.9267 25.1447 14.0877 26.1279 15.7591 27.7221C17.7736 26.1737 20.2429 25.333 22.784 25.3305Z",fill:"#1A4A71"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M35.5617 49.6072C35.227 49.6052 34.8962 49.5352 34.5894 49.4014C34.2825 49.2676 34.0062 49.0729 33.777 48.829L27.1128 42.0148C26.1614 41.0249 25.63 39.7053 25.63 38.3325C25.63 36.9597 26.1614 35.6401 27.1128 34.6502L27.2837 34.4793C28.2491 33.5628 29.5385 33.0662 30.8694 33.0982C32.2004 33.1302 33.4644 33.6883 34.3846 34.6502L35.5997 35.8839L36.8148 34.6312L36.9857 34.4793C37.9391 33.5779 39.205 33.0813 40.5171 33.0937C41.1803 33.1017 41.8351 33.2437 42.442 33.5111C43.0489 33.7786 43.5954 34.1661 44.0486 34.6502C44.9988 35.6369 45.5296 36.9533 45.5296 38.323C45.5296 39.6927 44.9988 41.0091 44.0486 41.9958L37.3844 48.9049L37.2895 48.9998C36.8224 49.4404 36.2039 49.685 35.5617 49.6831V49.6072ZM30.7392 35.865C30.1832 35.8665 29.648 36.0765 29.2393 36.4534C28.8014 36.9182 28.5575 37.5326 28.5575 38.1711C28.5575 38.8097 28.8014 39.4241 29.2393 39.8889L35.6756 46.5512L42.112 39.8889C42.5499 39.4241 42.7937 38.8097 42.7937 38.1711C42.7937 37.5326 42.5499 36.9182 42.112 36.4534C41.7046 36.0414 41.1534 35.8033 40.5741 35.789C40.0301 35.7945 39.5082 36.0046 39.1121 36.3774L36.8718 38.6931C36.5999 38.9665 36.2321 39.1232 35.8465 39.1297C35.6552 39.1285 35.466 39.0893 35.29 39.0143C35.114 38.9394 34.9547 38.8302 34.8212 38.6931L32.2771 36.5862C31.8751 36.1639 31.3221 35.9182 30.7392 35.9029V35.865Z",fill:"#1A4A71"}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"slide-services__title"},"Seguro de Vida"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"slide-services__text"},"O seguro de vida \xE9 a sua blindagem patrimonial, ou seja, qualquer dano que aconte\xE7a com voc\xEA, em sua vida, o seguro estar\xE1 l\xE1 para proteger o que voc\xEA conquistou e o que mais importa."),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:"/seguro-de-vida/",className:"slide-services__link"},"saiba mais")),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__logos"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"logos__items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_icatu.png",alt:"Logo Icatu",__imageData:__webpack_require__(8174)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_mapfre.png",alt:"Logo Mapfre",__imageData:__webpack_require__(5544)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_centauro-on.png",alt:"Logo Centauro on",__imageData:__webpack_require__(5339)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_metlife.png",alt:"Logo Metlife",__imageData:__webpack_require__(4027)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_mongeral_aegon.png",alt:"Logo Mogeral aegon",__imageData:__webpack_require__(9653)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_omint.png",alt:"Logo Omint",__imageData:__webpack_require__(3651)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/logo_prudential.png",alt:"Logo Prudential",__imageData:__webpack_require__(8998)}))))))))));}}
;// CONCATENATED MODULE: ./src/components/SectionMidia/index.js
function SectionMidia(){return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__midia"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"section__title"},"Na m\xEDdia"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"logos__items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://forbes.com.br/forbes-money/2021/07/ipos-impulsionam-flippers-conheca-estrategias-e-riscos-da-pratica/",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_forbes_1x.png",alt:"Logo Forbes",__imageData:__webpack_require__(6156)}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://virtz.r7.com/criancas-com-deficiencia-ganham-festa-do-hamburguer-em-ong-08062021",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_r7_1x.png",alt:"Logo portal R7",__imageData:__webpack_require__(6057)}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://economia.estadao.com.br/noticias/geral,o-dilema-do-mundo-imobiliario,70003817015",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_estadao_1x.png",alt:"Logo Estad\xE3o",__imageData:__webpack_require__(2426)}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"http://revistapress.com.br/advertising/becapital-lanca-campanha-digital-que-incentiva-as-pessoas-a-realizarem-seus-sonhos/",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_press_1x.png",alt:"Logo revista press",__imageData:__webpack_require__(5331)}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{className:"logos__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://www.abcdacomunicacao.com.br/becapital-lanca-campanha-digital-que-incentiva-as-pessoas-a-realizarem-seus-sonhos/",target:"_blank",rel:"noopener noreferrer"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../images/logo_abc_1x.png",alt:"Logo ABC da Comunica\xE7\xE3o",__imageData:__webpack_require__(2459)}))))));}
// EXTERNAL MODULE: ./node_modules/html-react-parser/index.mjs
var html_react_parser = __webpack_require__(5935);
;// CONCATENATED MODULE: ./src/components/Cards/CardBlog/index.js
function CardBlog(){return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.StaticQuery,{query:"1976188318",render:data=>/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__posts--more"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"section__title"},"Blog"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__content posts posts--grid"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"posts__items"},data.allWpPost.nodes.map(article=>{const{uri,title,featuredImage,excerpt}=article;const image=(0,gatsby_image_module/* getImage */.gJ)(featuredImage.node.localFile);return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{key:uri,className:"posts__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{to:uri},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("article",{className:"posts__article"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* GatsbyImage */.HN,{image:image,alt:title,as:"figure",className:"posts__figure",imgClassName:"posts__image"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"posts__title"},(0,html_react_parser/* default */.ZP)(title)),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"posts__excerpt"},(0,html_react_parser/* default */.ZP)(excerpt)),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:uri,className:"button button__primary"},"LER ARTIGO"))));}))))});}
;// CONCATENATED MODULE: ./src/components/Slides/SlideTestimony/index.js
function SlideTestimony_SampleNextArrow(props){const{className,onClick}=props;return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:className,onClick:onClick,onKeyDown:onClick,role:"button",tabIndex:"0"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"30",height:"71",viewBox:"0 0 41 71",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M39.0628 38.7462C40.9083 36.9007 40.9083 33.9086 39.0628 32.0631L8.98884 1.98915C7.14335 0.143661 4.15122 0.143661 2.30573 1.98915C0.460247 3.83464 0.460247 6.82676 2.30573 8.67225L29.0381 35.4047L2.30573 62.1371C0.460247 63.9826 0.460247 66.9747 2.30573 68.8202C4.15122 70.6657 7.14335 70.6657 8.98884 68.8202L39.0628 38.7462ZM29.9454 40.1303H35.7213V30.679H29.9454V40.1303Z",fill:"#1A4A73"})));}function SlideTestimony_SamplePrevArrow(props){const{className,onClick}=props;return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:className,onClick:onClick,onKeyDown:onClick,role:"button",tabIndex:"0"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("svg",{width:"30",height:"71",viewBox:"0 0 41 71",fill:"none",xmlns:"http://www.w3.org/2000/svg"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("path",{d:"M2.32855 32.0631C0.483066 33.9086 0.483066 36.9007 2.32855 38.7462L32.4025 68.8202C34.248 70.6657 37.2401 70.6657 39.0856 68.8202C40.9311 66.9747 40.9311 63.9826 39.0856 62.1371L12.3532 35.4047L39.0856 8.67225C40.9311 6.82676 40.9311 3.83464 39.0856 1.98915C37.2401 0.143661 34.248 0.143661 32.4025 1.98915L2.32855 32.0631ZM13.0211 30.679H5.6701V40.1303H13.0211V30.679Z",fill:"#1A4A73"})));}class SlideTestimony extends external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_.Component{render(){const settings={infinite:true,touchMove:true,centerPadding:30,slidesToShow:1,slidesToScroll:1,speed:500,dots:true,arrows:true,nextArrow:/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(SlideTestimony_SampleNextArrow,null),prevArrow:/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(SlideTestimony_SamplePrevArrow,null)};return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_browser_entry.StaticQuery,{query:"417994374",render:data=>/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"section section__testimonies"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"section__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"section__title"},"Quem j\xE1 soma"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("ul",{className:"testimonies__items"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(lib/* default */.Z,settings,data.allWpDepoimento.nodes.map(testimony=>{const{id,title,content,featuredImage}=testimony;const img=(0,gatsby_image_module/* getImage */.gJ)(featuredImage.node.localFile);return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("li",{key:id,className:"testimonies__item"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("article",{className:"testimonies__card"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("header",{className:"testimonies__header"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"testimonies__header--sub"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* GatsbyImage */.HN,{image:img,alt:title,as:"figure",className:"testimonies__figure",imgClassName:"testimonies__image"}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("span",null,/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h2",{className:"testimonies__name"},(0,html_react_parser/* default */.ZP)(title)),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("small",{className:"testimonies__description"},"Cliente BeCapital"))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(gatsby_image_module/* StaticImage */.Jv,{src:"../../../images/icon_bullets_menu.png",alt:"icone de menu",__imageData:__webpack_require__(7948)})),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"testimonies__text"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"testimonies__text--site"},"Como \xE9 investir na BeCapital?"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"testimonies__text--client"},(0,html_react_parser/* default */.ZP)(content)))));}))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"button__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://conteudo.be.capital/quero-investir-becapital",className:"button button__secondary",target:"_blank",rel:"noopener noreferrer"},"Quero Investir"))))});}}
// EXTERNAL MODULE: ./src/components/seo.js
var seo = __webpack_require__(6179);
;// CONCATENATED MODULE: ./src/images/banner-home_1.webp
/* harmony default export */ const banner_home_1 = (__webpack_require__.p + "static/banner-home_1-bc429da9feeef20048b0aafcb862fbf5.webp");
;// CONCATENATED MODULE: ./src/pages/index.js
const styleBackgroundImage={backgroundImage:`url(${banner_home_1})`};const Home=()=>{return/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(layout/* default */.Z,null,/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(seo/* default */.Z,{title:" ",description:"Uma nova maneira de pensar e agir no mercado de capitais. Acreditamos que investir \xE9 para todos."}),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("section",{className:"banner banner__primary",style:styleBackgroundImage},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"banner__content"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"banner__primary-description"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("h1",{className:"banner__title"},"Fa\xE7a seu planejamento financeiro agora"),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("p",{className:"banner__subtitle"},"Nosso orientador financeiro te ajudar\xE1 a encontrar o t\xEDtulo mais adequado para voc\xEA atingir seu objetivo. "),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("div",{className:"button__container"},/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement("a",{href:"https://conteudo.be.capital/quero-investir-becapital",target:"_blank",rel:"noopener noreferrer",className:"button button__secondary"},"Simule seu investimento"))))),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(CenterMode,null),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(SlideTestimony,null),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(SectionMidia,null),/*#__PURE__*/external_C_Users_home_Desktop_WORKSPACE_FREELANCER_BeCapital_becapital_node_modules_react_index_js_default().createElement(CardBlog,null));};/* harmony default export */ const pages = (Home);

/***/ }),

/***/ 9404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * When running on Node.js, use the server parser.
 * When bundling for the browser, use the client parser.
 *
 * @see {@link https://github.com/substack/node-browserify#browser-field}
 */
module.exports = __webpack_require__(2720);


/***/ }),

/***/ 2720:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Parser = (__webpack_require__(763).Parser);
var DomHandler = (__webpack_require__(7915).DomHandler);

var unsetRootParent = (__webpack_require__(3576).unsetRootParent);

/**
 * Parses HTML string to DOM nodes in Node.js.
 *
 * This is the same method as `require('htmlparser2').parseDOM`
 * https://github.com/fb55/htmlparser2/blob/v6.0.0/src/index.ts#L29-L41
 *
 * @param  {string}            html      - HTML markup.
 * @param  {DomHandlerOptions} [options] - Parser options (https://github.com/fb55/domhandler/tree/v4.0.0#readme).
 * @return {Array<Comment|Element|ProcessingInstruction|Text>} - DOM nodes.
 */
function HTMLDOMParser(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string.');
  }

  if (html === '') {
    return [];
  }

  var handler = new DomHandler(undefined, options);
  new Parser(handler, options).end(html);
  return unsetRootParent(handler.dom);
}

module.exports = HTMLDOMParser;


/***/ }),

/***/ 3576:
/***/ ((module) => {

/**
 * Sets root parent to null.
 *
 * @param  {Array<Comment|Element|ProcessingInstruction|Text>} nodes
 * @return {Array<Comment|Element|ProcessingInstruction|Text>}
 */
function unsetRootParent(nodes) {
  for (var index = 0, len = nodes.length; index < len; index++) {
    var node = nodes[index];
    node.parent = null;
  }
  return nodes;
}

module.exports = {
  unsetRootParent: unsetRootParent
};


/***/ }),

/***/ 488:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var domToReact = __webpack_require__(3670);
var attributesToProps = __webpack_require__(484);
var htmlToDOM = __webpack_require__(9404);

var domParserOptions = { lowerCaseAttributeNames: false };

/**
 * Converts HTML string to React elements.
 *
 * @param  {String}   html                    - HTML string.
 * @param  {Object}   [options]               - Parser options.
 * @param  {Object}   [options.htmlparser2]   - htmlparser2 options.
 * @param  {Object}   [options.library]       - Library for React, Preact, etc.
 * @param  {Function} [options.replace]       - Replace method.
 * @return {JSX.Element|JSX.Element[]|String} - React element(s), empty array, or string.
 */
function HTMLReactParser(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }
  if (html === '') {
    return [];
  }
  options = options || {};
  return domToReact(
    htmlToDOM(html, options.htmlparser2 || domParserOptions),
    options
  );
}

HTMLReactParser.domToReact = domToReact;
HTMLReactParser.htmlToDOM = htmlToDOM;
HTMLReactParser.attributesToProps = attributesToProps;
HTMLReactParser.Element = (__webpack_require__(7790).Element);

// support CommonJS and ES Modules
module.exports = HTMLReactParser;
module.exports["default"] = HTMLReactParser;


/***/ }),

/***/ 484:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var reactProperty = __webpack_require__(5726);
var utilities = __webpack_require__(4606);

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param  {object} [attributes={}] - HTML/SVG DOM attributes.
 * @return {object}                 - React props.
 */
module.exports = function attributesToProps(attributes) {
  attributes = attributes || {};

  var attributeName;
  var attributeNameLowerCased;
  var attributeValue;
  var propName;
  var propertyInfo;
  var props = {};

  for (attributeName in attributes) {
    attributeValue = attributes[attributeName];

    // ARIA (aria-*) or custom data (data-*) attribute
    if (reactProperty.isCustomAttribute(attributeName)) {
      props[attributeName] = attributeValue;
      continue;
    }

    // convert HTML/SVG attribute to React prop
    attributeNameLowerCased = attributeName.toLowerCase();
    propName = reactProperty.possibleStandardNames[attributeNameLowerCased];

    if (propName) {
      props[propName] = attributeValue;
      propertyInfo = reactProperty.getPropertyInfo(propName);
      switch (propertyInfo && propertyInfo.type) {
        case reactProperty.BOOLEAN:
          props[propName] = true;
          break;
        case reactProperty.OVERLOADED_BOOLEAN:
          if (attributeValue === '') {
            props[propName] = true;
          }
          break;
      }
      continue;
    }

    // preserve custom attribute if React >=16
    if (utilities.PRESERVE_CUSTOM_ATTRIBUTES) {
      props[attributeName] = attributeValue;
    }
  }

  // transform inline style to object
  utilities.setStyleProp(attributes.style, props);

  return props;
};


/***/ }),

/***/ 3670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(1051);
var attributesToProps = __webpack_require__(484);
var utilities = __webpack_require__(4606);

var setStyleProp = utilities.setStyleProp;

/**
 * Converts DOM nodes to JSX element(s).
 *
 * @param  {DomElement[]} nodes             - DOM nodes.
 * @param  {object}       [options={}]      - Options.
 * @param  {Function}     [options.replace] - Replacer.
 * @param  {object}       [options.library] - Library (React/Preact/etc.).
 * @return {string|JSX.Element|JSX.Element[]}
 */
function domToReact(nodes, options) {
  options = options || {};

  var library = options.library || React;
  var cloneElement = library.cloneElement;
  var createElement = library.createElement;
  var isValidElement = library.isValidElement;

  var result = [];
  var node;
  var hasReplace = typeof options.replace === 'function';
  var replaceElement;
  var props;
  var children;
  var data;
  var trim = options.trim;

  for (var i = 0, len = nodes.length; i < len; i++) {
    node = nodes[i];

    // replace with custom React element (if present)
    if (hasReplace) {
      replaceElement = options.replace(node);

      if (isValidElement(replaceElement)) {
        // set "key" prop for sibling elements
        // https://fb.me/react-warning-keys
        if (len > 1) {
          replaceElement = cloneElement(replaceElement, {
            key: replaceElement.key || i
          });
        }
        result.push(replaceElement);
        continue;
      }
    }

    if (node.type === 'text') {
      // if trim option is enabled, skip whitespace text nodes
      if (trim) {
        data = node.data.trim();
        if (data) {
          result.push(node.data);
        }
      } else {
        result.push(node.data);
      }
      continue;
    }

    props = node.attribs;
    if (skipAttributesToProps(node)) {
      setStyleProp(props.style, props);
    } else if (props) {
      props = attributesToProps(props);
    }

    children = null;

    switch (node.type) {
      case 'script':
      case 'style':
        // prevent text in <script> or <style> from being escaped
        // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
        if (node.children[0]) {
          props.dangerouslySetInnerHTML = {
            __html: node.children[0].data
          };
        }
        break;

      case 'tag':
        // setting textarea value in children is an antipattern in React
        // https://reactjs.org/docs/forms.html#the-textarea-tag
        if (node.name === 'textarea' && node.children[0]) {
          props.defaultValue = node.children[0].data;
        } else if (node.children && node.children.length) {
          // continue recursion of creating React elements (if applicable)
          children = domToReact(node.children, options);
        }
        break;

      // skip all other cases (e.g., comment)
      default:
        continue;
    }

    // set "key" prop for sibling elements
    // https://fb.me/react-warning-keys
    if (len > 1) {
      props.key = i;
    }

    result.push(createElement(node.name, props, children));
  }

  return result.length === 1 ? result[0] : result;
}

/**
 * Determines whether DOM element attributes should be transformed to props.
 * Web Components should not have their attributes transformed except for `style`.
 *
 * @param  {DomElement} node
 * @return {boolean}
 */
function skipAttributesToProps(node) {
  return (
    utilities.PRESERVE_CUSTOM_ATTRIBUTES &&
    node.type === 'tag' &&
    utilities.isCustomComponent(node.name, node.attribs)
  );
}

module.exports = domToReact;


/***/ }),

/***/ 4606:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(1051);
var styleToJS = (__webpack_require__(1476)["default"]);

/**
 * Swap key with value in an object.
 *
 * @param  {Object}   obj        - The object.
 * @param  {Function} [override] - The override method.
 * @return {Object}              - The inverted object.
 */
function invertObject(obj, override) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('First argument must be an object');
  }

  var key;
  var value;
  var isOverridePresent = typeof override === 'function';
  var overrides = {};
  var result = {};

  for (key in obj) {
    value = obj[key];

    if (isOverridePresent) {
      overrides = override(key, value);
      if (overrides && overrides.length === 2) {
        result[overrides[0]] = overrides[1];
        continue;
      }
    }

    if (typeof value === 'string') {
      result[value] = key;
    }
  }

  return result;
}

/**
 * Check if a given tag is a custom component.
 *
 * @see {@link https://github.com/facebook/react/blob/v16.6.3/packages/react-dom/src/shared/isCustomComponent.js}
 *
 * @param {string} tagName - The name of the html tag.
 * @param {Object} props   - The props being passed to the element.
 * @return {boolean}
 */
function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return props && typeof props.is === 'string';
  }

  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return false;
    default:
      return true;
  }
}

var styleToJSOptions = { reactCompat: true };

/**
 * Sets style prop.
 *
 * @param {null|undefined|string} style
 * @param {object} props
 */
function setStyleProp(style, props) {
  if (style === null || style === undefined) {
    return;
  }
  try {
    props.style = styleToJS(style, styleToJSOptions);
  } catch (err) {
    props.style = {};
  }
}

/**
 * @constant {boolean}
 * @see {@link https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html}
 */
var PRESERVE_CUSTOM_ATTRIBUTES = React.version.split('.')[0] >= 16;

module.exports = {
  PRESERVE_CUSTOM_ATTRIBUTES: PRESERVE_CUSTOM_ATTRIBUTES,
  invertObject: invertObject,
  isCustomComponent: isCustomComponent,
  setStyleProp: setStyleProp
};


/***/ }),

/***/ 763:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Parser = void 0;
var Tokenizer_1 = __importDefault(__webpack_require__(9889));
var formTags = new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea",
]);
var pTag = new Set(["p"]);
var openImpliesClose = {
    tr: new Set(["tr", "th", "td"]),
    th: new Set(["th"]),
    td: new Set(["thead", "th", "td"]),
    body: new Set(["head", "link", "script"]),
    li: new Set(["li"]),
    p: pTag,
    h1: pTag,
    h2: pTag,
    h3: pTag,
    h4: pTag,
    h5: pTag,
    h6: pTag,
    select: formTags,
    input: formTags,
    output: formTags,
    button: formTags,
    datalist: formTags,
    textarea: formTags,
    option: new Set(["option"]),
    optgroup: new Set(["optgroup", "option"]),
    dd: new Set(["dt", "dd"]),
    dt: new Set(["dt", "dd"]),
    address: pTag,
    article: pTag,
    aside: pTag,
    blockquote: pTag,
    details: pTag,
    div: pTag,
    dl: pTag,
    fieldset: pTag,
    figcaption: pTag,
    figure: pTag,
    footer: pTag,
    form: pTag,
    header: pTag,
    hr: pTag,
    main: pTag,
    nav: pTag,
    ol: pTag,
    pre: pTag,
    section: pTag,
    table: pTag,
    ul: pTag,
    rt: new Set(["rt", "rp"]),
    rp: new Set(["rt", "rp"]),
    tbody: new Set(["thead", "tbody"]),
    tfoot: new Set(["thead", "tbody"]),
};
var voidElements = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
var foreignContextElements = new Set(["math", "svg"]);
var htmlIntegrationElements = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title",
]);
var reNameEnd = /\s|\//;
var Parser = /** @class */ (function () {
    function Parser(cbs, options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c, _d, _e;
        /** The start index of the last event. */
        this.startIndex = 0;
        /** The end index of the last event. */
        this.endIndex = null;
        this.tagname = "";
        this.attribname = "";
        this.attribvalue = "";
        this.attribs = null;
        this.stack = [];
        this.foreignContext = [];
        this.options = options;
        this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
        this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : !options.xmlMode;
        this.lowerCaseAttributeNames =
            (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode;
        this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : Tokenizer_1.default)(this.options, this);
        (_e = (_d = this.cbs).onparserinit) === null || _e === void 0 ? void 0 : _e.call(_d, this);
    }
    Parser.prototype.updatePosition = function (initialOffset) {
        if (this.endIndex === null) {
            if (this.tokenizer.sectionStart <= initialOffset) {
                this.startIndex = 0;
            }
            else {
                this.startIndex = this.tokenizer.sectionStart - initialOffset;
            }
        }
        else {
            this.startIndex = this.endIndex + 1;
        }
        this.endIndex = this.tokenizer.getAbsoluteIndex();
    };
    // Tokenizer event handlers
    Parser.prototype.ontext = function (data) {
        var _a, _b;
        this.updatePosition(1);
        this.endIndex--;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, data);
    };
    Parser.prototype.onopentagname = function (name) {
        var _a, _b;
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        this.tagname = name;
        if (!this.options.xmlMode &&
            Object.prototype.hasOwnProperty.call(openImpliesClose, name)) {
            var el = void 0;
            while (this.stack.length > 0 &&
                openImpliesClose[name].has((el = this.stack[this.stack.length - 1]))) {
                this.onclosetag(el);
            }
        }
        if (this.options.xmlMode || !voidElements.has(name)) {
            this.stack.push(name);
            if (foreignContextElements.has(name)) {
                this.foreignContext.push(true);
            }
            else if (htmlIntegrationElements.has(name)) {
                this.foreignContext.push(false);
            }
        }
        (_b = (_a = this.cbs).onopentagname) === null || _b === void 0 ? void 0 : _b.call(_a, name);
        if (this.cbs.onopentag)
            this.attribs = {};
    };
    Parser.prototype.onopentagend = function () {
        var _a, _b;
        this.updatePosition(1);
        if (this.attribs) {
            (_b = (_a = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a, this.tagname, this.attribs);
            this.attribs = null;
        }
        if (!this.options.xmlMode &&
            this.cbs.onclosetag &&
            voidElements.has(this.tagname)) {
            this.cbs.onclosetag(this.tagname);
        }
        this.tagname = "";
    };
    Parser.prototype.onclosetag = function (name) {
        this.updatePosition(1);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        if (foreignContextElements.has(name) ||
            htmlIntegrationElements.has(name)) {
            this.foreignContext.pop();
        }
        if (this.stack.length &&
            (this.options.xmlMode || !voidElements.has(name))) {
            var pos = this.stack.lastIndexOf(name);
            if (pos !== -1) {
                if (this.cbs.onclosetag) {
                    pos = this.stack.length - pos;
                    while (pos--) {
                        // We know the stack has sufficient elements.
                        this.cbs.onclosetag(this.stack.pop());
                    }
                }
                else
                    this.stack.length = pos;
            }
            else if (name === "p" && !this.options.xmlMode) {
                this.onopentagname(name);
                this.closeCurrentTag();
            }
        }
        else if (!this.options.xmlMode && (name === "br" || name === "p")) {
            this.onopentagname(name);
            this.closeCurrentTag();
        }
    };
    Parser.prototype.onselfclosingtag = function () {
        if (this.options.xmlMode ||
            this.options.recognizeSelfClosing ||
            this.foreignContext[this.foreignContext.length - 1]) {
            this.closeCurrentTag();
        }
        else {
            this.onopentagend();
        }
    };
    Parser.prototype.closeCurrentTag = function () {
        var _a, _b;
        var name = this.tagname;
        this.onopentagend();
        /*
         * Self-closing tags will be on the top of the stack
         * (cheaper check than in onclosetag)
         */
        if (this.stack[this.stack.length - 1] === name) {
            (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, name);
            this.stack.pop();
        }
    };
    Parser.prototype.onattribname = function (name) {
        if (this.lowerCaseAttributeNames) {
            name = name.toLowerCase();
        }
        this.attribname = name;
    };
    Parser.prototype.onattribdata = function (value) {
        this.attribvalue += value;
    };
    Parser.prototype.onattribend = function (quote) {
        var _a, _b;
        (_b = (_a = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a, this.attribname, this.attribvalue, quote);
        if (this.attribs &&
            !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
            this.attribs[this.attribname] = this.attribvalue;
        }
        this.attribname = "";
        this.attribvalue = "";
    };
    Parser.prototype.getInstructionName = function (value) {
        var idx = value.search(reNameEnd);
        var name = idx < 0 ? value : value.substr(0, idx);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        return name;
    };
    Parser.prototype.ondeclaration = function (value) {
        if (this.cbs.onprocessinginstruction) {
            var name_1 = this.getInstructionName(value);
            this.cbs.onprocessinginstruction("!" + name_1, "!" + value);
        }
    };
    Parser.prototype.onprocessinginstruction = function (value) {
        if (this.cbs.onprocessinginstruction) {
            var name_2 = this.getInstructionName(value);
            this.cbs.onprocessinginstruction("?" + name_2, "?" + value);
        }
    };
    Parser.prototype.oncomment = function (value) {
        var _a, _b, _c, _d;
        this.updatePosition(4);
        (_b = (_a = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
    };
    Parser.prototype.oncdata = function (value) {
        var _a, _b, _c, _d, _e, _f;
        this.updatePosition(1);
        if (this.options.xmlMode || this.options.recognizeCDATA) {
            (_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
            (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
        }
        else {
            this.oncomment("[CDATA[" + value + "]]");
        }
    };
    Parser.prototype.onerror = function (err) {
        var _a, _b;
        (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    Parser.prototype.onend = function () {
        var _a, _b;
        if (this.cbs.onclosetag) {
            for (var i = this.stack.length; i > 0; this.cbs.onclosetag(this.stack[--i]))
                ;
        }
        (_b = (_a = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    /**
     * Resets the parser to a blank state, ready to parse a new HTML document
     */
    Parser.prototype.reset = function () {
        var _a, _b, _c, _d;
        (_b = (_a = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.tokenizer.reset();
        this.tagname = "";
        this.attribname = "";
        this.attribs = null;
        this.stack = [];
        (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
    };
    /**
     * Resets the parser, then parses a complete document and
     * pushes it to the handler.
     *
     * @param data Document to parse.
     */
    Parser.prototype.parseComplete = function (data) {
        this.reset();
        this.end(data);
    };
    /**
     * Parses a chunk of data and calls the corresponding callbacks.
     *
     * @param chunk Chunk to parse.
     */
    Parser.prototype.write = function (chunk) {
        this.tokenizer.write(chunk);
    };
    /**
     * Parses the end of the buffer and clears the stack, calls onend.
     *
     * @param chunk Optional final chunk to parse.
     */
    Parser.prototype.end = function (chunk) {
        this.tokenizer.end(chunk);
    };
    /**
     * Pauses parsing. The parser won't emit events until `resume` is called.
     */
    Parser.prototype.pause = function () {
        this.tokenizer.pause();
    };
    /**
     * Resumes parsing after `pause` was called.
     */
    Parser.prototype.resume = function () {
        this.tokenizer.resume();
    };
    /**
     * Alias of `write`, for backwards compatibility.
     *
     * @param chunk Chunk to parse.
     * @deprecated
     */
    Parser.prototype.parseChunk = function (chunk) {
        this.write(chunk);
    };
    /**
     * Alias of `end`, for backwards compatibility.
     *
     * @param chunk Optional final chunk to parse.
     * @deprecated
     */
    Parser.prototype.done = function (chunk) {
        this.end(chunk);
    };
    return Parser;
}());
exports.Parser = Parser;


/***/ }),

/***/ 9889:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var decode_codepoint_1 = __importDefault(__webpack_require__(26));
var entities_json_1 = __importDefault(__webpack_require__(9323));
var legacy_json_1 = __importDefault(__webpack_require__(9591));
var xml_json_1 = __importDefault(__webpack_require__(2586));
function whitespace(c) {
    return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}
function isASCIIAlpha(c) {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
}
function ifElseState(upper, SUCCESS, FAILURE) {
    var lower = upper.toLowerCase();
    if (upper === lower) {
        return function (t, c) {
            if (c === lower) {
                t._state = SUCCESS;
            }
            else {
                t._state = FAILURE;
                t._index--;
            }
        };
    }
    return function (t, c) {
        if (c === lower || c === upper) {
            t._state = SUCCESS;
        }
        else {
            t._state = FAILURE;
            t._index--;
        }
    };
}
function consumeSpecialNameChar(upper, NEXT_STATE) {
    var lower = upper.toLowerCase();
    return function (t, c) {
        if (c === lower || c === upper) {
            t._state = NEXT_STATE;
        }
        else {
            t._state = 3 /* InTagName */;
            t._index--; // Consume the token again
        }
    };
}
var stateBeforeCdata1 = ifElseState("C", 24 /* BeforeCdata2 */, 16 /* InDeclaration */);
var stateBeforeCdata2 = ifElseState("D", 25 /* BeforeCdata3 */, 16 /* InDeclaration */);
var stateBeforeCdata3 = ifElseState("A", 26 /* BeforeCdata4 */, 16 /* InDeclaration */);
var stateBeforeCdata4 = ifElseState("T", 27 /* BeforeCdata5 */, 16 /* InDeclaration */);
var stateBeforeCdata5 = ifElseState("A", 28 /* BeforeCdata6 */, 16 /* InDeclaration */);
var stateBeforeScript1 = consumeSpecialNameChar("R", 35 /* BeforeScript2 */);
var stateBeforeScript2 = consumeSpecialNameChar("I", 36 /* BeforeScript3 */);
var stateBeforeScript3 = consumeSpecialNameChar("P", 37 /* BeforeScript4 */);
var stateBeforeScript4 = consumeSpecialNameChar("T", 38 /* BeforeScript5 */);
var stateAfterScript1 = ifElseState("R", 40 /* AfterScript2 */, 1 /* Text */);
var stateAfterScript2 = ifElseState("I", 41 /* AfterScript3 */, 1 /* Text */);
var stateAfterScript3 = ifElseState("P", 42 /* AfterScript4 */, 1 /* Text */);
var stateAfterScript4 = ifElseState("T", 43 /* AfterScript5 */, 1 /* Text */);
var stateBeforeStyle1 = consumeSpecialNameChar("Y", 45 /* BeforeStyle2 */);
var stateBeforeStyle2 = consumeSpecialNameChar("L", 46 /* BeforeStyle3 */);
var stateBeforeStyle3 = consumeSpecialNameChar("E", 47 /* BeforeStyle4 */);
var stateAfterStyle1 = ifElseState("Y", 49 /* AfterStyle2 */, 1 /* Text */);
var stateAfterStyle2 = ifElseState("L", 50 /* AfterStyle3 */, 1 /* Text */);
var stateAfterStyle3 = ifElseState("E", 51 /* AfterStyle4 */, 1 /* Text */);
var stateBeforeSpecialT = consumeSpecialNameChar("I", 54 /* BeforeTitle1 */);
var stateBeforeTitle1 = consumeSpecialNameChar("T", 55 /* BeforeTitle2 */);
var stateBeforeTitle2 = consumeSpecialNameChar("L", 56 /* BeforeTitle3 */);
var stateBeforeTitle3 = consumeSpecialNameChar("E", 57 /* BeforeTitle4 */);
var stateAfterSpecialTEnd = ifElseState("I", 58 /* AfterTitle1 */, 1 /* Text */);
var stateAfterTitle1 = ifElseState("T", 59 /* AfterTitle2 */, 1 /* Text */);
var stateAfterTitle2 = ifElseState("L", 60 /* AfterTitle3 */, 1 /* Text */);
var stateAfterTitle3 = ifElseState("E", 61 /* AfterTitle4 */, 1 /* Text */);
var stateBeforeEntity = ifElseState("#", 63 /* BeforeNumericEntity */, 64 /* InNamedEntity */);
var stateBeforeNumericEntity = ifElseState("X", 66 /* InHexEntity */, 65 /* InNumericEntity */);
var Tokenizer = /** @class */ (function () {
    function Tokenizer(options, cbs) {
        var _a;
        /** The current state the tokenizer is in. */
        this._state = 1 /* Text */;
        /** The read buffer. */
        this.buffer = "";
        /** The beginning of the section that is currently being read. */
        this.sectionStart = 0;
        /** The index within the buffer that we are currently looking at. */
        this._index = 0;
        /**
         * Data that has already been processed will be removed from the buffer occasionally.
         * `_bufferOffset` keeps track of how many characters have been removed, to make sure position information is accurate.
         */
        this.bufferOffset = 0;
        /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
        this.baseState = 1 /* Text */;
        /** For special parsing behavior inside of script and style tags. */
        this.special = 1 /* None */;
        /** Indicates whether the tokenizer has been paused. */
        this.running = true;
        /** Indicates whether the tokenizer has finished running / `.end` has been called. */
        this.ended = false;
        this.cbs = cbs;
        this.xmlMode = !!(options === null || options === void 0 ? void 0 : options.xmlMode);
        this.decodeEntities = (_a = options === null || options === void 0 ? void 0 : options.decodeEntities) !== null && _a !== void 0 ? _a : true;
    }
    Tokenizer.prototype.reset = function () {
        this._state = 1 /* Text */;
        this.buffer = "";
        this.sectionStart = 0;
        this._index = 0;
        this.bufferOffset = 0;
        this.baseState = 1 /* Text */;
        this.special = 1 /* None */;
        this.running = true;
        this.ended = false;
    };
    Tokenizer.prototype.write = function (chunk) {
        if (this.ended)
            this.cbs.onerror(Error(".write() after done!"));
        this.buffer += chunk;
        this.parse();
    };
    Tokenizer.prototype.end = function (chunk) {
        if (this.ended)
            this.cbs.onerror(Error(".end() after done!"));
        if (chunk)
            this.write(chunk);
        this.ended = true;
        if (this.running)
            this.finish();
    };
    Tokenizer.prototype.pause = function () {
        this.running = false;
    };
    Tokenizer.prototype.resume = function () {
        this.running = true;
        if (this._index < this.buffer.length) {
            this.parse();
        }
        if (this.ended) {
            this.finish();
        }
    };
    /**
     * The current index within all of the written data.
     */
    Tokenizer.prototype.getAbsoluteIndex = function () {
        return this.bufferOffset + this._index;
    };
    Tokenizer.prototype.stateText = function (c) {
        if (c === "<") {
            if (this._index > this.sectionStart) {
                this.cbs.ontext(this.getSection());
            }
            this._state = 2 /* BeforeTagName */;
            this.sectionStart = this._index;
        }
        else if (this.decodeEntities &&
            c === "&" &&
            (this.special === 1 /* None */ || this.special === 4 /* Title */)) {
            if (this._index > this.sectionStart) {
                this.cbs.ontext(this.getSection());
            }
            this.baseState = 1 /* Text */;
            this._state = 62 /* BeforeEntity */;
            this.sectionStart = this._index;
        }
    };
    /**
     * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
     *
     * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
     * We allow anything that wouldn't end the tag.
     */
    Tokenizer.prototype.isTagStartChar = function (c) {
        return (isASCIIAlpha(c) ||
            (this.xmlMode && !whitespace(c) && c !== "/" && c !== ">"));
    };
    Tokenizer.prototype.stateBeforeTagName = function (c) {
        if (c === "/") {
            this._state = 5 /* BeforeClosingTagName */;
        }
        else if (c === "<") {
            this.cbs.ontext(this.getSection());
            this.sectionStart = this._index;
        }
        else if (c === ">" ||
            this.special !== 1 /* None */ ||
            whitespace(c)) {
            this._state = 1 /* Text */;
        }
        else if (c === "!") {
            this._state = 15 /* BeforeDeclaration */;
            this.sectionStart = this._index + 1;
        }
        else if (c === "?") {
            this._state = 17 /* InProcessingInstruction */;
            this.sectionStart = this._index + 1;
        }
        else if (!this.isTagStartChar(c)) {
            this._state = 1 /* Text */;
        }
        else {
            this._state =
                !this.xmlMode && (c === "s" || c === "S")
                    ? 32 /* BeforeSpecialS */
                    : !this.xmlMode && (c === "t" || c === "T")
                        ? 52 /* BeforeSpecialT */
                        : 3 /* InTagName */;
            this.sectionStart = this._index;
        }
    };
    Tokenizer.prototype.stateInTagName = function (c) {
        if (c === "/" || c === ">" || whitespace(c)) {
            this.emitToken("onopentagname");
            this._state = 8 /* BeforeAttributeName */;
            this._index--;
        }
    };
    Tokenizer.prototype.stateBeforeClosingTagName = function (c) {
        if (whitespace(c)) {
            // Ignore
        }
        else if (c === ">") {
            this._state = 1 /* Text */;
        }
        else if (this.special !== 1 /* None */) {
            if (this.special !== 4 /* Title */ && (c === "s" || c === "S")) {
                this._state = 33 /* BeforeSpecialSEnd */;
            }
            else if (this.special === 4 /* Title */ &&
                (c === "t" || c === "T")) {
                this._state = 53 /* BeforeSpecialTEnd */;
            }
            else {
                this._state = 1 /* Text */;
                this._index--;
            }
        }
        else if (!this.isTagStartChar(c)) {
            this._state = 20 /* InSpecialComment */;
            this.sectionStart = this._index;
        }
        else {
            this._state = 6 /* InClosingTagName */;
            this.sectionStart = this._index;
        }
    };
    Tokenizer.prototype.stateInClosingTagName = function (c) {
        if (c === ">" || whitespace(c)) {
            this.emitToken("onclosetag");
            this._state = 7 /* AfterClosingTagName */;
            this._index--;
        }
    };
    Tokenizer.prototype.stateAfterClosingTagName = function (c) {
        // Skip everything until ">"
        if (c === ">") {
            this._state = 1 /* Text */;
            this.sectionStart = this._index + 1;
        }
    };
    Tokenizer.prototype.stateBeforeAttributeName = function (c) {
        if (c === ">") {
            this.cbs.onopentagend();
            this._state = 1 /* Text */;
            this.sectionStart = this._index + 1;
        }
        else if (c === "/") {
            this._state = 4 /* InSelfClosingTag */;
        }
        else if (!whitespace(c)) {
            this._state = 9 /* InAttributeName */;
            this.sectionStart = this._index;
        }
    };
    Tokenizer.prototype.stateInSelfClosingTag = function (c) {
        if (c === ">") {
            this.cbs.onselfclosingtag();
            this._state = 1 /* Text */;
            this.sectionStart = this._index + 1;
            this.special = 1 /* None */; // Reset special state, in case of self-closing special tags
        }
        else if (!whitespace(c)) {
            this._state = 8 /* BeforeAttributeName */;
            this._index--;
        }
    };
    Tokenizer.prototype.stateInAttributeName = function (c) {
        if (c === "=" || c === "/" || c === ">" || whitespace(c)) {
            this.cbs.onattribname(this.getSection());
            this.sectionStart = -1;
            this._state = 10 /* AfterAttributeName */;
            this._index--;
        }
    };
    Tokenizer.prototype.stateAfterAttributeName = function (c) {
        if (c === "=") {
            this._state = 11 /* BeforeAttributeValue */;
        }
        else if (c === "/" || c === ">") {
            this.cbs.onattribend(undefined);
            this._state = 8 /* BeforeAttributeName */;
            this._index--;
        }
        else if (!whitespace(c)) {
            this.cbs.onattribend(undefined);
            this._state = 9 /* InAttributeName */;
            this.sectionStart = this._index;
        }
    };
    Tokenizer.prototype.stateBeforeAttributeValue = function (c) {
        if (c === '"') {
            this._state = 12 /* InAttributeValueDq */;
            this.sectionStart = this._index + 1;
        }
        else if (c === "'") {
            this._state = 13 /* InAttributeValueSq */;
            this.sectionStart = this._index + 1;
        }
        else if (!whitespace(c)) {
            this._state = 14 /* InAttributeValueNq */;
            this.sectionStart = this._index;
            this._index--; // Reconsume token
        }
    };
    Tokenizer.prototype.handleInAttributeValue = function (c, quote) {
        if (c === quote) {
            this.emitToken("onattribdata");
            this.cbs.onattribend(quote);
            this._state = 8 /* BeforeAttributeName */;
        }
        else if (this.decodeEntities && c === "&") {
            this.emitToken("onattribdata");
            this.baseState = this._state;
            this._state = 62 /* BeforeEntity */;
            this.sectionStart = this._index;
        }
    };
    Tokenizer.prototype.stateInAttributeValueDoubleQuotes = function (c) {
        this.handleInAttributeValue(c, '"');
    };
    Tokenizer.prototype.stateInAttributeValueSingleQuotes = function (c) {
        this.handleInAttributeValue(c, "'");
    };
    Tokenizer.prototype.stateInAttributeValueNoQuotes = function (c) {
        if (whitespace(c) || c === ">") {
            this.emitToken("onattribdata");
            this.cbs.onattribend(null);
            this._state = 8 /* BeforeAttributeName */;
            this._index--;
        }
        else if (this.decodeEntities && c === "&") {
            this.emitToken("onattribdata");
            this.baseState = this._state;
            this._state = 62 /* BeforeEntity */;
            this.sectionStart = this._index;
        }
    };
    Tokenizer.prototype.stateBeforeDeclaration = function (c) {
        this._state =
            c === "["
                ? 23 /* BeforeCdata1 */
                : c === "-"
                    ? 18 /* BeforeComment */
                    : 16 /* InDeclaration */;
    };
    Tokenizer.prototype.stateInDeclaration = function (c) {
        if (c === ">") {
            this.cbs.ondeclaration(this.getSection());
            this._state = 1 /* Text */;
            this.sectionStart = this._index + 1;
        }
    };
    Tokenizer.prototype.stateInProcessingInstruction = function (c) {
        if (c === ">") {
            this.cbs.onprocessinginstruction(this.getSection());
            this._state = 1 /* Text */;
            this.sectionStart = this._index + 1;
        }
    };
    Tokenizer.prototype.stateBeforeComment = function (c) {
        if (c === "-") {
            this._state = 19 /* InComment */;
            this.sectionStart = this._index + 1;
        }
        else {
            this._state = 16 /* InDeclaration */;
        }
    };
    Tokenizer.prototype.stateInComment = function (c) {
        if (c === "-")
            this._state = 21 /* AfterComment1 */;
    };
    Tokenizer.prototype.stateInSpecialComment = function (c) {
        if (c === ">") {
            this.cbs.oncomment(this.buffer.substring(this.sectionStart, this._index));
            this._state = 1 /* Text */;
            this.sectionStart = this._index + 1;
        }
    };
    Tokenizer.prototype.stateAfterComment1 = function (c) {
        if (c === "-") {
            this._state = 22 /* AfterComment2 */;
        }
        else {
            this._state = 19 /* InComment */;
        }
    };
    Tokenizer.prototype.stateAfterComment2 = function (c) {
        if (c === ">") {
            // Remove 2 trailing chars
            this.cbs.oncomment(this.buffer.substring(this.sectionStart, this._index - 2));
            this._state = 1 /* Text */;
            this.sectionStart = this._index + 1;
        }
        else if (c !== "-") {
            this._state = 19 /* InComment */;
        }
        // Else: stay in AFTER_COMMENT_2 (`--->`)
    };
    Tokenizer.prototype.stateBeforeCdata6 = function (c) {
        if (c === "[") {
            this._state = 29 /* InCdata */;
            this.sectionStart = this._index + 1;
        }
        else {
            this._state = 16 /* InDeclaration */;
            this._index--;
        }
    };
    Tokenizer.prototype.stateInCdata = function (c) {
        if (c === "]")
            this._state = 30 /* AfterCdata1 */;
    };
    Tokenizer.prototype.stateAfterCdata1 = function (c) {
        if (c === "]")
            this._state = 31 /* AfterCdata2 */;
        else
            this._state = 29 /* InCdata */;
    };
    Tokenizer.prototype.stateAfterCdata2 = function (c) {
        if (c === ">") {
            // Remove 2 trailing chars
            this.cbs.oncdata(this.buffer.substring(this.sectionStart, this._index - 2));
            this._state = 1 /* Text */;
            this.sectionStart = this._index + 1;
        }
        else if (c !== "]") {
            this._state = 29 /* InCdata */;
        }
        // Else: stay in AFTER_CDATA_2 (`]]]>`)
    };
    Tokenizer.prototype.stateBeforeSpecialS = function (c) {
        if (c === "c" || c === "C") {
            this._state = 34 /* BeforeScript1 */;
        }
        else if (c === "t" || c === "T") {
            this._state = 44 /* BeforeStyle1 */;
        }
        else {
            this._state = 3 /* InTagName */;
            this._index--; // Consume the token again
        }
    };
    Tokenizer.prototype.stateBeforeSpecialSEnd = function (c) {
        if (this.special === 2 /* Script */ && (c === "c" || c === "C")) {
            this._state = 39 /* AfterScript1 */;
        }
        else if (this.special === 3 /* Style */ && (c === "t" || c === "T")) {
            this._state = 48 /* AfterStyle1 */;
        }
        else
            this._state = 1 /* Text */;
    };
    Tokenizer.prototype.stateBeforeSpecialLast = function (c, special) {
        if (c === "/" || c === ">" || whitespace(c)) {
            this.special = special;
        }
        this._state = 3 /* InTagName */;
        this._index--; // Consume the token again
    };
    Tokenizer.prototype.stateAfterSpecialLast = function (c, sectionStartOffset) {
        if (c === ">" || whitespace(c)) {
            this.special = 1 /* None */;
            this._state = 6 /* InClosingTagName */;
            this.sectionStart = this._index - sectionStartOffset;
            this._index--; // Reconsume the token
        }
        else
            this._state = 1 /* Text */;
    };
    // For entities terminated with a semicolon
    Tokenizer.prototype.parseFixedEntity = function (map) {
        if (map === void 0) { map = this.xmlMode ? xml_json_1.default : entities_json_1.default; }
        // Offset = 1
        if (this.sectionStart + 1 < this._index) {
            var entity = this.buffer.substring(this.sectionStart + 1, this._index);
            if (Object.prototype.hasOwnProperty.call(map, entity)) {
                this.emitPartial(map[entity]);
                this.sectionStart = this._index + 1;
            }
        }
    };
    // Parses legacy entities (without trailing semicolon)
    Tokenizer.prototype.parseLegacyEntity = function () {
        var start = this.sectionStart + 1;
        // The max length of legacy entities is 6
        var limit = Math.min(this._index - start, 6);
        while (limit >= 2) {
            // The min length of legacy entities is 2
            var entity = this.buffer.substr(start, limit);
            if (Object.prototype.hasOwnProperty.call(legacy_json_1.default, entity)) {
                this.emitPartial(legacy_json_1.default[entity]);
                this.sectionStart += limit + 1;
                return;
            }
            limit--;
        }
    };
    Tokenizer.prototype.stateInNamedEntity = function (c) {
        if (c === ";") {
            this.parseFixedEntity();
            // Retry as legacy entity if entity wasn't parsed
            if (this.baseState === 1 /* Text */ &&
                this.sectionStart + 1 < this._index &&
                !this.xmlMode) {
                this.parseLegacyEntity();
            }
            this._state = this.baseState;
        }
        else if ((c < "0" || c > "9") && !isASCIIAlpha(c)) {
            if (this.xmlMode || this.sectionStart + 1 === this._index) {
                // Ignore
            }
            else if (this.baseState !== 1 /* Text */) {
                if (c !== "=") {
                    // Parse as legacy entity, without allowing additional characters.
                    this.parseFixedEntity(legacy_json_1.default);
                }
            }
            else {
                this.parseLegacyEntity();
            }
            this._state = this.baseState;
            this._index--;
        }
    };
    Tokenizer.prototype.decodeNumericEntity = function (offset, base, strict) {
        var sectionStart = this.sectionStart + offset;
        if (sectionStart !== this._index) {
            // Parse entity
            var entity = this.buffer.substring(sectionStart, this._index);
            var parsed = parseInt(entity, base);
            this.emitPartial(decode_codepoint_1.default(parsed));
            this.sectionStart = strict ? this._index + 1 : this._index;
        }
        this._state = this.baseState;
    };
    Tokenizer.prototype.stateInNumericEntity = function (c) {
        if (c === ";") {
            this.decodeNumericEntity(2, 10, true);
        }
        else if (c < "0" || c > "9") {
            if (!this.xmlMode) {
                this.decodeNumericEntity(2, 10, false);
            }
            else {
                this._state = this.baseState;
            }
            this._index--;
        }
    };
    Tokenizer.prototype.stateInHexEntity = function (c) {
        if (c === ";") {
            this.decodeNumericEntity(3, 16, true);
        }
        else if ((c < "a" || c > "f") &&
            (c < "A" || c > "F") &&
            (c < "0" || c > "9")) {
            if (!this.xmlMode) {
                this.decodeNumericEntity(3, 16, false);
            }
            else {
                this._state = this.baseState;
            }
            this._index--;
        }
    };
    Tokenizer.prototype.cleanup = function () {
        if (this.sectionStart < 0) {
            this.buffer = "";
            this.bufferOffset += this._index;
            this._index = 0;
        }
        else if (this.running) {
            if (this._state === 1 /* Text */) {
                if (this.sectionStart !== this._index) {
                    this.cbs.ontext(this.buffer.substr(this.sectionStart));
                }
                this.buffer = "";
                this.bufferOffset += this._index;
                this._index = 0;
            }
            else if (this.sectionStart === this._index) {
                // The section just started
                this.buffer = "";
                this.bufferOffset += this._index;
                this._index = 0;
            }
            else {
                // Remove everything unnecessary
                this.buffer = this.buffer.substr(this.sectionStart);
                this._index -= this.sectionStart;
                this.bufferOffset += this.sectionStart;
            }
            this.sectionStart = 0;
        }
    };
    /**
     * Iterates through the buffer, calling the function corresponding to the current state.
     *
     * States that are more likely to be hit are higher up, as a performance improvement.
     */
    Tokenizer.prototype.parse = function () {
        while (this._index < this.buffer.length && this.running) {
            var c = this.buffer.charAt(this._index);
            if (this._state === 1 /* Text */) {
                this.stateText(c);
            }
            else if (this._state === 12 /* InAttributeValueDq */) {
                this.stateInAttributeValueDoubleQuotes(c);
            }
            else if (this._state === 9 /* InAttributeName */) {
                this.stateInAttributeName(c);
            }
            else if (this._state === 19 /* InComment */) {
                this.stateInComment(c);
            }
            else if (this._state === 20 /* InSpecialComment */) {
                this.stateInSpecialComment(c);
            }
            else if (this._state === 8 /* BeforeAttributeName */) {
                this.stateBeforeAttributeName(c);
            }
            else if (this._state === 3 /* InTagName */) {
                this.stateInTagName(c);
            }
            else if (this._state === 6 /* InClosingTagName */) {
                this.stateInClosingTagName(c);
            }
            else if (this._state === 2 /* BeforeTagName */) {
                this.stateBeforeTagName(c);
            }
            else if (this._state === 10 /* AfterAttributeName */) {
                this.stateAfterAttributeName(c);
            }
            else if (this._state === 13 /* InAttributeValueSq */) {
                this.stateInAttributeValueSingleQuotes(c);
            }
            else if (this._state === 11 /* BeforeAttributeValue */) {
                this.stateBeforeAttributeValue(c);
            }
            else if (this._state === 5 /* BeforeClosingTagName */) {
                this.stateBeforeClosingTagName(c);
            }
            else if (this._state === 7 /* AfterClosingTagName */) {
                this.stateAfterClosingTagName(c);
            }
            else if (this._state === 32 /* BeforeSpecialS */) {
                this.stateBeforeSpecialS(c);
            }
            else if (this._state === 21 /* AfterComment1 */) {
                this.stateAfterComment1(c);
            }
            else if (this._state === 14 /* InAttributeValueNq */) {
                this.stateInAttributeValueNoQuotes(c);
            }
            else if (this._state === 4 /* InSelfClosingTag */) {
                this.stateInSelfClosingTag(c);
            }
            else if (this._state === 16 /* InDeclaration */) {
                this.stateInDeclaration(c);
            }
            else if (this._state === 15 /* BeforeDeclaration */) {
                this.stateBeforeDeclaration(c);
            }
            else if (this._state === 22 /* AfterComment2 */) {
                this.stateAfterComment2(c);
            }
            else if (this._state === 18 /* BeforeComment */) {
                this.stateBeforeComment(c);
            }
            else if (this._state === 33 /* BeforeSpecialSEnd */) {
                this.stateBeforeSpecialSEnd(c);
            }
            else if (this._state === 53 /* BeforeSpecialTEnd */) {
                stateAfterSpecialTEnd(this, c);
            }
            else if (this._state === 39 /* AfterScript1 */) {
                stateAfterScript1(this, c);
            }
            else if (this._state === 40 /* AfterScript2 */) {
                stateAfterScript2(this, c);
            }
            else if (this._state === 41 /* AfterScript3 */) {
                stateAfterScript3(this, c);
            }
            else if (this._state === 34 /* BeforeScript1 */) {
                stateBeforeScript1(this, c);
            }
            else if (this._state === 35 /* BeforeScript2 */) {
                stateBeforeScript2(this, c);
            }
            else if (this._state === 36 /* BeforeScript3 */) {
                stateBeforeScript3(this, c);
            }
            else if (this._state === 37 /* BeforeScript4 */) {
                stateBeforeScript4(this, c);
            }
            else if (this._state === 38 /* BeforeScript5 */) {
                this.stateBeforeSpecialLast(c, 2 /* Script */);
            }
            else if (this._state === 42 /* AfterScript4 */) {
                stateAfterScript4(this, c);
            }
            else if (this._state === 43 /* AfterScript5 */) {
                this.stateAfterSpecialLast(c, 6);
            }
            else if (this._state === 44 /* BeforeStyle1 */) {
                stateBeforeStyle1(this, c);
            }
            else if (this._state === 29 /* InCdata */) {
                this.stateInCdata(c);
            }
            else if (this._state === 45 /* BeforeStyle2 */) {
                stateBeforeStyle2(this, c);
            }
            else if (this._state === 46 /* BeforeStyle3 */) {
                stateBeforeStyle3(this, c);
            }
            else if (this._state === 47 /* BeforeStyle4 */) {
                this.stateBeforeSpecialLast(c, 3 /* Style */);
            }
            else if (this._state === 48 /* AfterStyle1 */) {
                stateAfterStyle1(this, c);
            }
            else if (this._state === 49 /* AfterStyle2 */) {
                stateAfterStyle2(this, c);
            }
            else if (this._state === 50 /* AfterStyle3 */) {
                stateAfterStyle3(this, c);
            }
            else if (this._state === 51 /* AfterStyle4 */) {
                this.stateAfterSpecialLast(c, 5);
            }
            else if (this._state === 52 /* BeforeSpecialT */) {
                stateBeforeSpecialT(this, c);
            }
            else if (this._state === 54 /* BeforeTitle1 */) {
                stateBeforeTitle1(this, c);
            }
            else if (this._state === 55 /* BeforeTitle2 */) {
                stateBeforeTitle2(this, c);
            }
            else if (this._state === 56 /* BeforeTitle3 */) {
                stateBeforeTitle3(this, c);
            }
            else if (this._state === 57 /* BeforeTitle4 */) {
                this.stateBeforeSpecialLast(c, 4 /* Title */);
            }
            else if (this._state === 58 /* AfterTitle1 */) {
                stateAfterTitle1(this, c);
            }
            else if (this._state === 59 /* AfterTitle2 */) {
                stateAfterTitle2(this, c);
            }
            else if (this._state === 60 /* AfterTitle3 */) {
                stateAfterTitle3(this, c);
            }
            else if (this._state === 61 /* AfterTitle4 */) {
                this.stateAfterSpecialLast(c, 5);
            }
            else if (this._state === 17 /* InProcessingInstruction */) {
                this.stateInProcessingInstruction(c);
            }
            else if (this._state === 64 /* InNamedEntity */) {
                this.stateInNamedEntity(c);
            }
            else if (this._state === 23 /* BeforeCdata1 */) {
                stateBeforeCdata1(this, c);
            }
            else if (this._state === 62 /* BeforeEntity */) {
                stateBeforeEntity(this, c);
            }
            else if (this._state === 24 /* BeforeCdata2 */) {
                stateBeforeCdata2(this, c);
            }
            else if (this._state === 25 /* BeforeCdata3 */) {
                stateBeforeCdata3(this, c);
            }
            else if (this._state === 30 /* AfterCdata1 */) {
                this.stateAfterCdata1(c);
            }
            else if (this._state === 31 /* AfterCdata2 */) {
                this.stateAfterCdata2(c);
            }
            else if (this._state === 26 /* BeforeCdata4 */) {
                stateBeforeCdata4(this, c);
            }
            else if (this._state === 27 /* BeforeCdata5 */) {
                stateBeforeCdata5(this, c);
            }
            else if (this._state === 28 /* BeforeCdata6 */) {
                this.stateBeforeCdata6(c);
            }
            else if (this._state === 66 /* InHexEntity */) {
                this.stateInHexEntity(c);
            }
            else if (this._state === 65 /* InNumericEntity */) {
                this.stateInNumericEntity(c);
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            }
            else if (this._state === 63 /* BeforeNumericEntity */) {
                stateBeforeNumericEntity(this, c);
            }
            else {
                this.cbs.onerror(Error("unknown _state"), this._state);
            }
            this._index++;
        }
        this.cleanup();
    };
    Tokenizer.prototype.finish = function () {
        // If there is remaining data, emit it in a reasonable way
        if (this.sectionStart < this._index) {
            this.handleTrailingData();
        }
        this.cbs.onend();
    };
    Tokenizer.prototype.handleTrailingData = function () {
        var data = this.buffer.substr(this.sectionStart);
        if (this._state === 29 /* InCdata */ ||
            this._state === 30 /* AfterCdata1 */ ||
            this._state === 31 /* AfterCdata2 */) {
            this.cbs.oncdata(data);
        }
        else if (this._state === 19 /* InComment */ ||
            this._state === 21 /* AfterComment1 */ ||
            this._state === 22 /* AfterComment2 */) {
            this.cbs.oncomment(data);
        }
        else if (this._state === 64 /* InNamedEntity */ && !this.xmlMode) {
            this.parseLegacyEntity();
            if (this.sectionStart < this._index) {
                this._state = this.baseState;
                this.handleTrailingData();
            }
        }
        else if (this._state === 65 /* InNumericEntity */ && !this.xmlMode) {
            this.decodeNumericEntity(2, 10, false);
            if (this.sectionStart < this._index) {
                this._state = this.baseState;
                this.handleTrailingData();
            }
        }
        else if (this._state === 66 /* InHexEntity */ && !this.xmlMode) {
            this.decodeNumericEntity(3, 16, false);
            if (this.sectionStart < this._index) {
                this._state = this.baseState;
                this.handleTrailingData();
            }
        }
        else if (this._state !== 3 /* InTagName */ &&
            this._state !== 8 /* BeforeAttributeName */ &&
            this._state !== 11 /* BeforeAttributeValue */ &&
            this._state !== 10 /* AfterAttributeName */ &&
            this._state !== 9 /* InAttributeName */ &&
            this._state !== 13 /* InAttributeValueSq */ &&
            this._state !== 12 /* InAttributeValueDq */ &&
            this._state !== 14 /* InAttributeValueNq */ &&
            this._state !== 6 /* InClosingTagName */) {
            this.cbs.ontext(data);
        }
        /*
         * Else, ignore remaining data
         * TODO add a way to remove current tag
         */
    };
    Tokenizer.prototype.getSection = function () {
        return this.buffer.substring(this.sectionStart, this._index);
    };
    Tokenizer.prototype.emitToken = function (name) {
        this.cbs[name](this.getSection());
        this.sectionStart = -1;
    };
    Tokenizer.prototype.emitPartial = function (value) {
        if (this.baseState !== 1 /* Text */) {
            this.cbs.onattribdata(value); // TODO implement the new event
        }
        else {
            this.cbs.ontext(value);
        }
    };
    return Tokenizer;
}());
exports["default"] = Tokenizer;


/***/ }),

/***/ 8139:
/***/ ((module) => {

// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;

// declaration
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;

// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
var TRIM_REGEX = /^\s+|\s+$/g;

// strings
var NEWLINE = '\n';
var FORWARD_SLASH = '/';
var ASTERISK = '*';
var EMPTY_STRING = '';

// types
var TYPE_COMMENT = 'comment';
var TYPE_DECLARATION = 'declaration';

/**
 * @param {String} style
 * @param {Object} [options]
 * @return {Object[]}
 * @throws {TypeError}
 * @throws {Error}
 */
module.exports = function(style, options) {
  if (typeof style !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (!style) return [];

  options = options || {};

  /**
   * Positional.
   */
  var lineno = 1;
  var column = 1;

  /**
   * Update lineno and column based on `str`.
   *
   * @param {String} str
   */
  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }

  /**
   * Mark position and patch `node.position`.
   *
   * @return {Function}
   */
  function position() {
    var start = { line: lineno, column: column };
    return function(node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }

  /**
   * Store position information for a node.
   *
   * @constructor
   * @property {Object} start
   * @property {Object} end
   * @property {undefined|String} source
   */
  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column: column };
    this.source = options.source;
  }

  /**
   * Non-enumerable source string.
   */
  Position.prototype.content = style;

  var errorsList = [];

  /**
   * Error `msg`.
   *
   * @param {String} msg
   * @throws {Error}
   */
  function error(msg) {
    var err = new Error(
      options.source + ':' + lineno + ':' + column + ': ' + msg
    );
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }

  /**
   * Match `re` and return captures.
   *
   * @param {RegExp} re
   * @return {undefined|Array}
   */
  function match(re) {
    var m = re.exec(style);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m;
  }

  /**
   * Parse whitespace.
   */
  function whitespace() {
    match(WHITESPACE_REGEX);
  }

  /**
   * Parse comments.
   *
   * @param {Object[]} [rules]
   * @return {Object[]}
   */
  function comments(rules) {
    var c;
    rules = rules || [];
    while ((c = comment())) {
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }

  /**
   * Parse comment.
   *
   * @return {Object}
   * @throws {Error}
   */
  function comment() {
    var pos = position();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;

    var i = 2;
    while (
      EMPTY_STRING != style.charAt(i) &&
      (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))
    ) {
      ++i;
    }
    i += 2;

    if (EMPTY_STRING === style.charAt(i - 1)) {
      return error('End of comment missing');
    }

    var str = style.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i);
    column += 2;

    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }

  /**
   * Parse declaration.
   *
   * @return {Object}
   * @throws {Error}
   */
  function declaration() {
    var pos = position();

    // prop
    var prop = match(PROPERTY_REGEX);
    if (!prop) return;
    comment();

    // :
    if (!match(COLON_REGEX)) return error("property missing ':'");

    // val
    var val = match(VALUE_REGEX);

    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val
        ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING))
        : EMPTY_STRING
    });

    // ;
    match(SEMICOLON_REGEX);

    return ret;
  }

  /**
   * Parse declarations.
   *
   * @return {Object[]}
   */
  function declarations() {
    var decls = [];

    comments(decls);

    // declarations
    var decl;
    while ((decl = declaration())) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    return decls;
  }

  whitespace();
  return declarations();
};

/**
 * Trim `str`.
 *
 * @param {String} str
 * @return {String}
 */
function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}


/***/ }),

/***/ 973:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var camel2hyphen = __webpack_require__(1169);

var isDimension = function (feature) {
  var re = /[height|width]$/;
  return re.test(feature);
};

var obj2mq = function (obj) {
  var mq = '';
  var features = Object.keys(obj);
  features.forEach(function (feature, index) {
    var value = obj[feature];
    feature = camel2hyphen(feature);
    // Add px to dimension features
    if (isDimension(feature) && typeof value === 'number') {
      value = value + 'px';
    }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += 'not ' + feature;
    } else {
      mq += '(' + feature + ': ' + value + ')';
    }
    if (index < features.length-1) {
      mq += ' and '
    }
  });
  return mq;
};

var json2mq = function (query) {
  var mq = '';
  if (typeof query === 'string') {
    return query;
  }
  // Handling array of media queries
  if (query instanceof Array) {
    query.forEach(function (q, index) {
      mq += obj2mq(q);
      if (index < query.length-1) {
        mq += ', '
      }
    });
    return mq;
  }
  // Handling single media query
  return obj2mq(query);
};

module.exports = json2mq;

/***/ }),

/***/ 1296:
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;


/***/ }),

/***/ 5726:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// A reserved attribute.
// It is handled by React separately and shouldn't be written to the DOM.
var RESERVED = 0; // A simple string attribute.
// Attributes that aren't in the filter are presumed to have this type.

var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
// "enumerated" attributes with "true" and "false" as possible values.
// When true, it should be set to a "true" string.
// When false, it should be set to a "false" string.

var BOOLEANISH_STRING = 2; // A real boolean attribute.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.

var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
// For any other value, should be present with that value.

var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
// When falsy, it should be removed.

var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
// When falsy, it should be removed.

var POSITIVE_NUMERIC = 6;
function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}

function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
  this.removeEmptyString = removeEmptyString;
} // When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.


var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];
reservedProps.forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // A few React string attributes have a different name.
// This is a mapping from React prop names to the attribute names.

[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      attributeName = _ref2[1];

  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are "enumerated" HTML attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).

['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are "enumerated" SVG attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.

['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are HTML boolean attributes.

['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
// on the client side because the browsers are inconsistent. Instead we call focus().
'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'disableRemotePlayback', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
'itemScope'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are the few React props that we set as DOM properties
// rather than attributes. These are all booleans.

['checked', // Note: `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`. We have special logic for handling this.
'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are HTML attributes that are "overloaded booleans": they behave like
// booleans, but can also accept a string value.

['capture', 'download' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are HTML attributes that must be positive numbers.

['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These are HTML attributes that must be numbers.

['rowSpan', 'start'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
});
var CAMELIZE = /[\-\:]([a-z])/g;

var capitalize = function capitalize(token) {
  return token[1].toUpperCase();
}; // This is a list of all SVG attributes that need special casing, namespacing,
// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML attribute filter.
// Some of these attributes can be hard to find. This list was created by
// scraping the MDN documentation.


['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // String SVG attributes with the xlink namespace.

['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, 'http://www.w3.org/1999/xlink', false, // sanitizeURL
  false);
}); // String SVG attributes with the xml namespace.

['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, 'http://www.w3.org/XML/1998/namespace', false, // sanitizeURL
  false);
}); // These attribute exists both in HTML and SVG.
// The attribute name is case-sensitive in SVG so we can't just use
// the React name like we do for attributes that exist only in HTML.

['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
  attributeName.toLowerCase(), // attributeName
  null, // attributeNamespace
  false, // sanitizeURL
  false);
}); // These attributes accept URLs. These must not allow javascript: URLS.
// These will also need to accept Trusted Types object in the future.

var xlinkHref = 'xlinkHref';
properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
'xlink:href', 'http://www.w3.org/1999/xlink', true, // sanitizeURL
false);
['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
  attributeName.toLowerCase(), // attributeName
  null, // attributeNamespace
  true, // sanitizeURL
  true);
});

var _require = __webpack_require__(8229),
    CAMELCASE = _require.CAMELCASE,
    SAME = _require.SAME,
    possibleStandardNamesOptimized = _require.possibleStandardNames;

var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
/**
 * Checks whether a property name is a custom attribute.
 *
 * @see {@link https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L23-L25}
 *
 * @param {string}
 * @return {boolean}
 */

var isCustomAttribute = RegExp.prototype.test.bind( // eslint-disable-next-line no-misleading-character-class
new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));
var possibleStandardNames = Object.keys(possibleStandardNamesOptimized).reduce(function (accumulator, standardName) {
  var propName = possibleStandardNamesOptimized[standardName];

  if (propName === SAME) {
    accumulator[standardName] = standardName;
  } else if (propName === CAMELCASE) {
    accumulator[standardName.toLowerCase()] = standardName;
  } else {
    accumulator[standardName] = propName;
  }

  return accumulator;
}, {});

exports.BOOLEAN = BOOLEAN;
exports.BOOLEANISH_STRING = BOOLEANISH_STRING;
exports.NUMERIC = NUMERIC;
exports.OVERLOADED_BOOLEAN = OVERLOADED_BOOLEAN;
exports.POSITIVE_NUMERIC = POSITIVE_NUMERIC;
exports.RESERVED = RESERVED;
exports.STRING = STRING;
exports.getPropertyInfo = getPropertyInfo;
exports.isCustomAttribute = isCustomAttribute;
exports.possibleStandardNames = possibleStandardNames;


/***/ }),

/***/ 8229:
/***/ ((__unused_webpack_module, exports) => {

// An attribute in which the DOM/SVG standard name is the same as the React prop name (e.g., 'accept').
var SAME = 0;
exports.SAME = SAME;

// An attribute in which the React prop name is the camelcased version of the DOM/SVG standard name (e.g., 'acceptCharset').
var CAMELCASE = 1;
exports.CAMELCASE = CAMELCASE;

exports.possibleStandardNames = {
  accept: 0,
  acceptCharset: 1,
  'accept-charset': 'acceptCharset',
  accessKey: 1,
  action: 0,
  allowFullScreen: 1,
  alt: 0,
  as: 0,
  async: 0,
  autoCapitalize: 1,
  autoComplete: 1,
  autoCorrect: 1,
  autoFocus: 1,
  autoPlay: 1,
  autoSave: 1,
  capture: 0,
  cellPadding: 1,
  cellSpacing: 1,
  challenge: 0,
  charSet: 1,
  checked: 0,
  children: 0,
  cite: 0,
  class: 'className',
  classID: 1,
  className: 1,
  cols: 0,
  colSpan: 1,
  content: 0,
  contentEditable: 1,
  contextMenu: 1,
  controls: 0,
  controlsList: 1,
  coords: 0,
  crossOrigin: 1,
  dangerouslySetInnerHTML: 1,
  data: 0,
  dateTime: 1,
  default: 0,
  defaultChecked: 1,
  defaultValue: 1,
  defer: 0,
  dir: 0,
  disabled: 0,
  disablePictureInPicture: 1,
  disableRemotePlayback: 1,
  download: 0,
  draggable: 0,
  encType: 1,
  enterKeyHint: 1,
  for: 'htmlFor',
  form: 0,
  formMethod: 1,
  formAction: 1,
  formEncType: 1,
  formNoValidate: 1,
  formTarget: 1,
  frameBorder: 1,
  headers: 0,
  height: 0,
  hidden: 0,
  high: 0,
  href: 0,
  hrefLang: 1,
  htmlFor: 1,
  httpEquiv: 1,
  'http-equiv': 'httpEquiv',
  icon: 0,
  id: 0,
  innerHTML: 1,
  inputMode: 1,
  integrity: 0,
  is: 0,
  itemID: 1,
  itemProp: 1,
  itemRef: 1,
  itemScope: 1,
  itemType: 1,
  keyParams: 1,
  keyType: 1,
  kind: 0,
  label: 0,
  lang: 0,
  list: 0,
  loop: 0,
  low: 0,
  manifest: 0,
  marginWidth: 1,
  marginHeight: 1,
  max: 0,
  maxLength: 1,
  media: 0,
  mediaGroup: 1,
  method: 0,
  min: 0,
  minLength: 1,
  multiple: 0,
  muted: 0,
  name: 0,
  noModule: 1,
  nonce: 0,
  noValidate: 1,
  open: 0,
  optimum: 0,
  pattern: 0,
  placeholder: 0,
  playsInline: 1,
  poster: 0,
  preload: 0,
  profile: 0,
  radioGroup: 1,
  readOnly: 1,
  referrerPolicy: 1,
  rel: 0,
  required: 0,
  reversed: 0,
  role: 0,
  rows: 0,
  rowSpan: 1,
  sandbox: 0,
  scope: 0,
  scoped: 0,
  scrolling: 0,
  seamless: 0,
  selected: 0,
  shape: 0,
  size: 0,
  sizes: 0,
  span: 0,
  spellCheck: 1,
  src: 0,
  srcDoc: 1,
  srcLang: 1,
  srcSet: 1,
  start: 0,
  step: 0,
  style: 0,
  summary: 0,
  tabIndex: 1,
  target: 0,
  title: 0,
  type: 0,
  useMap: 1,
  value: 0,
  width: 0,
  wmode: 0,
  wrap: 0,
  about: 0,
  accentHeight: 1,
  'accent-height': 'accentHeight',
  accumulate: 0,
  additive: 0,
  alignmentBaseline: 1,
  'alignment-baseline': 'alignmentBaseline',
  allowReorder: 1,
  alphabetic: 0,
  amplitude: 0,
  arabicForm: 1,
  'arabic-form': 'arabicForm',
  ascent: 0,
  attributeName: 1,
  attributeType: 1,
  autoReverse: 1,
  azimuth: 0,
  baseFrequency: 1,
  baselineShift: 1,
  'baseline-shift': 'baselineShift',
  baseProfile: 1,
  bbox: 0,
  begin: 0,
  bias: 0,
  by: 0,
  calcMode: 1,
  capHeight: 1,
  'cap-height': 'capHeight',
  clip: 0,
  clipPath: 1,
  'clip-path': 'clipPath',
  clipPathUnits: 1,
  clipRule: 1,
  'clip-rule': 'clipRule',
  color: 0,
  colorInterpolation: 1,
  'color-interpolation': 'colorInterpolation',
  colorInterpolationFilters: 1,
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorProfile: 1,
  'color-profile': 'colorProfile',
  colorRendering: 1,
  'color-rendering': 'colorRendering',
  contentScriptType: 1,
  contentStyleType: 1,
  cursor: 0,
  cx: 0,
  cy: 0,
  d: 0,
  datatype: 0,
  decelerate: 0,
  descent: 0,
  diffuseConstant: 1,
  direction: 0,
  display: 0,
  divisor: 0,
  dominantBaseline: 1,
  'dominant-baseline': 'dominantBaseline',
  dur: 0,
  dx: 0,
  dy: 0,
  edgeMode: 1,
  elevation: 0,
  enableBackground: 1,
  'enable-background': 'enableBackground',
  end: 0,
  exponent: 0,
  externalResourcesRequired: 1,
  fill: 0,
  fillOpacity: 1,
  'fill-opacity': 'fillOpacity',
  fillRule: 1,
  'fill-rule': 'fillRule',
  filter: 0,
  filterRes: 1,
  filterUnits: 1,
  floodOpacity: 1,
  'flood-opacity': 'floodOpacity',
  floodColor: 1,
  'flood-color': 'floodColor',
  focusable: 0,
  fontFamily: 1,
  'font-family': 'fontFamily',
  fontSize: 1,
  'font-size': 'fontSize',
  fontSizeAdjust: 1,
  'font-size-adjust': 'fontSizeAdjust',
  fontStretch: 1,
  'font-stretch': 'fontStretch',
  fontStyle: 1,
  'font-style': 'fontStyle',
  fontVariant: 1,
  'font-variant': 'fontVariant',
  fontWeight: 1,
  'font-weight': 'fontWeight',
  format: 0,
  from: 0,
  fx: 0,
  fy: 0,
  g1: 0,
  g2: 0,
  glyphName: 1,
  'glyph-name': 'glyphName',
  glyphOrientationHorizontal: 1,
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphOrientationVertical: 1,
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphRef: 1,
  gradientTransform: 1,
  gradientUnits: 1,
  hanging: 0,
  horizAdvX: 1,
  'horiz-adv-x': 'horizAdvX',
  horizOriginX: 1,
  'horiz-origin-x': 'horizOriginX',
  ideographic: 0,
  imageRendering: 1,
  'image-rendering': 'imageRendering',
  in2: 0,
  in: 0,
  inlist: 0,
  intercept: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  k: 0,
  kernelMatrix: 1,
  kernelUnitLength: 1,
  kerning: 0,
  keyPoints: 1,
  keySplines: 1,
  keyTimes: 1,
  lengthAdjust: 1,
  letterSpacing: 1,
  'letter-spacing': 'letterSpacing',
  lightingColor: 1,
  'lighting-color': 'lightingColor',
  limitingConeAngle: 1,
  local: 0,
  markerEnd: 1,
  'marker-end': 'markerEnd',
  markerHeight: 1,
  markerMid: 1,
  'marker-mid': 'markerMid',
  markerStart: 1,
  'marker-start': 'markerStart',
  markerUnits: 1,
  markerWidth: 1,
  mask: 0,
  maskContentUnits: 1,
  maskUnits: 1,
  mathematical: 0,
  mode: 0,
  numOctaves: 1,
  offset: 0,
  opacity: 0,
  operator: 0,
  order: 0,
  orient: 0,
  orientation: 0,
  origin: 0,
  overflow: 0,
  overlinePosition: 1,
  'overline-position': 'overlinePosition',
  overlineThickness: 1,
  'overline-thickness': 'overlineThickness',
  paintOrder: 1,
  'paint-order': 'paintOrder',
  panose1: 0,
  'panose-1': 'panose1',
  pathLength: 1,
  patternContentUnits: 1,
  patternTransform: 1,
  patternUnits: 1,
  pointerEvents: 1,
  'pointer-events': 'pointerEvents',
  points: 0,
  pointsAtX: 1,
  pointsAtY: 1,
  pointsAtZ: 1,
  prefix: 0,
  preserveAlpha: 1,
  preserveAspectRatio: 1,
  primitiveUnits: 1,
  property: 0,
  r: 0,
  radius: 0,
  refX: 1,
  refY: 1,
  renderingIntent: 1,
  'rendering-intent': 'renderingIntent',
  repeatCount: 1,
  repeatDur: 1,
  requiredExtensions: 1,
  requiredFeatures: 1,
  resource: 0,
  restart: 0,
  result: 0,
  results: 0,
  rotate: 0,
  rx: 0,
  ry: 0,
  scale: 0,
  security: 0,
  seed: 0,
  shapeRendering: 1,
  'shape-rendering': 'shapeRendering',
  slope: 0,
  spacing: 0,
  specularConstant: 1,
  specularExponent: 1,
  speed: 0,
  spreadMethod: 1,
  startOffset: 1,
  stdDeviation: 1,
  stemh: 0,
  stemv: 0,
  stitchTiles: 1,
  stopColor: 1,
  'stop-color': 'stopColor',
  stopOpacity: 1,
  'stop-opacity': 'stopOpacity',
  strikethroughPosition: 1,
  'strikethrough-position': 'strikethroughPosition',
  strikethroughThickness: 1,
  'strikethrough-thickness': 'strikethroughThickness',
  string: 0,
  stroke: 0,
  strokeDasharray: 1,
  'stroke-dasharray': 'strokeDasharray',
  strokeDashoffset: 1,
  'stroke-dashoffset': 'strokeDashoffset',
  strokeLinecap: 1,
  'stroke-linecap': 'strokeLinecap',
  strokeLinejoin: 1,
  'stroke-linejoin': 'strokeLinejoin',
  strokeMiterlimit: 1,
  'stroke-miterlimit': 'strokeMiterlimit',
  strokeWidth: 1,
  'stroke-width': 'strokeWidth',
  strokeOpacity: 1,
  'stroke-opacity': 'strokeOpacity',
  suppressContentEditableWarning: 1,
  suppressHydrationWarning: 1,
  surfaceScale: 1,
  systemLanguage: 1,
  tableValues: 1,
  targetX: 1,
  targetY: 1,
  textAnchor: 1,
  'text-anchor': 'textAnchor',
  textDecoration: 1,
  'text-decoration': 'textDecoration',
  textLength: 1,
  textRendering: 1,
  'text-rendering': 'textRendering',
  to: 0,
  transform: 0,
  typeof: 0,
  u1: 0,
  u2: 0,
  underlinePosition: 1,
  'underline-position': 'underlinePosition',
  underlineThickness: 1,
  'underline-thickness': 'underlineThickness',
  unicode: 0,
  unicodeBidi: 1,
  'unicode-bidi': 'unicodeBidi',
  unicodeRange: 1,
  'unicode-range': 'unicodeRange',
  unitsPerEm: 1,
  'units-per-em': 'unitsPerEm',
  unselectable: 0,
  vAlphabetic: 1,
  'v-alphabetic': 'vAlphabetic',
  values: 0,
  vectorEffect: 1,
  'vector-effect': 'vectorEffect',
  version: 0,
  vertAdvY: 1,
  'vert-adv-y': 'vertAdvY',
  vertOriginX: 1,
  'vert-origin-x': 'vertOriginX',
  vertOriginY: 1,
  'vert-origin-y': 'vertOriginY',
  vHanging: 1,
  'v-hanging': 'vHanging',
  vIdeographic: 1,
  'v-ideographic': 'vIdeographic',
  viewBox: 1,
  viewTarget: 1,
  visibility: 0,
  vMathematical: 1,
  'v-mathematical': 'vMathematical',
  vocab: 0,
  widths: 0,
  wordSpacing: 1,
  'word-spacing': 'wordSpacing',
  writingMode: 1,
  'writing-mode': 'writingMode',
  x1: 0,
  x2: 0,
  x: 0,
  xChannelSelector: 1,
  xHeight: 1,
  'x-height': 'xHeight',
  xlinkActuate: 1,
  'xlink:actuate': 'xlinkActuate',
  xlinkArcrole: 1,
  'xlink:arcrole': 'xlinkArcrole',
  xlinkHref: 1,
  'xlink:href': 'xlinkHref',
  xlinkRole: 1,
  'xlink:role': 'xlinkRole',
  xlinkShow: 1,
  'xlink:show': 'xlinkShow',
  xlinkTitle: 1,
  'xlink:title': 'xlinkTitle',
  xlinkType: 1,
  'xlink:type': 'xlinkType',
  xmlBase: 1,
  'xml:base': 'xmlBase',
  xmlLang: 1,
  'xml:lang': 'xmlLang',
  xmlns: 0,
  'xml:space': 'xmlSpace',
  xmlnsXlink: 1,
  'xmlns:xlink': 'xmlnsXlink',
  xmlSpace: 1,
  y1: 0,
  y2: 0,
  y: 0,
  yChannelSelector: 1,
  z: 0,
  zoomAndPan: 1
};


/***/ }),

/***/ 8205:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NextArrow = exports.PrevArrow = void 0;

var _react = _interopRequireDefault(__webpack_require__(1051));

var _classnames = _interopRequireDefault(__webpack_require__(4184));

var _innerSliderUtils = __webpack_require__(5518);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PrevArrow = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PrevArrow, _React$PureComponent);

  var _super = _createSuper(PrevArrow);

  function PrevArrow() {
    _classCallCheck(this, PrevArrow);

    return _super.apply(this, arguments);
  }

  _createClass(PrevArrow, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      if (e) {
        e.preventDefault();
      }

      this.props.clickHandler(options, e);
    }
  }, {
    key: "render",
    value: function render() {
      var prevClasses = {
        "slick-arrow": true,
        "slick-prev": true
      };
      var prevHandler = this.clickHandler.bind(this, {
        message: "previous"
      });

      if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
        prevClasses["slick-disabled"] = true;
        prevHandler = null;
      }

      var prevArrowProps = {
        key: "0",
        "data-role": "none",
        className: (0, _classnames["default"])(prevClasses),
        style: {
          display: "block"
        },
        onClick: prevHandler
      };
      var customProps = {
        currentSlide: this.props.currentSlide,
        slideCount: this.props.slideCount
      };
      var prevArrow;

      if (this.props.prevArrow) {
        prevArrow = /*#__PURE__*/_react["default"].cloneElement(this.props.prevArrow, _objectSpread(_objectSpread({}, prevArrowProps), customProps));
      } else {
        prevArrow = /*#__PURE__*/_react["default"].createElement("button", _extends({
          key: "0",
          type: "button"
        }, prevArrowProps), " ", "Previous");
      }

      return prevArrow;
    }
  }]);

  return PrevArrow;
}(_react["default"].PureComponent);

exports.PrevArrow = PrevArrow;

var NextArrow = /*#__PURE__*/function (_React$PureComponent2) {
  _inherits(NextArrow, _React$PureComponent2);

  var _super2 = _createSuper(NextArrow);

  function NextArrow() {
    _classCallCheck(this, NextArrow);

    return _super2.apply(this, arguments);
  }

  _createClass(NextArrow, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      if (e) {
        e.preventDefault();
      }

      this.props.clickHandler(options, e);
    }
  }, {
    key: "render",
    value: function render() {
      var nextClasses = {
        "slick-arrow": true,
        "slick-next": true
      };
      var nextHandler = this.clickHandler.bind(this, {
        message: "next"
      });

      if (!(0, _innerSliderUtils.canGoNext)(this.props)) {
        nextClasses["slick-disabled"] = true;
        nextHandler = null;
      }

      var nextArrowProps = {
        key: "1",
        "data-role": "none",
        className: (0, _classnames["default"])(nextClasses),
        style: {
          display: "block"
        },
        onClick: nextHandler
      };
      var customProps = {
        currentSlide: this.props.currentSlide,
        slideCount: this.props.slideCount
      };
      var nextArrow;

      if (this.props.nextArrow) {
        nextArrow = /*#__PURE__*/_react["default"].cloneElement(this.props.nextArrow, _objectSpread(_objectSpread({}, nextArrowProps), customProps));
      } else {
        nextArrow = /*#__PURE__*/_react["default"].createElement("button", _extends({
          key: "1",
          type: "button"
        }, nextArrowProps), " ", "Next");
      }

      return nextArrow;
    }
  }]);

  return NextArrow;
}(_react["default"].PureComponent);

exports.NextArrow = NextArrow;

/***/ }),

/***/ 3492:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(1051));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultProps = {
  accessibility: true,
  adaptiveHeight: false,
  afterChange: null,
  appendDots: function appendDots(dots) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      style: {
        display: "block"
      }
    }, dots);
  },
  arrows: true,
  autoplay: false,
  autoplaySpeed: 3000,
  beforeChange: null,
  centerMode: false,
  centerPadding: "50px",
  className: "",
  cssEase: "ease",
  customPaging: function customPaging(i) {
    return /*#__PURE__*/_react["default"].createElement("button", null, i + 1);
  },
  dots: false,
  dotsClass: "slick-dots",
  draggable: true,
  easing: "linear",
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  infinite: true,
  initialSlide: 0,
  lazyLoad: null,
  nextArrow: null,
  onEdge: null,
  onInit: null,
  onLazyLoadError: null,
  onReInit: null,
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  pauseOnHover: true,
  prevArrow: null,
  responsive: null,
  rows: 1,
  rtl: false,
  slide: "div",
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: true,
  swipeEvent: null,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  useTransform: true,
  variableWidth: false,
  vertical: false,
  waitForAnimate: true
};
var _default = defaultProps;
exports["default"] = _default;

/***/ }),

/***/ 6329:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Dots = void 0;

var _react = _interopRequireDefault(__webpack_require__(1051));

var _classnames = _interopRequireDefault(__webpack_require__(4184));

var _innerSliderUtils = __webpack_require__(5518);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var getDotCount = function getDotCount(spec) {
  var dots;

  if (spec.infinite) {
    dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
  } else {
    dots = Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1;
  }

  return dots;
};

var Dots = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Dots, _React$PureComponent);

  var _super = _createSuper(Dots);

  function Dots() {
    _classCallCheck(this, Dots);

    return _super.apply(this, arguments);
  }

  _createClass(Dots, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      // In Autoplay the focus stays on clicked button even after transition
      // to next slide. That only goes away by click somewhere outside
      e.preventDefault();
      this.props.clickHandler(options);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseOver = _this$props.onMouseOver,
          onMouseLeave = _this$props.onMouseLeave,
          infinite = _this$props.infinite,
          slidesToScroll = _this$props.slidesToScroll,
          slidesToShow = _this$props.slidesToShow,
          slideCount = _this$props.slideCount,
          currentSlide = _this$props.currentSlide;
      var dotCount = getDotCount({
        slideCount: slideCount,
        slidesToScroll: slidesToScroll,
        slidesToShow: slidesToShow,
        infinite: infinite
      });
      var mouseEvents = {
        onMouseEnter: onMouseEnter,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave
      };
      var dots = [];

      for (var i = 0; i < dotCount; i++) {
        var _rightBound = (i + 1) * slidesToScroll - 1;

        var rightBound = infinite ? _rightBound : (0, _innerSliderUtils.clamp)(_rightBound, 0, slideCount - 1);

        var _leftBound = rightBound - (slidesToScroll - 1);

        var leftBound = infinite ? _leftBound : (0, _innerSliderUtils.clamp)(_leftBound, 0, slideCount - 1);
        var className = (0, _classnames["default"])({
          "slick-active": infinite ? currentSlide >= leftBound && currentSlide <= rightBound : currentSlide === leftBound
        });
        var dotOptions = {
          message: "dots",
          index: i,
          slidesToScroll: slidesToScroll,
          currentSlide: currentSlide
        };
        var onClick = this.clickHandler.bind(this, dotOptions);
        dots = dots.concat( /*#__PURE__*/_react["default"].createElement("li", {
          key: i,
          className: className
        }, /*#__PURE__*/_react["default"].cloneElement(this.props.customPaging(i), {
          onClick: onClick
        })));
      }

      return /*#__PURE__*/_react["default"].cloneElement(this.props.appendDots(dots), _objectSpread({
        className: this.props.dotsClass
      }, mouseEvents));
    }
  }]);

  return Dots;
}(_react["default"].PureComponent);

exports.Dots = Dots;

/***/ }),

/***/ 6066:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var _slider = _interopRequireDefault(__webpack_require__(5798));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _slider["default"];
exports.Z = _default;

/***/ }),

/***/ 6948:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var initialState = {
  animating: false,
  autoplaying: null,
  currentDirection: 0,
  currentLeft: null,
  currentSlide: 0,
  direction: 1,
  dragging: false,
  edgeDragged: false,
  initialized: false,
  lazyLoadedList: [],
  listHeight: null,
  listWidth: null,
  scrolling: false,
  slideCount: null,
  slideHeight: null,
  slideWidth: null,
  swipeLeft: null,
  swiped: false,
  // used by swipeEvent. differentites between touch and swipe.
  swiping: false,
  touchObject: {
    startX: 0,
    startY: 0,
    curX: 0,
    curY: 0
  },
  trackStyle: {},
  trackWidth: 0,
  targetSlide: 0
};
var _default = initialState;
exports["default"] = _default;

/***/ }),

/***/ 8517:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InnerSlider = void 0;

var _react = _interopRequireDefault(__webpack_require__(1051));

var _initialState = _interopRequireDefault(__webpack_require__(6948));

var _lodash = _interopRequireDefault(__webpack_require__(1296));

var _classnames = _interopRequireDefault(__webpack_require__(4184));

var _innerSliderUtils = __webpack_require__(5518);

var _track = __webpack_require__(4740);

var _dots = __webpack_require__(6329);

var _arrows = __webpack_require__(8205);

var _resizeObserverPolyfill = _interopRequireDefault(__webpack_require__(1033));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InnerSlider = /*#__PURE__*/function (_React$Component) {
  _inherits(InnerSlider, _React$Component);

  var _super = _createSuper(InnerSlider);

  function InnerSlider(props) {
    var _this;

    _classCallCheck(this, InnerSlider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "listRefHandler", function (ref) {
      return _this.list = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "trackRefHandler", function (ref) {
      return _this.track = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "adaptHeight", function () {
      if (_this.props.adaptiveHeight && _this.list) {
        var elem = _this.list.querySelector("[data-index=\"".concat(_this.state.currentSlide, "\"]"));

        _this.list.style.height = (0, _innerSliderUtils.getHeight)(elem) + "px";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.props.onInit && _this.props.onInit();

      if (_this.props.lazyLoad) {
        var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_objectSpread(_objectSpread({}, _this.props), _this.state));

        if (slidesToLoad.length > 0) {
          _this.setState(function (prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });

          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      }

      var spec = _objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props);

      _this.updateState(spec, true, function () {
        _this.adaptHeight();

        _this.props.autoplay && _this.autoPlay("update");
      });

      if (_this.props.lazyLoad === "progressive") {
        _this.lazyLoadTimer = setInterval(_this.progressiveLazyLoad, 1000);
      }

      _this.ro = new _resizeObserverPolyfill["default"](function () {
        if (_this.state.animating) {
          _this.onWindowResized(false); // don't set trackStyle hence don't break animation


          _this.callbackTimers.push(setTimeout(function () {
            return _this.onWindowResized();
          }, _this.props.speed));
        } else {
          _this.onWindowResized();
        }
      });

      _this.ro.observe(_this.list);

      document.querySelectorAll && Array.prototype.forEach.call(document.querySelectorAll(".slick-slide"), function (slide) {
        slide.onfocus = _this.props.pauseOnFocus ? _this.onSlideFocus : null;
        slide.onblur = _this.props.pauseOnFocus ? _this.onSlideBlur : null;
      });

      if (window.addEventListener) {
        window.addEventListener("resize", _this.onWindowResized);
      } else {
        window.attachEvent("onresize", _this.onWindowResized);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      if (_this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
      }

      if (_this.lazyLoadTimer) {
        clearInterval(_this.lazyLoadTimer);
      }

      if (_this.callbackTimers.length) {
        _this.callbackTimers.forEach(function (timer) {
          return clearTimeout(timer);
        });

        _this.callbackTimers = [];
      }

      if (window.addEventListener) {
        window.removeEventListener("resize", _this.onWindowResized);
      } else {
        window.detachEvent("onresize", _this.onWindowResized);
      }

      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }

      _this.ro.disconnect();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      _this.checkImagesLoad();

      _this.props.onReInit && _this.props.onReInit();

      if (_this.props.lazyLoad) {
        var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_objectSpread(_objectSpread({}, _this.props), _this.state));

        if (slidesToLoad.length > 0) {
          _this.setState(function (prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });

          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      } // if (this.props.onLazyLoad) {
      //   this.props.onLazyLoad([leftMostSlide])
      // }


      _this.adaptHeight();

      var spec = _objectSpread(_objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props), _this.state);

      var setTrackStyle = _this.didPropsChange(prevProps);

      setTrackStyle && _this.updateState(spec, setTrackStyle, function () {
        if (_this.state.currentSlide >= _react["default"].Children.count(_this.props.children)) {
          _this.changeSlide({
            message: "index",
            index: _react["default"].Children.count(_this.props.children) - _this.props.slidesToShow,
            currentSlide: _this.state.currentSlide
          });
        }

        if (_this.props.autoplay) {
          _this.autoPlay("update");
        } else {
          _this.pause("paused");
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onWindowResized", function (setTrackStyle) {
      if (_this.debouncedResize) _this.debouncedResize.cancel();
      _this.debouncedResize = (0, _lodash["default"])(function () {
        return _this.resizeWindow(setTrackStyle);
      }, 50);

      _this.debouncedResize();
    });

    _defineProperty(_assertThisInitialized(_this), "resizeWindow", function () {
      var setTrackStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var isTrackMounted = Boolean(_this.track && _this.track.node); // prevent warning: setting state on unmounted component (server side rendering)

      if (!isTrackMounted) return;

      var spec = _objectSpread(_objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props), _this.state);

      _this.updateState(spec, setTrackStyle, function () {
        if (_this.props.autoplay) _this.autoPlay("update");else _this.pause("paused");
      }); // animating state should be cleared while resizing, otherwise autoplay stops working


      _this.setState({
        animating: false
      });

      clearTimeout(_this.animationEndCallback);
      delete _this.animationEndCallback;
    });

    _defineProperty(_assertThisInitialized(_this), "updateState", function (spec, setTrackStyle, callback) {
      var updatedState = (0, _innerSliderUtils.initializedState)(spec);
      spec = _objectSpread(_objectSpread(_objectSpread({}, spec), updatedState), {}, {
        slideIndex: updatedState.currentSlide
      });
      var targetLeft = (0, _innerSliderUtils.getTrackLeft)(spec);
      spec = _objectSpread(_objectSpread({}, spec), {}, {
        left: targetLeft
      });
      var trackStyle = (0, _innerSliderUtils.getTrackCSS)(spec);

      if (setTrackStyle || _react["default"].Children.count(_this.props.children) !== _react["default"].Children.count(spec.children)) {
        updatedState["trackStyle"] = trackStyle;
      }

      _this.setState(updatedState, callback);
    });

    _defineProperty(_assertThisInitialized(_this), "ssrInit", function () {
      if (_this.props.variableWidth) {
        var _trackWidth = 0,
            _trackLeft = 0;
        var childrenWidths = [];
        var preClones = (0, _innerSliderUtils.getPreClones)(_objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
          slideCount: _this.props.children.length
        }));
        var postClones = (0, _innerSliderUtils.getPostClones)(_objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
          slideCount: _this.props.children.length
        }));

        _this.props.children.forEach(function (child) {
          childrenWidths.push(child.props.style.width);
          _trackWidth += child.props.style.width;
        });

        for (var i = 0; i < preClones; i++) {
          _trackLeft += childrenWidths[childrenWidths.length - 1 - i];
          _trackWidth += childrenWidths[childrenWidths.length - 1 - i];
        }

        for (var _i = 0; _i < postClones; _i++) {
          _trackWidth += childrenWidths[_i];
        }

        for (var _i2 = 0; _i2 < _this.state.currentSlide; _i2++) {
          _trackLeft += childrenWidths[_i2];
        }

        var _trackStyle = {
          width: _trackWidth + "px",
          left: -_trackLeft + "px"
        };

        if (_this.props.centerMode) {
          var currentWidth = "".concat(childrenWidths[_this.state.currentSlide], "px");
          _trackStyle.left = "calc(".concat(_trackStyle.left, " + (100% - ").concat(currentWidth, ") / 2 ) ");
        }

        return {
          trackStyle: _trackStyle
        };
      }

      var childrenCount = _react["default"].Children.count(_this.props.children);

      var spec = _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        slideCount: childrenCount
      });

      var slideCount = (0, _innerSliderUtils.getPreClones)(spec) + (0, _innerSliderUtils.getPostClones)(spec) + childrenCount;
      var trackWidth = 100 / _this.props.slidesToShow * slideCount;
      var slideWidth = 100 / slideCount;
      var trackLeft = -slideWidth * ((0, _innerSliderUtils.getPreClones)(spec) + _this.state.currentSlide) * trackWidth / 100;

      if (_this.props.centerMode) {
        trackLeft += (100 - slideWidth * trackWidth / 100) / 2;
      }

      var trackStyle = {
        width: trackWidth + "%",
        left: trackLeft + "%"
      };
      return {
        slideWidth: slideWidth + "%",
        trackStyle: trackStyle
      };
    });

    _defineProperty(_assertThisInitialized(_this), "checkImagesLoad", function () {
      var images = _this.list && _this.list.querySelectorAll && _this.list.querySelectorAll(".slick-slide img") || [];
      var imagesCount = images.length,
          loadedCount = 0;
      Array.prototype.forEach.call(images, function (image) {
        var handler = function handler() {
          return ++loadedCount && loadedCount >= imagesCount && _this.onWindowResized();
        };

        if (!image.onclick) {
          image.onclick = function () {
            return image.parentNode.focus();
          };
        } else {
          var prevClickHandler = image.onclick;

          image.onclick = function () {
            prevClickHandler();
            image.parentNode.focus();
          };
        }

        if (!image.onload) {
          if (_this.props.lazyLoad) {
            image.onload = function () {
              _this.adaptHeight();

              _this.callbackTimers.push(setTimeout(_this.onWindowResized, _this.props.speed));
            };
          } else {
            image.onload = handler;

            image.onerror = function () {
              handler();
              _this.props.onLazyLoadError && _this.props.onLazyLoadError();
            };
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "progressiveLazyLoad", function () {
      var slidesToLoad = [];

      var spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      for (var index = _this.state.currentSlide; index < _this.state.slideCount + (0, _innerSliderUtils.getPostClones)(spec); index++) {
        if (_this.state.lazyLoadedList.indexOf(index) < 0) {
          slidesToLoad.push(index);
          break;
        }
      }

      for (var _index = _this.state.currentSlide - 1; _index >= -(0, _innerSliderUtils.getPreClones)(spec); _index--) {
        if (_this.state.lazyLoadedList.indexOf(_index) < 0) {
          slidesToLoad.push(_index);
          break;
        }
      }

      if (slidesToLoad.length > 0) {
        _this.setState(function (state) {
          return {
            lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad)
          };
        });

        if (_this.props.onLazyLoad) {
          _this.props.onLazyLoad(slidesToLoad);
        }
      } else {
        if (_this.lazyLoadTimer) {
          clearInterval(_this.lazyLoadTimer);
          delete _this.lazyLoadTimer;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "slideHandler", function (index) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$props = _this.props,
          asNavFor = _this$props.asNavFor,
          beforeChange = _this$props.beforeChange,
          onLazyLoad = _this$props.onLazyLoad,
          speed = _this$props.speed,
          afterChange = _this$props.afterChange; // capture currentslide before state is updated

      var currentSlide = _this.state.currentSlide;

      var _slideHandler = (0, _innerSliderUtils.slideHandler)(_objectSpread(_objectSpread(_objectSpread({
        index: index
      }, _this.props), _this.state), {}, {
        trackRef: _this.track,
        useCSS: _this.props.useCSS && !dontAnimate
      })),
          state = _slideHandler.state,
          nextState = _slideHandler.nextState;

      if (!state) return;
      beforeChange && beforeChange(currentSlide, state.currentSlide);
      var slidesToLoad = state.lazyLoadedList.filter(function (value) {
        return _this.state.lazyLoadedList.indexOf(value) < 0;
      });
      onLazyLoad && slidesToLoad.length > 0 && onLazyLoad(slidesToLoad);

      if (!_this.props.waitForAnimate && _this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
        afterChange && afterChange(currentSlide);
        delete _this.animationEndCallback;
      }

      _this.setState(state, function () {
        // asNavForIndex check is to avoid recursive calls of slideHandler in waitForAnimate=false mode
        if (asNavFor && _this.asNavForIndex !== index) {
          _this.asNavForIndex = index;
          asNavFor.innerSlider.slideHandler(index);
        }

        if (!nextState) return;
        _this.animationEndCallback = setTimeout(function () {
          var animating = nextState.animating,
              firstBatch = _objectWithoutProperties(nextState, ["animating"]);

          _this.setState(firstBatch, function () {
            _this.callbackTimers.push(setTimeout(function () {
              return _this.setState({
                animating: animating
              });
            }, 10));

            afterChange && afterChange(state.currentSlide);
            delete _this.animationEndCallback;
          });
        }, speed);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeSlide", function (options) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      var targetSlide = (0, _innerSliderUtils.changeSlide)(spec, options);
      if (targetSlide !== 0 && !targetSlide) return;

      if (dontAnimate === true) {
        _this.slideHandler(targetSlide, dontAnimate);
      } else {
        _this.slideHandler(targetSlide);
      }

      _this.props.autoplay && _this.autoPlay("update");

      if (_this.props.focusOnSelect) {
        var nodes = _this.list.querySelectorAll(".slick-current");

        nodes[0] && nodes[0].focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (e) {
      if (_this.clickable === false) {
        e.stopPropagation();
        e.preventDefault();
      }

      _this.clickable = true;
    });

    _defineProperty(_assertThisInitialized(_this), "keyHandler", function (e) {
      var dir = (0, _innerSliderUtils.keyHandler)(e, _this.props.accessibility, _this.props.rtl);
      dir !== "" && _this.changeSlide({
        message: dir
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectHandler", function (options) {
      _this.changeSlide(options);
    });

    _defineProperty(_assertThisInitialized(_this), "disableBodyScroll", function () {
      var preventDefault = function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
      };

      window.ontouchmove = preventDefault;
    });

    _defineProperty(_assertThisInitialized(_this), "enableBodyScroll", function () {
      window.ontouchmove = null;
    });

    _defineProperty(_assertThisInitialized(_this), "swipeStart", function (e) {
      if (_this.props.verticalSwiping) {
        _this.disableBodyScroll();
      }

      var state = (0, _innerSliderUtils.swipeStart)(e, _this.props.swipe, _this.props.draggable);
      state !== "" && _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), "swipeMove", function (e) {
      var state = (0, _innerSliderUtils.swipeMove)(e, _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;

      if (state["swiping"]) {
        _this.clickable = false;
      }

      _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), "swipeEnd", function (e) {
      var state = (0, _innerSliderUtils.swipeEnd)(e, _objectSpread(_objectSpread(_objectSpread({}, _this.props), _this.state), {}, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;
      var triggerSlideHandler = state["triggerSlideHandler"];
      delete state["triggerSlideHandler"];

      _this.setState(state);

      if (triggerSlideHandler === undefined) return;

      _this.slideHandler(triggerSlideHandler);

      if (_this.props.verticalSwiping) {
        _this.enableBodyScroll();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "touchEnd", function (e) {
      _this.swipeEnd(e);

      _this.clickable = true;
    });

    _defineProperty(_assertThisInitialized(_this), "slickPrev", function () {
      // this and fellow methods are wrapped in setTimeout
      // to make sure initialize setState has happened before
      // any of such methods are called
      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "previous"
        });
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "slickNext", function () {
      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "next"
        });
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "slickGoTo", function (slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      slide = Number(slide);
      if (isNaN(slide)) return "";

      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "index",
          index: slide,
          currentSlide: _this.state.currentSlide
        }, dontAnimate);
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      var nextIndex;

      if (_this.props.rtl) {
        nextIndex = _this.state.currentSlide - _this.props.slidesToScroll;
      } else {
        if ((0, _innerSliderUtils.canGoNext)(_objectSpread(_objectSpread({}, _this.props), _this.state))) {
          nextIndex = _this.state.currentSlide + _this.props.slidesToScroll;
        } else {
          return false;
        }
      }

      _this.slideHandler(nextIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "autoPlay", function (playType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }

      var autoplaying = _this.state.autoplaying;

      if (playType === "update") {
        if (autoplaying === "hovered" || autoplaying === "focused" || autoplaying === "paused") {
          return;
        }
      } else if (playType === "leave") {
        if (autoplaying === "paused" || autoplaying === "focused") {
          return;
        }
      } else if (playType === "blur") {
        if (autoplaying === "paused" || autoplaying === "hovered") {
          return;
        }
      }

      _this.autoplayTimer = setInterval(_this.play, _this.props.autoplaySpeed + 50);

      _this.setState({
        autoplaying: "playing"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function (pauseType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
        _this.autoplayTimer = null;
      }

      var autoplaying = _this.state.autoplaying;

      if (pauseType === "paused") {
        _this.setState({
          autoplaying: "paused"
        });
      } else if (pauseType === "focused") {
        if (autoplaying === "hovered" || autoplaying === "playing") {
          _this.setState({
            autoplaying: "focused"
          });
        }
      } else {
        // pauseType  is 'hovered'
        if (autoplaying === "playing") {
          _this.setState({
            autoplaying: "hovered"
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDotsOver", function () {
      return _this.props.autoplay && _this.pause("hovered");
    });

    _defineProperty(_assertThisInitialized(_this), "onDotsLeave", function () {
      return _this.props.autoplay && _this.state.autoplaying === "hovered" && _this.autoPlay("leave");
    });

    _defineProperty(_assertThisInitialized(_this), "onTrackOver", function () {
      return _this.props.autoplay && _this.pause("hovered");
    });

    _defineProperty(_assertThisInitialized(_this), "onTrackLeave", function () {
      return _this.props.autoplay && _this.state.autoplaying === "hovered" && _this.autoPlay("leave");
    });

    _defineProperty(_assertThisInitialized(_this), "onSlideFocus", function () {
      return _this.props.autoplay && _this.pause("focused");
    });

    _defineProperty(_assertThisInitialized(_this), "onSlideBlur", function () {
      return _this.props.autoplay && _this.state.autoplaying === "focused" && _this.autoPlay("blur");
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var className = (0, _classnames["default"])("slick-slider", _this.props.className, {
        "slick-vertical": _this.props.vertical,
        "slick-initialized": true
      });

      var spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      var trackProps = (0, _innerSliderUtils.extractObject)(spec, ["fade", "cssEase", "speed", "infinite", "centerMode", "focusOnSelect", "currentSlide", "lazyLoad", "lazyLoadedList", "rtl", "slideWidth", "slideHeight", "listHeight", "vertical", "slidesToShow", "slidesToScroll", "slideCount", "trackStyle", "variableWidth", "unslick", "centerPadding", "targetSlide", "useCSS"]);
      var pauseOnHover = _this.props.pauseOnHover;
      trackProps = _objectSpread(_objectSpread({}, trackProps), {}, {
        onMouseEnter: pauseOnHover ? _this.onTrackOver : null,
        onMouseLeave: pauseOnHover ? _this.onTrackLeave : null,
        onMouseOver: pauseOnHover ? _this.onTrackOver : null,
        focusOnSelect: _this.props.focusOnSelect && _this.clickable ? _this.selectHandler : null
      });
      var dots;

      if (_this.props.dots === true && _this.state.slideCount >= _this.props.slidesToShow) {
        var dotProps = (0, _innerSliderUtils.extractObject)(spec, ["dotsClass", "slideCount", "slidesToShow", "currentSlide", "slidesToScroll", "clickHandler", "children", "customPaging", "infinite", "appendDots"]);
        var pauseOnDotsHover = _this.props.pauseOnDotsHover;
        dotProps = _objectSpread(_objectSpread({}, dotProps), {}, {
          clickHandler: _this.changeSlide,
          onMouseEnter: pauseOnDotsHover ? _this.onDotsLeave : null,
          onMouseOver: pauseOnDotsHover ? _this.onDotsOver : null,
          onMouseLeave: pauseOnDotsHover ? _this.onDotsLeave : null
        });
        dots = /*#__PURE__*/_react["default"].createElement(_dots.Dots, dotProps);
      }

      var prevArrow, nextArrow;
      var arrowProps = (0, _innerSliderUtils.extractObject)(spec, ["infinite", "centerMode", "currentSlide", "slideCount", "slidesToShow", "prevArrow", "nextArrow"]);
      arrowProps.clickHandler = _this.changeSlide;

      if (_this.props.arrows) {
        prevArrow = /*#__PURE__*/_react["default"].createElement(_arrows.PrevArrow, arrowProps);
        nextArrow = /*#__PURE__*/_react["default"].createElement(_arrows.NextArrow, arrowProps);
      }

      var verticalHeightStyle = null;

      if (_this.props.vertical) {
        verticalHeightStyle = {
          height: _this.state.listHeight
        };
      }

      var centerPaddingStyle = null;

      if (_this.props.vertical === false) {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: "0px " + _this.props.centerPadding
          };
        }
      } else {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: _this.props.centerPadding + " 0px"
          };
        }
      }

      var listStyle = _objectSpread(_objectSpread({}, verticalHeightStyle), centerPaddingStyle);

      var touchMove = _this.props.touchMove;
      var listProps = {
        className: "slick-list",
        style: listStyle,
        onClick: _this.clickHandler,
        onMouseDown: touchMove ? _this.swipeStart : null,
        onMouseMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onMouseUp: touchMove ? _this.swipeEnd : null,
        onMouseLeave: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onTouchStart: touchMove ? _this.swipeStart : null,
        onTouchMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onTouchEnd: touchMove ? _this.touchEnd : null,
        onTouchCancel: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onKeyDown: _this.props.accessibility ? _this.keyHandler : null
      };
      var innerSliderProps = {
        className: className,
        dir: "ltr",
        style: _this.props.style
      };

      if (_this.props.unslick) {
        listProps = {
          className: "slick-list"
        };
        innerSliderProps = {
          className: className
        };
      }

      return /*#__PURE__*/_react["default"].createElement("div", innerSliderProps, !_this.props.unslick ? prevArrow : "", /*#__PURE__*/_react["default"].createElement("div", _extends({
        ref: _this.listRefHandler
      }, listProps), /*#__PURE__*/_react["default"].createElement(_track.Track, _extends({
        ref: _this.trackRefHandler
      }, trackProps), _this.props.children)), !_this.props.unslick ? nextArrow : "", !_this.props.unslick ? dots : "");
    });

    _this.list = null;
    _this.track = null;
    _this.state = _objectSpread(_objectSpread({}, _initialState["default"]), {}, {
      currentSlide: _this.props.initialSlide,
      slideCount: _react["default"].Children.count(_this.props.children)
    });
    _this.callbackTimers = [];
    _this.clickable = true;
    _this.debouncedResize = null;

    var ssrState = _this.ssrInit();

    _this.state = _objectSpread(_objectSpread({}, _this.state), ssrState);
    return _this;
  }

  _createClass(InnerSlider, [{
    key: "didPropsChange",
    value: function didPropsChange(prevProps) {
      var setTrackStyle = false;

      for (var _i3 = 0, _Object$keys = Object.keys(this.props); _i3 < _Object$keys.length; _i3++) {
        var key = _Object$keys[_i3];

        if (!prevProps.hasOwnProperty(key)) {
          setTrackStyle = true;
          break;
        }

        if (_typeof(prevProps[key]) === "object" || typeof prevProps[key] === "function") {
          continue;
        }

        if (prevProps[key] !== this.props[key]) {
          setTrackStyle = true;
          break;
        }
      }

      return setTrackStyle || _react["default"].Children.count(this.props.children) !== _react["default"].Children.count(prevProps.children);
    }
  }]);

  return InnerSlider;
}(_react["default"].Component);

exports.InnerSlider = InnerSlider;

/***/ }),

/***/ 5798:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(1051));

var _innerSlider = __webpack_require__(8517);

var _json2mq = _interopRequireDefault(__webpack_require__(973));

var _defaultProps = _interopRequireDefault(__webpack_require__(3492));

var _innerSliderUtils = __webpack_require__(5518);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var enquire = (0, _innerSliderUtils.canUseDOM)() && __webpack_require__(4974);

var Slider = /*#__PURE__*/function (_React$Component) {
  _inherits(Slider, _React$Component);

  var _super = _createSuper(Slider);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "innerSliderRefHandler", function (ref) {
      return _this.innerSlider = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "slickPrev", function () {
      return _this.innerSlider.slickPrev();
    });

    _defineProperty(_assertThisInitialized(_this), "slickNext", function () {
      return _this.innerSlider.slickNext();
    });

    _defineProperty(_assertThisInitialized(_this), "slickGoTo", function (slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return _this.innerSlider.slickGoTo(slide, dontAnimate);
    });

    _defineProperty(_assertThisInitialized(_this), "slickPause", function () {
      return _this.innerSlider.pause("paused");
    });

    _defineProperty(_assertThisInitialized(_this), "slickPlay", function () {
      return _this.innerSlider.autoPlay("play");
    });

    _this.state = {
      breakpoint: null
    };
    _this._responsiveMediaHandlers = [];
    return _this;
  }

  _createClass(Slider, [{
    key: "media",
    value: function media(query, handler) {
      // javascript handler for  css media query
      enquire.register(query, handler);

      this._responsiveMediaHandlers.push({
        query: query,
        handler: handler
      });
    } // handles responsive breakpoints

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // performance monitoring
      //if (process.env.NODE_ENV !== 'production') {
      //const { whyDidYouUpdate } = require('why-did-you-update')
      //whyDidYouUpdate(React)
      //}
      if (this.props.responsive) {
        var breakpoints = this.props.responsive.map(function (breakpt) {
          return breakpt.breakpoint;
        }); // sort them in increasing order of their numerical value

        breakpoints.sort(function (x, y) {
          return x - y;
        });
        breakpoints.forEach(function (breakpoint, index) {
          // media query for each breakpoint
          var bQuery;

          if (index === 0) {
            bQuery = (0, _json2mq["default"])({
              minWidth: 0,
              maxWidth: breakpoint
            });
          } else {
            bQuery = (0, _json2mq["default"])({
              minWidth: breakpoints[index - 1] + 1,
              maxWidth: breakpoint
            });
          } // when not using server side rendering


          (0, _innerSliderUtils.canUseDOM)() && _this2.media(bQuery, function () {
            _this2.setState({
              breakpoint: breakpoint
            });
          });
        }); // Register media query for full screen. Need to support resize from small to large
        // convert javascript object to media query string

        var query = (0, _json2mq["default"])({
          minWidth: breakpoints.slice(-1)[0]
        });
        (0, _innerSliderUtils.canUseDOM)() && this.media(query, function () {
          _this2.setState({
            breakpoint: null
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._responsiveMediaHandlers.forEach(function (obj) {
        enquire.unregister(obj.query, obj.handler);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var settings;
      var newProps;

      if (this.state.breakpoint) {
        newProps = this.props.responsive.filter(function (resp) {
          return resp.breakpoint === _this3.state.breakpoint;
        });
        settings = newProps[0].settings === "unslick" ? "unslick" : _objectSpread(_objectSpread(_objectSpread({}, _defaultProps["default"]), this.props), newProps[0].settings);
      } else {
        settings = _objectSpread(_objectSpread({}, _defaultProps["default"]), this.props);
      } // force scrolling by one if centerMode is on


      if (settings.centerMode) {
        if (settings.slidesToScroll > 1 && "production" !== "production") {}

        settings.slidesToScroll = 1;
      } // force showing one slide and scrolling by one if the fade mode is on


      if (settings.fade) {
        if (settings.slidesToShow > 1 && "production" !== "production") {}

        if (settings.slidesToScroll > 1 && "production" !== "production") {}

        settings.slidesToShow = 1;
        settings.slidesToScroll = 1;
      } // makes sure that children is an array, even when there is only 1 child


      var children = _react["default"].Children.toArray(this.props.children); // Children may contain false or null, so we should filter them
      // children may also contain string filled with spaces (in certain cases where we use jsx strings)


      children = children.filter(function (child) {
        if (typeof child === "string") {
          return !!child.trim();
        }

        return !!child;
      }); // rows and slidesPerRow logic is handled here

      if (settings.variableWidth && (settings.rows > 1 || settings.slidesPerRow > 1)) {
        console.warn("variableWidth is not supported in case of rows > 1 or slidesPerRow > 1");
        settings.variableWidth = false;
      }

      var newChildren = [];
      var currentWidth = null;

      for (var i = 0; i < children.length; i += settings.rows * settings.slidesPerRow) {
        var newSlide = [];

        for (var j = i; j < i + settings.rows * settings.slidesPerRow; j += settings.slidesPerRow) {
          var row = [];

          for (var k = j; k < j + settings.slidesPerRow; k += 1) {
            if (settings.variableWidth && children[k].props.style) {
              currentWidth = children[k].props.style.width;
            }

            if (k >= children.length) break;
            row.push( /*#__PURE__*/_react["default"].cloneElement(children[k], {
              key: 100 * i + 10 * j + k,
              tabIndex: -1,
              style: {
                width: "".concat(100 / settings.slidesPerRow, "%"),
                display: "inline-block"
              }
            }));
          }

          newSlide.push( /*#__PURE__*/_react["default"].createElement("div", {
            key: 10 * i + j
          }, row));
        }

        if (settings.variableWidth) {
          newChildren.push( /*#__PURE__*/_react["default"].createElement("div", {
            key: i,
            style: {
              width: currentWidth
            }
          }, newSlide));
        } else {
          newChildren.push( /*#__PURE__*/_react["default"].createElement("div", {
            key: i
          }, newSlide));
        }
      }

      if (settings === "unslick") {
        var className = "regular slider " + (this.props.className || "");
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: className
        }, children);
      } else if (newChildren.length <= settings.slidesToShow) {
        settings.unslick = true;
      }

      return /*#__PURE__*/_react["default"].createElement(_innerSlider.InnerSlider, _extends({
        style: this.props.style,
        ref: this.innerSliderRefHandler
      }, settings), newChildren);
    }
  }]);

  return Slider;
}(_react["default"].Component);

exports["default"] = Slider;

/***/ }),

/***/ 4740:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Track = void 0;

var _react = _interopRequireDefault(__webpack_require__(1051));

var _classnames = _interopRequireDefault(__webpack_require__(4184));

var _innerSliderUtils = __webpack_require__(5518);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// given specifications/props for a slide, fetch all the classes that need to be applied to the slide
var getSlideClasses = function getSlideClasses(spec) {
  var slickActive, slickCenter, slickCloned;
  var centerOffset, index;

  if (spec.rtl) {
    index = spec.slideCount - 1 - spec.index;
  } else {
    index = spec.index;
  }

  slickCloned = index < 0 || index >= spec.slideCount;

  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2);
    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;

    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
      slickActive = true;
    }
  } else {
    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
  }

  var focusedSlide;

  if (spec.targetSlide < 0) {
    focusedSlide = spec.targetSlide + spec.slideCount;
  } else if (spec.targetSlide >= spec.slideCount) {
    focusedSlide = spec.targetSlide - spec.slideCount;
  } else {
    focusedSlide = spec.targetSlide;
  }

  var slickCurrent = index === focusedSlide;
  return {
    "slick-slide": true,
    "slick-active": slickActive,
    "slick-center": slickCenter,
    "slick-cloned": slickCloned,
    "slick-current": slickCurrent // dubious in case of RTL

  };
};

var getSlideStyle = function getSlideStyle(spec) {
  var style = {};

  if (spec.variableWidth === undefined || spec.variableWidth === false) {
    style.width = spec.slideWidth;
  }

  if (spec.fade) {
    style.position = "relative";

    if (spec.vertical) {
      style.top = -spec.index * parseInt(spec.slideHeight);
    } else {
      style.left = -spec.index * parseInt(spec.slideWidth);
    }

    style.opacity = spec.currentSlide === spec.index ? 1 : 0;

    if (spec.useCSS) {
      style.transition = "opacity " + spec.speed + "ms " + spec.cssEase + ", " + "visibility " + spec.speed + "ms " + spec.cssEase;
    }
  }

  return style;
};

var getKey = function getKey(child, fallbackKey) {
  return child.key || fallbackKey;
};

var renderSlides = function renderSlides(spec) {
  var key;
  var slides = [];
  var preCloneSlides = [];
  var postCloneSlides = [];

  var childrenCount = _react["default"].Children.count(spec.children);

  var startIndex = (0, _innerSliderUtils.lazyStartIndex)(spec);
  var endIndex = (0, _innerSliderUtils.lazyEndIndex)(spec);

  _react["default"].Children.forEach(spec.children, function (elem, index) {
    var child;
    var childOnClickOptions = {
      message: "children",
      index: index,
      slidesToScroll: spec.slidesToScroll,
      currentSlide: spec.currentSlide
    }; // in case of lazyLoad, whether or not we want to fetch the slide

    if (!spec.lazyLoad || spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0) {
      child = elem;
    } else {
      child = /*#__PURE__*/_react["default"].createElement("div", null);
    }

    var childStyle = getSlideStyle(_objectSpread(_objectSpread({}, spec), {}, {
      index: index
    }));
    var slideClass = child.props.className || "";
    var slideClasses = getSlideClasses(_objectSpread(_objectSpread({}, spec), {}, {
      index: index
    })); // push a cloned element of the desired slide

    slides.push( /*#__PURE__*/_react["default"].cloneElement(child, {
      key: "original" + getKey(child, index),
      "data-index": index,
      className: (0, _classnames["default"])(slideClasses, slideClass),
      tabIndex: "-1",
      "aria-hidden": !slideClasses["slick-active"],
      style: _objectSpread(_objectSpread({
        outline: "none"
      }, child.props.style || {}), childStyle),
      onClick: function onClick(e) {
        child.props && child.props.onClick && child.props.onClick(e);

        if (spec.focusOnSelect) {
          spec.focusOnSelect(childOnClickOptions);
        }
      }
    })); // if slide needs to be precloned or postcloned

    if (spec.infinite && spec.fade === false) {
      var preCloneNo = childrenCount - index;

      if (preCloneNo <= (0, _innerSliderUtils.getPreClones)(spec) && childrenCount !== spec.slidesToShow) {
        key = -preCloneNo;

        if (key >= startIndex) {
          child = elem;
        }

        slideClasses = getSlideClasses(_objectSpread(_objectSpread({}, spec), {}, {
          index: key
        }));
        preCloneSlides.push( /*#__PURE__*/_react["default"].cloneElement(child, {
          key: "precloned" + getKey(child, key),
          "data-index": key,
          tabIndex: "-1",
          className: (0, _classnames["default"])(slideClasses, slideClass),
          "aria-hidden": !slideClasses["slick-active"],
          style: _objectSpread(_objectSpread({}, child.props.style || {}), childStyle),
          onClick: function onClick(e) {
            child.props && child.props.onClick && child.props.onClick(e);

            if (spec.focusOnSelect) {
              spec.focusOnSelect(childOnClickOptions);
            }
          }
        }));
      }

      if (childrenCount !== spec.slidesToShow) {
        key = childrenCount + index;

        if (key < endIndex) {
          child = elem;
        }

        slideClasses = getSlideClasses(_objectSpread(_objectSpread({}, spec), {}, {
          index: key
        }));
        postCloneSlides.push( /*#__PURE__*/_react["default"].cloneElement(child, {
          key: "postcloned" + getKey(child, key),
          "data-index": key,
          tabIndex: "-1",
          className: (0, _classnames["default"])(slideClasses, slideClass),
          "aria-hidden": !slideClasses["slick-active"],
          style: _objectSpread(_objectSpread({}, child.props.style || {}), childStyle),
          onClick: function onClick(e) {
            child.props && child.props.onClick && child.props.onClick(e);

            if (spec.focusOnSelect) {
              spec.focusOnSelect(childOnClickOptions);
            }
          }
        }));
      }
    }
  });

  if (spec.rtl) {
    return preCloneSlides.concat(slides, postCloneSlides).reverse();
  } else {
    return preCloneSlides.concat(slides, postCloneSlides);
  }
};

var Track = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Track, _React$PureComponent);

  var _super = _createSuper(Track);

  function Track() {
    var _this;

    _classCallCheck(this, Track);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "node", null);

    _defineProperty(_assertThisInitialized(_this), "handleRef", function (ref) {
      _this.node = ref;
    });

    return _this;
  }

  _createClass(Track, [{
    key: "render",
    value: function render() {
      var slides = renderSlides(this.props);
      var _this$props = this.props,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseOver = _this$props.onMouseOver,
          onMouseLeave = _this$props.onMouseLeave;
      var mouseEvents = {
        onMouseEnter: onMouseEnter,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave
      };
      return /*#__PURE__*/_react["default"].createElement("div", _extends({
        ref: this.handleRef,
        className: "slick-track",
        style: this.props.trackStyle
      }, mouseEvents), slides);
    }
  }]);

  return Track;
}(_react["default"].PureComponent);

exports.Track = Track;

/***/ }),

/***/ 5518:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clamp = clamp;
exports.canUseDOM = exports.slidesOnLeft = exports.slidesOnRight = exports.siblingDirection = exports.getTotalSlides = exports.getPostClones = exports.getPreClones = exports.getTrackLeft = exports.getTrackAnimateCSS = exports.getTrackCSS = exports.checkSpecKeys = exports.getSlideCount = exports.checkNavigable = exports.getNavigableIndexes = exports.swipeEnd = exports.swipeMove = exports.swipeStart = exports.keyHandler = exports.changeSlide = exports.slideHandler = exports.initializedState = exports.extractObject = exports.canGoNext = exports.getSwipeDirection = exports.getHeight = exports.getWidth = exports.lazySlidesOnRight = exports.lazySlidesOnLeft = exports.lazyEndIndex = exports.lazyStartIndex = exports.getRequiredLazySlides = exports.getOnDemandLazySlides = exports.safePreventDefault = void 0;

var _react = _interopRequireDefault(__webpack_require__(1051));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function clamp(number, lowerBound, upperBound) {
  return Math.max(lowerBound, Math.min(number, upperBound));
}

var safePreventDefault = function safePreventDefault(event) {
  var passiveEvents = ["onTouchStart", "onTouchMove", "onWheel"];

  if (!passiveEvents.includes(event._reactName)) {
    event.preventDefault();
  }
};

exports.safePreventDefault = safePreventDefault;

var getOnDemandLazySlides = function getOnDemandLazySlides(spec) {
  var onDemandSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);

  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    if (spec.lazyLoadedList.indexOf(slideIndex) < 0) {
      onDemandSlides.push(slideIndex);
    }
  }

  return onDemandSlides;
}; // return list of slides that need to be present


exports.getOnDemandLazySlides = getOnDemandLazySlides;

var getRequiredLazySlides = function getRequiredLazySlides(spec) {
  var requiredSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);

  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    requiredSlides.push(slideIndex);
  }

  return requiredSlides;
}; // startIndex that needs to be present


exports.getRequiredLazySlides = getRequiredLazySlides;

var lazyStartIndex = function lazyStartIndex(spec) {
  return spec.currentSlide - lazySlidesOnLeft(spec);
};

exports.lazyStartIndex = lazyStartIndex;

var lazyEndIndex = function lazyEndIndex(spec) {
  return spec.currentSlide + lazySlidesOnRight(spec);
};

exports.lazyEndIndex = lazyEndIndex;

var lazySlidesOnLeft = function lazySlidesOnLeft(spec) {
  return spec.centerMode ? Math.floor(spec.slidesToShow / 2) + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : 0;
};

exports.lazySlidesOnLeft = lazySlidesOnLeft;

var lazySlidesOnRight = function lazySlidesOnRight(spec) {
  return spec.centerMode ? Math.floor((spec.slidesToShow - 1) / 2) + 1 + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : spec.slidesToShow;
}; // get width of an element


exports.lazySlidesOnRight = lazySlidesOnRight;

var getWidth = function getWidth(elem) {
  return elem && elem.offsetWidth || 0;
};

exports.getWidth = getWidth;

var getHeight = function getHeight(elem) {
  return elem && elem.offsetHeight || 0;
};

exports.getHeight = getHeight;

var getSwipeDirection = function getSwipeDirection(touchObject) {
  var verticalSwiping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var xDist, yDist, r, swipeAngle;
  xDist = touchObject.startX - touchObject.curX;
  yDist = touchObject.startY - touchObject.curY;
  r = Math.atan2(yDist, xDist);
  swipeAngle = Math.round(r * 180 / Math.PI);

  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle);
  }

  if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
    return "left";
  }

  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return "right";
  }

  if (verticalSwiping === true) {
    if (swipeAngle >= 35 && swipeAngle <= 135) {
      return "up";
    } else {
      return "down";
    }
  }

  return "vertical";
}; // whether or not we can go next


exports.getSwipeDirection = getSwipeDirection;

var canGoNext = function canGoNext(spec) {
  var canGo = true;

  if (!spec.infinite) {
    if (spec.centerMode && spec.currentSlide >= spec.slideCount - 1) {
      canGo = false;
    } else if (spec.slideCount <= spec.slidesToShow || spec.currentSlide >= spec.slideCount - spec.slidesToShow) {
      canGo = false;
    }
  }

  return canGo;
}; // given an object and a list of keys, return new object with given keys


exports.canGoNext = canGoNext;

var extractObject = function extractObject(spec, keys) {
  var newObject = {};
  keys.forEach(function (key) {
    return newObject[key] = spec[key];
  });
  return newObject;
}; // get initialized state


exports.extractObject = extractObject;

var initializedState = function initializedState(spec) {
  // spec also contains listRef, trackRef
  var slideCount = _react["default"].Children.count(spec.children);

  var listNode = spec.listRef;
  var listWidth = Math.ceil(getWidth(listNode));
  var trackNode = spec.trackRef && spec.trackRef.node;
  var trackWidth = Math.ceil(getWidth(trackNode));
  var slideWidth;

  if (!spec.vertical) {
    var centerPaddingAdj = spec.centerMode && parseInt(spec.centerPadding) * 2;

    if (typeof spec.centerPadding === "string" && spec.centerPadding.slice(-1) === "%") {
      centerPaddingAdj *= listWidth / 100;
    }

    slideWidth = Math.ceil((listWidth - centerPaddingAdj) / spec.slidesToShow);
  } else {
    slideWidth = listWidth;
  }

  var slideHeight = listNode && getHeight(listNode.querySelector('[data-index="0"]'));
  var listHeight = slideHeight * spec.slidesToShow;
  var currentSlide = spec.currentSlide === undefined ? spec.initialSlide : spec.currentSlide;

  if (spec.rtl && spec.currentSlide === undefined) {
    currentSlide = slideCount - 1 - spec.initialSlide;
  }

  var lazyLoadedList = spec.lazyLoadedList || [];
  var slidesToLoad = getOnDemandLazySlides(_objectSpread(_objectSpread({}, spec), {}, {
    currentSlide: currentSlide,
    lazyLoadedList: lazyLoadedList
  }));
  lazyLoadedList = lazyLoadedList.concat(slidesToLoad);
  var state = {
    slideCount: slideCount,
    slideWidth: slideWidth,
    listWidth: listWidth,
    trackWidth: trackWidth,
    currentSlide: currentSlide,
    slideHeight: slideHeight,
    listHeight: listHeight,
    lazyLoadedList: lazyLoadedList
  };

  if (spec.autoplaying === null && spec.autoplay) {
    state["autoplaying"] = "playing";
  }

  return state;
};

exports.initializedState = initializedState;

var slideHandler = function slideHandler(spec) {
  var waitForAnimate = spec.waitForAnimate,
      animating = spec.animating,
      fade = spec.fade,
      infinite = spec.infinite,
      index = spec.index,
      slideCount = spec.slideCount,
      lazyLoad = spec.lazyLoad,
      currentSlide = spec.currentSlide,
      centerMode = spec.centerMode,
      slidesToScroll = spec.slidesToScroll,
      slidesToShow = spec.slidesToShow,
      useCSS = spec.useCSS;
  var lazyLoadedList = spec.lazyLoadedList;
  if (waitForAnimate && animating) return {};
  var animationSlide = index,
      finalSlide,
      animationLeft,
      finalLeft;
  var state = {},
      nextState = {};
  var targetSlide = infinite ? index : clamp(index, 0, slideCount - 1);

  if (fade) {
    if (!infinite && (index < 0 || index >= slideCount)) return {};

    if (index < 0) {
      animationSlide = index + slideCount;
    } else if (index >= slideCount) {
      animationSlide = index - slideCount;
    }

    if (lazyLoad && lazyLoadedList.indexOf(animationSlide) < 0) {
      lazyLoadedList = lazyLoadedList.concat(animationSlide);
    }

    state = {
      animating: true,
      currentSlide: animationSlide,
      lazyLoadedList: lazyLoadedList,
      targetSlide: animationSlide
    };
    nextState = {
      animating: false,
      targetSlide: animationSlide
    };
  } else {
    finalSlide = animationSlide;

    if (animationSlide < 0) {
      finalSlide = animationSlide + slideCount;
      if (!infinite) finalSlide = 0;else if (slideCount % slidesToScroll !== 0) finalSlide = slideCount - slideCount % slidesToScroll;
    } else if (!canGoNext(spec) && animationSlide > currentSlide) {
      animationSlide = finalSlide = currentSlide;
    } else if (centerMode && animationSlide >= slideCount) {
      animationSlide = infinite ? slideCount : slideCount - 1;
      finalSlide = infinite ? 0 : slideCount - 1;
    } else if (animationSlide >= slideCount) {
      finalSlide = animationSlide - slideCount;
      if (!infinite) finalSlide = slideCount - slidesToShow;else if (slideCount % slidesToScroll !== 0) finalSlide = 0;
    }

    if (!infinite && animationSlide + slidesToShow >= slideCount) {
      finalSlide = slideCount - slidesToShow;
    }

    animationLeft = getTrackLeft(_objectSpread(_objectSpread({}, spec), {}, {
      slideIndex: animationSlide
    }));
    finalLeft = getTrackLeft(_objectSpread(_objectSpread({}, spec), {}, {
      slideIndex: finalSlide
    }));

    if (!infinite) {
      if (animationLeft === finalLeft) animationSlide = finalSlide;
      animationLeft = finalLeft;
    }

    if (lazyLoad) {
      lazyLoadedList = lazyLoadedList.concat(getOnDemandLazySlides(_objectSpread(_objectSpread({}, spec), {}, {
        currentSlide: animationSlide
      })));
    }

    if (!useCSS) {
      state = {
        currentSlide: finalSlide,
        trackStyle: getTrackCSS(_objectSpread(_objectSpread({}, spec), {}, {
          left: finalLeft
        })),
        lazyLoadedList: lazyLoadedList,
        targetSlide: targetSlide
      };
    } else {
      state = {
        animating: true,
        currentSlide: finalSlide,
        trackStyle: getTrackAnimateCSS(_objectSpread(_objectSpread({}, spec), {}, {
          left: animationLeft
        })),
        lazyLoadedList: lazyLoadedList,
        targetSlide: targetSlide
      };
      nextState = {
        animating: false,
        currentSlide: finalSlide,
        trackStyle: getTrackCSS(_objectSpread(_objectSpread({}, spec), {}, {
          left: finalLeft
        })),
        swipeLeft: null,
        targetSlide: targetSlide
      };
    }
  }

  return {
    state: state,
    nextState: nextState
  };
};

exports.slideHandler = slideHandler;

var changeSlide = function changeSlide(spec, options) {
  var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
  var slidesToScroll = spec.slidesToScroll,
      slidesToShow = spec.slidesToShow,
      slideCount = spec.slideCount,
      currentSlide = spec.currentSlide,
      previousTargetSlide = spec.targetSlide,
      lazyLoad = spec.lazyLoad,
      infinite = spec.infinite;
  unevenOffset = slideCount % slidesToScroll !== 0;
  indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;

  if (options.message === "previous") {
    slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
    targetSlide = currentSlide - slideOffset;

    if (lazyLoad && !infinite) {
      previousInt = currentSlide - slideOffset;
      targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
    }

    if (!infinite) {
      targetSlide = previousTargetSlide - slidesToScroll;
    }
  } else if (options.message === "next") {
    slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
    targetSlide = currentSlide + slideOffset;

    if (lazyLoad && !infinite) {
      targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
    }

    if (!infinite) {
      targetSlide = previousTargetSlide + slidesToScroll;
    }
  } else if (options.message === "dots") {
    // Click on dots
    targetSlide = options.index * options.slidesToScroll;
  } else if (options.message === "children") {
    // Click on the slides
    targetSlide = options.index;

    if (infinite) {
      var direction = siblingDirection(_objectSpread(_objectSpread({}, spec), {}, {
        targetSlide: targetSlide
      }));

      if (targetSlide > options.currentSlide && direction === "left") {
        targetSlide = targetSlide - slideCount;
      } else if (targetSlide < options.currentSlide && direction === "right") {
        targetSlide = targetSlide + slideCount;
      }
    }
  } else if (options.message === "index") {
    targetSlide = Number(options.index);
  }

  return targetSlide;
};

exports.changeSlide = changeSlide;

var keyHandler = function keyHandler(e, accessibility, rtl) {
  if (e.target.tagName.match("TEXTAREA|INPUT|SELECT") || !accessibility) return "";
  if (e.keyCode === 37) return rtl ? "next" : "previous";
  if (e.keyCode === 39) return rtl ? "previous" : "next";
  return "";
};

exports.keyHandler = keyHandler;

var swipeStart = function swipeStart(e, swipe, draggable) {
  e.target.tagName === "IMG" && safePreventDefault(e);
  if (!swipe || !draggable && e.type.indexOf("mouse") !== -1) return "";
  return {
    dragging: true,
    touchObject: {
      startX: e.touches ? e.touches[0].pageX : e.clientX,
      startY: e.touches ? e.touches[0].pageY : e.clientY,
      curX: e.touches ? e.touches[0].pageX : e.clientX,
      curY: e.touches ? e.touches[0].pageY : e.clientY
    }
  };
};

exports.swipeStart = swipeStart;

var swipeMove = function swipeMove(e, spec) {
  // spec also contains, trackRef and slideIndex
  var scrolling = spec.scrolling,
      animating = spec.animating,
      vertical = spec.vertical,
      swipeToSlide = spec.swipeToSlide,
      verticalSwiping = spec.verticalSwiping,
      rtl = spec.rtl,
      currentSlide = spec.currentSlide,
      edgeFriction = spec.edgeFriction,
      edgeDragged = spec.edgeDragged,
      onEdge = spec.onEdge,
      swiped = spec.swiped,
      swiping = spec.swiping,
      slideCount = spec.slideCount,
      slidesToScroll = spec.slidesToScroll,
      infinite = spec.infinite,
      touchObject = spec.touchObject,
      swipeEvent = spec.swipeEvent,
      listHeight = spec.listHeight,
      listWidth = spec.listWidth;
  if (scrolling) return;
  if (animating) return safePreventDefault(e);
  if (vertical && swipeToSlide && verticalSwiping) safePreventDefault(e);
  var swipeLeft,
      state = {};
  var curLeft = getTrackLeft(spec);
  touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
  touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
  touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
  var verticalSwipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)));

  if (!verticalSwiping && !swiping && verticalSwipeLength > 10) {
    return {
      scrolling: true
    };
  }

  if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength;
  var positionOffset = (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
  if (verticalSwiping) positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
  var dotCount = Math.ceil(slideCount / slidesToScroll);
  var swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping);
  var touchSwipeLength = touchObject.swipeLength;

  if (!infinite) {
    if (currentSlide === 0 && (swipeDirection === "right" || swipeDirection === "down") || currentSlide + 1 >= dotCount && (swipeDirection === "left" || swipeDirection === "up") || !canGoNext(spec) && (swipeDirection === "left" || swipeDirection === "up")) {
      touchSwipeLength = touchObject.swipeLength * edgeFriction;

      if (edgeDragged === false && onEdge) {
        onEdge(swipeDirection);
        state["edgeDragged"] = true;
      }
    }
  }

  if (!swiped && swipeEvent) {
    swipeEvent(swipeDirection);
    state["swiped"] = true;
  }

  if (!vertical) {
    if (!rtl) {
      swipeLeft = curLeft + touchSwipeLength * positionOffset;
    } else {
      swipeLeft = curLeft - touchSwipeLength * positionOffset;
    }
  } else {
    swipeLeft = curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset;
  }

  if (verticalSwiping) {
    swipeLeft = curLeft + touchSwipeLength * positionOffset;
  }

  state = _objectSpread(_objectSpread({}, state), {}, {
    touchObject: touchObject,
    swipeLeft: swipeLeft,
    trackStyle: getTrackCSS(_objectSpread(_objectSpread({}, spec), {}, {
      left: swipeLeft
    }))
  });

  if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
    return state;
  }

  if (touchObject.swipeLength > 10) {
    state["swiping"] = true;
    safePreventDefault(e);
  }

  return state;
};

exports.swipeMove = swipeMove;

var swipeEnd = function swipeEnd(e, spec) {
  var dragging = spec.dragging,
      swipe = spec.swipe,
      touchObject = spec.touchObject,
      listWidth = spec.listWidth,
      touchThreshold = spec.touchThreshold,
      verticalSwiping = spec.verticalSwiping,
      listHeight = spec.listHeight,
      swipeToSlide = spec.swipeToSlide,
      scrolling = spec.scrolling,
      onSwipe = spec.onSwipe,
      targetSlide = spec.targetSlide,
      currentSlide = spec.currentSlide,
      infinite = spec.infinite;

  if (!dragging) {
    if (swipe) safePreventDefault(e);
    return {};
  }

  var minSwipe = verticalSwiping ? listHeight / touchThreshold : listWidth / touchThreshold;
  var swipeDirection = getSwipeDirection(touchObject, verticalSwiping); // reset the state of touch related state variables.

  var state = {
    dragging: false,
    edgeDragged: false,
    scrolling: false,
    swiping: false,
    swiped: false,
    swipeLeft: null,
    touchObject: {}
  };

  if (scrolling) {
    return state;
  }

  if (!touchObject.swipeLength) {
    return state;
  }

  if (touchObject.swipeLength > minSwipe) {
    safePreventDefault(e);

    if (onSwipe) {
      onSwipe(swipeDirection);
    }

    var slideCount, newSlide;
    var activeSlide = infinite ? currentSlide : targetSlide;

    switch (swipeDirection) {
      case "left":
      case "up":
        newSlide = activeSlide + getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 0;
        break;

      case "right":
      case "down":
        newSlide = activeSlide - getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 1;
        break;

      default:
        slideCount = activeSlide;
    }

    state["triggerSlideHandler"] = slideCount;
  } else {
    // Adjust the track back to it's original position.
    var currentLeft = getTrackLeft(spec);
    state["trackStyle"] = getTrackAnimateCSS(_objectSpread(_objectSpread({}, spec), {}, {
      left: currentLeft
    }));
  }

  return state;
};

exports.swipeEnd = swipeEnd;

var getNavigableIndexes = function getNavigableIndexes(spec) {
  var max = spec.infinite ? spec.slideCount * 2 : spec.slideCount;
  var breakpoint = spec.infinite ? spec.slidesToShow * -1 : 0;
  var counter = spec.infinite ? spec.slidesToShow * -1 : 0;
  var indexes = [];

  while (breakpoint < max) {
    indexes.push(breakpoint);
    breakpoint = counter + spec.slidesToScroll;
    counter += Math.min(spec.slidesToScroll, spec.slidesToShow);
  }

  return indexes;
};

exports.getNavigableIndexes = getNavigableIndexes;

var checkNavigable = function checkNavigable(spec, index) {
  var navigables = getNavigableIndexes(spec);
  var prevNavigable = 0;

  if (index > navigables[navigables.length - 1]) {
    index = navigables[navigables.length - 1];
  } else {
    for (var n in navigables) {
      if (index < navigables[n]) {
        index = prevNavigable;
        break;
      }

      prevNavigable = navigables[n];
    }
  }

  return index;
};

exports.checkNavigable = checkNavigable;

var getSlideCount = function getSlideCount(spec) {
  var centerOffset = spec.centerMode ? spec.slideWidth * Math.floor(spec.slidesToShow / 2) : 0;

  if (spec.swipeToSlide) {
    var swipedSlide;
    var slickList = spec.listRef;
    var slides = slickList.querySelectorAll && slickList.querySelectorAll(".slick-slide") || [];
    Array.from(slides).every(function (slide) {
      if (!spec.vertical) {
        if (slide.offsetLeft - centerOffset + getWidth(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      } else {
        if (slide.offsetTop + getHeight(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      }

      return true;
    });

    if (!swipedSlide) {
      return 0;
    }

    var currentIndex = spec.rtl === true ? spec.slideCount - spec.currentSlide : spec.currentSlide;
    var slidesTraversed = Math.abs(swipedSlide.dataset.index - currentIndex) || 1;
    return slidesTraversed;
  } else {
    return spec.slidesToScroll;
  }
};

exports.getSlideCount = getSlideCount;

var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
  return keysArray.reduce(function (value, key) {
    return value && spec.hasOwnProperty(key);
  }, true) ? null : console.error("Keys Missing:", spec);
};

exports.checkSpecKeys = checkSpecKeys;

var getTrackCSS = function getTrackCSS(spec) {
  checkSpecKeys(spec, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth"]);
  var trackWidth, trackHeight;
  var trackChildren = spec.slideCount + 2 * spec.slidesToShow;

  if (!spec.vertical) {
    trackWidth = getTotalSlides(spec) * spec.slideWidth;
  } else {
    trackHeight = trackChildren * spec.slideHeight;
  }

  var style = {
    opacity: 1,
    transition: "",
    WebkitTransition: ""
  };

  if (spec.useTransform) {
    var WebkitTransform = !spec.vertical ? "translate3d(" + spec.left + "px, 0px, 0px)" : "translate3d(0px, " + spec.left + "px, 0px)";
    var transform = !spec.vertical ? "translate3d(" + spec.left + "px, 0px, 0px)" : "translate3d(0px, " + spec.left + "px, 0px)";
    var msTransform = !spec.vertical ? "translateX(" + spec.left + "px)" : "translateY(" + spec.left + "px)";
    style = _objectSpread(_objectSpread({}, style), {}, {
      WebkitTransform: WebkitTransform,
      transform: transform,
      msTransform: msTransform
    });
  } else {
    if (spec.vertical) {
      style["top"] = spec.left;
    } else {
      style["left"] = spec.left;
    }
  }

  if (spec.fade) style = {
    opacity: 1
  };
  if (trackWidth) style.width = trackWidth;
  if (trackHeight) style.height = trackHeight; // Fallback for IE8

  if (window && !window.addEventListener && window.attachEvent) {
    if (!spec.vertical) {
      style.marginLeft = spec.left + "px";
    } else {
      style.marginTop = spec.left + "px";
    }
  }

  return style;
};

exports.getTrackCSS = getTrackCSS;

var getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
  checkSpecKeys(spec, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth", "speed", "cssEase"]);
  var style = getTrackCSS(spec); // useCSS is true by default so it can be undefined

  if (spec.useTransform) {
    style.WebkitTransition = "-webkit-transform " + spec.speed + "ms " + spec.cssEase;
    style.transition = "transform " + spec.speed + "ms " + spec.cssEase;
  } else {
    if (spec.vertical) {
      style.transition = "top " + spec.speed + "ms " + spec.cssEase;
    } else {
      style.transition = "left " + spec.speed + "ms " + spec.cssEase;
    }
  }

  return style;
};

exports.getTrackAnimateCSS = getTrackAnimateCSS;

var getTrackLeft = function getTrackLeft(spec) {
  if (spec.unslick) {
    return 0;
  }

  checkSpecKeys(spec, ["slideIndex", "trackRef", "infinite", "centerMode", "slideCount", "slidesToShow", "slidesToScroll", "slideWidth", "listWidth", "variableWidth", "slideHeight"]);
  var slideIndex = spec.slideIndex,
      trackRef = spec.trackRef,
      infinite = spec.infinite,
      centerMode = spec.centerMode,
      slideCount = spec.slideCount,
      slidesToShow = spec.slidesToShow,
      slidesToScroll = spec.slidesToScroll,
      slideWidth = spec.slideWidth,
      listWidth = spec.listWidth,
      variableWidth = spec.variableWidth,
      slideHeight = spec.slideHeight,
      fade = spec.fade,
      vertical = spec.vertical;
  var slideOffset = 0;
  var targetLeft;
  var targetSlide;
  var verticalOffset = 0;

  if (fade || spec.slideCount === 1) {
    return 0;
  }

  var slidesToOffset = 0;

  if (infinite) {
    slidesToOffset = -getPreClones(spec); // bring active slide to the beginning of visual area
    // if next scroll doesn't have enough children, just reach till the end of original slides instead of shifting slidesToScroll children

    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = -(slideIndex > slideCount ? slidesToShow - (slideIndex - slideCount) : slideCount % slidesToScroll);
    } // shift current slide to center of the frame


    if (centerMode) {
      slidesToOffset += parseInt(slidesToShow / 2);
    }
  } else {
    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = slidesToShow - slideCount % slidesToScroll;
    }

    if (centerMode) {
      slidesToOffset = parseInt(slidesToShow / 2);
    }
  }

  slideOffset = slidesToOffset * slideWidth;
  verticalOffset = slidesToOffset * slideHeight;

  if (!vertical) {
    targetLeft = slideIndex * slideWidth * -1 + slideOffset;
  } else {
    targetLeft = slideIndex * slideHeight * -1 + verticalOffset;
  }

  if (variableWidth === true) {
    var targetSlideIndex;
    var trackElem = trackRef && trackRef.node;
    targetSlideIndex = slideIndex + getPreClones(spec);
    targetSlide = trackElem && trackElem.childNodes[targetSlideIndex];
    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;

    if (centerMode === true) {
      targetSlideIndex = infinite ? slideIndex + getPreClones(spec) : slideIndex;
      targetSlide = trackElem && trackElem.children[targetSlideIndex];
      targetLeft = 0;

      for (var slide = 0; slide < targetSlideIndex; slide++) {
        targetLeft -= trackElem && trackElem.children[slide] && trackElem.children[slide].offsetWidth;
      }

      targetLeft -= parseInt(spec.centerPadding);
      targetLeft += targetSlide && (listWidth - targetSlide.offsetWidth) / 2;
    }
  }

  return targetLeft;
};

exports.getTrackLeft = getTrackLeft;

var getPreClones = function getPreClones(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }

  if (spec.variableWidth) {
    return spec.slideCount;
  }

  return spec.slidesToShow + (spec.centerMode ? 1 : 0);
};

exports.getPreClones = getPreClones;

var getPostClones = function getPostClones(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }

  return spec.slideCount;
};

exports.getPostClones = getPostClones;

var getTotalSlides = function getTotalSlides(spec) {
  return spec.slideCount === 1 ? 1 : getPreClones(spec) + spec.slideCount + getPostClones(spec);
};

exports.getTotalSlides = getTotalSlides;

var siblingDirection = function siblingDirection(spec) {
  if (spec.targetSlide > spec.currentSlide) {
    if (spec.targetSlide > spec.currentSlide + slidesOnRight(spec)) {
      return "left";
    }

    return "right";
  } else {
    if (spec.targetSlide < spec.currentSlide - slidesOnLeft(spec)) {
      return "right";
    }

    return "left";
  }
};

exports.siblingDirection = siblingDirection;

var slidesOnRight = function slidesOnRight(_ref) {
  var slidesToShow = _ref.slidesToShow,
      centerMode = _ref.centerMode,
      rtl = _ref.rtl,
      centerPadding = _ref.centerPadding;

  // returns no of slides on the right of active slide
  if (centerMode) {
    var right = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) right += 1;
    if (rtl && slidesToShow % 2 === 0) right += 1;
    return right;
  }

  if (rtl) {
    return 0;
  }

  return slidesToShow - 1;
};

exports.slidesOnRight = slidesOnRight;

var slidesOnLeft = function slidesOnLeft(_ref2) {
  var slidesToShow = _ref2.slidesToShow,
      centerMode = _ref2.centerMode,
      rtl = _ref2.rtl,
      centerPadding = _ref2.centerPadding;

  // returns no of slides on the left of active slide
  if (centerMode) {
    var left = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) left += 1;
    if (!rtl && slidesToShow % 2 === 0) left += 1;
    return left;
  }

  if (rtl) {
    return slidesToShow - 1;
  }

  return 0;
};

exports.slidesOnLeft = slidesOnLeft;

var canUseDOM = function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
};

exports.canUseDOM = canUseDOM;

/***/ }),

/***/ 1033:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);


/***/ }),

/***/ 1169:
/***/ ((module) => {

var camel2hyphen = function (str) {
  return str
          .replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
          })
          .toLowerCase();
};

module.exports = camel2hyphen;

/***/ }),

/***/ 1476:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var style_to_object_1 = __importDefault(__webpack_require__(7848));
var utilities_1 = __webpack_require__(6678);
function StyleToJS(style, options) {
    var output = {};
    if (!style || typeof style !== 'string') {
        return output;
    }
    style_to_object_1["default"](style, function (property, value) {
        if (property && value) {
            output[utilities_1.camelCase(property, options)] = value;
        }
    });
    return output;
}
exports["default"] = StyleToJS;


/***/ }),

/***/ 6678:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.camelCase = void 0;
var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9-]+$/;
var HYPHEN_REGEX = /-([a-z])/g;
var NO_HYPHEN_REGEX = /^[^-]+$/;
var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
var skipCamelCase = function (property) {
    return !property ||
        NO_HYPHEN_REGEX.test(property) ||
        CUSTOM_PROPERTY_REGEX.test(property);
};
var capitalize = function (match, character) {
    return character.toUpperCase();
};
var trimHyphen = function (match, prefix) { return prefix + "-"; };
var camelCase = function (property, options) {
    if (options === void 0) { options = {}; }
    if (skipCamelCase(property)) {
        return property;
    }
    property = property.toLowerCase();
    if (!options.reactCompat) {
        property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
    }
    return property.replace(HYPHEN_REGEX, capitalize);
};
exports.camelCase = camelCase;


/***/ }),

/***/ 7848:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(8139);

/**
 * Parses inline style to object.
 *
 * @example
 * // returns { 'line-height': '42' }
 * StyleToObject('line-height: 42;');
 *
 * @param  {String}      style      - The inline style.
 * @param  {Function}    [iterator] - The iterator function.
 * @return {null|Object}
 */
function StyleToObject(style, iterator) {
  var output = null;
  if (!style || typeof style !== 'string') {
    return output;
  }

  var declaration;
  var declarations = parse(style);
  var hasIterator = typeof iterator === 'function';
  var property;
  var value;

  for (var i = 0, len = declarations.length; i < len; i++) {
    declaration = declarations[i];
    property = declaration.property;
    value = declaration.value;

    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }

  return output;
}

module.exports = StyleToObject;


/***/ }),

/***/ 5935:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports domToReact, htmlToDOM, attributesToProps, Element */
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(488);


var domToReact = _index_js__WEBPACK_IMPORTED_MODULE_0__.domToReact;
var htmlToDOM = _index_js__WEBPACK_IMPORTED_MODULE_0__.htmlToDOM;
var attributesToProps = _index_js__WEBPACK_IMPORTED_MODULE_0__.attributesToProps;
var Element = _index_js__WEBPACK_IMPORTED_MODULE_0__.Element;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_index_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ 5544:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/a3ade4ad7301f9f2d9f4e9f550c6fddb/80b7f/logo_mapfre.png","srcSet":"/static/a3ade4ad7301f9f2d9f4e9f550c6fddb/ebdef/logo_mapfre.png 21w,\\n/static/a3ade4ad7301f9f2d9f4e9f550c6fddb/0f5d2/logo_mapfre.png 43w,\\n/static/a3ade4ad7301f9f2d9f4e9f550c6fddb/80b7f/logo_mapfre.png 85w","sizes":"(min-width: 85px) 85px, 100vw"},"sources":[{"srcSet":"/static/a3ade4ad7301f9f2d9f4e9f550c6fddb/ce39a/logo_mapfre.webp 21w,\\n/static/a3ade4ad7301f9f2d9f4e9f550c6fddb/f5a82/logo_mapfre.webp 43w,\\n/static/a3ade4ad7301f9f2d9f4e9f550c6fddb/253d9/logo_mapfre.webp 85w","type":"image/webp","sizes":"(min-width: 85px) 85px, 100vw"}]},"width":85,"height":48}');

/***/ }),

/***/ 3651:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/4daafc52822f980e9849581e2a749644/19aa6/logo_omint.png","srcSet":"/static/4daafc52822f980e9849581e2a749644/9dd24/logo_omint.png 22w,\\n/static/4daafc52822f980e9849581e2a749644/e987f/logo_omint.png 44w,\\n/static/4daafc52822f980e9849581e2a749644/19aa6/logo_omint.png 87w","sizes":"(min-width: 87px) 87px, 100vw"},"sources":[{"srcSet":"/static/4daafc52822f980e9849581e2a749644/e223a/logo_omint.webp 22w,\\n/static/4daafc52822f980e9849581e2a749644/5e57f/logo_omint.webp 44w,\\n/static/4daafc52822f980e9849581e2a749644/72dc0/logo_omint.webp 87w","type":"image/webp","sizes":"(min-width: 87px) 87px, 100vw"}]},"width":87,"height":41.99999999999999}');

/***/ }),

/***/ 5331:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/6405da5241643a39622b7569e3ba39f5/ca41a/logo_press_1x.png","srcSet":"/static/6405da5241643a39622b7569e3ba39f5/c00c5/logo_press_1x.png 41w,\\n/static/6405da5241643a39622b7569e3ba39f5/13bec/logo_press_1x.png 82w,\\n/static/6405da5241643a39622b7569e3ba39f5/ca41a/logo_press_1x.png 164w","sizes":"(min-width: 164px) 164px, 100vw"},"sources":[{"srcSet":"/static/6405da5241643a39622b7569e3ba39f5/9d0fa/logo_press_1x.webp 41w,\\n/static/6405da5241643a39622b7569e3ba39f5/2d752/logo_press_1x.webp 82w,\\n/static/6405da5241643a39622b7569e3ba39f5/fdd36/logo_press_1x.webp 164w","type":"image/webp","sizes":"(min-width: 164px) 164px, 100vw"}]},"width":164,"height":60}');

/***/ }),

/***/ 1734:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/4af0f753ca8f9248fd729f03d88a419b/4186d/logo_susep_1x.png","srcSet":"/static/4af0f753ca8f9248fd729f03d88a419b/c405a/logo_susep_1x.png 31w,\\n/static/4af0f753ca8f9248fd729f03d88a419b/30f8f/logo_susep_1x.png 63w,\\n/static/4af0f753ca8f9248fd729f03d88a419b/4186d/logo_susep_1x.png 125w","sizes":"(min-width: 125px) 125px, 100vw"},"sources":[{"srcSet":"/static/4af0f753ca8f9248fd729f03d88a419b/f7fac/logo_susep_1x.webp 31w,\\n/static/4af0f753ca8f9248fd729f03d88a419b/fa57b/logo_susep_1x.webp 63w,\\n/static/4af0f753ca8f9248fd729f03d88a419b/fae7d/logo_susep_1x.webp 125w","type":"image/webp","sizes":"(min-width: 125px) 125px, 100vw"}]},"width":125,"height":48}');

/***/ }),

/***/ 7948:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/4caf92814695d3afdddb74e22fb92ce8/f8f68/icon_bullets_menu.png","srcSet":"/static/4caf92814695d3afdddb74e22fb92ce8/421d9/icon_bullets_menu.png 2w,\\n/static/4caf92814695d3afdddb74e22fb92ce8/c5e29/icon_bullets_menu.png 4w,\\n/static/4caf92814695d3afdddb74e22fb92ce8/f8f68/icon_bullets_menu.png 7w","sizes":"(min-width: 7px) 7px, 100vw"},"sources":[{"srcSet":"/static/4caf92814695d3afdddb74e22fb92ce8/fb5f5/icon_bullets_menu.webp 2w,\\n/static/4caf92814695d3afdddb74e22fb92ce8/5f3e9/icon_bullets_menu.webp 4w,\\n/static/4caf92814695d3afdddb74e22fb92ce8/21e34/icon_bullets_menu.webp 7w","type":"image/webp","sizes":"(min-width: 7px) 7px, 100vw"}]},"width":7,"height":23}');

/***/ }),

/***/ 5339:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/22ac1b1965cd53d696eda3c2e7d5bcd4/55bba/logo_centauro-on.png","srcSet":"/static/22ac1b1965cd53d696eda3c2e7d5bcd4/ae75d/logo_centauro-on.png 25w,\\n/static/22ac1b1965cd53d696eda3c2e7d5bcd4/4e694/logo_centauro-on.png 50w,\\n/static/22ac1b1965cd53d696eda3c2e7d5bcd4/55bba/logo_centauro-on.png 100w","sizes":"(min-width: 100px) 100px, 100vw"},"sources":[{"srcSet":"/static/22ac1b1965cd53d696eda3c2e7d5bcd4/b96ec/logo_centauro-on.webp 25w,\\n/static/22ac1b1965cd53d696eda3c2e7d5bcd4/fe8ce/logo_centauro-on.webp 50w,\\n/static/22ac1b1965cd53d696eda3c2e7d5bcd4/48a6b/logo_centauro-on.webp 100w","type":"image/webp","sizes":"(min-width: 100px) 100px, 100vw"}]},"width":100,"height":45}');

/***/ }),

/***/ 4027:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/de9533279a476f529c81a36a98223fa0/d3750/logo_metlife.png","srcSet":"/static/de9533279a476f529c81a36a98223fa0/29903/logo_metlife.png 10w,\\n/static/de9533279a476f529c81a36a98223fa0/b3cde/logo_metlife.png 20w,\\n/static/de9533279a476f529c81a36a98223fa0/d3750/logo_metlife.png 39w","sizes":"(min-width: 39px) 39px, 100vw"},"sources":[{"srcSet":"/static/de9533279a476f529c81a36a98223fa0/75611/logo_metlife.webp 10w,\\n/static/de9533279a476f529c81a36a98223fa0/aab92/logo_metlife.webp 20w,\\n/static/de9533279a476f529c81a36a98223fa0/c7a3c/logo_metlife.webp 39w","type":"image/webp","sizes":"(min-width: 39px) 39px, 100vw"}]},"width":39,"height":45}');

/***/ }),

/***/ 936:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e85848","images":{"fallback":{"src":"/static/7dddada8ef1840ba6f197d4f4e4fc0dc/88208/icon_linkedin_orange.png","srcSet":"/static/7dddada8ef1840ba6f197d4f4e4fc0dc/47ee7/icon_linkedin_orange.png 6w,\\n/static/7dddada8ef1840ba6f197d4f4e4fc0dc/86ee2/icon_linkedin_orange.png 13w,\\n/static/7dddada8ef1840ba6f197d4f4e4fc0dc/88208/icon_linkedin_orange.png 25w","sizes":"(min-width: 25px) 25px, 100vw"},"sources":[{"srcSet":"/static/7dddada8ef1840ba6f197d4f4e4fc0dc/eee53/icon_linkedin_orange.webp 6w,\\n/static/7dddada8ef1840ba6f197d4f4e4fc0dc/68795/icon_linkedin_orange.webp 13w,\\n/static/7dddada8ef1840ba6f197d4f4e4fc0dc/2fa99/icon_linkedin_orange.webp 25w","type":"image/webp","sizes":"(min-width: 25px) 25px, 100vw"}]},"width":25,"height":25}');

/***/ }),

/***/ 8779:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#0868a8","images":{"fallback":{"src":"/static/741818f8456f16c7e22d75bdd12fd513/3df5b/logo_caixa_1x.png","srcSet":"/static/741818f8456f16c7e22d75bdd12fd513/cb631/logo_caixa_1x.png 23w,\\n/static/741818f8456f16c7e22d75bdd12fd513/a8daf/logo_caixa_1x.png 45w,\\n/static/741818f8456f16c7e22d75bdd12fd513/3df5b/logo_caixa_1x.png 90w","sizes":"(min-width: 90px) 90px, 100vw"},"sources":[{"srcSet":"/static/741818f8456f16c7e22d75bdd12fd513/7a211/logo_caixa_1x.webp 23w,\\n/static/741818f8456f16c7e22d75bdd12fd513/fdca5/logo_caixa_1x.webp 45w,\\n/static/741818f8456f16c7e22d75bdd12fd513/c7288/logo_caixa_1x.webp 90w","type":"image/webp","sizes":"(min-width: 90px) 90px, 100vw"}]},"width":90,"height":37}');

/***/ }),

/***/ 1153:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/59618c56a4aa5b134c4ed2d181707345/a00e8/logo_amil.png","srcSet":"/static/59618c56a4aa5b134c4ed2d181707345/fe886/logo_amil.png 27w,\\n/static/59618c56a4aa5b134c4ed2d181707345/21a7d/logo_amil.png 54w,\\n/static/59618c56a4aa5b134c4ed2d181707345/a00e8/logo_amil.png 107w","sizes":"(min-width: 107px) 107px, 100vw"},"sources":[{"srcSet":"/static/59618c56a4aa5b134c4ed2d181707345/0dac4/logo_amil.webp 27w,\\n/static/59618c56a4aa5b134c4ed2d181707345/cd85a/logo_amil.webp 54w,\\n/static/59618c56a4aa5b134c4ed2d181707345/93ea7/logo_amil.webp 107w","type":"image/webp","sizes":"(min-width: 107px) 107px, 100vw"}]},"width":107,"height":44}');

/***/ }),

/***/ 642:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e85848","images":{"fallback":{"src":"/static/54590a5c361cdffd247c42aaef19a189/88208/icon_instagram_orange.png","srcSet":"/static/54590a5c361cdffd247c42aaef19a189/47ee7/icon_instagram_orange.png 6w,\\n/static/54590a5c361cdffd247c42aaef19a189/86ee2/icon_instagram_orange.png 13w,\\n/static/54590a5c361cdffd247c42aaef19a189/88208/icon_instagram_orange.png 25w","sizes":"(min-width: 25px) 25px, 100vw"},"sources":[{"srcSet":"/static/54590a5c361cdffd247c42aaef19a189/eee53/icon_instagram_orange.webp 6w,\\n/static/54590a5c361cdffd247c42aaef19a189/68795/icon_instagram_orange.webp 13w,\\n/static/54590a5c361cdffd247c42aaef19a189/2fa99/icon_instagram_orange.webp 25w","type":"image/webp","sizes":"(min-width: 25px) 25px, 100vw"}]},"width":25,"height":25}');

/***/ }),

/***/ 6057:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#b8b8b8","images":{"fallback":{"src":"/static/39890f8dee8370209bde66ce5c878882/39e4d/logo_r7_1x.png","srcSet":"/static/39890f8dee8370209bde66ce5c878882/7820b/logo_r7_1x.png 24w,\\n/static/39890f8dee8370209bde66ce5c878882/84126/logo_r7_1x.png 47w,\\n/static/39890f8dee8370209bde66ce5c878882/39e4d/logo_r7_1x.png 94w","sizes":"(min-width: 94px) 94px, 100vw"},"sources":[{"srcSet":"/static/39890f8dee8370209bde66ce5c878882/bbe1e/logo_r7_1x.webp 24w,\\n/static/39890f8dee8370209bde66ce5c878882/bf51a/logo_r7_1x.webp 47w,\\n/static/39890f8dee8370209bde66ce5c878882/bd503/logo_r7_1x.webp 94w","type":"image/webp","sizes":"(min-width: 94px) 94px, 100vw"}]},"width":94,"height":81}');

/***/ }),

/***/ 4594:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/58b13c56af76b12e73d5dee167feb3c2/4129a/logo_banco_daycoval.png","srcSet":"/static/58b13c56af76b12e73d5dee167feb3c2/99d98/logo_banco_daycoval.png 26w,\\n/static/58b13c56af76b12e73d5dee167feb3c2/5018b/logo_banco_daycoval.png 52w,\\n/static/58b13c56af76b12e73d5dee167feb3c2/4129a/logo_banco_daycoval.png 104w","sizes":"(min-width: 104px) 104px, 100vw"},"sources":[{"srcSet":"/static/58b13c56af76b12e73d5dee167feb3c2/9370f/logo_banco_daycoval.webp 26w,\\n/static/58b13c56af76b12e73d5dee167feb3c2/b2aee/logo_banco_daycoval.webp 52w,\\n/static/58b13c56af76b12e73d5dee167feb3c2/59dbf/logo_banco_daycoval.webp 104w","type":"image/webp","sizes":"(min-width: 104px) 104px, 100vw"}]},"width":104,"height":70}');

/***/ }),

/***/ 1061:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e87808","images":{"fallback":{"src":"/static/0aaac56f3eb6bc36529d16f38a243cb1/7ab40/logo_itau_consorcio_1x.png","srcSet":"/static/0aaac56f3eb6bc36529d16f38a243cb1/7961d/logo_itau_consorcio_1x.png 15w,\\n/static/0aaac56f3eb6bc36529d16f38a243cb1/53973/logo_itau_consorcio_1x.png 30w,\\n/static/0aaac56f3eb6bc36529d16f38a243cb1/7ab40/logo_itau_consorcio_1x.png 60w","sizes":"(min-width: 60px) 60px, 100vw"},"sources":[{"srcSet":"/static/0aaac56f3eb6bc36529d16f38a243cb1/f57b3/logo_itau_consorcio_1x.webp 15w,\\n/static/0aaac56f3eb6bc36529d16f38a243cb1/bde72/logo_itau_consorcio_1x.webp 30w,\\n/static/0aaac56f3eb6bc36529d16f38a243cb1/927d1/logo_itau_consorcio_1x.webp 60w","type":"image/webp","sizes":"(min-width: 60px) 60px, 100vw"}]},"width":60,"height":60}');

/***/ }),

/***/ 5556:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/90957794a859f16195dfc2831ac6b622/cb0c8/logo_goldencross.png","srcSet":"/static/90957794a859f16195dfc2831ac6b622/a1223/logo_goldencross.png 34w,\\n/static/90957794a859f16195dfc2831ac6b622/60901/logo_goldencross.png 67w,\\n/static/90957794a859f16195dfc2831ac6b622/cb0c8/logo_goldencross.png 134w","sizes":"(min-width: 134px) 134px, 100vw"},"sources":[{"srcSet":"/static/90957794a859f16195dfc2831ac6b622/db4b2/logo_goldencross.webp 34w,\\n/static/90957794a859f16195dfc2831ac6b622/5e92a/logo_goldencross.webp 67w,\\n/static/90957794a859f16195dfc2831ac6b622/7c770/logo_goldencross.webp 134w","type":"image/webp","sizes":"(min-width: 134px) 134px, 100vw"}]},"width":134,"height":58.99999999999999}');

/***/ }),

/***/ 7985:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/8de2648bb49bf02065477bb45cf80cdd/69003/logo_advanced.png","srcSet":"/static/8de2648bb49bf02065477bb45cf80cdd/9ec9d/logo_advanced.png 56w,\\n/static/8de2648bb49bf02065477bb45cf80cdd/e6717/logo_advanced.png 113w,\\n/static/8de2648bb49bf02065477bb45cf80cdd/69003/logo_advanced.png 225w","sizes":"(min-width: 225px) 225px, 100vw"},"sources":[{"srcSet":"/static/8de2648bb49bf02065477bb45cf80cdd/e3232/logo_advanced.webp 56w,\\n/static/8de2648bb49bf02065477bb45cf80cdd/3b4d4/logo_advanced.webp 113w,\\n/static/8de2648bb49bf02065477bb45cf80cdd/d0795/logo_advanced.webp 225w","type":"image/webp","sizes":"(min-width: 225px) 225px, 100vw"}]},"width":225,"height":63}');

/***/ }),

/***/ 1088:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e85848","images":{"fallback":{"src":"/static/eaa2d799be91cfc0472b1d2fe0377fb0/88208/icon_youtube_orange.png","srcSet":"/static/eaa2d799be91cfc0472b1d2fe0377fb0/47ee7/icon_youtube_orange.png 6w,\\n/static/eaa2d799be91cfc0472b1d2fe0377fb0/86ee2/icon_youtube_orange.png 13w,\\n/static/eaa2d799be91cfc0472b1d2fe0377fb0/88208/icon_youtube_orange.png 25w","sizes":"(min-width: 25px) 25px, 100vw"},"sources":[{"srcSet":"/static/eaa2d799be91cfc0472b1d2fe0377fb0/eee53/icon_youtube_orange.webp 6w,\\n/static/eaa2d799be91cfc0472b1d2fe0377fb0/68795/icon_youtube_orange.webp 13w,\\n/static/eaa2d799be91cfc0472b1d2fe0377fb0/2fa99/icon_youtube_orange.webp 25w","type":"image/webp","sizes":"(min-width: 25px) 25px, 100vw"}]},"width":25,"height":25}');

/***/ }),

/***/ 9653:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/5ec4145fe9f33bbca49c948659bb5bee/84126/logo_mongeral_aegon.png","srcSet":"/static/5ec4145fe9f33bbca49c948659bb5bee/51847/logo_mongeral_aegon.png 12w,\\n/static/5ec4145fe9f33bbca49c948659bb5bee/7820b/logo_mongeral_aegon.png 24w,\\n/static/5ec4145fe9f33bbca49c948659bb5bee/84126/logo_mongeral_aegon.png 47w","sizes":"(min-width: 47px) 47px, 100vw"},"sources":[{"srcSet":"/static/5ec4145fe9f33bbca49c948659bb5bee/73620/logo_mongeral_aegon.webp 12w,\\n/static/5ec4145fe9f33bbca49c948659bb5bee/bbe1e/logo_mongeral_aegon.webp 24w,\\n/static/5ec4145fe9f33bbca49c948659bb5bee/bf51a/logo_mongeral_aegon.webp 47w","type":"image/webp","sizes":"(min-width: 47px) 47px, 100vw"}]},"width":47,"height":41}');

/***/ }),

/***/ 7766:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e85848","images":{"fallback":{"src":"/static/0ee25e83d3c971e845af0f667476bce3/695d6/logo_2_becapital_1x.png","srcSet":"/static/0ee25e83d3c971e845af0f667476bce3/255ab/logo_2_becapital_1x.png 14w,\\n/static/0ee25e83d3c971e845af0f667476bce3/f1c6c/logo_2_becapital_1x.png 27w,\\n/static/0ee25e83d3c971e845af0f667476bce3/695d6/logo_2_becapital_1x.png 54w","sizes":"(min-width: 54px) 54px, 100vw"},"sources":[{"srcSet":"/static/0ee25e83d3c971e845af0f667476bce3/6412b/logo_2_becapital_1x.webp 14w,\\n/static/0ee25e83d3c971e845af0f667476bce3/391be/logo_2_becapital_1x.webp 27w,\\n/static/0ee25e83d3c971e845af0f667476bce3/78903/logo_2_becapital_1x.webp 54w","type":"image/webp","sizes":"(min-width: 54px) 54px, 100vw"}]},"width":54,"height":53}');

/***/ }),

/***/ 3701:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/770e3532d9dfe63298807186c3707a4a/30e64/qrcode_3x.png","srcSet":"/static/770e3532d9dfe63298807186c3707a4a/4f02a/qrcode_3x.png 112w,\\n/static/770e3532d9dfe63298807186c3707a4a/cdac5/qrcode_3x.png 224w,\\n/static/770e3532d9dfe63298807186c3707a4a/30e64/qrcode_3x.png 447w","sizes":"(min-width: 447px) 447px, 100vw"},"sources":[{"srcSet":"/static/770e3532d9dfe63298807186c3707a4a/c9fa2/qrcode_3x.webp 112w,\\n/static/770e3532d9dfe63298807186c3707a4a/59f5c/qrcode_3x.webp 224w,\\n/static/770e3532d9dfe63298807186c3707a4a/815d2/qrcode_3x.webp 447w","type":"image/webp","sizes":"(min-width: 447px) 447px, 100vw"}]},"width":447,"height":576}');

/***/ }),

/***/ 8710:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/a6000136b3478f0440d862d0246c13fa/da97d/logo_bradesco-saude.png","srcSet":"/static/a6000136b3478f0440d862d0246c13fa/c85db/logo_bradesco-saude.png 37w,\\n/static/a6000136b3478f0440d862d0246c13fa/734fb/logo_bradesco-saude.png 75w,\\n/static/a6000136b3478f0440d862d0246c13fa/da97d/logo_bradesco-saude.png 149w","sizes":"(min-width: 149px) 149px, 100vw"},"sources":[{"srcSet":"/static/a6000136b3478f0440d862d0246c13fa/22a06/logo_bradesco-saude.webp 37w,\\n/static/a6000136b3478f0440d862d0246c13fa/a3385/logo_bradesco-saude.webp 75w,\\n/static/a6000136b3478f0440d862d0246c13fa/ca6b6/logo_bradesco-saude.webp 149w","type":"image/webp","sizes":"(min-width: 149px) 149px, 100vw"}]},"width":149,"height":53}');

/***/ }),

/***/ 8998:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/2c65688fc22f45c85c525f09b1887329/ea2bd/logo_prudential.png","srcSet":"/static/2c65688fc22f45c85c525f09b1887329/81912/logo_prudential.png 14w,\\n/static/2c65688fc22f45c85c525f09b1887329/2c5f7/logo_prudential.png 28w,\\n/static/2c65688fc22f45c85c525f09b1887329/ea2bd/logo_prudential.png 56w","sizes":"(min-width: 56px) 56px, 100vw"},"sources":[{"srcSet":"/static/2c65688fc22f45c85c525f09b1887329/21539/logo_prudential.webp 14w,\\n/static/2c65688fc22f45c85c525f09b1887329/888a0/logo_prudential.webp 28w,\\n/static/2c65688fc22f45c85c525f09b1887329/5844b/logo_prudential.webp 56w","type":"image/webp","sizes":"(min-width: 56px) 56px, 100vw"}]},"width":56,"height":49.99999999999999}');

/***/ }),

/***/ 6927:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/7be28898275059a8ad51b87d9182165c/7ab40/logo_porto_seguro_1x.png","srcSet":"/static/7be28898275059a8ad51b87d9182165c/7961d/logo_porto_seguro_1x.png 15w,\\n/static/7be28898275059a8ad51b87d9182165c/53973/logo_porto_seguro_1x.png 30w,\\n/static/7be28898275059a8ad51b87d9182165c/7ab40/logo_porto_seguro_1x.png 60w","sizes":"(min-width: 60px) 60px, 100vw"},"sources":[{"srcSet":"/static/7be28898275059a8ad51b87d9182165c/f57b3/logo_porto_seguro_1x.webp 15w,\\n/static/7be28898275059a8ad51b87d9182165c/bde72/logo_porto_seguro_1x.webp 30w,\\n/static/7be28898275059a8ad51b87d9182165c/927d1/logo_porto_seguro_1x.webp 60w","type":"image/webp","sizes":"(min-width: 60px) 60px, 100vw"}]},"width":60,"height":60}');

/***/ }),

/***/ 2459:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/452ed9bf433650a3b38b72e8ac0dfae3/c1174/logo_abc_1x.png","srcSet":"/static/452ed9bf433650a3b38b72e8ac0dfae3/056c4/logo_abc_1x.png 68w,\\n/static/452ed9bf433650a3b38b72e8ac0dfae3/9fa94/logo_abc_1x.png 136w,\\n/static/452ed9bf433650a3b38b72e8ac0dfae3/c1174/logo_abc_1x.png 272w","sizes":"(min-width: 272px) 272px, 100vw"},"sources":[{"srcSet":"/static/452ed9bf433650a3b38b72e8ac0dfae3/f6a1f/logo_abc_1x.webp 68w,\\n/static/452ed9bf433650a3b38b72e8ac0dfae3/4a337/logo_abc_1x.webp 136w,\\n/static/452ed9bf433650a3b38b72e8ac0dfae3/a26ef/logo_abc_1x.webp 272w","type":"image/webp","sizes":"(min-width: 272px) 272px, 100vw"}]},"width":272,"height":90}');

/***/ }),

/***/ 4539:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f86848","images":{"fallback":{"src":"/static/24c21cde5c54c4eedefe22a3291390bc/ad8bc/logo_becapital_2x.png","srcSet":"/static/24c21cde5c54c4eedefe22a3291390bc/e2860/logo_becapital_2x.png 69w,\\n/static/24c21cde5c54c4eedefe22a3291390bc/3e491/logo_becapital_2x.png 139w,\\n/static/24c21cde5c54c4eedefe22a3291390bc/ad8bc/logo_becapital_2x.png 277w","sizes":"(min-width: 277px) 277px, 100vw"},"sources":[{"srcSet":"/static/24c21cde5c54c4eedefe22a3291390bc/ff0ce/logo_becapital_2x.webp 69w,\\n/static/24c21cde5c54c4eedefe22a3291390bc/1f9cf/logo_becapital_2x.webp 139w,\\n/static/24c21cde5c54c4eedefe22a3291390bc/dc41c/logo_becapital_2x.webp 277w","type":"image/webp","sizes":"(min-width: 277px) 277px, 100vw"}]},"width":277,"height":60.99999999999999}');

/***/ }),

/***/ 8174:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/9c9276265c637d65986f7f88f0c82943/b4b01/logo_icatu.png","srcSet":"/static/9c9276265c637d65986f7f88f0c82943/255ab/logo_icatu.png 14w,\\n/static/9c9276265c637d65986f7f88f0c82943/aa0e3/logo_icatu.png 29w,\\n/static/9c9276265c637d65986f7f88f0c82943/b4b01/logo_icatu.png 57w","sizes":"(min-width: 57px) 57px, 100vw"},"sources":[{"srcSet":"/static/9c9276265c637d65986f7f88f0c82943/6412b/logo_icatu.webp 14w,\\n/static/9c9276265c637d65986f7f88f0c82943/4c897/logo_icatu.webp 29w,\\n/static/9c9276265c637d65986f7f88f0c82943/e8582/logo_icatu.webp 57w","type":"image/webp","sizes":"(min-width: 57px) 57px, 100vw"}]},"width":57,"height":57}');

/***/ }),

/***/ 6156:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/ff44d273d22bc438de4fc9d4d33bb992/62659/logo_forbes_1x.png","srcSet":"/static/ff44d273d22bc438de4fc9d4d33bb992/0f9e1/logo_forbes_1x.png 44w,\\n/static/ff44d273d22bc438de4fc9d4d33bb992/1f872/logo_forbes_1x.png 87w,\\n/static/ff44d273d22bc438de4fc9d4d33bb992/62659/logo_forbes_1x.png 174w","sizes":"(min-width: 174px) 174px, 100vw"},"sources":[{"srcSet":"/static/ff44d273d22bc438de4fc9d4d33bb992/70c8a/logo_forbes_1x.webp 44w,\\n/static/ff44d273d22bc438de4fc9d4d33bb992/65c01/logo_forbes_1x.webp 87w,\\n/static/ff44d273d22bc438de4fc9d4d33bb992/c6165/logo_forbes_1x.webp 174w","type":"image/webp","sizes":"(min-width: 174px) 174px, 100vw"}]},"width":174,"height":46}');

/***/ }),

/***/ 2426:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#b8b8b8","images":{"fallback":{"src":"/static/3d390ab4fb988e37f82c38966884d103/97cbd/logo_estadao_1x.png","srcSet":"/static/3d390ab4fb988e37f82c38966884d103/c243e/logo_estadao_1x.png 55w,\\n/static/3d390ab4fb988e37f82c38966884d103/4cc29/logo_estadao_1x.png 109w,\\n/static/3d390ab4fb988e37f82c38966884d103/97cbd/logo_estadao_1x.png 218w","sizes":"(min-width: 218px) 218px, 100vw"},"sources":[{"srcSet":"/static/3d390ab4fb988e37f82c38966884d103/78362/logo_estadao_1x.webp 55w,\\n/static/3d390ab4fb988e37f82c38966884d103/28e0f/logo_estadao_1x.webp 109w,\\n/static/3d390ab4fb988e37f82c38966884d103/8310c/logo_estadao_1x.webp 218w","type":"image/webp","sizes":"(min-width: 218px) 218px, 100vw"}]},"width":218,"height":47}');

/***/ }),

/***/ 5844:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/a1f1455672587858091baf545c0f42e7/66b71/logo_notredame.png","srcSet":"/static/a1f1455672587858091baf545c0f42e7/f9b14/logo_notredame.png 36w,\\n/static/a1f1455672587858091baf545c0f42e7/ae92c/logo_notredame.png 72w,\\n/static/a1f1455672587858091baf545c0f42e7/66b71/logo_notredame.png 143w","sizes":"(min-width: 143px) 143px, 100vw"},"sources":[{"srcSet":"/static/a1f1455672587858091baf545c0f42e7/3300d/logo_notredame.webp 36w,\\n/static/a1f1455672587858091baf545c0f42e7/522ac/logo_notredame.webp 72w,\\n/static/a1f1455672587858091baf545c0f42e7/b1b9e/logo_notredame.webp 143w","type":"image/webp","sizes":"(min-width: 143px) 143px, 100vw"}]},"width":143,"height":41}');

/***/ }),

/***/ 9031:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/50a9a41032eb09e75b83a2fb3c210462/41e6a/logo_sulamerica_saude.png","srcSet":"/static/50a9a41032eb09e75b83a2fb3c210462/6d4aa/logo_sulamerica_saude.png 32w,\\n/static/50a9a41032eb09e75b83a2fb3c210462/ba7b2/logo_sulamerica_saude.png 65w,\\n/static/50a9a41032eb09e75b83a2fb3c210462/41e6a/logo_sulamerica_saude.png 129w","sizes":"(min-width: 129px) 129px, 100vw"},"sources":[{"srcSet":"/static/50a9a41032eb09e75b83a2fb3c210462/114e5/logo_sulamerica_saude.webp 32w,\\n/static/50a9a41032eb09e75b83a2fb3c210462/cc748/logo_sulamerica_saude.webp 65w,\\n/static/50a9a41032eb09e75b83a2fb3c210462/4db7f/logo_sulamerica_saude.webp 129w","type":"image/webp","sizes":"(min-width: 129px) 129px, 100vw"}]},"width":129,"height":49}');

/***/ }),

/***/ 3600:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}');

/***/ }),

/***/ 9323:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"\'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\\"","QUOT":"\\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}');

/***/ }),

/***/ 9591:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\\"","QUOT":"\\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}');

/***/ }),

/***/ 2586:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"amp":"&","apos":"\'","gt":">","lt":"<","quot":"\\""}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-js.js.map