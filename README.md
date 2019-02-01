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

A key feature of my script for loading the hero image are the preferences, based on Cloudinary’s [Image Transformations](https://cloudinary.com/documentation/image_transformations) documentation established in **Home.js**

```
aspectRatios: ['3:1', '5:2', '2:1', '3:2', '1:1'],
breakpoints: [2000, 1500, 1200, 900, 600],
options: 'c_fill,g_auto,q_auto'
```

Here I use a few Cloudinary cropping features (crop fill and gravity) while loading smaller images with increasingly square aspect ratios for decreasing screen widths:

![Diagram for choosing aspect ratios](http://www.anwarmontasir.com/2019/images/lazy-load-images/aspect-ratio-diagram@2x.png "Diagram for choosing aspect ratios")

I used an array of breakpoints as well for the remaining images, but these did not require art direction. I loaded these images initially with Cloudinary’s `e_blur` setting at 600, and the width and height divided by 100, to create placeholder images weighing less than 1K.

According to Firefox’s [Network Monitor](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor), the page initially loads 943K of data on my retina screen in 1.02 seconds. This is one-sixth of the total page weight, but the rest loads one image at a time.

## Challenges Faced

The Cloudinary API was pretty straightforward. The one tricky part of this exercise was working with the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect visibility of my gallery images within the viewport. Dean Hume’s post on [Lazy loading images using Intersection Observer](https://deanhume.com/lazy-loading-images-using-intersection-observer/) helped a ton.

```
const config = {
    // If image gets within 50px of Y axis, start download.
    rootMargin: '-50px 0px',
    threshold: 0.01
};
const wrapper = dom.querySelector('.lazy');
setTimeout(() => {
    let observer = new IntersectionObserver(([entry]) => {
        if(!entry || !entry.isIntersecting) return;
        observer.unobserve(wrapper);
        this.getHiResImage(wrapper.querySelector('.hiRes'));
    }, config);
    observer.observe(wrapper);
});
```