import React, { createContext } from "react";
import {
  IState, ICard, IColumn, IComment, ActionType, 
  AddCard, RenameColumn, SaveDescription, UpdateComments,
} from "../types/types";

export const initialState: IState = {
  columns: [
    { id: 1, title: "TODO" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Testing" },
    { id: 4, title: "Done" },
  ],
  cards: [], // columnId, id, title, description, userId
  comments: [], // cardId, id, text, userName
  columnModalIsShown: false,
  cardModal: {
    isShown: false,
    activeCardId: 0,
  },
};

export const addCard = (card: ICard): AddCard => {
  return {
    type: ActionType.AddCard,
    payload: card,
  };
};

export const saveDescription = (cardId: number, description: string): SaveDescription => {
  return {
    type: ActionType.SaveDescription,
    payload: { cardId, description },
  };
};

export const renameColumn = (data: IColumn): RenameColumn => {
  return {
    type: ActionType.RenameColumn,
    payload: data,
  };
};

export const updateComments = (comments: IComment[]): UpdateComments => {
  return {
    type: ActionType.UpdateComments,
    payload: comments,
  };
};

type Actions = AddCard | RenameColumn | SaveDescription | UpdateComments;

export function boardReducer(state: IState, action: Actions): IState {
  switch (action.type) {
    case ActionType.RenameColumn:
      const newState = {
        ...state,
        columns: state.columns.map((column) => {
          if (column.id === action.payload.id) {
            column.title = action.payload.title;
          }
          return column;
        })
      };
      return newState;
    case ActionType.AddCard:
      state.cards.push(action.payload);
      return state;
    case ActionType.SaveDescription:
      return { 
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload.cardId) {
            card.description = action.payload.description;
          }
          return card;
        })
      }
    case ActionType.UpdateComments:
      return {
        ...state,
        comments: action.payload,
      }
    default:
      return state;
  }
};

export const Context = createContext<{
  state: IState;
  dispatch: React.Dispatch<Actions>;
  }>({
    state: initialState,
    dispatch: () => undefined,
  });
