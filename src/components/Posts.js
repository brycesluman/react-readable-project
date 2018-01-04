import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchPostsByCategoryIfNeeded } from '../actions';

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts, path } = this.props
    if (!posts || posts.length === 0) {
      return <p>Your search has 0 results.</p>
    }
    return (
      <div>
        <div className='nav'>
          <h2 className='header'>Posts</h2>
        </div>
        <ul className='posts'>
        {posts && posts.map((post) => (
            <li key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li>
          ))}
        </ul>
        <Link to={`/newPost/${path}`}>new post</Link>
      </div>
    )
  }
}

function filterPosts(posts, path) {
  if(posts) {
    return posts.filter(t => t.category == path && !t.deleted)
  }
  return
}

function mapStateToProps ( state, props ) {
  return {
    isFetching: state.appReducer.isFetching,
    posts: filterPosts(state.appReducer.posts, props.path),
    lastUpdated: state.appReducer.lastUpdated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostsByCategory: (data) => dispatch(fetchPostsByCategoryIfNeeded(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList))
