/**
* Add an orcid image linked to the authors' and editors' ORCID ID-s (when applicable)
*
* The trigger is an additional "orcid" key in the person's object in the respec config. The "w3cid" key is necessary and used as
* unique identification of the person.
*
* @param {object} - respec’s configuration object, expanded from the document’s `respecConfig` structure by respec.
*/
function show_orcid(config) {
	let orcidmaps = {
	};

	//--------------------------------------------------------------------------------
	// 1st step: find the authors/editors who have set their ORCID number as part of the persons' structure
	// This can be extracted from the configuration set by the user
	let personKeys = ["editors", "authors"];
	personKeys.forEach( key => {
		if( config[key] ) {
			config[key].forEach( (editor) => {
				if(editor.orcid && editor.w3cid) {
					orcidmaps[editor.w3cid] = editor.orcid
				}
			});					
		}
	});

	//---------------------------------------------------------------------------------
	// 2nd step: find the persons in the header, see if their id is listed in `orcidmap `and, if yes
	// add the additional image reference.
	//
	// 
	// Persons are in a <dd> element with the class set to `p-author`. 
	// The `w3cid` value is stored as an `data-editor-id` attribute value (if present)
	document.querySelectorAll("dd.p-author").forEach( (element) => {
		// Look at the data-editor-id value to see if it is relevant.
		if( element.dataset.editorId ) {
			// Get the possible ordicId from the orcid mapping
			orcidId = orcidmaps[element.dataset.editorId]
			if(orcidId) {
				// Bingo; add a span with the image linked to the orcid web site
				let span = document.createElement('span');
				let a    = document.createElement('a');
				let img  = document.createElement('img');

				img.setAttribute('src','https://orcid.org/sites/default/files/images/orcid_16x16.gif');
				img.setAttribute('alt','orcid logo');

				a.setAttribute('href', `https://orcid.org/${orcidId}`);
				a.appendChild(img);

				span.setAttribute('class', 'orcid');
				span.appendChild(a);

				element.innerHTML += " "; 
				element.appendChild(span);
			}
		}
	});
}