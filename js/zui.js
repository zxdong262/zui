/**
 * zui.js for mobileui
 * by ZHAO Xudong,zxdong@gmail.com
 * part of zui
 * ver 0.5
 */

//globals
var debugON = true
UITimer = null

/* init UI elem */ 
function initUI(fa) {

	var x = fa?fa.toString() + ' ':'body '

	//btn init
	$(x + '.btn').each(function() {
		var th = $(this)
		,hasType = !th.attr('type')
		,cls = th.attr('class')
		,icon = cls.split('with-')
		if(hasType && !th.hasClass('select')) th.html('<span class="btn-txt">' + th.text() + '</span>')
          if(icon.length > 1 && hasType) {
           var ic = icon[1].split(' ')[0]
           th.prepend(
            (th.hasClass('icon-only')?'<span class="icon-cell icon-shadow icon-corner">':'') +
            '<span class="icon icon-corner ' + ic +'"></span>' +
            (th.hasClass('icon-only')?'</span>':'')
            ).addClass('btn-with-icon')
       }

   })

	//table
	$(x + 'table').each(function() {
		var th = $(this)
		th.children('caption').addClass('bar-c corner')
		th.addClass('table').find('tr').filter(function(index){
			return index%2 == 0
		}).addClass('odd')
		th.find('th').addClass('th td')
		th.find('td').addClass('td')
	})

	//acordin
	$(x + '.acordin').each(function() {
		var tt = $(this);
		tt.addClass('border corner')
		tt.children('h3').wrap('<div class="acordin-head borderb bg-fff" />')
		var he = tt.children('.acordin-head')
		he.prepend('<span class="icon icon-corner icon-arrow-r"></span>').next().addClass('borderb').wrap('<div class="acordin-body" />')
        he.first().addClass('cornert first')
        he.last().addClass('cornerb last').removeClass('borderb')
        tt.children('.acordin-body').last().children().removeClass('borderb')

        he.click(function() {
           var th = $(this)
           if(!th.hasClass('open')) {
            th.parent().children('.acordin-head.last.open').addClass('cornerb')
            var xt = th.parent().children('.acordin .acordin-head.open')
            xt.removeClass('open').children('.icon')
            .addClass('icon-arrow-r').removeClass('icon-arrow-d')
            xt.next().animate({
             height:0
         }, 200)

            th.addClass('open').children('.icon').removeClass('icon-arrow-r').addClass('icon-arrow-d')
            if(th.hasClass('last')) th.removeClass('cornerb')
                var tn = th.next()
            ,h = tn.children().eq(0).height();
            tn.animate({
                height:h
            }, 200, 'linear', function() {
                tn.css('height','auto')
            })
        }
        else {
            th.removeClass('open').children('.icon').addClass('icon-arrow-r').removeClass('icon-arrow-d')
            if(th.hasClass('last')) th.addClass('cornerb')
                th.next().animate({
                height:0
            }, 500)
        }
    })
})

    //input
    $(x + 'input').each(function() {
    	var t = $(this)
    	t.addClass('input ' + t.attr('type'));
    })
    //input wrapper
    var typs = ['button','checkbox','date','datetime','datetime-local',
    'email','file','hidden','image','month','number','password',
    'radio','range','reset','submit','text','time','url','week','color','search','tel']
    ,typ1 = ['date','datetime','datetime-local',
    'email','month','number','password',
    'range','text','time','url','week','color','search','tel']
    ,q = 'textarea,input.' + typ1.join(',input.')

    $(x).find(q).addClass('text-input').wrap('<div class="input-cell input-corner input-shadow" />')
    $(x + '.text-input.search').parent().addClass('input-search-cell')
    $(x + 'textarea.text-input').parent().addClass('textarea-cell')
    $(x + '.text-input.with-btn-clear')
    .after('<a href="javascript:;" class="btn-clear icon-cell icon-shadow icon-corner hide"><span class="icon icon-corner icon-delete"></span></a>')
    .parent().addClass('with-btn-clear')
    $(x).on('focus', '.text-input', function(e) {
        $(this).parent().addClass('focus-shadow')
    }).on('blur', '.text-input', function(e) {
        $(this).parent().removeClass('focus-shadow')
    }).on('keyup','.text-input.with-btn-clear', function() {
        var t = $(this)
        if(t.val()) t.siblings('.btn-clear').removeClass('hide')
        else t.siblings('.btn-clear').addClass('hide')
    }).on('click', '.input-cell .btn-clear', function() {
        $(this).addClass('hide').siblings('.with-btn-clear').val('').focus()
    })

    //ui-checkbox
    $(x + '.ui-checkbox').each(function() {
    	var t = $(this)
    	,txt = t.prev('label').addClass('hide').text()
    	t.addClass('hide').wrap('<a href="javascript:;" class="btn btn-with-icon btn-checkbox '+
        (t.hasClass('checkbox-inline')? 'btn-inline':'') +
        (t.hasClass('with-shadow')? 'shadow ':' ') +
        ' btn-a" />').parent().prepend('<span class="icon icon-corner icon-checkbox-' +
        (t.attr('checked')?'on':'off') +
        '"></span><span class="btn-txt">' +
        (txt?txt:'&nbsp;') +
        '</span>')
     })

    //checkbox function
    $(x).on('click','.btn-checkbox',function() {
    	var t = $(this)
    	,tc = t.children('.checkbox')
    	,ti = t.children('.icon')
    	,tcc = tc.attr('checked')
    	if(tcc) {
    		t.addClass('btn-a').removeClass('btn-c')
    		tc.prop('checked',false)
    		ti.removeClass('icon-checkbox-on').addClass('icon-checkbox-off')
    	}
    	else {
    		t.removeClass('btn-a').addClass('btn-c')
    		tc.prop('checked',true)
    		ti.addClass('icon-checkbox-on').removeClass('icon-checkbox-off')
    	}   	
    })

    //ui-radio
    $(x + '.radiogroup > .radio').each(function() {
    	var t = $(this)
    	,tp = t.parent()
    	,txt = t.prev('label').addClass('hide').text()
    	,tc = t.attr('checked')
    	t.addClass('hide').wrap('<a href="javascript:;" class="radio-in btn btn-with-icon btn-radio '+
        (tp.hasClass('radio-inline')? 'btn-inline ':' ') +
        (tp.hasClass('with-shadow')? 'shadow ':' ') +
        (tc?'btn-c':'btn-a') +
        '" />').parent().prepend('<span class="icon icon-corner icon-radio-' +
        (tc?'on':'off') +
        '"></span><span class="btn-txt">' +
        (txt?txt:'&nbsp;') +
        '</span>')
     })
    $(x + '.radiogroup').each(function() {
    	var t = $(this).children('.btn-radio')
    	t.first().addClass('radio-first').removeClass('radio-in')
    	t.last().addClass('radio-last').removeClass('radio-in')
    })

    //radio function
    $(x).on('click','.btn-radio',function() {
    	var t = $(this)
    	,tc = t.children('.radio')
    	,ti = t.children('.icon')
    	,tcc = tc.prop('checked')
    	,ts = t.siblings('.btn-radio')
    	if(tcc) return;
    	else {
    		t.removeClass('btn-a').addClass('btn-c')
    		ts.addClass('btn-a').removeClass('btn-c')
    		tc.trigger('click')
    		ti.addClass('icon-radio-on').removeClass('icon-radio-off')
    		ts.children('.icon').removeClass('icon-radio-on').addClass('icon-radio-off')
    	}
    	
    })

    //icon setting 
    $(x + '.with-icon, ' + x + '.with-label').each(function() {
    	var t = $(this)
    	if(t.hasClass('with-icon')) {
    		var cls = t.attr('class')
    		,ic = 0
    		,icon = cls.split('has-icon-')
            if(icon.length>1) ic = icon[1].split(' ')[0] 
            t.prepend('<span class="icon-cell icon-corner"><span class="icon-corner icon icon-'+ 
            (ic?ic:'arrow-u') + '"></span></span>')
       }
       else {
    	//todo label
        }
    })

	//list 
	$(x + '.list').each(function() {
		var t = $(this)
		,tc = t.children()
		if(t.hasClass('corner')) {
			tc.first().addClass('cornert')
			tc.last().addClass('cornerb')
		}
		tc.first().addClass('li-first')
		tc.last().addClass('li-last')
	})

	//grid
	$(x + '.grid').each(function() {
		var t = $(this)
		,grid = t.attr('class').split('gridx')
		,g = ''
		if(grid.length>1) g = grid[1].split(' ')[0]
        var gn = parseInt(g,10)
        ,lenc = t.children().length
        ,let0 = lenc % gn
        ,len = let0?Math.floor( lenc / gn ) + 1:Math.floor( lenc / gn )
        for(var i = 0;i < len ;i ++) {
            t.children().filter(function(index) {
                return index < gn * (i + 1)
            }).addClass('row-' + i)
        }
        for(var j = 0;j < len;j ++) {
            t.children('.row-' + j).wrapAll('<div class="tablerow" />')
        }
        t.children().children().wrap('<div class="tablecell grid-cell" />')
        if(let0) {
            var xl = gn - let0
            ,tl = t.children().last()
            for(var k = 0;k < xl;k ++) {
               tl.append('<div class="tablecell grid-cell"></div>')
            }
        }
    })

	//controlgroup 
	$(x + '.controlgroup').each(function() {
		var t = $(this).addClass('fix')
		,tc = t.children()
		,tcl = tc.length
		tc.addClass('btn-control').first().addClass('btn-control-first')
		tc.last().addClass('btn-control-last')
		tc.filter(function(index) {
			return (index > 0)  && (index < tcl-1)
		}).addClass('btn-control-in')
	})

	//bar
	$(x + '.bar').each(function() {
		var t = $(this)
		t.children().filter(function(index) {
			return !$(this).hasClass('btn')
		}).addClass('bar-txt')
	})


}

/**
 * popup.js 
 * @param opts
 */

function popup(opts) {
    var defs = {
        content: '',
        timer: 0,
        short:false,
        fixed:true,
        css:''
    }
    $.extend(defs, opts)

    var ht = 
    '<div id="popup" class="' +
    defs.css + ' ' +
    (defs.short?'short ':'') +
    (defs.fixed?'fixed':'') +
    '"><div id="popup-inner">' +
    '<div class="popup-content"></div>' +
    '<a href="javascript:" class="btn-close">&times</a>' +
    '</div></div>'
    $('#popup').remove()
    $('body').prepend(ht)
    clearTimeout(UITimer)
    function popout() {
        $('#popup-inner').hide()
        $('#popup').animate({
            height:0
        },500)
    }

    $('#popup .btn-close').click(function() {
        clearTimeout(UITimer)
        popout()
    })
    $('#popup .popup-content').html(defs.content)
    var w = $('#popup-inner').width()
    if(defs.short) $('#popup').css('margin-left',-w/2)
    $('#popup').animate({
        height:$('#popup-inner').height()
    },500,'linear',function() {
        if(defs.timer) UITimer = setTimeout(function() {
            popout()
        },parseInt(defs.timer))
    })
}

/** 
 * modal 
 * @param options object {}
 */


$.fn.modal = function(opts){
    var defaults = {
        width:300,
        title:'Title',
        content:'&nbsp;',
        dismiss:true,
        showTitle:true
    }
    var t = this

	//close
	if(opts === 'close') {
		$('#overlay').hide()
		t.hide()
		return false
	}	

	//destroy
	if(opts === 'destroy') {

	}		
	$.extend(defaults, opts)

	//overlay
	var overlay = '<div id="overlay" class="overlay hide"></div>'
	if(!$('#overlay').length) $('body').append(overlay)

	//init modal content
    if(!t.hasClass('modal')) {
        t.addClass('modal border shadow corner hide')
        t.children().wrapAll('<div class="modal-content" />')
        t.children().wrap('<div class="modal-content-wrap" />')
        if(defaults.showTitle) t.prepend('<div class="modal-head corner border bg-eee"><span class="modal-title"></span></div>')
        if(defaults.dismiss) t.children().first().append('<a href="javascript:" class="btn-close">&times</a>')
    }

    t.find('.btn-close').on('click',function() {
        $('#overlay').hide()
        $(this).parents('.modal').hide()
    })

    t.find('.modal-title').text(defaults.title)
    $('#overlay').show()
    t.show()

    var
    mcw = t.children('.modal-content-wrap')
    mcw.removeClass('scroll').height('auto')

    var
    w = screen.width()
    ,h = screen.height()
    ,ww = defaults.width
    ,hh = mcw.height()
    ,ht = t.height()
    ,hw = t.height() - hh + 20
    ,ww = ww > w - 20?w-20:ww
    ,ll = ( w - ww ) / 2
    ,tt = ( h - ht ) / 2
    tt = tt > 10 ? tt : 10

    if( hh > h - hw ) {
        hh = h - hw
        mcw.addClass('scroll').css({
            height:hh
        })
    }

    t.css({
        left:ll,
        top:tt,
        width:ww
    })

    return t

}

/** 
 * escape html
 */
$.fn.escape = function() {
    return this.html(this.html().replace(/\</g,'&lt;').replace(/>/g,'&gt;'))
}

/* debug */
function debug(info) {
    if(!debugON) return
    if(!$('#debug').length) {
        $('body').append('<div id="debug" class="color-green aligncenter"><p class="bold">debug:</p></div>')
    }
    $('#debug').append('<p>'+info+'</p>')
}