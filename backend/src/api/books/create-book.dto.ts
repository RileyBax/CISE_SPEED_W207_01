export class CreateBookDto {
    title: string;
    authors: string;
    journalName: string;
    publicationYear: string;
    volume?: string;
    issueNumber?: string;
    pages?: string;
    doi: string;
    keywords?: string;
    typeOfResearch?: string;
    abstract?: string;
    institution?: string;
    published_date: string;
    publisher: string;
    updated_date: string;
    rating: number;
    averageRating?: number;
    createdAt?: Date;
  }