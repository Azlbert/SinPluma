FROM python:3.7.3
LABEL maintainer="Alberto Duran"

ENV INSTALL_PATH /flask
ENV REQUIEREMENTS requirements.txt
WORKDIR ${INSTALL_PATH}

COPY requirements.txt ${REQUIEREMENTS}
RUN pip install -r ${REQUIEREMENTS}

COPY . .
RUN rm ${REQUIEREMENTS}

EXPOSE 80

CMD gunicorn -b 0.0.0.0:80 wsgi:app