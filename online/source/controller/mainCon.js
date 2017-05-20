APP.mainCon = (function () {

    function fullArticle(page) {//文章详情
        APP.secondCon.articleList(page);
    }

    function articleList () {//文章列表
        $('.main').html(APP.viewArticle.button());
        
        APP.secondCon.firstGet();

        $('button').click(function() {
            if (navigator && navigator.onLine ==true) {
                APP.secondCon.ajax();
            }
            
        });
    }

    function route() {
        var page = window.location.hash;

        if (page) {
            page = page.substring(1);
            fullArticle(page);
        }else {
            articleList();
        }
    }
    function start (data, isOnline) {

        APP.base.open(function () {
            $('head').append('<style>'+ data["css"] +'</style>');
            $('body').html(APP.viewArticle.title());
            $(window).bind("hashchange", route);
            route();

            if (isOnline) {
                localStorage.resources = JSON.stringify(data);
            }
        });
    }
    
    return {
        start : start
    }
}());