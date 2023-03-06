import React from 'react'
import { Keyboard, KeyboardEventListener, Platform } from 'react-native'

const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = React.useState(0)
  const subscriptions = React.useRef([])

  React.useEffect(() => {
    const onKeyboardChange: KeyboardEventListener = e => {
      if (
        e.startCoordinates &&
        e.endCoordinates.screenY < e.startCoordinates.screenY
      )
        setBottom(e.endCoordinates.height)
      else setBottom(0)
    }

    if (Platform.OS === 'ios') {
      subscriptions.current = [
        // @ts-ignore
        Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
      ]
    } else {
      subscriptions.current = [
        // @ts-ignore
        Keyboard.addListener('keyboardDidHide', onKeyboardChange),
        // @ts-ignore
        Keyboard.addListener('keyboardDidShow', onKeyboardChange),
      ]
    }
    return () => {
      subscriptions.current.forEach(subscription => {
        // @ts-ignore
        subscription.remove()
      })
    }
  }, [setBottom, subscriptions])

  return bottom
}

export default useKeyboardBottomInset
