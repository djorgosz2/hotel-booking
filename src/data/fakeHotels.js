"use strict";
/*
import { rand, seed } from '@ngneat/falso';
import { randSuperhero } from '@ngneat/falso';
import { IsISO8601, IsNumber, IsString, Min } from 'class-validator';
seed('some-constant-seed');
*/
exports.__esModule = true;
var fs_1 = require("fs");
var fakeHotels = fs_1["default"].readFile('./hotels.json', function (err, data) { return data; });
console.log(fakeHotels);
//export default
// Always returns 2
//rand([1, 2, 3, 4, 5]);
// Reset random seed
//seed();
