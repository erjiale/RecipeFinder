import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import RecipeCard from './cards/RecipeCard';

//thunks
import { sendMessage } from '../store/store';

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            recipe: {},
            comment: '',
            text: ''
        };
        this.sendMessage = this.sendMessage.bind(this);
    }
    async componentDidMount() {
        const uri = this.props.match.params.uri;
        const recipe = (await axios.get(`/api/comments/${uri}`)).data[0];
        this.setState({ recipe: recipe });
    }
    async sendMessage(ev){
        ev.preventDefault();
        await this.props.sendMessage({ 
            senderId: this.props.user._id, 
            receiverId: "5ea7725f1240bf2c2bad517a",
            text: this.state.text
        })
        this.setState({ text: ''});
        
    }
    render() {
        const { user } = this.props;
        const { recipe, comment, text } = this.state;
        const { sendMessage } = this;

        // const addComment = ev => {
        //     ev.preventDefault();
        //     console.log(comment);
        // };

        const orderRecipe = () => {
            console.log('good');
        };

        return (
            <div>
                { user.email && !user.admin ? <button onClick={ orderRecipe }>Order Recipe</button> : '' }
                {/* <form onSubmit={ sendMessage }>
                    <input onChange={ ev => this.setState({ text: ev.target.value }) } value={ text } />
                </form> */}

                <RecipeCard recipe={ recipe } email='' />
                
                {/* <h1>Comments</h1>
                { user === {} ? <form onSubmit={ addComment }>
                                    <input type='text' value={ comment } onChange={ ev => this.setState({ comment: ev.target.value }) }/>
                                </form>
                                : <Link to='/login'>Please sign in to comment</Link> } */}
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: message => dispatch(sendMessage(message))
    }
};

export default connect(null, mapDispatchToProps)(Comments);