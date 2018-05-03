import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../Queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected: null
    }
  }

  _displayBooks(){
    const {
      data
    } = this.props;

    if(data.loading){
      return(<div>Loading...</div>);
    } else {
      return data.books.map(book => <li onClick={(evt) => {this.setState({selected: book.id})}} key={book.id}>{book.name}</li>)
    }
  }

  render() {
    const bookList = this._displayBooks();
    return (
      <div>
        <ul id="book-list">
            {bookList}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
