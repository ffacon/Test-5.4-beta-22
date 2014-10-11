requirejs.config({
	"shim" : {
		"tjq/vendor/components/ddslick/jquery.ddslick.min": ["jquery"]
	}
});
define(["t5/core/dom", "t5/core/zone", "t5/core/events", "t5/core/ajax", "tjq/vendor/components/ddslick/jquery.ddslick.min"], function(dom, zone, events, ajax) {
	init = function(spec) {
		jQuery('#'+spec.elementId).ddslick({
			data: spec.ddData,
			selectText: spec.ddSelectText,
			defaultSelectedIndex: spec.ddDefaultSelectedIndex,
			imagePosition: spec.ddImagePosition,
			truncateDescription : spec.ddTruncateDescription,
			background : spec.ddBackground,
			width : spec.ddWidth,
			height : spec.ddHeight,
			showSelectedHTML : spec.ddShowSelectedHTML,
					
			onSelectedElement: function(data){
				var url = spec.url;
				var parameters = {};
				parameters = data.selectedData;
				
				if(spec.zone){
					var z = zone.findZone(dom.wrap(spec.elementId));	
					if(z){
						z.trigger(events.zone.refresh, {
							url: url, 
							parameters: parameters
						});
					}	
				}else{
					ajax(url, {
						parameters: parameters
					});
				}
			}
		});
		if(spec.zone) jQuery('#'+spec.elementId).attr("data-update-zone", spec.zone);
	  };
  	
  	return exports = init;
});