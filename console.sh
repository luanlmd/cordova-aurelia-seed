#!/bin/bash

function build
{
    export ANDROID_HOME=/home/luan/Android/Sdk
    export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platforms-tools
    export JAVA_HOME=/usr/lib/jvm/java-8-openjdk

    mv www/node_modules /tmp

    cordova build android

    mv /tmp/node_modules ./www
}

function watch
{
   cd www
   gulp watch
   cd ..
}

$1
