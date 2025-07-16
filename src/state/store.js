import create from 'zustand';

export const useStore = create((set, get) => ({
  // Menu
  menuVisible: false,
  setMenuVisible: v => set({menuVisible: v}),
  // Image
  imageVisible: false,
  setImageVisible: v => set({imageVisible: v}),
  // Video
  videoVisible: false,
  setVideoVisible: v => set({videoVisible: v}),
}));
