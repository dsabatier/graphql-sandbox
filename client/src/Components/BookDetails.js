import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../Queries/queries'

class BookDetails extends Component {

  render() {
      const {
          book
      } = this.props.data;

      const {
          name = "",
          genre = "",
          author = ""
      } = book || {};

      console.log(this.props.data)

    return (
      <div id="book-details">
        <p>{name}</p>
        <p>{genre}</p>
        <p>{author.name}</p>
      </div>
    );
  }
}

export default graphql(getBookQuery,
{
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
