(function($){
	$.fn.extend({
		circulate: function(options) {
			// Version 1.0 (2010-03-21)
			// Author: pritaeas

			var defaults = {
				width: 600,
				height: 600,
				iconwidth: 48,
				iconheight: 48
			};

			var options = $.extend(defaults, options);
			
			var iconcount = $(this).length;
			var originx = Math.floor(options["width"] / 2) - Math.floor(options["iconwidth"] / 2);
			var originy = Math.floor(options["height"] / 2) - Math.floor(options["iconheight"] / 2);
			var radius = Math.floor(Math.min(originx, originy));
			var angle = 2 * Math.PI / iconcount;
			var startangle = Math.PI / 2;
			var index = 0;
			var posx = 0;
			var posy = 0;

			return this.each(function() {
				posx = originx + Math.floor(Math.cos(startangle + index * angle) * radius);
				posy = originy - Math.floor(Math.sin(startangle + index * angle) * radius);
				$(this).css({ top: posy, left: posx });
				index++;
			});
		}
	});
})(jQuery);