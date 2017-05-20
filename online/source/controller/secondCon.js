APP.secondCon = (function () {

    function articleList(page) {
        APP.modelArticle.selectArticle(page, function (output) {
            $('.main').html(APP.viewArticle.fullArticle(output));
        });
    }


    function ajax () {
        $.ajax ({
            url : 'api/articles/index.php',
            dataType: 'json',
            type : 'GET',
            success : function (data) {
                APP.modelArticle.deleteArticles(function () {
                    APP.modelArticle.insertArticles(data, function () {
                        $('.articlelist').html(APP.viewArticle.articlelist(data));
                    });
                });
            },
            error : function (err) {
                
                console.log(err);
            }
        }) 
    }

    function firstGet() {
        APP.modelArticle.selectArticleList(function (data) {
            $('.articlelist').html(APP.viewArticle.articlelist(data));
        });
    }

    return {
        firstGet : firstGet,
        ajax : ajax,
        articleList : articleList
    }
}());