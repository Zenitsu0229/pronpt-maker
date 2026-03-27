export type Selections = Record<string, string[]>;
export type WeightMap = Record<string, number>;

export interface PromptLine {
  name: string;
  tags: string[];
}
