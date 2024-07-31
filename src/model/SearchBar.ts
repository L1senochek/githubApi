interface ISearchBarProps {
  searchTerm: string;
  onInputChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export default ISearchBarProps;
