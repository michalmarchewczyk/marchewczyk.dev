import React, { useContext, useEffect, useState } from 'react';
import { SectionsContext } from './sections';
import { useScrollIntoView, useViewportSize, useWindowScroll } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

function Section({ name, children }: { name: string; children: React.ReactNode }) {
  const { setSections, currentSection, setCurrentSection, isScrolling, setIsScrolling } =
    useContext(SectionsContext);
  const [scroll] = useWindowScroll();
  const { height } = useViewportSize();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
    duration: 600,
    onScrollFinish: () => {
      setIsScrolling(false);
    },
  });
  const [inView, setInView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSections((prev) => {
      if (prev.includes(name)) {
        return prev;
      } else {
        return [...prev, name];
      }
    });
  }, []);

  useEffect(() => {
    if (currentSection === name && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      if (!(rect.top < height / 2 && rect.bottom > height / 2) && height > 0) {
        setIsScrolling(true);
        scrollIntoView();
      }
    }
  }, [currentSection]);

  useEffect(() => {
    const rect = targetRef.current?.getBoundingClientRect();
    if (rect.top < height / 2 && rect.bottom > height / 2 && height > 0) {
      setInView(true);
      if (currentSection !== name) {
        setCurrentSection(name);
      }
    } else {
      setInView(false);
    }
  }, [scroll]);

  useEffect(() => {
    if (inView && !isScrolling) {
      if ((name === '' && location.pathname !== '/') || !location.pathname.startsWith(`/${name}`)) {
        navigate(`/${name}`);
      }
    }
  }, [inView]);

  return (
    <section id={name} ref={targetRef}>
      {children}
    </section>
  );
}

export default Section;
