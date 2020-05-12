import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Select from "react-select";

//components
import Recipes from "./Recipes";

//thunks
import { loadRecipes, addFavorite } from "../store/store";

class IngredientsForm extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.state = {
      ingredientsinput: ["", "", "", "", ""],
      // ingredients: ['','','','',''],
      recipes: [],
      results: [],
    };
  }

  render() {
    const { ingredientsinput, results } = this.state;
    const { email, toggleFound, user } = this.props;

    //redux
    const { getRecipes, recipes, addfavorite } = this.props;

    //this changes the INPUT value (this is needed because when you click outside of the dropdown, the value resets)
    const setIngredient = (value, index) => {
      const tempingredients = [...ingredientsinput];
      tempingredients[index] = value;
      this.setState({ ingredientsinput: tempingredients });
    };

    //this changes the ACTUAL INGREDIENTS ARRAY. this is the array that actually has all the ingredients in it
    // const changeValue = (value, index) => {
    //     const tempingredients = [...ingredients];
    //     tempingredients[index] = value;
    //     this.setState({ ingredients: tempingredients });
    // };

    const addIngredient = (ev) => {
      ev.preventDefault();
      this.setState({ ingredientsinput: [...ingredientsinput, ""] });
    };

    const deleteIngredient = (ev, index) => {
      ev.preventDefault();
      ingredientsinput.splice(index, 1);
      this.setState({ ingredientsinput: ingredientsinput });
    };

    const findRecipes = async (ev, inputs) => {
      ev.preventDefault();
      const query = ingredientsinput.reduce((entirestring, ingredient) => {
        if (entirestring === "") return ingredient;
        else return `${entirestring} and ${ingredient}`;
      }, "");
      getRecipes(query);
      setTimeout(
        () =>
          this.ref.current.scrollIntoView({
            behavior: "smooth",
            inline: "center",
          }),
        800
      );
      toggleFound();
    };

    const autocorrect = async (index) => {
      const autocomplete = (
        await axios.get(
          `http://api.edamam.com/auto-complete?q=${ingredientsinput[index]}&limit=10&app_id=${this.API_ID}&app_key=${this.API_KEY}`
        )
      ).data.map((item) => {
        return { value: item, label: item };
      });
      this.setState({ results: autocomplete });
    };

    return (
      <main>
        <div class="ingrform d-flex justify-content-center align-items-center">
          <div className="form fade-in">
            <form onSubmit={(ev) => findRecipes(ev)}>
              <h3 class="content3">What ingredients do you have?</h3>
              {ingredientsinput.map((ingredient, index) => {
                return (
                  // <div key={ index } className="ingredientsinput">
                  //     <Select
                  //         inputValue={ ingredient }
                  //         onInputChange={ value => {
                  //             setIngredient(value, index);
                  //             autocorrect(index);
                  //         }}
                  //         onChange={ ev => {
                  //             changeValue(ev.value, index);
                  //         } }
                  //         options={ results }
                  //         className='ingr'
                  //     />
                  //     { index >= 5 ? <button className='remove' onClick={ ev => deleteIngredient(ev, index) }>X</button> : ''}
                  // </div>
                  <div key={index} className="ingredientsinput content3">
                    <input
                      class="form-control"
                      type="text"
                      onChange={(ev) => setIngredient(ev.target.value, index)}
                    />

                    {index >= 5 ? (
                      <button
                        className="remove"
                        onClick={(ev) => deleteIngredient(ev, index)}
                      >
                        X
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              <button
                className="add d-flex justify-content-center align-items-center"
                onClick={(ev) => addIngredient(ev)}
              >
                Add more ingredients
              </button>
              <input
                disabled={
                  ingredientsinput.filter((ingr) => ingr === "").length !== 0
                    ? "disabled"
                    : ""
                }
                className="add d-flex justify-content-center align-items-center"
                type="submit"
                value="Find Recipe"
              />
            </form>
          </div>
        </div>

        <div class="container content4">
          <h1 id="popularrec">Popular Recipes</h1>
        </div>

        <div class="container">
          <h2 id="popularrec">
            These are some recipes that have been popular lately and that we
            recommend.
          </h2>
        </div>

        <div className="footWh"></div>
        <div className="footWh"></div>
        {recipes && recipes.length !== 0 ? (
          <div ref={this.ref}>
            <Recipes
              user={user}
              email={email}
              recipes={recipes}
              ingredients={ingredientsinput}
              addfavorite={addfavorite}
            />
          </div>
        ) : (
          ""
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipes: (ingredients) => {
      dispatch(loadRecipes(ingredients));
    },
    addfavorite: (recipe, email) => {
      dispatch(addFavorite(recipe, email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsForm);
