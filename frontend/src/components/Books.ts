export type Book = {
    analysisCompleted: any;
    _id?: string;
    title: string; // Required
    authors: string; // Required 
    journalName: string; // Required 
    publicationYear: string; // Required 
    volume?: string; // Optional
    issueNumber?: string; // Optional
    pages?: string; // Optional
    doi: string; // Required
    keywords?: string; // Optional
    typeOfResearch?: string; // Optional
    abstract?: string; // Optional
    institution?: string; // Optional
    updated_date?: Date;
    isDuplicate?: boolean;
    verified?: boolean;
    imageCover?: string; 
  };
  
  export const DefaultEmptyBook: Book = {
    _id: undefined,
    title: '',
    authors: '',
    journalName: '',
    publicationYear: '',
    volume: '',
    issueNumber: '',
    pages: '',
    doi: '',
    keywords: '',
    typeOfResearch: '',
    abstract: '',
    institution: '',
    updated_date: undefined,
    imageCover: '',
    analysisCompleted: undefined
  };