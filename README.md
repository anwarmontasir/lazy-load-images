# Lazy Load Images

## Project Overview

This project was built for the Devsign course I designed and taught in the winter of 2018 at [Alchemy Code Lab](https://www.alchemycodelab.com/).

In my experience, one of the most difficult concepts to teach is strategies for responsive image loading. Not merely setting the image width to 100%, but actually ensuring that appropriate media loads for the appropriate device, and only when needed.

This project introduced three concepts:

* **Using the Cloudinary API.** One obstacle in the way of providing responsive media is that creating numerous images is a pain, especially for students with no access to Photoshop. Fortunately, [Cloudinary](https://cloudinary.com/solutions/image_management) offers image storage, dynamic delivery optimized for different devices, and parameters to control image manipulation.

* **Art direction vs resolution switching.** Per MDN’s article on [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images), while choosing an image of appropriate resolution can be handled by the `srcset` attribute, choosing different aspect ratios for different screens requires the `<picture>` element.

* **Lazy loading images.** Inspired by the behavior of [Medium](https://medium.com/) articles, I wanted to load blurred placeholder images initially, with detailed images loading only as each one is scrolled into the viewport.

## Prep Work

While this was a one-day class exercise and did not undergo any part of the UX Research process, I did need to plan the layout and image uploads carefully.

For the hero image, I started with a large version of Van Gogh’s 1890 painting *Wheatfield With Crows*. The original upload was 4921px by 2361px and weighed 1.8 MB, though I had no plans to implement anything so heavy.

![Vincent Van Gogh, Wheatfield With Crows, 1890](http://res.cloudinary.com/anwarmontasir/image/upload/c_fill,g_auto,q_auto,w_960/wheatfield-with-crows-vincent-van-gogh-1890_nb7qd7.jpg "Vincent Van Gogh, Wheatfield With Crows, 1890")