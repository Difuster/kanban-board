export interface IState {
  columns: IColumn[];
  cards: ICard[];
  comments: IComment[];
  columnModalIsShown: boolean;
  cardModal: ICardModal;
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

export interface ICardModal {
  isShown: boolean,
  activeCardId: number,
};

export enum ActionType {
  AddCard,
  RenameColumn,
  SaveDescription,
  UpdateComments,
};

export interface AddCard {
  type: ActionType.AddCard;
  payload: ICard;
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
