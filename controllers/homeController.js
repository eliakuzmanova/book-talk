exports.getHomeView = (req, res) => {
    res.render('home/index')
}

exports.get404View = (req, res) => {	
    res.render('home/404')
}