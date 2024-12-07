export const fadeIn = (element, delay = 0) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, delay, ease: "power2.out" }
    );
  };
  
  export const bounceAnimation = (element) => {
    gsap.to(element, {
      y: -10,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  };
  
  