(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{112:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(27);function r(e){return JSON.parse(JSON.stringify(e))}},166:function(e,t,n){"use strict";var r=n(0),o=n(243),c=n.n(o);r.default.use(c.a)},226:function(e,t,n){e.exports={}},245:function(e,t,n){"use strict";var r=n(354),o=n(355),c={name:"DefaultLayout"},l=n(79),component=Object(l.a)(c,(function(){var e=this._self._c;return e(r.a,[e(o.a,[e("Nuxt")],1)],1)}),[],!1,null,null,null);t.a=component.exports},261:function(e,t,n){n(262),e.exports=n(263)},300:function(e,t,n){"use strict";n.r(t);var r=n(8);n(53);function o(){return(o=Object(r.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.store.dispatch("challenges/loadChallenges");case 2:return e.abrupt("return",!0);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.default=function(e){return o.apply(this,arguments)}},312:function(e,t,n){"use strict";n(226)},314:function(e,t,n){e.exports={}},315:function(e,t,n){e.exports={}},316:function(e,t,n){e.exports={}},317:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return x})),n.d(t,"getters",(function(){return w})),n.d(t,"mutations",(function(){return y})),n.d(t,"actions",(function(){return R}));n(27),n(24),n(33),n(40),n(26),n(41);var r=n(8),o=n(12),c=n(171),l=(n(53),n(137),n(5),n(247),n(172),n(91)),f=n.n(l),v=n(246),d=n(228),h=n(112);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function O(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var j="challenges.v1",x=function(){return{value:[]}},w={value:function(e){return e.value},valueByUuid:function(e){var t=e.value;return function(e){return t.find((function(t){return t.uuid===e}))}}},y={setValue:function(e,t){t&&(e.value=Object(c.a)(t))},createOrReplaceChallenge:function(e,t){var n=e.value.findIndex((function(e){return e.uuid===t.uuid}));-1===n?(t.uuid=Object(v.a)(),t.logs=[],e.value.push(t)):(e.value[n]=O(O({},e.value[n]),t),e.value=Object(h.a)(e.value))},deleteChallenge:function(e,t){var n=e.value.findIndex((function(e){return e.uuid===t}));if(-1!==n){var r=Object(h.a)(e.value);r.splice(n,1),e.value=r}else console.error("Challenge UUID nicht gefunden.")},createOrReplaceLog:function(e,t){var n=t.uuid_challenge,r=t.uuid_log,o=t.count,c=e.value.findIndex((function(e){return e.uuid===n}));if(-1!==c){void 0===e.value[c].logs&&(e.value[c].logs=[]);var l=e.value[c].logs.findIndex((function(e){return e.uuid===r}));if(-1===l){var f=d.DateTime.now().toUTC().toISO({extendedZone:!1}),m=Object(v.a)();e.value[c].logs.push({uuid:m,date:f,count:o})}else e.value[c].logs[l].count=o;e.value=Object(h.a)(e.value)}else console.error("Challenge UUID nicht gefunden.")},deleteLog:function(e,t){var n=t.uuid_challenge,r=t.uuid_log,o=e.value.findIndex((function(e){return e.uuid===n}));if(-1!==o){var c=e.value[o].logs.findIndex((function(e){return e.uuid===r}));if(-1!==c){var l=Object(h.a)(e.value);l[o].logs.splice(c,1),e.value=l}else console.error("Log UUID nicht gefunden.")}else console.error("Challenge UUID nicht gefunden.")}},R={loadChallenges:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,f.a.getItem(j);case 3:r=t.sent,n("setValue",r);case 5:case"end":return t.stop()}}),t)})))()},createOrReplaceChallenge:function(e,t){return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,o=e.getters,r("createOrReplaceChallenge",t),n.next=4,f.a.setItem(j,o.value);case 4:case"end":return n.stop()}}),n)})))()},deleteChallenge:function(e,t){return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,o=e.getters,r("deleteChallenge",t),n.next=4,f.a.setItem(j,o.value);case 4:case"end":return n.stop()}}),n)})))()},createOrReplaceLog:function(e,t){return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,o=e.getters,r("createOrReplaceLog",t),n.next=4,f.a.setItem(j,o.value);case 4:case"end":return n.stop()}}),n)})))()},deleteLog:function(e,t){return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,o=e.getters,r("deleteLog",t),n.next=4,f.a.setItem(j,o.value);case 4:case"end":return n.stop()}}),n)})))()}}},64:function(e,t,n){"use strict";var r=n(354),o=n(355),c={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{otherError:"An error occurred"}},head:function(){return{title:this.otherError}}},l=(n(312),n(79)),component=Object(l.a)(c,(function(){var e=this,t=e._self._c;return t(r.a,[t(o.a,[t("h1",[e._v("\n      "+e._s(e.otherError)+"\n    ")]),e._v(" "),t("NuxtLink",{attrs:{to:"/"}},[e._v("\n      Home page\n    ")])],1)],1)}),[],!1,null,"245a703a",null);t.a=component.exports}},[[261,9,4,10]]]);