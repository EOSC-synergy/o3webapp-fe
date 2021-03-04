

# base image for node
FROM node:15.10.0-alpine3.10

ARG branch=master


RUN apk add git
# RUN apt-get -y update
# RUN apt-get -y install --no-install-recommends git && \
#     apt-get autoremove -y && \
#     apt-get clean -y


#Create workdir
WORKDIR /srv

RUN git clone --depth 1 -b $branch https://git.scc.kit.edu/synergy.o3as/o3webapp-fe.git && \
    cd o3webapp-fe && \
    npm install

WORKDIR /srv/o3webapp-fe/o3webapp-fe



#expose reacts default port
EXPOSE 3000

#CMD [ "npm", "run", "start" ]
