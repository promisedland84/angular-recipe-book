import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {
    // recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Vegan Garlic Bread', 
        'This is a test recipe description. Most likely, these are vegetables in the guise of something edible.', 
        'https://ifoodreal.com/wp-content/uploads/2014/03/main-cauliflower-breadsticks-recipe.jpg',
        [
            new Ingredient('Bread', 4),
            new Ingredient('Sauce', 1)
        ]),
        new Recipe('Spicy Fried Chicken', 
        'This is another test recipe description. It is probably something fried and covered in hot sauce.', 
        'https://www.rockrecipes.com/wp-content/uploads/2012/04/Double-Crunch-Honey-Garlic-Chicken-Breasts-edit2-1.jpg',
        [
            new Ingredient('Live Chicken', 2),
            new Ingredient('Hot Sauce', 1)
        ])
      ];

      constructor (private slService: ShoppingListService) {}

      setRecipes(recipes: Recipe[]) {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      //if you slice the array with no arguments, it will retrun a new array that is an exact copy of the array in this service file.
      //that way, we're not really accessing/modifying this array from outside, we're only doing so to the copy.
      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addNewIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }
}