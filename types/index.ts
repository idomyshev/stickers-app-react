export interface ITab {
  label: string;
  pathName: string;
}

export interface ISticker {
  id: string;
  text: string;
}

export type IStickerForm = Omit<ISticker, "id">;
