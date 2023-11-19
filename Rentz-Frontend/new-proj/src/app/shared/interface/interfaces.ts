export interface MenuItem {
  title: string;
  icon?: string; // Optional icon property
  active?: boolean; // Optional active property
  type?: string; // Type of menu item
  badge?: Badge; // Optional badge property
  submenus?: MenuItem[]; // Optional submenu property
}

enum MenuItemType {
  Header = 'header',
  Dropdown = 'dropdown',
  Simple = 'simple',
}

interface Badge {
  text: string;
  class: string;
}
