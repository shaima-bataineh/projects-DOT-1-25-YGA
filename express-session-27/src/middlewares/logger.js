function logger(req, _res, next) {
    const time = new Date().toISOString();// use iso hlpe to get stable time format. 
    console.log(`[${time}] ${req.method} ${req.originalUrl}`);
    next(); // في عمليه انتقال من مكان الى اخر
}

module.exports = logger;
