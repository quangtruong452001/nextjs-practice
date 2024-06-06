import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import UserPage from './users';
import { AddFormContext, EditFormContext } from '@/components/context';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [userAdded, setUserAdded] = useState<boolean>(false);
  const [userUpdated, setUserUpdated] = useState<boolean>(false);

  return (
    <div>
      <EditFormContext.Provider value={{ userUpdated, setUserUpdated }}>
        <AddFormContext.Provider value={{ userAdded, setUserAdded }}>
          <UserPage></UserPage>
        </AddFormContext.Provider>
      </EditFormContext.Provider>
    </div>
  );
}
