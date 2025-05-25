import { allNav } from "./allNav";
export const getNavs = (role) => {
  const finalNavs = [];
  for (let i = 0; i < allNav.length; i++) {
    if (allNav[i].role === role) {
      finalNavs.push(allNav[i]);
    }
  }
  return finalNavs;
};
