
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blogList)=> {
        return sum+=blogList.likes || 0
    }, 0)
}


module.exports = {
    dummy,
    totalLikes,
}
