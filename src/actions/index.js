import * as PostsAPI from "../api"

const api = "http://localhost:3001"


const headers = {
  // 'Accept': 'application/json',
  'Authorization': 'whatever-i-want'
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts() {
  // console.log("requestPosts")
  return {
    type: REQUEST_POSTS
  }
}

export const REQUEST_POSTS_BY_CATEGORY = 'REQUEST_POSTS_BY_CATEGORY'
function requestPostsByCategory() {
  // console.log("requestPostsByCategory")
  return {
    type: REQUEST_POSTS_BY_CATEGORY
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(json) {
  // console.log("receivePosts")
  // console.log(json)
  return {
    type: RECEIVE_POSTS,
    posts: json.map(child => child),
    receivedAt: Date.now()
  }
}

export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'
function receivePostsByCategory(json) {
  return {
    type: RECEIVE_POSTS_BY_CATEGORY,
    posts: json.map(child => child),
    receivedAt: Date.now()
  }
}

export const SORT_POSTS = 'SORT_POSTS'
export function sortPosts(sortItem, sortVal) {
  // console.log("sortPosts")
  // console.log(sortItem+ " ," +sortVal)
    return {
      type: SORT_POSTS,
      sortItem: sortItem,
      sortVal: sortVal,
      receivedAt: Date.now()
    }
}

export const FETCH_POSTS_BY_CATEGORY = 'FETCH_POSTS_BY_CATEGORY'
function fetchPostsByCategory(category) {
  return dispatch => {
    dispatch(requestPostsByCategory())
    return PostsAPI.getPostsByCategory(category).then(json => dispatch(receivePostsByCategory(json)))
  }
}

export const FETCH_POSTS = 'FETCH_POSTS'
function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return PostsAPI.getAll().then(json => dispatch(receivePosts(json)))
  }
}

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
function fetchCategories() {
  return dispatch => {
    dispatch(requestPosts())
    return PostsAPI.getCategories().then(json => dispatch(receiveCategories(json)))
  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
function receiveCategories(json) {
  // console.log("receiveCategories")
  // console.log(json)
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories.map(child => child),
    receivedAt: Date.now()
  }
}

export const RECEIVE_POST = 'RECEIVE_POST'
function receivePost(json) {
  console.log(json)
  return {
    type: RECEIVE_POST,
    post: json,
    receivedAt: Date.now()
  }
}

export const FORCE_DELETE = 'FORCE_DELETE'
function forceDelete(json) {
  return {
    type: FORCE_DELETE,
    deleteId: json,
    receivedAt: Date.now()
  }
}

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
function receiveComment(json) {
  return {
    type: RECEIVE_COMMENT,
    comment: json,
    receivedAt: Date.now()
  }
}

export const FETCH_POST = 'FETCH_POST'
export function fetchPost(postId) {
  return dispatch => {
    return PostsAPI.getPost(postId).then(json => dispatch(receivePost(json)))
  }
}

export const GET_POST = 'GET_POST'
export function getPost(postId) {
  return dispatch => {
    dispatch({
      type: GET_POST,
      postId: postId,
      receivedAt: Date.now()
    })
  }
}

export const VOTE_POST = 'VOTE_POST'
export function votePost(postId, direction) {
  return dispatch => {
    return PostsAPI.votePost(postId, direction).then(json => dispatch(updatePost(json)))
  }
}

export const FETCH_COMMENT = 'FETCH_COMMENT'
export function fetchComment(commentId) {
  return dispatch => {
    return PostsAPI.getComment(commentId).then(json => dispatch(receiveComment(json)))
  }
}

export const DELETE_COMMENT = 'DELETE_COMMENT'
export function deleteComment(commentId) {
  return dispatch => {
    return PostsAPI.deleteComment(commentId).then(json => dispatch(updateComment(json)))
  }
}

export const DELETE_POST = 'DELETE_POST'
export function deletePost(postId) {
  return dispatch => {
    return PostsAPI.deletePost(postId).then(json => dispatch(forceDelete(postId)))
  }
}

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export function fetchComments(postId) {
  return dispatch => {
    return PostsAPI.getComments(postId).then(json => dispatch(receiveComments(postId, json)))
  }
}

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
function receiveComments(postId, json) {
  return {
    type: RECEIVE_COMMENTS,
    postId: postId,
    isFetching: true,
    comments: json,
    didInvalidate: false,
    receivedAt: Date.now()
  }
}

export function newComment(parentId, comment) {
  return dispatch => {
    // parentId, body, author
    return PostsAPI.addComment(parentId, comment.body, comment.author).then(json => dispatch(receiveComment(json)))
  }
}

export const EDIT_COMMENT = 'EDIT_COMMENT'
export function editComment(commentId, comment) {
  return dispatch => {
    return PostsAPI.editComment(commentId, comment).then(json => dispatch(updateComment(json)))
  }
}

export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export function updateComment(comment) {
    return  {
      type: UPDATE_COMMENT,
      comment: comment,
      didInvalidate: false,
      receivedAt: Date.now()
    }
}
export const EDIT_POST = 'EDIT_POST'
export function editPost(postId, post) {
  return dispatch => {
    return PostsAPI.editPost(postId, post).then(json => dispatch(updatePost(json)))
  }
}

export const UPDATE_POST = 'UPDATE_POST'
export function updatePost(post) {
    return  {
      type: UPDATE_POST,
      post: post,
      didInvalidate: false,
      receivedAt: Date.now()
    }
}

export function newPost(post) {
  return dispatch => {
    // title, body, author, category
    return PostsAPI.addPost(post.title, post.body, post.author, post.category)
    .then(json => dispatch(receivePost(json)))
  }
}


function shouldFetchPosts(state) {
  // console.log("shouldFetchPosts")
  const posts = state.posts
  // console.log(!posts)
  if (!posts) {
    // console.log("!posts")
    return true
  } else if (posts.isFetching) {
    // console.log("posts.isFetching")
    return false
  } else {
    // console.log("posts.didInvalidate")
    return posts.didInvalidate
  }
}

function shouldFetchCategories(state) {
  // console.log("shouldFetchCategories")
  const categories = state.categories
  // console.log(!categories)
  if (!categories) {
    // console.log("!categories")
    return true
  } else if (categories.isFetching) {
    // console.log("categories.isFetching")
    return false
  } else {
    // console.log("categories.didInvalidate")
    return categories.didInvalidate
  }
}

export function fetchCategoriesIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.
// console.log("fetchCategoriesIfNeeded")
  return (dispatch, getState) => {
    // console.log("return")
    if (shouldFetchCategories(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchCategories())
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

function shouldFetchPostsByCategory(state) {
  // console.log("shouldFetchPostsByCategory")
  const categories = state.categories
  // console.log(!categories)
  if (!categories) {
    // console.log("!categories")
    return true
  } else if (categories.isFetching) {
    // console.log("categories.isFetching")
    return false
  } else {
    // console.log("categories.didInvalidate")
    return categories.didInvalidate
  }
}

export function fetchPostsByCategoryIfNeeded(category) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.
// console.log("fetchCategoriesIfNeeded")
  return (dispatch, getState) => {
    // console.log("return")
    if (shouldFetchPostsByCategory(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPostsByCategory(category))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export function fetchPostsIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.
// console.log("fetchPostsIfNeeded")
  return (dispatch, getState) => {
    // console.log("return")
    if (shouldFetchPosts(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts())
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}
