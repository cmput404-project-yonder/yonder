#!/bin/bash

start_dir=$PWD;

# Kill previous processes still running
pkill -f yonder

# Backend
## Activate venv
[ ! -d venv ] && python -m venv venv
source venv/bin/activate
## Install backend requirements
cd backend
pip install -r requirements.txt
## Start backend
cd server
python manage.py migrate
python manage.py runserver & 

# Frontend
## Install frontend packages
cd $start_dir/frontend
yarn install
## Start frontend
yarn start
