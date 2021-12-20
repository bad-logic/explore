FROM python:3.8-slim-buster

# set your working directory
WORKDIR /usr/app

# Install poetry
# not a recommended approach to install 
# use curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
RUN pip install poetry==1.1.7

# poetry comes with built in virtual environment which contradicts the sole purpose of using the docker
# so disabling them
RUN poetry config virtualenvs.create false

# copy pyproject.toml and poetry.lock files
COPY ["pyproject.toml","poetry.lock","./"]

# install dependencies
RUN poetry install

# create src directory inside workdir /usr/app
RUN mkdir /usr/app/src

# copy source code
COPY ./src ./src

# docker entry command
CMD ["python","src/server.py"]