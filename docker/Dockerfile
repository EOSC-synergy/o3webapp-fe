# base image for node
# Dockerfile has 2 Arguments: fe_branch, fe_date
# be_branch - user repository branch to clone (default: master)
# be_date - just a current date, to force docker to rebuild from certain layer
#
# To build the image:
# $ docker build -t <dockerhub_user>/<dockerhub_repo> --build-arg arg=value .
# or using default args:
# $ docker build -t <dockerhub_user>/<dockerhub_repo> .

#FROM node:15.10.0-alpine3.10
FROM node:latest

ARG fe_branch=test

#Create workdir
WORKDIR /srv


ARG date
RUN echo ${fe_date} && git clone --depth 1 -b $fe_branch https://git.scc.kit.edu/synergy.o3as/o3webapp-fe.git && \
    cd o3webapp-fe/o3webapp-fe  && \
    npm install --silent

WORKDIR /srv/o3webapp-fe/o3webapp-fe


#expose reacts default port
EXPOSE 3000

CMD [ "npm", "start" ]
