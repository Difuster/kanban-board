export interface IState {
  columns: IColumn[];
  cards: ICard[];
  comments: IComment[];
};

export interface IColumn {
  id: number;
  title: string;
};

export interface ICard {
  columnId: number,
  id: number,
  title: string,
  description: string,
  userId: number,
};

export interface IComment {
  cardId: number,
  id: number,
  text: string,
  userName: string,
};

export enum ActionType {
  AddCard,
  RenameCard,
  DeleteCard,
  RenameColumn,
  SaveDescription,
  UpdateComments,
};

export interface AddCard {
  type: ActionType.AddCard;
  payload: ICard;
};

export interface IRenameCard {
  cardId: number,
  cardTitle: string,
};

export interface RenameCard {
  type: ActionType.RenameCard;
  payload: IRenameCard;
};

export interface DeleteCard {
  type: ActionType.DeleteCard;
  payload: number;
};

export interface RenameColumn {
  type: ActionType.RenameColumn;
  payload: IColumn;
};

export interface ISaveDescription {
  cardId: number,
  description: string,
};

export interface SaveDescription {
  type: ActionType.SaveDescription;
  payload: ISaveDescription;
};

export interface UpdateComments {
  type: ActionType.UpdateComments;
  payload: IComment[];
};
