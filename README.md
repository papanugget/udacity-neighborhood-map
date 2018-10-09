This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Udacity Neighborhood Map - Final Project - Front End Developer Nanodegree

 This project uses the [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) to render an interactive map.  It also uses [MyJSON](http://myjson.com/) as a third party API to store my small database of public restrooms.

## Table of Contents

- [Instructions](#instructions)
- [Technology](#technology)

## Instructions

You can check out the [live version here!](https://papanugget.github.io/udacity-neighborhood-map/)

 1. Clone the git repo
  `git clone https://github.com/papanugget/udacity-neighborhood-map.git`
 2.  Change to the directory of the project, install `npm`, dependencies, and run application
  `npm install`
  `npm start`
 3. The `npm start` command will automatically run the application in a browser if it doesn't please open browser window and navigate to :
   `http://localhost:3000`

## Technology

This project used `create-react-app` for scaffolding.  I used a couple prebuilt react components:
- material-ui
- material-ui / drawer for the slide out sidebar

I opted *not* to use Google maps for my API as I wanted my map to be fully functional without the "For Development Purposes Only" overlay after one API call.  Mapbox is just as robust.  I also used Imgur for image hosting.  