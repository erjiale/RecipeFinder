# RecipeFinder
You don't know what to cook? RecipeFinder finds it for you!
<p>RecipeFinder allows you to <b>search recipes</b> based on the ingredients you have to your disposal. By registering with us, you can <b>save recipes</b> you like for future reference, and also <b>order recipes</b> from our Store of recipes</p>

## How to Run
#### 1. npm i ####
#### 2. npm run start ####
#### 3. go to localhost:4000 ####

# 3-23 #
#### added webpack, react ####

# 3-25 #
#### added mock login, favorite recipes (with fake data), mock logout ####
### known bug: when you log out, the logged out message stays until you refresh page ###

# 4-1 #
#### separated server and client ####

# 4-6 #
#### implemented the api calls and api testing so that recipes actually show up according to the inputs ####

# 4-7 # 
#### added popular recipes page and missing ingredients list ####

# 4-9 # 
#### added favorite recipes. can add favorite, delete favorite ####
#### only works with account email: jay@gmail.com. password: 123456789 because that's the only account in our mongo database that has the "favorites" option ####

# 4-13 #
#### added dropdown select when you type in an ingredient in the form. next step: i want to sort the found recipes by the amount of missing ingredients ####

# 4-29 #
#### Added Message Schema to model
### REQUIREMENTS:
- [x] sign in
- [x] sign up
- [x] favorite recipe
- [x] find recipe - need to fix autocorrect
- [x] order recipe
  - [x] user can select a recipe
  - [ ] admin is notified of a new user selection
  - [x] admin can approve or deny order via admin dashboard
  - [x] user will receive notification of approve or deny

### Bug fixes, and updates needed:
- [x] Deleting a favorite element, does not delete from the db
- [x] RecipeFinder ingredients input bug -> salt cannot be input. Last resort: we can get rid of dropdown autocorrect
- [x] Work on admin approval and Order Recipe
