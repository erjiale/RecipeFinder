import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";
import { loadRecipes } from "../../store/store";
// import { connect } from 'react-redux';

const RecipeCard = (props) => {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         favorites: []
  //     }
  // }

  // componentDidMount() {
  //     (props).favorites;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //     console.log(prevProps);
  //     console.log((props));
  //     if(prevProps.user.favorites !== (props).user.favorites) {
  //         this.setState();
  //     }
  // }

  const { recipe, ingredients, email, location, user } = props;

  //thunks
  const { unfavorite, addfavorite, removeOrder } = props;
  // const { addfavorite } = (props);

  let missingingredients = [];

  //finds missing ingredients
  if (ingredients)
    missingingredients = recipe.ingredients.filter(
      (recipeingr) =>
        !ingredients.some((ingr) => recipeingr.text.includes(ingr))
    );
  return (
    <div className="row justify-content-around">
      <div className="col-sm-12">
        <div className="card-deck">
          <div className="card" id="flexCard">
            <img
              className="card-img-top"
              src={recipe.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <h3 className="card-title">
                <a href={recipe.url} target="_blank">
                  {recipe.label}
                </a>
              </h3>
              <br />
              {email !== "" ? (
                <form
                  onSubmit={async () => {
                    if (location === "favorite") {
                      unfavorite(recipe, email);
                    } else {
                      // await axios.post(`/api/user/${email}/favorite`, { favoriteObj: recipe });
                      addfavorite(recipe, user.email);
                      alert("Recipe added to Favorites");
                    }
                  }}
                >
                  {location != "favorite" ? (
                    <button class="add d-flex justify-content-center align-items-center">
                      Add to Favorites
                    </button>
                  ) : (
                    <button class="sub d-flex justify-content-center align-items-center">
                      Delete from Favorites
                    </button>
                  )}
                </form>
              ) : (
                ""
              )}
              {/* -------Authenticated------------------------------------
                            { email !== '' && location === 'favorite' ?
                                <form onSubmit={ async () => {

                                    unfavorite(recipe, email);
                                }}>
                                    <button>Delete from favorites</button>
                                </form>
                                : ''
                            }
                            { email !== '' && location !== 'favorite' ?
                                <form onSubmit={ async () => {
                                    // await axios.post(`/api/user/${user.email}/favorites`, { favoriteObj: recipe });
                                    addfavorite(recipe, email);
                                    alert('Added to favorites');
                                }}>
                                    {(user.favorites.filter(favorite=>favorite.uri === recipe.uri).length === 0) ?
                                        <button>Add to Favorites</button>
                                        : 'Recipe already saved'}
                                </form>
                                : ''
                            } */}

              {/* -------ADMIN && Authenticated------------------------------------*/}
              {email !== "" && user.admin ? (
                <form
                  onSubmit={async () => {
                    if (location === "store") {
                      removeOrder(recipe, email);
                    } else {
                      // adds to Admin's order array (store items) in db only if it is NOT a duplicate
                      await axios.post(`/api/user/${email}/orders`, {
                        orderObj: recipe,
                      });
                      alert("This recipe is now for sale");
                    }
                  }}
                >
                  {location != "store" ? (
                    <button>Add to Store</button>
                  ) : (
                    <button class="add d-flex justify-content-center align-items-center">
                      Remove from Store
                    </button>
                  )}
                </form>
              ) : (
                ""
              )}

              {/* -------CUSTOMER && Authenticated------------------------------------*/}
              {email !== "" && !user.admin ? (
                <form
                  onSubmit={async () => {
                    await axios.post(`/api/user/${user.email}/orders`, {
                      orderObj: recipe,
                    });
                    alert("Your order is on the way");
                  }}
                >
                  {location == "store" ? (
                    <button class="sub d-flex justify-content-center align-items-center">
                      Order Recipe
                    </button>
                  ) : (
                    ""
                  )}
                </form>
              ) : (
                ""
              )}

              <br />

              <div id="accordion">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h5 class="mb-0">
                      <button
                        class="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        These are the ingredients
                      </button>
                    </h5>
                  </div>

                  <div
                    id="collapseOne"
                    class="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div class="card-body">
                      <ul>
                        {recipe.ingredients &&
                          recipe.ingredients.map((ingr, index) => (
                            <li key={index}>{ingr.text}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {missingingredients.length !== 0 ? (
                  <div class="card">
                    <div class="card-header" id="headingTwo">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          These are your missing ingredients
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseTwo"
                      class="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <ul>
                          {missingingredients.map((ingr, index) => (
                            <li key={index}>{ingr.text}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footWh"></div>
    </div>
  );
};

export default RecipeCard;
