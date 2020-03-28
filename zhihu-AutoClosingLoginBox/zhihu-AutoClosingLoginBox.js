// ==UserScript==
// @name         知乎去掉登录框（关闭自己弹出来的登录框）
// @namespace    https://github.com/zhangnan15/monkeyscripts
// @version      0.1.0
// @description  单一功能脚本，自动叉掉弹出来的登录框
// @author       zn1597
// @match        https://*.zhihu.com/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @require      https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js

// ==/UserScript==
(function() {
    'use strict';
/*     if($.cookie("unlock_ticket") || $.cookie("q_c1")){ */
    var c1 = document.cookie.indexOf("unlock_ticket=");
    var c2 = document.cookie.indexOf("q_c1=");
    if(c1 != -1 || c2 != -1){
    }else{
        var time1 = new Date();
        //保障于网速慢加载慢的时候
        var no_m_no_s = setInterval(function(){
            var time2 = new Date();
            $(".Button.Modal-closeButton.Button--plain").trigger("click");
            //12秒结束后，开启滚轮
            if(Math.floor((time2 - time1) / 1000)>12){
                clearInterval(no_m_no_s);
                console.log("clean成功");
                $(window).unbind("scroll");
                scroll();
            }
        },50);
        //假如直接滚动，滚动后更新点击事件，然后解绑自己，开启新scroll
        $(window).scroll(function(){
            console.log("old-scroll");
            $("button").unbind("mousedown");
            setTimeout(function(){
                $("button").mousedown(function(){
                    console.log("mousedown");
                    clearInterval(no_m_no_s);
                    $("button").unbind("mousedown");
                });
            },100);
            $(window).unbind("scroll");
            scroll();
        });
        //假如不滚动先点击，点击后清除setInterval()，解绑自己，剩下的交给滚轮
        $(document).ready(function(){
            $("button").mousedown(function(){
                console.log("mousedown");
                clearInterval(no_m_no_s)
                $("button").unbind("mousedown");
            });
        });
    }
    function scroll(){
        console.log("scroll");
        $(window).scroll(function() {
/*             console.log("滚离顶部" + $(document).scrollTop()); */
            $(".Button.Modal-closeButton.Button--plain").trigger("click");
        })
    }
})();