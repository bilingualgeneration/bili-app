import { PackSelect } from "@/components/PackSelect";
import { PlayHeader } from "@/components/PlayHeader";


export const CountWithMeSelect: React.FC = () => {
  return <PackSelect
           headerComponent={<PlayHeader />}
           module="count-with-me-game"
           packId="5a8a152d-8d2e-4741-bf8f-d8024d4e2d7b"
           translatedTitle='Cuenta Conmigo'
           englishTitle="Count With Me"
  />;
}
