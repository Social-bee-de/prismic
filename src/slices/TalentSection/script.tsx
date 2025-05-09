"use client";

import Glide from '@glidejs/glide'
import { useEffect, useState } from "react";

interface Props {
  glidesToMount?: string[]; // Optionally pass specific glides to initialize
}

export const ClientScripts = (props: Props) => {
  const [sliders, setSliders] = useState<Glide[]>([]);

  const initGlider = () => {
    const glides = props.glidesToMount || ['.glide1', '.glide2']; // Default to both if not specified
    const newSliders: Glide[] = [];
    const desktop = window.innerWidth > 768;
    glides.forEach(g => {
      const element = document.querySelector(g);
      if (element) { // Ensure the element exists before initializing
        const slide = new Glide(g, {
          type: 'carousel',
          startAt: 0,
          perView: desktop ? 8 : 2,
        });
        slide.mount();
        newSliders.push(slide);

        // Subscribe to events if needed
        slide.on('run.before', () => {
          // ... do something cool here
        });
      }
    });

    setSliders(newSliders);
  }

  const onScroll = (lastScrollTop: number) => {
    const element = document.getElementsByClassName('expand-contract')[0];
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      if (element.className.includes('expanded')) {
        element.classList.toggle('expanded');
      }
    } else if (st < lastScrollTop) {
      if (!element.className.includes('expanded')) {
        element.classList.toggle('expanded');
      }
    }
    if (window.pageYOffset > 0) {
      if (!element.className.includes('scrolled')) {
        element.classList.toggle('scrolled');
      }
    } else {
      if (element.className.includes('scrolled')) {
        element.classList.toggle('scrolled');
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }

  const initMovableHeader = () => {
    let lastScrollTop = 0;
    document.addEventListener("scroll", () => {
      const element = document.getElementsByClassName('expand-contract')[0];
      if (element) {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          if (element.className.includes('expanded')) {
            element.classList.toggle('expanded');
          }
        } else if (st < lastScrollTop) {
          if (!element.className.includes('expanded')) {
            element.classList.toggle('expanded');
          }
        }
        if (window.pageYOffset > 0) {
          if (!element.className.includes('scrolled')) {
            element.classList.toggle('scrolled');
          }
        } else {
          if (element.className.includes('scrolled')) {
            element.classList.toggle('scrolled');
          }
        }
        lastScrollTop = st <= 0 ? 0 : st;
      }
    })
  };

  useEffect(() => {
    initGlider();
    initMovableHeader();

    return () => {
      sliders.forEach(slider => slider.destroy());
    }
  }, [props.glidesToMount]);

  return null;
}
