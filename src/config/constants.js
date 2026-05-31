export const EditorTabs = [
  {
    name: "styleseditor",
    icon: "/styles.svg",
  },
  {
    name: "colorpicker",
    icon: "/swatch.svg",
  },
  {
    name: "filepicker",
    icon: "/file.svg",
  },
  {
    name: "texteditor",
    icon: "/text.svg",
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: "/logo-tshirt.svg",
  },
  {
    name: "stylishShirt",
    icon: "/stylish-tshirt.svg",
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
