import { Grid } from '@mui/material';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { Title, TitleForm } from './Contacts.styled';

const Contacts = () => {
  return (
    <div>
      <Title>Phonebook</Title>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        columnSpacing={12}
      >
        <Grid item xs={3}>
          <TitleForm>Create contact</TitleForm>
          <ContactForm />
        </Grid>

        <Grid item xs={3}>
          <TitleForm>Contacts</TitleForm>
          <Filter />
          <ContactList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Contacts;
