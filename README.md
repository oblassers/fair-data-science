# FAIR Data Science
## Data Management
For the experiment described below a Data Management Plan was created, please visit [fair-data-science][3] to find out more about it.

## Experiment 
As a proof of concept an experiment analyzing the time series [dataset][1] about the duration of divorced marriages from 1985 to 2014 in the region of Salzburg Land was created. The number of divorced marriages that held between 10-15 years are plotted. The experiment consists of the following three steps:
* Connect to mongoDB
* Fetch and transform data
* Plot result

### Prerequisites
Installation of [Docker][2]

### How to run the experiment?
1. Call `docker-compose up` in your console - Jupyter and mongoDB will be started/initialized with the dataset
2. A link http://localhost:8888/?token=xxxx will show up in your console. Copy it into your browser's address bar.
3. Upload the notebook file `Task-3-Experiment.ipynb` into Jupyter.
4. Open it to examine the experiment

[1]: https://www.data.gv.at/katalog/dataset/7fa00c8b-6189-42b8-af93-cc1ebff0a818
[2]: https://www.docker.com/
[3]: https://oblassers.github.io/fair-data-science/