#!/usr/bin/env bash

# This file executes each time a new vagrant machine is setup. Used to setup app python dependencies
pip install Flask
pip install twilio
export SWEETBOARD_SETTINGS=/sweet-board-src/secrets.py
python /sweet-board-src/index.py