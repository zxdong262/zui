/**
 * demo.js for zui
 * by ZHAO Xudong,zxdong@gmail.com
 */
debugON = true
$(function ($) {

    //temp debug
    debug('debug info.')

    //input placeholder, title
    $('.inputs-demo input').each(function () {
        var t = $(this),
            txt = 'input type ' + t.attr('type')
            t.prop('placeholder', txt).prop('title', txt)
    })

    //demo - class text
    $('.render-class').each(function () {
        var t = $(this)
        t.text('class="' + t.attr('class').slice(13) + '"')
    })

    //pre javascript
    $('pre.js, pre.js2').each(function () {
        $(this).escape().wrapInner('<code contentEditable="true" />')
    })
    $('pre.js').addClass('hide')

    //pre.html2
    $('pre.html2').each(function () {
        $(this).escape().wrapInner('<code contentEditable="true" />')
    })

    //pre html
    $('pre.html').each(function () {
        var t = $(this)
        t.before('<div class="html-output">' + t.html() + '</div>')
            .after('<p><a href="javascript:;" class="btn btn-e btn-inline with-icon-arrow-u show-code btn-corner">View Source</a></p>')
        t.escape().wrapInner('<code contentEditable="true" />').wrap('<div class="code-wrapper hide" />')
        var p = t.parent(),
            js = p.next().next('pre.js')
            if(js.length) p.append('<pre class="js">' + js.html() + '</pre>')
    })

    //h3, h2
    $('#wrapper > .html-output > h3, #wrapper > h3').addClass('sub-title');
    $('#wrapper > h2').addClass('section-title')

    //highlight
    hljs.tabReplace = '    '; //4 spaces
    hljs.initHighlighting();
    
    
    //qr
    $('#qrcode').qrcode({width: 128,height: 128,text: window.location.href })

    //show code
    $('.show-code').click(function () {
        var th = $(this),
            p = th.parent(),
            w = $(window).width() - 60
            p.prev().modal({
                width: w,
                title: 'Source'
            })
    })
    
    //qr
    $('#qrcode').qrcode({width: 128,height: 128,text: window.location.href })


    /* = for demo
     * ==============*/

    //popup
    $('#pop').click(function () {
        popup({
            content: 'popup content'
        })
    })

    $('#pop2').click(function () {
        popup({
            content: 'popup content',
            timer: 3000
        })
    })

    $('#pop3').click(function () {
        popup({
            content: 'loading...',
            timer: 3000,
            short: true
        })
    })

    $('#pop4').click(function () {
        popup({
            content: 'position:static',
            fixed: false,
            css: 'close-btn-pos-left',
        })
    })

    //modal
    $('#modal-btn').click(function () {
        $('#modal-content-wrap').modal({
            width: 400,
            title: 'Modal Title',
            dismiss: true,
            showTitle: true
        })
    })

    //nav render
    var ht = '',
        res = $('#wrapper > h2, #wrapper > .html-output > h3, #wrapper > h3'),
        len = res.length,
        emp = $('not-now')

        res.each(function (index) {
            var t = $(this),
                navstr = 'nav-' + index
                t.before('<a href="javascript:;" name="' + navstr + '"></a>')
        })

        //initUI
        initUI()

        //demo nav
        var ht = ''
    window.tops = [0]
    res.each(function (index) {
        var t = $(this),
            prev = index ? res.eq(index - 1) : emp,
            next = res.eq(index + 1),
            navstr = '#nav-' + index
            tops.push(t.offset().top)

            ht +=
                (t.hasClass('section-title') && prev.hasClass('sub-title') ? '</li></ul>' : '') +
                '<li class="borderb ' +
                (t.hasClass('section-title') ? 'li' : 'sub-li') +
                '"><a class="block" href="' + navstr + '">' +
                (t.hasClass('section-title') ? '&bull; ' : '- ') + t.html() + '</a>' +
                (t.hasClass('section-title') && next.hasClass('sub-title') ? '<ul class="sub-nav">' : '</li>') +
                (!next.length && t.hasClass('sub-title') ? '</ul></li>' : '')
    })
    tops.push($('body').height())

    $('#wrapper').append('<div id="nav"><div id="nav-inner"><ul class="nav-ul">' + ht + '</ul></div></div><a class="bg-fff label border corner nav-open" id="nav-toggle" href="javascript:;"><span class="open-txt">Hide &raquo;</span><span class="close-txt">&laquo; Show</span></a>')

    highlightNav()
    setNavHeight()
    $(window).resize(function () {
        debug($(window).width())
        setNavHeight()
        autoWidth()
    })
    $('document').resize(updateTops)
    $(window).scroll(highlightNav)

    //nav toggle btn
    $('#nav-toggle').click(function () {
        var t = $(this)
        if(t.hasClass('nav-open')) {
            $('body').addClass('hide-nav').removeClass('btn-open')
            t.addClass('nav-close').removeClass('nav-open')
        } else {
            $('body').removeClass('hide-nav').addClass('btn-open')
            t.removeClass('nav-close').addClass('nav-open')
        }
    })

    //response layout
    autoWidth()

    //end
})

//response layout

function autoWidth() {

    $('body').addClass('hide-nav')
    $('#nav-toggle').addClass('nav-close').removeClass('nav-open')
    var w = $(window).width()
    if(w > 500 + 30 * 2 + 200) {
        $('#wrapper').attr('class', '').addClass('m270')
        $('body').removeClass('hide-nav')
        $('#nav-toggle').removeClass('nav-close').addClass('nav-open')
    } else if(w > 560) {
        $('#wrapper').attr('class', '').addClass('m30')
    } else if(w > 380) {
        $('#wrapper').attr('class', '').addClass('m10')
    } else {
        $('#wrapper').attr('class', '')
    }
}

//updateTops

function updateTops() {
    window.tops = [0]
    $('h2.color-green').each(function (index) {
        var t = $(this)
        tops.push(t.offset().top)
    })
    tops.push($('body').height())
}

//setNavHeight()

function setNavHeight() {
    var w = $(window).height()
    if($('#nav ul').height() + 20 > w) $('#nav').addClass('scroll')
    else $('#nav').prop('scrollTop', 0).removeClass('scroll')
    $('#nav').css('height', w)
}

//highlightNav()

function highlightNav() {
    var top = $(window).scrollTop(),
        x1 = checkScroll(top)
        $('#nav li').removeClass('current parent-current')
        if(x1 > -1) $('#nav li').eq(x1).addClass('current').parents('li').addClass('parent-current')
        setNavHeight()
}

//checkScroll position

function checkScroll(top) {
    var p = -1,
        len = tops.length - 1
    for(var i = 0; i < len; i++) {
        if(top >= tops[i] && top < tops[i + 1]) {
            return i - 1
        }
        if(i == i - 1) return -1
    }
}

//hightlight.js
var hljs=new function(){function l(o){return o.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function b(p){for(var o=p.firstChild;o;o=o.nextSibling){if(o.nodeName=="CODE"){return o}if(!(o.nodeType==3&&o.nodeValue.match(/\s+/))){break}}}function h(p,o){return Array.prototype.map.call(p.childNodes,function(q){if(q.nodeType==3){return o?q.nodeValue.replace(/\n/g,""):q.nodeValue}if(q.nodeName=="BR"){return"\n"}return h(q,o)}).join("")}function a(q){var p=(q.className+" "+q.parentNode.className).split(/\s+/);p=p.map(function(r){return r.replace(/^language-/,"")});for(var o=0;o<p.length;o++){if(e[p[o]]||p[o]=="no-highlight"){return p[o]}}}function c(q){var o=[];(function p(r,s){for(var t=r.firstChild;t;t=t.nextSibling){if(t.nodeType==3){s+=t.nodeValue.length}else{if(t.nodeName=="BR"){s+=1}else{if(t.nodeType==1){o.push({event:"start",offset:s,node:t});s=p(t,s);o.push({event:"stop",offset:s,node:t})}}}}return s})(q,0);return o}function j(x,v,w){var p=0;var y="";var r=[];function t(){if(x.length&&v.length){if(x[0].offset!=v[0].offset){return(x[0].offset<v[0].offset)?x:v}else{return v[0].event=="start"?x:v}}else{return x.length?x:v}}function s(A){function z(B){return" "+B.nodeName+'="'+l(B.value)+'"'}return"<"+A.nodeName+Array.prototype.map.call(A.attributes,z).join("")+">"}while(x.length||v.length){var u=t().splice(0,1)[0];y+=l(w.substr(p,u.offset-p));p=u.offset;if(u.event=="start"){y+=s(u.node);r.push(u.node)}else{if(u.event=="stop"){var o,q=r.length;do{q--;o=r[q];y+=("</"+o.nodeName.toLowerCase()+">")}while(o!=u.node);r.splice(q,1);while(q<r.length){y+=s(r[q]);q++}}}}return y+l(w.substr(p))}function f(q){function o(s,r){return RegExp(s,"m"+(q.cI?"i":"")+(r?"g":""))}function p(y,w){if(y.compiled){return}y.compiled=true;var s=[];if(y.k){var r={};function z(A,t){t.split(" ").forEach(function(B){var C=B.split("|");r[C[0]]=[A,C[1]?Number(C[1]):1];s.push(C[0])})}y.lR=o(y.l||hljs.IR,true);if(typeof y.k=="string"){z("keyword",y.k)}else{for(var x in y.k){if(!y.k.hasOwnProperty(x)){continue}z(x,y.k[x])}}y.k=r}if(w){if(y.bWK){y.b="\\b("+s.join("|")+")\\s"}y.bR=o(y.b?y.b:"\\B|\\b");if(!y.e&&!y.eW){y.e="\\B|\\b"}if(y.e){y.eR=o(y.e)}y.tE=y.e||"";if(y.eW&&w.tE){y.tE+=(y.e?"|":"")+w.tE}}if(y.i){y.iR=o(y.i)}if(y.r===undefined){y.r=1}if(!y.c){y.c=[]}for(var v=0;v<y.c.length;v++){if(y.c[v]=="self"){y.c[v]=y}p(y.c[v],y)}if(y.starts){p(y.starts,w)}var u=[];for(var v=0;v<y.c.length;v++){u.push(y.c[v].b)}if(y.tE){u.push(y.tE)}if(y.i){u.push(y.i)}y.t=u.length?o(u.join("|"),true):{exec:function(t){return null}}}p(q)}function d(D,E){function o(r,M){for(var L=0;L<M.c.length;L++){var K=M.c[L].bR.exec(r);if(K&&K.index==0){return M.c[L]}}}function s(K,r){if(K.e&&K.eR.test(r)){return K}if(K.eW){return s(K.parent,r)}}function t(r,K){return K.i&&K.iR.test(r)}function y(L,r){var K=F.cI?r[0].toLowerCase():r[0];return L.k.hasOwnProperty(K)&&L.k[K]}function G(){var K=l(w);if(!A.k){return K}var r="";var N=0;A.lR.lastIndex=0;var L=A.lR.exec(K);while(L){r+=K.substr(N,L.index-N);var M=y(A,L);if(M){v+=M[1];r+='<span class="'+M[0]+'">'+L[0]+"</span>"}else{r+=L[0]}N=A.lR.lastIndex;L=A.lR.exec(K)}return r+K.substr(N)}function z(){if(A.sL&&!e[A.sL]){return l(w)}var r=A.sL?d(A.sL,w):g(w);if(A.r>0){v+=r.keyword_count;B+=r.r}return'<span class="'+r.language+'">'+r.value+"</span>"}function J(){return A.sL!==undefined?z():G()}function I(L,r){var K=L.cN?'<span class="'+L.cN+'">':"";if(L.rB){x+=K;w=""}else{if(L.eB){x+=l(r)+K;w=""}else{x+=K;w=r}}A=Object.create(L,{parent:{value:A}});B+=L.r}function C(K,r){w+=K;if(r===undefined){x+=J();return 0}var L=o(r,A);if(L){x+=J();I(L,r);return L.rB?0:r.length}var M=s(A,r);if(M){if(!(M.rE||M.eE)){w+=r}x+=J();do{if(A.cN){x+="</span>"}A=A.parent}while(A!=M.parent);if(M.eE){x+=l(r)}w="";if(M.starts){I(M.starts,"")}return M.rE?0:r.length}if(t(r,A)){throw"Illegal"}w+=r;return r.length||1}var F=e[D];f(F);var A=F;var w="";var B=0;var v=0;var x="";try{var u,q,p=0;while(true){A.t.lastIndex=p;u=A.t.exec(E);if(!u){break}q=C(E.substr(p,u.index-p),u[0]);p=u.index+q}C(E.substr(p));return{r:B,keyword_count:v,value:x,language:D}}catch(H){if(H=="Illegal"){return{r:0,keyword_count:0,value:l(E)}}else{throw H}}}function g(s){var o={keyword_count:0,r:0,value:l(s)};var q=o;for(var p in e){if(!e.hasOwnProperty(p)){continue}var r=d(p,s);r.language=p;if(r.keyword_count+r.r>q.keyword_count+q.r){q=r}if(r.keyword_count+r.r>o.keyword_count+o.r){q=o;o=r}}if(q.language){o.second_best=q}return o}function i(q,p,o){if(p){q=q.replace(/^((<[^>]+>|\t)+)/gm,function(r,v,u,t){return v.replace(/\t/g,p)})}if(o){q=q.replace(/\n/g,"<br>")}return q}function m(r,u,p){var v=h(r,p);var t=a(r);if(t=="no-highlight"){return}var w=t?d(t,v):g(v);t=w.language;var o=c(r);if(o.length){var q=document.createElement("pre");q.innerHTML=w.value;w.value=j(o,c(q),v)}w.value=i(w.value,u,p);var s=r.className;if(!s.match("(\\s|^)(language-)?"+t+"(\\s|$)")){s=s?(s+" "+t):t}r.innerHTML=w.value;r.className=s;r.result={language:t,kw:w.keyword_count,re:w.r};if(w.second_best){r.second_best={language:w.second_best.language,kw:w.second_best.keyword_count,re:w.second_best.r}}}function n(){if(n.called){return}n.called=true;Array.prototype.map.call(document.getElementsByTagName("pre"),b).filter(Boolean).forEach(function(o){m(o,hljs.tabReplace)})}function k(){window.addEventListener("DOMContentLoaded",n,false);window.addEventListener("load",n,false)}var e={};this.LANGUAGES=e;this.highlight=d;this.highlightAuto=g;this.fixMarkup=i;this.highlightBlock=m;this.initHighlighting=n;this.initHighlightingOnLoad=k;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BNR="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\[\\s\\S]",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0};this.CLCM={cN:"comment",b:"//",e:"$"};this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"};this.HCM={cN:"comment",b:"#",e:"$"};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BNM={cN:"number",b:this.BNR,r:0};this.inherit=function(q,r){var o={};for(var p in q){o[p]=q[p]}if(r){for(var p in r){o[p]=r[p]}}return o}}();hljs.LANGUAGES.javascript=function(a){return{k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",literal:"true false null undefined NaN Infinity"},c:[a.ASM,a.QSM,a.CLCM,a.CBLCLM,a.CNM,{b:"("+a.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[a.CLCM,a.CBLCLM,{cN:"regexp",b:"/",e:"/[gim]*",i:"\\n",c:[{b:"\\\\/"}]},{b:"<",e:">;",sL:"xml"}],r:0},{cN:"function",bWK:true,e:"{",k:"function",c:[{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*"},{cN:"params",b:"\\(",e:"\\)",c:[a.CLCM,a.CBLCLM],i:"[\"'\\(]"}],i:"\\[|%"}]}}(hljs);hljs.LANGUAGES.css=function(a){var b={cN:"function",b:a.IR+"\\(",e:"\\)",c:[a.NM,a.ASM,a.QSM]};return{cI:true,i:"[=/|']",c:[a.CBLCLM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",eE:true,k:"import page media charset",c:[b,a.ASM,a.QSM,a.NM]},{cN:"tag",b:a.IR,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[a.CBLCLM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[b,a.NM,a.QSM,a.ASM,a.CBLCLM,{cN:"hexcolor",b:"\\#[0-9A-F]+"},{cN:"important",b:"!important"}]}}]}]}]}}(hljs);hljs.LANGUAGES.xml=function(a){var c="[A-Za-z0-9\\._:-]+";var b={eW:true,c:[{cN:"attribute",b:c,r:0},{b:'="',rB:true,e:'"',c:[{cN:"value",b:'"',eW:true}]},{b:"='",rB:true,e:"'",c:[{cN:"value",b:"'",eW:true}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:true,c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[b],starts:{e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[b],starts:{e:"<\/script>",rE:true,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ />]+"},b]}]}}(hljs);