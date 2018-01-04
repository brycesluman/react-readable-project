import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost, editPost } from '../actions'
import serializeForm from 'form-serialize'
import { push } from 'react-router-redux'

class EditPost extends Component {
  state = {
    prop: {}
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.fetchPostProp(this.props.path);
  }
  handleSubmit = (e) => {
    const values = serializeForm(e.target, { hash: true })
    e.preventDefault(this.props.post)
    console.log(values)
    if(this.props.editPost) {
      this.props.editPost(this.props.post.id, values)
    }
    this.props.navigate(`/post/${this.props.post.id}`)
  }
  render() {
      const { postId, post, isFetching, lastUpdated, editPost } = this.props
      if (!post) {
        return <p>Your search has 0 results.</p>
      }
      return (
        <div>
        <form onSubmit={this.handleSubmit} className="create-contact-form">
          <ul>
            <li>Title: <input type="text" name="title" defaultValue={`${post.title}`} /></li>
            <li>Body: <input type="text" name="body" defaultValue={`${post.body}`} /></li>
            <li>Author: {post.author}</li>
          </ul>
          <button
          type="submit"
          >SAVE</button>
          </form>
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

function mapStateToProps ( state, props ) {
  return {
    isFetching: state.appReducer.isFetching,
    post: getFilteredPosts(state.appReducer.posts, props.path),
    lastUpdated: state.appReducer.lastUpdated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: (data) => dispatch(push(data)),
    editPost: (postId, data) => dispatch(editPost(postId, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost)
