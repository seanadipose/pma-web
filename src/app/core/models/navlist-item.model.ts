export interface NavlistItem {
  link: string;
  label: string;
  icon?: string;
  fn?: (id: keyof NavlistItem, obj: NavlistItem) => string

}
