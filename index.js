import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CloudCannonContext = createContext();

export const useCloudCannon = () => {
  const context = useContext(CloudCannonContext);
  if (!context) {
    throw new Error(
      "useCloudCannon must be used within a CloudCannonProvider"
    );
  }
  return context;
};

export const CloudCannonProvider = ({
  children,
  options = {},
}) => {
  const [state, setState] = useState({});
  const processProps =
    options?.processProps || ((props) => props);

  const onLoadEventListener = useCallback((e) => {
    onCloudCannonLoad(e.detail.CloudCannon);
  }, []);

  const onUpdateEventListener = useCallback((e) => {
    loadNewPropsFromCloudCannon(e.detail.CloudCannon);
  }, []);

  useEffect(() => {
    document.addEventListener(
      "cloudcannon:load",
      onLoadEventListener
    );
    document.addEventListener(
      "cloudcannon:update",
      onUpdateEventListener
    );

    if (window.CloudCannon) {
      onCloudCannonLoad(window.CloudCannon);
    }

    return () => {
      document.removeEventListener(
        "cloudcannon:load",
        onLoadEventListener
      );
      document.removeEventListener(
        "cloudcannon:update",
        onUpdateEventListener
      );
    };
  }, [onLoadEventListener, onUpdateEventListener]);

  const loadNewPropsFromCloudCannon = async (
    CloudCannon
  ) => {
    try {
      const latestValue = await CloudCannon.value(
        options?.valueOptions
      );
      setState(processProps(latestValue));
      console.log("Loaded latest page props", latestValue);
    } catch (fetchError) {
      console.warn(
        "Failed to fetch latest page props",
        fetchError
      );
    }
  };

  const onCloudCannonLoad = (CloudCannon) => {
    CloudCannon.enableEvents();
    loadNewPropsFromCloudCannon(CloudCannon);
  };

  return (
    <CloudCannonContext.Provider
      value={{ pageData: state }}
    >
      {children}
    </CloudCannonContext.Provider>
  );
};
