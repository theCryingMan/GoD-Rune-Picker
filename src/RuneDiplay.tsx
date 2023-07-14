import { Show } from "solid-js";

export function RuneDiplay(props: { rune: any; setRunes: any }) {
  return (
    <button
      class="rune-button"
      data-selected={props.rune().selected}
      data-name={props.rune().name}
      onPointerUp={(event) => {
        props.setRunes(
          (r) => r.name === props.rune().name,
          "selected",
          (s) => !s
        );
      }}
    >
      <img src={props.rune().url} />
      <Show when={props.rune().customName}>
        <span class={'rune-custom-name'}>{props.rune().customName}</span>
      </Show>
    </button>
  );
}
