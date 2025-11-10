const whitelist = ['https://www.youtube.com', 'http://localhost:3500', 'http://192.168.1.222', 'http://localhost:5173']

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error(`Not allowed`))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions