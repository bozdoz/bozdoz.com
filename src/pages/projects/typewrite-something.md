---
title: Typewrite Something
subtitle: typewritesomething.com
link: "http://typewritesomething.com"
description: >
    An online typewriter simulator, web app and mobile app.
tags:
    - JavaScript
    - PhoneGap
image: /images/projects/typewrite-something.jpg
---

### What is it?

A minimalistic typewriter simulator designed for creative writing.  It gives you some of the experience of working on a real typewriter.  Some of the realism was sacrificed for user experience. **The keys don't jam** if you type fast (because I thought it would be merely annoying), and there was no way for me to simulate pressure-sensitive opacity.

![Margaret Atwood](https://lh3.googleusercontent.com/kbiRthMia_jtiHFTsijoHhtPfOIPN9VALrJmjgsvozf7-Nzr-9nRiWGiwj_9MzuRIy4=h900)

What is there: real typewriter sounds, no way to backspace (and yes, I've received plenty of bad/[funny](https://i.imgur.com/VtsFgc7.png) reviews about it), and no lines to stick to. 

### The Story

I wanted to make this app because of [a girl](https://www.instagram.com/janeporterwriting/). She really liked typewriters (currently owns six?).  She was visiting Singapore on vacation and sent me a message that she missed being able to write on her typewriter. 

![Code proofs on a typewriter](/images/projects/typewrite-something/typewriter.jpg)

So I spent maybe two or three nights and created a basic working version on CodePen, later moving it to [TypewriteSomething.com](http://typewritesomething.com/).

She seemed to enjoy it, and so did I.  I was initially surprised that there were so few simulators, and none worked the way I expected.

### Web

I created the initial version on CodePen using HTML5 Canvas.  The idea was to have a paper background (nearly white), serif font, and a JavaScript variable keeping track of the cursor position.

```javascript
var NAV_BUTTONS = {
		8: 'moveleft',
		37: 'moveleft',
		38: 'moveup',
		39: 'moveright',
		40: 'movedown',
		13: 'newline',
	};
cursorInput.addEventListener('keyup', function (e) {
	var nav_button = NAV_BUTTONS[ e.which ],
		value = nav_button || this.value.substr( 1 );

	if (!value) return;

	// wipe input to handle one character at a time
	// a single space so mobile isn't forced to uppercase
	this.value = ' ';

	if (nav_button) {

		updateCursor( value );

	} else {

		// update multiple characters in case 
		// they keydown more than they keyup
		for (var i = 0, len = value.length; i < len; i++) {
			
			addToChars( value[i] );
			updateCursor( 'moveright' );
		
		}
	}
});
```

Here you might notice some of the challenges I ran into.  First, `keyup`?!  Why not `keydown`?  Well, `keyup` is a lot more reliable, I found. Also, I think it works better with the experience of a typewriter &mdash; the letter only appears *after* the key is unpressed. 

I created a hidden text input for handling all of the events, and trigger the `focus` event when I want the typing to be active.  I noticed when typing on my phone that my keyboard forces the first letter to be a capital; therefore, I set the input's value to single space, and capture every letter after.

I also had an issue where I would run out of memory because the canvas was getting too big, so I changed the app to work with a canvas that is only the size of the screen.  If you write off the screen it will recreate it when you click-drag it back into view.  I got this idea from **[Leaflet](http://leafletjs.com/)** which uses a similar approach when drawing shapes on maps.

### Mobile

I needed to create a mobile app for another project, and thought that this app would be perfect for testing Adobe PhoneGap.  It basically creates an app that uses a full screen browser to display a completely working, self-contained website.  

There wasn't much that needed to be done to make it ready to publish.  I learned some of the quirks of PhoneGap: added plugins to the `config.xml`, and added a Content Security Policy for the main HTML page.

I added some testing suites to the main web app to be sure that the mobile app would be working.  I added a simple `JSHint` implementation, and learned a bit about `CasperJS` to create some integration tests.

```javascript
// casper test
casper.then(function() {
	// simulate click at arbitrary position
    this.mouse.click(268,159);
    // run eval within the headless page
    test.assertEvalEquals(function () {
    	// reverse engineer 
        var letter_offset = new Vector(letter_width / 2, line_height / 2),
            output = pos_vec.add(letter_offset);

        // check this value against next argument
        return [output.x, output.y];
    }, [268, 159], 'Cursor and click positions match');
});
```

There's still a lot left to do on the app to make it smoother and more functional.  Having it published on the Google Play Store gave me lots of feedback and requests.

The remaining work that I want to do on it is as follows:

- allow pinch-zooming
- export/share/import (but not sure how I want to do it)

And I also thought it might be a cool idea to have the cursor always in the middle, and have the background move (like a real typewriter); but I'm also unsure of that.  I'd have to play around with it some more to get a better feel for what it needs.

### Links

- [Typewrite Something](http://typewritesomething.com/)
- [<i class="fa fa-github"></i> Github Repo](https://github.com/bozdoz/typewritesomething)
- [<i class="fa fa-codepen"></i> Original Pen (no audio)](https://codepen.io/bozdoz/pen/pvdOXG)
- [<i class="fa fa-android"></i> Android App](https://play.google.com/store/apps/details?id=com.phonegap.typewritesomething)
- [Jane Porter Writing](https://www.instagram.com/janeporterwriting/)