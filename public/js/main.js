//import { isMainThread } from "worker_threads";

var firebaseConfig = {
	apiKey: "AIzaSyDBWIM7PRl5OXOz_SV9g8ksBRU60feZ_pM",
	authDomain: "repasoulima.firebaseapp.com",
	databaseURL: "https://repasoulima.firebaseio.com",
	projectId: "repasoulima",
	storageBucket: "repasoulima.appspot.com",
	messagingSenderId: "714818478928",
	appId: "1:714818478928:web:9e7c4f6505793ca2370255"
};

// Initialize Firebase
var defaultProject = firebase.initializeApp(firebaseConfig);

$('input[type="range"]').val(10).change();

function x() {
	(function (window) {

		'use strict';

		function extend(a, b) {
			for (var key in b) {
				if (b.hasOwnProperty(key)) {
					a[key] = b[key];
				}
			}
			return a;
		}

		function CBPFWTabs(el, options) {
			this.el = el;
			this.options = extend({}, this.options);
			extend(this.options, options);
			this._init();
		}

		CBPFWTabs.prototype.options = {
			start: 0
		};

		CBPFWTabs.prototype._init = function () {
			// tabs elems
			this.tabs = [].slice.call(this.el.querySelectorAll('nav > ul > li'));
			// content items
			this.items = [].slice.call(this.el.querySelectorAll('.content-wrap > .col > section'));
			// current index
			this.current = -1;
			// show current content item
			this._show();
			// init events
			this._initEvents();
		};

		CBPFWTabs.prototype._initEvents = function () {
			var self = this;
			this.tabs.forEach(function (tab, idx) {
				tab.addEventListener('click', function (ev) {
					ev.preventDefault();
					self._show(idx);
				});
			});
		};

		CBPFWTabs.prototype._show = function (idx) {
			if (this.current >= 0) {
				this.tabs[this.current].className = this.items[this.current].className = '';
			}
			// change current
			this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
			this.tabs[this.current].className = 'tab-current';
			this.items[this.current].className = 'content-current';
		};

		// add to global namespace
		window.CBPFWTabs = CBPFWTabs;

	})(window);

	; window.Modernizr = function (a, b, c) { function x(a) { j.cssText = a } function y(a, b) { return x(prefixes.join(a + ";") + (b || "")) } function z(a, b) { return typeof a === b } function A(a, b) { return !!~("" + a).indexOf(b) } function B(a, b) { for (var d in a) { var e = a[d]; if (!A(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 } return !1 } function C(a, b, d) { for (var e in a) { var f = b[a[e]]; if (f !== c) return d === !1 ? a[e] : z(f, "function") ? f.bind(d || b) : f } return !1 } function D(a, b, c) { var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + n.join(d + " ") + d).split(" "); return z(b, "string") || z(b, "undefined") ? B(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), C(e, b, c)) } var d = "2.8.3", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k, l = {}.toString, m = "Webkit Moz O ms", n = m.split(" "), o = m.toLowerCase().split(" "), p = {}, q = {}, r = {}, s = [], t = s.slice, u, v = {}.hasOwnProperty, w; !z(v, "undefined") && !z(v.call, "undefined") ? w = function (a, b) { return v.call(a, b) } : w = function (a, b) { return b in a && z(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function (b) { var c = this; if (typeof c != "function") throw new TypeError; var d = t.call(arguments, 1), e = function () { if (this instanceof e) { var a = function () { }; a.prototype = c.prototype; var f = new a, g = c.apply(f, d.concat(t.call(arguments))); return Object(g) === g ? g : f } return c.apply(b, d.concat(t.call(arguments))) }; return e }), p.flexbox = function () { return D("flexWrap") }, p.flexboxlegacy = function () { return D("boxDirection") }; for (var E in p) w(p, E) && (u = E.toLowerCase(), e[u] = p[E](), s.push((e[u] ? "" : "no-") + u)); return e.addTest = function (a, b) { if (typeof a == "object") for (var d in a) w(a, d) && e.addTest(d, a[d]); else { a = a.toLowerCase(); if (e[a] !== c) return e; b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b } return e }, x(""), i = k = null, function (a, b) { function l(a, b) { var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement; return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild) } function m() { var a = s.elements; return typeof a == "string" ? a.split(" ") : a } function n(a) { var b = j[a[h]]; return b || (b = {}, i++ , a[h] = i, j[i] = b), b } function o(a, c, d) { c || (c = b); if (k) return c.createElement(a); d || (d = n(c)); var g; return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g } function p(a, c) { a || (a = b); if (k) return a.createDocumentFragment(); c = c || n(a); var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length; for (; e < g; e++)d.createElement(f[e]); return d } function q(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) { return s.shivMethods ? o(c, a, b) : b.createElem(c) }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function (a) { return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")' }) + ");return n}")(s, b.frag) } function r(a) { a || (a = b); var c = n(a); return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a } var c = "3.7.0", d = a.html5 || {}, e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g, h = "_html5shiv", i = 0, j = {}, k; (function () { try { var a = b.createElement("a"); a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function () { b.createElement("a"); var a = b.createDocumentFragment(); return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined" }() } catch (c) { g = !0, k = !0 } })(); var s = { elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: c, shivCSS: d.shivCSS !== !1, supportsUnknownElements: k, shivMethods: d.shivMethods !== !1, type: "default", shivDocument: r, createElement: o, createDocumentFragment: p }; a.html5 = s, r(b) }(this, b), e._version = d, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function (a) { return B([a]) }, e.testAllProps = D, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + s.join(" ") : ""), e }(this, this.document), function (a, b, c) { function d(a) { return "[object Function]" == o.call(a) } function e(a) { return "string" == typeof a } function f() { } function g(a) { return !a || "loaded" == a || "complete" == a || "uninitialized" == a } function h() { var a = p.shift(); q = 1, a ? a.t ? m(function () { ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1) }, 0) : (a(), h()) : q = 0 } function i(a, c, d, e, f, i, j) { function k(b) { if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { "img" != a && m(function () { t.removeChild(l) }, 50); for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } } var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = { t: d, s: c, e: f, a: i, x: j }; 1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () { k.call(this, r) }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l)) } function j(a, b, c, d, f) { return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this } function k() { var a = B; return a.loader = { load: j, i: 0 }, a } var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) { return "[object Array]" == o.call(a) }, x = [], y = {}, z = { timeout: function (a, b) { return b.length && (a.timeout = b[0]), a } }, A, B; B = function (a) { function b(a) { var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = { url: c, origUrl: c, prefixes: a }, e, f, g; for (f = 0; f < d; f++)g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g)); for (f = 0; f < b; f++)c = x[f](c); return c } function g(a, e, f, g, h) { var i = b(a), j = i.autoCallback; i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () { k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2 }))) } function h(a, b) { function c(a, c) { if (a) { if (e(a)) c || (j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () { var b = 0, c; for (c in a) a.hasOwnProperty(c) && b++; return b }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() } : j[n] = function (a) { return function () { var b = [].slice.call(arguments); a && a.apply(this, b), l() } }(k[n])), g(a[n], j, b, n, h)) } else !c && l() } var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n; c(h ? a.yep : a.nope, !!i), i && c(i) } var i, j, l = this.yepnope.loader; if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++)j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l) }, B.addPrefix = function (a, b) { z[a] = b }, B.addFilter = function (a) { x.push(a) }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) { var k = b.createElement("script"), l, o, e = e || B.errorTimeout; k.src = a; for (o in d) k.setAttribute(o, d[o]); c = j ? h : c || f, k.onreadystatechange = k.onload = function () { !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function () { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n) }, a.yepnope.injectCss = function (a, c, d, e, g, i) { var e = b.createElement("link"), j, c = i ? h : c || f; e.href = a, e.rel = "stylesheet", e.type = "text/css"; for (j in d) e.setAttribute(j, d[j]); g || (n.parentNode.insertBefore(e, n), m(c, 0)) } }(this, document), Modernizr.load = function () { yepnope.apply(window, [].slice.call(arguments, 0)) };

	(function () {

		[].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
			new CBPFWTabs(el);
		});

	})();
}



document.getElementById("btn_salir").addEventListener("click", function () {
	firebase.auth().signOut()
		.then(function () {
			window.location.href = "/salir";
		}).catch(function (error) {
			alert(error)
		});
});


//Ajax
document.getElementById("btn-addCurso").addEventListener("click", function () {
	var carrera = document.getElementById("inputCarrera")
	var curso = document.getElementById("inputCurso")
	var creditos = document.getElementById("inputCreditos")

	if (carrera.value == "" || curso.value == "" || creditos.value == "") {
		document.getElementById("alerta").className = "alert alert-danger alerta border form-label-group d-inline-block"
		document.getElementById("alerta").innerHTML = "No se llenaron todos los campos"
	} else if (!/^([0-9])*$/.test(creditos.value)) {
		document.getElementById("alerta").className = "alert alert-danger alerta border form-label-group d-inline-block"
		document.getElementById("alerta").innerHTML = "No se ha ingresado un número en créditos"
		creditos.value = ""
	} else {
		var course = {
			name: curso.value,
			career: carrera.value,
			credits: creditos.value
		}
		var modification = {
			teacherId: getTeacherId(),
			course: curso.value
		}
		ajaxAddCourse(course)
		ajaxJoinCourseToTeacher(modification)
	}
})

function addToDeck(curso) {
	var cad = document.getElementById("ul_navVar").innerHTML
	document.getElementById("ul_navVar").innerHTML = `<li><a href="#tab-curso-${curso.name}"  class="fa fa-book row"><span>&nbsp;${curso.name}</span></a></li> ${cad}`

	cad = document.getElementById("div_deck").innerHTML
	document.getElementById("div_deck").innerHTML =
		`<section id="cont-curso-${curso.name}">
			<div class="my-4 float-left mx-4 text-center " id="contarTemas">
				<span id="numeroTemas">0</span>
				<br>                                        
					# Temas
				<br>
				<a class="btn btn-sm btn-login mt-4 text-uppercase font-weight-bold verde" data-toggle="modal" data-target="#modal_${(curso.name.replace(/ /g, "_")).split(".").join("")}" id="btn-addCurso-${curso.name}">Crear Tema</a>
			</div>                     
			<div class="card-deck row lg-2">
				<div class="card border-success mb-3" style="max-width: 18rem;">    
					<div class="card-header">
						No hay temas
					</div>
					<div class="card-body text-success">
						<h5 class="card-title"> </h5>
						<p class="card-text"></p>
					</div>    
				</div> 
			</div>
		</section>
		${cad}`


	cad = document.getElementById("div_modal").innerHTML
	document.getElementById("div_modal").innerHTML =
		`<div class="modal fade" id="modal_${(curso.name.replace(/ /g, "_")).split(".").join("")}"  tabindex="-1" role="dialog"
				aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLongTitle"><strong>Crear
									Tema</strong></h5>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<label for="nombreTema">
								Tema para el curso: ${curso.name}
							</label>

							<input id="input_${(curso.name.replace(/ /g, "_")).split(".").join("")}" type="text" name="nombreTema"
								class="form-control form-control-md inputTema" autofocus>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-dismiss="modal">Cancelar</button>
							<a onclick="crearTema('${(curso.name.replace(/ /g, "_")).split(".").join("")}')" type="button" class="btn btn-success crearTema" href="">
								Crear Tema
							</a>
						</div>
					</div>
				</div>
			</div> 
			${cad}`
	x()
}

function ajaxAddCourse(request_body) {
	var url = "/course"
	var req = new XMLHttpRequest()
	req.open("POST", url)
	req.setRequestHeader("Content-type", "application/json")
	req.onreadystatechange = function (evt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText)
				if (response.status == true) {
					console.log("Registro exitoso")
					addToDeck(request_body)
				} else {
					console.log("Error en crear en firestore")
				}
			} else {
				console.log("Error en la conexion")
			}
		}
	}
	req.send(JSON.stringify(request_body))
}

function ajaxJoinCourseToTeacher(request_body) {
	var url = "/courseToTeacher"
	var req = new XMLHttpRequest()
	req.open("PUT", url)
	req.setRequestHeader("Content-type", "application/json")
	req.onreadystatechange = function (evt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText)
				if (response.status == true) {
					window.history.go(0) ; 
				} else {
					console.log("Error en crear en firestore")
				}
			} else {
				console.log("Error en la conexion")
			}
		}
	}
	req.send(JSON.stringify(request_body))
}

function ajaxAddTopic(request_body){//modificar
	
	var url = "/topicToCourse"
	var req = new XMLHttpRequest()
	req.open("PUT", url)
	req.setRequestHeader("Content-type", "application/json")
	req.onreadystatechange = function (evt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText)
				if (response.status == true) {
					console.log("PT")

					console.log("Registro exitoso")

					window.open(`/main/${getTeacherId()}`, "_self") ; 
				} else {
					console.log("Error en crear en firestore")
				}
			} else {
				console.log("Error en la conexion")
			}
		}
	}
	req.send(JSON.stringify(request_body))
}

function getTeacherId() {
	var path = window.location.pathname
	var arr = path.split("/")
	return arr[2]
}

function crearTema(id){
	var topic = {//cambiar
		courseId: id,
		topic: document.getElementById(`input_${(id.replace(/ /g, "_")).split(".").join("")}`).value 
	}

	ajaxAddTopic(topic) ; 	
	die();

	//Cards push + 1
	//var temas = document.getElementById(`temasCartas_${(id.replace(/ /g, "_")).split(".").join("")}}`).innerHTML ;
	//console.log(temas) ; 
	
	//document.getElementById(`temasCartas_${(id.replace(/ /g, "_")).split(".").join("")}}`).innerHTML; 

	//La vieja confiable
	//window.history.go(0) ; 

}

function topicView(courseId, topic){
	window.location.href = `/${getTeacherId()}/${courseId}/${topic}`
	
}

x()

function eliminarCurso(curso){//modificar
	console.log("asfdasdfasdf")
	var url = `/course/${curso}`
	var req = new XMLHttpRequest()
	req.open("DELETE", url)
	req.setRequestHeader("Content-type", "application/json")
	req.onreadystatechange = function (evt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText)
				if (response.status == true) {
					console.log("PT")

					console.log("Registro exitoso")

					window.open(`/main/${getTeacherId()}`, "_self") ; 
				} else {
					console.log("Error en crear en firestore")
				}
			} else {
				console.log("Error en la conexion")
			}
		}
	}
	var json = {msg : ""}
	req.send(JSON.stringify(json))
}


