import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { editComment } from '../actions'
import serializeForm from 'form-serialize'
import { push } from 'react-router-redux'

class EditComment extends Component {
  state = {
    prop: {}
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  handleSubmit = (e) => {
    const values = serializeForm(e.target, { hash: true })
    e.preventDefault(this.props.post)
    console.log(values)
    if(this.props.editComment) {
      this.props.editComment(this.props.comment.id, values)
    }
    this.props.navigate(`/post/${this.props.comment.parentId}`)
  }
  render() {
    const { comment, isFetching, lastUpdated, editComment } = this.props
    if (!comment) {
      return <p>Your search has 0 results.</p>
    }
    return (
      <form onSubmit={this.handleSubmit} className="create-contact-form">
        <ul>
          <li>Body: <input name="body"  defaultValue={`${comment.body}`} /></li>
          <li>Author: {comment.author}</li>
        </ul>
        <button
        type="submit"
        >SAVE</button>
      </form>
    )
  }
}

function getFilteredComments(comments, id) {
  console.log(comments)
  if (comments) {
    return comments.filter(comment => comment.id == id)[0]
  }
  return []
}

function mapStateToProps ( state, props ) {
  return {
    isFetching: state.appReducer.isFetching,
    comment: getFilteredComments(state.appReducer.comments, props.path),
    lastUpdated: state.appReducer.lastUpdated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: (data) => dispatch(push(data)),
    editComment: (id, data) => dispatch(editComment(id, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditComment)
