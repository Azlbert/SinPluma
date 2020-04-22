FROM    node:12.16.2-slim
LABEL   maintainer="Alberto Duran"

WORKDIR /usr/src/app
ENV     PORT=80

COPY    package.json    .
COPY    yarn.lock       .

RUN     yarn

COPY    ./public /usr/src/app/public
COPY    ./src    /usr/src/app/src

EXPOSE  80

CMD     yarn start