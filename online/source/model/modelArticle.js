APP.modelArticle = (function () {

    function deleteArticles(successCallback) {
        APP.base.runQuery("DELETE FROM articles", [], successCallback)
    }


    function insertArticles(data, successCallback) {
        var arr = [], len = data.length;
        if(len == 0){

        }else {
            for(var i = 0; i < len; i++) {
                arr[i] = [data[i].id, data[i].date, data[i].headline, data[i].author, data[i].body];
            }  
        }
        APP.base.runQuery("INSERT INTO articles (id, date, headline, author, body) VALUES (?, ?, ?, ?, ?);", arr, successCallback)
    }
    function selectArticle(page, successCallback) {
        APP.base.runQuery("SELECT id, headline, date, author, body FROM articles WHERE id = ?", [page], successCallback)
    }

    function selectArticleList(successCallback) {
        APP.base.runQuery("SELECT id, headline, date, author FROM articles", [], successCallback);
    }
    return {
        insertArticles: insertArticles,
        deleteArticles: deleteArticles,
        selectArticle: selectArticle,
        selectArticleList : selectArticleList
    }
}());