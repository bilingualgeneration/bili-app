import React from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonItem,
    IonLabel,
    IonRow,
    IonText,
    IonThumbnail
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { IconWithText } from '@/components/IconWithText';
// @ts-ignore todo: cannot find module or its corresponding type declarations
import MeGustaIcon from '@/assets/icons/me_gusta.svg?react';
import ArteIcon from '@/assets/icons/arte.svg?react';
import BieneStarIcon from '@/assets/icons/bienestar.svg?react';
import ComunidadIcon from '@/assets/icons/comunidad.svg?react';
import StemIcon from '@/assets/icons/stem.svg?react';
import { StoriesCard } from '@/components/StoriesCard';
import SmallBook from '@/assets/icons/small_book.svg?react';
import Heart from '@/assets/icons/heart.svg?react';
import Star from '@/assets/icons/star.svg?react';

export const LandingPage: React.FC = () => {

    return(
	<>
        <IonText>
            <h1>
                Hola Vanessa!
            </h1>
            <h6>
                Hello Vanessa!
            </h6>
        </IonText>

        <div className=''>
            <div>
                <IonText>
                    <h2>Las tareas de esta semana</h2>
                    <p>This week’s assignments</p>
                </IonText>
                
            </div>
            {/* icons */}
            <div className='wave-icons'>
                <IonGrid>
                    <IonRow>
                        <IonCol className="col-custom-position-1">
                        <IconWithText 
                            title={'¡Me gusta como soy!'}
                            subtitle={'I like myself!'}
                            icon={<MeGustaIcon/>}
                            iconBackgroundColor='#006A67'	
                        />
                        </IonCol>
                        <IonCol className="col-custom-position-2">
                            <IconWithText 
                                title={'¡Me gusta como soy!'}
                                subtitle={'I like myself!'}
                                icon={<BieneStarIcon/>}
                                iconBackgroundColor='#AC217B'	
                            />
                        </IonCol>
                        <IonCol className="col-custom-position-3">
                            <IconWithText 
                                title={'¡Me gusta como soy!'}
                                subtitle={'I like myself!'}
                                icon={<ArteIcon/>}
                                iconBackgroundColor='#0045A1'	
                            />
                        </IonCol>
                        <IonCol className="col-custom-position-4">
                            <IconWithText 
                                title={'¡Me gusta como soy!'}
                                subtitle={'I like myself!'}
                                icon={<ComunidadIcon/>}
                                iconBackgroundColor='#F0091B'	
                            />
                        </IonCol>
                        <IonCol className="col-custom-position-5">
                        <IconWithText 
                            title={'¡Me gusta como soy!'}
                            subtitle={'I like myself!'}
                            icon={<StemIcon/>}
                            iconBackgroundColor='#8FB8FA'
                        /> 
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
            
            {/* stories */}
            <div>
                <div>
                    <h2>Cuentos</h2>
                    <p>Stories</p>
                </div>
                    
                <div 
                    style={{
                        display: 'flex',
                        alignItems: 'center',

                    }}
                >
                    
                    <StoriesCard 
                        title={'¡Me gusta como soy!'} 
                        subtitle={'I like myself'} 
                        cover={'/assets/img/boot_image.png'}
                        icon={<SmallBook/>}
                        iconBackroungColor='#006A67'
                        heart={<Heart/>}
                        rating={[<Star/>, <Star/>, <Star/>]}
                    />

                    <StoriesCard 
                        title={'¡Me gusta como soy!'} 
                        subtitle={'I like myself'} 
                        cover={'/assets/img/boot_image.png'}
                        icon={<SmallBook/>}
                        iconBackroungColor='#006A67'
                        heart={<Heart/>}
                        rating={[<Star/>, <Star/>, <Star/>]}
                    />

                    <StoriesCard 
                        title={'¡Me gusta como soy!'} 
                        subtitle={'I like myself'} 
                        cover={'/assets/img/boot_image.png'}
                        icon={<SmallBook/>}
                        iconBackroungColor='#006A67'
                        heart={<Heart/>}
                        rating={[<Star/>, <Star/>, <Star/>]}
                    />

                    <StoriesCard 
                        title={'¡Me gusta como soy!'} 
                        subtitle={'I like myself'} 
                        cover={'/assets/img/boot_image.png'}
                        icon={<SmallBook/>}
                        iconBackroungColor='#006A67'
                        heart={<Heart/>}
                        rating={[<Star/>, <Star/>, <Star/>]}
                    /> 

                    <StoriesCard 
                        title={'¡Me gusta como soy!'} 
                        subtitle={'I like myself'} 
                        cover={'/assets/img/boot_image.png'}
                        icon={<SmallBook/>}
                        iconBackroungColor='#006A67'
                        heart={<Heart/>}
                        rating={[<Star/>, <Star/>, <Star/>]}
                    />         
                </div>

            </div>

            
        </div>
	   
	</>
    );
};
