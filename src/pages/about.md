---
title: About
description: >
    This is a Universal JavaScript app. The pages are generated server-side through Express using React and React Router; most of the content is in simple, static MarkDown files.
show_description: false
---

This site is designed to showcase **[my best-loved projects](/projects)** in web development.

It is built with **React** and **Express**.  I wanted to take a content management approach similar to **Jekyll** (a blog-aware, static site generator).  I decided to use a predictable file structure and write my pages in **MarkDown**, which I have enjoyed using in sites like StackOverflow and GitHub. 

Here's an example **React** component from *this very* page:

```jsx
import React from 'react';
import PlainPage from './PlainPage';
import Contact from './Contact';

const AboutPage = (props) => (
	<PlainPage {...props}>
		<Contact />
	</PlainPage>
);

export default AboutPage;
```

What I've loved about **React** is how modular/reusable it is; and what I've loved about **MarkDown** is how minimalistic it is.  I wished for a simple implementation of both languages, but generally found only a handful of examples which only dealt with *some* of the issues. This website borrowed from many examples and I made my own solutions where necessary.

This is a **Universal JavaScript** app: The pages are generated server-side through **Express** with the help of **React Router**; the layout is created with **React** (*of course*), and most of the content is in a simple **MarkDown** and **FrontMatter** format.

I've learned a lot through this project about both **React** and **Webpack**, and I've also had a lot of fun making it!  I hope you enjoy the performance and experience of this site on the front end, especially as I continue to update.

If you're curious about how it all works, take a look at the repo: [<i class="fa fa-github"></i> github.com](https://github.com/bozdoz/bozdoz.com)

If you have any questions or comments, tweet me!