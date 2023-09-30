import { Show } from "solid-js";
import { useRuneContext } from "./Context/RuneContext";
export function RuneDiplay(props: { id: Rune["id"] | number }) {
  const [state, { setCustomName, selectRune, getRune }] = useRuneContext();
  const rune = getRune(props.id);
  return (
    <button
      class="rune-button"
      data-selected={rune.selected}
      data-id={rune.id}
      onPointerUp={(event) => {
        selectRune(rune.id);
      }}
    >
      <img src={rune.url} />
      <Show when={rune.customName}>
        <span class={"rune-custom-name"}>{rune.customName}</span>
      </Show>
    </button>
  );
}
