
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
    if(blogs.length === 0){
        return 0
    }
    for(let i =0 ; i < blogs.length; i++){
        if(blogs[i].likes> total){
            total = blogs[i].likes
            blog = blogs[i]
        }
    }
    const {author, title, likes} = blog
    return {author, title, likes} || 0
}

const mostBlogs = (blogs)=> {
    const authorCount = {};
    let maxCount = 0;
    let authorWithMostEntries = '';
  
    for (const blog of blogs) {
      const author = blog.author;
      authorCount[author] = (authorCount[author] || 0) + 1;
  
      if (authorCount[author] > maxCount) {
        maxCount = authorCount[author];
        authorWithMostEntries = author;
      }
    }
  
    return {author: authorWithMostEntries, blogs: maxCount};
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
