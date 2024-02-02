import { atom, useRecoilValue } from 'recoil';

export const LoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
})

