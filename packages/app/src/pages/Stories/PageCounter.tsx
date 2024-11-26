import { useMemo } from "react";
import { useStory } from "./StoryContext";
import { useLanguage } from "@/hooks/Language";

export const PageCounter = () => {
  const { pages, pageNumber } = useStory();
  const { languageNormalized } = useLanguage();

  const filteredPages = useMemo(
    () =>
      pages
        .filter(
          (p: any) =>
            p.languages?.includes(languageNormalized) ||
            p.languages.join() === "all",
        )
        .slice(1), // leave out initial title card
    [pages, languageNormalized],
  );
  const currentPage = pages[pageNumber];
  const filteredPageNumber = filteredPages.findIndex(
    (p: any) => p.id === currentPage.id,
  );
  const totalPages = filteredPages.length;
  let pills = [];
  for (let index = 0; index < totalPages!; index++) {
    if (index <= filteredPageNumber!) {
      pills.push(true);
    } else {
      pills.push(false);
    }
  }

  const styles = {
    height: 8,
    width: "1rem",
    borderRadius: 4,
    display: "inline-block",
    marginLeft: 4,
    marginRight: 4,
  };

  const stylesFilled = {
    ...styles,
    backgroundColor: "#006a67",
  };

  const stylesEmpty = {
    ...styles,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  };

  return (
    <div className="ion-text-center margin-top-2">
      {pills.map((p: boolean, index: number) => {
        if (p) {
          return <div style={stylesFilled} key={index}></div>;
        } else {
          return <div style={stylesEmpty} key={index}></div>;
        }
      })}
    </div>
  );
};
