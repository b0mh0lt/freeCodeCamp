/*
Fill in the object constructor with the following methods below:
getFirstName(), getLastName(), getFullName(), setFirstName(first), setLastName(last), setFullName(firstAndLast)
Run the tests to see the expected output for each method.
The methods that take an argument must accept only one argument and it has to be a string.
These methods must be the only available means of interacting with the object.
*/

var Person = function(firstAndLast) {
  this.getFirstName = function() {
    return firstAndLast.split(' ')[0];
  };
  this.getLastName = function() {
    return firstAndLast.split(' ')[1];
  };
  this.getFullName = function() {
    return firstAndLast;
  };
  this.setFirstName = function(name) {
    firstAndLast = name + ' ' + firstAndLast.split(' ')[1];
  };
  this.setLastName = function(name) {
    firstAndLast = firstAndLast.split(' ')[0] + ' ' + name;
  };
  this.setFullName = function(name) {
    firstAndLast = name;
  };
};

var bob = new Person('Bob Ross');

bob.getFullName();
bob.getFirstName();
bob.getLastName();
bob.getFullName();
bob.setFirstName('Haskell');
bob.getFullName();
bob.setLastName('Curry');
bob.getFullName();
bob.setFullName('Haskell Curry');
bob.getFullName();
bob.getFirstName();
bob.getLastName();
