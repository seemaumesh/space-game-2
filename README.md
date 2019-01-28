# space-game

This project is built on dotnet core and angular.

## Description

The code tries to find the location of the Princess based on the input provided by the user.
The vhicles, planet and token details are loaded from an external api.
The result of search api is displayed in the Response component.

## Issues

At the moment the ng build seems to work with typescript version >=@2.74 and <@2.8
But the ng test command line works with typescript version @2.8 and higher.
Hence different versions would need to be installed during test and a different version of typescript is used while executing the applications

## Nice to have

Basic version of swagger and log4net is implemented.
Pretty UI
