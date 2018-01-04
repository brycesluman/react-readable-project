import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { votePost, getPost, fetchComments, deleteComment, deletePost } from '../actions';
import { push } from 'react-router-redux'

class PostDetails extends Component {
  state = {
    path: {}
  }
  constructor(props) {
    super(props);

  }
  componentWillMount() {

  }
  componentDidMount() {
    this.props.fetchCommentsProp(this.props.path);
  }
  handleVoteClick = (e) => {
    e.preventDefault()
    this.props.vote(this.props.path, e.target.getAttribute('href'))
  }

  handleDeleteClick = (e) => {
    e.preventDefault()
    this.props.deleteComment(e.target.getAttribute('href'))
  }

  handlePostDeleteClick = (e) => {
    e.preventDefault()
    this.props.deletePost(this.props.path)
    this.props.navigate(`/`)
  }

  render() {
    const { post, comments, isFetching, lastUpdated } = this.props
    if (!post) {
      return <p>Your search has 0 results.</p>
    }
    return (
      <div>
      <h3>{post.title} <Link to={`/editPost/${post.id}`}>edit post</Link>&nbsp;
      <a href={post.id} onClick={this.handlePostDeleteClick}>delete post</a>
      </h3>
      <h4><i>{post.author}</i></h4>
      <p>Vote Score: {post.voteScore} <a href="upVote" onClick={this.handleVoteClick}>up vote</a> <a href="downVote" onClick={this.handleVoteClick}>down vote</a></p>
      <p>{post.body}</p>
      <ul className='comments'>
        {comments && comments.map((comment) => (
          <li key={comment.id}>
          <p>{comment.body}</p>
          <i>{comment.author}</i>
          &nbsp;<Link to={`/editComment/${comment.id}`}>edit comment</Link>&nbsp;
          <a href={comment.id} onClick={this.handleDeleteClick}>delete comment</a>
          </li>
        ))}
      </ul>
      <div><Link to={`/newComment/${post.id}`}>new comment</Link></div>
      </div>
    )

  }
}

function getFilteredPosts(posts, id) {
  if (posts) {
    return posts.filter(post => post.id == id)[0]
  }
  return []
}

function getFilteredComments(comments) {
  if (comments) {
    return comments.filter(comment => !comment.deleted)
  }
  return []
}

function mapStateToProps ( state, props ) {
  // console.log(state.appReducer.post)
  return {
    isFetching: state.appReducer.isFetching,
    post: getFilteredPosts(state.appReducer.posts, props.path),
    comments: getFilteredComments(state.appReducer.comments)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: (data) => dispatch(push(data)),
    vote:  (postId, data) => dispatch(votePost(postId, data)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    fetchCommentsProp: (data) => dispatch(fetchComments(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
