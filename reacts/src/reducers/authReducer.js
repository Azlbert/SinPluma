import { 
  AUTHENTICATED, 
  UNAUTHENTICATED, 
  AUTHENTICATION_ERROR,
  USER_CREATED
} from '../common/Session';

// TODO: Refactor auth logic
export default function(state={}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case USER_CREATED:
      return { ...state, userCreated: true };
    default:
  }
  return state;
}