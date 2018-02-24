/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents("vx7acovg",function(e,t,n,r,o){function i(e){return void 0!==e&&null!==e}function a(e){return"number"==typeof e}function s(e,t){e||console.error(t)}function u(e){return new Promise(function(t){e.componentOnReady(function(e){t(e)})})}function c(){return document}function l(){return c().activeElement}function d(){var e=l();e&&e.blur&&e.blur()}function v(e){return!!(e&&e.didLoad&&e.willUnload)}function f(e,t,n,r){if(t){if(e.isPortal)return r===Qe&&m(t,e.zIndexOffset+Ze),void Ze++;(n=n||e.getPrevious(t))&&i(n.zIndex)?r===Me?m(t,n.zIndex-1):m(t,n.zIndex+1):m(t,He+e.zIndexOffset)}}function m(e,t){t!==e.zIndex&&(e.zIndex=t,e.element.style.zIndex=""+t)}function p(e,t,n){t!==n&&(e.hidden=n)}function h(e){return!!e&&!!e.getPrevious()}function g(e){return e.registerTransitionStart=function(t){e.transitionStartFunction=t},e.start=function(){this.transitionStartFunction&&this.transitionStartFunction(),this.transitionStartFunction=null,w(e)},e.originalDestroy=e.destroy,e.destroy=function(){y(e)},e}function w(e){e.transitionStartFunction&&e.transitionStartFunction(),e.transitionStartFunction=null,e.parent&&e.parent.start()}function y(e){e.originalDestroy(),e.parent=e.enteringView=e.leavingView=e.transitionStartFunction=null}function T(e){for(e=e.parent;e;){var t=e.transitionId;if(i(t))return t;e=e.parent}return-1}function b(){return Ye++}function V(e){var t=Xe.get(e);t&&(t.destroy(),Xe.delete(e))}function S(e,t,n,r,o,i,a,s){var u=(t.get(e)||s)(r,o,i,a);return u.transitionId=n,Xe.has(n)?Xe.get(n).add(u):Xe.set(n,u),u}function C(e){return e.views&&e.views.length>0?e.views[0]:null}function P(e){return e.views?e.views:[]}function E(e){e.id=k(),e.views=[]}function A(e){return e.views&&e.views.length>0?e.views[e.views.length-1]:null}function I(e,t){return t||(t=e.getActive()),e.views[e.views.indexOf(t)-1]}function k(){return Je++}function x(e){e.navInit.emit(e),e.root&&e.setRoot(e.root)}function D(e,t,n,r){return _(e).then(function(){return e.navController.push(e,t,n,r)})}function N(e,t){return _(e).then(function(){return e.navController.pop(e,t)})}function R(e,t,n,r){return _(e).then(function(){return e.navController.setRoot(e,t,n,r)})}function q(e,t,n,r,o){return _(e).then(function(){return e.navController.insert(e,t,n,r,o)})}function L(e,t,n,r){return _(e).then(function(){return e.navController.insertPages(e,t,n,r)})}function O(e,t){return _(e).then(function(){return e.navController.popToRoot(e,t)})}function G(e,t,n){return _(e).then(function(){return e.navController.popTo(e,t,n)})}function z(e,t,n,r){return _(e).then(function(){return e.navController.remove(e,t,n,r)})}function B(e,t,n){return _(e).then(function(){return e.navController.removeView(e,t,n)})}function F(e,t,n){return _(e).then(function(){return e.navController.setPages(e,t,n)})}function _(e){return e.navController?Promise.resolve():(e.navController=document.querySelector("ion-nav-controller"),u(e.navController))}function j(e,t){e.element!==t.target&&(t.detail.parent=e,e.childNavs||(e.childNavs=[]),e.childNavs.push(t.detail),t.stopPropagation())}function W(e,t,n,r,o){if(void 0===o&&(o={}),!e)return s(this._state===Ue,"ViewController does not have a valid _nav"),Promise.resolve(!1);this.overlay&&!o.minClickBlockDuration&&(o.minClickBlockDuration=400),t.data=n,t.role=r;var i=Object.assign({},this._leavingOpts,o);return e.removeView(this,i).then(function(){return n})}function U(e,t){return s(e.state!==Ue,"view state must be attached"),t?t.removeViewFromDom(e.nav,e):Promise.resolve().then(function(){e.component,e.id=e.data=e.element=e.instance=e.nav=e.dismissProxy=null,e.state=Ue})}function H(e,t){e&&e[t]&&e[t]()}function M(e,t){H(t.instance,"ionViewWillLeave"),e&&t.onWillDismiss&&(t.onWillDismiss(this.dismissProxy.data,this.dismissProxy.proxy),t.onWillDismiss=null)}function Q(e){H(e.instance,"ionViewDidLeave")}function Y(e){s(e.state===We,"view state must be ATTACHED"),H(e.instance,"ionViewDidEnter")}function X(e){s(e.state===je,"view state must be INITIALIZED"),H(e.instance,"ionViewWillLoad")}function Z(e){H(e.instance,"ionViewWillUnLoad"),e.onDidDismiss&&e.onDidDismiss(e.dismissProxy.data,e.dismissProxy.role),e.onDidDismiss=e.dismissProxy=null}function J(e){s(e.state===We,"view state must be ATTACHED"),H(e.instance,"ionViewDidLoad")}function K(e,t){e.state=_e,e.data=t||{}}function $(e,t,n,r){e.enteringView=t,e.leavingView=n;var o="rtl"===document.dir,a=o?"-99.5%":"99.5%",s=o?"33%":"-33%";e.duration(i(r.duration)?r.duration:et),e.easing(i(r.easing)?r.easing:tt),e.addElement(t.element),e.beforeAddClass("show-page");var u="back"===r.direction;if(t){var c=e.create();c.addElement(t.element.querySelectorAll("ion-header > *:not(ion-navbar),ion-footer > *")),e.add(c),u?c.fromTo(ot,s,it,!0).fromTo(nt,at,1,!0):c.beforeClearStyles([nt]).fromTo(ot,a,it,!0);var l=t.element.querySelector("ion-navbar");if(l){var d=e.create();d.addElement(l),e.add(d);var v=e.create();v.addElement(l.querySelector("ion-title"));var f=e.create();f.addElement(l.querySelectorAll("ion-buttons,[menuToggle]"));var m=e.create();m.addElement(l.querySelector(".toolbar-background"));var p=e.create();if(p.addElement(l.querySelector(".back-button")),d.add(v).add(f).add(m).add(p),v.fromTo(nt,.01,1,!0),f.fromTo(nt,.01,1,!0),u)v.fromTo(ot,s,it,!0),h(t.nav)&&p.beforeAddClass(st).fromTo(nt,.01,1,!0);else if(v.fromTo(ot,a,it,!0),m.beforeClearStyles([nt]).fromTo(ot,a,it,!0),h(t.nav)){p.beforeAddClass(st).fromTo(nt,.01,1,!0);var g=e.create();g.addElement(l.querySelector(".back-button-text")),g.fromTo(ot,o?"-100px":"100px","0px"),d.add(g)}else p.beforeRemoveClass(st)}}if(n){var w=e.create();w.addElement(n.element),w.addElement(n.element.querySelectorAll("ion-header > *:not(ion-navbar),ion-footer > *")),e.add(w),u?w.beforeClearStyles([nt]).fromTo(ot,it,o?"-100%":"100%"):w.fromTo(ot,it,s).fromTo(nt,1,at).afterClearStyles([rt,nt]);var y=n.element.querySelector("ion-navbar");if(y){var T=e.create();T.addElement(y);var b=e.create();b.addElement(y.querySelector("ion-title"));var V=e.create();V.addElement(y.querySelectorAll("ion-buttons,[menuToggle]"));var S=e.create();S.addElement(y.querySelector(".toolbar-background"));var C=e.create();if(C.addElement(y.querySelector(".back-button")),T.add(b).add(V).add(C).add(S),this.add(T),C.fromTo(nt,.99,0),b.fromTo(nt,.99,0),V.fromTo(nt,.99,0),u){b.fromTo(ot,it,o?"-100%":"100%"),S.beforeClearStyles([nt]).fromTo(ot,it,o?"-100%":"100%");var P=e.create();P.addElement(y.querySelector(".back-button-text")),P.fromTo(ot,it,(o?-300:300)+"px"),T.add(P)}else b.fromTo(ot,it,s).afterClearStyles([rt]),C.afterClearStyles([nt]),b.afterClearStyles([nt]),V.afterClearStyles([nt])}}return e}function ee(e,t,n,r){e.enteringView=t,e.leavingView=n,e.addElement(t.element),e.beforeAddClass("show-page");var o="back"===r.direction;if(t){o?e.duration(i(r.duration)?r.duration:200).easing("cubic-bezier(0.47,0,0.745,0.715)"):(e.duration(i(r.duration)?r.duration:280).easing("cubic-bezier(0.36,0.66,0.04,1)"),e.fromTo(ut,ct,lt,!0).fromTo("opacity",.01,1,!0));var a=t.element.querySelector("ion-navbar");if(a){var s=e.create();s.addElement(a),e.add(s);var u=e.create();u.addElement(a.querySelector(".back-button")),e.add(u),h(t.nav)?u.beforeAddClass(dt):u.beforeRemoveClass(dt)}}if(n&&o){e.duration(r.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)");var c=e.create();c.addElement(n.element),e.add(c.fromTo(ut,lt,ct).fromTo("opacity",1,0))}return e}function te(e,t,n,r,o,i,a){return de({insertStart:-1,insertViews:[{page:r,params:o}],opts:i,nav:e,delegate:t,id:e.id,animation:n},a)}function ne(e,t,n,r,o,i,a,s){return de({insertStart:r,insertViews:[{page:o,params:i}],opts:a,nav:e,delegate:t,id:e.id,animation:n},s)}function re(e,t,n,r,o,i,a){return de({insertStart:r,insertViews:o,opts:i,nav:e,delegate:t,id:e.id,animation:n},a)}function oe(e,t,n,r,o){return de({removeStart:-1,removeCount:1,opts:r,nav:e,delegate:t,id:e.id,animation:n},o)}function ie(e,t,n,r,o){return de({removeStart:1,removeCount:-1,opts:r,nav:e,delegate:t,id:e.id,animation:n},o)}function ae(e,t,n,r,o,i){var s={removeStart:-1,removeCount:-1,opts:o,nav:e,delegate:t,id:e.id,animation:n};return v(r)?(s.removeView=r,s.removeStart=1):a(r)&&(s.removeStart=r+1),de(s,i)}function se(e,t,n,r,o,i,a){return void 0===o&&(o=1),de({removeStart:r,removeCount:o,opts:i,nav:e,delegate:t,id:e.id,animation:n},a)}function ue(e,t,n,r,o,i){return de({removeView:r,removeStart:0,removeCount:1,opts:o,nav:e,delegate:t,id:e.id,animation:n},i)}function ce(e,t,n,r,o,i,a){return le(e,t,n,[{page:r,params:o}],i,a)}function le(e,t,n,r,o,a){return i(o)||(o={}),!0!==o.animate&&(o.animate=!1),de({insertStart:0,insertViews:r,removeStart:0,removeCount:-1,opts:o,nav:e,delegate:t,id:e.id,animation:n},a)}function de(e,t){var n=new Promise(function(t,n){e.resolve=t,e.reject=n});return e.done=t,e.insertViews&&0===e.insertViews.length&&(e.insertViews=void 0),e.insertViews&&0===e.insertViews.length&&(e.insertViews=void 0),Re(e),ve(e.nav),n}function ve(e){if(e.transitioning)return Promise.resolve();var t=Oe(e.id);if(!t)return Promise.resolve();var n,r;return Ve(t).then(function(o){var i=o[0],a=o[1];return n=i,r=a,be(e,n,t.delegate)}).then(function(){return he(e,n,r,t)}).then(function(e){return fe(e,t)}).catch(function(e){return me(e,t)})}function fe(e,t){if(!qe(t.id))return pe(new Error("Queue is null, the nav must have been destroyed"),t);t.nav.isViewInitialized=!0,t.nav.transitionId=null,t.nav.transitioning=!1,ve(t.nav),t.done&&t.done(e.hasCompleted,e.requiresTransition,e.enteringName,e.leavingName,e.direction),t.resolve(e.hasCompleted)}function me(e,t){if(!qe(t.nav.id))return pe(new Error("Queue is null, the nav must have been destroyed"),t);t.nav.transitionId=null,Le(t.nav.id),t.nav.transitioning=!1,ve(t.nav),pe(e,t)}function pe(e,t){t.done&&t.done(!1,!1,e.message),t.reject&&!t.nav.destroyed?t.reject(e):t.resolve(!1)}function he(e,t,n,r){if(!r.requiresTransition)return Promise.resolve({hasCompleted:!0,requiresTransition:!1});var o=null,i=T(e);e.transitionId=i>=0?i:b();var a={animation:r.opts.animation,direction:r.opts.direction,duration:!1===r.opts.animate?0:r.opts.duration,easing:r.opts.easing,isRTL:!1,ev:r.opts.event},s=g(r.animation);return o=S(a.animation,e.config,e.transitionId,s,t,n,a,Ge(e.config)),e.swipeToGoBackTransition&&(e.swipeToGoBackTransition.destroy(),e.swipeToGoBackTransition=null),o.isRoot()&&r.opts.progressAnimation&&(e.swipeToGoBackTransition=o),o.start(),ge(e,o,t,n,r.delegate,r.opts,r.nav.config.getBoolean("animate"))}function ge(e,t,n,r,o,i,a){s(e.transitioning,"must be transitioning"),e.transitionId=null,f(e,n,r,i.direction),n&&p(n.element,!0,!0),r&&p(r.element,!0,!0);var u=!e.isViewInitialized&&1===e.views.length&&!e.isPortal;(a||u)&&(i.animate=!1),!1===i.animate&&t.duration(0),t.beforeAddRead(function(){Te(n,r)});var c=t.getDuration(),l=new Promise(function(e){t.onFinish(e)});return t.isRoot()&&(c>mt&&i.disableApp,i.progressAnimation?t.progressStart():t.play()),l.then(function(){return we(e,t,o,i)})}function we(e,t,n,r){var o=null;return t.hasCompleted?(t.enteringView&&t.enteringView.didEnter(),t.leavingView&&t.leavingView.didLeave(),o=ye(e,n,t.enteringView)):o=ye(e,n,t.leavingView),o.then(function(){return t.isRoot()&&(V(t.transitionId),e.transitioning=!1,!1!==r.keyboardClose&&d()),{hasCompleted:t.hasCompleted,requiresTransition:!0,direction:r.direction}})}function ye(e,t,n){if(e.destroyed)return Promise.resolve();for(var r=e.views.indexOf(n),o=[],i=e.views.length-1;i>=0;i--){var a=e.views[i];i>r?(a.willUnload(),o.push(Ce(e,t,a))):i<r&&!e.isPortal&&p(a.element,!0,!1)}return Promise.all(o)}function Te(e,t){t&&t.willLeave(!e),e&&e.willEnter()}function be(e,t,n){return t&&t.state===_e?n.attachViewToDom(e,t).then(function(){t.state=We}):Promise.resolve()}function Ve(e){var t=null,n=null;return ke(e).then(function(){var r=Ne(e);return e.insertViews=r,t=e.nav.getActive(),n=xe(e,e.nav,t),t||n?(e.requiresTransition=(e.enteringRequiresTransition||e.leavingRequiresTransition)&&n!==t,Ae(n,t,e)):Promise.reject(new Error("No views in the stack to remove"))}).then(function(){return Se(n,t,e)}).then(function(){return[n,t]})}function Se(e,t,n){return Promise.resolve().then(function(){s(!(!t&&!e),"Both leavingView and enteringView are null"),s(!!n.resolve,"resolve must be valid"),s(!!n.reject,"reject must be valid");var r=[];if(n.opts=n.opts||{},i(n.removeStart)){s(n.removeStart>=0,"removeStart can not be negative"),s(n.removeStart>=0,"removeCount can not be negative");for(a=0;a<n.removeCount;a++)(u=n.nav.views[a+n.removeStart])&&u!==e&&u!==t&&r.push(u);n.opts.direction=n.opts.direction||Me}var o=n.nav.views.length+(n.insertViews?n.insertViews.length:0)-(n.removeCount?n.removeCount:0);if(s(o>=0,"final balance can not be negative"),0===o&&!n.nav.isPortal)throw console.warn("You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times."),new Error("Navigation stack needs at least one root page");if(n.insertViews){i(n.opts.id)&&(e.id=n.opts.id);for(a=0;a<n.insertViews.length;a++)Ee(n.nav,n.insertViews[a],n.insertStart+a);n.enteringRequiresTransition&&(n.opts.direction=n.opts.direction||Qe)}if(r&&r.length){for(var a=0;a<r.length;a++){var u=r[a];u.willLeave(!0),u.didLeave(),u.willUnload()}for(var c=[],l=0,d=r;l<d.length;l++){var v=d[l];c.push(Ce(n.nav,n.delegate,v))}return Promise.all(c)}return null}).then(function(){n.requiresTransition&&!n.opts.animation&&(i(n.removeStart)?n.opts.animation=(t||e).getTransitionName(n.opts.direction):n.opts.animation=(e||t).getTransitionName(n.opts.direction))})}function Ce(e,t,n){return n.destroy(t).then(function(){return Pe(e,n)})}function Pe(e,t){s(t.state===We||t.state===Ue,"view state should be loaded or destroyed");var n=e.views.indexOf(t);s(n>-1,"view must be part of the stack"),n>=0&&e.views.splice(n,1)}function Ee(e,t,n){var r=e.views.indexOf(t);r>-1?(s(t.nav===e,"view is not part of the nav"),e.views.splice(n,0,e.views.splice(r,1)[0])):(s(!t.nav||e.isPortal&&t.nav===e,"nav is used"),t.nav=e,ft++,t.id||(t.id=e.id+"-"+ft),e.views.splice(n,0,t))}function Ae(e,t,n){if(!n.requiresTransition)return Promise.resolve();var r=[];return t&&r.push(Ie(t,"Leave")),e&&r.push(Ie(e,"Enter")),0===r.length?Promise.resolve():Promise.all(r).then(function(e){if(e.some(function(e){return!1===e}))throw n.reject=null,new Error("canEnter/Leave returned false")})}function Ie(e,t){var n="ionViewCan"+t;if(e.instance&&e.instance[n])try{var r=e.instance[n];return r instanceof Promise?r:Promise.resolve(!1!==r)}catch(e){return Promise.reject(new Error("Unexpected error when calling "+n+": "+e.message))}return Promise.resolve(!0)}function ke(e){var t=e.nav.views?e.nav.views.length:0;if(i(e.removeView)){s(i(e.removeStart),"removeView needs removeStart"),s(i(e.removeCount),"removeView needs removeCount");var n=e.nav.views.indexOf(e.removeView());if(n<0)return Promise.reject(new Error("The removeView was not found"));e.removeStart+=n}return i(e.removeStart)&&(e.removeStart<0&&(e.removeStart=t-1),e.removeCount<0&&(e.removeCount=t-e.removeStart),e.leavingRequiresTransition=e.removeCount>0&&e.removeStart+e.removeCount===t),i(e.insertViews)&&((e.insertStart<0||e.insertStart>t)&&(e.insertStart=t),e.enteringRequiresTransition=e.insertStart===t),e.nav.transitioning=!0,Promise.resolve()}function xe(e,t,n){if(e.insertViews&&e.insertViews.length)return e.insertViews[e.insertViews.length-1];if(i(e.removeStart))for(var r=e.removeStart+e.removeCount,o=t.views.length-1;o>=0;o--)if((o<e.removeStart||o>=r)&&t.views[o]!==n)return t.views[o];return null}function De(e){return e.map(function(e){return e?v(e)?e:new $e(e.page,e.params):null}).filter(function(e){return!!e})}function Ne(e){if(e.insertViews){s(e.insertViews.length>0,"length can not be zero");var t=De(e.insertViews);if(s(e.insertViews.length===t.length,"lengths does not match"),0===t.length)throw new Error("No views to insert");for(var n=0,r=t;n<r.length;n++){var o=r[n];if(o.nav&&o.nav.id!==e.id)throw new Error("The view has already inserted into a different nav");if(o.state===Ue)throw new Error("The view has already been destroyed")}return t}return[]}function Re(e){var t=vt.get(e.id)||[];t.push(e),vt.set(e.id,t)}function qe(e){return vt.get(e)||[]}function Le(e){vt.set(e,[])}function Oe(e){var t=qe(e);if(!t.length)return null;var n=t.concat(),r=n.shift();return vt.set(e,n),r}function Ge(e){return"md"===e.get("mode")?ee:$}function ze(e){return Promise.all([Be(e),Fe(e.animationCtrl)])}function Be(e){if(e.delegate)return Promise.resolve(e.delegate);var t=document.createElement("stencil-ion-nav-delegate");return document.body.appendChild(t),u(t).then(function(){return pt=t})}function Fe(e){return e.create()}var _e=1,je=2,We=3,Ue=4,He=100,Me="back",Qe="forward",Ye=0,Xe=new Map,Ze=9999,Je=1e3,Ke=function(){function e(){E(this)}return e.prototype.componentDidLoad=function(){x(this)},e.prototype.getViews=function(){return P(this)},e.prototype.push=function(e,t,n){return D(this,e,t,n)},e.prototype.pop=function(e){return N(this,e)},e.prototype.setRoot=function(e,t,n){return R(this,e,t,n)},e.prototype.insert=function(e,t,n,r){return q(this,e,t,n,r)},e.prototype.insertPages=function(e,t,n){return L(this,e,t,n)},e.prototype.popToRoot=function(e){return O(this,e)},e.prototype.popTo=function(e,t){return G(this,e,t)},e.prototype.remove=function(e,t,n){return z(this,e,t,n)},e.prototype.removeView=function(e,t){return B(this,e,t)},e.prototype.setPages=function(e,t){return F(this,e,t)},e.prototype.getActive=function(){return A(this)},e.prototype.getPrevious=function(e){return I(this,e)},e.prototype.canGoBack=function(e){return e.views&&e.views.length>0},e.prototype.canSwipeBack=function(){return!0},e.prototype.getFirstView=function(){return C(this)},e.prototype.navInitialized=function(e){j(this,e)},e.prototype.render=function(){return t(0,0)},e}(),$e=function(){function e(e,t){this.component=e,K(this,t)}return e.prototype.dismiss=function(e,t,n){return void 0===n&&(n={}),this.dismissProxy={},W(this.nav,this.dismissProxy,e,t,n)},e.prototype.willLeave=function(e){M(e,this)},e.prototype.didLeave=function(){Q(this)},e.prototype.willEnter=function(){H(this.instance,"ionViewWillEnter")},e.prototype.didEnter=function(){Y(this)},e.prototype.willLoad=function(){X(this)},e.prototype.didLoad=function(){J(this)},e.prototype.willUnload=function(){Z(this)},e.prototype.destroy=function(e){return U(this,e)},e.prototype.getTransitionName=function(e){return""},e}(),et=500,tt="cubic-bezier(0.36,0.66,0.04,1)",nt="opacity",rt="transform",ot="translateX",it="0%",at=.8,st="show-back-button",ut="translateY",ct="40px",lt="0px",dt="show-back-button",vt=new Map,ft=2e3,mt=64,pt=null,ht=function(){function e(){}return e.prototype.push=function(e,t,n,r){return ze(this).then(function(o){var i=o[0],a=o[1];return te(e,i,a,t,n,r)})},e.prototype.pop=function(e,t){return ze(this).then(function(n){var r=n[0],o=n[1];return oe(e,r,o,t)})},e.prototype.setRoot=function(e,t,n,r){return ze(this).then(function(o){var i=o[0],a=o[1];return ce(e,i,a,t,n,r)})},e.prototype.insert=function(e,t,n,r,o){return ze(this).then(function(i){var a=i[0],s=i[1];return ne(e,a,s,t,n,r,o)})},e.prototype.insertPages=function(e,t,n,r){return ze(this).then(function(o){var i=o[0],a=o[1];return re(e,i,a,t,n,r)})},e.prototype.popToRoot=function(e,t){return ze(this).then(function(n){var r=n[0],o=n[1];return ie(e,r,o,t)})},e.prototype.popTo=function(e,t,n){return ze(this).then(function(r){var o=r[0],i=r[1];return ae(e,o,i,t,n)})},e.prototype.remove=function(e,t,n,r){return ze(this).then(function(o){var i=o[0],a=o[1];return se(e,i,a,t,n,r)})},e.prototype.removeView=function(e,t,n){return ze(this).then(function(r){var o=r[0],i=r[1];return ue(e,o,i,t,n)})},e.prototype.setPages=function(e,t,n){return ze(this).then(function(r){var o=r[0],i=r[1];return le(e,o,i,t,n)})},e.prototype.render=function(){return t(0,0)},e}(),gt=function(){function e(){}return e.prototype.ionViewDidEnter=function(){console.log("page one did enter")},e.prototype.nextPage=function(){this.element.closest("ion-nav").push("page-two")},e.prototype.render=function(){var e=this;return[t("ion-header",0,t("ion-navbar",0,t("ion-title",0,n("Page One")))),t("ion-content",0,n("Page One Content"),t("div",0,t("ion-button",{o:{click:function(){return e.nextPage()}}},n("Go to Page Two"))))]},e}(),wt=function(){function e(){}return e.prototype.ionViewDidEnter=function(){console.log("page three did enter")},e.prototype.pop=function(){this.element.closest("ion-nav").pop()},e.prototype.render=function(){var e=this;return[t("ion-header",0,t("ion-navbar",0,t("ion-title",0,n("Page Three")))),t("ion-content",0,n("Page Three Content"),t("div",0,t("ion-button",{o:{click:function(){return e.pop()}}},n("Go Back"))))]},e}(),yt=function(){function e(){}return e.prototype.ionViewDidEnter=function(){console.log("page two did enter")},e.prototype.nextPage=function(){this.element.closest("ion-nav").push("page-three")},e.prototype.pop=function(){this.element.closest("ion-nav").pop()},e.prototype.render=function(){var e=this;return[t("ion-header",0,t("ion-navbar",0,t("ion-title",0,n("Page Two")))),t("ion-content",0,n("Page Two Content"),t("div",0,t("ion-button",{o:{click:function(){return e.nextPage()}}},n("Go to Page Three"))),t("div",0,t("ion-button",{o:{click:function(){return e.pop()}}},n("Go Back"))))]},e}(),Tt=function(){function e(){}return e.prototype.attachViewToDom=function(e,t){return new Promise(function(n){var r=document.createElement(t.component),o=document.createElement("ion-page");t.element=o,o.appendChild(r),e.element.appendChild(o),o.componentOnReady(function(){n()})})},e.prototype.removeViewFromDom=function(e,t){return e.element.removeChild(t.element),Promise.resolve()},e}();e["ION-NAV"]=Ke,e["ION-NAV-CONTROLLER"]=ht,e["PAGE-ONE"]=gt,e["PAGE-THREE"]=wt,e["PAGE-TWO"]=yt,e["STENCIL-ION-NAV-DELEGATE"]=Tt},["ION-NAV",[["canGoBack",6],["canSwipeBack",6],["config",3,0,"config"],["delegate",1],["element",7],["getActive",6],["getFirstView",6],["getPrevious",6],["insert",6],["insertPages",6],["pop",6],["popTo",6],["popToRoot",6],["push",6],["remove",6],["removeView",6],["root",1],["setPages",6],["setRoot",6]],{},[["navInit"]]],["ION-NAV-CONTROLLER",[["animationCtrl",4,0,"ion-animation-controller"],["delegate",1],["element",7],["insert",6],["insertPages",6],["pop",6],["popTo",6],["popToRoot",6],["push",6],["remove",6],["removeView",6],["setPages",6],["setRoot",6]],{}],["PAGE-ONE",[["element",7]],{}],["PAGE-THREE",[["element",7]],{}],["PAGE-TWO",[["element",7]],{}],["STENCIL-ION-NAV-DELEGATE",[["attachViewToDom",6],["removeViewFromDom",6]],{}]);