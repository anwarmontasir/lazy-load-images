import html from './lazyload.html';
import './lazyload.css';
import Template from '../Template';
import { getURL } from '../../services/cloudinary';

const template = new Template(html);

export default class Lazyload {
  constructor(imgObj) {
    this.imgObj = imgObj;
  }

  getLoResImage(imgTarget, captionTarget) {
    const { width, height, options, fileName, caption } = this.imgObj;
    
    const loResOptions = `${options},w_${Math.round(width / 100)},h_${Math.round(height / 100)},e_blur:600`;
    const loResURL = getURL(fileName, loResOptions);
    imgTarget.src = loResURL;
    captionTarget.innerHTML = caption;
  }

  getHiResImage(target) {
    const { width, height, options, fileName, alt } = this.imgObj;
    /* create array of image widths to use with srcset. this has nothing to do with aspect ratios (like the picture element), just providing sufficiently hi-res images. http://bit.ly/1FLxY3E */
    const imgSizes = [500, 1000, 1500, 2000, 2500];
    let hiResHTML = '';
    for(let i = 0; i < imgSizes.length; i++) {
      const hiResOptions = `${options},w_${imgSizes[i]},ar_${Math.round(width / 100)}:${Math.round(height / 100)}`;
      const hiResURL = getURL(fileName, hiResOptions);
      if(i === 0) {
        hiResHTML += `<img src="${hiResURL}" srcset="`;
      } else if(i < imgSizes.length - 1) {
        hiResHTML += `${hiResURL} ${imgSizes[i]}w, `;
      } else {
        hiResHTML += `${hiResURL} ${imgSizes[i]}w" alt="${alt}">`;
      }
    }
    target.innerHTML = hiResHTML;
  }

  render() {
    
    const dom = template.clone();
    
    this.getLoResImage(dom.querySelector('.loRes'), dom.querySelector('figcaption'));
    
    // Intersection Observer: see http://bit.ly/2DUuSir, https://mzl.la/2dG28Oq

    const config = {
      // If the image gets within 50px in the Y axis, start the download.
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
    
    return dom;
  }
}