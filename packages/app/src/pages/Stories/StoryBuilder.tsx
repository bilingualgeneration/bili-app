import {
  doc,
  updateDoc
} from 'firebase/firestore';
import {firestore} from '@/components/Firebase';
import {Input} from '@/components/Input';
import {
    IonToggle,
} from '@ionic/react';
import {
  PageWrapper,
  StoryPage,
} from './Stories';
import {
  StoryProvider,
  useStory,
} from './StoryContext';
import {useForm} from 'react-hook-form';
import {useProfile} from '@/hooks/Profile';

const generatePage = ({
  es,
  en,
  esInc
}: {
  es: string,
  en: string,
  esInc: string
}) => {
  return {
    image: {
      url: 'https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/catrina_resized_Page_2_copy_eeb1395923.png'
    },
    text: [
      {
	language: 'en',
	text: en
      },
      {
	language: 'es',
	text: es
      },
      {
	language: 'es-inc',
	text: esInc
      }     
    ]
  };
}

export const StoryBuilder: React.FC = () => {
  return <StoryProvider>
    <StoryBuilderLoader />
  </StoryProvider>;
};

const StoryBuilderLoader: React.FC = () => {
  // todo: throwing component update race condition
  const {
    setPageNumber,
    pages,
    setPages,
    ready,
    setReady,
  } = useStory();
  if(!ready){
    setPageNumber(0);
    setPages([
      generatePage({
	en: '',
	es: '',
	esInc: ''
      })
    ]);
    setReady(true);
    return <></>;
  }else{
    return <>
      <HydratedStoryBuilder />
      <StoryBuilderForm />
    </>;
  }
};

const HydratedStoryBuilder: React.FC = () => {
//     <StoryPage />

  return <PageWrapper>

  </PageWrapper>;
};

const StoryBuilderForm: React.FC = () => {
  const {user: {uid}, profile: {isInclusive}} = useProfile();
  const ref = doc(firestore, "users", uid);
  const updateProfile = (key: string, value: any) => {
    updateDoc(ref, {
      [key]: value,
    });
  };
  const {
    pages,
    setPages,
  } = useStory();
  const {
    control,
    watch
  } = useForm({
    defaultValues: {
      en: '',
      es: '',
      esInc: ''
    }
  });
  const values = watch();
  const page = generatePage(values);
  if(JSON.stringify(pages[0]) !== JSON.stringify(page)){
    setPages([page]);
  }
  return <div style={{
    width: 800,
    margin: 'auto',
    marginTop: 50
  }}>
    <Input
      control={control}
      label='English'
      labelPlacement='above'
      name='en'
      fill='outline'
    />
    <Input
      control={control}
      label='Spanish'
      labelPlacement='above'
      name='es'
      fill='outline'
    />
    <Input
      control={control}
      label='Spanish Inclusive'
      labelPlacement='above'
      name='esInc'
      fill='outline'
    />
    <IonToggle
            justify="space-between"
            onClick={() => {
              updateProfile("isInclusive", !isInclusive);
            }}
            checked={isInclusive}
            mode="ios"
          >
            <div className="label-style">
              <h4>
		Inclusive Spanish
              </h4>
            </div>
          </IonToggle>

  </div>;
}
