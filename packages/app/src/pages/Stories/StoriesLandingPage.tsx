import React, { FC } from "react";
import { Play } from "../Play";
import { useProfile } from "@/hooks/Profile";
import { Carousel } from "@/components/Carousel";
import Lock from "@/assets/icons/lock.svg";
import "./StoriesLandingPage.scss";
import { PackSelect } from "@/components/PackSelect";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { FormattedMessage } from "react-intl";
import { StoriesHeader } from "@/components/StoriesHeader";
import { I18nMessage } from "@/components/I18nMessage";
import { text } from "ionicons/icons";

export const StoriesLandingPage: FC = () => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();
  return (
    <>
      <StoriesHeader />
      <div id="stories-landing-page">
        <div className="margin-horizontal-carousel">
          <h1 className="text-5xl bold carousel-header-margin">
            <I18nMessage id="common.stories" />
          </h1>
          <I18nMessage
            id="common.stories"
            level={2}
            wrapper={(text: string) => (
              <h2 className="text-3xl color-english carousel-header-margin">
                {text}
              </h2>
            )}
          />
        </div>
        <div className="margin-top-2 margin-bottom-3">
          <PackSelect
            translatedTitle={"Cuentos"}
            englishTitle={"Stories"}
            category={"story"}
            module={"story"}
            only_cards={true}
            pack_name_field={"title"}
            sortBy="order"
          />
        </div>

        {/* family and community header + row */}
        <div className="margin-horizontal-carousel">
          <h1 className="text-5xl bold carousel-header-margin">
            <I18nMessage id="pages.storiesLandingPage.familyAndCommunity" />
          </h1>
          <I18nMessage
            id="pages.storiesLandingPage.familyAndCommunity"
            level={2}
            wrapper={(text: string) => (
              <h2 className="text-3xl color-english carousel-header-margin">
                {text}
              </h2>
            )}
          />

          <div className="image-container">
            <img src={Lock} />
            <h1 className="text-4xl bold color-nube">
              <I18nMessage id="pages.storiesLandingPage.comingSoon" />
            </h1>
            <I18nMessage
              id="pages.storiesLandingPage.comingSoon"
              level={2}
              wrapper={(text: string) => (
                <h2 className="text-3xl color-nube">{text}</h2>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
