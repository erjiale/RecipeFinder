import React, { Component } from "react";
import { connect } from "react-redux";
import RecipeCard from "./cards/RecipeCard";

//thunks
import { loadRecipes, addFavorite } from "../store/store";

class Recommended extends Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //     this.props.load();
  // }

  render() {
    const {
      recipes,
      email,
      foundRecipe,
      toggleFound,
      load,
      user,
      addfavorite,
    } = this.props;
    return (
      <main>
        <div class="recommendimg">
          <div class="container content4 d-flex align-items-center justify-content-center fade-in">
            <h1 id="title">Recommended Recipes</h1>
          </div>
          <div class="container content4 d-flex align-items-center justify-content-center fade-in">
            <h2>Our top recommendations and popular suggestions</h2>
          </div>
        </div>
        <div className="text-center">
        {foundRecipe ? (
            <button
              type="submit"
              value="Go to search"
              class="bg-dark text-light btn btn-default btn-lg border border-rounded m-4"
              onClick={() => {
                toggleFound();
                load();
              }}
            >
              Get Recommended
            </button>
          ) : (
            ""
          )}
          </div>

        <div className="all-recipes">
          
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipe.uri}
              addfavorite={addfavorite}
              user={user}
              recipe={recipe.recipe}
              email={email}
            />
          ))}
        </div>
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
    load: () => {
      dispatch(loadRecipes());
    },
    addfavorite: (recipe, email) => {
      dispatch(addFavorite(recipe, email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
