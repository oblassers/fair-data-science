FROM jupyter/scipy-notebook

# install a package into the python2 environment
RUN pip2 install pymongo
