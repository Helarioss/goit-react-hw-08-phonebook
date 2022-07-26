import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'services/contactsApi';
import { getFilter } from 'redux/contacts/filterSlice';
import ContactItem from 'components/ContactItem';
import { List } from '@mui/material';
import { Spinner } from 'components/Spinner';

const useContacts = () => {
  const filter = useSelector(getFilter);

  const selectFilteredContacts = useMemo(() => {
    return createSelector(
      [res => res.data, (_, filter) => filter],
      (data, filter) =>
        data
          ?.filter(({ name }) =>
            name.toLowerCase().includes(filter.toLowerCase())
          )
          .reverse() ?? []
    );
  }, []);

  return useGetContactsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      filteredContacts: selectFilteredContacts(result, filter),
    }),
  });
};

const ContactList = () => {
  const { data, filteredContacts, error, isLoading } = useContacts();

  if (isLoading) return <Spinner height={120} width={120} />;

  if (error) return <p>Failed to load contacts</p>;

  if (data?.length === 0) return <p>No contacts</p>;

  return (
    <List
      sx={{
        overflow: 'auto',
        maxHeight: 350,
      }}
    >
      {filteredContacts?.map(contact => (
        <ContactItem key={contact.id} {...contact} />
      ))}
    </List>
  );
};

export default ContactList;
