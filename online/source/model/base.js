// 底层Model
APP.base = (function () {
    'use strict';

    var smallDatabase;
    //执行数据库对表的各种操作的函数
    function runQuery(query, data, successCallback) {
        var i, l, remaining;
        //判断一下 data参数的第一个元素是否是一个数组(为了进入下面的for循环，所以data的长度不能为0)
        if (!(data[0] instanceof Array)) {
            //如果不是那么把data变成数组中的一个元素再赋给data
            data = [data];
        }
        remaining = data.length;
        function innerSuccessCallback(tx, rs) {//tx是transaction中传递过来的事务处理对象。rs执行的结果
            var i, l, output = [];
            remaining = remaining - 1;
            //remaining 是0的时候(即执行删除、查询某一个文章、获取全部文章、以及插入全部文章到数据库时插入到最后一条的时候。注意执行删除的时候rows.length为0，即这里主要指查询某一文章和获取全部文章)；
            if (!remaining) {
                //把执行后（插入某一个数据或是 查询出某一个数据）的结果 封装成数组
                // HACK Convert row object to an array to make our lives easier
                for (i = 0, l = rs.rows.length; i < l; i = i + 1) {
                    output.push(rs.rows.item(i));
                }
                if (successCallback) {
                    // 执行带参数的回调函数
                    successCallback(output);
                }
            }
        }

        function errorCallback(tx, e) {
            console.log("An error has occurred");
        }
        //往数据库里存入从ajax获取过来的数据
        smallDatabase.transaction(function (tx) {//tx是transaction中传递过来的事务处理对象。
            for (i = 0, l = data.length; i < l; i = i + 1) {
                tx.executeSql(query, data[i], innerSuccessCallback, errorCallback);
            }
        });
    }
    //创建一个本地数据库
    function open(successCallback) {
        smallDatabase = openDatabase("APP", "1.0", "Not The FT Web App", (5 * 1024 * 1024));
        runQuery("CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY ASC, date TIMESTAMP, author TEXT, headline TEXT, body TEXT)", [], successCallback);
        //创建一个表如果它不存在，该表有id（表的主键从小到大的顺序排列）、data(时间戳格式)、author(文本格式)、headline(文本格式)、body(文本格式)
    }

    return {
        open: open,
        runQuery: runQuery
    };
}());