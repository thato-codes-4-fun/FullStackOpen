
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blogList)=> {
        return sum+=blogList.likes || 0
    }, 0)
}

const favoriteBlog = (blogs)=> {
    let total = 0
    let blog ;
    for(let i =0 ; i < blogs.length; i++){
        if(blogs[i].likes> total){
            total = blogs[i].likes
            blog = blogs[i]
        }
    }
    const {author, title, likes} = blog
    return {author, title, likes}
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
