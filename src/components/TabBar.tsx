import { LOGO } from 'images'
import { Box, Center, Heading, Pressable, Image } from 'native-base'
import React, { FC } from 'react'
import { NavigationState, SceneRendererProps } from 'react-native-tab-view'
import { processFontFamily } from 'expo-font'

export type CustomTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string
    title: string
  }>
} & {
  index: number
  setIndex: (index: number) => void
}

const CustomTabBar: FC<CustomTabBarProps> = ({
  navigationState,
  index,
  setIndex,
}) => {
  return (
    <Box
      borderBottomLeftRadius={30}
      borderBottomRightRadius={30}
      px={30}
      shadow="10"
      backgroundColor="white"
    >
      <Center>
        <Image width="100%" height={300} mx={60} source={LOGO} alt="logo" />
      </Center>
      <Box flexDirection="row">
        {navigationState.routes.map((route, i) => {
          const borderColor = index === i ? 'primary.500' : 'white'

          return (
            <Box
              key={route.key}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
            >
              <Pressable onPress={() => setIndex(i)}>
                <Heading
                  fontFamily={processFontFamily('Prompt_500Medium')}
                  size="md"
                >
                  {route.title}
                </Heading>
              </Pressable>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default CustomTabBar
