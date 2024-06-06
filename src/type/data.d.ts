interface User {
  username: string;
  fullname: string;
  role: string;
  project: string[];
  activeYn: string;
}

interface UserInput {
  username?: string;
  fullname?: string;
  role?: string;
  project?: string;
  activeYn?: string;
  [key: string]: string | undefined;
}
