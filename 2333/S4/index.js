$(function() {
    $("li").attr("status", "active");
    $("li").click(function() {getRandomAjax(this);});
    $("li").mouseover(function() {
        if ($(this).attr("status") != "active") {
            this.style.cursor = "crosshair";
        } else {
            this.style.cursor = "pointer";
        }
    })
    $("li").each(function() {
        if ($(this).attr("status") === "inactive"
            || $(this).attr("status") === "numgot") {
            $(this).addClass("inactive");
        } else {
            $(this).addClass("active");
        }
    });

    $(".info").attr("status", "bubble_inactive");
    $(".info").click(function() {bubble_click(this);});
    var bubble = $(".info");

    $(".icon-wrap").mouseleave(function() {resetCal();});
    $(".icon-wrap").mouseenter(function() {restartCal();});

    var circles = $("li");
    $(".icon").click(function() {robot(circles, function() {bubble_click(bubble);});});
});

function robot(circles, getSum) {

    var sequence = [0, 1, 2, 3, 4];


    sequence.sort(function(){
        return Math.random()-0.5;
    });

    var callbacks = [];

    for (var i = 0; i < 4; i++) {
        (function(i) {
            callbacks[i] = function() {
                getRandomAjax(circles[sequence[i + 1]], callbacks[i + 1]);
            }
        })(i);
    }

    //在四个圆圈显示数字后 显示和:
    callbacks[4] = getSum;

    //触发
    getRandomAjax(circles[sequence[0]], callbacks[0]);
}

function getRandomAjax(obj, callback) {
    if ($(obj).attr("status") === "active") {

        //如果有对象被点击，就将其他对象设为“无法点击”
        var circles = $("li");
        for (var i = 0; i < circles.length; i++) {
            if (circles[i] != obj && $(circles[i]).attr("status") != "numgot") {
                $(circles[i]).attr("status", "inactive");
                $(circles[i]).attr("class", "button inactive");
            }
        }
        var num = $(obj).children("span");
        $(num).addClass("clicked");
        $(num).html("...");

        //取回随机数之后的操作
        $.get("hhh.txt", function(data) {
            $(num).html(data);
            $(obj).attr("status", "numgot");
            $(obj).attr("class", "button numgot");
            $("li").each(function() {
                if ($(this).attr("status") != "numgot") {
                    $(this).attr("status", "active");
                    $(this).attr("class", "button active");
                }
            });
            callback();
        });
    }
}

function bubble_click(obj) {
    var all_circle_gotnum = true;

    //先遍历看是否全都有随机数
    $("li").each(function() {
        if ($(this).attr("status") != "numgot") {
            all_circle_gotnum = false;
        }
    });

    if (all_circle_gotnum) {
        var sum = 0;
        $("li span").each(function() {
            sum += parseInt($(this).html());
        });
        var text = $(obj).children();
        $(text[0]).html(sum);
    }

    $(obj).attr("status", "bubble_inactive");

    all_circle_gotnum = true;
}

function resetCal() {
    $("li span").each(function() {
        $(this).removeClass("clicked");
        $(this).html("");
    });

    $("li").each(function() {
        $(this).attr("status", "inactive");
        $(this).attr("class", "button inactive");
    });

    $(".info p").html("");
}

function restartCal() {

    $("li").each(function() {
        $(this).attr("status", "active");
        $(this).attr("class", "button active");
    });

    // 不能写成
    // $("li").attr("status", "active");
    // $("li").attr("class", "active");
}
