# FOUNDATIONS session 5

## Homework

1. Create a small screen version of the page using media queries and a new breakpoint for smaller screens (540px). Pay attention to the header in portrait mode. Try re-implementing the basil image as a branding element.

## Reading

* [SASS for Web Designers](https://abookapart.com/products/sass-for-web-designers) - finish reading

## Node Package Manager

[Node](https://nodejs.org/en/)

[Node Package Manager](https://www.npmjs.com) 

```
$ cd <PATH> // copy and paste the folder you want to go to
$ ls 
$ls -al  // flags expand the command
$ pwd
```

NB - Tab completion, `..` and copy paste.

Last class we ran:

```
$ cd <session-5> // or copy and paste the folder you want to go to
$ npm init
$ npm install browser-sync --save
```

to create package.json and install [Browser Sync](https://www.browsersync.io)  into the node_modules folder. 

We created two scripts"

```
  "scripts": {
    "start": "browser-sync start --browser \"google chrome\" --server 'app' --files 'app'",
    "startUp": "browser-sync start --browser \"google chrome\" --server 'definition-list' --files 'definition-list'"
  },
```

Which can be run from the terminal using:

```
$ npm run start
```

or: 

```
$ npm run startUp
```

Depending on the task.

[Documentation](https://browsersync.io/docs) for Browser Sync commands.

Note the --save, that created an entry in package.json.

Demo `npm install` 


## Definition List

### JS Review

Popover div:

```
<div class="popover">
    <img src="img/1-lg.jpg" />
</div>
```

Styles:

```
.popover {
    position: absolute;
    top: 30%;
    display: none;
}
.showme {
    display: block;
}
```

Select one of the links:

```
var linkedImage = document.querySelector('a')
console.log(linkedImage)
```

Edit to select ALL of the links:

```
var linkedImages = document.querySelectorAll('a')
console.log(linkedImages)
```

use `.forEach` to attach an event listener to each link:

```
var linkedImages = document.querySelectorAll('a')
var imageLinks = [...linkedImages]
imageLinks.forEach( imageLink => imageLink.addEventListener('click', run))

function run() {
event.preventDefault();
}
```

Now we need to create a reference to the popover:

```
var popover = document.querySelector('.popover')
var popoverImage = popover.querySelector('.popover img')
```

Note the second line where we use popover.querySelector instead of document.querySelector.

Change the src attribute for the popoverImage _and_ toggle the showme class on the popover:

```
function run() {
    popoverImage.setAttribute('src', this.href)
    popover.classList.toggle('showme')
    event.preventDefault();
}
```

Here is the entire JavaScript:

```
var popover = document.querySelector('.popover')
var popoverImage = popover.querySelector('.popover img')

var linkedImages = document.querySelectorAll('a')
var imageLinks = [...linkedImages]
imageLinks.forEach( imageLink => imageLink.addEventListener('click', run))

function run() {
    popoverImage.setAttribute('src', this.href)
    popover.classList.toggle('showme')
    event.preventDefault();
}
```


## Basilica

`$ npm run start`

Examine code with regards to the [recipe schema](https://schema.org/Recipe) at [schema.org](http://schema.org/docs/gs.html). 

Here is an [example on the food network](http://www.foodnetwork.com/recipes/food-network-kitchens/basil-pesto-recipe2.html) page that uses the recipe schema.

Note the `<abbr>` tag and the absence of a wrapper div (even though the design shows a centered document).


![Image of Basilica](FINAL.png)


```css
* { 
    margin:0; 
    padding:0; 
}
body { 
   font: 100%/1.5 "Lucida Grande", "Lucida Sans Unicode", Verdana, sans-serif; 
   color : #333;
   max-width: 840px;
   margin: 0 auto;
   margin-top: 24px;
} 
article, aside {
    float: left;
    width : 50%;
    padding : 16px;
}
```

Note the use of max-width on the body selector. We applied it to a div in the past.

```css
img {
    width: 100%;
    height: auto;
}
```

Note the use of margin on the body element. 

Add `box-sizing: border-box;` to the article / aside rule.

Move it to the universal selector  so it applies to everything.

Note the footer. Because both columns have been floated it can wrap.

```css
footer {
    clear: both;
    background-color: #88a308;
    padding: 1rem;
    border-radius: 0 0 4px 4px;
}
```

### Faux columns

Since the two columns can be of different heights and our design calls for two columns of a different color we can not color the aside and article divs. We'll use a very old technique for the moment and change it later.

```css
.content { 
  background : url(img/html.png) repeat-y 50% 50%;
}
```
Note that we cannot see the background image. The content div has collapsed because its direct children have been floated. We have looked at a number of methods that can be used to prevent collapsing. E.g.:

```css
.content { 
  background : url(img/html.png) repeat-y 50% 50%;
  float: left;
}
```

Here we will use the clear fix method. 

### ::Pseudo-elements vs :Pseudo-classes

```
::first-letter      :hover
::first-line        :visited
::before            :link
::after             :active
::selection         :target
                    :focus
```

Some [ideas](https://css-tricks.com/pseudo-element-roundup/) for using pseudo-elements.

e.g.: Selected text:

```
::selection { 
    background:#88A308; 
    color:#fff; 
    text-shadow: none; 
}
```

### Clearfix

_Disable the float:left rule on the content._

```
.content:after { 
    content:"boo"; 
    display:block; 
    clear:both; 
}
```

```
.content:after { 
    content:"."; 
    display:block; 
    height:0; 
    clear:both; 
    visibility:hidden; 
}
```

The method uses `:after` to insert a character after the div and then sets it to `display: block` and `clear: both` to prevent collapsing and then hides it.

Since box collapsing is rather common designers frequently create a generic class for use elsewhere.

Update the method to something shorter and more modern and apply the cf classname to the content div:

```css
.cf:before, .cf:after {
    content: " ";
    display: table;
}

.cf:after {
    clear: both;
}
```

Examine the html in the inspector. Look for `::before` and `::after`. We'll return to the :before and :after pseudo-classes later.

## Mobile Layout

1. stack the article and aside on top of each other in small screen and remove the background image:

```css
.content { 
  /*background : url(img/html.png) repeat-y 50% 50%;*/
}

article, aside {
    box-sizing: border-box;
    padding: 1rem;
}
```

2. add back the features necessary for two column display on wide screens:

```css
@media only screen and (min-width: 768px) {
    .content {
        background: url('img/html.png') repeat-y 50% 50%;
    }
    article {
        float: left;
        width: 50%;
    }
    aside {
        float: left;
        width: 50%;
    }
}
```

## Flex columns

Refactor the article and aside columns, this time to use flexbox. (Applies only to widescreen view.)

Remove the float property, change the column widths, remove the background image and add column effect via css:

```css
@media only screen and (min-width: 768px) {
    /* ... */
    .content {
        display: flex;
    }
    article {
        flex: 1 0 60%;
    }
    aside {
        background: #F5FAEF;
        box-shadow: -4px 0px 4px #ddd;
    }
    
}
```

NB: Since we are not using floats we no longer need to use clearfix for the content div or clear: both for the footer.

### Format Content

```css
h2, h3 {
    color: #88a308;
    margin: 8px 0;
    font-size: 1.4rem;
    letter-spacing: -1px;
}

a {
    color: #f90;
    text-decoration: none;
    transition: color 0.5s linear;
}
li > h4 {
    margin-top: 12px;
}
aside li {
    list-style: none;
}
article li, article ol {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
}
```

### Animate Links

```css
.content a:hover {
    color: #88a308;
    transition-property: color;
    transition-duration: 1s;
    transition-timing-function: linear;
}
```

or `transition: color 0.2s linear;`


## The Branding Header

Add the green background to the branding div.

```css
header {
    position: relative;
    height: 120px;
    background: #88a308;
    border-radius: 8px 8px 0px 0px;
}
```

Add absolute positioning and create a viewable area for the image on the `<h1>`. (Note: we can get the image dimensions via the inspector.) 

`@import url(futura/stylesheet.css);`

```
header h1 {
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif; 
    font-weight: normal;
    color:#fff;
    font-size: 5rem;
}
```

Note: image is 272px by 170px.

```
header h1 { 
    padding-left: 260px;
    padding-top: 90px;
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif; 
    font-weight: normal;
    color:#fff;
    font-size: 5rem;
}
```

Use transform:

```
header h1 {
    transform: translateX(-100px);
    transform: translateY(-100px);
    padding-left: 260px;
    padding-top: 90px;
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif; 
    font-weight: normal;
    color:#fff;
    font-size: 5rem;
}
```

Note the transform in the inspector - doesn't work this way.

Use:

`transform: translate(-100px, -80px);`

An alternative:

```css
header h1 {
    transform: translateY(-80px) translateX(-100px);
    ...
}
```

Note the beta link:

```html
<header>
    <h1>Basilica!</h1>
    <a class="beta" href="#">Beta</a>
</header>
```

Absolutely position the beta element. 

```css
header a.beta {
    background: url('img/burst.svg') no-repeat;
    color: #fff;
    font-size: 1.5rem;
    position: absolute;
    top: -20px;
    right: 10px;
    width: 85px;
    height: 85px;
    line-height: 85px;
    text-align: center;
    text-transform: uppercase;
}
```

Note the use of svg for the background image.

Add a transform and animate:

```css
header a.beta {
    ...
    transform: rotate(20deg);
    transition: all 1s ease;
}
```

```css
header a.beta:hover {
    transform: rotate(0deg) scale(1.2);
}
```

### Header Branding Responsive Design

Small screen:

```css
header h1 {
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif;
    font-weight: normal;
    color: #fff;
    font-size: 5rem;
    background-position: -20px -20px;
}
```

Large screen:

```css
@media only screen and (min-width: 768px) {
    header h1 {
        padding-left: 240px;
        padding-top: 90px; 
        transform: translate(-100px, -80px); 
        background-position: top left;
    }
}
```

### Navigation Flexbox

Basic [usage](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

```css
nav {
    background: #e4e1d1;
    border-top: 0.5rem solid #ebbd4e;
    padding: 0.5rem;
    display: flex;
    align-items: center;
}

nav ul {
    display: flex;
}

nav li {
    list-style: none;
    margin-right: 0.5rem;
}

nav p {
    margin-right: auto;
}

```

### Button and Gradients

```css
nav a {
    text-align: center;
    font-size: 1.5rem;
    padding: 8px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
```

```css
.nav-storeit a {
    background: linear-gradient(to bottom, #dfa910 0%, #fcde41 100%);
    border-radius: 6px;
}

.nav-storeit a:hover {
    background: linear-gradient(to bottom, #fcde41 1%, #dfa910 100%);
}

.nav-pickit a {
    background: linear-gradient(to bottom, #abc841 0%, #6b861e 100%);
    border-radius: 6px;
}

.nav-pickit a:hover {
    background: linear-gradient(to bottom, #6b861e 1%, #abc841 100%);
}

.nav-cookit a {
    background: linear-gradient(to bottom, #6f89c7 0%, #344e8b 100%);
    border-radius: 6px;
}

.nav-cookit a:hover {
    background: linear-gradient(to bottom, #344e8b 1%, #6f89c7 100%);
}
```

## JavaScript Beta Window

Build the window:

```html
<div class="betainfo">
    <p>Information about the beta program.<p>
</div>
```

```css
.betainfo {
    width: 200px;
    height: 100px;
    padding: 1rem;
    background: #fff;
    border: 2px solid #EABC5A;
    border-radius: 0.25rem;
    position: absolute;
    z-index: 2000;
    top: 100px;
    left: 50%;
    // could also use a negative margin
}

.emphasis {
    color: red;
}
```

Then try this to center the box:

`left:calc(50% - 100px);`



### Another Close Method

Add html to the betainfo:

```html
<div class="betainfo">
    <p>Information about the beta program.<p>
    <a class="closer" href="#0">X</a>
</div>
```

Style it:

```css
.closer {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 1.5rem;
    height: 1.5rem;
    background: #fff;
    border: 2px solid #EABC5A;
    border-radius: 50%;
    text-align: center;
    line-height: 1.5rem;
    font-weight: bold;
}
```


## NOTES

Tap Highlight Color






















