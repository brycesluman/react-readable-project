import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { newComment } from '../actions';
import serializeForm from 'form-serialize'
import { push } from 'react-router-redux'

class NewComment extends Component {
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
    if(this.props.newComment) {
      this.props.newComment(this.props.path, values)
    }
    this.props.navigate(`/post/${this.props.path}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="create-contact-form">
        <ul>
          <li>Body: <input name="body" /></li>
          <li>Author: <input name="author" /></li>
        </ul>
        <button
        type="submit"
        >SAVE</button>
      </form>
    )
    }
}
function mapStateToProps ( state, props ) {
  return {
    isFetching: state.appReducer.isFetching,
    comment: state.appReducer.comment,
    lastUpdated: state.appReducer.lastUpdated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: (data) => dispatch(push(data)),
    newComment: (parentId, data) => dispatch(newComment(parentId, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment)
