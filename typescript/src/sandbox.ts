"use strict";
function sum(array: number[]): number {
  return array.reduce((a, b) => a + b);
}
console.log(sum([1, 2, 3, 4, 5, 6, 7, 8, 9]));

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

class Person {
  constructor(name: string, age: number, gender: Gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  name: string;
  age: number;
  gender: Gender;

  introduce() {
    return `Hi, my name is ${this.name}, I'm ${this.age}, my gender is ${this.gender}`;
  }
}
