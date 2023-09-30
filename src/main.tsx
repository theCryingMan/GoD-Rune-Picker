import { render } from "solid-js/web";
import { For, Index, Match, Switch, createEffect, onMount } from "solid-js";
 
import "./style.css";
 
import { Map  } from "./Map";
import { RuneDiplay } from "./RuneDiplay";
import { RuneProvider, useRuneContext } from "./Context/RuneContext";

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
  const [runeState, {}] = useRuneContext();
  return (
    <div class="picker-wrapper">
      <div class={"settings-icon"}>⚙</div>
      <div class={"rune-picker"}>
        <Index each={runeState}>{(rune, idx) => <RuneDiplay id={idx} />}</Index>
      </div>
    </div>
  );
}
function MapDisplay() {
  const [runeState, { selectRune, clearSelected }] = useRuneContext();
  return (
    <div class="map-display">
      <div class={"picked-row"}>
        <For each={runeState.filter((i) => i.selected)}>
          {(rune, idx) => <RuneDiplay id={rune.id} />}
        </For>
      </div>
      <Map selected={runeState.filter((i) => i.selected).map((i) => i.id)} />
      <button
        class={"clear-runes"}
        textContent={"Clear"}
        onPointerUp={(event) => {
          event?.preventDefault();
          clearSelected();
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

  const [runeState, { selectedCount }] = useRuneContext();
  const showSelected = () => selectedCount() === 3;
  
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

render(
  () => (
    <RuneProvider>
      <RunePicker />
    </RuneProvider>
  ),
  document.getElementById("app")!
);
