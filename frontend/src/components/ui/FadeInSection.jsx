import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./fade-in-section.module.scss"; 

const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`${styles.fadeInSection} ${isVisible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
