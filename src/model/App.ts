export interface IAppProps {}

export interface IAppState {
  searchTerm: string;
  searchResults: IGoogleBooksApiItem[];
  error: Error | null;
  throwError: boolean;
}

export interface IGoogleBooksApiItem {
  id: string;
  volumeInfo: {
    title: string;
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}
