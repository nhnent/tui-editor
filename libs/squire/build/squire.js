(function(e){"use strict";function t(e,t,n){this.root=this.currentNode=e,this.nodeType=t,this.filter=n}function n(e,t){for(var n=e.length;n--;)if(!t(e[n]))return!1;return!0}function r(e,t,n){if(e.nodeName!==t)return!1;for(var r in n)if(e.getAttribute(r)!==n[r])return!1;return!0}function o(e,t){return e.nodeType===t.nodeType&&e.nodeName===t.nodeName&&e.className===t.className&&(!e.style&&!t.style||e.style.cssText===t.style.cssText)}function i(e){return e.nodeType===E&&!!J[e.nodeName]}function a(e){return Z.test(e.nodeName)}function s(e){return e.nodeType===E&&!a(e)&&n(e.childNodes,a)}function d(e){return e.nodeType===E&&!a(e)&&!s(e)}function l(e){return s(e)?I:L}function f(e){var n=e.ownerDocument,r=new t(n.body,b,l,!1);return r.currentNode=e,r}function c(e){return f(e).previousNode()}function u(e){return f(e).nextNode()}function h(e,t,n){do if(r(e,t,n))return e;while(e=e.parentNode);return null}function p(e){var t,n,r,o,i=e.parentNode;return i&&e.nodeType===E?(t=p(i),t+=(t?">":"")+e.nodeName,(n=e.id)&&(t+="#"+n),(r=e.className.trim())&&(o=r.split(/\s\s*/),o.sort(),t+=".",t+=o.join("."))):t=i?p(i):"",t}function N(e){var t=e.nodeType;return t===E?e.childNodes.length:e.length||0}function C(e){var t=e.parentNode;return t&&t.removeChild(e),e}function v(e,t){var n=e.parentNode;n&&n.replaceChild(t,e)}function g(e){for(var t=e.ownerDocument.createDocumentFragment(),n=e.childNodes,r=n?n.length:0;r--;)t.appendChild(e.firstChild);return t}function m(e){var t,n,r=e.ownerDocument,o=e;if("BODY"===e.nodeName&&((n=e.firstChild)&&"BR"!==n.nodeName||(t=r.createElement("DIV"),n?e.replaceChild(t,n):e.appendChild(t),e=t,t=null)),a(e))e.firstChild||(Q?(t=r.createTextNode("​"),yt(t)):t=r.createTextNode(""));else if(G){for(;e.nodeType!==D&&!i(e);){if(n=e.firstChild,!n){t=r.createTextNode("");break}e=n}e.nodeType===D?/^ +$/.test(e.data)&&(e.data=""):i(e)&&e.parentNode.insertBefore(r.createTextNode(""),e)}else if(!e.querySelector("BR"))for(t=r.createElement("BR");(n=e.lastElementChild)&&!a(n);)e=n;return t&&e.appendChild(t),o}function T(e,t,n){var r,o,i,a=e.nodeType;if(a===D)return e===n?t:T(e.parentNode,e.splitText(t),n);if(a===E){if("number"==typeof t&&(t=e.childNodes.length>t?e.childNodes[t]:null),e===n)return t;for(r=e.parentNode,o=e.cloneNode(!1);t;)i=t.nextSibling,o.appendChild(t),t=i;return m(e),m(o),(i=e.nextSibling)?r.insertBefore(o,i):r.appendChild(o),T(r,o,n)}return e}function y(e,t){if(e.nodeType===E)for(var n,r,i,s=e.childNodes,d=s.length,l=[];d--;)if(n=s[d],r=d&&s[d-1],d&&a(n)&&o(n,r)&&!J[n.nodeName])t.startContainer===n&&(t.startContainer=r,t.startOffset+=N(r)),t.endContainer===n&&(t.endContainer=r,t.endOffset+=N(r)),t.startContainer===e&&(t.startOffset>d?t.startOffset-=1:t.startOffset===d&&(t.startContainer=r,t.startOffset=N(r))),t.endContainer===e&&(t.endOffset>d?t.endOffset-=1:t.endOffset===d&&(t.endContainer=r,t.endOffset=N(r))),C(n),n.nodeType===D?r.appendData(n.data.replace(/\u200B/g,"")):l.push(g(n));else if(n.nodeType===E){for(i=l.length;i--;)n.appendChild(l.pop());y(n,t)}}function S(e,t,n){for(var r,o,i,a=t;1===a.parentNode.childNodes.length;)a=a.parentNode;C(a),o=e.childNodes.length,r=e.lastChild,r&&"BR"===r.nodeName&&(e.removeChild(r),o-=1),i={startContainer:e,startOffset:o,endContainer:e,endOffset:o},e.appendChild(g(t)),y(e,i),n.setStart(i.startContainer,i.startOffset),n.collapse(!0),M&&(r=e.lastChild)&&"BR"===r.nodeName&&e.removeChild(r)}function B(e){var t=e.previousSibling,n=e.firstChild;t&&o(t,e)&&d(t)&&(C(e),t.appendChild(g(e)),n&&B(n))}function O(t,n,r){var o,i,a,s=e.createElement(t);if(n instanceof Array&&(r=n,n=null),n)for(o in n)s.setAttribute(o,n[o]);if(r)for(i=0,a=r.length;a>i;i+=1)s.appendChild(r[i]);return s}var x=2,E=1,D=3,b=1,A=4,I=1,L=3,R=0,k=1,w=2,P=3,U=e.defaultView,V=e.body,H=navigator.userAgent,_=/Gecko\//.test(H),F=/Trident\//.test(H),z=8===U.ie,K=/iP(?:ad|hone|od)/.test(H),M=!!U.opera,q=/WebKit\//.test(H),G=F||M,Q=F||q,Y=F,$=/\S/,j=Array.prototype.indexOf,W={1:1,2:2,3:4,8:128,9:256,11:1024};t.prototype.nextNode=function(){for(var e,t=this.currentNode,n=this.root,r=this.nodeType,o=this.filter;;){for(e=t.firstChild;!e&&t&&t!==n;)e=t.nextSibling,e||(t=t.parentNode);if(!e)return null;if(W[e.nodeType]&r&&o(e)===I)return this.currentNode=e,e;t=e}},t.prototype.previousNode=function(){for(var e,t=this.currentNode,n=this.root,r=this.nodeType,o=this.filter;;){if(t===n)return null;if(e=t.previousSibling)for(;t=e.lastChild;)e=t;else e=t.parentNode;if(!e)return null;if(W[e.nodeType]&r&&o(e)===I)return this.currentNode=e,e;t=e}};var Z=/^(?:#text|A(?:BBR|CRONYM)?|B(?:R|D[IO])?|C(?:ITE|ODE)|D(?:FN|EL)|EM|FONT|HR|I(?:NPUT|MG|NS)?|KBD|Q|R(?:P|T|UBY)|S(?:U[BP]|PAN|TRONG|AMP)|U)$/,J={BR:1,IMG:1,INPUT:1};(function(){var t=e.createElement("div"),n=e.createTextNode("12");return t.appendChild(n),n.splitText(2),2!==t.childNodes.length})()&&(Text.prototype.splitText=function(e){var t=this.ownerDocument.createTextNode(this.data.slice(e)),n=this.nextSibling,r=this.parentNode,o=this.length-e;return n?r.insertBefore(t,n):r.appendChild(t),o&&this.deleteData(e,o),t});var X=function(e,t){for(var n=e.childNodes;t&&e.nodeType===E;)e=n[t-1],n=e.childNodes,t=n.length;return e},et=function(e,t){if(e.nodeType===E){var n=e.childNodes;if(n.length>t)e=n[t];else{for(;e&&!e.nextSibling;)e=e.parentNode;e&&(e=e.nextSibling)}}return e},tt=Range.prototype;tt.forEachTextNode=function(e){var n=this.cloneRange();n.moveBoundariesDownTree();for(var r=n.startContainer,o=n.endContainer,i=n.commonAncestorContainer,a=new t(i,A,function(){return I},!1),s=a.currentNode=r;!e(s,n)&&s!==o&&(s=a.nextNode()););},tt.getTextContent=function(){var e="";return this.forEachTextNode(function(t,n){var r=t.data;r&&/\S/.test(r)&&(t===n.endContainer&&(r=r.slice(0,n.endOffset)),t===n.startContainer&&(r=r.slice(n.startOffset)),e+=r)}),e},tt._insertNode=function(e){var t,n,r,o,i=this.startContainer,a=this.startOffset,s=this.endContainer,d=this.endOffset;return i.nodeType===D?(t=i.parentNode,n=t.childNodes,a===i.length?(a=j.call(n,i)+1,this.collapsed&&(s=t,d=a)):(a&&(o=i.splitText(a),s===i?(d-=a,s=o):s===t&&(d+=1),i=o),a=j.call(n,i)),i=t):n=i.childNodes,r=n.length,a===r?i.appendChild(e):i.insertBefore(e,n[a]),i===s&&(d+=n.length-r),this.setStart(i,a),this.setEnd(s,d),this},tt._extractContents=function(e){var t=this.startContainer,n=this.startOffset,r=this.endContainer,o=this.endOffset;e||(e=this.commonAncestorContainer),e.nodeType===D&&(e=e.parentNode);for(var i,a=T(r,o,e),s=T(t,n,e),d=e.ownerDocument.createDocumentFragment();s!==a;)i=s.nextSibling,d.appendChild(s),s=i;return this.setStart(e,a?j.call(e.childNodes,a):e.childNodes.length),this.collapse(!0),m(e),d},tt._deleteContents=function(){this.moveBoundariesUpTree(),this._extractContents();var e=this.getStartBlock(),t=this.getEndBlock();e&&t&&e!==t&&S(e,t,this),e&&m(e);var n=this.endContainer.ownerDocument.body,r=n.firstChild;r&&"BR"!==r.nodeName||(m(n),this.selectNodeContents(n.firstChild));var o=this.collapsed;return this.moveBoundariesDownTree(),o&&this.collapse(!0),this},tt.insertTreeFragment=function(e){for(var t=!0,n=e.childNodes,r=n.length;r--;)if(!a(n[r])){t=!1;break}if(this.collapsed||this._deleteContents(),this.moveBoundariesDownTree(),t)this._insertNode(e),this.collapse(!1);else{for(var o,i,s=T(this.startContainer,this.startOffset,this.startContainer.ownerDocument.body),d=s.previousSibling,l=d,f=l.childNodes.length,c=s,h=0,p=s.parentNode;(o=l.lastChild)&&o.nodeType===E&&"BR"!==o.nodeName;)l=o,f=l.childNodes.length;for(;(o=c.firstChild)&&o.nodeType===E&&"BR"!==o.nodeName;)c=o;for(;(o=e.firstChild)&&a(o);)l.appendChild(o);for(;(o=e.lastChild)&&a(o);)c.insertBefore(o,c.firstChild),h+=1;for(i=e;i=u(i);)m(i);p.insertBefore(e,s),i=s.previousSibling,s.textContent?B(s):p.removeChild(s),s.parentNode||(c=i,h=N(c)),d.textContent?B(d):(l=d.nextSibling,f=0,p.removeChild(d)),this.setStart(l,f),this.setEnd(c,h),this.moveBoundariesDownTree()}},tt.containsNode=function(e,t){var n=this,r=e.ownerDocument.createRange();if(r.selectNode(e),t){var o=n.compareBoundaryPoints(P,r)>-1,i=1>n.compareBoundaryPoints(k,r);return!o&&!i}var a=1>n.compareBoundaryPoints(R,r),s=n.compareBoundaryPoints(w,r)>-1;return a&&s},tt.moveBoundariesDownTree=function(){for(var e,t=this.startContainer,n=this.startOffset,r=this.endContainer,o=this.endOffset;t.nodeType!==D&&(e=t.childNodes[n],e&&!i(e));)t=e,n=0;if(o)for(;r.nodeType!==D&&(e=r.childNodes[o-1],e&&!i(e));)r=e,o=N(r);else for(;r.nodeType!==D&&(e=r.firstChild,e&&!i(e));)r=e;return this.collapsed?(this.setStart(r,o),this.setEnd(t,n)):(this.setStart(t,n),this.setEnd(r,o)),this},tt.moveBoundariesUpTree=function(e){var t,n=this.startContainer,r=this.startOffset,o=this.endContainer,i=this.endOffset;for(e||(e=this.commonAncestorContainer);n!==e&&!r;)t=n.parentNode,r=j.call(t.childNodes,n),n=t;for(;o!==e&&i===N(o);)t=o.parentNode,i=j.call(t.childNodes,o)+1,o=t;return this.setStart(n,r),this.setEnd(o,i),this},tt.getStartBlock=function(){var e,t=this.startContainer;return a(t)?e=c(t):s(t)?e=t:(e=X(t,this.startOffset),e=u(e)),e&&this.containsNode(e,!0)?e:null},tt.getEndBlock=function(){var e,t,n=this.endContainer;if(a(n))e=c(n);else if(s(n))e=n;else{if(e=et(n,this.endOffset),!e)for(e=n.ownerDocument.body;t=e.lastChild;)e=t;e=c(e)}return e&&this.containsNode(e,!0)?e:null},tt.startsAtBlockBoundary=function(){for(var e,t,n=this.startContainer,r=this.startOffset;a(n);){if(r)return!1;e=n.parentNode,r=j.call(e.childNodes,n),n=e}for(;r&&(t=n.childNodes[r-1])&&(""===t.data||"BR"===t.nodeName);)r-=1;return!r},tt.endsAtBlockBoundary=function(){for(var e,t,n=this.endContainer,r=this.endOffset,o=N(n);a(n);){if(r!==o)return!1;e=n.parentNode,r=j.call(e.childNodes,n)+1,n=e,o=n.childNodes.length}for(;o>r&&(t=n.childNodes[r])&&(""===t.data||"BR"===t.nodeName);)r+=1;return r===o},tt.expandToBlockBoundaries=function(){var e,t=this.getStartBlock(),n=this.getEndBlock();return t&&n&&(e=t.parentNode,this.setStart(e,j.call(e.childNodes,t)),e=n.parentNode,this.setEnd(e,j.call(e.childNodes,n)+1)),this};var nt,rt={focus:1,blur:1,pathChange:1,select:1,input:1,undoStateChange:1},ot={},it=function(e,t){var n,r,o,i=ot[e];if(i)for(t||(t={}),t.type!==e&&(t.type=e),n=0,r=i.length;r>n;n+=1){o=i[n];try{o.handleEvent?o.handleEvent(t):o(t)}catch(a){nt.didError(a)}}},at=function(e){it(e.type,e)},st=function(t,n){var r=ot[t];r||(r=ot[t]=[],rt[t]||e.addEventListener(t,at,!1)),r.push(n)},dt=function(t,n){var r,o=ot[t];if(o){for(r=o.length;r--;)o[r]===n&&o.splice(r,1);o.length||(delete ot[t],rt[t]||e.removeEventListener(t,at,!1))}},lt=function(t,n,r,o){if(t instanceof Range)return t.cloneRange();var i=e.createRange();return i.setStart(t,n),r?i.setEnd(r,o):i.setEnd(t,n),i},ft=U.getSelection(),ct=null,ut=function(e){e&&(K&&U.focus(),ft.removeAllRanges(),ft.addRange(e))},ht=function(){if(ft.rangeCount){ct=ft.getRangeAt(0).cloneRange();var e=ct.startContainer,t=ct.endContainer;try{e&&i(e)&&ct.setStartBefore(e),t&&i(t)&&ct.setEndBefore(t)}catch(n){nt.didError({name:"Squire#getSelection error",message:"Starts: "+e.nodeName+"\nEnds: "+t.nodeName})}}return ct};Y&&U.addEventListener("beforedeactivate",ht,!0);var pt,Nt,Ct=null,vt=!0,gt=!1,mt=function(){vt=!0,gt=!1},Tt=function(){if(vt){var e,t=Ct;if(Ct=null,t.parentNode){for(;(e=t.data.indexOf("​"))>-1;)t.deleteData(e,1);t.data||t.nextSibling||t.previousSibling||!a(t.parentNode)||C(t.parentNode)}}},yt=function(e){Ct&&(vt=!0,Tt()),gt||(setTimeout(mt,0),gt=!0),vt=!1,Ct=e},St="",Bt=function(e,t){Ct&&!t&&Tt(e);var n,r=e.startContainer,o=e.endContainer;(t||r!==pt||o!==Nt)&&(pt=r,Nt=o,n=r&&o?r===o?p(o):"(selection)":"",St!==n&&(St=n,it("pathChange",{path:n}))),r!==o&&it("select")},Ot=function(){Bt(ht())};st("keyup",Ot),st("mouseup",Ot);var xt=function(){_&&V.focus(),U.focus()},Et=function(){_&&V.blur(),top.focus()};U.addEventListener("focus",at,!1),U.addEventListener("blur",at,!1);var Dt,bt,At,It,Lt=function(){return V.innerHTML},Rt=function(e){var t=V;t.innerHTML=e;do m(t);while(t=u(t))},kt=function(e,t){if(t||(t=ht()),t.collapse(!0),a(e))t._insertNode(e),t.setStartAfter(e);else{for(var n,r,o=t.getStartBlock()||V;o!==V&&!o.nextSibling;)o=o.parentNode;o!==V&&(n=o.parentNode,r=T(n,o.nextSibling,V)),r?(V.insertBefore(e,r),t.setStart(r,0),t.setStart(r,0),t.moveBoundariesDownTree()):(V.appendChild(e),V.appendChild(m(O("div"))),t.setStart(e,0),t.setEnd(e,0)),xt(),ut(t),Bt(t)}},wt="squire-selection-start",Pt="squire-selection-end",Ut=function(e){var t,n=O("INPUT",{id:wt,type:"hidden"}),r=O("INPUT",{id:Pt,type:"hidden"});e._insertNode(n),e.collapse(!1),e._insertNode(r),n.compareDocumentPosition(r)&x&&(n.id=Pt,r.id=wt,t=n,n=r,r=t),e.setStartAfter(n),e.setEndBefore(r)},Vt=function(t){var n=e.getElementById(wt),r=e.getElementById(Pt);if(n&&r){var o,i=n.parentNode,a=r.parentNode,s={startContainer:i,endContainer:a,startOffset:j.call(i.childNodes,n),endOffset:j.call(a.childNodes,r)};i===a&&(s.endOffset-=1),C(n),C(r),y(i,s),i!==a&&y(a,s),t||(t=e.createRange()),t.setStart(s.startContainer,s.startOffset),t.setEnd(s.endContainer,s.endOffset),o=t.collapsed,t.moveBoundariesDownTree(),o&&t.collapse(!0)}return t||null},Ht=function(){It&&(It=!1,it("undoStateChange",{canUndo:!0,canRedo:!1})),it("input")};st("keyup",function(e){var t=e.keyCode;e.ctrlKey||e.metaKey||e.altKey||!(16>t||t>20)||!(33>t||t>45)||Ht()});var _t=function(e){It||(Dt+=1,At>Dt&&(bt.length=At=Dt),e&&Ut(e),bt[Dt]=Lt(),At+=1,It=!0)},Ft=function(){if(0!==Dt||!It){_t(ht()),Dt-=1,Rt(bt[Dt]);var e=Vt();e&&ut(e),It=!0,it("undoStateChange",{canUndo:0!==Dt,canRedo:!0}),it("input")}},zt=function(){if(At>Dt+1&&It){Dt+=1,Rt(bt[Dt]);var e=Vt();e&&ut(e),it("undoStateChange",{canUndo:!0,canRedo:At>Dt+1}),it("input")}},Kt=function(e,n,r){if(e=e.toUpperCase(),n||(n={}),!r&&!(r=ht()))return!1;var o,i,a=r.commonAncestorContainer;if(h(a,e,n))return!0;if(a.nodeType===D)return!1;o=new t(a,A,function(e){return r.containsNode(e,!0)?I:L},!1);for(var s=!1;i=o.nextNode();){if(!h(i,e,n))return!1;s=!0}return s},Mt=function(e,n,r){var o,i,a,s,d,l,f,c;if(r.collapsed)o=m(O(e,n)),r._insertNode(o),r.setStart(o.firstChild,o.firstChild.length),r.collapse(!0);else{i=new t(r.commonAncestorContainer,A,function(e){return r.containsNode(e,!0)?I:L},!1),d=0,l=0,f=i.currentNode=r.startContainer,f.nodeType!==D&&(f=i.nextNode());do c=!h(f,e,n),f===r.endContainer&&(c&&f.length>r.endOffset?f.splitText(r.endOffset):l=r.endOffset),f===r.startContainer&&(c&&r.startOffset?f=f.splitText(r.startOffset):d=r.startOffset),c&&(o=O(e,n),v(f,o),o.appendChild(f),l=f.length),s=f,a||(a=s);while(f=i.nextNode());r=lt(a,d,s,l)}return r},qt=function(t,n,o,i){Ut(o);var s;o.collapsed&&(Q?(s=e.createTextNode("​"),yt(s)):s=e.createTextNode(""),o._insertNode(s));for(var d=o.commonAncestorContainer;a(d);)d=d.parentNode;var l=o.startContainer,f=o.startOffset,c=o.endContainer,u=o.endOffset,h=[],p=function(e,t){if(!o.containsNode(e,!1)){var n,r,i=e.nodeType===D;if(!o.containsNode(e,!0))return"INPUT"===e.nodeName||i&&!e.data||h.push([t,e]),void 0;if(i)e===c&&u!==e.length&&h.push([t,e.splitText(u)]),e===l&&f&&(e.splitText(f),h.push([t,e]));else for(n=e.firstChild;n;n=r)r=n.nextSibling,p(n,t)}},N=Array.prototype.filter.call(d.getElementsByTagName(t),function(e){return o.containsNode(e,!0)&&r(e,t,n)});i||N.forEach(function(e){p(e,e)}),h.forEach(function(e){var t=e[0].cloneNode(!1),n=e[1];v(n,t),t.appendChild(n)}),N.forEach(function(e){v(e,g(e))}),Vt(o),s&&o.collapse(!1);var C={startContainer:o.startContainer,startOffset:o.startOffset,endContainer:o.endContainer,endOffset:o.endOffset};return y(d,C),o.setStart(C.startContainer,C.startOffset),o.setEnd(C.endContainer,C.endOffset),o},Gt=function(e,t,n,r){(n||(n=ht()))&&(_t(n),Vt(n),t&&(n=qt(t.tag.toUpperCase(),t.attributes||{},n,r)),e&&(n=Mt(e.tag.toUpperCase(),e.attributes||{},n)),ut(n),Bt(n,!0),Ht())},Qt={DIV:"DIV",PRE:"DIV",H1:"DIV",H2:"DIV",H3:"DIV",H4:"DIV",H5:"DIV",H6:"DIV",P:"DIV",DT:"DD",DD:"DT",LI:"LI"},Yt=function(e,t,n){var r=Qt[e.nodeName],o=T(t,n,e.parentNode);return o.nodeName!==r&&(e=O(r),e.className="rtl"===o.dir?"dir-rtl":"",e.dir=o.dir,v(o,e),e.appendChild(g(o)),o=e),o},$t=function(e,t,n){if(n||(n=ht())){t&&(_t(n),Vt(n));var r=n.getStartBlock(),o=n.getEndBlock();if(r&&o)do if(e(r)||r===o)break;while(r=u(r));t&&(ut(n),Bt(n,!0),Ht())}},jt=function(e,t){if(t||(t=ht())){M||V.setAttribute("contenteditable","false"),It?Ut(t):_t(t),t.expandToBlockBoundaries(),t.moveBoundariesUpTree(V);var n=t._extractContents(V);t._insertNode(e(n)),t.endOffset<t.endContainer.childNodes.length&&B(t.endContainer.childNodes[t.endOffset]),B(t.startContainer.childNodes[t.startOffset]),M||V.setAttribute("contenteditable","true"),Vt(t),ut(t),Bt(t,!0),Ht()}},Wt=function(e){return O("BLOCKQUOTE",[e])},Zt=function(e){var t=e.querySelectorAll("blockquote");return Array.prototype.filter.call(t,function(e){return!h(e.parentNode,"BLOCKQUOTE")}).forEach(function(e){v(e,g(e))}),e},Jt=function(e){for(var t,n=e.querySelectorAll("blockquote"),r=n.length;r--;)t=n[r],v(t,g(t));return e},Xt=function(e,t){var n,r,o,i,a,l;for(n=0,r=e.length;r>n;n+=1)o=e[n],i=o.nodeName,s(o)?"LI"!==i&&(l=O("LI",{"class":"rtl"===o.dir?"dir-rtl":"",dir:o.dir},[g(o)]),o.parentNode.nodeName===t?v(o,l):(a=o.previousSibling)&&a.nodeName===t?(a.appendChild(l),C(o),n-=1,r-=1):v(o,O(t,[l]))):d(o)&&(i!==t&&/^[DOU]L$/.test(i)?v(o,O(t,[g(o)])):Xt(o.childNodes,t))},en=function(e){return Xt(e.childNodes,"UL"),e},tn=function(e){return Xt(e.childNodes,"OL"),e},nn=function(e){var t=e.querySelectorAll("UL, OL");return Array.prototype.filter.call(t,function(e){return!h(e.parentNode,"UL")&&!h(e.parentNode,"OL")}).forEach(function(e){for(var t,n=g(e),r=n.childNodes,o=r.length;o--;)t=r[o],"LI"===t.nodeName&&n.replaceChild(O("DIV",{"class":"rtl"===t.dir?"dir-rtl":"",dir:t.dir},[g(t)]),t);v(e,n)}),e},rn=/\b((?:(?:ht|f)tps?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\([^\s()<>]+\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’])|(?:[\w\-.%+]+@(?:[\w\-]+\.)+[A-Z]{2,4}))/i,on=function(e){for(var n,r,o,i,a,s,d,l=e.ownerDocument,f=new t(e,A,function(e){return h(e,"A")?L:I},!1);n=f.nextNode();)if(r=n.data.split(rn),i=r.length,i>1){for(s=n.parentNode,d=n.nextSibling,o=0;i>o;o+=1)a=r[o],o?(o%2?(n=l.createElement("A"),n.textContent=a,n.href=/@/.test(a)?"mailto:"+a:/^(?:ht|f)tps?:/.test(a)?a:"http://"+a):n=l.createTextNode(a),d?s.insertBefore(n,d):s.appendChild(n)):n.data=a;f.currentNode=n}},an=/^(?:A(?:DDRESS|RTICLE|SIDE)|BLOCKQUOTE|CAPTION|D(?:[DLT]|IV)|F(?:IGURE|OOTER)|H[1-6]|HEADER|L(?:ABEL|EGEND|I)|O(?:L|UTPUT)|P(?:RE)?|SECTION|T(?:ABLE|BODY|D|FOOT|H|HEAD|R)|UL)$/,sn={1:10,2:13,3:16,4:18,5:24,6:32,7:48},dn={backgroundColor:{regexp:$,replace:function(e){return O("SPAN",{"class":"highlight",style:"background-color: "+e})}},color:{regexp:$,replace:function(e){return O("SPAN",{"class":"colour",style:"color:"+e})}},fontWeight:{regexp:/^bold/i,replace:function(){return O("B")}},fontStyle:{regexp:/^italic/i,replace:function(){return O("I")}},fontFamily:{regexp:$,replace:function(e){return O("SPAN",{"class":"font",style:"font-family:"+e})}},fontSize:{regexp:$,replace:function(e){return O("SPAN",{"class":"size",style:"font-size:"+e})}}},ln={SPAN:function(e,t){var n,r,o,i,a,s,d=e.style;for(n in dn)r=dn[n],o=d[n],o&&r.regexp.test(o)&&(s=r.replace(o),i&&i.appendChild(s),i=s,a||(a=s));return a&&(i.appendChild(g(e)),t.replaceChild(a,e)),i||e},STRONG:function(e,t){var n=O("B");return t.replaceChild(n,e),n.appendChild(g(e)),n},EM:function(e,t){var n=O("I");return t.replaceChild(n,e),n.appendChild(g(e)),n},FONT:function(e,t){var n,r,o,i,a=e.face,s=e.size;return a&&(n=O("SPAN",{"class":"font",style:"font-family:"+a})),s&&(r=O("SPAN",{"class":"size",style:"font-size:"+sn[s]+"px"}),n&&n.appendChild(r)),i=n||r||O("SPAN"),o=r||n||i,t.replaceChild(i,e),o.appendChild(g(e)),o},TT:function(e,t){var n=O("SPAN",{"class":"font",style:'font-family:menlo,consolas,"courier new",monospace'});return t.replaceChild(n,e),n.appendChild(g(e)),n}},fn=function(e){for(var t,n=e.childNodes,r=n.length;r--;)t=n[r],t.nodeType===E&&(fn(t),a(t)&&!t.firstChild&&e.removeChild(t))},cn=function(e,t){var n,r,o,i,s,d,l,f=e.childNodes;for(n=0,r=f.length;r>n;n+=1)if(o=f[n],i=o.nodeName,s=o.nodeType,d=ln[i],s===E){if(l=o.childNodes.length,d)o=d(o,e);else{if(!an.test(i)&&!a(o)){n-=1,r+=l-1,e.replaceChild(g(o),o);continue}!t&&o.style.cssText&&o.removeAttribute("style")}l&&cn(o,t)}else s===D&&($.test(o.data)||n>0&&a(f[n-1])||r>n+1&&a(f[n+1]))||(e.removeChild(o),n-=1,r-=1);return e},un=function(e,t){var n,r,o,i,s=e.childNodes,d=null;for(n=0,r=s.length;r>n;n+=1)o=s[n],i="BR"===o.nodeName,!i&&a(o)?(d||(d=O(t)),d.appendChild(o),n-=1,r-=1):(i||d)&&(d||(d=O(t)),m(d),i?e.replaceChild(d,o):(e.insertBefore(d,o),n+=1,r+=1),d=null);return d&&e.appendChild(m(d)),e},hn=function(e){return(e.nodeType===E?"BR"===e.nodeName:$.test(e.data))?I:L},pn=function(e){for(var n,r=e.parentNode;a(r);)r=r.parentNode;return n=new t(r,b|A,hn),n.currentNode=e,!!n.nextNode()},Nn=function(e){var t,n,r,o=e.querySelectorAll("BR"),i=[],d=o.length;for(t=0;d>t;t+=1)i[t]=pn(o[t]);for(;d--;)if(n=o[d],r=n.parentNode){for(;a(r);)r=r.parentNode;s(r)&&Qt[r.nodeName]?(i[d]&&Yt(r,n.parentNode,n),C(n)):un(r,"DIV")}},Cn=function(){try{m(V)}catch(e){nt.didError(e)}};st(F?"beforecut":"cut",function(){var e=ht();_t(e),Vt(e),ut(e),setTimeout(Cn,0)});var vn=!1;st(F?"beforepaste":"paste",function(e){if(!vn){var t,n=e.clipboardData,r=n&&n.items,o=!1;if(r)for(t=r.length;t--;)if(/^image\/.*/.test(r[t].type))return e.preventDefault(),it("dragover",{dataTransfer:n,preventDefault:function(){o=!0}}),o&&it("drop",{dataTransfer:n}),void 0;vn=!0;var i=ht(),a=i.startContainer,s=i.startOffset,d=i.endContainer,l=i.endOffset,f=O("DIV",{style:"position: absolute; overflow: hidden; top:"+(V.scrollTop+30)+"px; left: 0; width: 1px; height: 1px;"});V.appendChild(f),i.selectNodeContents(f),ut(i),setTimeout(function(){try{var e=g(C(f)),t=e.firstChild,n=lt(a,s,d,l);if(t){t===e.lastChild&&"DIV"===t.nodeName&&e.replaceChild(g(t),t),e.normalize(),on(e),cn(e,!1),Nn(e),fn(e);for(var r=e,o=!0;r=u(r);)m(r);it("willPaste",{fragment:e,preventDefault:function(){o=!1}}),o&&(n.insertTreeFragment(e),Ht(),n.collapse(!1))}ut(n),Bt(n,!0),vn=!1}catch(i){nt.didError(i)}},0)}});var gn={8:"backspace",9:"tab",13:"enter",32:"space",46:"delete"},mn=function(e){return function(t){t.preventDefault(),e()}},Tn=function(e){return function(t){t.preventDefault();var n=ht();Kt(e,null,n)?Gt(null,{tag:e},n):Gt({tag:e},null,n)}},yn=function(){try{var e,t=ht(),n=t.startContainer;if(n.nodeType===D&&(n=n.parentNode),a(n)&&!n.textContent){do e=n.parentNode;while(a(e)&&!e.textContent&&(n=e));t.setStart(e,j.call(e.childNodes,n)),t.collapse(!0),e.removeChild(n),s(e)||(e=c(e)),m(e),t.moveBoundariesDownTree(),ut(t),Bt(t)}}catch(r){nt.didError(r)}};z&&st("keyup",function(){var e=V.firstChild;"P"===e.nodeName&&(Ut(ht()),v(e,O("DIV",[g(e)])),ut(Vt()))});var Sn={enter:function(t){t.preventDefault();var n=ht();if(n){_t(n),on(n.startContainer),Vt(n),n.collapsed||n._deleteContents();var r,o=n.getStartBlock(),i=o?o.nodeName:"DIV",a=Qt[i];if(!o)return n._insertNode(O("BR")),n.collapse(!1),ut(n),Bt(n,!0),Ht(),void 0;var s,d=n.startContainer,l=n.startOffset;if(a||(d===o&&(d=l?d.childNodes[l-1]:null,l=0,d&&("BR"===d.nodeName?d=d.nextSibling:l=N(d),d&&"BR"!==d.nodeName||(s=m(O("DIV")),d?o.replaceChild(s,d):o.appendChild(s),d=s))),un(o,"DIV"),a="DIV",d||(d=o.firstChild),n.setStart(d,l),n.setEnd(d,l),o=n.getStartBlock()),!o.textContent){if(h(o,"UL")||h(o,"OL"))return jt(nn,n);if(h(o,"BLOCKQUOTE"))return jt(Jt,n)}for(r=Yt(o,d,l);r.nodeType===E;){var f,c=r.firstChild;if("A"!==r.nodeName){for(;c&&c.nodeType===D&&!c.data&&(f=c.nextSibling,f&&"BR"!==f.nodeName);)C(c),c=f;if(!c||"BR"===c.nodeName||c.nodeType===D&&!M)break;r=c}else v(r,g(r)),r=c}n=lt(r,0),ut(n),Bt(n,!0),r.nodeType===D&&(r=r.parentNode),r.offsetTop+r.offsetHeight>(e.documentElement.scrollTop||V.scrollTop)+V.offsetHeight&&r.scrollIntoView(!1),Ht()}},backspace:function(e){var t=ht();if(t.collapsed)if(t.startsAtBlockBoundary()){_t(t),Vt(t),e.preventDefault();var n=t.getStartBlock(),r=n&&c(n);if(r){if(!r.isContentEditable)return C(r),void 0;for(S(r,n,t),n=r.parentNode;n&&!n.nextSibling;)n=n.parentNode;n&&(n=n.nextSibling)&&B(n),ut(t)}else{if(h(n,"UL")||h(n,"OL"))return jt(nn,t);if(h(n,"BLOCKQUOTE"))return jt(Zt,t);ut(t),Bt(t,!0)}}else{var o=t.startContainer.data||"";$.test(o.charAt(t.startOffset-1))||(_t(t),Vt(t),ut(t)),setTimeout(yn,0)}else _t(t),Vt(t),e.preventDefault(),t._deleteContents(),ut(t),Bt(t,!0)},"delete":function(e){var t=ht();if(t.collapsed)if(t.endsAtBlockBoundary()){_t(t),Vt(t),e.preventDefault();var n=t.getStartBlock(),r=n&&u(n);if(r){if(!r.isContentEditable)return C(r),void 0;for(S(n,r,t),r=n.parentNode;r&&!r.nextSibling;)r=r.parentNode;r&&(r=r.nextSibling)&&B(r),ut(t),Bt(t,!0)}}else{var o=t.startContainer.data||"";$.test(o.charAt(t.startOffset))||(_t(t),Vt(t),ut(t)),setTimeout(yn,0)}else _t(t),Vt(t),e.preventDefault(),t._deleteContents(),ut(t),Bt(t,!0)},space:function(){var e=ht();_t(e),on(e.startContainer),Vt(e),ut(e)},"ctrl-b":Tn("B"),"ctrl-i":Tn("I"),"ctrl-u":Tn("U"),"ctrl-y":mn(zt),"ctrl-z":mn(Ft),"ctrl-shift-z":mn(zt)};st(M?"keypress":"keydown",function(e){var t=e.keyCode,n=gn[t]||String.fromCharCode(t).toLowerCase(),r="";M&&46===e.which&&(n="."),t>111&&124>t&&(n="f"+(t-111)),e.altKey&&(r+="alt-"),(e.ctrlKey||e.metaKey)&&(r+="ctrl-"),e.shiftKey&&(r+="shift-"),n=r+n,Sn[n]&&Sn[n](e)});var Bn=function(e){return function(){return e.apply(null,arguments),this}},On=function(e,t,n){return function(){return e(t,n),xt(),this}};nt=U.editor={didError:function(e){console.log(e)},addEventListener:Bn(st),removeEventListener:Bn(dt),focus:Bn(xt),blur:Bn(Et),getDocument:function(){return e},addStyles:function(t){if(t){var n=e.documentElement.firstChild,r=O("STYLE",{type:"text/css"});r.styleSheet?(n.appendChild(r),r.styleSheet.cssText=t):(r.appendChild(e.createTextNode(t)),n.appendChild(r))}return this},getHTML:function(e){var t,n,r,o,i,a=[];if(e&&(i=ht())&&Ut(i),G)for(t=V;t=u(t);)t.textContent||t.querySelector("BR")||(n=O("BR"),t.appendChild(n),a.push(n));if(r=Lt(),G)for(o=a.length;o--;)C(a[o]);return i&&Vt(i),r},setHTML:function(t){var n,r=e.createDocumentFragment(),o=O("DIV");o.innerHTML=t,r.appendChild(g(o)),cn(r,!0),Nn(r),un(r,"DIV");for(var i=r;i=u(i);)m(i);for(;n=V.lastChild;)V.removeChild(n);V.appendChild(r),m(V),Dt=-1,bt=[],At=0,It=!1;var a=Vt()||lt(V.firstChild,0);return _t(a),Vt(a),Y?ct=a:ut(a),Bt(a,!0),this},getSelectedText:function(){return ht().getTextContent()},insertElement:Bn(kt),insertImage:function(e){var t=O("IMG",{src:e});return kt(t),t},getPath:function(){return St},getSelection:ht,setSelection:Bn(ut),undo:Bn(Ft),redo:Bn(zt),hasFormat:Kt,changeFormat:Bn(Gt),bold:On(Gt,{tag:"B"}),italic:On(Gt,{tag:"I"}),underline:On(Gt,{tag:"U"}),removeBold:On(Gt,null,{tag:"B"}),removeItalic:On(Gt,null,{tag:"I"}),removeUnderline:On(Gt,null,{tag:"U"}),makeLink:function(t){t=encodeURI(t);var n=ht();if(n.collapsed){var r=t.indexOf(":")+1;if(r)for(;"/"===t[r];)r+=1;n._insertNode(e.createTextNode(t.slice(r)))}return Gt({tag:"A",attributes:{href:t}},{tag:"A"},n),xt(),this},removeLink:function(){return Gt(null,{tag:"A"},ht(),!0),xt(),this},setFontFace:function(e){return Gt({tag:"SPAN",attributes:{"class":"font",style:"font-family: "+e+", sans-serif;"}},{tag:"SPAN",attributes:{"class":"font"}}),xt(),this},setFontSize:function(e){return Gt({tag:"SPAN",attributes:{"class":"size",style:"font-size: "+("number"==typeof e?e+"px":e)}},{tag:"SPAN",attributes:{"class":"size"}}),xt(),this},setTextColour:function(e){return Gt({tag:"SPAN",attributes:{"class":"colour",style:"color: "+e}},{tag:"SPAN",attributes:{"class":"colour"}}),xt(),this},setHighlightColour:function(e){return Gt({tag:"SPAN",attributes:{"class":"highlight",style:"background-color: "+e}},{tag:"SPAN",attributes:{"class":"highlight"}}),xt(),this},setTextAlignment:function(e){return $t(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/align/.test(e)}).join(" ")+" align-"+e).trim(),t.style.textAlign=e},!0),xt(),this},setTextDirection:function(e){return $t(function(t){t.className=(t.className.split(/\s+/).filter(function(e){return!/dir/.test(e)}).join(" ")+" dir-"+e).trim(),t.dir=e},!0),xt(),this},forEachBlock:Bn($t),modifyBlocks:Bn(jt),increaseQuoteLevel:On(jt,Wt),decreaseQuoteLevel:On(jt,Zt),makeUnorderedList:On(jt,en),makeOrderedList:On(jt,tn),removeList:On(jt,nn)},V.setAttribute("contenteditable","true"),nt.setHTML(""),U.onEditorLoad&&(U.onEditorLoad(U.editor),U.onEditorLoad=null)})(document);