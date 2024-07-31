interface IPaginationProps {
  totalItems: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default IPaginationProps;
