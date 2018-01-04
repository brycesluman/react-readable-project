import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostList from './components/Posts'
import PostDetails from './components/PostDetails'
import EditPost from './components/EditPost'
import NewComment from './components/NewComment'
import EditComment from './components/EditComment'
import NewPost from './components/NewPost'
import { Route, Switch } from 'react-router'
import { push } from 'react-router-redux'

import { Link, withRouter } from 'react-router-dom';
import { fetchPostsByCategoryIfNeeded, fetchCategoriesIfNeeded, fetchPostsIfNeeded, fetchPost, sortPosts } from './actions';
import './App.css';

class App extends Component {
  state = {
    categories: [],
    posts: [],
    comments: [],
    sortItem: 'voteScore',
    sortValue: 'SORT_ASC'
  }
  constructor(props) {
      super(props);
  }
  componentWillMount() {
      this.props.fetchPosts();
      this.props.fetchCategories();
  }
  componentDidUpdate() {
  }



  render() {
    const { categories, posts, isFetching, lastUpdated, navigate, handleItemChange, handleSortChange, sortItem, sortValue } = this.props

    const ConnectedSwitch = connect(state => ({
      location: state.location
    }))(Switch)

    const AppContainer = ({ location }) => (
      <ConnectedSwitch>
      <Route exact path="/" component={(props) =>(
        <div>
          <div className='nav'>
            <h2 className='header'>Categories</h2>
          </div>
          <ul className='categories'>
            {categories && categories.map((category) => (
                <li key={category.path}>
                  <Link to={`/category/${category.path}`}>{category.name}</Link>
                </li>
              ))}
          </ul>
          <label>
          Sort
          <select defaultValue={sortItem} onChange={e => handleItemChange(e.target.value, sortValue)}>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Time</option>
          </select>
          <select defaultValue={sortValue} onChange={e => handleSortChange(sortItem, e.target.value)}>
            <option value="SORT_ASC">Ascending</option>
            <option value="SORT_DESC">Descending</option>
          </select>
          </label>
          <ul className='posts'>
          {posts && posts.map((post) => (
              <li key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li>
            ))}
          </ul>
          <Link to={`/newPost`}>new post</Link>
        </div>
        )} />
        <Route path="/category/:path" component={(props) => (
          <PostList path={`${props.match.params.path}`} />
        )} />
        <Route path="/post/:id" component={(props) => (
          <PostDetails path={`${props.match.params.id}`} />
        )} />
        <Route path="/editPost/:id" component={(props) => (
          <EditPost path={`${props.match.params.id}`} />
        )} />
        <Route exact path="/newComment/:id" component={(props) => (
          <NewComment path={`${props.match.params.id}`} />
        )} />
        <Route exact path="/editComment/:id" component={(props) => (
          <EditComment path={`${props.match.params.id}`} />
        )} />
        <Route path="/newPost/:path" component={(props) => (
          <div>Render New post
          <NewPost path={`${props.match.params.id}`} />
          </div>
        )} />
        <Route exact path="/newPost" component={(props) => (
          <div>Render New post
          <NewPost />
          </div>
        )} />
        </ConnectedSwitch>
    )

    const App = connect(state => ({
        location: state.location,
    }))(AppContainer)


    return (
      <div className='container'>
        <App/>
      </div>
    );
  }
}

function getSortedPosts(posts, item, type) {
  if (posts) {
    return posts.sort((a, b) => {
      if (item == 'voteScore') {
        if (type == 'SORT_ASC') {
            return a.voteScore - b.voteScore
        } else if (type == 'SORT_DESC') {
            return b.voteScore - a.voteScore
        }
      } else if (item == 'timestamp') {
        if (type == 'SORT_ASC') {
            return a.timestamp - b.timestamp
        } else if (type == 'SORT_DESC') {
            return b.timestamp - a.timestamp
        }
      }
    })
  }
}
function getFilteredPosts(posts) {
  if (posts) {
    return posts.filter(post => !post.deleted)
  }
  return []
}
function mapStateToProps ( state, props ) {
  return {
    categories: state.appReducer.categories,
    isFetching: state.appReducer.isFetching,
    posts: getSortedPosts(getFilteredPosts(state.appReducer.posts), state.appReducer.sortItem, state.appReducer.sortVal),
    lastUpdated: state.appReducer.lastUpdated,
    sortItem: state.appReducer.sortItem,
    sortValue: state.appReducer.sortVal
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: (data) => dispatch(push(data)),
    fetchPostsByCategory: (data) => dispatch(fetchPostsByCategoryIfNeeded(data)),
    fetchCategories: (data) => dispatch(fetchCategoriesIfNeeded()),
    fetchPosts: (data) => dispatch(fetchPostsIfNeeded()),
    handleItemChange: (item, sort) => dispatch(sortPosts(item, sort)),
    handleSortChange: (item, sort) => dispatch(sortPosts(item, sort))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
