function errorHandler(err, _req, res, _next) 
{
    const status = err.statusCode || 500; // get the status code from the error object or default to 500

    if (err.name === "CastError") // check if the error is a validation error
    {
      return res.status(400).json({ // return a 400 status code and a JSON response with the error message
        ok: false,
        message: "Invalid ID",
        error: err.message
      });
    }

    if(err.name === "ValidationError") // check if the error is a validation error
    {
        return res.status(400).json({ // return a 400 status code and a JSON response with the error message
            ok: false,
            message: "invalid data",
            error: err.message
    });

}
//why this not use return ? لانه اخر سطر منطقي في الكود وراح يرجع الاستجابة للمستخدم سواء كان في حالة التطوير او الانتاج هون النهاية مافي شي بعده 
res.status(status).json({ // return the status code and a JSON response with the error message
    ok: false,
    message: err.message || " Server Error",
    error: err.details || null,

    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}), // include the stack trace in the response if the environment is development
});
    
}

module.exports = errorHandler; // export the errorHandler function to be used in other files