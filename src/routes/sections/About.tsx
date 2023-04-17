import React from 'react';
import Section from '../../components/layout/Section';
import classes from './About.module.scss';
import { Text } from '@mantine/core';
import LanguageTile from '../../components/about/LanguageTile';

const PRIMARY_LANGUAGES: [string, number, number][] = [
  ['JavaScript', 0, 60],
  ['TypeScript', 8, 85],
  ['React', 25, 62],
  ['Next.js', 43, 83],
  ['Angular', 60, 60],
  ['Node.js', 70, 0],
  ['NestJS', 78, 30],
];

const LANGUAGES: [string, number, number][] = [
  ['Svelte', 66, 74],
  ['HTML5', 10, 74],
  ['CSS3', 29, 76],
  ['SASS', 31, 92],
  ['Tailwind CSS', 48, 72],
  ['Vue.js', 63, 86],
  ['Nuxt', 84, 88],
  ['Express.js', 68, 18],
  ['Python', 88, 47],
  ['PHP', 86, 12],
  ['Docker', 62, 36],
  ['Git', 68, 48],
  ['Figma', 80, 58],
  ['Affinity Designer', 92, 68],
  ['Blender', 82, 76],
];

function About() {
  return (
    <Section name={'about'}>
      <div className={classes.About}>
        <h2>About me</h2>
        <Text size={22} weight={500}>
          <p>
            Hey, my name is Michał Marchewczyk.
            <br />
            I&apos;m a full-stack web&nbsp;developer from Poland.
          </p>
          <p>
            I mostly create web applications and websites using JavaScript based technologies and
            frameworks.
            <br />I can also create UI designs and 3D graphics.
          </p>
          <p>
            I love messing around with new technologies and learning new things that enable me to
            create more complex and&nbsp;interesting&nbsp;projects.
          </p>
          <p>
            I&apos;m always looking for new opportunities,
            so&nbsp;feel&nbsp;free&nbsp;to&nbsp;contact&nbsp;me!
          </p>
        </Text>
        {PRIMARY_LANGUAGES.map(([language, top, left]) => (
          <LanguageTile
            language={language}
            key={language}
            big={true}
            style={{ top: top + '%', left: left + '%' }}
          />
        ))}
        {LANGUAGES.map(([language, top, left]) => (
          <LanguageTile
            language={language}
            key={language}
            big={false}
            style={{ top: top + '%', left: left + '%' }}
          />
        ))}
      </div>
    </Section>
  );
}

export default About;
