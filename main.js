Vue.filter('substring', function(string, value) {
	return string.substring(value, string.length);
});

var app = new Vue({
	el: '#app',
	data: {
		title: null,
		description: null,
		version: null,
		date: null,
		authors: [],
		objects: [],
		json: null,
        preservation: null,
        sharing: null,
        documentation: null,
        budget: null,
        budgetJustification: null,
        overview: []
	},
	created: function() {
		var self = this;
		d3.json("dmp.json", function(data) {
			self.json = data;
			self.title = data["dcterms:titleFollow"];
			self.description = data["dcterms:description"];
			self.version = data["dcterms:hasVersion"];
			self.date = data["dc:date"];
			var authors = data["dc:creator"];
			for (var a of authors) {
                var email = a["foaf:mbox"];
				self.authors.push({
					name: a["foaf:name"],
					email: email,
					emailDisplay: email.substring(email.indexOf(":") + 1, email.length),
					orcid: a["@id"]
				});
			}

            var bundle = data["dmp:hasDataObject"][0];
            var id = bundle["@id"];
            var license = bundle["dmp:hasIntelectualPropertyRights"]["dcterms:license"];
            var metadata = bundle["dmp:hasMetadata"]["premis:hasObjectCharacteristics"];
            var format = metadata["premis:hasFormat"];
            var sha = metadata["premis:fixity"]["premis:messageDigest"];
            var repository = bundle["dmp:hasDataRepository"];

            self.overview.push({
                name: "ID",
                value: '<a href=' + id + '>' + id + '</a>'
            });
            self.overview.push({
                name: "Repository",
                value: '<a href=' + repository + '>' + repository + '</a>'
            });
            self.overview.push({
                name: "License",
                value: '<a href=' + license + '>' + license + '</a>'
            });
            self.overview.push({
                name: "Format",
                value: format
            });
            self.overview.push({
                name: "SHA-256",
                value: sha
            });

            self.preservation = bundle["dmp:hasPreservation"];
            self.sharing = bundle["dmp:hasDataSharing"];
            self.documentation = bundle["dmp:hasDocumentation"];
            self.budget = bundle["dmp:hasBudget"];
            self.budgetJustification = bundle["hasBudgetJustification"];
			for (var obj of bundle["dmp:hasDataObject"]) {
                var github = obj["@github"];
                var id = obj["@id"];
                var hostname = extractHostname(id);
				self.objects.push({
					type: obj["@type"] != "dmp:File" ? obj["@type"] : obj["dmp:hasMetadata"]["premis:hasObjectCharacteristics"]["premis:hasFormat"],
                    name: obj["dc:title"],
                    github: github !== undefined ? "<a href='" + github + "' target='_blank'>Source</a> (Github)" : null,
                    id: id !== undefined ? "<a href='" + id + "'>Source</a> (" + hostname + ")" : null,
					json: JSON.stringify(obj, null, ' ').trim()
				});
                console.log(JSON.stringify(obj, null, ' '))
			}
		});
	},
	methods: {
		classObject: function(obj) {
            if (obj.type === 'dmp:Container') {
                return 'icon devicon-docker-plain colored';
            }
            if (obj.type === 'premis:Format:json') {
                return 'icon devicon-javascript-plain';
            }
            if (obj.type === 'premis:Format:ipynb') {
                return 'icon devicon-python-plain colored';
            }
		}
	}
});

function extractHostname(url) {
    if (url === undefined) {
        return null;
    }
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
