import React, { Component } from 'react';
import axios from 'axios';

//components
import Recipes from './Recipes';

class IngredientsForm extends Component {
    constructor() {
        super();
        this.ref = React.createRef();
        this.state = {
            ingredients: ['','','','',''],
            recipes: []
        };
    }
    render() {
        const { ingredients, recipes } = this.state;
        const { authenticated, email } = this.props;

        const setIngredient = (value, index) => {
            const tempingredients = [...ingredients];
            tempingredients[index] = value;
            this.setState({ ingredients: tempingredients });
        };

        const addIngredient = ev => {
            ev.preventDefault();
            const tempingredients = [...ingredients];
            tempingredients.push('');
            this.setState({ ingredients: tempingredients });
        };

        const deleteIngredient = (ev, index) => {
            ev.preventDefault();
            this.state.ingredients.splice(index, 1);
            this.setState({ ingredients: this.state.ingredients });
        };  

        const findRecipes = async (ev, inputs) => {
            ev.preventDefault();
            const API_ID = "41d54d75"
            const API_KEY = "dd6be63ef848ed24366c0340af7d0759"
            const query = inputs.reduce((entirestring, ingredient) => {
                if(entirestring === '') return ingredient;
                else return `${entirestring} and ${ingredient}`;
            }, '');
            const findrecipes = (await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`)).data.hits;
            this.setState({ recipes: findrecipes });
            this.ref.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
              });
        };

        return (
            <main>
                <div className="form">
                    <form onSubmit={ (ev) => findRecipes(ev, ingredients) } >
                        <h3>What ingredients do you have?</h3>
                        {
                            ingredients.map((ingredient, index) => {
                                return (
                                    <div key={ index } className="ingredientsinput">
                                        <input  type='text' 
                                                onChange={ ev => setIngredient(ev.target.value, index) } 
                                                value={ ingredient } 
                                                placeholder={ `Ingredient ${index + 1}` } 
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
                { recipes.length === 0 ? '' : <div ref={ this.ref }>
                                                <Recipes email={ email } authenticated={ authenticated } recipes={ recipes } ingredients={ ingredients } />
                                               </div> }
            </main>

        );
    }
};

export default IngredientsForm;