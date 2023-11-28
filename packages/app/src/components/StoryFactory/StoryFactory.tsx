// import React from 'react';
// import { IonCard, IonCardContent, IonGrid, IonCol, IonRow } from '@ionic/react';
// import useStoryFactoryButton from '@/components/StoryFactory/StoryFactoryButtonLogic';

// interface StoryFactoryProps {
//   children: React.ReactNode;
// }

// const StoryFactory: React.FC<StoryFactoryProps> = ({ children }) => {
//   const { currentPage, handleNext, redirect } = useStoryFactoryButton(1);

//   const childrenWithProps = React.Children.map(children, child =>
//     React.cloneElement(child as React.ReactElement, {
//       handleNext,
//       currentPage,
//     })
//   );

//   return  (
//     <>
      
//         {childrenWithProps}
                
//         {/* Redirect based on logic in useStoryFactoryButton */}
//         {redirect()}
//     </>
//   );
// };

// export default StoryFactory;