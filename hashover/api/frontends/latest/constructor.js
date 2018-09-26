// @licstart  The following is the entire license notice for the
//  JavaScript code in this page.
//
// Copyright (C) 2018 Jacob Barkdull
// This file is part of HashOver.
//
// HashOver is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// HashOver is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with HashOver.  If not, see <http://www.gnu.org/licenses/>.
//
// @licend  The above is the entire license notice for the
//  JavaScript code in this page.

"use strict";

// Latest comments API frontend constructor (constructor.js)
function HashOverLatest (options)
{
	// Reference to this HashOver object
	var hashover = this;

	// Initial backend queries
	var queries = [];

	// Check if options is an object
	if (options && options.constructor === Object) {
		// If so, add thread to queries if present
		if (options.thread !== undefined) {
			queries.push ('thread=' + encodeURIComponent (options.thread));
		}
	}

	// Backend request path
	var requestPath = HashOverLatest.backendPath + '/latest-ajax.php';

	// Handle backend request
	this.ajax ('POST', requestPath, queries, function (json) {
		// Handle error messages
		if (json.message !== undefined) {
			hashover.displayError (json, 'hashover-widget');
			return;
		}

		// Locales from HashOver backend
		HashOverLatest.prototype.locale = json.locale;

		// Setup information from HashOver back-end
		HashOverLatest.prototype.setup = json.setup;

		// Initial UI HTML
		HashOverLatest.prototype.ui = {};

		// Templatify UI HTML from backend
		for (var name in json.ui) {
			// Check if property wasn't inherited
			if (json.ui.hasOwnProperty (name) === true) {
				// If so, templatify current string
				var template = hashover.strings.templatify (json.ui[name]);

				// And store the template
				HashOverLatest.prototype.ui[name] = template;
			}
		}

		// Thread information from HashOver back-end
		hashover.instance = json.instance;

		// Backend execution time and memory usage statistics
		hashover.statistics = json.statistics;

		// Initiate HashOver latest comments
		hashover.init ();
	}, true);
};

// Constructor to add shared methods to (constructor.js)
var HashOverConstructor = HashOverLatest;
