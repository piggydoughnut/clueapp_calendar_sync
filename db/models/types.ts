export interface User {
  name: string;
  email: string;
  refreshToken: string;
  scope: string;
  idToken: string;
  accessToken: string;
  calendarId: string | undefined;
  clue: {
    accessDetails: {
      email: string;
      password: string;
    };
    data: {
      completed: boolean;
      start: string;
      end: string;
      excluded: boolean;
      expectedLength: number;
      isValid: boolean;
      length: number;
      phases: any[];
      predicted: boolean;
    }[];
  };
  // @todo what is this type?
  googleEvents: [];
  signupTokens: {
    token: string;
    used: number;
  }[];
}
