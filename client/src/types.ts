export type ButtonProps = {
  text?: string;
  icon?: React.ElementType | undefined;
  className?: string;
  pTagStyle?: string;
  iconStyle?: string;
  isSelected?: boolean;
  onClick?: () => void;
};
export type SendMessageTypes = {
  name:string,
  email: string,
  phone: string,
  cv: File | null;
}
export type FileInputProps = {
  name: string;
  lableTxt: string;
  accept?: string;
}

export type Application = {
  id: number;
  name: string;
  email: string;
  phone: string;
  vacancy_id: number;
  cv_path?: string;
  created_at?: string;
}

export type  Vacancy =  {
  id: number;
  position: string;
  description: string;
}

export type FilterProps ={
  vacancyFilter: string;
  dateFilter: string;
  sortBy: string;
  uniqueVacancies: number[];
  onVacancyChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClear: () => void;
  getVacancyPosition: (id: number) => string;
}