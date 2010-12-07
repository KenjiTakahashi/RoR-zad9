function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
$.fn.wait = function(time, type) {
	time = time || 1400;
    type = type || "fx";
    return this.queue(type, function() {
    	var self = this;
        setTimeout(function() {
        	$(self).dequeue();
        }, time);
    });
};
function subonclick(object) {
	$(object).click(function() {		
		var name=$(this).attr("title");
		var sname=$(this).attr("href");
		var desc=$(this).attr("id");
		sname=ltrim(sname,"#");
		$("#galContent").hide("fast");
		$.ajax({
		   		method: "get", url: "default.php", data: "page="+name+"&gal="+sname+"&desc="+desc,
		   		beforeSend: function() {$(".galload").show("fast");},
		   		complete: function() {$(".galload").hide("fast");},
		   		success: function(html) {
			   		$(".content").html(html);
					$("#galContent").show("fast");
		   		}
		});
	});
}
$(document).ready(function() {
	subonclick(".smlgalaction");
	var count=$("#g1").attr("count");
	var top=160;
	var left=40;
	var i=1;
	var j=0;
	var h=160+((parseInt(count/3))*140);
	if(count==null) {
	   h=300;
	}
	$("#galContent").animate( {
		"height":h+"px"
	},100);
	function move(i,left) {
		if(i<=3)
		{
			$("#g"+i).animate( {
				"left":left+"px",
				"opacity":"1"
			},500,function() {
				left+=180;
				i++;
				move(i,left);
			});
		}
	};
	move(i,left);
	left=40;
	j=0;
	$("#galContent").wait().animate( {
		"height":h+"px"
	},100,function() {
		for(i=4;i<=count;i++)
		{
			$("#g"+i).css( {
				"left":left+"px"
			});
			$("#g"+i).animate( {
				"top":top+"px",
				"opacity":"1"
			},500);
			left+=180;
			j++;
			if(j==3)
			{
				top+=140;
				left=40;
				j=0;
			}
		};
	});
});