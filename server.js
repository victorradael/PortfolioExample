const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req,res) => {
    const about = {
        avatar_url: "https://avatars1.githubusercontent.com/u/53879758?s=400&v=4",
        firstName: "Victor",
        lastName: "Radael",
        role: "Engineering Student",
        description: 'FullStack developer in development.',
        links : [
            {
                name: "GitHub",
                url: "https://github.com/victorradael"
            },
            {
                name: "Twitter",
                url: "https://twitter.com/VictorRadael"
            },
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/victorradael/"
            },
        ]
    }

    return res.render('about', {about})
})

server.get("/portfolio", (req,res) => {
    return res.render('portfolio', { items: videos })
})

server.get("/video", (req, res) => {
    const id = req.query.id

    const video = videos.find( video => {
        return video.id == id
    })

    if(!video) {
        return res.send("Video Not Found!")
    }

    return res.render("video", {item: video})
})

server.listen(5000, _ => {
    console.log('Server is running')
})