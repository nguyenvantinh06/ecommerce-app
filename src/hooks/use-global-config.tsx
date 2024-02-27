import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
interface IConfig {
  fontSize: 'small' | 'large' | 'default';
  notification?: {
    newMessage: boolean;
  };
}
interface IGlobalConfigContext {
  configs: IConfig;
  setFontSize: (size: 'small' | 'large' | 'default') => Promise<void>;
  setConfigs: (configs: IConfig) => Promise<void>;
}
const GlobalConfigContext = React.createContext<IGlobalConfigContext>({
  configs: {
    fontSize: 'default',
    notification: {
      newMessage: false,
    },
  },
  setFontSize: function (size: 'small' | 'large' | 'default'): Promise<void> {
    throw new Error('Function not implemented.');
  },
  setConfigs: function (configs: IConfig): Promise<void> {
    throw new Error('Function not implemented.');
  },
});
const GLOBAL_CONFIGURATION_KEY = 'global-configuration';
const GlobalConfigProvider = ({
  children,
  onReadyRender = undefined,
}: React.PropsWithChildren<{onReadyRender?: () => void}>) => {
  const [isReadyRender, setReadyRender] = React.useState(false);
  const [configs, setConfigs] = React.useState<IConfig>({
    fontSize: 'default',
    notification: {
      newMessage: false,
    },
  });
  React.useEffect(() => {
    // get config global
    AsyncStorage.getItem(GLOBAL_CONFIGURATION_KEY, (err, res) => {
      if (err || !res) {
        setReadyRender(true);
        onReadyRender && onReadyRender();
        return;
      }

      try {
        const dataConfigs = JSON.parse(res);
        setConfigs(dataConfigs);
        setReadyRender(true);
        onReadyRender && onReadyRender();
      } catch (error) {
        console.log('parse json config error: ', error);
        setReadyRender(true);
        onReadyRender && onReadyRender();
      }
    });
  }, [onReadyRender]);

  const updateConfig = React.useCallback(
    async (newConfig: IConfig) => {
      const configsTemp = {...configs, ...newConfig};
      try {
        await AsyncStorage.setItem(
          GLOBAL_CONFIGURATION_KEY,
          JSON.stringify(configsTemp),
        );
        setConfigs(configsTemp);
      } catch (error) {
        console.log('Save global config error: ', error);
      }
    },
    [configs],
  );

  const setFontSize = React.useCallback(
    async (size: 'small' | 'large' | 'default') => {
      console.log('size: ', size);
      const configsTemp = {...configs, fontSize: size};
      await updateConfig(configsTemp);
    },
    [configs, updateConfig],
  );

  // React.useEffect(() => {
  //   console.log('configs: ', configs);
  // }, [configs]);

  return (
    <GlobalConfigContext.Provider
      value={{
        configs,
        setConfigs: updateConfig,
        setFontSize: setFontSize,
      }}>
      {isReadyRender && children}
    </GlobalConfigContext.Provider>
  );
};

function useGlobalConfig() {
  const context = React.useContext(GlobalConfigContext);

  return context;
}

const GlobalConfigConsumer = GlobalConfigContext.Consumer;

export {useGlobalConfig, GlobalConfigProvider, GlobalConfigConsumer};
