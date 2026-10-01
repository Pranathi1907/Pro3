/**
 * Savoria - Main Application Logic
 * Interactive global culinary experience with state management,
 * dynamic search/filtering, serving scaler, interactive cooking mode,
 * pantry matcher, shopping list drawer, and theme toggling.
 */

// Toast feedback system
const Toast = (function () {
  let container = null;

  function init() {
    container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  }

  function show(message, type = 'info', duration = 3200) {
    if (!container) init();

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠️' : '✨';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  return { init, show };
})();
window.Toast = Toast;

// App State
const AppState = {
  currentCuisine: 'all',
  currentDiet: 'all',
  searchQuery: '',
  sortBy: 'featured',
  unitSystem: 'metric', // 'metric' or 'imperial'
  selectedPantryItems: new Set(),
  favorites: new Set(JSON.parse(localStorage.getItem('savoria_favorites') || '[]')),
  shoppingList: JSON.parse(localStorage.getItem('savoria_shopping_list') || '[]'),
  onlyFavorites: false,
  activeRecipe: null,
  activeServings: 4,
  cookingModeActive: false,
  currentCookingStep: 0
};

// Main Controller
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCuisineFilters();
  initDietaryFilters();
  initPantryMatcher();
  initSearchAndSort();
  initShoppingList();
  initFavoritesHeader();
  TimerManager.init();
  Toast.init();
  renderRecipes();

  // Keyboard shortcut listener for cooking mode
  window.addEventListener('keydown', (e) => {
    if (AppState.cookingModeActive) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextCookingStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCookingStep();
      } else if (e.key === 'Escape') {
        closeCookingMode();
      }
    } else if (AppState.activeRecipe && e.key === 'Escape') {
      closeRecipeModal();
    }
  });
});

/* -----------------------------------------
   Theme Management
----------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('savoria_theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      KitchenAudio.playClick();
      Toast.show(`Switched to ${nextTheme === 'dark' ? 'Dark Gourmet' : 'Sunlit Harvest'} mode`);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('savoria_theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

/* -----------------------------------------
   Cuisine & Filter Chips
----------------------------------------- */
function initCuisineFilters() {
  const container = document.getElementById('cuisine-filter-bar');
  if (!container) return;

  container.innerHTML = CUISINES.map(c => `
    <button class="filter-chip ${c.id === AppState.currentCuisine ? 'active' : ''}" data-cuisine="${c.id}">
      <span class="chip-flag">${c.icon}</span>
      <span class="chip-name">${c.name}</span>
      <span class="chip-count">${c.count}</span>
    </button>
  `).join('');

  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    KitchenAudio.playClick();
    container.querySelectorAll('.filter-chip').forEach(el => el.classList.remove('active'));
    chip.classList.add('active');
    AppState.currentCuisine = chip.dataset.cuisine;
    AppState.onlyFavorites = false;
    updateSavedFilterState();
    renderRecipes();
  });
}

function initDietaryFilters() {
  const container = document.getElementById('diet-filter-bar');
  if (!container) return;

  container.innerHTML = DIETARY_FILTERS.map(d => `
    <button class="diet-pill ${d.id === AppState.currentDiet ? 'active' : ''}" data-diet="${d.id}">
      ${d.label}
    </button>
  `).join('');

  container.addEventListener('click', (e) => {
    const pill = e.target.closest('.diet-pill');
    if (!pill) return;
    KitchenAudio.playClick();
    container.querySelectorAll('.diet-pill').forEach(el => el.classList.remove('active'));
    pill.classList.add('active');
    AppState.currentDiet = pill.dataset.diet;
    renderRecipes();
  });
}

/* -----------------------------------------
   Pantry Matcher ("What's In Your Kitchen?")
----------------------------------------- */
function initPantryMatcher() {
  const container = document.getElementById('pantry-pills-container');
  if (!container) return;

  container.innerHTML = PANTRY_ITEMS.map(item => `
    <button class="pantry-pill" data-item="${item.toLowerCase()}">
      <span class="pantry-plus">+</span>
      <span>${item}</span>
    </button>
  `).join('');

  container.addEventListener('click', (e) => {
    const pill = e.target.closest('.pantry-pill');
    if (!pill) return;
    KitchenAudio.playClick();
    const item = pill.dataset.item;
    if (AppState.selectedPantryItems.has(item)) {
      AppState.selectedPantryItems.delete(item);
      pill.classList.remove('selected');
      pill.querySelector('.pantry-plus').textContent = '+';
    } else {
      AppState.selectedPantryItems.add(item);
      pill.classList.add('selected');
      pill.querySelector('.pantry-plus').textContent = '✓';
    }
    updatePantryStats();
    renderRecipes();
  });

  const clearBtn = document.getElementById('clear-pantry-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      KitchenAudio.playClick();
      AppState.selectedPantryItems.clear();
      container.querySelectorAll('.pantry-pill').forEach(p => {
        p.classList.remove('selected');
        p.querySelector('.pantry-plus').textContent = '+';
      });
      updatePantryStats();
      renderRecipes();
    });
  }
}

function updatePantryStats() {
  const countEl = document.getElementById('pantry-selected-count');
  if (countEl) {
    const count = AppState.selectedPantryItems.size;
    countEl.textContent = count > 0 ? `(${count} selected)` : '';
  }
}

/* -----------------------------------------
   Search & Sort
----------------------------------------- */
function initSearchAndSort() {
  const searchInput = document.getElementById('recipe-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.trim().toLowerCase();
      renderRecipes();
    });
  }

  const sortSelect = document.getElementById('recipe-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      KitchenAudio.playClick();
      AppState.sortBy = e.target.value;
      renderRecipes();
    });
  }

  const savedFilterBtn = document.getElementById('view-saved-btn');
  if (savedFilterBtn) {
    savedFilterBtn.addEventListener('click', () => {
      KitchenAudio.playClick();
      AppState.onlyFavorites = !AppState.onlyFavorites;
      updateSavedFilterState();
      renderRecipes();
    });
  }
}

function updateSavedFilterState() {
  const savedFilterBtn = document.getElementById('view-saved-btn');
  if (savedFilterBtn) {
    if (AppState.onlyFavorites) {
      savedFilterBtn.classList.add('active');
    } else {
      savedFilterBtn.classList.remove('active');
    }
  }
}

function initFavoritesHeader() {
  updateFavoritesCounter();
}

function updateFavoritesCounter() {
  const countEl = document.getElementById('favorites-badge-count');
  if (countEl) {
    countEl.textContent = AppState.favorites.size;
  }
}

/* -----------------------------------------
   Recipe Filtering & Rendering
----------------------------------------- */
function filterRecipes() {
  let list = [...RECIPES];

  // Cuisine filter
  if (AppState.currentCuisine !== 'all') {
    list = list.filter(r => r.cuisine === AppState.currentCuisine);
  }

  // Dietary filter
  if (AppState.currentDiet !== 'all') {
    if (AppState.currentDiet === 'quick') {
      list = list.filter(r => r.totalTime <= 35);
    } else {
      list = list.filter(r => r.dietary.includes(AppState.currentDiet));
    }
  }

  // Favorites filter
  if (AppState.onlyFavorites) {
    list = list.filter(r => AppState.favorites.has(r.id));
  }

  // Search filter
  if (AppState.searchQuery) {
    const q = AppState.searchQuery;
    list = list.filter(r => {
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchCuisine = r.cuisineLabel.toLowerCase().includes(q);
      const matchOrigin = r.origin.toLowerCase().includes(q);
      const matchIngredients = r.ingredients.some(i => i.name.toLowerCase().includes(q));
      return matchTitle || matchCuisine || matchOrigin || matchIngredients;
    });
  }

  // Pantry matching calculation
  if (AppState.selectedPantryItems.size > 0) {
    list = list.map(recipe => {
      let matchedCount = 0;
      recipe.ingredients.forEach(ing => {
        const ingLower = ing.name.toLowerCase();
        for (const item of AppState.selectedPantryItems) {
          if (ingLower.includes(item)) {
            matchedCount++;
            break;
          }
        }
      });
      return { ...recipe, matchedIngredientsCount: matchedCount };
    });

    // If pantry items are selected, sort by matched ingredients first
    list.sort((a, b) => b.matchedIngredientsCount - a.matchedIngredientsCount);
    return list;
  }

  // Sort
  if (AppState.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (AppState.sortBy === 'time') {
    list.sort((a, b) => a.totalTime - b.totalTime);
  } else if (AppState.sortBy === 'calories') {
    list.sort((a, b) => a.calories - b.calories);
  } else if (AppState.sortBy === 'reviews') {
    list.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  return list;
}

function renderRecipes() {
  const grid = document.getElementById('recipes-grid');
  const countBadge = document.getElementById('results-count-badge');
  if (!grid) return;

  const recipes = filterRecipes();

  if (countBadge) {
    countBadge.textContent = `${recipes.length} dish${recipes.length === 1 ? '' : 'es'}`;
  }

  if (recipes.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-state-icon">🍳</div>
        <h3>No Culinary Matches Found</h3>
        <p>Try clearing filters or search terms to uncover delicious recipes from around the globe.</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = recipes.map(recipe => {
    const isFav = AppState.favorites.has(recipe.id);
    const spiceDots = '🌶️'.repeat(recipe.spiceLevel) || '🌱 Mild';
    const pantryBadge = (recipe.matchedIngredientsCount !== undefined && recipe.matchedIngredientsCount > 0)
      ? `<div class="pantry-match-badge">🎯 Matches ${recipe.matchedIngredientsCount} pantry item${recipe.matchedIngredientsCount > 1 ? 's' : ''}</div>`
      : '';

    return `
      <article class="recipe-card" data-recipe-id="${recipe.id}">
        <div class="recipe-card-media">
          <img src="${recipe.image}" alt="${recipe.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80'">
          <div class="recipe-card-overlay">
            <span class="cuisine-tag"><span class="card-flag">${recipe.flag}</span> ${recipe.cuisineLabel}</span>
            <button class="favorite-heart-btn ${isFav ? 'favorited' : ''}" data-fav-id="${recipe.id}" aria-label="Toggle Favorite">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
          ${pantryBadge}
        </div>

        <div class="recipe-card-content">
          <div class="recipe-meta-row">
            <span class="meta-rating">★ ${recipe.rating.toFixed(2)} <span class="meta-reviews">(${recipe.reviewsCount})</span></span>
            <span class="meta-time">⏱️ ${recipe.totalTime}m</span>
            <span class="meta-difficulty meta-${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
          </div>

          <h3 class="recipe-card-title">${recipe.title}</h3>
          <p class="recipe-card-summary">${recipe.summary}</p>

          <div class="recipe-card-tags">
            ${recipe.dietary.map(d => `<span class="diet-tag">${d}</span>`).join('')}
            <span class="spice-tag">${spiceDots}</span>
          </div>

          <div class="recipe-card-footer">
            <div class="recipe-quick-stat">
              <span class="stat-value">${recipe.calories}</span>
              <span class="stat-label">kcal / serving</span>
            </div>
            <button class="btn btn-sm btn-gold open-recipe-btn" data-recipe-id="${recipe.id}">
              <span>View Recipe</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Add click listeners to cards & buttons
  grid.querySelectorAll('.open-recipe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openRecipeModal(btn.dataset.recipeId);
    });
  });

  grid.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.favorite-heart-btn')) return;
      openRecipeModal(card.dataset.recipeId);
    });
  });

  grid.querySelectorAll('.favorite-heart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.favId);
    });
  });
}

function resetAllFilters() {
  AppState.currentCuisine = 'all';
  AppState.currentDiet = 'all';
  AppState.searchQuery = '';
  AppState.onlyFavorites = false;
  AppState.selectedPantryItems.clear();

  const searchInput = document.getElementById('recipe-search-input');
  if (searchInput) searchInput.value = '';

  initCuisineFilters();
  initDietaryFilters();
  initPantryMatcher();
  updateSavedFilterState();
  renderRecipes();
  Toast.show('All filters reset', 'info');
}
window.resetAllFilters = resetAllFilters;

/* -----------------------------------------
   Favorites Management
----------------------------------------- */
function toggleFavorite(id) {
  KitchenAudio.playClick();
  const recipe = RECIPES.find(r => r.id === id);
  if (!recipe) return;

  if (AppState.favorites.has(id)) {
    AppState.favorites.delete(id);
    Toast.show(`Removed "${recipe.title}" from saved recipes`);
  } else {
    AppState.favorites.add(id);
    KitchenAudio.playChime();
    Toast.show(`Saved "${recipe.title}" to favorites! ⭐`, 'success');
  }

  localStorage.setItem('savoria_favorites', JSON.stringify([...AppState.favorites]));
  updateFavoritesCounter();
  renderRecipes();

  // If modal is open, update favorite button in modal too
  if (AppState.activeRecipe && AppState.activeRecipe.id === id) {
    updateModalFavoriteButton();
  }
}

/* -----------------------------------------
   Recipe Detail Modal
----------------------------------------- */
function openRecipeModal(recipeId) {
  KitchenAudio.playClick();
  const recipe = RECIPES.find(r => r.id === recipeId);
  if (!recipe) return;

  AppState.activeRecipe = recipe;
  AppState.activeServings = recipe.servings;

  const modal = document.getElementById('recipe-modal');
  if (!modal) return;

  renderModalContent();
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeRecipeModal() {
  KitchenAudio.playClick();
  const modal = document.getElementById('recipe-modal');
  if (modal) {
    modal.classList.remove('visible');
  }
  document.body.style.overflow = '';
  AppState.activeRecipe = null;
}
window.closeRecipeModal = closeRecipeModal;

function renderModalContent() {
  const r = AppState.activeRecipe;
  if (!r) return;

  // Header images & info
  document.getElementById('modal-hero-img').src = r.image;
  document.getElementById('modal-flag').textContent = r.flag;
  document.getElementById('modal-cuisine').textContent = r.cuisineLabel;
  document.getElementById('modal-origin').textContent = r.origin;
  document.getElementById('modal-title').textContent = r.title;
  document.getElementById('modal-summary').textContent = r.summary;

  // Stats
  document.getElementById('modal-prep-time').textContent = `${r.prepTime} min`;
  document.getElementById('modal-cook-time').textContent = `${r.cookTime} min`;
  document.getElementById('modal-difficulty').textContent = r.difficulty;
  document.getElementById('modal-calories').textContent = `${r.calories} kcal`;

  // Chef Tip & Wine
  document.getElementById('modal-chef-tip').textContent = r.chefTip;
  document.getElementById('modal-wine-pairing').textContent = r.winePairing;

  // Nutrition Bars
  renderModalNutrition(r.nutrition);

  // Servings and ingredients
  updateServingsDisplay();
  renderModalIngredients();

  // Steps
  renderModalSteps();

  // Modal Favorite button state
  updateModalFavoriteButton();
}

function updateModalFavoriteButton() {
  const favBtn = document.getElementById('modal-fav-btn');
  if (!favBtn || !AppState.activeRecipe) return;
  const isFav = AppState.favorites.has(AppState.activeRecipe.id);
  if (isFav) {
    favBtn.classList.add('favorited');
    favBtn.innerHTML = '❤️ Saved to Favorites';
  } else {
    favBtn.classList.remove('favorited');
    favBtn.innerHTML = '🤍 Save to Favorites';
  }
}

function renderModalNutrition(nutrition) {
  const container = document.getElementById('modal-nutrition-grid');
  if (!container || !nutrition) return;

  container.innerHTML = `
    <div class="nutrition-pill">
      <span class="nutri-label">Protein</span>
      <span class="nutri-val">${nutrition.protein}</span>
    </div>
    <div class="nutrition-pill">
      <span class="nutri-label">Carbs</span>
      <span class="nutri-val">${nutrition.carbs}</span>
    </div>
    <div class="nutrition-pill">
      <span class="nutri-label">Healthy Fats</span>
      <span class="nutri-val">${nutrition.fat}</span>
    </div>
    <div class="nutrition-pill">
      <span class="nutri-label">Fiber</span>
      <span class="nutri-val">${nutrition.fiber}</span>
    </div>
  `;
}

function changeServings(delta) {
  KitchenAudio.playClick();
  const newServings = Math.max(1, Math.min(16, AppState.activeServings + delta));
  if (newServings !== AppState.activeServings) {
    AppState.activeServings = newServings;
    updateServingsDisplay();
    renderModalIngredients();
  }
}
window.changeServings = changeServings;

function toggleUnitSystem(system) {
  KitchenAudio.playClick();
  AppState.unitSystem = system;
  document.querySelectorAll('.unit-toggle-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.unit === system);
  });
  renderModalIngredients();
}
window.toggleUnitSystem = toggleUnitSystem;

function updateServingsDisplay() {
  const el = document.getElementById('servings-count');
  if (el) el.textContent = `${AppState.activeServings} servings`;
}

function renderModalIngredients() {
  const listEl = document.getElementById('modal-ingredients-list');
  if (!listEl || !AppState.activeRecipe) return;

  const r = AppState.activeRecipe;
  const scale = AppState.activeServings / r.servings;
  const isImperial = AppState.unitSystem === 'imperial';

  listEl.innerHTML = r.ingredients.map((ing, idx) => {
    let displayAmount = '';
    let displayUnit = '';

    if (isImperial && ing.imperialAmount) {
      const raw = ing.imperialAmount * scale;
      displayAmount = formatScaledNumber(raw);
      displayUnit = ing.imperialUnit;
    } else {
      const raw = ing.amount * scale;
      displayAmount = formatScaledNumber(raw);
      displayUnit = ing.unit;
    }

    return `
      <li class="ingredient-row">
        <label class="ingredient-checkbox-label">
          <input type="checkbox" class="ingredient-checkbox" data-idx="${idx}" data-ing-name="${escapeHtml(ing.name)}" data-ing-amount="${displayAmount} ${displayUnit}">
          <span class="custom-checkmark"></span>
          <span class="ingredient-text">
            <strong>${displayAmount} ${displayUnit}</strong> ${ing.name}
          </span>
        </label>
        <span class="ingredient-cat-badge">${ing.category}</span>
      </li>
    `;
  }).join('');
}

function formatScaledNumber(num) {
  if (num % 1 === 0) return num.toString();
  if (num < 10) return num.toFixed(1).replace(/\.0$/, '');
  return Math.round(num).toString();
}

function escapeHtml(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderModalSteps() {
  const container = document.getElementById('modal-steps-container');
  if (!container || !AppState.activeRecipe) return;

  container.innerHTML = AppState.activeRecipe.steps.map(step => {
    const timerBtn = step.timerSeconds
      ? `<button class="btn btn-sm btn-timer-quick" onclick="TimerManager.startQuickTimer(${step.timerSeconds}, 'Step ${step.stepNumber}: ${escapeHtml(step.title)}')">
           ⏱️ Start ${Math.round(step.timerSeconds / 60)}m Timer
         </button>`
      : '';

    return `
      <div class="recipe-step-item">
        <div class="step-num-badge">${step.stepNumber}</div>
        <div class="step-body">
          <div class="step-header-row">
            <h4 class="step-title">${step.title}</h4>
            ${timerBtn}
          </div>
          <p class="step-instruction">${step.text}</p>
          ${step.technique ? `<div class="step-pro-technique">💡 <strong>Chef Technique:</strong> ${step.technique}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* -----------------------------------------
   Interactive Step-by-Step Cooking Mode
----------------------------------------- */
function startCookingMode() {
  if (!AppState.activeRecipe) return;
  KitchenAudio.playChime();
  AppState.cookingModeActive = true;
  AppState.currentCookingStep = 0;

  const overlay = document.getElementById('cooking-mode-overlay');
  if (!overlay) return;

  overlay.classList.add('visible');
  renderCookingModeStep();
}
window.startCookingMode = startCookingMode;

function closeCookingMode() {
  KitchenAudio.stopSpeech();
  KitchenAudio.playClick();
  AppState.cookingModeActive = false;
  const overlay = document.getElementById('cooking-mode-overlay');
  if (overlay) {
    overlay.classList.remove('visible');
  }
}
window.closeCookingMode = closeCookingMode;

function renderCookingModeStep() {
  const recipe = AppState.activeRecipe;
  if (!recipe) return;

  const totalSteps = recipe.steps.length;
  const stepIdx = AppState.currentCookingStep;
  const step = recipe.steps[stepIdx];

  // Title & progress
  document.getElementById('cooking-recipe-title').textContent = recipe.title;
  document.getElementById('cooking-step-badge').textContent = `Step ${stepIdx + 1} of ${totalSteps}`;

  const pct = ((stepIdx + 1) / totalSteps) * 100;
  document.getElementById('cooking-progress-bar').style.width = `${pct}%`;

  document.getElementById('cooking-step-title').textContent = step.title;
  document.getElementById('cooking-step-text').textContent = step.text;

  const techBox = document.getElementById('cooking-step-technique');
  if (step.technique) {
    techBox.innerHTML = `🌟 <strong>Culinary Wisdom:</strong> ${step.technique}`;
    techBox.classList.remove('hidden');
  } else {
    techBox.classList.add('hidden');
  }

  // Timer button in cooking mode
  const timerContainer = document.getElementById('cooking-step-timer-wrapper');
  if (step.timerSeconds) {
    timerContainer.innerHTML = `
      <button class="btn btn-timer-large" onclick="TimerManager.startQuickTimer(${step.timerSeconds}, '${recipe.title} - Step ${stepIdx + 1}')">
        ⏱️ Start ${Math.round(step.timerSeconds / 60)}-Minute Timer
      </button>
    `;
    timerContainer.classList.remove('hidden');
  } else {
    timerContainer.classList.add('hidden');
  }

  // Button disabled states
  document.getElementById('cooking-prev-btn').disabled = (stepIdx === 0);
  const nextBtn = document.getElementById('cooking-next-btn');
  if (stepIdx === totalSteps - 1) {
    nextBtn.innerHTML = 'Finish Cooking 🎉';
  } else {
    nextBtn.innerHTML = 'Next Step →';
  }

  // Update read aloud button
  updateSpeechButtonState();
}

function nextCookingStep() {
  const recipe = AppState.activeRecipe;
  if (!recipe) return;

  KitchenAudio.stopSpeech();
  KitchenAudio.playClick();

  if (AppState.currentCookingStep < recipe.steps.length - 1) {
    AppState.currentCookingStep++;
    renderCookingModeStep();
  } else {
    KitchenAudio.playChime();
    Toast.show(`Bon Appétit! You completed "${recipe.title}"! 🍽️✨`, 'success', 6000);
    closeCookingMode();
  }
}
window.nextCookingStep = nextCookingStep;

function prevCookingStep() {
  if (AppState.currentCookingStep > 0) {
    KitchenAudio.stopSpeech();
    KitchenAudio.playClick();
    AppState.currentCookingStep--;
    renderCookingModeStep();
  }
}
window.prevCookingStep = prevCookingStep;

function toggleReadAloud() {
  const recipe = AppState.activeRecipe;
  if (!recipe) return;

  if (KitchenAudio.getSpeechState()) {
    KitchenAudio.stopSpeech();
    updateSpeechButtonState();
  } else {
    const step = recipe.steps[AppState.currentCookingStep];
    const speechText = `Step ${step.stepNumber}: ${step.title}. ${step.text}`;
    KitchenAudio.speak(speechText, () => {
      updateSpeechButtonState();
    });
    updateSpeechButtonState();
  }
}
window.toggleReadAloud = toggleReadAloud;

function updateSpeechButtonState() {
  const btn = document.getElementById('cooking-speech-btn');
  if (!btn) return;
  const isSpeaking = KitchenAudio.getSpeechState();
  if (isSpeaking) {
    btn.classList.add('speaking');
    btn.innerHTML = '🔊 Speaking... (Click to stop)';
  } else {
    btn.classList.remove('speaking');
    btn.innerHTML = '🎙️ Read Step Aloud';
  }
}

document.addEventListener('speech:start', updateSpeechButtonState);
document.addEventListener('speech:end', updateSpeechButtonState);

/* -----------------------------------------
   Shopping / Grocery List Drawer
----------------------------------------- */
function initShoppingList() {
  const openBtn = document.getElementById('open-shopping-list-btn');
  const closeBtn = document.getElementById('close-shopping-drawer-btn');
  const backdrop = document.getElementById('shopping-drawer-backdrop');

  if (openBtn) openBtn.addEventListener('click', openShoppingDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeShoppingDrawer);
  if (backdrop) backdrop.addEventListener('click', closeShoppingDrawer);

  updateShoppingListBadge();
}

function openShoppingDrawer() {
  KitchenAudio.playClick();
  const drawer = document.getElementById('shopping-drawer');
  const backdrop = document.getElementById('shopping-drawer-backdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    renderShoppingListItems();
  }
}
window.openShoppingDrawer = openShoppingDrawer;

function closeShoppingDrawer() {
  KitchenAudio.playClick();
  const drawer = document.getElementById('shopping-drawer');
  const backdrop = document.getElementById('shopping-drawer-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }
}
window.closeShoppingDrawer = closeShoppingDrawer;

function addAllIngredientsToShoppingList() {
  if (!AppState.activeRecipe) return;
  KitchenAudio.playChime();
  const r = AppState.activeRecipe;
  const scale = AppState.activeServings / r.servings;
  const isImperial = AppState.unitSystem === 'imperial';

  let addedCount = 0;
  r.ingredients.forEach(ing => {
    let amountStr = '';
    if (isImperial && ing.imperialAmount) {
      amountStr = `${formatScaledNumber(ing.imperialAmount * scale)} ${ing.imperialUnit}`;
    } else {
      amountStr = `${formatScaledNumber(ing.amount * scale)} ${ing.unit}`;
    }

    const item = {
      id: `${r.id}-${ing.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      recipeTitle: r.title,
      name: ing.name,
      amount: amountStr,
      category: ing.category,
      checked: false
    };

    // Avoid duplicate item for the same recipe
    const exists = AppState.shoppingList.some(i => i.id === item.id);
    if (!exists) {
      AppState.shoppingList.push(item);
      addedCount++;
    }
  });

  saveShoppingList();
  Toast.show(`Added ${addedCount} ingredient${addedCount === 1 ? '' : 's'} to grocery list! 🛒`, 'success');
  openShoppingDrawer();
}
window.addAllIngredientsToShoppingList = addAllIngredientsToShoppingList;

function renderShoppingListItems() {
  const container = document.getElementById('shopping-list-items');
  if (!container) return;

  if (AppState.shoppingList.length === 0) {
    container.innerHTML = `
      <div class="empty-shopping-state">
        <div class="empty-cart-icon">🛒</div>
        <h4>Your Shopping List is Empty</h4>
        <p>Open any recipe and click "Add Ingredients to Shopping List" to automatically generate your pantry checklist.</p>
      </div>
    `;
    return;
  }

  // Group by recipe
  const grouped = {};
  AppState.shoppingList.forEach(item => {
    if (!grouped[item.recipeTitle]) grouped[item.recipeTitle] = [];
    grouped[item.recipeTitle].push(item);
  });

  container.innerHTML = Object.entries(grouped).map(([recipeTitle, items]) => `
    <div class="shopping-recipe-group">
      <h5 class="shopping-group-title">${recipeTitle}</h5>
      <ul class="shopping-group-items">
        ${items.map(it => `
          <li class="shopping-item-row ${it.checked ? 'item-checked' : ''}">
            <label class="shopping-check-label">
              <input type="checkbox" ${it.checked ? 'checked' : ''} onchange="toggleShoppingItem('${it.id}')">
              <span class="custom-checkmark"></span>
              <span class="shopping-item-name"><strong>${it.amount}</strong> ${it.name}</span>
            </label>
            <button class="delete-shopping-item-btn" onclick="removeShoppingItem('${it.id}')" title="Delete">✕</button>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

function toggleShoppingItem(id) {
  const item = AppState.shoppingList.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    KitchenAudio.playClick();
    saveShoppingList();
    renderShoppingListItems();
  }
}
window.toggleShoppingItem = toggleShoppingItem;

function removeShoppingItem(id) {
  KitchenAudio.playClick();
  AppState.shoppingList = AppState.shoppingList.filter(i => i.id !== id);
  saveShoppingList();
  renderShoppingListItems();
}
window.removeShoppingItem = removeShoppingItem;

function clearShoppingList() {
  if (AppState.shoppingList.length === 0) return;
  KitchenAudio.playClick();
  AppState.shoppingList = [];
  saveShoppingList();
  renderShoppingListItems();
  Toast.show('Grocery list cleared', 'info');
}
window.clearShoppingList = clearShoppingList;

function copyShoppingList() {
  if (AppState.shoppingList.length === 0) {
    Toast.show('No items in grocery list to copy');
    return;
  }
  KitchenAudio.playChime();

  let text = '🛒 SAVORIA CULINARY GROCERY LIST:\n\n';
  const grouped = {};
  AppState.shoppingList.forEach(item => {
    if (!grouped[item.recipeTitle]) grouped[item.recipeTitle] = [];
    grouped[item.recipeTitle].push(item);
  });

  for (const [title, items] of Object.entries(grouped)) {
    text += `[${title}]\n`;
    items.forEach(it => {
      text += `  ${it.checked ? '✓' : '•'} ${it.amount} - ${it.name}\n`;
    });
    text += '\n';
  }

  navigator.clipboard.writeText(text).then(() => {
    Toast.show('Grocery list copied to clipboard! 📋', 'success');
  }).catch(() => {
    Toast.show('Unable to copy automatically');
  });
}
window.copyShoppingList = copyShoppingList;

function saveShoppingList() {
  localStorage.setItem('savoria_shopping_list', JSON.stringify(AppState.shoppingList));
  updateShoppingListBadge();
}

function updateShoppingListBadge() {
  const badge = document.getElementById('shopping-badge-count');
  if (badge) {
    badge.textContent = AppState.shoppingList.length;
  }
}
