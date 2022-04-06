import React, { useContext, useMemo, useReducer } from "react";
import { getUserLanguage } from "../../../library/helpers";
import config from "../../configuration";
import PropTypes from "prop-types";

interface AppState {
  language?: string;
}
type AppActionType = "SWITCH_LANGUAGE";
export type AppAction = {
  type: AppActionType;
  value: AppState["language"];
};
const GlobalContext = React.createContext<
  [AppState, React.Dispatch<AppAction>?]
>([{}]);

const appStateReducer = (state: AppState, action: AppAction): AppState => {
  if (action.type === "SWITCH_LANGUAGE") {
    return { ...state, language: action.value };
  }
  return state;
};

const switchLanguage = (dispatch: React.Dispatch<AppAction>, value: string) => {
  dispatch({ type: "SWITCH_LANGUAGE", value });
};

function AppProvider({ children }: any) {
  const initialAppState: AppState = {
    language: getUserLanguage(
      config.supportedLanguages,
      config.defaultLanguage
    ),
  };

  const [state, dispatch] = useReducer(appStateReducer, initialAppState);
  const value = useMemo<[AppState, React.Dispatch<AppAction>]>(
    () => [state, dispatch],
    [state, dispatch]
  );
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AppActions = {
  switchLanguage,
};

const getAppContext = (): [AppState, React.Dispatch<AppAction>?] => {
  const context = useContext(GlobalContext);
  return context;
};

export { AppProvider, AppActions, getAppContext };
