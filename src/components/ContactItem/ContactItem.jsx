import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDeleteContactMutation } from 'services/contactsApi';

import { Info, Item } from './ContactItem.styled';

const ContactItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading, isSuccess }] = useDeleteContactMutation();

  useEffect(() => {
    if (isSuccess) Notify.success('The contact was successfully deleted');
  }, [isSuccess]);

  return (
    <Item>
      <Info>
        {name}: {number}
      </Info>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
