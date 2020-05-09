import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeCard from '../cards/RecipeCard';

//thunks
import { getOrders, destroyOrder, addFavorite } from '../../store/store';

class Orders_ extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            orders: [],
            user: ''
        };
    }   

    async componentDidMount() {
        const { email, load, user } = this.props;
        load(email);
    }

    render() {
        const { orders, location, email, user, removeOrder, addfavorite } = this.props;
        return (
            <main>
                {location.pathname.slice(1) === 'store' ? 
                    <main>
                        <h1>Store</h1>
                        <div>
                            {
                                orders.length !== 0 ? orders.map((food, index) => <RecipeCard email={ email } user={user} key={ index } location={ location.pathname.slice(1) } recipe={ food } removeOrder={ removeOrder } addfavorite={ addfavorite }/> ) : 'No available items for purchase. Come back next time!'
                            }
                        </div>
                    </main>
                    :
                    <main>
                        {!user.admin ?
                            <main>
                                <h1>Hello, {user.name}</h1>
                                <p>Email: {user.email}</p>
                                <h3>Order History</h3>
                                <div>
                                    {
                                        orders.length !== 0 ? orders.map((food, index) => <RecipeCard email={ email } user={user} key={ index } location={ location.pathname.slice(1) } recipe={ food } removeOrder={ removeOrder } addfavorite={ addfavorite } /> ) : 'You have not ordered any recipes. Order something!'
                                    }
                                </div>
                            </main>
                            :
                            <main>
                                <h1>Hello, {user.name} <i><b>(admin)</b></i></h1>
                                <p>Email: {user.email}</p>
                                
                            </main>
                        }
                    </main>    
                }
            </main>
            
            
            
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.orders
    }
};

const mapDispatchToProps = dispatch => {
    return {
        load: email => dispatch(getOrders(email)),
        removeOrder: (recipe, email) => dispatch(destroyOrder(recipe, email)),
        addfavorite: (recipe,email) => dispatch(addFavorite(recipe, email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders_);