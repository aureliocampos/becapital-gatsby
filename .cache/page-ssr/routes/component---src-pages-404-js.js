"use strict";
exports.id = "component---src-pages-404-js";
exports.ids = ["component---src-pages-404-js"];
exports.modules = {

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/***/ ((module) => {



const preserveCamelCase = string => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
		}
	}

	return string;
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = Object.assign({
		pascalCase: false
	}, options);

	const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
	}

	const hasUpperCase = input !== input.toLowerCase();

	if (hasUpperCase) {
		input = preserveCamelCase(input);
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
		.replace(/\d+(\w|$)/g, m => m.toUpperCase());

	return postProcess(input);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GatsbyImage": () => (/* binding */ Y),
/* harmony export */   "MainImage": () => (/* binding */ q),
/* harmony export */   "Placeholder": () => (/* binding */ C),
/* harmony export */   "StaticImage": () => (/* binding */ J),
/* harmony export */   "generateImageData": () => (/* binding */ y),
/* harmony export */   "getImage": () => (/* binding */ R),
/* harmony export */   "getImageData": () => (/* binding */ W),
/* harmony export */   "getLowResolutionImageURL": () => (/* binding */ w),
/* harmony export */   "getSrc": () => (/* binding */ x),
/* harmony export */   "getSrcSet": () => (/* binding */ I),
/* harmony export */   "withArtDirection": () => (/* binding */ j)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var common_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common-tags */ "./node_modules/common-tags/es/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);






function s() {
  return s = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];

      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }

    return e;
  }, s.apply(this, arguments);
}

function l(e, t) {
  if (null == e) return {};
  var a,
      i,
      r = {},
      n = Object.keys(e);

  for (i = 0; i < n.length; i++) t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);

  return r;
}

var d,
    u = [.25, .5, 1, 2],
    c = [750, 1080, 1366, 1920],
    h = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
    g = function (e) {
  return console.warn(e);
},
    p = function (e, t) {
  return e - t;
},
    m = function (e) {
  return e.map(function (e) {
    return e.src + " " + e.width + "w";
  }).join(",\n");
};

function f(e) {
  var t = e.lastIndexOf(".");

  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}

function v(e) {
  var t = e.layout,
      a = void 0 === t ? "constrained" : t,
      i = e.width,
      n = e.height,
      o = e.sourceMetadata,
      l = e.breakpoints,
      d = e.aspectRatio,
      u = e.formats,
      c = void 0 === u ? ["auto", "webp"] : u;
  return c = c.map(function (e) {
    return e.toLowerCase();
  }), a = camelcase__WEBPACK_IMPORTED_MODULE_2___default()(a), i && n ? s({}, e, {
    formats: c,
    layout: a,
    aspectRatio: i / n
  }) : (o.width && o.height && !d && (d = o.width / o.height), "fullWidth" === a ? (i = i || o.width || l[l.length - 1], n = n || Math.round(i / (d || 1.3333333333333333))) : (i || (i = n && d ? n * d : o.width ? o.width : n ? Math.round(n / 1.3333333333333333) : 800), d && !n ? n = Math.round(i / d) : d || (d = i / n)), s({}, e, {
    width: i,
    height: n,
    aspectRatio: d,
    layout: a,
    formats: c
  }));
}

function w(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = v(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}

function y(e) {
  var t,
      a = (e = v(e)).pluginName,
      r = e.sourceMetadata,
      n = e.generateImageSource,
      o = e.layout,
      l = e.fit,
      h = e.options,
      p = e.width,
      w = e.height,
      y = e.filename,
      M = e.reporter,
      S = void 0 === M ? {
    warn: g
  } : M,
      N = e.backgroundColor,
      R = e.placeholderURL;
  if (a || S.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof n) throw new Error("generateImageSource must be a function");
  r && (r.width || r.height) ? r.format || (r.format = f(y)) : r = {
    width: p,
    height: w,
    format: (null == (t = r) ? void 0 : t.format) || f(y) || "auto"
  };
  var x = new Set(e.formats);
  (0 === x.size || x.has("auto") || x.has("")) && (x.delete("auto"), x.delete(""), x.add(r.format)), x.has("jpg") && x.has("png") && (S.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), x.delete("jpg" === r.format ? "png" : "jpg"));

  var I = function (e) {
    var t = e.filename,
        a = e.layout,
        r = void 0 === a ? "constrained" : a,
        n = e.sourceMetadata,
        o = e.reporter,
        l = void 0 === o ? {
      warn: g
    } : o,
        h = e.breakpoints,
        p = void 0 === h ? c : h,
        m = Object.entries({
      width: e.width,
      height: e.height
    }).filter(function (e) {
      var t = e[1];
      return "number" == typeof t && t < 1;
    });
    if (m.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + m.map(function (e) {
      return e.join(": ");
    }).join(", "));
    return "fixed" === r ? function (e) {
      var t = e.filename,
          a = e.sourceMetadata,
          r = e.width,
          n = e.height,
          o = e.fit,
          s = void 0 === o ? "cover" : o,
          l = e.outputPixelDensities,
          c = e.reporter,
          h = void 0 === c ? {
        warn: g
      } : c,
          p = a.width / a.height,
          m = b(void 0 === l ? u : l);

      if (r && n) {
        var f = k(a, {
          width: r,
          height: n,
          fit: s
        });
        r = f.width, n = f.height, p = f.aspectRatio;
      }

      r ? n || (n = Math.round(r / p)) : r = n ? Math.round(n * p) : 800;
      var v,
          w,
          y = r;

      if (a.width < r || a.height < n) {
        var E = a.width < r ? "width" : "height";
        h.warn((0,common_tags__WEBPACK_IMPORTED_MODULE_1__.stripIndent)(d || (v = ["\n    The requested ", ' "', 'px" for the image ', " was larger than the actual image ", " of ", "px. If possible, replace the current image with a larger one."], w || (w = v.slice(0)), v.raw = w, d = v), E, "width" === E ? r : n, t, E, a[E])), "width" === E ? (r = a.width, n = Math.round(r / p)) : r = (n = a.height) * p;
      }

      return {
        sizes: m.filter(function (e) {
          return e >= 1;
        }).map(function (e) {
          return Math.round(e * r);
        }).filter(function (e) {
          return e <= a.width;
        }),
        aspectRatio: p,
        presentationWidth: y,
        presentationHeight: Math.round(y / p),
        unscaledWidth: r
      };
    }(e) : "constrained" === r ? E(e) : "fullWidth" === r ? E(s({
      breakpoints: p
    }, e)) : (l.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + r), {
      sizes: [n.width],
      presentationWidth: n.width,
      presentationHeight: n.height,
      aspectRatio: n.width / n.height,
      unscaledWidth: n.width
    });
  }(s({}, e, {
    sourceMetadata: r
  })),
      W = {
    sources: []
  },
      j = e.sizes;

  j || (j = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";

      case "fixed":
        return e + "px";

      case "fullWidth":
        return "100vw";

      default:
        return;
    }
  }(I.presentationWidth, o)), x.forEach(function (e) {
    var t = I.sizes.map(function (t) {
      var i = n(y, t, Math.round(t / I.aspectRatio), e, l, h);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      S.warn("[" + a + "] The resolver for image " + y + " returned an invalid value.");
    }).filter(Boolean);

    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === I.unscaledWidth;
      }) || t[0];
      i && (W.fallback = {
        src: i.src,
        srcSet: m(t),
        sizes: j
      });
    } else {
      var r;
      null == (r = W.sources) || r.push({
        srcSet: m(t),
        sizes: j,
        type: "image/" + e
      });
    }
  });
  var _ = {
    images: W,
    layout: o,
    backgroundColor: N
  };

  switch (R && (_.placeholder = {
    fallback: R
  }), o) {
    case "fixed":
      _.width = I.presentationWidth, _.height = I.presentationHeight;
      break;

    case "fullWidth":
      _.width = 1, _.height = 1 / I.aspectRatio;
      break;

    case "constrained":
      _.width = e.width || I.presentationWidth || 1, _.height = (_.width || 1) / I.aspectRatio;
  }

  return _;
}

var b = function (e) {
  return Array.from(new Set([1].concat(e))).sort(p);
};

function E(e) {
  var t,
      a = e.sourceMetadata,
      i = e.width,
      r = e.height,
      n = e.fit,
      o = void 0 === n ? "cover" : n,
      s = e.outputPixelDensities,
      l = e.breakpoints,
      d = e.layout,
      c = a.width / a.height,
      h = b(void 0 === s ? u : s);

  if (i && r) {
    var g = k(a, {
      width: i,
      height: r,
      fit: o
    });
    i = g.width, r = g.height, c = g.aspectRatio;
  }

  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(800, a.width)) / c), i || (i = r * c);
  var m = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == l ? void 0 : l.length) > 0 ? (t = l.filter(function (e) {
    return e <= a.width;
  })).length < l.length && !t.includes(a.width) && t.push(a.width) : t = (t = h.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== d || t.includes(i) || t.push(i), {
    sizes: t = t.sort(p),
    aspectRatio: c,
    presentationWidth: m,
    presentationHeight: Math.round(m / c),
    unscaledWidth: i
  };
}

function k(e, t) {
  var a = e.width / e.height,
      i = t.width,
      r = t.height;

  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;

    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
          o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;

    case "outside":
      var s = t.width ? t.width : 0,
          l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;

    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }

  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}

var M = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
    S = ["images", "placeholder"];

function N() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}

new Set();

var R = function (e) {
  var t;
  return function (e) {
    var t, a;
    return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
  }(e) ? e : function (e) {
    return Boolean(null == e ? void 0 : e.gatsbyImageData);
  }(e) ? e.gatsbyImageData : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
},
    x = function (e) {
  var t, a, i;
  return null == (t = R(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
},
    I = function (e) {
  var t, a, i;
  return null == (t = R(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
};

function W(e) {
  var t,
      a = e.baseUrl,
      i = e.urlBuilder,
      r = e.sourceWidth,
      n = e.sourceHeight,
      o = e.pluginName,
      d = void 0 === o ? "getImageData" : o,
      u = e.formats,
      c = void 0 === u ? ["auto"] : u,
      g = e.breakpoints,
      p = e.options,
      m = l(e, M);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = h), y(s({}, m, {
    pluginName: d,
    generateImageSource: function (e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: c,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: n,
      format: "auto"
    }
  }));
}

function j(e, t) {
  var a,
      i,
      r,
      n = e.images,
      o = e.placeholder,
      d = s({}, l(e, S), {
    images: s({}, n, {
      sources: []
    }),
    placeholder: o && s({}, o, {
      sources: []
    })
  });
  return t.forEach(function (t) {
    var a,
        i = t.media,
        r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = d.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return s({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), d.placeholder && d.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = d.images.sources).push.apply(a, n.sources), null != o && o.sources && (null == (i = d.placeholder) || (r = i.sources).push.apply(r, o.sources)), d;
}

var _,
    T = ["src", "srcSet", "loading", "alt", "shouldLoad", "innerRef"],
    A = ["fallback", "sources", "shouldLoad"],
    O = function (t) {
  var a = t.src,
      i = t.srcSet,
      r = t.loading,
      n = t.alt,
      o = void 0 === n ? "" : n,
      d = t.shouldLoad,
      u = t.innerRef,
      c = l(t, T);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", s({}, c, {
    decoding: "async",
    loading: r,
    src: d ? a : void 0,
    "data-src": d ? void 0 : a,
    srcSet: d ? i : void 0,
    "data-srcset": d ? void 0 : i,
    alt: o,
    ref: u
  }));
},
    z = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (t, a) {
  var i = t.fallback,
      r = t.sources,
      n = void 0 === r ? [] : r,
      o = t.shouldLoad,
      d = void 0 === o || o,
      u = l(t, A),
      c = u.sizes || (null == i ? void 0 : i.sizes),
      h = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(O, s({}, u, i, {
    sizes: c,
    shouldLoad: d,
    innerRef: a
  }));
  return n.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, n.map(function (t) {
    var a = t.media,
        i = t.srcSet,
        r = t.type;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
      key: a + "-" + r + "-" + i,
      type: r,
      media: a,
      srcSet: d ? i : void 0,
      "data-srcset": d ? void 0 : i,
      sizes: c
    });
  }), h) : h;
});

O.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_3__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_3__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_3__.bool
}, z.displayName = "Picture", z.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_3__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_3__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_3__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_3__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_3__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_3__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_3__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_3__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired
  })]))
};

var L = ["fallback"],
    C = function (t) {
  var a = t.fallback,
      i = l(t, L);
  return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, s({}, i, {
    fallback: {
      src: a
    },
    "aria-hidden": !0,
    alt: ""
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", s({}, i));
};

C.displayName = "Placeholder", C.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_3__.string,
  sources: null == (_ = z.propTypes) ? void 0 : _.sources,
  alt: function (e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};
var q = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (t, a) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, s({
    ref: a
  }, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, s({}, t, {
    shouldLoad: !0
  }))));
});
q.displayName = "MainImage", q.propTypes = z.propTypes;

var D = ["children"],
    P = function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
    type: "module",
    dangerouslySetInnerHTML: {
      __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1)}}'
    }
  });
},
    H = function (t) {
  var a = t.layout,
      i = t.width,
      r = t.height;
  return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "aria-hidden": !0,
    style: {
      paddingTop: r / i * 100 + "%"
    }
  }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      maxWidth: i,
      display: "block"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    alt: "",
    role: "presentation",
    "aria-hidden": "true",
    src: "data:image/svg+xml;charset=utf-8,%3Csvg height='" + r + "' width='" + i + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",
    style: {
      maxWidth: "100%",
      display: "block",
      position: "static"
    }
  })) : null;
},
    F = function (t) {
  var i = t.children,
      r = l(t, D);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(H, s({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(P, null));
},
    B = ["as", "children"],
    G = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
    V = ["style", "className"],
    U = function (e) {
  return e.replace(/\n/g, "");
},
    X = function (t) {
  var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.children,
      n = l(t, B);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, s({}, n), r);
},
    Y = function (t) {
  var a = t.as,
      i = t.className,
      r = t.class,
      n = t.style,
      o = t.image,
      d = t.loading,
      u = void 0 === d ? "lazy" : d,
      c = t.imgClassName,
      h = t.imgStyle,
      g = t.backgroundColor,
      p = t.objectFit,
      m = t.objectPosition,
      f = l(t, G);
  if (!o) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
  r && (i = r), h = s({
    objectFit: p,
    objectPosition: m,
    backgroundColor: g
  }, h);

  var v = o.width,
      w = o.height,
      y = o.layout,
      b = o.images,
      E = o.placeholder,
      k = o.backgroundColor,
      M = function (e, t, a) {
    var i = {},
        r = "gatsby-image-wrapper";
    return N() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (N() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
      className: r,
      "data-gatsby-image-wrapper": "",
      style: i
    };
  }(v, w, y),
      S = M.style,
      R = M.className,
      x = l(M, V),
      I = {
    fallback: void 0,
    sources: []
  };

  return b.fallback && (I.fallback = s({}, b.fallback, {
    srcSet: b.fallback.srcSet ? U(b.fallback.srcSet) : void 0
  })), b.sources && (I.sources = b.sources.map(function (e) {
    return s({}, e, {
      srcSet: U(e.srcSet)
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(X, s({}, x, {
    as: a,
    style: s({}, S, n, {
      backgroundColor: g
    }),
    className: R + (i ? " " + i : "")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F, {
    layout: y,
    width: v,
    height: w
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, s({}, function (e, t, a, i, r, n, o, l) {
    var d = {};
    n && (d.backgroundColor = n, "fixed" === a ? (d.width = i, d.height = r, d.backgroundColor = n, d.position = "relative") : ("constrained" === a || "fullWidth" === a) && (d.position = "absolute", d.top = 0, d.left = 0, d.bottom = 0, d.right = 0)), o && (d.objectFit = o), l && (d.objectPosition = l);
    var u = s({}, e, {
      "aria-hidden": !0,
      "data-placeholder-image": "",
      style: s({
        opacity: 1,
        transition: "opacity 500ms linear"
      }, d)
    });
    return N() || (u.style = {
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      width: "100%"
    }), u;
  }(E, 0, y, v, w, k, p, m))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(q, s({
    "data-gatsby-image-ssr": "",
    className: c
  }, f, function (e, t, a, i, r, n, o, l) {
    return void 0 === l && (l = {}), N() || (l = s({
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      transform: "translateZ(0)",
      transition: "opacity 250ms linear",
      width: "100%",
      willChange: "opacity"
    }, l)), s({}, a, {
      loading: i,
      shouldLoad: e,
      "data-main-image": "",
      style: s({}, l, {
        opacity: 0
      }),
      onLoad: function (e) {
        var t = e.currentTarget,
            a = new Image();
        a.src = t.currentSrc, a.decode ? a.decode().catch(function () {}).then(function () {
          r(!0);
        }) : r(!0);
      },
      ref: void 0
    });
  }("eager" === u, 0, I, u, void 0, 0, 0, h)))));
},
    Z = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions"],
    J = function (t) {
  return function (a) {
    var i = a.src,
        r = a.__imageData,
        n = a.__error,
        o = l(a, Z);
    return n && console.warn(n), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, s({
      image: r
    }, o)) : (console.warn("Image not loaded", i), n || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
  };
}(Y),
    K = function (e, t) {
  return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_3___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_3___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
},
    Q = new Set(["fixed", "fullWidth", "constrained"]),
    $ = {
  src: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired),
  alt: function (e, t, a) {
    return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_3___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
  },
  width: K,
  height: K,
  sizes: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  layout: function (e) {
    if (void 0 !== e.layout && !Q.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
  }
};

J.displayName = "StaticImage", J.propTypes = $;


/***/ }),

/***/ "./src/components/Footer/InvestimentosMenu/index.js":
/*!**********************************************************!*\
  !*** ./src/components/Footer/InvestimentosMenu/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_956638909_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../public/page-data/sq/d/956638909.json */ "./public/page-data/sq/d/956638909.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");




const SubMenu = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.StaticQuery, {
  query: "956638909",
  render: data => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("ul", {
    className: "footer__menu"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: "https://maquinadossonhos.be.capital/",
    className: "menu__link"
  }, "Planejamento Financeiro")), data.allWpServico.edges.map(page => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
    className: "menu__item",
    key: page.node.id
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
    to: `/${page.node.slug}`,
    className: "menu__link"
  }, page.node.title)))),
  data: _public_page_data_sq_d_956638909_json__WEBPACK_IMPORTED_MODULE_0__
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubMenu);

/***/ }),

/***/ "./src/components/Footer/index.js":
/*!****************************************!*\
  !*** ./src/components/Footer/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _InvestimentosMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InvestimentosMenu */ "./src/components/Footer/InvestimentosMenu/index.js");





const Footer = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("section", {
    className: "footer__section footer__section--header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    src: "../../images/logo_becapital_2x.png",
    alt: "logo BeCapital",
    className: "footer__logo",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/535489621.json */ "./.cache/caches/gatsby-plugin-image/535489621.json")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "footer__title footer--andress"
  }, "Av. Rio Branco, 108 | 8\xBA andar - Centro - Rio de Janeiro - RJ"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "mailto:imprensa@be.capital",
    className: "footer__link"
  }, "imprensa@be.capital"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("section", {
    className: "footer__section footer__section--main"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "footer__title"
  }, "Investimentos"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_InvestimentosMenu__WEBPACK_IMPORTED_MODULE_2__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "footer__title"
  }, "Conte\xFAdos"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "footer__menu"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://www.youtube.com/channel/UCLImIm6777cZiGmjaRuFcwQ?view_as=subscriber",
    className: "menu__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Canal no Youtube")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://t.me/becapitalresearch",
    className: "menu__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Grupo no Telegram")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/blog/",
    className: "menu__link"
  }, "Blog")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "footer__title"
  }, "Nossa Empresa"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "footer__menu"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/somos-becapital/",
    className: "menu__link"
  }, "A BeCapital")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "menu__item width200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://api.whatsapp.com/send?phone=5521965431886&text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20planejamento%20financeiro.%20O%20que%20devo%20fazer%3F%20Poderia%20me%20ajudar%3F",
    className: "menu__link"
  }, " Fale com a Beca - Atendimento da BeCapital ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/carreiras/",
    className: "menu__link"
  }, "P\xE1gina de Carreiras")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    src: "../../images/qrcode_3x.png",
    alt: "QRCode BeCapital",
    className: "qrcode",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/3726475015.json */ "./.cache/caches/gatsby-plugin-image/3726475015.json")
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("section", {
    className: "footer__section footer__section--footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "footer__title"
  }, "Siga a BeCapital"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "footer__social social__menu"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "social__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://www.instagram.com/becapital.oficial/",
    className: "social__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    src: "../../images/icon_instagram_orange.png",
    alt: "Logo Instagram",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/2154065702.json */ "./.cache/caches/gatsby-plugin-image/2154065702.json")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "social__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://www.youtube.com/channel/UCLImIm6777cZiGmjaRuFcwQ?view_as=subscriber",
    className: "social__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    src: "../../images/icon_youtube_orange.png",
    alt: "Logo Youtube",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/3182300424.json */ "./.cache/caches/gatsby-plugin-image/3182300424.json")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "social__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://www.linkedin.com/company/71399542/",
    className: "social__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    src: "../../images/icon_linkedin_orange.png",
    alt: "Logo Linkedin",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/2095264300.json */ "./.cache/caches/gatsby-plugin-image/2095264300.json")
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "footer__title"
  }, "Hor\xE1rio de atendimento"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "footer__text"
  }, "Segunda a Sexta de 9h \xE0s 18h")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: "footer__title"
  }, "Contato para atendimento"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "footer__text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "tel:+552139939670"
  }, "(21) 3993 - 9670"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer__section--column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://www2.susep.gov.br/safe/Corretores/pesquisa",
    className: "social__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    src: "../../images/logo_susep_1x.png",
    alt: "Logo SUSEP",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/1537072282.json */ "./.cache/caches/gatsby-plugin-image/1537072282.json")
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("section", {
    className: "footer__section footer__end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", {
    className: "footer__title"
  }, "BeCapital ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "\xAE"), " Todos os direitos reservados - CNPJ: 36.664.223/0001-09"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", {
    className: "footer__text"
  }, "A BeCapital Live Corretora de Seguros LTDA  (CNPJ 29.761.563/0001-84) est\xE1 registrada na Susep com o c\xF3digo 212113018, estando autorizada a comercializar produtos como: micro-seguros, plano de capitaliza\xE7\xE3o, seguro de pessoas, plano de previd\xEAncia complementar e seguro de danos.")))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/components/Header/Header.js":
/*!*****************************************!*\
  !*** ./src/components/Header/Header.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _SubMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubMenu */ "./src/components/Header/SubMenu/index.js");





const Header = () => {
  const {
    0: isActive,
    1: setActive
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  const toggleClass = () => {
    setActive(!isActive);
    document.querySelector('.header').classList.toggle('active');
  };

  const isCurrent = ({
    current
  }) => {
    return current ? {
      className: "header__menu_link_current"
    } : {};
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("header", {
    className: "header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "header__content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    src: "../../images/logo_becapital_2x.png",
    alt: "logo BeCapital",
    className: "header__logo header__logo--mobile",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/535489621.json */ "./.cache/caches/gatsby-plugin-image/535489621.json")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    src: "../../images/logo_2_becapital_1x.png",
    alt: "logo BeCapital",
    className: "header__logo header__logo--desktop",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/3255117786.json */ "./.cache/caches/gatsby-plugin-image/3255117786.json")
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "burguer__container",
    onClick: toggleClass,
    onKeyDown: toggleClass
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: isActive ? 'header__menu active' : 'header__menu'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: isActive ? 'burguer__container active' : 'burguer__container',
    onClick: toggleClass,
    onKeyDown: toggleClass
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    className: "header__menu_nav"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "header__menu_items"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "header__menu_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/",
    className: "header__menu_link",
    getProps: isCurrent
  }, "Home")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "header__menu_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/somos-becapital/",
    className: "header__menu_link",
    getProps: isCurrent
  }, "Somos BeCapital")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "header__menu_item header__menu_item--children"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "header__menu_link--children"
  }, "Seja BeCapital ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "6",
    height: "5",
    viewBox: "0 0 6 5",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M3 5L0.401925 0.5L5.59808 0.5L3 5Z",
    fill: "#EA5E45"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    className: "header__submenu"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SubMenu__WEBPACK_IMPORTED_MODULE_2__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "header__menu_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/blog/",
    className: "header__menu_link",
    getProps: isCurrent
  }, "Blog")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "header__menu_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/carreiras/",
    className: "header__menu_link",
    getProps: isCurrent
  }, "Carreiras")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "button__container header__button_cta"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://app.be.capital/#/auth",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "button button__primary"
  }, "Login"))))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/components/Header/SubMenu/index.js":
/*!************************************************!*\
  !*** ./src/components/Header/SubMenu/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_956638909_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../public/page-data/sq/d/956638909.json */ "./public/page-data/sq/d/956638909.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");




const isCurrent = ({
  current
}) => {
  return current ? {
    className: "header__menu_link_current"
  } : {};
};

const SubMenu = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.StaticQuery, {
  query: "956638909",
  render: data => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("ul", {
    className: "header__submenu_items"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
    className: "header__submenu_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: "https://maquinadossonhos.be.capital/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "header__submenu_link"
  }, "Planejamento Financeiro")), data.allWpServico.edges.map(page => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
    className: "header__submenu_item",
    key: page.node.id
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
    to: `/${page.node.slug}`,
    className: "header__submenu_link",
    getProps: isCurrent
  }, page.node.title)))),
  data: _public_page_data_sq_d_956638909_json__WEBPACK_IMPORTED_MODULE_0__
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubMenu);

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header/Header */ "./src/components/Header/Header.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer/index.js");



function Layout({
  children
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Header_Header__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", null, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Footer__WEBPACK_IMPORTED_MODULE_2__["default"], null));
}

/***/ }),

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_848497233_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/848497233.json */ "./public/page-data/sq/d/848497233.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");


/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */




const Seo = ({
  description,
  lang,
  meta,
  title
}) => {
  var _wp$generalSettings, _wp$generalSettings2;

  const {
    wp,
    wpUser
  } = _public_page_data_sq_d_848497233_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || ((_wp$generalSettings = wp.generalSettings) === null || _wp$generalSettings === void 0 ? void 0 : _wp$generalSettings.description);
  const defaultTitle = (_wp$generalSettings2 = wp.generalSettings) === null || _wp$generalSettings2 === void 0 ? void 0 : _wp$generalSettings2.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet, {
    htmlAttributes: {
      lang
    },
    title: title,
    titleTemplate: defaultTitle ? `%s  ${defaultTitle}` : null,
    meta: [{
      name: `description`,
      content: metaDescription
    }, {
      property: `og:title`,
      content: title
    }, {
      property: `og:description`,
      content: metaDescription
    }, {
      property: `og:type`,
      content: `website`
    }, {
      name: `twitter:card`,
      content: `summary`
    }, {
      name: `twitter:creator`,
      content: (wpUser === null || wpUser === void 0 ? void 0 : wpUser.twitter) || ``
    }, {
      name: `twitter:title`,
      content: title
    }, {
      name: `twitter:description`,
      content: metaDescription
    }].concat(meta)
  });
};

Seo.defaultProps = {
  lang: `pt-br`,
  meta: [],
  description: ``
};
Seo.propTypes = {
  description: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  lang: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  meta: prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ "./src/pages/404.js":
/*!**************************!*\
  !*** ./src/pages/404.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");
/* harmony import */ var _images_404_gif_gif__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/404-gif.gif */ "./src/images/404-gif.gif");
/* harmony import */ var _images_adesivo_top_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/adesivo_top.svg */ "./src/images/adesivo_top.svg");
/* harmony import */ var _images_adesivo_bottom_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/adesivo_bottom.svg */ "./src/images/adesivo_bottom.svg");





 // markup

const NotFoundPage = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "404 Not Found |"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header--error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
    className: "section__title not-page__title"
  }, "Parece que a gente n\xE3o esperava por essa...")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "section section__error-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("figure", {
    className: "error-page__figure"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    className: "adesivo-top",
    src: _images_adesivo_top_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
    alt: "adesivo superior para segurar o gif",
    width: "81",
    height: "56"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: _images_404_gif_gif__WEBPACK_IMPORTED_MODULE_3__["default"],
    alt: "Error 404",
    width: "250",
    height: "143",
    className: "error-page__image"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    className: "adesivo-bottom",
    src: _images_adesivo_bottom_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
    alt: "adesivo inferior para segurar o gif",
    width: "61",
    height: "60"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "error-page__info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "paragraph"
  }, "Relaxa, nossos desenvolvedores est\xE3o trabalhando assiduamente para construir mais essa p\xE1gina."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "title"
  }, "Enquanto isso, pra onde voc\xEA quer ir? "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
    className: "social__items"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
    className: "social__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: "https://t.me/becapitalresearch",
    className: "social__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "48",
    height: "47",
    viewBox: "0 0 48 47",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    x: "0.837891",
    y: "0.716003",
    width: "46.284",
    height: "46.284",
    rx: "13.6129",
    fill: "#EA5E45"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M23.6269 31.8692C22.7772 32.6827 21.9398 33.4833 21.0963 34.2904C20.9288 34.4505 20.7676 34.617 20.5939 34.7708C20.0481 35.2447 19.3038 35.1294 18.944 34.4953C18.7641 34.1751 18.6339 33.8228 18.5284 33.4705C17.9454 31.5169 17.3748 29.5569 16.8103 27.5969C16.7483 27.3856 16.6553 27.2895 16.4568 27.219C14.8937 26.6746 13.3307 26.1237 11.7739 25.5665C11.3459 25.4128 10.9675 25.1822 10.7132 24.7786C10.3287 24.1637 10.3969 23.4976 10.9241 23.0172C11.1474 22.8186 11.4079 22.6521 11.6808 22.5304C18.6773 19.4303 25.68 16.3366 32.6764 13.2493C32.8935 13.1532 33.1168 13.0635 33.3463 13.0123C34.4318 12.7753 35.2443 13.5055 35.1016 14.6392C34.9838 15.5679 34.7977 16.4903 34.624 17.4062C33.7061 22.3767 32.7757 27.3471 31.8577 32.324C31.7088 33.1118 31.5724 33.8932 31.4173 34.6811C31.225 35.6803 30.1396 36.3336 29.0976 36.0454C28.8185 35.9685 28.5393 35.8148 28.3098 35.6291C26.8274 34.4505 25.3574 33.2591 23.8812 32.0742C23.8068 32.0037 23.72 31.9461 23.6269 31.8692ZM21.9522 29.0637C21.9895 29.1086 22.0081 29.1342 22.0267 29.1534C24.365 31.0173 26.7034 32.8876 29.0417 34.7515C29.6124 35.2063 30.2202 34.9501 30.3567 34.2199C30.6172 32.8172 30.8715 31.4144 31.132 30.0117C32.0686 24.9644 33.0114 19.9235 33.948 14.8762C33.979 14.7225 33.979 14.5559 33.9852 14.3958C33.9914 14.21 33.8921 14.114 33.7123 14.146C33.5138 14.1844 33.3029 14.2293 33.1168 14.3061C26.9329 17.0347 20.7427 19.7698 14.5588 22.4984C13.6967 22.8827 12.8283 23.2542 11.9724 23.6513C11.4948 23.8691 11.4886 24.042 11.9227 24.3367C12.0344 24.4135 12.1584 24.4776 12.2825 24.5224C13.7835 25.0541 15.2907 25.5793 16.7917 26.1237C17.0212 26.207 17.1825 26.1878 17.3872 26.0469C21.3072 23.3375 25.2396 20.6345 29.1658 17.9315C29.5504 17.6625 29.9349 17.3934 30.3257 17.1372C30.5862 16.9643 30.8715 17.0091 31.0576 17.2141C31.2499 17.4255 31.2561 17.7137 31.0762 17.9763C31.0328 18.034 30.9831 18.0916 30.9397 18.1492C30.0838 19.1933 29.2278 20.2309 28.3719 21.2686C26.2382 23.8627 24.1045 26.4568 21.9522 29.0637ZM17.84 27.1229C18.4354 29.1598 19.0246 31.1838 19.6201 33.2079C19.6883 33.163 19.7007 33.1246 19.7131 33.0862C19.9798 31.8372 20.2403 30.5882 20.5257 29.3455C20.5877 29.0893 20.7055 28.8203 20.873 28.6218C22.5787 26.5337 24.2968 24.452 26.0087 22.3703C26.5049 21.7682 27.0011 21.1597 27.4973 20.5576C27.4849 20.5448 27.4725 20.5256 27.4601 20.5128C24.2534 22.7033 21.0529 24.9067 17.84 27.1229ZM20.9226 32.7787C20.9474 32.7851 20.9722 32.798 20.997 32.8044C21.5677 32.2599 22.1321 31.7155 22.7276 31.1454C22.3058 30.8187 21.915 30.5177 21.4808 30.1846C21.2886 31.0878 21.1087 31.9333 20.9226 32.7787Z",
    fill: "white"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
    className: "social__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: "https://www.youtube.com/channel/UCLImIm6777cZiGmjaRuFcwQ?view_as=subscriber",
    className: "social__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "47",
    height: "47",
    viewBox: "0 0 47 47",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    x: "0.461914",
    y: "0.715973",
    width: "46.284",
    height: "46.284",
    rx: "13.6129",
    fill: "#EA5E45"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M31.8393 13.8298H15.0058C13.8082 13.8298 12.6596 14.3306 11.8128 15.2219C10.966 16.1133 10.4902 17.3223 10.4902 18.583L10.4902 28.9288C10.4902 30.1894 10.966 31.3984 11.8128 32.2898C12.6596 33.1812 13.8082 33.682 15.0058 33.682H31.8393C32.4323 33.682 33.0195 33.559 33.5673 33.3202C34.1152 33.0813 34.613 32.7312 35.0323 32.2898C35.4516 31.8484 35.7842 31.3244 36.0111 30.7478C36.238 30.1711 36.3548 29.553 36.3548 28.9288V18.583C36.3548 17.9588 36.238 17.3407 36.0111 16.764C35.7842 16.1873 35.4516 15.6633 35.0323 15.2219C34.613 14.7806 34.1152 14.4305 33.5673 14.1916C33.0195 13.9527 32.4323 13.8298 31.8393 13.8298ZM34.7383 28.9288C34.7383 29.3295 34.6633 29.7264 34.5176 30.0966C34.3719 30.4668 34.1584 30.8032 33.8892 31.0866C33.62 31.3699 33.3004 31.5947 32.9487 31.7481C32.597 31.9014 32.22 31.9804 31.8393 31.9804H15.0058C14.2369 31.9804 13.4995 31.6589 12.9559 31.0866C12.4122 30.5143 12.1068 29.7381 12.1068 28.9288V18.583C12.1068 17.7736 12.4122 16.9975 12.9559 16.4252C13.4995 15.8529 14.2369 15.5314 15.0058 15.5314H31.8393C32.22 15.5314 32.597 15.6103 32.9487 15.7637C33.3004 15.917 33.62 16.1418 33.8892 16.4252C34.1584 16.7085 34.3719 17.0449 34.5176 17.4152C34.6633 17.7854 34.7383 18.1822 34.7383 18.583V28.9288Z",
    fill: "white"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M21.1583 17.6868C21.0364 17.6059 20.8961 17.5608 20.752 17.5561C20.6079 17.5515 20.4653 17.5874 20.3389 17.6603C20.2124 17.7332 20.1068 17.8404 20.033 17.9707C19.9592 18.101 19.9198 18.2498 19.9189 18.4015V28.2255C19.9198 28.3772 19.9592 28.526 20.033 28.6563C20.1068 28.7866 20.2124 28.8938 20.3389 28.9667C20.4653 29.0396 20.6079 29.0756 20.752 29.0709C20.8961 29.0663 21.0364 29.0211 21.1583 28.9402L28.4543 24.0282C28.5677 23.9511 28.661 23.8452 28.7256 23.7204C28.7901 23.5956 28.824 23.4557 28.824 23.3135C28.824 23.1714 28.7901 23.0315 28.7256 22.9066C28.661 22.7818 28.5677 22.676 28.4543 22.5988L21.1583 17.6868ZM21.5355 26.6714V19.9556L26.5252 23.3589L21.5355 26.6714Z",
    fill: "white"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
    className: "social__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: "https://twitter.com/beresearch_",
    className: "social__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "47",
    height: "47",
    viewBox: "0 0 47 47",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    x: "0.0869141",
    y: "0.715973",
    width: "46.284",
    height: "46.284",
    rx: "13.6129",
    fill: "#EA5E45"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M10.994 31.6322C10.9557 31.8212 10.981 32.0181 11.0658 32.19C11.1506 32.3619 11.2897 32.4984 11.4598 32.5766C14.2747 33.9426 17.3339 34.6818 20.4406 34.7467C23.2242 34.79 25.9588 33.9847 28.3056 32.4305C30.2081 31.1386 31.7734 29.3785 32.862 27.307C33.9507 25.2355 34.5291 22.9167 34.5456 20.5571V20.0512L36.4848 18.6007C36.6074 18.5143 36.705 18.3948 36.7669 18.255C36.8288 18.1152 36.8527 17.9605 36.836 17.8076C36.8192 17.6548 36.7625 17.5096 36.672 17.3877C36.5814 17.2659 36.4605 17.1721 36.3223 17.1165L34.8164 16.4419L35.6614 14.5305C35.7201 14.3821 35.7369 14.2195 35.7097 14.0616C35.6824 13.9037 35.6124 13.7572 35.5078 13.6392C35.4032 13.5211 35.2683 13.4365 35.119 13.3953C34.9697 13.354 34.8121 13.3577 34.6648 13.4061L32.3139 14.2157C31.325 13.4098 30.1046 12.9704 28.8473 12.9676C27.3397 12.9706 25.8948 13.5935 24.8288 14.6998C23.7628 15.8062 23.1626 17.3059 23.1598 18.8706V19.2753C20.2131 19.6351 17.3965 18.0723 14.2981 14.3843C14.198 14.2658 14.0679 14.1788 13.9226 14.1331C13.7773 14.0874 13.6225 14.0849 13.4759 14.1259C13.3292 14.1668 13.1966 14.2497 13.093 14.3649C12.9894 14.4801 12.919 14.6232 12.8898 14.7779C12.4446 16.6897 12.6316 18.7014 13.4206 20.4897L11.9148 20.2873C11.7854 20.2664 11.6531 20.2784 11.5291 20.3221C11.4051 20.3658 11.2931 20.4399 11.2027 20.5382C11.1123 20.6364 11.0461 20.7559 11.0097 20.8865C10.9734 21.017 10.968 21.1548 10.994 21.288C11.1148 22.1991 11.4342 23.0696 11.9279 23.8334C12.4216 24.5971 13.0766 25.234 13.8431 25.6955L13.139 25.9653C13.0373 26.0071 12.9449 26.0698 12.8671 26.1495C12.7893 26.2293 12.7279 26.3245 12.6864 26.4295C12.6449 26.5344 12.6243 26.647 12.6257 26.7605C12.6272 26.8739 12.6507 26.9859 12.6948 27.0897C13.063 27.8646 13.6058 28.5359 14.2772 29.0467C14.9485 29.5576 15.7287 29.8929 16.5515 30.0243C15.0356 30.6348 13.4215 30.9401 11.7956 30.9238C11.6027 30.9239 11.4162 30.9952 11.2693 31.125C11.1224 31.2548 11.0248 31.4345 10.994 31.6322ZM19.5631 30.2379C19.6956 30.1362 19.7952 29.995 19.8486 29.8331C19.902 29.6712 19.9066 29.4963 19.862 29.3316C19.8173 29.1668 19.7254 29.0201 19.5985 28.9109C19.4716 28.8017 19.3157 28.7351 19.1514 28.72C16.8548 28.5289 15.5006 28.2366 14.634 27.1797L16.6598 26.4151C16.8318 26.3502 16.9778 26.227 17.0739 26.0653C17.17 25.9036 17.2107 25.713 17.1894 25.5243C17.1681 25.3356 17.086 25.1599 16.9564 25.0257C16.8269 24.8914 16.6575 24.8065 16.4756 24.7848C15.7007 24.7539 14.9512 24.4899 14.3184 24.0247C13.6855 23.5595 13.1967 22.9134 12.9115 22.165L15.2298 22.5248C15.4024 22.551 15.5787 22.5189 15.7324 22.4332C15.8861 22.3474 16.0091 22.2126 16.0832 22.0486C16.1573 21.8847 16.1786 21.7003 16.1439 21.5228C16.1092 21.3453 16.0204 21.1841 15.8906 21.0631C15.3327 20.5355 14.8989 19.882 14.6228 19.1529C14.3467 18.4238 14.2356 17.6386 14.2981 16.8579C17.5481 20.2311 20.7981 21.5466 24.1456 20.827C24.3282 20.7883 24.4925 20.6856 24.6108 20.5362C24.7292 20.3867 24.7944 20.1996 24.7956 20.0062V18.8818C24.7917 18.0635 25.0185 17.2619 25.4481 16.5758C25.8777 15.8897 26.4913 15.349 27.2133 15.0203C27.9354 14.6916 28.7343 14.5893 29.5116 14.7261C30.2889 14.8628 31.0107 15.2326 31.5881 15.7898C31.6954 15.8929 31.8275 15.964 31.9705 15.9957C32.1135 16.0273 32.2621 16.0184 32.4006 15.9697L33.4081 15.6211L32.9964 16.5544C32.9532 16.6592 32.9309 16.772 32.9309 16.8861C32.9309 17.0001 32.9532 17.1129 32.9964 17.2177C33.0939 17.4763 33.1156 17.5326 34.3831 18.106L33.2998 18.938C33.1954 19.0165 33.1105 19.1196 33.0521 19.2389C32.9937 19.3582 32.9635 19.4901 32.9639 19.6239V20.5571C32.9498 22.6349 32.441 24.6768 31.4827 26.5012C30.5244 28.3256 29.1465 29.8757 27.4714 31.0138C24.2214 33.2625 19.9423 33.6335 15.3165 32.2393C16.8442 31.866 18.2868 31.1861 19.5631 30.2379Z",
    fill: "white"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
    className: "social__item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: "https://www.linkedin.com/company/71399542/",
    className: "social__link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    width: "47",
    height: "47",
    viewBox: "0 0 47 47",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    x: "0.724609",
    y: "0.747437",
    width: "46.1791",
    height: "46.1791",
    rx: "13.6136",
    fill: "#EA5E45"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    "clip-path": "url(#clip0)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M11.5092 19.3842C11.2905 19.3842 11.0807 19.471 10.9261 19.6257C10.7715 19.7803 10.6846 19.9901 10.6846 20.2088V35.5248C10.6846 35.7435 10.7715 35.9533 10.9261 36.1079C11.0807 36.2626 11.2905 36.3495 11.5092 36.3495H16.8528C17.0715 36.3495 17.2812 36.2626 17.4359 36.1079C17.5905 35.9533 17.6774 35.7435 17.6774 35.5248V20.2088C17.6774 19.9901 17.5905 19.7803 17.4359 19.6257C17.2812 19.471 17.0715 19.3842 16.8528 19.3842H11.5092ZM16.0281 34.7002H12.3338V21.0334H16.0281V34.7002Z",
    fill: "white"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M30.2893 19.3732C28.9302 19.3822 27.5953 19.7339 26.4081 20.3957V20.2088C26.4081 19.9901 26.3212 19.7803 26.1666 19.6257C26.0119 19.471 25.8022 19.3841 25.5835 19.3841H19.976C19.7573 19.3841 19.5475 19.471 19.3929 19.6257C19.2382 19.7803 19.1514 19.9901 19.1514 20.2088V35.5248C19.1514 35.7435 19.2382 35.9533 19.3929 36.1079C19.5475 36.2626 19.7573 36.3495 19.976 36.3495H25.5944C25.8132 36.3495 26.0229 36.2626 26.1775 36.1079C26.3322 35.9533 26.4191 35.7435 26.4191 35.5248V27.5534C26.4191 27.1467 26.5807 26.7565 26.8683 26.4689C27.156 26.1812 27.5461 26.0196 27.9529 26.0196C28.3597 26.0196 28.7498 26.1812 29.0374 26.4689C29.3251 26.7565 29.4867 27.1467 29.4867 27.5534V35.5248C29.4867 35.7435 29.5736 35.9533 29.7282 36.1079C29.8829 36.2626 30.0926 36.3495 30.3113 36.3495H36.2046C36.4233 36.3495 36.6331 36.2626 36.7877 36.1079C36.9424 35.9533 37.0293 35.7435 37.0293 35.5248V27.6854C37.0073 22.5507 34.4454 19.3732 30.2893 19.3732ZM35.369 34.7002H31.1249V27.5534C31.1249 26.7092 30.7896 25.8996 30.1926 25.3027C29.5957 24.7057 28.7861 24.3704 27.9419 24.3704C27.0977 24.3704 26.2881 24.7057 25.6911 25.3027C25.0942 25.8996 24.7588 26.7092 24.7588 27.5534V34.7002H20.8006V21.0334H24.7698V21.957C24.7698 22.1174 24.8166 22.2744 24.9045 22.4087C24.9924 22.5429 25.1175 22.6487 25.2646 22.7128C25.4116 22.777 25.5742 22.7969 25.7324 22.7701C25.8906 22.7432 26.0375 22.6708 26.1552 22.5617C27.3218 21.5925 28.7838 21.0496 30.3003 21.0224C33.5219 21.0224 35.38 23.4523 35.38 27.6854L35.369 34.7002Z",
    fill: "white"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M14.1815 18.4827C14.8887 18.4849 15.5807 18.2772 16.1698 17.8859C16.7589 17.4945 17.2186 16.9372 17.4907 16.2845C17.7629 15.6317 17.8352 14.9129 17.6986 14.219C17.5619 13.5251 17.2225 12.8874 16.7232 12.3865C16.2239 11.8857 15.5872 11.5442 14.8937 11.4055C14.2002 11.2667 13.4812 11.3368 12.8276 11.607C12.174 11.8771 11.6153 12.3351 11.2221 12.923C10.829 13.5108 10.6191 14.2021 10.6191 14.9094C10.6191 15.8552 10.9941 16.7624 11.6619 17.4322C12.3296 18.1021 13.2357 18.4798 14.1815 18.4827ZM14.1815 12.9852C14.5621 12.9852 14.9341 13.0981 15.2505 13.3095C15.5669 13.5209 15.8136 13.8214 15.9592 14.173C16.1048 14.5246 16.1429 14.9115 16.0687 15.2847C15.9944 15.658 15.8112 16.0008 15.5421 16.2699C15.273 16.539 14.9301 16.7223 14.5569 16.7965C14.1837 16.8708 13.7968 16.8327 13.4452 16.687C13.0936 16.5414 12.7931 16.2948 12.5817 15.9784C12.3702 15.6619 12.2574 15.2899 12.2574 14.9094C12.2574 14.3991 12.4601 13.9096 12.821 13.5488C13.1818 13.188 13.6712 12.9852 14.1815 12.9852Z",
    fill: "white"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "clip0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: "26.388",
    height: "26.388",
    fill: "white",
    transform: "translate(10.6191 10.643)"
  }))))))))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFoundPage);

/***/ }),

/***/ "./src/images/404-gif.gif":
/*!********************************!*\
  !*** ./src/images/404-gif.gif ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/404-gif-dfe77cb7b5a1900359d3e4d4e33d31f4.gif");

/***/ }),

/***/ "./src/images/adesivo_bottom.svg":
/*!***************************************!*\
  !*** ./src/images/adesivo_bottom.svg ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/adesivo_bottom-a44a8e1cae4c40f1a95aab9e281726aa.svg");

/***/ }),

/***/ "./src/images/adesivo_top.svg":
/*!************************************!*\
  !*** ./src/images/adesivo_top.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/adesivo_top-5d85fecd3752eab631c03d6ca5af09f2.svg");

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/1537072282.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/1537072282.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/4af0f753ca8f9248fd729f03d88a419b/4186d/logo_susep_1x.png","srcSet":"/static/4af0f753ca8f9248fd729f03d88a419b/c405a/logo_susep_1x.png 31w,\\n/static/4af0f753ca8f9248fd729f03d88a419b/30f8f/logo_susep_1x.png 63w,\\n/static/4af0f753ca8f9248fd729f03d88a419b/4186d/logo_susep_1x.png 125w","sizes":"(min-width: 125px) 125px, 100vw"},"sources":[{"srcSet":"/static/4af0f753ca8f9248fd729f03d88a419b/f7fac/logo_susep_1x.webp 31w,\\n/static/4af0f753ca8f9248fd729f03d88a419b/fa57b/logo_susep_1x.webp 63w,\\n/static/4af0f753ca8f9248fd729f03d88a419b/fae7d/logo_susep_1x.webp 125w","type":"image/webp","sizes":"(min-width: 125px) 125px, 100vw"}]},"width":125,"height":48}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/2095264300.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/2095264300.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e85848","images":{"fallback":{"src":"/static/7dddada8ef1840ba6f197d4f4e4fc0dc/88208/icon_linkedin_orange.png","srcSet":"/static/7dddada8ef1840ba6f197d4f4e4fc0dc/47ee7/icon_linkedin_orange.png 6w,\\n/static/7dddada8ef1840ba6f197d4f4e4fc0dc/86ee2/icon_linkedin_orange.png 13w,\\n/static/7dddada8ef1840ba6f197d4f4e4fc0dc/88208/icon_linkedin_orange.png 25w","sizes":"(min-width: 25px) 25px, 100vw"},"sources":[{"srcSet":"/static/7dddada8ef1840ba6f197d4f4e4fc0dc/eee53/icon_linkedin_orange.webp 6w,\\n/static/7dddada8ef1840ba6f197d4f4e4fc0dc/68795/icon_linkedin_orange.webp 13w,\\n/static/7dddada8ef1840ba6f197d4f4e4fc0dc/2fa99/icon_linkedin_orange.webp 25w","type":"image/webp","sizes":"(min-width: 25px) 25px, 100vw"}]},"width":25,"height":25}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/2154065702.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/2154065702.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e85848","images":{"fallback":{"src":"/static/54590a5c361cdffd247c42aaef19a189/88208/icon_instagram_orange.png","srcSet":"/static/54590a5c361cdffd247c42aaef19a189/47ee7/icon_instagram_orange.png 6w,\\n/static/54590a5c361cdffd247c42aaef19a189/86ee2/icon_instagram_orange.png 13w,\\n/static/54590a5c361cdffd247c42aaef19a189/88208/icon_instagram_orange.png 25w","sizes":"(min-width: 25px) 25px, 100vw"},"sources":[{"srcSet":"/static/54590a5c361cdffd247c42aaef19a189/eee53/icon_instagram_orange.webp 6w,\\n/static/54590a5c361cdffd247c42aaef19a189/68795/icon_instagram_orange.webp 13w,\\n/static/54590a5c361cdffd247c42aaef19a189/2fa99/icon_instagram_orange.webp 25w","type":"image/webp","sizes":"(min-width: 25px) 25px, 100vw"}]},"width":25,"height":25}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/3182300424.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/3182300424.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e85848","images":{"fallback":{"src":"/static/eaa2d799be91cfc0472b1d2fe0377fb0/88208/icon_youtube_orange.png","srcSet":"/static/eaa2d799be91cfc0472b1d2fe0377fb0/47ee7/icon_youtube_orange.png 6w,\\n/static/eaa2d799be91cfc0472b1d2fe0377fb0/86ee2/icon_youtube_orange.png 13w,\\n/static/eaa2d799be91cfc0472b1d2fe0377fb0/88208/icon_youtube_orange.png 25w","sizes":"(min-width: 25px) 25px, 100vw"},"sources":[{"srcSet":"/static/eaa2d799be91cfc0472b1d2fe0377fb0/eee53/icon_youtube_orange.webp 6w,\\n/static/eaa2d799be91cfc0472b1d2fe0377fb0/68795/icon_youtube_orange.webp 13w,\\n/static/eaa2d799be91cfc0472b1d2fe0377fb0/2fa99/icon_youtube_orange.webp 25w","type":"image/webp","sizes":"(min-width: 25px) 25px, 100vw"}]},"width":25,"height":25}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/3255117786.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/3255117786.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e85848","images":{"fallback":{"src":"/static/0ee25e83d3c971e845af0f667476bce3/695d6/logo_2_becapital_1x.png","srcSet":"/static/0ee25e83d3c971e845af0f667476bce3/255ab/logo_2_becapital_1x.png 14w,\\n/static/0ee25e83d3c971e845af0f667476bce3/f1c6c/logo_2_becapital_1x.png 27w,\\n/static/0ee25e83d3c971e845af0f667476bce3/695d6/logo_2_becapital_1x.png 54w","sizes":"(min-width: 54px) 54px, 100vw"},"sources":[{"srcSet":"/static/0ee25e83d3c971e845af0f667476bce3/6412b/logo_2_becapital_1x.webp 14w,\\n/static/0ee25e83d3c971e845af0f667476bce3/391be/logo_2_becapital_1x.webp 27w,\\n/static/0ee25e83d3c971e845af0f667476bce3/78903/logo_2_becapital_1x.webp 54w","type":"image/webp","sizes":"(min-width: 54px) 54px, 100vw"}]},"width":54,"height":53}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/3726475015.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/3726475015.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/770e3532d9dfe63298807186c3707a4a/30e64/qrcode_3x.png","srcSet":"/static/770e3532d9dfe63298807186c3707a4a/4f02a/qrcode_3x.png 112w,\\n/static/770e3532d9dfe63298807186c3707a4a/cdac5/qrcode_3x.png 224w,\\n/static/770e3532d9dfe63298807186c3707a4a/30e64/qrcode_3x.png 447w","sizes":"(min-width: 447px) 447px, 100vw"},"sources":[{"srcSet":"/static/770e3532d9dfe63298807186c3707a4a/c9fa2/qrcode_3x.webp 112w,\\n/static/770e3532d9dfe63298807186c3707a4a/59f5c/qrcode_3x.webp 224w,\\n/static/770e3532d9dfe63298807186c3707a4a/815d2/qrcode_3x.webp 447w","type":"image/webp","sizes":"(min-width: 447px) 447px, 100vw"}]},"width":447,"height":576}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/535489621.json":
/*!**********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/535489621.json ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#f86848","images":{"fallback":{"src":"/static/24c21cde5c54c4eedefe22a3291390bc/ad8bc/logo_becapital_2x.png","srcSet":"/static/24c21cde5c54c4eedefe22a3291390bc/e2860/logo_becapital_2x.png 69w,\\n/static/24c21cde5c54c4eedefe22a3291390bc/3e491/logo_becapital_2x.png 139w,\\n/static/24c21cde5c54c4eedefe22a3291390bc/ad8bc/logo_becapital_2x.png 277w","sizes":"(min-width: 277px) 277px, 100vw"},"sources":[{"srcSet":"/static/24c21cde5c54c4eedefe22a3291390bc/ff0ce/logo_becapital_2x.webp 69w,\\n/static/24c21cde5c54c4eedefe22a3291390bc/1f9cf/logo_becapital_2x.webp 139w,\\n/static/24c21cde5c54c4eedefe22a3291390bc/dc41c/logo_becapital_2x.webp 277w","type":"image/webp","sizes":"(min-width: 277px) 277px, 100vw"}]},"width":277,"height":60.99999999999999}');

/***/ }),

/***/ "./public/page-data/sq/d/848497233.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/848497233.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"wp":{"generalSettings":{"title":"BeCapital","description":"Só mais um site WordPress"}},"wpUser":{"twitter":"aurelio.campos"}}}');

/***/ }),

/***/ "./public/page-data/sq/d/956638909.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/956638909.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"allWpServico":{"edges":[{"node":{"id":"cG9zdDozOA==","title":"Plano de Saúde","slug":"plano-de-saude"}},{"node":{"id":"cG9zdDozNg==","title":"Seguro de Vida","slug":"seguro-de-vida"}},{"node":{"id":"cG9zdDozNA==","title":"Consórcios","slug":"consorcios"}},{"node":{"id":"cG9zdDozMQ==","title":"Câmbio","slug":"cambio"}}]}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-404-js.js.map