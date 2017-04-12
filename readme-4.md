<!-- ## Box Model - Border Box

Working with the alternate box model in version-2-fluid.

This is a simplified version of the first exercise. Examine the html and css.

Remove the width rule from the menu-list and note its size. Add `width: 100%`.

```css
.menu-list {
    ...
    /*width: 300px;*/
    width: 100%;
}
```

Note the horizontal scroll bar.

Initialize border-box on all elements:

```css
* {
    ...
    box-sizing: border-box;
}
```

No scrolling.

```css
.menu-list dl {
    ...
    width: calc(100% - 20px);
}
```

```css
.menu-list dt {
    ...
    width: calc(100% - 98px);
}
```
 -->

## (Un)Responsive Design - Just the Basics

### No Media Queries

The foundation for responsive design is not media queries but a flexible layout that uses percentages.

In order to use percentages we rely on the non-additive box-sizing: border-box method:

```css
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
}
```

And then use padding as opposed to margins - which are not part of the box model - to achieve our goals. (Note: remove the alternating layout.)

```
.menu-list {
    padding: 10px;
    float: left;
    min-width:304px; 
    border-width: 4px 4px 0 4px;
    border-left-style: solid;
    border-right-style: solid;
    border-image: linear-gradient(to bottom, rgb(200, 205, 210), rgba(0, 0, 0, 0)) 1 100%;
    background: linear-gradient(to bottom, rgba(200, 205, 210,1) 0%, rgba(200, 205, 210,1) 1%, rgba(240,240,240,0.4) 1.5%, rgba(240,240,240,0) 100%);
}

.menu-list dl {
    float: left;
    width: 100%;
    clear: both;
    padding: 12px;
}

.menu-list dt {
    letter-spacing: 1px; 
    color: #627081; 
    float: right;
    width:80%;
    padding-bottom: 6px;
}

.menu-list dt + dd {
    width: 20%;
    padding-right: 12px;
}

.menu-list dd {
    font-size: 0.875em;
    line-height: 1.6; 
    color: #666; 
}

.menu-list dd + dd {
    float: right;
    width: 80%;
}

.menu-list img {
    width: 100%;
    float:left;
    padding: 4px;
    border: 1px solid #d9e0e6;
    border-bottom-color: #c8cdd2;
    border-right-color: #c8cdd2;
    background: #fff;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
```




## Basilica (start if time permits)

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
    padding-top: 90px;*/
    background: url(img/basil.png) no-repeat;
    font-family: FuturaStdLight, sans-serif; 
    font-weight: normal;
    color:#fff;
    /*font-size: 5rem;*/
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


```css
article, aside {
    box-sizing: border-box;
    padding: 1rem;
}

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

### Header Branding

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

### Navigation

```css
nav {
    background: #e4e1d1;
    border-top: 0.5rem solid #ebbd4e;
    padding: 0.5rem;
}

nav li {
    float: left;
    list-style: none;
    margin-right: 0.5rem;
}

nav a {
    text-align: center;
    font-size: 1.5rem;
    padding: 8px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
```

Button gradients

```css
.nav-storeit a {
    background: linear-gradient(to bottom, #dfa910 0%, #fcde41 100%);
    border-radius: 6px;
}

.nav-storeit a:hover {
    background: linear-gradient(to bottom, #fcde41 1%, #dfa910 99%);
}

.nav-pickit a {
    background: linear-gradient(to bottom, #ABC841 0%, #6B861E 100%);
    border-radius: 6px;
}

.nav-pickit a:hover {
    background: linear-gradient(to bottom, #6B861E 1%, #ABC841 99%);
}

.nav-cookit a {
    background: linear-gradient(to bottom, #6F89C7 0%, #344E8B 100%);
    border-radius: 6px;
}

.nav-cookit a:hover {
    background: linear-gradient(to bottom, #344E8B 1%, #6F89C7 99%);
}
```


```css
nav {
    ...
    float: left;
    width: 100%;
}

nav ul {
    float: right;
}

nav p {
    float: left;
}

```

### Flexbox

Flexbox [the basics](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). 

Refactor the nav to use flexbox. Remove the floating and widths.

```css
nav ul {
    display: flex;
}

nav li {
    list-style: none;
    margin-right: 0.5rem;
}

nav {
    background: #e4e1d1;
    border-top: 0.5rem solid #ebbd4e;
    padding: 0.5rem;
    display: flex;
    align-items: center;
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


Footer

```css
footer {
    clear: both;
    background: #88A308;
    border-radius: 0 0 8px 8px;
    padding: 40px 10px 10px 1rem;
    text-align: right;
}
```

## Flex columns

Refactor the article and aside columns to use flexbox. (Applies only to widescreen view.)

Remove the float property and add flex:

```
@media only screen and (min-width: 768px) {
    ...
    .content {
    background: url('img/html.png') repeat-y 50% 50%;
    display: flex;
    }
    
    article {}
    
    aside {}
    ...
}
```

Change the column widths, remove the background image and add coloring css:

```
@media only screen and (min-width: 768px) {
    ...
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
    ...
}
```

## NOTES

## Add an Image to the layout

## Use SVG for the Burst Graphic

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
    left: calc(50% - 108px);
    // could also use a negtive margin
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

```
<script>
$(document).ready(function() {
    $('.betainfo p').addClass('emphasis');
});
</script>
```

All of jQuery's methods are documented at [http://api.jquery.com](http://api.jquery.com)

Adding a click event requires a function:

```
<script>
    $('.betainfo p').click( 
        function() {
            alert('test');
        }
    );
</script>
```

You can send messages to the inspector's console:

```
<script>
    $('.betainfo p').click(
        function() {
            console.log('test');
        }
    );s
</script>
```

Let's use the `this` keyword to target the thing that was clicked on. We use toggleClass to add and remove the class:

```
<script>
    $('.betainfo p').click( 
        function() {
            $(this).toggleClass('emphasis');
        }
    );
</script>
```

Add `display: none;` to the `.betainfo` css rule:

```
<script>
    $('header a').click( 
        function() {
            $('.betainfo').toggle();
        }
    );
</script>
```

Change to fadeToggle and note the animation running in the inspector:

```
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

```
<script>
$('header a, .betainfo div a').click( 
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

```
<script>
$('header a, .betainfo div a').click( 
    function() {
        $('.betainfo, .overlay').fadeToggle();
    }
);
</script>
```


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
```



### Tap Highlight Color



