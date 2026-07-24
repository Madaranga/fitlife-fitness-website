(function () {

  var allPlans = [];
  var grid = document.getElementById('plansGrid');
  var resultsCount = document.getElementById('resultsCount');

  if (!grid) return; /* Only run on plans.html */

  /* Load & parse the XML */
  fetch('data/plans.xml')
    .then(function (response) {
      if (!response.ok) throw new Error('Could not load plans.xml');
      return response.text();
    })
    .then(function (xmlText) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlText, 'application/xml');

      var parserError = xmlDoc.querySelector('parsererror');
      if (parserError) throw new Error('plans.xml is not well-formed XML');

      var planNodes = xmlDoc.getElementsByTagName('plan');
      for (var i = 0; i < planNodes.length; i++) {
        allPlans.push(readPlanNode(planNodes[i]));
      }

      applyFiltersFromURL();
      applyFilters();
      bindFilterEvents();
    })
    .catch(function (err) {
      grid.innerHTML = '<p class="plan-empty">Sorry, the fitness plan data could not be loaded (' + err.message + '). If you opened this file directly in the browser, please serve the project through a local server so the XML file can be fetched.</p>';
      console.error(err);
    });

  function readPlanNode(node) {
    return {
      name: getText(node, 'name'),
      category: getText(node, 'category'),
      categoryLabel: getText(node, 'categoryLabel'),
      duration: getText(node, 'duration'),
      difficulty: getText(node, 'difficulty'),
      goal: getText(node, 'goal')
    };
  }

  function getText(node, tag) {
    var el = node.getElementsByTagName(tag)[0];
    return el ? el.textContent : '';
  }

  /*  Render plan cards  */
  function renderPlans(plans) {
    if (!plans.length) {
      grid.innerHTML = '<p class="plan-empty">No fitness plans match the selected filters. Try clearing a filter.</p>';
      resultsCount.textContent = '0';
      return;
    }

    resultsCount.textContent = plans.length;

    grid.innerHTML = plans.map(function (plan) {
      return (
        '<article class="plan-card">' +
          '<div>' +
            '<div class="plan-card-top">' +
              '<span class="plan-badge">' + plan.categoryLabel + '</span>' +
              '<span class="plan-duration">' + plan.duration + '</span>' +
            '</div>' +
            '<h3>' + plan.name + '</h3>' +
            '<div class="plan-meta">' +
              '<div><span>Difficulty:</span><span>' + plan.difficulty + '</span></div>' +
              '<div><span>Goal:</span><span>' + plan.goal + '</span></div>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="btn btn-primary btn-block plan-view-btn" data-plan="' + plan.name + '">View Details</button>' +
        '</article>'
      );
    }).join('');
  }

  /* Filtering logic */
  function getActiveFilters() {
    var categoryChecks = document.querySelectorAll('.js-category:checked');
    var categories = Array.prototype.map.call(categoryChecks, function (c) { return c.value; });

    var difficultyRadio = document.querySelector('.js-difficulty:checked');
    var difficulty = difficultyRadio ? difficultyRadio.value : 'all';

    var durationSelect = document.getElementById('durationFilter');
    var duration = durationSelect ? durationSelect.value : 'any';

    return { categories: categories, difficulty: difficulty, duration: duration };
  }

  function applyFilters() {
    var filters = getActiveFilters();

    var filtered = allPlans.filter(function (plan) {
      var categoryMatch = filters.categories.length === 0 || filters.categories.indexOf(plan.category) !== -1;
      var difficultyMatch = filters.difficulty === 'all' || plan.difficulty === filters.difficulty;
      var durationMatch = filters.duration === 'any' || plan.duration === filters.duration;
      return categoryMatch && difficultyMatch && durationMatch;
    });

    renderPlans(filtered);
  }

  function bindFilterEvents() {
    document.querySelectorAll('.js-category, .js-difficulty').forEach(function (input) {
      input.addEventListener('change', applyFilters);
    });

    var durationSelect = document.getElementById('durationFilter');
    if (durationSelect) durationSelect.addEventListener('change', applyFilters);

    var clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        document.querySelectorAll('.js-category').forEach(function (c) { c.checked = true; });
        var allLevels = document.getElementById('difficultyAll');
        if (allLevels) allLevels.checked = true;
        if (durationSelect) durationSelect.value = 'any';
        applyFilters();
      });
    }
  }

  /* Pre-select a category filter when arriving from a homepage link,
     e.g. plans.html?category=cardio */
  function applyFiltersFromURL() {
    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    if (!category) return;

    document.querySelectorAll('.js-category').forEach(function (checkbox) {
      checkbox.checked = (checkbox.value === category);
    });
  }

})();
