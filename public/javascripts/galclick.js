$(document).ready(function() {
    $(".galclick").click(function() {
        var parent_ = $(this).parent();
        var bg=$("<div/>");
        var imgbg=$("<div/>");
        var nav=$("<div/>");
        var img=$("<img/>");
        var prev=$("<a/>");
        var clse=$("<a/>");
        var next=$("<a/>");
        var count = parent_.children().length;
        var num = parent_.children().index(this);
        $(bg).attr("id", "overlay").css({"opacity":"0"});
        $("body").append(bg);
        $(img).attr("id", "galimg").attr("src", $(this).attr("href"));
        $(imgbg).attr("id", "imgbg");
        $(nav).attr("id", "galnav");
        $(prev).attr("class", "galbtn").attr("id", "prev").attr("href", "#");
        $(clse).attr("class", "galbtn").attr("id", "close").attr("href", "#");
        $(next).attr("class", "galbtn").attr("id", "next").attr("href", "#");
        $("body").append(imgbg);
        $(nav).append(prev);
        $(nav).append(clse);
        $(nav).append(next);
        if(num==0)
        {
            $(prev).hide();
        }
        if(num==count - 1)
        {
            $(next).hide();
        }
        var image = new Image();
        image.src = $(parent_.children()[num]).attr("href");
        r = $(image).load(function() {
          return {width: image.width, height: image.height};
        });
        if(r[0]["width"] > $("body").width() || r[0]["height"] > $("body").height()) {
            $(bg).css({"width": r[0]["width"] + 60, "height": r[0]["height"] + 100}).fadeTo("normal", 0.7);
        } else {
            $(bg).css({"width": "100%", "height": "100%"}).fadeTo("normal", 0.7);
        }
        $(imgbg).animate({
            "width": r[0]["width"],
            "height": r[0]["height"]
        }, 1500, function() {
            $(imgbg).append(img);
            $(img).hide().fadeIn(1000, function() {
                $(imgbg).append(nav);
                $(nav).hide().slideDown("normal");
            });
        });
        function pn(num, imgg) {
            $(nav).slideUp("normal", function() {
                if(num < count) {
                    $(next).show();
                }
                if(num > 0) {
                    $(prev).show();
                }
            });
            var image = new Image();
            image.src = imgg;
            r = $(image).load(function() {
              return {width: image.width, height: image.height};
            });
            $(img).fadeOut(1000, function() {
                $(this).attr("src", imgg);
                $(imgbg).animate( {
                    "width": r[0]["width"],
                    "height": r[0]["height"]
                },1500, function() {
                    $(img).fadeIn(1000, function() {
                        if(num == 0) {
                            $(prev).hide();
                        }
                        if(num==count - 1) {
                            $(next).hide();
                        }
                        $(nav).slideDown("normal");
                    });
                });
            });
        }
        $(prev).click(function() {
            pn(--num, $(parent_.children()[num]).attr("href"));
        });
        $(next).click(function() {
            pn(++num, $(parent_.children()[num]).attr("href"));
        });
        $(clse).click(function() {
            $(imgbg).fadeOut(1000, function() {
                $(this).remove();
            });
            $(bg).fadeOut(1000, function() {
                $(this).remove();
            });
        });
        return false;
    });
});
