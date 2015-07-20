//"use strict";
/**
 * Author: Johnson and Johnson
 */
var JNJ = {
	common : {
		init: function(){
			this.toc();
			this.syntax();
			this.animations();
		},
		// generate table of contents
		toc : function(){
			var main = document.getElementById('main'),
				toc = document.getElementById('toc'),
				hx = $('section h2, section h3, section h4, section h5, #revisions h1'),
				frag = document.createDocumentFragment(),
				hx_len = hx.length,
				anchor, tag, the_text;
				
			for (var i = 0, j = hx_len; i < j; i++) {
				tag = hx[i].tagName.toLowerCase();

				if (tag == 'h2' || tag == 'h3') {
					the_text = $.trim( hx[i].innerHTML );
					anchor = '_' + the_text.replace(/\s+|\-/g, '_').replace(/[^A-Z0-9_]/gi, '').replace(/_+/g, '_').toLowerCase();

					hx[i].id = anchor;
					hx[i].innerHTML += '<a href="#' + anchor + '" class="badge message" title="Permalink">permalink</a>';

					if(tag == 'h2') {
						toc.innerHTML += '<li class="' + tag + '"><a href="#' + anchor + '"> ' + the_text + '</a></li>';
					}
				}
				
			}
			toc.style.display = 'block';
		},
		// set up syntax highlighter
		syntax : function(){
			SyntaxHighlighter.config.tagName = 'textarea';
			SyntaxHighlighter.defaults['wrap-lines'] = false;
			SyntaxHighlighter.defaults['auto-links'] = false;
			SyntaxHighlighter.defaults['toolbar'] = false;
			SyntaxHighlighter.defaults['tab-size'] = 4;
			SyntaxHighlighter.all();
		},
		animations : function() {

			// Sample Modal
			$("#launch_sample_modal").on("click", function(){
				var qBox = new QBox({
					html: $("#sample_modal").html(),
					className: "mod m_pop m_modal l_col_6"
				});
				qBox.show();
			});

			// Toggle nav
			$(".drawer").jnjDrawer();

			// Accordion
			$(".acdn").jnjAccordion();

		}
	}
};

var UTIL = {
	fire : function(func,funcname, args){
		var namespace = JNJ;  // indicate your obj literal namespace here
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		} 
	}, 
	loadEvents : function(){
		var bodyId = document.body.id;
		// hit up common first.
		UTIL.fire('common');
		// do all the classes too.
		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});
		UTIL.fire('common','finalize');
	} 
}; 
// kick it all off here 
$(document).ready(UTIL.loadEvents);
