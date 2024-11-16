const { exec } = require("../db/db")

const getTopMovielist = async () => {  // 获取top100电影列表
    let sql = "select * from topmovie";
    return await exec(sql)
}

const getHotMovielist = async () => {  // 获取热门电影列表
    let sql = "select * from hotmovie";
    return await exec(sql)
}

const getHopeMovielist = async () => {  // 获取期待电影列表
    let sql = "select * from hopemovie";
    return await exec(sql)
}

const getCinemaList = async () => { // 获取电影院列表
    let sql = "select * from cinemalist";
    return await exec(sql)
}

const getScheduleList = async () => { // 获取电影院热映电影播放场次总列表
    let sql = "select * from schedule_list ORDER BY cinema_id";
    return await exec(sql)
}

const updateSeat = async (updateblog = {}) => {
    let { soldSeats, scheduleId } = updateblog
    let sql = `update schedule_list set seat_info = concat(seat_info,'[${soldSeats}]') where schedule_id='${scheduleId}'`;
    const result = await exec(sql)
    return result.affectedRows > 0 ? true : false
}


const addlist = async (addblog = {}) => {  // 增加数据
    let { userid, image, movieName, cinemaName, hallName, seats, showData, beginTime, totalPrice } = addblog
    let sql = `insert into orderlist (userid,image,movie_name,cinema_name,hall_name,seats,date_time,begin_time,price) values ('${userid}', '${image}', '${movieName}','${cinemaName}','${hallName}','${seats}','${showData}','${beginTime}','${totalPrice}')`
    console.log(sql)
    const result = await exec(sql)
    return result.affectedRows > 0 ? true : false
}

const login = async (loginForm = {}) => {  // 登录
    let { username, password } = loginForm
    const sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`
    const result = await exec(sql)
    return result;
}

const register = async (registerForm = {}) => {
    let { username, password } = registerForm
    const sql1 = `SELECT * FROM user WHERE username = '${username}'`
    const sql2 = `INSERT INTO user (username, password) VALUES ('${username}', '${password}')`
    const result1 = await exec(sql1)
    if (result1.length > 0) {
        return 0
    }
    const result2 = await exec(sql2);
    return result2.affectedRows > 0 ? true : false
}

const getOrderlist = async (userid) => {  // 获取期待电影列表
    userid = userid
    let sql = `select * from orderlist where userid = '${userid}' `;
    return await exec(sql)
}


module.exports = {
    getTopMovielist,
    getHotMovielist,
    getHopeMovielist,
    getCinemaList,
    getScheduleList,
    addlist,
    updateSeat,
    login,
    register,
    getOrderlist
}