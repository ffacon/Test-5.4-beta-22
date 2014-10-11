requirejs.config({
	"shim" : {
		"tjq/vendor/ui/jquery-ui.custom": ["jquery"],
		"tjq/vendor/jquery.json-2.4": ["jquery"], 
	}
});
define([  "t5/core/dom", "t5/core/events", "tjq/vendor/ui/jquery-ui.custom", "tjq/vendor/jquery.json-2.4"], function(dom, events) {

	draggable = function(spec) {
		jQuery( "#" + spec.id ).draggable(spec.params).data("contexte",spec.context);
	};

	droppable = function(spec) {
		jQuery( "#" + spec.id ).droppable(spec.params);
    		jQuery( "#" + spec.id ).bind( "drop", function(event, ui) {
    			 var contexte=jQuery(ui.draggable).data("contexte");
    			 
				 var parts = spec.BaseURL.split("?");
				 parts[0] += "/" + encodeURIComponent(contexte);
				 var urlWithContexte = parts.join("?");
				
				var z = dom.wrap(spec.id);
						if(z){
							z.trigger(events.zone.refresh, {
								url: urlWithContexte 
							
							});
				}	
    			
    		});
	};

	resizable = function(spec) {
		// TODO
	};

	selectable = function(spec) {
		// TODO
	};

	sortable = function(spec) {
		var sep = (spec.url.indexOf("?") >= 0) ? "&" : "?";

		if(!spec.params.update)
			spec.params.update=function(a,b){
				ajaxRequest = {
                        url: spec.url + sep + "list="+ jQuery("#"+spec.id).sortable("toArray").toString()
                };
				jQuery.ajax(ajaxRequest);
		};
		jQuery("#"+spec.id).sortable(spec.params);	
		jQuery("#"+spec.id).disableSelection();
	};

	accordion = function(spec) {
		jQuery("#" + spec.id).accordion(spec.params);
	};

	autocomplete = function(spec) {
		var conf = {
				source: function(request, response){
					
					var params = {};
					
					var extra = jQuery("#" + spec.id).data('extra');
					if(extra) {
						params["extra"] = extra;
					}
					
					params[spec.paramName] = request.term;
					
					var ajaxRequest = {
					 	type:"POST",
                    	url:spec.url,
                    	dataType: "json",
        				success: function(data){
                            response(eval(data));
                        }, 
                        data:{
                        	"data" : jQuery.toJSON( params )
                        } 
                    };
                    this.xhr = jQuery.ajax(ajaxRequest);
                }
        };
        
        if (spec.delay >= 0) 
        	conf.delay = spec.delay;
            
        if (spec.minLength >= 0) 
        	conf.minLength = spec.minLength;

        if (spec.options) {
        	jQuery.extend(conf, spec.options);
        }
        
        jQuery("#" + spec.id).autocomplete(conf);
	};

	button = function(spec) {
		if (spec.type == "buttonset")
			jQuery("#" + spec.id).buttonset(spec.params);
		else
			jQuery("#" + spec.id).button(spec.params);
	};

	datepicker = function(spec) {
		jQuery("#" + spec.field).datepicker({
            gotoCurrent: true,
            showOn: "button",
            buttonImageOnly: false,
            disabled: $("#" + spec.field).attr("disabled")
        });
	};

	dialog = function(spec) {
		 jQuery("#" + spec.id).dialog(spec.params);
	};

	menu = function(spec) {
		// TODO
	};

	progressbar = function(spec) {
		// TODO
	};

	slider = function(spec) {
		// TODO
	};

	spinner = function(spec) {
		// TODO
	};

	tabs = function(spec) {
		var p = spec.params;
		if (!p.ajaxOptions)
			p.ajaxOptions = {};
		if (!p.ajaxOptions.beforeSend)
			jQuery.extend(p.ajaxOptions, {
				beforeSend : function() {
					// returning false in beforeSend function cancels the AJAX
					// request, see issue #52
					return false;
				}
			});
		jQuery("#" + spec.id).tabs(p);
	};

	tooltip = function(spec) {
		jQuery("#" + spec.id).tooltip(spec.options);
	};

	return exports = {
		// Interactions
		draggable : draggable,
		droppable : droppable,
		resizable : resizable,
		selectable : selectable,
		sortable : sortable,

		// Widgets
		accordion : accordion,
		autocomplete : autocomplete,
		button : button,
		datepicker : datepicker,
		dialog : dialog,
		menu : menu,
		progressbar : progressbar,
		slider : slider,
		spinner : spinner,
		tabs : tabs,
		tooltip : tooltip
	};
});