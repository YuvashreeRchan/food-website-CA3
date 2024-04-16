//https://www.themealdb.com/api/json/v1/1/random.php
//https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

async function getRandomMeal() {
    
    try{
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!response.ok) {
            throw new Error('Failed to fetch random meal data');
        }
        const data = await response.json();
        const meal = data.meals[0];

        const randomMealContainer = document.getElementById('randomMeal-Container');
        randomMealContainer.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>`;

        randomMealContainer.addEventListener('click', () => {
            displayIngredients(meal);
        });
    }
    catch (error) {
        console.error('Error fetching random meal data:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', getRandomMeal);

async function searchForMeal(){
    try {
        const searchInput = document.getElementById('search-CategoryInput').value;

        const searchedMealsCategory = document.getElementById('searchedMeals-Category');
        searchedMealsCategory.textContent = `Searched Category: ${searchInput}`;

        if (searchInput.trim() === '') {
            return;
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`);
        const data = await response.json();
        const meals = data.meals;

        const searchedMealsContainer = document.getElementById('searchedMeals-Container');
        searchedMealsContainer.innerHTML = '';

        meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('meal');
            mealDiv.innerHTML =  `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strMeal}</p>`;

            searchedMealsContainer.append(mealDiv);
        });

        const searchedMealsDisplay = document.getElementById('searchedMeals-Display');
        searchedMealsDisplay.style.display = 'block';
    }
    catch (error) {
        console.error('Error fetching data', error.message);
    }
}

function displayIngredients(meal) {

    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = '';

    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');

    for (let i = 1; i <= 15; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            const listIngre = document.createElement('li');
            listIngre.textContent = `${measure} ${ingredient}`;
            ingredientsList.append(listIngre);
        }
    }

    modal.style.display = 'block';

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

