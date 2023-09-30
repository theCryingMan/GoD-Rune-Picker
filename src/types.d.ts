interface Rune {
  selected: boolean;
  url: any;
  id: string;
  customName: string;
}
interface RuneContextActions {
  setCustomName(id: Rune["id"], name: string): void;
  selectRune(id: Rune["id"]): void;
  clearSelected(): void;
  getSelected(): void;
  selectedCount(): number;
  getRune(id: Rune["id"] | number): Rune;
}
