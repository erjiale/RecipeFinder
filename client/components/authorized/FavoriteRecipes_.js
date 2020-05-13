import React, { Component } from "react";
import { connect } from "react-redux";

import RecipeCard from "../cards/RecipeCard";

//thunks
import { getFavorites, destroy, addFavorite } from "../../store/store";

class FavoriteRecipes_ extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      favorites: [],
      user: "",
    };
  }

  async componentDidMount() {
    const { email, load, user } = this.props;
    load(email);
  }

  render() {
    const {
      favorites,
      location,
      unfavorite,
      addfavorite,
      email,
      user,
    } = this.props;
    return (
      <main>
        <div class="favimg">
          <div class="container content4 d-flex align-items-center justify-content-center fade-in">
            <h1 id="title">Favorite Recipes</h1>
          </div>
          <div class="container content4 d-flex align-items-center justify-content-center fade-in">
            <h2>Here is where you can keep all of your favorites!</h2>
          </div>
        </div>
        {/* <div class="container content4">
          <div class="row">
            <div class="col-sm-12">
              {favorites.length !== 0
                ? favorites.map((food, index) => (
                    <RecipeCard
                      user={user}
                      unfavorite={unfavorite}
                      addfavorite={addfavorite}
                      email={email}
                      key={index}
                      location={location.pathname.slice(1)}
                      recipe={food}
                    />
                  ))
                : "No saved recipes yet!!"}
            </div>
          </div>
        </div> */}

        <div class="footWh"></div>
        <div class="footWh"></div>
        <div class="footWh"></div>

        <div class="all-recipes mt-3">
          {favorites.length !== 0
            ? favorites.map((food, index) => (
                <RecipeCard
                  user={user}
                  unfavorite={unfavorite}
                  addfavorite={addfavorite}
                  email={email}
                  key={index}
                  location={location.pathname.slice(1)}
                  recipe={food}
                />
              ))
            : "No saved recipes yet!!"}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (email) => dispatch(getFavorites(email)),
    unfavorite: (recipe, email) => dispatch(destroy(recipe, email)),
    addfavorite: (recipe, email) => dispatch(addFavorite(recipe, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes_);
