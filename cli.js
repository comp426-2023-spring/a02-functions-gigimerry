#!/usr/bin/env node

import fetch from "node-fetch";
import moment from "moment-timezone";
import minimist from "minimist";

var args = minimist(process.argv.slice(2));