import React from 'react';
import Section from '../../components/Section';
import classes from './Contact.module.scss';
import ContactForm from '../../components/ContactForm';
import { Text } from '@mantine/core';

function Contact() {
  return (
    <Section name={'contact'}>
      <div className={classes.Contact}>
        <h2>Contact me</h2>
        <div>
          <Text size={24} weight={700}>
            Contact me directly:
          </Text>
          <p>
            Email: <a href="mailto:dev@marchewczyk.eu">contact@marchewczyk.eu</a>
            <br />
            GitHub:{' '}
            <a href="https://github.com/michalmarchewczyk" target="_blank" rel="noreferrer">
              michalmarchewczyk
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

export default Contact;
