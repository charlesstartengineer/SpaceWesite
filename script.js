/* Space Explorer — file 11 of 11
 * Production-ready vanilla JavaScript. Progressive enhancement only:
 * no external dependencies, remote scripts, secrets, or authentication claims.
 */
(function () {
  'use strict';

  var root = document;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (selector, scope) { return (scope || root).querySelector(selector); };
  var $$ = function (selector, scope) { return Array.prototype.slice.call((scope || root).querySelectorAll(selector)); };
  var text = function (value) { return String(value == null ? '' : value); };
  var safeStorage = {
    get: function (key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } },
    set: function (key, value) { try { window.localStorage.setItem(key, value); } catch (e) {} },
    remove: function (key) { try { window.localStorage.removeItem(key); } catch (e) {} }
  };
  var escapeHTML = function (value) { return text(value).replace(/[&<>'"]/g, function (character) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]; }); };
  var page = (document.body && document.body.dataset.page) || (location.pathname.split('/').pop() || 'index.html').replace(/\.html?$/i, '') || 'home';
  if (page === 'space-explorer') page = 'home';

  var planets = [
    { id: 'mercury', name: 'Mercury', type: 'rocky', tagline: 'The swift, cratered world.', diameter: '4,879 km', day: '59 Earth days', year: '88 Earth days', gravity: 0.38, description: 'Mercury is the smallest planet and the closest to the Sun.' },
    { id: 'venus', name: 'Venus', type: 'rocky', tagline: 'A cloud-covered furnace.', diameter: '12,104 km', day: '243 Earth days', year: '225 Earth days', gravity: 0.91, description: 'Venus has a thick carbon-dioxide atmosphere and the hottest planetary surface.' },
    { id: 'earth', name: 'Earth', type: 'rocky', tagline: 'Our changing home world.', diameter: '12,742 km', day: '24 hours', year: '365 days', gravity: 1, description: 'Earth is the only known world with abundant surface liquid water and life.' },
    { id: 'mars', name: 'Mars', type: 'rocky', tagline: 'The red planet.', diameter: '6,779 km', day: '24.6 hours', year: '687 days', gravity: 0.38, description: 'Mars is a cold desert world marked by iron-rich dust, volcanoes, and ancient channels.' },
    { id: 'jupiter', name: 'Jupiter', type: 'giant', tagline: 'The largest planet.', diameter: '139,820 km', day: '9.9 hours', year: '11.86 years', gravity: 2.53, description: 'Jupiter is a gas giant with powerful storms, including the Great Red Spot.' },
    { id: 'saturn', name: 'Saturn', type: 'giant', tagline: 'The ringed giant.', diameter: '116,460 km', day: '10.7 hours', year: '29.45 years', gravity: 1.07, description: 'Saturn’s bright rings are made mostly of ice and rocky particles.' },
    { id: 'uranus', name: 'Uranus', type: 'giant', tagline: 'An ice giant on its side.', diameter: '50,724 km', day: '17.2 hours', year: '84 years', gravity: 0.89, description: 'Uranus rotates with an extreme tilt, giving it unusual seasons.' },
    { id: 'neptune', name: 'Neptune', type: 'giant', tagline: 'A windy blue world.', diameter: '49,244 km', day: '16.1 hours', year: '164.8 years', gravity: 1.14, description: 'Neptune is the farthest major planet and has some of the fastest winds measured.' }
  ];
  var facts = [
    { tag: 'LIGHT', title: 'Sunlight takes time to arrive.', body: 'Light from the Sun takes about eight minutes to reach Earth.', source: 'NASA Science' },
    { tag: 'MARS', title: 'Mars has two tiny moons.', body: 'Phobos and Deimos are irregularly shaped moons orbiting the Red Planet.', source: 'NASA Solar System Exploration' },
    { tag: 'MOON', title: 'The Moon is tidally locked.', body: 'The same lunar hemisphere generally faces Earth because the Moon rotates once each time it orbits Earth.', source: 'NASA Science' },
    { tag: 'STARS', title: 'Stars are born in clouds.', body: 'Dense regions inside vast clouds of gas and dust can collapse to form new stars.', source: 'ESA educational resources' },
    { tag: 'EARTH', title: 'Earth is an active planet.', body: 'Plate tectonics continually reshapes Earth’s surface and recycles material into the interior.', source: 'NASA Science' },
    { tag: 'JUPITER', title: 'Jupiter has a short day.', body: 'Jupiter completes one rotation in roughly ten hours, despite being the largest planet.', source: 'NASA Solar System Exploration' },
    { tag: 'DISTANCE', title: 'A light-year measures distance.', body: 'A light-year is the distance light travels in one year, not a unit of time.', source: 'NASA Science' },
    { tag: 'RINGS', title: 'Many worlds have rings.', body: 'Ring systems are known around the giant planets, although Saturn’s are the most prominent.', source: 'NASA Solar System Exploration' }
  ];

  function injectSharedShell() {
    var headerHost = $('#site-header');
    var footerHost = $('#site-footer');
    if (headerHost && !$('.site-header', headerHost)) {
      headerHost.innerHTML = '<header class="site-header"><nav class="navbar container" aria-label="Primary navigation"><a class="logo" href="./index.html"><span aria-hidden="true">✦</span> SPACE EXPLORER</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation menu"><span></span><span></span><span></span></button><div class="nav-panel" id="primary-menu"><ul class="nav-links"><li><a data-page="home" href="./index.html">Home</a></li><li><a data-page="planets" href="./planets.html">Planets</a></li><li><a data-page="facts" href="./facts.html">Facts</a></li><li><a data-page="tools" href="./tools.html">Tools</a></li><li><a data-page="stars" href="./stars.html">Stars</a></li><li><a data-page="quiz" href="./quiz.html">Quiz</a></li><li><a data-page="missions" href="./missions.html">Missions</a></li><li><a data-page="contact" href="./contact.html">Contact</a></li></ul><section class="account-panel" aria-label="Account controls"><p class="eyebrow">ACCOUNT // MISSION ACCESS</p><p class="account-state" id="account-state" aria-live="polite">Local session fallback: signed out</p><p class="account-email" id="account-email"></p><div class="account-actions"><a class="button button-secondary" id="sign-in-link" href="./account.html">Sign in / create account</a><button class="button button-secondary" id="logout-button" type="button" hidden>Log out</button></div><button class="button button-secondary" id="theme-toggle" type="button" aria-pressed="false">Toggle theme</button></section></div></nav></header>';
    }
    if (footerHost && !$('.footer', footerHost)) footerHost.innerHTML = '<footer class="footer"><div class="container footer-inner"><a class="logo" href="./index.html"><span aria-hidden="true">✦</span> SPACE EXPLORER</a><p>Keep looking up.</p><p>© 2026 Space Explorer</p></div></footer>';
  }

  function setActiveNavigation() {
    var current = page === 'index' ? 'home' : page;
    $$('[data-page]').forEach(function (link) {
      var active = link.dataset.page === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
  }

  function initMenu() {
    var toggle = $('.menu-toggle');
    var panel = $('.nav-panel');
    if (!toggle || !panel) return;
    var close = function () { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation menu'); panel.classList.remove('active'); };
    toggle.addEventListener('click', function () { var open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu'); panel.classList.toggle('active', open); });
    $$('.nav-panel a').forEach(function (link) { link.addEventListener('click', close); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') { close(); toggle.focus(); } });
  }

  function initTheme() {
    var controls = $$('#theme-toggle, [data-theme-toggle]');
    if (!controls.length) return;
    var saved = safeStorage.get('space-explorer-theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    var apply = function (value) { theme = value === 'dark' ? 'dark' : 'light'; document.documentElement.dataset.theme = theme; controls.forEach(function (control) { control.setAttribute('aria-pressed', String(theme === 'dark')); control.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme'); control.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme'; }); safeStorage.set('space-explorer-theme', theme); };
    apply(theme);
    controls.forEach(function (control) { control.addEventListener('click', function () { apply(theme === 'dark' ? 'light' : 'dark'); }); });
  }

  function initAccountFallback() {
    var stored = safeStorage.get('space-explorer-local-email');
    var state = $('#account-state'); var email = $('#account-email'); var display = $('#account-display-email'); var signIn = $('#sign-in-link'); var logouts = $$('#logout-button');
    var render = function () { var signed = Boolean(stored); if (state) state.textContent = signed ? 'Local demo session active' : 'Local session fallback: signed out'; if (email) email.textContent = signed ? stored : ''; if (display) display.textContent = signed ? stored : 'Not signed in'; if (signIn) signIn.hidden = signed; logouts.forEach(function (button) { button.hidden = !signed; }); };
    render();
    logouts.forEach(function (button) { button.addEventListener('click', function () { stored = null; safeStorage.remove('space-explorer-local-email'); render(); }); });
    var form = $('#account-form'); if (!form) return;
    var mode = 'signin'; var modeToggle = $('#auth-mode-toggle'); var submit = $('#auth-submit'); var message = $('#auth-message'); var password = $('#auth-password');
    var updateMode = function () { var create = mode === 'create'; if (submit) submit.textContent = create ? 'Create locally' : 'Sign in locally'; if (modeToggle) { modeToggle.textContent = create ? 'Use sign in mode' : 'Create an account'; modeToggle.setAttribute('aria-pressed', String(create)); } if (password) password.setAttribute('autocomplete', create ? 'new-password' : 'current-password'); };
    if (modeToggle) modeToggle.addEventListener('click', function () { mode = mode === 'signin' ? 'create' : 'signin'; updateMode(); });
    form.addEventListener('submit', function (event) { event.preventDefault(); var emailInput = $('#auth-email'); var value = emailInput && emailInput.value.trim(); if (!value || !emailInput.checkValidity() || !password || password.value.length < 8) { if (message) message.textContent = 'Enter a valid email and a password with at least 8 characters.'; if (emailInput && !emailInput.checkValidity()) emailInput.focus(); return; } stored = value; safeStorage.set('space-explorer-local-email', value); render(); if (message) message.textContent = 'Local demo session saved on this device. No server authentication or password storage was used.'; form.reset(); });
    updateMode();
  }

  function initContact() {
    var form = $('#contact-form'); if (!form) return; var status = $('#contact-status');
    form.addEventListener('submit', function (event) { event.preventDefault(); var fields = [$('#contact-name'), $('#contact-email'), $('#contact-topic'), $('#contact-message')]; var invalid = fields.find(function (field) { return !field || !field.value.trim() || !field.checkValidity(); }); if (invalid) { if (status) status.textContent = 'Please complete each required field with a valid value.'; invalid.focus(); return; } if (status) { status.textContent = 'Your message is ready for review, but it was not sent. This static site has no form backend connected.'; status.focus(); } });
  }

  function initFacts() {
    var grid = $('#fact-grid'); if (!grid) return; var search = $('#fact-search'); var count = $('#fact-count'); var daily = $('#daily-fact'); var random = $('#random-fact');
    var render = function (query) { var needle = (query || '').toLowerCase().trim(); var list = facts.filter(function (fact) { return !needle || (fact.tag + ' ' + fact.title + ' ' + fact.body).toLowerCase().indexOf(needle) !== -1; }); grid.innerHTML = list.map(function (fact) { return '<article class="feature-card"><p class="eyebrow">' + escapeHTML(fact.tag) + '</p><h3>' + escapeHTML(fact.title) + '</h3><p>' + escapeHTML(fact.body) + '</p><p class="muted">' + escapeHTML(fact.source) + '</p></article>'; }).join('') || '<p class="fallback-note">No matching facts found. Try another search.</p>'; if (count) count.textContent = list.length + ' fact' + (list.length === 1 ? '' : 's'); };
    render(''); if (search) search.addEventListener('input', function () { render(search.value); });
    var showRandom = function () { var fact = facts[Math.floor(Math.random() * facts.length)]; if (daily) daily.textContent = fact.title + ' ' + fact.body; }; showRandom(); if (random) random.addEventListener('click', showRandom);
  }

  function initPlanets() {
    var grid = $('#planet-grid'); if (!grid) return; var search = $('#planet-search'); var detail = $('#planet-detail'); var filter = 'all'; var favorites = JSON.parse(safeStorage.get('space-explorer-favorites') || '[]');
    var render = function () { var needle = search ? search.value.toLowerCase().trim() : ''; var list = planets.filter(function (p) { return (filter === 'all' || p.type === filter) && (!needle || (p.name + ' ' + p.tagline).toLowerCase().indexOf(needle) !== -1); }); grid.innerHTML = list.map(function (p) { var fav = favorites.indexOf(p.id) !== -1; return '<article class="feature-card planet-card"><button class="favorite" type="button" data-favorite="' + p.id + '" aria-label="' + (fav ? 'Remove ' : 'Add ') + p.name + ' ' + (fav ? 'from' : 'to') + ' favorites" aria-pressed="' + fav + '">' + (fav ? '★' : '☆') + '</button><button class="planet-select" type="button" data-planet="' + p.id + '"><p class="eyebrow">' + escapeHTML(p.type.toUpperCase()) + '</p><h3>' + escapeHTML(p.name) + '</h3><p>' + escapeHTML(p.tagline) + '</p></button></article>'; }).join('') || '<p class="fallback-note">No planets match that search.</p>'; };
    grid.addEventListener('click', function (event) { var favorite = event.target.closest('[data-favorite]'); var select = event.target.closest('[data-planet]'); if (favorite) { var id = favorite.dataset.favorite; favorites = favorites.indexOf(id) === -1 ? favorites.concat(id) : favorites.filter(function (item) { return item !== id; }); safeStorage.set('space-explorer-favorites', JSON.stringify(favorites)); render(); } if (select && detail) { var planet = planets.find(function (p) { return p.id === select.dataset.planet; }); if (!planet) return; detail.innerHTML = '<p class="eyebrow">PLANET PROFILE</p><h2>' + escapeHTML(planet.name) + '</h2><p>' + escapeHTML(planet.description) + '</p><dl><div><dt>Diameter</dt><dd>' + planet.diameter + '</dd></div><div><dt>Day</dt><dd>' + planet.day + '</dd></div><div><dt>Year</dt><dd>' + planet.year + '</dd></div><div><dt>Gravity</dt><dd>' + planet.gravity.toFixed(2) + ' g</dd></div></dl>'; detail.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' }); } });
    $$('.chip[data-planet-filter]').forEach(function (button) { button.addEventListener('click', function () { filter = button.dataset.planetFilter; $$('.chip[data-planet-filter]').forEach(function (item) { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); }); render(); }); }); if (search) search.addEventListener('input', render); render();
  }

  function initTools() {
    var a = $('#compare-a'); var b = $('#compare-b'); var output = $('#comparison-output'); var scale = $('#scale-slider'); var scaleOutput = $('#scale-output'); var model = $('#scale-model'); var weight = $('#weight-input'); var weightOutput = $('#weight-output'); if (!a && !scale && !weight) return;
    var compare = function () { if (!a || !b || !output) return; var first = planets.find(function (p) { return p.id === a.value; }); var second = planets.find(function (p) { return p.id === b.value; }); if (!first || !second) return; var card = function (p) { return '<div class="comparison-card"><h3>' + p.name + '</h3><p>' + p.tagline + '</p><dl><dt>Diameter</dt><dd>' + p.diameter + '</dd><dt>Day</dt><dd>' + p.day + '</dd><dt>Year</dt><dd>' + p.year + '</dd><dt>Gravity</dt><dd>' + p.gravity.toFixed(2) + ' g</dd></dl></div>'; }; output.innerHTML = card(first) + card(second) + '<p class="comparison-explanation">' + first.name + ' has ' + (first.gravity > second.gravity ? 'stronger' : first.gravity < second.gravity ? 'weaker' : 'similar') + ' surface gravity than ' + second.name + '.</p>'; }; [a, b].forEach(function (select) { if (select) select.addEventListener('change', compare); }); compare();
    if (scale) { var updateScale = function () { if (scaleOutput) scaleOutput.textContent = scale.value; if (model) model.style.setProperty('--model-width', scale.value + 'px'); }; scale.addEventListener('input', updateScale); updateScale(); }
    if (weight && weightOutput) { var updateWeight = function () { var value = Math.min(1000, Math.max(1, Number(weight.value) || 0)); var mars = planets.find(function (p) { return p.id === 'mars'; }); weightOutput.textContent = 'On Mars, you would feel about ' + Math.round(value * mars.gravity) + ' lb.'; }; weight.addEventListener('input', updateWeight); updateWeight(); }
  }

  function initStars() {
    var info = $('#constellation-info'); var map = $('#star-map'); var data = { orion: ['Orion', 'The Hunter is easy to recognize because of the three bright stars in Orion’s Belt.', 'Three evenly spaced belt stars with bright stars above and below.', 'Orion’s Belt and the Orion Nebula, a star-forming region in the sword.'], 'ursa-major': ['Ursa Major', 'The Great Bear contains the Big Dipper, a familiar seven-star pattern.', 'A bowl and handle shape formed by seven notable stars.', 'The two bowl stars at the end point toward Polaris, the North Star.'], cassiopeia: ['Cassiopeia', 'Cassiopeia is often recognized by its distinctive W or M shape.', 'Five bright stars making a zigzag pattern.', 'Its appearance changes with the season and its orientation in the sky.'], lyra: ['Lyra', 'Lyra is a small constellation marked by Vega.', 'A small parallelogram near one of the brightest stars in the night sky.', 'Vega forms part of the Summer Triangle.'] }; if (!info) return; $$('.chip[data-constellation]').forEach(function (button) { button.addEventListener('click', function () { var item = data[button.dataset.constellation]; if (!item) return; $$('.chip[data-constellation]').forEach(function (other) { other.classList.toggle('active', other === button); other.setAttribute('aria-pressed', String(other === button)); }); info.innerHTML = '<p class="eyebrow">CURRENT GUIDE</p><h3 id="constellation-info-title">' + item[0] + '</h3><p class="info-summary">' + item[1] + '</p><dl><div><dt>Look for</dt><dd>' + item[2] + '</dd></div><div><dt>Known for</dt><dd>' + item[3] + '</dd></div><div><dt>Remember</dt><dd>Constellations are apparent patterns seen from Earth; their stars can be very far apart in space.</dd></div></dl>'; if (map) map.setAttribute('aria-label', 'Simplified educational star map showing ' + item[0]); }); });
  }

  function initQuiz() {
    var card = $('#quiz-card'); var next = $('#quiz-next'); var restart = $('#quiz-restart'); var result = $('#quiz-result'); if (!card || !next) return; var questions = [{ q: 'Which planet is known as the Red Planet?', answers: ['Mars', 'Venus', 'Jupiter', 'Mercury'], correct: 'Mars', explanation: 'Mars appears reddish because iron minerals in its surface have oxidized, or rusted.' }, { q: 'What is the largest planet in our solar system?', answers: ['Earth', 'Saturn', 'Jupiter', 'Neptune'], correct: 'Jupiter', explanation: 'Jupiter is the largest planet in our solar system.' }, { q: 'What galaxy contains our solar system?', answers: ['Andromeda', 'The Milky Way', 'Whirlpool', 'Sombrero'], correct: 'The Milky Way', explanation: 'Our solar system is in the Milky Way galaxy.' }, { q: 'What force keeps planets in orbit around the Sun?', answers: ['Magnetism', 'Friction', 'Gravity', 'Pressure'], correct: 'Gravity', explanation: 'Gravity provides the attraction that keeps planets in orbit.' }, { q: 'What is a light-year a measure of?', answers: ['Time', 'Brightness', 'Mass', 'Distance'], correct: 'Distance', explanation: 'A light-year measures the distance light travels in one year.' }]; var index = 0; var score = 0; var answered = false; var render = function () { var item = questions[index]; card.innerHTML = '<p class="eyebrow">QUESTION ' + (index + 1) + '</p><h3>' + item.q + '</h3><fieldset><legend class="sr-only">Choose an answer</legend>' + item.answers.map(function (answer) { return '<label><input type="radio" name="quiz-answer" value="' + escapeHTML(answer) + '"> ' + escapeHTML(answer) + '</label>'; }).join('') + '</fieldset><details class="quiz-explanation"><summary>Explanation</summary><p>' + item.explanation + '</p></details>'; var progress = $('#quiz-progress'); var meter = $('#quiz-progress-meter'); var scoreEl = $('#quiz-score'); if (progress) progress.textContent = 'Question ' + (index + 1) + ' of ' + questions.length; if (meter) meter.value = index + 1; if (scoreEl) scoreEl.textContent = 'Score ' + score; next.textContent = index === questions.length - 1 ? 'Finish quiz' : 'Next question →'; answered = false; card.focus(); }; next.addEventListener('click', function () { var selected = $('input[name="quiz-answer"]:checked', card); if (!selected) { var feedback = $('.quiz-explanation', card); if (feedback) feedback.open = true; return; } if (!answered) { if (selected.value === questions[index].correct) score += 1; answered = true; } if (index < questions.length - 1) { index += 1; render(); } else { card.hidden = true; next.hidden = true; if (result) { result.hidden = false; result.innerHTML = '<h2 id="result-title">Mission result</h2><p>You scored ' + score + ' out of ' + questions.length + '. Keep exploring—every question is a launch point.</p><button id="quiz-restart" class="button button-secondary" type="button">Restart quiz</button>'; $('#quiz-restart', result).addEventListener('click', reset); } } }); var reset = function () { index = 0; score = 0; card.hidden = false; next.hidden = false; if (result) result.hidden = true; render(); }; if (restart) restart.addEventListener('click', reset); render();
  }

  function initMissions() { $$('.mission-card[data-mission-date]').forEach(function (card) { var output = $('.mission-countdown', card); if (!output) return; var target = Date.parse(card.dataset.missionDate); var update = function () { var difference = target - Date.now(); if (difference <= 0) { output.textContent = 'Fictional window reached'; return; } var days = Math.floor(difference / 86400000); var hours = Math.floor(difference / 3600000) % 24; var minutes = Math.floor(difference / 60000) % 60; output.textContent = 'Fictional countdown: ' + days + 'd ' + hours + 'h ' + minutes + 'm'; }; update(); window.setInterval(update, 60000); }); }

  function initSmoothAnchors() { $$('a[href^="#"]').forEach(function (link) { link.addEventListener('click', function (event) { var target = $(link.getAttribute('href')); if (!target) return; event.preventDefault(); target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }); }); }

  function start() { try { injectSharedShell(); setActiveNavigation(); initMenu(); initTheme(); initAccountFallback(); initContact(); initFacts(); initPlanets(); initTools(); initStars(); initQuiz(); initMissions(); initSmoothAnchors(); } catch (error) { if (window.console && console.warn) console.warn('Space Explorer enhancement skipped safely:', error); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
}());
