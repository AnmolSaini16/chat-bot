export interface Result {
  from: "user" | "bot";
  message: string;
}

export interface ChatResponseInterface {
  candidates: {
    output: string;
  }[];
}
