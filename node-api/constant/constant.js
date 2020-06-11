const obj = {
    DEFAULT_SUCCESS: {
        code: 10000,
        msg: 'success'
    },
    DEFAULT_ERROR: {
        code: 188,
        msg: "系统错误"
    },
    LACK: {
        code: 199,
        msg: '缺少必要的参数'
    },
    TOKEN_ERROR: {
        code: 401,
        msg: "token验证失败"
    },
    LOGIN_ERROR: {
        code: 101,
        msg: "用户名或者密码错误"
    },
    ADMIN_NOT_EXSIT: {
        code: 102,
        msg: "管理员信息不存在"
    }
};

module.exports = obj;