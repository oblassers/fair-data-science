FROM mongo

COPY divorce.json /divorce.json
CMD mongoimport --host=mongodb --db dp --collection divorce --drop --file /divorce.json
