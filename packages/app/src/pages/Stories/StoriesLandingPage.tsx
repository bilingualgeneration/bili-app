import React, { FC } from "react";
import { Play } from "../Play";
import { useProfile } from "@/hooks/Profile";
import { Carousel } from "@/components/Carousel";
import "./StoriesLandingPage.scss";
import Lock from "@/assets/icons/lock.svg";
import './StoriesLandingPage.scss';
import { PackSelect } from "@/components/PackSelect";
import {useLanguageToggle} from '@/components/LanguageToggle';
import {FormattedMessage} from 'react-intl';
import {StoriesHeader} from '@/components/StoriesHeader';

export const StoriesLandingPage: FC = () => {
  const { profile: {isInclusive }} = useProfile();
  const {language} = useLanguageToggle();
  return (
    <>
      <StoriesHeader />
      <div id="stories-landing-page">
	<div className='margin-horizontal-carousel'>
          <h1 className="text-5xl bold carousel-header-margin">
	    <FormattedMessage id='pages.storiesLandingPage.title' />
	  </h1>
          {language === 'esen' && (
            <h2 className="text-3xl color-english carousel-header-margin">All about me</h2>
          )}
	</div>
        <div className="margin-top-2 margin-bottom-3">
          <PackSelect 
            translatedTitle={"Cuentos"} 
            englishTitle={"Stories"} 
            category={"story"} 
            module={"story"}
	    only_cards={true}
            pack_name_field = {"title"}
	    sortBy='order'
          />
        </div>

        {/* family and community header + row */}
	<div className='margin-horizontal-carousel'>
          <h1 className="text-5xl bold carousel-header-margin">
	    <FormattedMessage id='pages.storiesLandingPage.familyAndCommunity' />
	  </h1>
          {language === 'esen' && (
            <h2 className="text-3xl color-english carousel-header-margin">Family and community</h2>
          )}
          <div className="image-container">
	    <img src={Lock} />
            <h1 className="text-4xl bold color-nube">
	      <FormattedMessage id='pages.storiesLandingPage.comingSoon' />
	    </h1>
            {language === 'esen' && (
              <h2 className="text-3xl color-nube">Coming Soon</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

