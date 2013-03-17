/**
 * jQuery Tab plugin for flow contents
 * by 겨미겨미 (miya.pe.kr)
 *
 * Copyright (c) 2010 겨미겨미 (miya.pe.kr)
 * Dual licensed under the MIT and GPL licenses.
 *
 * NOTE: This script requires jQuery to work.  Download jQuery at www.jquery.com
 * 
 * markup example
 *	<div id="tabs">
 *		<h2 class="heading">tab1</h2>
 *		<div>tab1 content</div>
 *		<h2 class="heading">tab2</h2>
 *		<div>tab2 content</div>
 *	</div>
 *
 */
;(function($) {
	$.fn.flowTab = function(o) {
		var options = $.extend({
			tabSelector: '> .heading',
			tabEnabledClass: 'headingEnabled',
			contentDisabledClass: 'disabled'
		}, o);

		return this.each(function() {
			var $tabs = $(this).find(options.tabSelector);
			var $contents = $tabs.next();
			$tabs.eq(0).addClass(options.tabEnabledClass);
			$contents.addClass(options.contentDisabledClass).eq(0).removeClass(options.contentDisabledClass);

			$tabs.attr('tabindex', 0).focus(function() {
				var $content = $(this).next();

				$tabs.removeClass(options.tabEnabledClass);
				$(this).addClass(options.tabEnabledClass);
				$contents.addClass(options.contentDisabledClass);
				$content.removeClass(options.contentDisabledClass);
			});
		});
	};
})(jQuery);

