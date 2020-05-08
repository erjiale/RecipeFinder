import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Select from 'react-select';

//components
import Recipes from './Recipes';

//thunks 
import { loadRecipes } from '../store/store';

class IngredientsForm extends Component {
    constructor() {
        super();
        this.ref = React.createRef();
        this.state = {
            ingredientsinput: ['','','','',''],
            ingredients: ['','','','',''],
            recipes: [],
            results: []
        };
    }
    
    render() {
        const { ingredientsinput, results, ingredients } = this.state;
        const { email, toggleFound } = this.props;

        //redux
        const { getRecipes, recipes } = this.props;

        //this changes the INPUT value (this is needed because when you click outside of the dropdown, the value resets)
        const setIngredient = (value, index) => {
            const tempingredients = [...ingredientsinput];
            tempingredients[index] = value;
            this.setState({ ingredientsinput: tempingredients });
        };

        //this changes the ACTUAL INGREDIENTS ARRAY. this is the array that actually has all the ingredients in it
        const changeValue = (value, index) => {
            const tempingredients = [...ingredients];
            tempingredients[index] = value;
            this.setState({ ingredients: tempingredients });
        };

        const addIngredient = ev => {
            ev.preventDefault();
            this.setState({ ingredientsinput: [...ingredientsinput, ''] });
        };

        const deleteIngredient = (ev, index) => {
            ev.preventDefault();
            ingredientsinput.splice(index, 1);
            this.setState({ ingredientsinput: ingredientsinput });
        };  

        const findRecipes = async (ev, inputs) => {
            ev.preventDefault();
            const query = inputs.reduce((entirestring, ingredient) => {
                if(entirestring === '') return ingredient;
                else return `${entirestring} and ${ingredient}`;
            }, '');
            getRecipes(query);
            setTimeout( () => this.ref.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            }), 800);
            toggleFound();
        };

        const autocorrect = async (index) => {
            const autocomplete = (await axios.get(`http://api.edamam.com/auto-complete?q=${ingredientsinput[index]}&limit=10&app_id=${this.API_ID}&app_key=${this.API_KEY}`)).data.map(item => { 
                return {value: item, label: item};
            });
            this.setState({ results: autocomplete });
        };
          
        return (
            <main>
                <div className="form">
                    <form onSubmit={ (ev) => findRecipes(ev, ingredients) } >
                        <h3>What ingredients do you have?</h3>
                        {
                            ingredientsinput.map((ingredient, index) => {
                                return (
                                    <div key={ index } className="ingredientsinput">
                                        <Select
                                            inputValue={ ingredient }
                                            onInputChange={ value => {
                                                setIngredient(value, index);
                                                autocorrect(index); 
                                            }}
                                            onChange={ ev => {
                                                changeValue(ev.value, index);
                                            } }
                                            options={ results }
                                            className='ingr'
                                        />
                                        { index >= 5 ? <button className='remove' onClick={ ev => deleteIngredient(ev, index) }>X</button> : ''}
                                    </div>
                                )
                            })
                        }

                        <button className="add" onClick={ ev => addIngredient(ev) }>Add more ingredients</button>
                        <input disabled={ ingredients.filter(ingr => ingr === '').length !== 0 ? 'disabled' : '' } className="add" type="submit" value="Find Recipe" />
                        
                    </form>
                </div>
                
                <div className="footWh"></div>
                
                {/* gunit */}
                { recipes && recipes.length !== 0 ? <div ref={ this.ref }>
                                                <Recipes email={ email } recipes={ recipes } ingredients={ ingredients } />
                                               </div> : ''}
            </main>

        );
    }
};

const mapStateToProps = state => {
    return {
        recipes: state.recipes
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: ingredients => {
            dispatch(loadRecipes(ingredients));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsForm);