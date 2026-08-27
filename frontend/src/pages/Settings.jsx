// useRef is used to import functions from a child
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

// import {
//   regexColors,
//   regexPrintOnly,
//   regexFindEmailStrict,
//   regexEmailStrict,
//   regexMatchPostfix,
//   regexUsername,
//   funcName,
//   fixStringType,
//   arrayOfStringToDict,
//   obj2ArrayOfObj,
//   reduxArrayOfObjByKey,
//   reduxArrayOfObjByValue,
//   reduxPropertiesOfObj,
//   mergeArrayOfObj,
//   getValueFromArrayOfObj,
//   getValuesFromArrayOfObj,
//   pluck,
//   byteSize2HumanSize,
//   humanSize2ByteSize,
//   moveKeyToLast,
// } from '../../../common.mjs';

import { Accordion, Button, Translate } from '../components';
import { useLocalStorage } from '../hooks/useLocalStorage';

// https://www.google.com/search?client=firefox-b-1-d&q=react+page+with+two+independent+form++onSubmit+&sei=U53haML6LsfYkPIP9ofv2AM
import FormContainerAdd from './FormContainerAdd';
import ServerInfos from './ServerInfos';

const Settings = () => {
  // const passwordFormRef = useRef(null);
  const { t } = useTranslation();
  const [containerName] = useLocalStorage('containerName', '');

  // Create a reference holder for the child component
  const serverInfosRef = useRef(null);

  // to handle data coming from the child form: <FormContainerAdd onInfosSubmit={handleInfosReceived} />
  const About = () => {
    return (
      <>
        {Translate('settings.aboutDescription')}
        <br />
        <Button
          variant="outline-primary"
          icon="github"
          text="settings.githubLink"
          href={t('common.DMS_GUIurl')}
          target="_blank"
          rel="noopener noreferrer"
        />
      </>
    );
  };

  // https://icons.getbootstrap.com/
  const settingTabs = [
    {
      id: 1,
      title: 'settings.titleContainerAdd',
      icon: 'house-add',
      content: <FormContainerAdd />,
    },
    {
      id: 2,
      title: 'settings.titleServerInfos',
      icon: 'house-fill',
      content: <ServerInfos ref={serverInfosRef} />,
      titleExtra: t('common.forWhat', { what: containerName }),
      onClickRefresh: () => serverInfosRef.current?.onClickRefresh(),
    },
    {
      id: 3,
      title: 'settings.titleContainers',
      icon: 'houses-fill',
      content: <></>,
    },
    {
      id: 4,
      title: 'settings.aboutTitle',
      icon: 'question-circle',
      content: About(),
    },
  ];

  return (
    <>
      <h2 className="mb-4">{Translate('settings.title')}</h2>

      <Accordion tabs={settingTabs}></Accordion>
    </>
  );
};

export default Settings;

// <Card
//   title="settings.aboutTitle"
//   icon="question-circle"
//   >
//   <Card.Text>
//     {' '}
//     {Translate('settings.aboutDescription')}
//   </Card.Text>{' '}

//   <Card.Text>
//     {' '}
//     <Button
//       variant="outline-primary"
//       icon="github"
//       text="settings.githubLink"
//       href={t('common.DMS_GUIurl')}
//       target="_blank"
//       rel="noopener noreferrer"
//     />
//   </Card.Text>{' '}
// </Card>
