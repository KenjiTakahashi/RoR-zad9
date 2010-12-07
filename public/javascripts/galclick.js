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
        var count = $("." + parent_.attr("class") + " > a").length;
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
        if(num==count)
        {
            $(next).hide();
        }
        var img = new Image();
        img.src = $(this).attr("href");
        var w = img.width;
        var h = img.height;
        if(w > $("body").width() || h > $("body").height()) {
            $(bg).css({"width": w + 60, "height": h + 100}).fadeTo("normal", 0.7);
        } else {
            $(bg).css({"width": "100%", "height": "100%"}).fadeTo("normal", 0.7);
        }
        $(imgbg).animate( {
            "width":w,
            "height":h
        },1500, function() {
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
            w = image.width;
            h = image.height;
            $(img).fadeOut(1000, function() {
                $(this).attr("src", imgg);
                $(imgbg).animate( {
                    "width":w,
                    "height":h
                },1500, function() {
                    $(img).fadeIn(1000, function() {
                        if(num==0) {
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
            num--;
            pn(num, $(parent_.children()[num]).attr("href"));
        });
        $(next).click(function() {
            num++;
            pn(num, $(parent_.children()[num]).attr("href"));
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
