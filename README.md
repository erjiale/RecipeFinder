# RecipeFinder
You don't know what to cook? RecipeFinder finds it for you!

#### to run: npm i ####
#### npm run start ####
#### go to localhost:3000 ####

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
- [ ] favorite recipe - need to fix bug
- [ ] find recipe - need to fix autocorrect
1. order recipe
      - [ ] user can select a recipe
      - [ ] admin is notified of a new user selection
      - [ ] admin can approve or deny order via admin dashboard
      - [ ] user will receive notification of approve or deny

### Bug fixes, and updates needed:
- [ ] Deleting a favorite element, does not delete from the db
- [ ] RecipeFinder ingredients input bug -> salt cannot be input. Last resort: we can get rid of dropdown autocorrect
- [ ] what
