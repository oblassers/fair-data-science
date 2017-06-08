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
        overview: []
	},
	created: function() {
		var self = this;
		d3.json("dmp.json", function(data) {
			self.json = data;
			self.title = data["dcterms:title"];
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


            self.overview.push({
                name: "ID",
                value: '<a href=' + id + '>' + id + '</a>'
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
            self.preservation = data["dmp:hasDataObject"][0]["dmp:hasPreservation"];
            self.sharing = data["dmp:hasDataObject"][0]["dmp:hasDataSharing"];
            self.documentation = data["dmp:hasDataObject"][0]["dmp:hasDocumentation"];
			for (var obj of data["dmp:hasDataObject"][0]["dmp:hasDataObject"]) {
				self.objects.push({
					type: obj["@type"] != "dmp:File" ? obj["@type"] : obj["dmp:hasMetadata"]["premis:hasObjectCharacteristics"]["premis:hasFormat"],
                    name: obj["name"],
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
