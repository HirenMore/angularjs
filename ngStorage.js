/*! ngstorage 0.3.10 | Copyright (c) 2016 Gias Kay Lee | MIT License */ ! function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define(["angular"], b) : a.hasOwnProperty("angular") ? b(a.angular) : "object" == typeof exports && (module.exports = b(require("angular")))
}(this, function(a) {

    "use strict";



    function b(a, b) {
        var c;
        try {
            c = a[b]
        } catch (d) {
            c = !1
        }
        if (c) {
            var e = "__" + Math.round(1e7 * Math.random());
            try {
                a[b].setItem(e, e), a[b].removeItem(e, e)
            } catch (d) {
                c = !1
            }
        }
        return c
    }



    function c(c) {

        var d = b(window, c);

        return function() {

            var e = "ngStorage-";

            this.setKeyPrefix = function(a) {

                if ("string" != typeof a) throw new TypeError("[ngStorage] - " + c + "Provider.setKeyPrefix() expects a String.");

                e = a

            };

            var f = a.toJson,

                g = a.fromJson;

            this.setSerializer = function(a) {

                if ("function" != typeof a) throw new TypeError("[ngStorage] - " + c + "Provider.setSerializer expects a function.");

                f = a

            }, this.setDeserializer = function(a) {

                if ("function" != typeof a) throw new TypeError("[ngStorage] - " + c + "Provider.setDeserializer expects a function.");

                g = a

            }, this.supported = function() {
                return !!d
            }, this.get = function(a) {
                return d && g(d.getItem(e + a))
            }, this.set = function(a, b) {
                return d && d.setItem(e + a, f(b))
            }, this.remove = function(a) {
                d && d.removeItem(e + a)
            }, this.$get = ["$rootScope", "$window", "$log", "$timeout", "$document", function(d, h, i, j, k) {

                var l, m, n = e.length,

                    o = b(h, c),

                    p = o || (i.warn("This browser does not support Web Storage!"), {
                        setItem: a.noop,
                        getItem: a.noop,
                        removeItem: a.noop
                    }),

                    q = {

                        $default: function(b) {
                            for (var c in b) a.isDefined(q[c]) || (q[c] = a.copy(b[c]));
                            return q.$sync(), q
                        },

                        $reset: function(a) {
                            for (var b in q) "$" === b[0] || delete q[b] && p.removeItem(e + b);
                            return q.$default(a)
                        },

                        $sync: function() {
                            for (var a, b = 0, c = p.length; c > b; b++)(a = p.key(b)) && e === a.slice(0, n) && (q[a.slice(n)] = g(p.getItem(a)))
                        },

                        $apply: function() {

                            var b;

                            if (m = null, !a.equals(q, l)) {

                                b = a.copy(l), a.forEach(q, function(c, d) {
                                    a.isDefined(c) && "$" !== d[0] && (p.setItem(e + d, f(c)), delete b[d])
                                });

                                for (var c in b) p.removeItem(e + c);

                                l = a.copy(q)

                            }

                        },

                        $supported: function() {
                            return !!o
                        }

                    };

                return q.$sync(), l = a.copy(q), d.$watch(function() {
                    m || (m = j(q.$apply, 100, !1))
                }), h.addEventListener && h.addEventListener("storage", function(b) {

                    if (b.key) {

                        var c = k[0];

                        c.hasFocus && c.hasFocus() || e !== b.key.slice(0, n) || (b.newValue ? q[b.key.slice(n)] = g(b.newValue) : delete q[b.key.slice(n)], l = a.copy(q), d.$apply())

                    }

                }), h.addEventListener && h.addEventListener("beforeunload", function() {
                    q.$apply()
                }), q

            }]

        }

    }

    return a = a && a.module ? a : window.angular, a.module("ngStorage", []).provider("$localStorage", c("localStorage")).provider("$sessionStorage", c("sessionStorage"))

});