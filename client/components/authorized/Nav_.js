import React from "react";
import { Link } from "react-router-dom";

const Nav_ = ({ location, logout, email, user }) => {
  const url = location.pathname.slice(1);
  return (
    <main>
      {!user.admin ? (
        <div
          id="mainNavbar"
          class="navbar navbar-expand-lg navbar-dark bg-dark"
        >
          <a class="navbar-brand" href="#">
            RECIPE FINDER
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Recipes
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" id="enlargeLink" href="#/search">
                    Search by Ingredients
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" id="enlargeLink" href="#/popular">
                    Popular Recipes
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" id="enlargeLink" href="#/favorite">
                    Favorite Recipes
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" id="enlargeLink" href="#/store">
                    Store
                  </a>
                </div>
              </li>

              <li class="nav-item">
                <Link
                  to={`/user/${email}`}
                  className="nav-link"
                  id="enlargeLink"
                >
                  Order History
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  to="#/login"
                  onClick={() => logout()}
                  className="nav-link"
                  id="enlargeLink"
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          id="mainNavbar"
          class="navbar navbar-expand-lg navbar-dark bg-dark"
        >
          <a class="navbar-brand" href="#">
            RECIPE FINDER
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Recipes
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" id="enlargeLink" href="#/search">
                    Search by Ingredients
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" id="enlargeLink" href="#/popular">
                    Popular Recipes
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" id="enlargeLink" href="#/favorite">
                    Favorite Recipes
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" id="enlargeLink" href="#/store">
                    Store
                  </a>
                </div>
              </li>
              <li class="nav-item">
                <Link
                  to={`/user/${email}`}
                  className="nav-link"
                  id="enlargeLink"
                >
                  Profile
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="#/login"
                  onClick={() => logout()}
                  className="nav-link"
                  id="enlargeLink"
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
};

export default Nav_;
