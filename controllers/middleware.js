
exports.checkUrl = (req, res, next) => {
    let host = req.headers.host;
    if (host.match(/^www\..*/i)) {
      next();
    } else {
      res.redirect(301, "https://www." + host + req.url);
    }
  }
