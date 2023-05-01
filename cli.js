#!/usr/bin/env node

import fetch from "node-fetch";
import moment from "moment-timezone";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));


if (args.h) {
	console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`);
	process.exit(0);
}
 let timezone;
 let latitude;
 let longitude;

 if (args.z) {
    timezone = args.z;
 }
 else {
    timezone = moment.tz.guess();
 }



if (args.e && args.w) {
    console.log("Please only enter ONE longitude! East OR West!")
}

if (args.e) {
    longitude = args.e;
} else if (args.w) {
    longitude = -args.w;
} else {
    console.log("Longitude must be in range!")
}



if (args.n && args.s) {
    console.log("Please only enter ONE latitude! North OR South!")
}

if (args.n) {
    latitude = args.n;
} else if (args.s) {
    latitude = -args.n;
} else {
    console.log("Latitude must be in range!")
}


const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" 
                                + latitude + "&longitude=" 
                                + longitude + "&timezone=" 
                                + timezone + "&daily=precipitation_hours");
const data = await response.json();
console.log(data);
const days = args.d;
const rain = data.daily.precipitation_hours;

