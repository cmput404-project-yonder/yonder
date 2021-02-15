#!/bin/bash

start_dir=$PWD;

# Kill previous processes still running
pkill -f yonder

# Backend
## Activate venv
[ ! -d venv ] && python3 -m venv venv
source venv/bin/activate
## Install backend requirements
cd backend
pip3 install -r requirements.txt
## Start backend
cd server
python3 manage.py migrate
python3 manage.py runserver & 

# Frontend
## Install frontend packages
cd $start_dir/frontend
yarn install
## Start frontend
yarn start
