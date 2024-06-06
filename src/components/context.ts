import { createContext, useContext } from 'react';

interface UserAddedContextType {
  userAdded: boolean;
  setUserAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddFormContext = createContext<UserAddedContextType | undefined>(
  undefined
);

export function useAddFormContext() {
  const context = useContext(AddFormContext);
  if (context === undefined) {
    throw new Error('useAddFormContext must be used within a AddFormProvider');
  }

  return context;
}

interface UserUpdatedContextType {
  userUpdated: boolean;
  setUserUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditFormContext = createContext<UserUpdatedContextType | undefined>(
  undefined
);

export function useEditFormContext() {
  const context = useContext(EditFormContext);
  if (context === undefined) {
    throw new Error('useEditFormContext must be used within a EditFormProvider');
  }

  return context;
}