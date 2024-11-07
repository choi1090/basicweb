/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// form fields\r\nconst form = document.querySelector('.form-data');\r\nconst region = document.querySelector('.region-name');\r\nconst apiKey = document.querySelector('.api-key');\r\n\r\n// results\r\nconst errors = document.querySelector('.errors');\r\nconst loading = document.querySelector('.loading');\r\nconst results = document.querySelector('.result-container');\r\nconst usage = document.querySelector('.carbon-usage');\r\nconst fossilfuel = document.querySelector('.fossil-fuel');\r\nconst myregion = document.querySelector('.my-region');\r\nconst clearBtn = document.querySelector('.clear-btn');\r\n\r\n\n\n//# sourceURL=webpack://carbon-trigger-extension/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;


function init() {
  const storedApiKey = localStorage.getItem('apiKey');
  const storedRegion = localStorage.getItem('regionName');
  //set icon to be generic green
  //todo
  if (storedApiKey === null || storedRegion === null) {
      form.style.display = 'block';
      results.style.display = 'none';
      loading.style.display = 'none';
      clearBtn.style.display = 'none';
      errors.textContent = '';
  } else {
      displayCarbonUsage(storedApiKey, storedRegion);
      results.style.display = 'none';
      form.style.display = 'none';
      clearBtn.style.display = 'block';
  }
};

form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));
init();

function reset(e) {
  e.preventDefault();
  localStorage.removeItem('regionName');
  init();
}

function handleSubmit(e) {
  e.preventDefault();
  setUpUser(apiKey.value, region.value);
}

function setUpUser(apiKey, regionName) {
  localStorage.setItem('apiKey', apiKey);
  localStorage.setItem('regionName', regionName);
  loading.style.display = 'block';
  errors.textContent = '';
  clearBtn.style.display = 'block';
  displayCarbonUsage(apiKey, regionName);
}