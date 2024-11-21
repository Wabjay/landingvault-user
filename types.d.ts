
type FormData = {
  pageImage: string;
  pageCoverImage: string;
  brandName: string;
  brandDescription: string;
  websiteUrl: string;
  componentType: string[]; // Array of component names
  industry: string[];      // Array of industry names
  stacks: string[];        // Array of stack names
  style: string[];         // Array of style names
  type: string[];          // Array of type names
  mode: "light" | "dark";  // Mode can be 'light' or 'dark'
  colorPalette: string[];
}
interface Page {
  _id: string;
  pageImage: string;
  pageCoverImage: string;
  brandName: string;
  brandDescription: string;
  websiteUrl: string;
  componentType: string[]; // Array of component names
  industry: string[];      // Array of industry names
  stacks: string[];        // Array of stack names
  style: string[];         // Array of style names
  type: string[];          // Array of type names
  mode: "light" | "dark";  // Mode can be 'light' or 'dark'
  colorPalette: string[];  // Array of color hex codes
  createdAt: string;       // ISO string format
  updatedAt: string;       // ISO string format
  __v: number;             // Version key (usually for internal use)
  id: string; 
};
interface PagesResponse {
  data: Page[];
  status: boolean;
  statusCode: number;
  message: string;
  errors: null | string;
}

  interface PagesProps {
    data: unknown;
    pages: {
      data: page[];
      message: string;
      status: number;
      pagination: {
        total: number;
        page: number;
        pages: number;
      };
    };
  }
  
  interface pages {
    [pageType: string]: page;
  }

// types/index.ts or a separate file for types
export interface User {
  userName: string;
  // Add any other fields you expect in the user object
}

export interface NavbarProps {
  params: string;  // the current pathname (used for determining the active link)
  logout: () => void;  // logout function
  login: () => void;  // login function
  isLogged: boolean;  // a flag to indicate if the user is logged in
  user?: User | null;  // the user object (optional)
}
