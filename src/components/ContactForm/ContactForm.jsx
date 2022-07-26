import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'services/contactsApi';
import { Box, Button, TextField } from '@mui/material';

const ContactForm = () => {
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const onSubmit = async data => {
    try {
      if (
        contacts.find(
          contact =>
            contact.name.toLocaleLowerCase() ===
            formik.values.name.toLocaleLowerCase()
        )
      )
        throw new Error(`${formik.values.name} is already in contacts`);

      const result = await addContact(data);

      if (result.error) throw new Error('Failed to add contact');

      toast.success('Contact added successfully');
      formik.handleReset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const numberRegex = new RegExp(
    '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}'
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        )

        .required('Required'),
      number: Yup.string()
        .matches(
          numberRegex,
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
        )
        .max(13)
        .required('Required'),
    }),
    onSubmit,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="number"
        label="Number"
        type="tel"
        id="number"
        value={formik.values.number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.number && formik.errors.number)}
        helperText={formik.touched.number && formik.errors.number}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, textAlign: 'center' }}
        disabled={isLoading}
      >
        Add contact
      </Button>
    </Box>
  );
};

export default ContactForm;
