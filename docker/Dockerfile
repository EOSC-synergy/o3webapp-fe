

# base image for node
#FROM node:15.10.0-alpine3.10
FROM node:latest


ARG branch=moved_branch

#Create workdir
WORKDIR /srv

RUN git clone --depth 1 -b $branch https://git.scc.kit.edu/synergy.o3as/o3webapp-fe.git
RUN cd o3webapp-fe 
RUN npm install --silent
RUN npm install react-scripts@4.0.1 -g --silent

WORKDIR /srv/o3webapp-fe/o3webapp-fe



#expose reacts default port
EXPOSE 3000

CMD [ "npm", "start" ]
