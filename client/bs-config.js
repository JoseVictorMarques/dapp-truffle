module.exports = {
    port: process.env.PORT,
    files: ['./**/*/.{html,htm,css,js,jsx}'],
    server:{
        baseDir:["./src","./contracts"]
    }
}