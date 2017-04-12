#FOUNDATIONS session 5

## Homework

1. Create a small screen version of the page using media queries and a new breakpoint for smaller screens (540px). Pay attention to the header in portrait mode. Try re-implementing the basil image as a branding element.

## Reading

* [SASS for Web Designers](https://abookapart.com/products/sass-for-web-designers) - finish reading

## Terminal Basics

```
$ cd <PATH> // copy and paste the folder you want to go to
$ ls 
$ls -al  // flags expand the command
$ pwd
```

Look at tab completion, `..` and copy paste.

```
$ cd <definition-list>
$ python -m SimpleHTTPServer 9001
```

Go to http://localhost:9001 in your browser

Examine the Terminal to see activity.

Multiple Terminal tabs. ctrl-c to stop the Python server.

## Node Package Manager

Warning - this is going to seem like a lot but this system is an essential part of web design. 

Download and install [Node](https://nodejs.org/en/)

NPM - [Node Package Manager](https://www.npmjs.com) - not unlike Package Control for Sublime text but much more powerful.

```
$ cd <session-4> // or copy and paste the folder you want to go to
$ npm init
$ npm install browser-sync --save
```

Note package.json and node_modules folder

[Browser Sync](https://www.browsersync.io) 

```
  "scripts": {
    "start": "browser-sync start --server 'app' --files 'app'"
  },
```

```
$ npm run start
```

Review browser Sync @ 3001

[Documentation](https://browsersync.io/docs)
[Github Repo](https://github.com/BrowserSync/browser-sync)

Demo `npm install` on `dev` branch

```
  "scripts": {
    "start": "browser-sync start --browser \"google chrome\" --server 'app' --files 'app'",
    "startUp": "browser-sync start --browser \"google chrome\" --server 'definition-list' --files 'definition-list'"
  },
```

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

Examine code with regards to the [recipe schema](https://schema.org/Recipe) at [schema.org](http://schema.org/docs/gs.html). Here is an [example on the food network](http://www.foodnetwork.com/recipes/food-network-kitchens/basil-pesto-recipe2.html) page that uses the recipe schema.

Note the `<abbr>` tag and the absence of a wrapper div (even though the design shows a centered document). The document contains 2 script tags. Examine the page in the browser's dev tools. Note the console message and the classes applied to the html tag.


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

Note the use of margin on the body element. 

Add `box-sizing: border-box;` to the article / aside rule.

Note the footer. Because both columns have been floated it can wrap.

```css
footer {
    clear: both;
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

[Ideas](https://css-tricks.com/pseudo-element-roundup/) for using pseudo-elements.

e.g.: Selected text:

```
::selection { 
    background:#88A308; 
    color:#fff; 
    text-shadow: none; 
}
```

Print out (with media query)

```
@media print {
  a[href]:after {
    content: " (" attr(href) ") ";
  }
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

Since box collapsing is rather common let's create a generic class that we can use elsewhere.

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

```css
header h1 { 
    position: absolute; 
    top: -80px; 
    left:-100px;
    z-index: 90;
    padding-left: 260px;
    padding-top: 90px;
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif; 
    font-weight: normal;
    color:#fff;
    font-size: 5rem;
}
```

The absolute positioning technique is complex, let's use an alternative:

```css
header h1 {
    transform: translateY(-80px) translateX(-100px);
    ...
}
```

Note:

```html
<header>
    <h1>Basilica!</h1>
    <a class="beta" href="#">Beta</a>
</header>
```

Note the current position of the beta link. We could collapse the `<h1>` with a float:

```css
header h1 {
    ...
    float: left;
}
```

This allows the beta to situate itself but has unwanted effects on the other elements of the page.

But given our design if might be better to absolutely position the beta element. 

```css
header a.beta {
    background: url("img/beta.png") no-repeat;
    color: #fff;
    font-size: 1.5rem;
    position: absolute; 
    z-index: 300;
    top: -20px;
    right: 10px;
    width: 85px;
    height: 85px;
    line-height: 85px;
    text-align: center;
    text-transform: uppercase;
}
```

Whew!

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


## Mobile First Approach

Analysis in the device view indicates a horizontal scroll due to a combination of settings. Comment out the offenders:

```css
header h1 {
    /*transform: translateY(-80px) translateX(-100px);
	padding-left: 260px;
	padding-top: 90px;
	background: url(img/basil.png) no-repeat;
	font-family: FuturaStdLight, sans-serif; 
	font-weight: normal;
	color:#fff;
	font-size: 5rem;*/
}
```


```css
/*article, aside {
    box-sizing: border-box;
    width: 50%;
    float: left;
    padding: 1rem;
}*/
```
Implement a mobile first strategy

1. stack the article and aside on top of each other in small screen:

```css
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

### Header Branding Responsive Design

Small screen:

```css

header {
    ...
    height: 80px;
}

header h1 {
    transform: translateY(10px) translateX(30px);
    font-family: FuturaStdLight, sans-serif;
    font-weight: normal;
    color: #fff;
    font-size: 3rem;
}

```

Large screen:

```css
@media only screen and (min-width: 768px) {

	...

	header {
        height: 120px;
    }

    header h1 {
        transform: translateY(-80px) translateX(-100px);
        padding-left: 260px;
        padding-top: 90px;
        background: url(img/basil.png) no-repeat;
        font-size: 5rem;
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

Animate Links

```css
.content a:hover {
    color: #88a308;
    transition-property: color;
    transition-duration: 1s;
    transition-timing-function: linear;
}
```
or `transition: color 0.2s linear;`

## Flex columns

Refactor the article and aside columns to use flexbox. (Applies only to widescreen view.)

Remove the float property and add flex:

```css
@media only screen and (min-width: 768px) {
    ...
    .content {
    background: url('img/html.png') repeat-y 50% 50%;
    display: flex;
	}
	
	article {}
	
	aside {}
    
    /* ... */
}
```

Change the column widths, remove the background image and add coloring css:

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
## Add an Image to the layout

The image is located in the app/img directory.

```html
<img src="img/pesto.jpg" />
```
Make sure it fits into the containing element:

```css
img {
    width: 100%;
    height: auto;
}
```

## Use SVG for the Burst Graphic

```
background: url('img/burst.svg') no-repeat;
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
    z-index: 20000;
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

Let's load jQuery:

`<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>`

Try this in the head first then before the closing of the page:

```html
<script>
	jQuery('.betainfo p').addClass('emphasis');
</script>
```
Short form:

```html
<script>
	$('.betainfo p').addClass('emphasis');
</script>
```

Examine the html in the inspector.

Note: this version would work in the header:

```js
<script>
$(document).ready(function() {
	$('.betainfo p').addClass('emphasis');
});
</script>
```

All of jQuery's methods are documented at [http://api.jquery.com](http://api.jquery.com)

Adding a click event requires a function:

```js
<script>
	$('.betainfo p').click( 
		function() {
			alert('test');
		}
	);
</script>
```

You can send messages to the inspector's console:

```js
<script>
	$('.betainfo p').click(
		function() {
			console.log('test');
		}
	);s
</script>
```

Let's use the `this` keyword to target the thing that was clicked on. We use toggleClass to add and remove the class:

```js
<script>
	$('.betainfo p').click( 
		function() {
			$(this).toggleClass('emphasis');
		}
	);
</script>
```

Add `display: none;` to the `.betainfo` css rule:

```js
<script>
	$('header a').click( 
		function() {
			$('.betainfo').toggle();
		}
	);
</script>
```

Change to fadeToggle and note the animation running in the inspector:

```js
<script>
	$('header a').click( 
		function() {
			$('.betainfo').fadeToggle();
		}
	);
</script>
```

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

Add a selector to the script:

```js
<script>
$('header a, .betainfo a').click( 
	function() {
		$('.betainfo').fadeToggle();
	}
);
</script>
```

### Fade the Background

See [this article](http://tympanus.net/codrops/2013/11/07/css-overlay-techniques/) for additional techniques.

Create a new div in the html:

`<div class="overlay"></div>`

```
.overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
}
```
Add the overlay to the [fadeToggle](http://api.jquery.com/fadeToggle/):

```js
<script>
$('header a, .betainfo a').click( 
	function() {
		$('.betainfo, .overlay').fadeToggle();
	}
);
</script>
```

Add the overlay to the click target:

```js
<script>
$('header a, .betainfo a, .overlay').click( 
	function() {
		$('.betainfo, .overlay').fadeToggle();
	}
);
</script>
```
Prevent the href from working:

```js
$('header a, .betainfo a, .overlay').click( 
	function() {
		$('.betainfo, .overlay').fadeToggle();
		return false;
	}
);
```
Note the overlay issue.

or
```
$('header a, .betainfo a, .overlay').click( 
	function(event) {
		$('.betainfo, .overlay').fadeToggle();
		event.preventDefault();
	}
);
```
Use css animations
```
$('header a, .betainfo a, .overlay').click( 
	function(event) {
		// $('.betainfo, .overlay').fadeToggle();
		$('.betainfo, .overlay').toggleClass('animate');
		event.preventDefault();
	});
```

```
.betainfo.animate,
.overlay.animate {
    opacity: 1;
    transition: opacity 1s linear;
}
```
```
.betainfo {
    /*display: none;*/
    opacity: 0;
    transition: opacity 1s linear;
```

```
.overlay {
    /*display: none;*/
    opacity: 0;
```




## NOTES


### CSS Starburst

```
<body>
<div class="rect-container">
<div class="rect copy">Beta!</div>
<div class="rect one"> </div>
<div class="rect two"> </div>
<div class="rect three"> </div>
</div>
</body>
```
add styles

```
<style>
.copy {
    color: #fff;
    z-index: 999;
    font-size: 90px;
    text-align: center;
    line-height: 200px;
}
.rect-container {
    width: 200px;
    height: 200px;
    position: relative;
    top: 100px;
    left: 100px;
    -webkit-transform: scale(.4) rotate(15deg);
    cursor: pointer;
    -webkit-transition: all 0.2s linear;
}
.rect-container:hover { -webkit-transform: scale(.5) rotate(0deg) }
.rect {
    width: 200px;
    height: 200px;
    background: #f90;
    -webkit-transform: rotate(0deg);
    position: absolute;
    top: 0;
    left: 0;
}
.two { -webkit-transform: rotate(30deg) }
.three { -webkit-transform: rotate(60deg) }

</style>



###Tap Highlight Color






















