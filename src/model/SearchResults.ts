export interface IGitHubUserCardProps {
  id: string;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface ISearchResultsProps {
  searchResults: IGitHubUserCardProps[];
  onItemClick: (itemId: string) => void;
}

export default ISearchResultsProps;
