import { createContext } from 'react';

export const SERVER_PORT = 4000;

// Delay in mili-seconds
export const timeout = delay => {
  return new Promise(res => setTimeout(res, delay));
}

export const UserContext = createContext();
