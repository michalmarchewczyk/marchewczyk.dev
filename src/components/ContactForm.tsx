import React, { useState } from 'react';
import classes from './ContactForm.module.scss';
import { Alert, Button, Text, Textarea, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { IconAlertCircle, IconCheck, IconSend } from '@tabler/icons-react';

function ContactForm() {
  const form = useForm({
    initialValues: { name: '', email: '', message: '' },
    validate: {
      name: isNotEmpty('Name is required'),
      email: isEmail('Email is not valid'),
      message: isNotEmpty('Message is required'),
    },
    validateInputOnBlur: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async ({
    name,
    email,
    message,
  }: {
    name: string;
    email: string;
    message: string;
  }) => {
    setLoading(true);
    const res = await fetch(import.meta.env.VITE_MAIL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    if (res.status !== 200) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 10000);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 10000);
    }
    setLoading(false);
  };

  return (
    <form className={classes.Form} onSubmit={form.onSubmit((values) => submit(values))}>
      <Text size={24} weight={700}>
        or leave me a message:
      </Text>
      <TextInput
        label={
          <Text size={20} weight={600}>
            Name
          </Text>
        }
        size={'md'}
        {...form.getInputProps('name')}
      ></TextInput>
      <TextInput
        label={
          <Text size={20} weight={600}>
            Email
          </Text>
        }
        size={'md'}
        {...form.getInputProps('email')}
      ></TextInput>
      <Textarea
        label={
          <Text size={20} weight={600}>
            Message
          </Text>
        }
        size={'md'}
        {...form.getInputProps('message')}
        minRows={8}
        maxRows={8}
      ></Textarea>
      <Button
        type={'submit'}
        disabled={!form.isValid()}
        size="xl"
        leftIcon={<IconSend />}
        loading={loading}
      >
        Send
      </Button>
      {error && (
        <Alert title="Error" color="red" className={classes.AlertRed} icon={<IconAlertCircle />}>
          There was an error sending your message. <br /> Please try again later.
        </Alert>
      )}
      {success && (
        <Alert
          title="Message sent"
          color="green"
          className={classes.AlertGreen}
          icon={<IconCheck />}
        >
          Your message was sent successfully.
        </Alert>
      )}
    </form>
  );
}

export default ContactForm;
