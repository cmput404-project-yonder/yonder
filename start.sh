#!/bin/bash

start_dir=$PWD;

# Kill previous processes still running
pkill -f yonder

# Backend
## Activate venv
[ ! -d venv ] && python3 -m venv venv
source venv/bin/activate
## Install backend requirements
pip3 install -r requirements.txt
## Start backend
cd backend
python3 manage.py migrate
python3 -d manage.py runserver &

# Frontend
## Start frontend
yarn start
