import { useState, useEffect, useCallback } from 'react';
import { AsyncStorage } from 'react-native';
const KEY_STORAGE = {
    IS_SHOW_ONBOARDING:'IS_SHOW_ONBOARDING'
}
const useOnboardingHooks = () => {
    const [isVisibleOnboard, setVisibleOnboard] = useState<boolean>(false);

    const onChangeVisible = useCallback((): void => {
        setVisibleOnboard(!isVisibleOnboard);
    }, [isVisibleOnboard])

    const onInitialOnboard = useCallback((): void => {
        AsyncStorage.getItem(KEY_STORAGE.IS_SHOW_ONBOARDING, (data: string) => {
            const isShowed = JSON.parse(data);
            setVisibleOnboard(!isShowed);
        });
    }, [isVisibleOnboard])

    const onUpdateStorageOnboard = useCallback((): void => {
        AsyncStorage.setItem(KEY_STORAGE.IS_SHOW_ONBOARDING, String(isVisibleOnboard));
    }, [isVisibleOnboard])

    //------------------- Side Effects -------------------

    useEffect(() => {
        onInitialOnboard();
    }, [])

    useEffect(() => {
        !!isVisibleOnboard && onUpdateStorageOnboard();
    }, [isVisibleOnboard])

    return {
        isVisibleOnboard,
        onChangeVisible
    }
}

export { useOnboardingHooks }
