import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import RecipeCard from './cards/RecipeCard';

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            recipe: {},
            comment: ''
        };
    }

    async componentDidMount() {
        const uri = this.props.match.params.uri;
        const recipe = (await axios.get(`/api/comments/${uri}`)).data[0];
        this.setState({ recipe: recipe });
    }

    render() {
        const { email } = this.props;
        const { recipe, comment } = this.state;

        const addComment = ev => {
            ev.preventDefault();
            console.log(comment);
        };

        return (
            <div>
                <RecipeCard recipe={ recipe } email='' />
                <h1>Comments</h1>
                { email !== '' ? <form onSubmit={ addComment }>
                                    <input type='text' value={ comment } onChange={ ev => this.setState({ comment: ev.target.value }) }/>
                                </form>
                                : <Link to='/login'>Please sign in to comment</Link> }
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(null, mapDispatchToProps)(Comments);