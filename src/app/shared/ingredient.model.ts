//Just like the recipe model, we should create an Ingredient model and constructor
export class Ingredient {
    //TypeScript offers a shortcut. We can remove the declarations from the class and constructor, and add the accessor "public" to the arguments
    constructor(public name: string, public amount: number) {}
}