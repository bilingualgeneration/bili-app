import classnames from "classnames";
import { useStory } from "./StoryContext";

interface SegmentedText {
  text: string;
}

export const SegmentedText: React.FC<SegmentedText> = ({ text }) => {
  const { setCurrentVocabHandle, vocabLookup } = useStory();
  let isItalic: boolean = false;
  return text.split(" ").map((t: string, index: number) => {
    let classes = ["word"];
    const normalizedWord = t
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]*$/, "");
    if (vocabLookup[normalizedWord]) {
      classes.push("vocab");
    }
    if (t.startsWith("*")) {
      isItalic = true;
    }
    if (isItalic) {
      classes.push("italic");
    }
    if (t.endsWith("*")) {
      isItalic = false;
    }
    return (
      <span
        className={classnames(classes)}
        key={`${index}${t}`}
        onClick={
          vocabLookup[normalizedWord]
            ? () => {
                setCurrentVocabHandle(vocabLookup[normalizedWord]);
              }
            : undefined
        }
      >
        {t.replace(/^\*|\*$/g, "")}
      </span>
    );
  });
};
