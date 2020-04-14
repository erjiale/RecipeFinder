import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';


//components
import Recipes from './Recipes';

class IngredientsForm extends Component {
    constructor() {
        super();
        this.ref = React.createRef();
        this.state = {
            ingredientsinput: ['','','','',''],
            ingredients: ['','','','',''],
            recipes: [],
            results: [],
            missingingredients: []
        };
        this.API_ID = "41d54d75"
        this.API_KEY = "dd6be63ef848ed24366c0340af7d0759"
    }
    render() {
        const { ingredientsinput, recipes, results, ingredients, missingingredients } = this.state;
        const { email } = this.props;

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
            this.setState({ ingredientsinput: [...ingredientsinput, ''], ingredients: [...ingredients, ''] });
        };

        const deleteIngredient = (ev, index) => {
            ev.preventDefault();
            ingredientsinput.splice(index, 1);
            ingredients.splice(index, 1);
            this.setState({ ingredientsinput: ingredientsinput, ingredients: ingredients });
        };  

        const findRecipes = async (ev, inputs) => {
            ev.preventDefault();
            const query = inputs.reduce((entirestring, ingredient) => {
                if(entirestring === '') return ingredient;
                else return `${entirestring} and ${ingredient}`;
            }, '');
            const findrecipes = (await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${this.API_ID}&app_key=${this.API_KEY}`)).data.hits;
            this.setState({ recipes: findrecipes });
            missingingredients = recipe.ingredients.filter(recipeingr => !ingredients.some(ingr => recipeingr.text.includes(ingr)));
            this.ref.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
              });
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
                { recipes.length === 0 ? '' : <div ref={ this.ref }>
                                                <Recipes email={ email } recipes={ recipes } missingingredients={ missingingredients }/>
                                               </div> }
            </main>

        );
    }
};

export default IngredientsForm;