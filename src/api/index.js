
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept':'application/json',
  'Content-Type':'application/json',
  'Authorization': 'whatever-i-want'
}

export const getCategories = () =>
fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

  export const getComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, { headers })
      .then(res => res.json())
      .then(data => data)

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPostsByCategory = (categoryId) =>
  fetch(`${api}/${categoryId}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const editPost = (postId, post) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers
    },
    body: JSON.stringify( post )
  }).then(res => res.json())
  .then(data => data)

  export const votePost = (postId, direction) =>
    fetch(`${api}/posts/${postId}`, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify( {option: direction} )
    }).then(res => res.json())
    .then(data => data)

export const deleteComment = (commentId) =>
      fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          ...headers
        }
      }).then(res => res.json())
      .then(data => data)

export const editComment = (commentId, comment) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers
    },
    body: JSON.stringify({
      timestamp: Date.now(),
      body: comment.body })
  }).then(res => res.json())
    .then(data => data)

  export const addComment = (parentId, body, author) =>
    fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        ...headers
      },
      body: JSON.stringify({
        id: guid(),
        timestamp: Date.now(),
        author: author,
        body: body,
        parentId: parentId})
    }).then(res => res.json())
      .then(data => data)
    // PARAMS:
    //         id - UUID should be fine, but any unique id will work
    //         timestamp - timestamp in whatever format you like, you can use Date.now() if you like
    //         title - String
    //         body - String
    //         author - String
    //         category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
export const addPost = (title, body, author, category) =>

// console.log(title + ', ' + body + ', ' + author + ', ' + category)
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify({ id: guid(),
    timestamp: Date.now(),
    title: title,
    body: body,
    author: author,
    category: category
   })
  }).then(res => res.json())
    .then(data => data)

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }})
    // .then(res => res.json())
    // .then(data => data)

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
