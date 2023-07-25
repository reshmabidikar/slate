#!/usr/bin/env bash

# Check if Gemfile exists (do nothing on gh-pages)
[ -f Gemfile ] && bundle exec middleman build || mkdir build
