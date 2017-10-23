# FOUNDATIONS session 5

## Homework

## Reading

* [SASS for Web Designers](https://abookapart.com/products/sass-for-web-designers) - finish reading


## Terminal Basics

* For Windows users - [CMDR](http://cmder.net)

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

NPM is an essential part of the web design and development ecosystem. 

Download and install [Node](https://nodejs.org/en/)

It comes with NPM - [Node Package Manager](https://www.npmjs.com)

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
    "start": "browser-sync start --browser \"google chrome\" --server 'app' --files 'app'"
  },
```


### Non-Terminal Alteratives

There are times when setting up an NPM script seems a bit overkill. There are a [number of apps](https://graygrids.com/best-tools-resources-compile-manage-sass-less-stylus-css-preprocessors/) built on top of NPM and related technolgies which can be used instead. A few of my favorites are Codekit (payware), Koala and Scout (both free). 


## Basilica

`$ npm run start`

Examine code with regards to the [recipe schema](https://schema.org/Recipe) at [schema.org](http://schema.org/docs/gs.html). 

Here is an [example on the food network](http://www.foodnetwork.com/recipes/food-network-kitchens/basil-pesto-recipe2.html) page that uses the recipe schema.

Note the `<abbr>` tag and the absence of a wrapper div (even though the design shows a centered document).


![Image of Basilica](FINAL.png)

Normally you will start off with a few known styleguide items:

```
html {
  --basil-green: #88a308;
  --breakpoint: 640px;
}
```

These are applied using:

```
<property> : var(--basil-green);
```

Starter formatting:

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

Responsive Images:

```css
img {
    width: 100%;
    height: auto;
}
```

Note the use of max-width on the body selector. We applied it to a div in the past.

Note the use of margin on the body element. We applied it to a div in the past.

Add `box-sizing: border-box;` to the article / aside rule.

```css
article, aside {
    ...
    box-sizing: border-box;
}
```

Move it to a universal selector so it applies to all the boxes.

```css
html {
    box-sizing: border-box;
}
*,
*:before,
*:after {
    box-sizing: inherit;
}
```

Note the footer. Because both columns have been floated it can wrap.

```css
footer {
    clear: both;
    background-color: var(--basil-green);
    padding: 1rem;
    border-radius: 0 0 4px 4px;
}
```

### Old School Faux Columns

Since the two columns can be of different heights and our design calls for two columns of a different color we can not color the aside and article divs. We'll use a very old technique for the moment and change it later.

Examine the background image.

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
    background:var(--basil-green); 
    color:#fff; 
}
```

### Clearfix

_Disable the float:left rule on the content before applying these._

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

Since box collapsing is rather common, designers frequently create a generic class for use elsewhere.

Update the method to something shorter and more modern and apply the cf classname to the content div:

```css
.cf::before, .cf::after {
    content: " ";
    display: table;
}

.cf::after {
    clear: both;
}
```

Apply it to the content div:

```html
<div class="cf content">
```

Examine the html in the inspector. Look for `::before` and `::after` after the content div. We'll return to the :before and :after pseudo-classes later.

## Mobile Layout with Floats

1. stack the article and aside on top of each other in small screen and remove the background image:

```css
.content { 
  /*background : url(img/html.png) repeat-y 50% 50%;*/
}

article, aside {
    padding: 1rem;
}
```

2. add back the features necessary for two column display on wide screens:

```css
@media only screen and (min-width: 600px) {
    .content {
        background: url('img/html.png') repeat-y 50% 50%;
    }
    article, aside {
        float: left;
        width: 50%;
        padding : 16px;
    }
}
```

Try to use our variable:

```
@media only screen and (min-width: var(--breakpoint)) {
```

No go. A media query is not an element, it does not inherit from <html>, so it can't work.

## Flex columns

Refactor the article and aside columns, this time to use flexbox. (Applies only to widescreen view.)

Remove the float property, change the column widths, remove the background image and add column effect via css:

```css
@media only screen and (min-width: 640px) {
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

See [flex property](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - we are using a shortcut here which includes `flex-grow, flex-shrink, and flex-basis`. Default is `Default is 0 1 auto`. We are using:

```
  article {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 60%;
  }
```

NB: Since we are not using floats we no longer need to use clearfix for the content div or clear: both for the footer.

Clean up the CSS by removing the clearfix (and its class in the html).

### Format Basic Content

```css
h2, h3 {
    color: var(--basil-green);
    margin: 8px 0;
    font-size: 1.4rem;
    letter-spacing: -1px;
}

a {
    color: #f90;
    text-decoration: none;
    transition: color 0.5s linear;
}
a:hover {
    color: #f00;
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

Note `li > h4` : this is a `element>element` selector and is used to select elements with a specific parent.

Note also: the transition property on the anchor selector. This is a shortcut for:

```
    transition-property: color;
    transition-duration: 1s;
    transition-timing-function: linear;
```

or `transition: color 0.2s linear;`

### Animate Links

Confine this effect to anchors within the content div:

```css
.content a:hover {
    color: var(--basil-green);
}
```


## The Branding Header

Add the green background to the branding div.

```css
header {
    position: relative;
    height: 120px;
    background: var(--basil-green);
    border-radius: 8px 8px 0px 0px;
}
```

Add the custom font (top of the css file):

`@import url(futura/stylesheet.css);`

Note - this requires an additional call to the server to fetch the additional css when the browser renders the file.

```css
header h1 {
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif; 
    font-weight: normal;
    color:#fff;
    font-size: 5rem;
}
```

Note: image is 272px by 170px.

```css
header h1 { 
    padding-left: 260px;
    padding-top: 90px;
    ...
}
```

Note - when using custom fonts like this `font-weight: normal;` is necessary because normally header tags like h1 are bold and we do not have a bold version of the font here. 

We cannot see the text because we have added padding. Use transform to tweak the positioning:

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

https://www.w3schools.com/cssref/css3_pr_transform.asp

Use:

`transform: translate(-100px, -80px);`

Note: transforms are an important property when it comes to creating animations.

The beta link in the header:

```html
<header>
    <h1>Basilica!</h1>
    <a class="beta" href="#">Beta</a>
</header>
```

Absolutely position the beta element (we can do this in the context of the header because we apply `position: relative` to it earlier). 

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

Note the use of svg for the background image. Examine the svg in Sublime text.

### Header Branding Responsive Design

Examine the site for problems in a narrow browser. 

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
@media only screen and (min-width: 640px) {
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
    border-radius: 6px;
}
```

```css
.nav-storeit a {
 background: linear-gradient(to bottom, #fcde41 1%, #dfa910 100%);
}

.nav-storeit a:hover {
 background: linear-gradient(to bottom, #dfa910 0%, #fcde41 100%);
}

.nav-pickit a {
  background: linear-gradient(to bottom, #abc841 0%, #6b861e 100%);
}

.nav-pickit a:hover {
  background: linear-gradient(to bottom, #6b861e 1%, #abc841 100%);
}

.nav-cookit a {
  background: linear-gradient(to bottom, #6f89c7 0%, #344e8b 100%);
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
    border: 2px solid #eabc5a;
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
    border: 2px solid #eabc5a;
    border-radius: 50%;
    text-align: center;
    line-height: 1.5rem;
    font-weight: bold;
}
```


## NOTES

```
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
```

and

```
...85" filter="url(#f1)"/>
```

equals

```
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <defs>
    <style>.cls-1{fill:#f38f40;}</style>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
    </defs>
    <title>Artboard 1-toc</title>
    <polygon class="cls-1" points="32.05 19.85 33.89 18 32.05 16.15 33.35 13.89 31.09 12.58 31.64 10.05 29 9.38 29 7 26.62 7 25.95 4.36 23.42 4.97 22.11 2.68 19.85 3.97 18 2.11 16.15 3.96 13.89 2.65 12.58 4.91 10.05 4.36 9.38 7 7 7 7 9.38 4.36 10.05 4.97 12.58 2.68 13.89 3.97 16.15 2.11 18 3.96 19.85 2.65 22.11 4.91 23.42 4.36 25.95 7 26.62 7 29 9.38 29 10.05 31.64 12.58 31.03 13.89 33.32 16.15 32.03 18 33.89 19.85 32.04 22.11 33.35 23.42 31.09 25.95 31.64 26.62 29 29 29 29 26.62 31.64 25.95 31.03 23.42 33.32 22.11 32.05 19.85" filter="url(#f1)"/></svg>
```

add blur on alpha channel

```
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <defs>
        <style>.cls-1{fill:#f38f40;}</style>
        <filter id="f1" x="0" y="0">
            <feOffset result = "offOut" in = "SourceAlpha"  dx="1" dy="1" />
            <feGaussianBlur result = "blurOut" in = "offOut" stdDeviation="1" />
            <feBlend in = "SourceGraphic" in2 = "blurOut" mode = "normal"/>
        </filter>
    </defs>
    <title>Artboard 1-toc</title>
    <polygon class="cls-1" points="32.05 19.85 33.89 18 32.05 16.15 33.35 13.89 31.09 12.58 31.64 10.05 29 9.38 29 7 26.62 7 25.95 4.36 23.42 4.97 22.11 2.68 19.85 3.97 18 2.11 16.15 3.96 13.89 2.65 12.58 4.91 10.05 4.36 9.38 7 7 7 7 9.38 4.36 10.05 4.97 12.58 2.68 13.89 3.97 16.15 2.11 18 3.96 19.85 2.65 22.11 4.91 23.42 4.36 25.95 7 26.62 7 29 9.38 29 10.05 31.64 12.58 31.03 13.89 33.32 16.15 32.03 18 33.89 19.85 32.04 22.11 33.35 23.42 31.09 25.95 31.64 26.62 29 29 29 29 26.62 31.64 25.95 31.03 23.42 33.32 22.11 32.05 19.85" filter="url(#f1)"/></svg>
```

Tap Highlight Color






















