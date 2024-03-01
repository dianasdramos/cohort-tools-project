



function errorHandler(err, req, res, next) {
  // This middleware has 4 arguments. It will run whenever `next(err)` is called.

  // Log the error first
  //console.error("ERROR", req.method, req.path, err);

  // Check if the response was already sent - sending a response twice for the same request will cause an error.
  if (!res.headersSent) {

    // If not, send the response with status code 500 and generic error message
    res
      .status(500)
      .json({ message: "Internal server error. Check the server console" });
  }
};

function notFoundHandler(req, res, next) {
  // This middleware will run whenever the requested route is not found
  res
    .status(404)
    .json({ message: "This route does not exist" });
};

function missingField(req, res, next) {
  // This middleware will run whenever the requested route is not found

  if (req.email === "" || req.password === "" || req.name === "") {
  
     res
       .status(400)
       .json({message: "Provide email password and name." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(req.email)) {
    res
      .status(400)
      .json({ message: 'Provide a valid email address.' });
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(req.password))
    res
      .status(400)
      .json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });

};

module.exports = {
  missingField,
  errorHandler,
  notFoundHandler
}