import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import division from "../assets/division.png";
import ex from "../assets/ex.png";
import hamburger from "../assets/hamburger.png";
import pizza from "../assets/pizza.png";
import squid from "../assets/squid.png";
import table from "../assets/table.png";
import three from "../assets/three-dots.png";
import vig from "../assets/vig.png";

const defaultState: Rune[] = [
  {
    selected: false,
    url: division,
    id: "division",
    customName: "",
  },
  {
    selected: false,
    url: ex,
    customName: "",
    id: "ex",
  },
  {
    selected: false,
    url: hamburger,
    customName: "",
    id: "hamburger",
  },
  {
    selected: false,
    url: pizza,
    customName: "",
    id: "pizza",
  },
  {
    selected: false,
    url: squid,
    customName: "",
    id: "squid",
  },
  {
    selected: false,
    url: table,
    customName: "",
    id: "table",
  },
  {
    selected: false,
    url: three,
    customName: "",
    id: "three",
  },
  {
    selected: false,
    url: vig,
    customName: "",
    id: "vig",
  },
];

const RuneContext = createContext<
  [state: typeof defaultState, actions: RuneContextActions]
>([
  defaultState,
  {
    setCustomName: () => undefined,
    selectedCount: () => 0,
    selectRune: () => undefined,
    getSelected: () => undefined,
    getRune: () => {
      return {} as Rune;
    },
    clearSelected: () => undefined,
  },
]);

export const RuneProvider: ParentComponent = (props) => {
  const [state, setState] = createStore(defaultState);
  function setCustomName(id: Rune["id"], name: string) {
    setState((rune) => rune.id === id, "customName", name);
  }
  function selectRune(id: Rune["id"]) {
    setState(
      (rune) => rune.id === id,
      "selected",
      (b) => !b
    );
  }
  function clearSelected() {
    setState((rune) => rune.selected, "selected", false);
  }
  function getRune(id: Rune["id"] | number): Rune {
    if (typeof id === "number") {
      return state[id]!;
    } else if (typeof id === "string") {
      return state[state.findIndex((rune) => rune.id === id)]!;
    }
  }
  function selectedCount() {
    return getSelected().length;
  }
  function getSelected() {
    return state.filter((i) => i.selected);
  }
  return (
    <RuneContext.Provider
      value={[
        state,
        { setCustomName,getSelected, selectRune, getRune, clearSelected, selectedCount },
      ]}
    >
      {props.children}
    </RuneContext.Provider>
  );
};

export const useRuneContext = () => useContext(RuneContext);
