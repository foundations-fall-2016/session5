# FOUNDATIONS session 5

## Homework

* Finalize and put your midterms on the NYU server
* If you are able to bring in a laptop next class do so
* Download and install [Node](https://nodejs.org/en/) on it

## Reading

* [SASS for Web Designers](https://abookapart.com/products/sass-for-web-designers) 
* There's a new book just out on CSS which you might consider reading - [The New CSS Layout](https://abookapart.com/products/the-new-css-layout), or at least [the excerpt](https://alistapart.com/article/the-new-css-layout-excerpt)

## Terminal Basics

* Note: Windows users might wish to check out [CMDER](http://cmder.net)

```
$ cd <PATH> // copy and paste the folder you want to go to
$ ls 
$ls -al  // flags expand the command
$ pwd
```

Note: tab completion, `..` and copy paste.

## Node Package Manager

[Node Package Manager](https://www.npmjs.com) is an essential part of the web design and development ecosystem. 

[Node](https://nodejs.org/en/) includes NPM as part of its install

Demo with [Browser Sync](https://www.browsersync.io) 

```
$ npm init
$ npm install browser-sync --save
```

Notes
* package.json 
* dependancies
* node_modules folder
* discuss the need for `.gitignore`.

Browser Sync [CLI documentation](https://www.browsersync.io/docs/command-line)

```
  "scripts": {
    "start": "browser-sync start --server 'app' --files 'app'"
  },
```

```
$ npm run start
```

Review Browser Sync's interface at port 3001.

[Github Repo](https://github.com/BrowserSync/browser-sync)

Today's repo comes with a package.json file (aka 'manifest'). 

Run `npm install`:

```
npm install
```

```
  "scripts": {
    "start": "browser-sync start --browser \"google chrome\" --server 'app' --files 'app'"
  },
```


### Non-Terminal Alteratives

There are times when setting up an NPM script seems a bit overkill. There are a [number of apps](https://graygrids.com/best-tools-resources-compile-manage-sass-less-stylus-css-preprocessors/) built on top of NPM and related technolgies which can be used in a pinch. A few of my favorites are Codekit (payware), and Koala and Scout (both free) for SASS. 


## Basilica

`$ npm run start`

Examine code with regards to the [recipe schema](https://schema.org/Recipe) at [schema.org](http://schema.org/docs/gs.html). 

Here is an [article that addresses recipe schemas](https://www.foodbloggerpro.com/blog/article/what-is-recipe-schema/) but note that there are [many different kinds](https://schema.org/docs/full.html).

Note the `<abbr>` tag and the absence of a wrapper div (even though the design shows a centered document).


![Image of Basilica](FINAL.png)

Normally you will start off with a few known styleguide settings. Let's use a couple of css variables:

```
html {
  --basil-green: #88a308;
  --breakpoint: 640px;
}
```

These will be applied applied in our css as follows:

```css
<property> : var(--basil-green);
```

### Starter formatting

Responsive Images:

```css
img {
    width: 100%;
    height: auto;
}
```

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
```

Note the use of max-width on the body selector. We applied it to a div in the past.

Note the use of margin on the body element. We applied it to a div in the past.

We'll start by using float on the two main content columns:

```css
article, aside {
    float: left;
    width : 50%;
    padding : 16px;
}
```

Add `box-sizing: border-box;` to the article / aside rule.

```css
article, aside {
    ...
    box-sizing: border-box;
}
```

Move it to a universal selector so it applies to all the boxes. See [Paul Irish](https://www.paulirish.com/2012/box-sizing-border-box-ftw/) on box-sizing.

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
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

Since the two columns can be of different heights and our design calls for two columns of a different color we can not color the aside and article divs. We'll use an old technique for the moment and change it later.

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

Note: If we try to use our variable:

```
@media only screen and (min-width: var(--breakpoint)) {
```

It doesn't work. A media query is not an element, it does not inherit from <html>.

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

See [flex property](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - we are using a shortcut here which includes `flex-grow, flex-shrink, and flex-basis`. Default is `Default is 0 1 auto`. 

We are using:

```
  article {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 60%;
  }
```

Note: Since we are not using floats we no longer need to use clearfix for the content div or clear: both for the footer.

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

Confine this effect to anchors within the content div. Replace the generic hover with:

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

```css
header h1 {
    transform: translateX(-100px);
    transform: translateY(-80px);
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

Note: transforms are an [important property](https://www.w3schools.com/cssref/css3_pr_transform.asp) when it comes to creating animations.

Note the beta link in the header:

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

Since we are attempting a mobile first design let's edit for small screen:

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

And re-add features for the large screen:

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

Note: there is no hover in touch screen devices.

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

### SASS Setup Using NPM



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


## SASS

Create a `scss` directory at the top level of the project and save styles.css into it using the .scss suffix.

Note: syntax highlighting in editor.

Install node-sass via NPM as a developmental dependency.

Add a script for processing:

```
  "scripts": {
    "startSync": "browser-sync start --browser 'google chrome' --server 'app' --files 'app'",
    "startSass": "node-sass  --watch scss/styles.scss --output app/css/"
  },
```

Node-sass CLI [documentation](https://github.com/sass/node-sass#command-line-interface)

Test it by running `$npm run startSass` and adding to the scss file.

We need to run both scripts at the same time.

```
npm install concurrently --save-dev
```

```
  "scripts": {
    "start": "browser-sync start --browser 'google chrome' --server 'app' --files 'app'",
    "startSass": "node-sass  --watch scss/styles.scss --output app/css/",
    "boom!": "concurrently \"npm run start\" \"npm run startSass\" "
  },
```

#### SASS variables:

$basil-green: #88a308;
$breakpoint-med: 640px;

#### SASS nesting (do this one step at a time):

```css
header {
    position: relative;
    height: 120px;
    background: $basil-green;
    border-radius: 8px 8px 0px 0px;
    h1 {
        background: url(img/basil.png) no-repeat;
        font-family: FuturaStdLight, sans-serif;
        font-weight: normal;
        color: #fff;
        font-size: 5rem;
        background-position: -20px -20px;
        @media (min-width: $breakpoint-med) {
            padding-left: 240px;
            padding-top: 90px; 
            transform: translate(-100px, -80px); 
            background-position: top left;
        }
    }
    a.beta {
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
        transform: rotate(20deg);
        transition: all 1s ease;
        &:hover {
            transform: rotate(0deg) scale(1.2);
        }
    }
}
```

#### SASS comments:

`//` - JavaScript style. These comments do not get compiled into the css file. Traditional ones do.

#### SASS includes




## Notes


```html
<style>
.content{
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  /*grid-template-rows: 20% 20% 20% 20% 20%;*/
}
article {
    grid-row-start: 1;
    grid-column-start: 1;
    grid-column-end: span 3;
}
aside {
    grid-row-start: 1;
    grid-column-start: 4;
    grid-column-end: span 2;
}

</style>
```

```js
{
  "name": "session5",
  "version": "1.0.0",
  "description": "## Homework",
  "main": "index.js",
  "scripts": {
    "startSync": "browser-sync start --browser \"google chrome\" --server 'app' --files 'app'",
    "startSass": "node-sass  --watch scss/styles.scss --output app/css/"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/front-end-foundations/session5.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/front-end-foundations/session5/issues"
  },
  "homepage": "https://github.com/front-end-foundations/session5#readme",
  "dependencies": {
    "browser-sync": "^2.18.8"
  },
  "devDependencies": {
    "node-sass": "^4.5.3"
  }
}

```


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






















