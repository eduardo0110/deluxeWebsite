
exports.checkUrl = function(req, res, next) {
    let host = req.headers.host;
    if (!host.match(/^www\..*/i)) {
      return res.redirect(301, "https://www." + host + req.url);
    } else if (req.headers['x-forwarded-proto'] !== 'https') {{
      return res.redirect('https://' + req.hostname + req.url)
    }
    next()
  }}


