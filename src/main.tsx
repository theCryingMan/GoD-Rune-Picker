import { render } from "solid-js/web";
import { Index, Match, Show, Switch, onMount } from "solid-js";
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
import Map from "./Map";
function RunePicker() {
  onMount(() => {
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
    screen.orientation.addEventListener(
      "change",
      (event: DeviceOrientationEvent) => {
        let { currentTarget } = event;
        console.log(currentTarget);
        switch ((currentTarget as ScreenOrientation).type) {
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
    );
  });
  console.log();
  const [Runes, setRunes] = createStore([
    {
      selected: false,
      url: division,
      name: "division",
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
  const selectedCount = () => Runes.filter((i) => i.selected).length;
  const showOnlySelected = () => selectedCount() === 3;
  return (
    <Switch>
      <Match when={showOnlySelected()}>
        <div class="map-display">
          <div class={"picked-row"}>
            <Index each={Runes.filter((i) => i.selected)}>
              {(rune, idx) => (
                <div
                  class="rune-image"
                  data-selected={rune().selected}
                  data-name={rune().name}
                  onPointerUp={(event) => {
                    setRunes(
                      (r) => r.name === rune().name,
                      "selected",
                      (s) => !s
                    );
                  }}
                >
                  <img src={rune().url} />
                </div>
              )}
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
      </Match>
      <Match when={!showOnlySelected()}>
        <div class={"rune-picker"}>
          <Index each={Runes}>
            {(rune, idx) => (
              <div
                class="rune-image"
                data-selected={rune().selected}
                onPointerUp={(event) => {
                  setRunes(
                    (r) => r.name === rune().name,
                    "selected",
                    (s) => !s
                  );
                }}
              >
                <img src={rune().url} />
              </div>
            )}
          </Index>
        </div>
      </Match>
    </Switch>
  );
}

render(() => <RunePicker />, document.getElementById("app")!);
