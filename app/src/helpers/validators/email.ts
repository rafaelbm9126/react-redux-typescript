export const EmailValid = (email: string): boolean =>
  /^w+([.-]?w+)+@w+([.:]?w+)+(.[a-zA-Z0-9]{2,3})+$/.test(email);
