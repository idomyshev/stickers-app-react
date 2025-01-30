export interface ITab {
  label: string;
  name: string;
}

export interface ISticker {
  id: string;
  text: string;
}

export type IStickerForm = Omit<ISticker, "id">;
