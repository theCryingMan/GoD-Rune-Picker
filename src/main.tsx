import { render } from "solid-js/web";
import { Index, Match, Switch, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import "./style.css";
import division from "./assets/division.png";
import ex from "./assets/ex.png";
import hamburger from "./assets/hamburger.png";
import pizza from "./assets/pizza.png";
import squid from "./assets/squid.png";
import table from "./assets/table.png";
import three from "./assets/three-dots.png";
import vig from "./assets/vig.png";
import { Map, RunesSvg } from "./Map";
import { RuneDiplay } from "./RuneDiplay";
const [Runes, setRunes] = createStore([
  {
    selected: false,
    url: division,
    name: "division",
    customName: "test",
  },
  {
    selected: false,
    url: ex,
    name: "ex",
  },
  {
    selected: false,
    url: hamburger,
    name: "hamburger",
  },
  {
    selected: false,
    url: pizza,
    name: "pizza",
  },
  {
    selected: false,
    url: squid,
    name: "squid",
  },
  {
    selected: false,
    url: table,
    name: "table",
  },
  {
    selected: false,
    url: three,
    name: "three",
  },
  {
    selected: false,
    url: vig,
    name: "vig",
  },
]);
function handOrientationChange() {
  switch (screen.orientation.type) {
    case "landscape-primary":
    case "landscape-secondary":
      document.body.classList.toggle("landscape", true);
      document.body.classList.toggle("portrait", false);
      break;
    case "portrait-primary":
    case "portrait-secondary":
      document.body.classList.toggle("portrait", true);
      document.body.classList.toggle("landscape", false);
      break;
    default:
      break;
  }
}
function Picker() {
  return (
    <div class="picker-wrapper">
      <div class={"settings-icon"}>⚙</div>
      <div class={"rune-picker"}>
        <Index each={Runes}>{(rune, idx) => <RuneDiplay setRunes={setRunes} rune={rune} />}</Index>
      </div>
    </div>
  );
}
function MapDisplay() {
  return (
    <div class="map-display">
      <div class={"picked-row"}>
        <Index each={Runes.filter((i) => i.selected)}>
          {(rune, idx) => <RuneDiplay setRunes={setRunes} rune={rune} />}
        </Index>
      </div>
      <Map selected={Runes.filter((i) => i.selected).map((i) => i.name)} />
      <button
        class={"clear-runes"}
        textContent={"Clear"}
        onPointerUp={(event) => {
          event?.preventDefault();
          setRunes(
            (i) => i.selected,
            "selected",
            (s) => !s
          );
        }}
      />
    </div>
  );
}
function RunePicker() {
  onMount(() => {
    handOrientationChange();
    screen.orientation.addEventListener("change", handOrientationChange);
  });

  const showSelected = () => Runes.filter((i) => i.selected).length === 3;
  return (
    <Switch>
      <Match when={showSelected()}>
        <MapDisplay />
      </Match>
      <Match when={!showSelected()}>
        <Picker />
      </Match>
    </Switch>
  );
}

render(() => <RunePicker />, document.getElementById("app")!);
