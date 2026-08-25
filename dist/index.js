/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 307:
/***/ ((module) => {

const jiraKeyMatcher = /^[a-zA-Z0-9]+-[0-9]{1,4}/;

const getJiraKey = (pr) => {
  const match = pr.match(jiraKeyMatcher);
  return match ? match[0] : false;
}

module.exports = {
  getJiraKey
}

/***/ }),

/***/ 781:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const getFetch = async () => {
  if (globalThis.fetch) {
    return globalThis.fetch;
  }

  const nodeFetch = await __nccwpck_require__.e(/* import() */ 816).then(__nccwpck_require__.bind(__nccwpck_require__, 816));
  return nodeFetch.default || nodeFetch;
}

const isValidJiraState = async (pr, statusCategory, jiraUsername, jiraSecret, log) => {
  const fetch = await getFetch();
  const response = await fetch(`https://ovearup.atlassian.net/rest/api/3/issue/${pr}?fields=status`, {
    method: 'GET',
    headers: headers(jiraUsername, jiraSecret),
  })
  const status = await response.status;
  const json = await response.json();

  if(status === 200) {
    const jiraStatusCategory = json.fields.status.statusCategory.name;
    log(`${pr} has status category: ${jiraStatusCategory}`);

    if(jiraStatusCategory === statusCategory) {
      return {
        result: true,
        message: `${pr} has status category: ${jiraStatusCategory}`
      }
    } else {
      return {
        result: false,
        message: `${pr} has status category ${jiraStatusCategory}, expected ${statusCategory}`
      }
    }
  } else {
    log(`Couldn't find Jira ticket: ${pr}`);
    return {
      result: false,
      message: `Could not find Jira ticket ${pr}`
    }
  }
}

const headers = (jiraUsername, jiraSecret) => ({
  'Content-Type': 'application/json',
  'Authorization': `Basic ${Buffer.from(`${jiraUsername}:${jiraSecret}`).toString('base64')}`
})

module.exports = {
  isValidJiraState
}

/***/ }),

/***/ 181:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 573:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 24:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 67:
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ 708:
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ 30:
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ 760:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 946:
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ 75:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ 830:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ 755:
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 975:
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ 522:
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ 167:
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nccwpck_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__nccwpck_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__nccwpck_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 				__nccwpck_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__nccwpck_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			792: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__nccwpck_require__.o(moreModules, moduleId)) {
/******/ 					__nccwpck_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__nccwpck_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__nccwpck_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __nccwpck_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const { isValidJiraState } = __nccwpck_require__(781);
const { getJiraKey } = __nccwpck_require__(307);

const getInput = (name) => {
  const envName = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
  return process.env[envName] || '';
};

async function run() {
  try {
    // Get all of the inputs defined in the actions.yml file
    const pr = getInput('prTitle');
    const jiraSecret = getInput('jiraSecret');
    const jiraUsername = getInput('jiraUsername');
    const statusCategory = getInput('statusCategory') || 'In Progress';
    if (!pr) throw new Error('No PR title provided');
    if (!jiraSecret) throw new Error('No Jira secret provided');

    // Extract the Jira key from the PR title
    const jiraKey = getJiraKey(pr);
    if (!jiraKey) throw new Error(`Name of PR is incorrect format. ${pr}`);

    // Check the Jira ticket status category
    const jiraStateValid = await isValidJiraState(jiraKey, statusCategory, jiraUsername, jiraSecret, console.debug);
    if (!jiraStateValid.result) throw new Error(jiraStateValid.message);
  } catch (error) {
    console.error(error.message || error);
    process.exitCode = 1;
  }
}

run();
module.exports = __webpack_exports__;
/******/ })()
;