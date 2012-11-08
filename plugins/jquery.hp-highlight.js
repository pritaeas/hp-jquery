(function($){
	$.fn.extend({
		highlight: function(options) {
			// Version 1.0 (2009-12-12)
			// Author: pritaeas

			var defaults = {
				highlightWords: [],
				wholeWordsOnly: true,
				cssClass: "highlighted"
			};

			var options = $.extend(defaults, options);
			
		   	var target = "<span class=" + options["cssClass"] + ">$&<\/span>";
		   	var boundary_left = "";
		   	var boundary_right = "";
		   	if (options["wholeWordsOnly"]) {
		   		boundary_left = "\\b(";
		   		boundary_right = ")\\b";
		   	}
			var source = new RegExp("(?!<[^>]*?)" + boundary_left + options["highlightWords"].join("|") + boundary_right + "(?!([^<]*?>))", "ig");
			
			return this.each(function() {
				var obj = $(this);
			   	obj.html(obj.html().replace(source, target));
			});
		},
		
		removeHighlight: function(options) {

			var defaults = {
				cssClass: "highlighted"
			};

			var options = $.extend(defaults, options);
		
		   	var source = new RegExp("<span class=['\"]?" + options["cssClass"] + "['\"]?>(.*?)</span>", "ig");
		   	var target = "$1";

			return this.each(function() {
				var obj = $(this);
			   	obj.html(obj.html().replace(source, target));
			});
		}
	});
})(jQuery);