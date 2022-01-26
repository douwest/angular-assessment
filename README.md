# AngularAssessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4, Typescript 4.5.5.
I used Angular Material to reduce some boilerplate for the styling. Furthermore, I wrote unit tests for my code in the master branch,
I chose to display the title of the post as a hover action, to make the square buttons look nice. I retrieve the posts
using the httpclient, and never subscribe to the observable so I do not have to manage that subscription. I did that on
purpose, I want to use the async pipe whenever possible in combination with an Observable so my subscription is managed for me.

I did not complete the RXJS reactive state bonus part completely, I started and got some way there,
but got stuck when trying to retrieve the state from my custom state service. I could update it, and when logging
the correct values came out, but somewhere I missed something that made the data not end up in the component.
It is available under the branch `reactive-state`, if you are curious what I did there.

Thank you for taking the time to review my assessment!

## Installing dependencies

Run `npm install` to install the required dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` or `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Generic questions

# 1. JWT
One reason the provided JWT-token is not secure is that the email-address of the user is available in the token as the subject in plain text. Which poses a privacy
issue if someone gets their hands on the token and decides to decode it, they find sensitive information within it. Of course if someone gets your token
you have another (probably larger) problem as well, but I don't think that's what this question was about. As an identifier within the token, it might be a better idea
to use a unique identifier that does not provide sensitive information, instead of using the email-address.

Another issue I found out when modifying the contents of the token at jwt.io is that I can toggle the admin field to true, and
the signature is verified afterwards. This no good. The initial token has an invalid signature, there is a typo (a 'b' before the signature) in it.

# 2. Security issues when sending messages that contain HTML
1. A malicious user could intercept and modify the contents of the html. We should never trust the user input. They might
   inject malicious code (xss) into the template. This
   can be mitigated by validating and filtering (sanitizing) the request server-side, for which there exist libraries and tools. Although there are a lot of creative ways to tamper with the template
   to get some code to run, via images, iframes, script tags, and more.

2. A malicious user could disguise elements with transparent layers to trick users into clicking html elements that have different behaviours than
   the visible element the user wished to navigate to / use. Adding a Content Security Policy so the browser only trusts scripts from domains you tell it to trust,
   is a way to mitigate this risk. CSP can also be used as a defensive layer for XSS (mentioned in 1) (source: https://owasp.org/www-community/attacks/Clickjacking)

# 3. Differences between mutable and immutable objects
A mutable object is an object of which we can modify the properties. An immutable object makes it impossible to change the contents
of the object after creation. Immutability helps us not to change the original value and contents after declaration.

a. `var a = 7`. This number object is immutable. We can assign a new value to `a`, but we can not change the value of `7`. This goes for all primitive types in javascript, e.g. string.

b.
Advantages:
- Applications with immutable objects are a little less complicated to grasp, as the objects contained within it do not change over time.
- Immutable objects can be re-used.
- The state of the application will be more consistent.
  Disadvantages:
- You may need a new object for every state mutation you want to do, which causes some overhead.
- Writing applications with little mutable state can be a little harder in development.

c. In Javascript/Typescript, there are multiple ways to make an object immutable. We can use either `Object.assign()` from ES6, `Object.freeze()` from ES5, or
the spread operator.
```
//small example using Object.freeze()
const car = {type: 'sedan'};
Object.freeze(car);
car.type = 'truck'; // throws error

console.log(car); // {type: 'sedan'}

//small example using spread operator with pure function:
const other_car = {type: 'hatchback', brand: 'bmw'};

function spreadExample(input){
  return {...input, brand: 'audi'}; // we return a new object with all properties of input except brand, and do not modify the original variable
}

console.log(spreadExample(other_car)); // {type: 'hatchback', brand: 'audi'}
console.log(other_car)); // {type: 'hatchback', brand: 'bmw'}
```


# 4. Performance optimization
There are several ways in which one can improve loading times in an Angular application. I would start by generating a source map
of the application's dependencies, to identify which modules contribute most to the overall bundle size. Doing this provides
insight into the way your bundle size is taken up by different dependencies. After that, we can check if any dependencies use a large
amount of space, and assess whether we need them (tree-shaking). Of some dependencies you might only use a fraction of what is loaded
when a client loads your app. For those dependencies you could opt to implement the needed functionality yourself, or find a dependency
that has a smaller size.

Furthermore, we can split our angular modules such that every module contains only exactly the dependencies it needs (for example,
no large shared module in your app.module.ts). Splitting our modules allows us to select preload-strategies, which allow quick
loading of the components that are initially available in our first view. We can load the modules we need for other components or functionalities
as we go, reducing initial load times.

A cool example of that I ran into last week used a preload strategy that preloaded the dependencies of a component when the user
hovered over a button that would load that component when pressed. I think this is a great mix of UX and technical design, because you
might load something the user does not decide to use, but when they would do, it will be instantly available. If they don't, they probably
won't even notice it. But of course there are many different ways about this problem.

Another consideration is to provide multiple fidelities of the media you wish to show to your end-user. For example, a user
browsing on a mobile device would not need the same quality of an image as a user with a MacBook and Retina screen.

Identifying problems with load times can be tested and analyzed using Chrome DevTools, we can throttle our internet speed there,
and test our web-app on different devices.

# 5. Job workspace priority
It depends on the context of the work, but in general I would choose A. Not because I want a very fast piece of hardware,
but because when working in a team with others, I find it to be useful when we all use similar environments, IDE's etc.

This makes communicating easier within the team when helping each other out. Something can however also be said about using
the software that you are most familiar with.
