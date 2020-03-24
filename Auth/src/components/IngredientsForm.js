import React, { Component } from 'react';

class IngredientsForm extends Component {
    constructor() {
        super();
        this.state = {
            ingredients: ['','','','','']
        };
    }
    render() {
        const { ingredients } = this.state;
        const { findRecipes } = this.props;

        const setIngredient = (value, index) => {
            const tempingredients = [...ingredients];
            tempingredients[index] = value;
            this.setState({ ingredients: tempingredients  });
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

        return (
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
                    <input className="add" type="submit" value="Find Recipe" />
                </form>
            </div>
        );
    }
};

export default IngredientsForm;