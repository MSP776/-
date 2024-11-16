const mysql = require('mysql')

//  建立与 mysql 数据库的连接
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // 登录数据库的账号
    password: '123456', // 登录数据库的密码
    database: 'cinema' // 指定要操作哪个数据库
})

// 写一个方法 传入sql语句
function exec(sql) {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) {
                console.log(err, "数据库连接失败");
                reject(err);
            } else {
                console.log("数据库连接成功");
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
            connection.release();  // 释放连接池
        });
    });
}


// 封装
module.exports = {
    exec, // 最后将方法返回
    escape: mysql.escape // 该方法是保护sql语句插件，一起返回
}
