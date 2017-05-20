APP.viewArticle = (function () {

    function title() {
        return '<div class="title"><h1>发生的大事</h1></div><div class="main"></div>';
    }

    function button () {
        return '<button type="">刷新新闻</button><div class="articlelist"></div>';
    }

    function articlelist (data) {
        var output = '';
        var len = data.length;
        for (var i = 0; i < len; i++) {
            output += '<li><h2><a href="#' + data[i].id + '">' + data[i].headline + '</a></h2><p>作者：<strong>'+ data[i].author +'</strong>, 发布日期: '+ data[i].date +'</p></li>';
        }
        
        return '<ul>' + output + '</ul>';
    }

    function fullArticle(data) {
        return '<a href="">返回首页</a><h2>'+ data[0].headline +'</h2><h3>作者：'+ data[0].author +', 发布日期:'+ data[0].date +'</h3>' + data[0].body;
    }
    return {
        title : title,
        button : button,
        articlelist: articlelist,
        fullArticle: fullArticle
    }
}());