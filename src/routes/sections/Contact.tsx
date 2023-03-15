import React from 'react';
import Section from '../../components/Section';
import classes from './Contact.module.scss';

function Contact() {
  return (
    <Section name={'contact'}>
      <div className={classes.Contact}>Contact</div>
    </Section>
  );
}

export default Contact;
