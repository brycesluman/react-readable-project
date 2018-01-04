import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  FETCH_POSTS,
  RECEIVE_POST,
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_POSTS_BY_CATEGORY,
  RECEIVE_CATEGORIES,
  SORT_POSTS,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  INVALIDATE_POSTS,
  GET_POST,
  UPDATE_POST,
  UPDATE_COMMENT,
  FORCE_DELETE,
} from '../actions'

function appReducer (state = {
  sortItem: 'voteScore',
  sortVal: 'SORT_ASC',
  comments: []
}, action) {
  // const { posts } = action
  switch (action.type) {
    case FETCH_POSTS :
      console.log("FETCH_POSTS")
      break;
    case RECEIVE_POSTS :
        // console.log("RECEIVE_POSTS")
        // console.log(action)
        return Object.assign({}, state, {
          ...state,
          isFetching: false,
          didInvalidate: false,
          posts: action.posts,
          lastUpdated: action.receivedAt
        })
        break;
      case GET_POST :
          return Object.assign({}, state, {
            ...state,
            post: [...state.posts.filter(post => post.postId == action.postId)],
            lastUpdated: action.receivedAt
          })
          break;
    case RECEIVE_POST :
        return Object.assign({}, state, {
          ...state,
          posts: [...state.posts, action.post],
          lastUpdated: action.receivedAt
        })
        break;
    case UPDATE_POST :
        var updatedPosts = state.posts.filter(post => post.id !== action.post.id)
        var count = updatedPosts.push(action.post)
        return Object.assign({}, state, {
          ...state,
          posts: updatedPosts,
          lastUpdated: action.receivedAt
        })
        break;
    case RECEIVE_POSTS_BY_CATEGORY :
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        didInvalidate: false,
        posts: action.posts,
        lastUpdated: action.receivedAt
      })
      break;

    case RECEIVE_CATEGORIES :
    // console.log("RECEIVE_CATEGORIES")
    //     console.log(action)
        return Object.assign({}, state, {
          ...state,
          isFetching: false,
          didInvalidate: false,
          categories: action.categories,
          lastUpdated: action.receivedAt
        })
        break;
        case FORCE_DELETE :
        // console.log("RECEIVE_CATEGORIES")
        //     console.log(action)
        var updateList = state.posts.filter(post => post.id !== action.deleteId)
        var updatedPost = state.posts.filter(post => post.id == action.deleteId)[0]
        updatedPost.deleted = true
        var count = updateList.push(updatedPost)
            return Object.assign({}, state, {
              ...state,
              isFetching: false,
              didInvalidate: false,
              posts: updateList,
              lastUpdated: action.receivedAt
            })
            break;
    case REQUEST_POSTS :
      // console.log("REQUEST_POSTS")
      // console.log(state)
      return state
    case SORT_POSTS :
      // console.log("SORT_POSTS")
      // console.log(state)
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        didInvalidate: false,
        sortItem: action.sortItem,
        sortVal: action.sortVal
      })
      break;
      case RECEIVE_COMMENTS :

        if(state.postId != action.postId) {
          return Object.assign({}, state, {
            ...state,
            postId: action.postId,
            isFetching: false,
            didInvalidate: false,
            comments: action.comments
          })
        }
        return state
        break;
      case RECEIVE_COMMENT :
      console.log('RECEIVE_COMMENT')
      console.log(action.comment)

        return Object.assign({}, state, {
          ...state,
          isFetching: false,
          didInvalidate: false,
          comments: [...state.comments, action.comment],
          lastUpdated: action.receivedAt
          })
        break;
      case UPDATE_COMMENT :
      console.log('UPDATE_COMMENT')
      console.log(action.comment)
        var updatedComments = state.comments.filter(comment => comment.id !== action.comment.id)
        var count = updatedComments.push(action.comment)
        return Object.assign({}, state, {
          ...state,
          isFetching: false,
          didInvalidate: false,
          comments: updatedComments,
          lastUpdated: action.receivedAt
          })
        break;
    default :
      return state
    }
}

export default combineReducers({
    appReducer: appReducer,
    router: routerReducer
})
