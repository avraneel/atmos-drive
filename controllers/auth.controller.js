const controller = {
  getRegister: (req, res) => {
    res.render("register");
  },

  getLogin: (req, res) => {
    res.render("login");
  },

  getLogout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
};

export default controller;
