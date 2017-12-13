import { Person } from 'blockstack';
import { actionTypes } from '../actions/user';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
const defaultUser = {
  '@context': 'http://schema.org/',
  '@type': 'Person',
  name: 'Anonymous',
  description: '',
  image: [{ '@type': 'ImageObject', name: 'avatar', contentUrl: avatarFallbackImage }],
};

const initialState = new Person(defaultUser);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_DATA: {
      const user = new Person(action.profile);
      return user;
    }
    default: {
      return state;
    }
  }
}
