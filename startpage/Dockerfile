FROM nginx:alpine
RUN apk add --update git && apk add --update openssh
RUN git clone https://github.com/mightypanders/dotfiles.git 
WORKDIR /dotfiles/startpage
COPY . /usr/share/nginx/html
