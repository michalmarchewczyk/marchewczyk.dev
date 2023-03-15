import { createContext, Dispatch, SetStateAction } from 'react';

export const SectionsContext = createContext<{
  sections: string[];
  setSections: Dispatch<SetStateAction<string[]>>;
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
  isScrolling: boolean;
  setIsScrolling: Dispatch<SetStateAction<boolean>>;
}>({
  sections: [],
  setSections: () => [],
  currentSection: '',
  setCurrentSection: () => '',
  isScrolling: false,
  setIsScrolling: () => false,
});
