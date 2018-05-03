import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../Queries/queries';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookName: "",
            bookGenre: "",
            authorId: ""
        }
    }

    _displayAuthors(){
        const {
            getAuthorsQuery
        } = this.props;
        
        const data = getAuthorsQuery;

        if(data.loading){
            return (<option>Loading..</option>);
        } else {
            return data.authors.map(author => <option value={author.id} key={author.id}>{author.name}</option>)
        }
    }

    _submitForm=(evt)=>{
        evt.preventDefault();

        const {
            bookName,
            bookGenre,
            authorId
        } = this.state;

        this.props.addBookMutation({
            variables: {
                name: bookName, 
                genre: bookGenre,
                authorId: authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }
  render() {
      const authorOptionList = this._displayAuthors();
      return (
      <div>
        <form id="add-book" onSubmit={(evt) => this._submitForm(evt)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(evt) => this.setState({ bookName: evt.target.value})} />
            </div>
            <div className="field">
                <label>Genre name:</label>
                <input type="text" onChange={(evt) => this.setState({ genreName: evt.target.value})}/>
            </div>
            <div className="field">
                <label>Author name:</label>
                <select onChange={(evt) => this.setState({ authorId: evt.target.value})}>
                    {authorOptionList}
                </select>
            </div>
            <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
