import { WebView } from 'react-native-webview'

import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import React, { useRef } from 'react'
type WebviewScreenProps = StackScreenProps<RootStackParamList, 'Webview'>

const WebviewScreen: React.FC<WebviewScreenProps> = ({
  route: { params },
  navigation,
}) => {
  const { uri } = params
  const ref = useRef<WebView>(null)

  return (
    <WebView
      ref={ref}
      source={{ uri }}
      allowsBackForwardNavigationGestures
      onNavigationStateChange={navState => {
        navigation.setOptions({
          headerTitle: navState.title || navState.url,
        })
        if (navState.canGoBack) {
          navigation.setParams({
            headerLeftInfo: {
              ...params,
              title: '',
              onPress: () => ref.current?.goBack(),
            },
          })
        } else {
          navigation.setParams({
            ...params,
            headerLeftInfo: {
              title: '',
            },
          })
        }
      }}
    />
  )
}

export default WebviewScreen
