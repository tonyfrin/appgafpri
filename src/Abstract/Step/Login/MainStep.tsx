import React from 'react';
import { css } from '@emotion/css';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import { EmailStep } from './EmailStep';
import { EmailCheckStep } from './EmailCheckStep';
import { PhoneStep } from './PhoneStep';
import { NameStep } from './NameStep';
import { LegalStep } from './LegalStep';
import { SelfieStep } from './SelfieStep';
import { FinalStep } from './FinalStep';
import { FadeIn } from '../../Fade/FadeIn';
import { LegalPhotoStep } from './LegalPhotoStep';
import { ProgressBar } from '../../Bar/ProgressBar';
import { useTheme } from '../../context/ThemeContext';
import { Loading } from '../../Loading';
import { LayoutLogin } from '../../Component/LayoutLogin';
import { PhoneCheckStep } from './PhoneCheckStep';

const progressBarContainerStyles = css`
    display: flex;
    margin: 20px auto;
`

const arrowStyle = css`
    font-size: 1.5rem;
    color: #314577;
    margin: auto;
    width: 10%;
`

export const MainStep = () => {
  const { useSingUp } = useTheme();

  const returnStep = () => {
    if (useSingUp.pages.states.isEmail) {
      return <Link href="/login" />;
    } else if (useSingUp.pages.states.isEmailCheck) {
      useSingUp.pages.actions.onEmail();
    } else if (useSingUp.pages.states.isPhone) {
      useSingUp.pages.actions.onEmailCheck();
    } else if (useSingUp.pages.states.isPhoneCheck) {
      useSingUp.pages.actions.onPhone();
    } else if (useSingUp.pages.states.isName) {
      useSingUp.pages.actions.onPhoneCheck();
    } else if (useSingUp.pages.states.isLegal) {
      useSingUp.pages.actions.onName();
    } else if (useSingUp.pages.states.isPhotoLegal) {
      useSingUp.pages.actions.onLegal();
    } else if (useSingUp.pages.states.isSelfie) {
      useSingUp.pages.actions.onPhotoLegal();
    }
  };

 
  let percentage = 0;

    if (useSingUp.pages.states.isEmail) {
      percentage = (1/8) * 100;
    } else if (useSingUp.pages.states.isEmailCheck) {
      percentage = (2/8) * 100;
    } else if (useSingUp.pages.states.isPhone) {
      percentage = (3/8) * 100;
    } else if (useSingUp.pages.states.isPhoneCheck) {
      percentage = (4/8) * 100;
    } else if (useSingUp.pages.states.isName) {
      percentage = (5/8) * 100;
    } else if (useSingUp.pages.states.isLegal) {
      percentage = (6/8) * 100;
    } else if (useSingUp.pages.states.isPhotoLegal) {
      percentage = (7/8) * 100;
    } else if (useSingUp.pages.states.isSelfie) {
      percentage = (8/8) * 100;
    }

  return (
    <>
     <LayoutLogin
        containerStyles={{
            custom: `
                background-color: #f9f9f9;
            `,
        }}
     ><>

     

      <div className={progressBarContainerStyles}>
          {!useSingUp.pages.states.isEmail && !useSingUp.pages.states.isFinal &&
            <FiChevronLeft 
                className={arrowStyle}
                onClick={returnStep}
            />
          }
          {!useSingUp.pages.states.isFinal && 
            <div style={{width: '90%'}}>
                <ProgressBar percentage={percentage} />
            </div>
          }
      </div>

     {useSingUp.pages.states.isFetching && <Loading />}

     {useSingUp.pages.states.isEmail && (
        <FadeIn keyName="isEmail" isVisible={useSingUp.pages.states.isEmail}>
          <EmailStep 
            nextStep={useSingUp.pages.actions.onEmailCheck}
          />
        </FadeIn>
      )}

      {useSingUp.pages.states.isEmailCheck && (
        <FadeIn keyName="isEmailCheck" isVisible={useSingUp.pages.states.isEmailCheck}>
          <EmailCheckStep />
        </FadeIn>
      )}

      {useSingUp.pages.states.isPhone && 
        <FadeIn keyName="isPhone" isVisible={useSingUp.pages.states.isPhone}>
          <PhoneStep 
            
          />
        </FadeIn>
      }

      {useSingUp.pages.states.isPhoneCheck && 
        <FadeIn keyName="isPhoneCheck" isVisible={useSingUp.pages.states.isPhoneCheck}>
          <PhoneCheckStep />
        </FadeIn>
      }

      {useSingUp.pages.states.isName &&
        <FadeIn keyName="isName" isVisible={useSingUp.pages.states.isName}>
          <NameStep 
            
          />  
        </FadeIn>
      }
      
      {useSingUp.pages.states.isLegal &&
        <FadeIn keyName="isLegal" isVisible={useSingUp.pages.states.isLegal}>
          <LegalStep 
            
          />
        </FadeIn>
      }

      {useSingUp.pages.states.isPhotoLegal &&
        <FadeIn keyName="isPhotoLegal" isVisible={useSingUp.pages.states.isPhotoLegal}>
          <LegalPhotoStep 
            
          />
        </FadeIn>
      }

      {useSingUp.pages.states.isSelfie &&
        <FadeIn keyName="isSelfie" isVisible={useSingUp.pages.states.isSelfie}>
          <SelfieStep 
            
          />
        </FadeIn>
      }

      {useSingUp.pages.states.isFinal &&
        <FadeIn keyName="isFinal" isVisible={useSingUp.pages.states.isFinal}>
          <FinalStep />
        </FadeIn>
      }

     </>
    </LayoutLogin>
    </>
  );
}
