(function($){
    $.fn.extend({
        wikify: function(options) {

            // http://en.wikipedia.org/w/api.php?action=opensearch&search=hirudinea
            // http://nl.wikipedia.org/w/api.php?action=opensearch&search=bloedzuiger&format=json&limit=1

            var defaults = {
            	language: "en",
            	minWordLength: 6,
            	exactMatchOnly: true,
            	cssClass: "wikilink"
            };

            var options = $.extend(defaults, options);
            var prepend = "<a href='#' class='" + options["cssClass"] + "'>";
           	var append = "</a>";
           	var url = "http://" + options["language"] + ".wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&callback=?&search=";
           	var href = "http://" + options["language"] + ".wikipedia.org/wiki/";

            return this.each(function() {
                var obj = $(this);
                var words = obj.text().split(" ").sort();

                var idx = 0;
                while (idx < words.length) {
					words[idx] = words[idx].replace(/\W/, "");
                	if (words[idx].length < options["minWordLength"]) {
                		// word is too short, remove
                		words.splice(idx, 1);
                	}
                	else if (idx > 0 && words[idx] == words[idx - 1]) {
                		// word equals previous word, remove
                		words.splice(idx, 1);
                	}
                	else {
						$.getJSON(
							url + words[idx],
							function (data) {
								// TODO: data[1] is an array of matches, not a string ... change this !
								// TODO: Add function to remove the links (see highlight plugin)
								
								if (data[1] != null && data[1] != "") { // data[1].length == 1 && 
									if (!options["exactMatchOnly"] || (data[0].toString().toLowerCase() === data[1].toString().toLowerCase())) {
										var source = new RegExp("(?!<[^>]*?)\\b" + data[0] + "\\b(?!([^<]*?>))", "ig");
										var target = "<a class='" + options["cssClass"] + "' href='" + href + data[1] + "'>$&<\/a>";
										obj.html(obj.html().replace(source, target));
									}
								}
							}
						);
                		idx++;
                	}
                }
            });
        }
    });
})(jQuery);