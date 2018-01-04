import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchCategoriesIfNeeded, newPost } from '../actions';
import serializeForm from 'form-serialize'
import { push } from 'react-router-redux'

class NewPost extends Component {
  state = {
    prop: {}
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
      this.props.fetchCategories();
  }
  handleSubmit = (e) => {
    const values = serializeForm(e.target, { hash: true })
    e.preventDefault(this.props.post)
    console.log(values)
    if(this.props.newPost) {
      this.props.newPost(values)
    }
    this.props.navigate(`/`)
  }
  render() {
    const { categories, path, isFetching, lastUpdated } = this.props
      return (
        <form onSubmit={this.handleSubmit} className="create-contact-form">
          <ul>
            <li>Title: <input name="title" /></li>
            <li>Body: <input name="body" /></li>
            <li>Author: <input name="author" /></li>
            <li>Category:
              <select name="category">
                {categories && categories.map((category) => (
                    <option key={category.path} value={category.path}>{category.name}</option>
                ))}
              </select>
            </li>
          </ul>
          <button
          type="submit"
          >SAVE</button>
        </form>
      )
  }
}
function mapStateToProps ( state, props ) {
  // console.log(state.appReducer.post)
  return {
    categories: state.appReducer.categories,
    isFetching: state.appReducer.isFetching,
    lastUpdated: state.appReducer.lastUpdated
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: (data) => dispatch(push(data)),
    fetchCategories: (data) => dispatch(fetchCategoriesIfNeeded()),
    newPost: (data) => dispatch(newPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost)
