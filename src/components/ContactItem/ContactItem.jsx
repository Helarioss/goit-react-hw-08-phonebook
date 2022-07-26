import { IconButton, ListItem, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDeleteContactMutation } from 'services/contactsApi';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading, isSuccess }] = useDeleteContactMutation();

  useEffect(() => {
    if (isSuccess) toast.success('The contact was successfully deleted');
  }, [isSuccess]);

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="delete"
            disabled={isLoading}
            onClick={() => deleteContact(id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={name} secondary={number} />
    </ListItem>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
