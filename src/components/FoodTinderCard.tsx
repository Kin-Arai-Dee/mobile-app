import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useAuthContext } from 'contexts/AuthContext'
import { useAutoRandomUnvotedFood } from 'hooks/useAutoRandomUnvotedFood'
import { isEmpty } from 'lodash'
import {
  Alert,
  Image,
  useTheme,
  Text,
  Stack,
  Box,
  Button,
  VStack,
  HStack,
} from 'native-base'
import React, { ReactNode, useState } from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { RootStackParamList } from 'Routes/RootStackParam'
import FoodService from 'services/FoodService'
import UserService from 'services/UserService'

type FoodSelectorNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FoodSelector'
>

export interface FoodTinderCardProps {
  title?: ReactNode
  limit?: number
  nextPage?: boolean
  height?: number
}

function FoodTinderCard({
  title,
  limit = 30,
  nextPage = false,
  height = 580,
}: FoodTinderCardProps) {
  const { colors } = useTheme()

  const { user, setUser } = useAuthContext()

  const { replace } = useNavigation<FoodSelectorNavigationProp>()
  const [isLoading, setIsLoading] = useState(false)

  const { foods, loading, refetch } = useAutoRandomUnvotedFood(limit)
  const [index, setIndex] = useState(-1)

  const setReady = async () => {
    setIsLoading(true)

    const userData = await UserService.setUserAsReady(user.userId)

    setUser(userData)

    replace('HomeTabs')

    setIsLoading(false)
  }

  if (loading || isLoading) {
    return <Spinner visible textContent="loading..." />
  }

  return (
    <View>
      <VStack>
        <Stack m="4" direction="row" justifyContent="space-between">
          {title ? (
            <>{title}</>
          ) : (
            <Text fontWeight="500" display="inline-block" fontSize="3xl">
              ปัดอาหารที่คุณชอบ
            </Text>
          )}
          {nextPage && index >= 19 && (
            <Button
              variant="subtle"
              rightIcon={
                <Ionicons
                  name="caret-forward"
                  size={16}
                  color={colors.primary[800]}
                />
              }
              onPress={setReady}
            >
              ข้าม
            </Button>
          )}
        </Stack>

        <View>
          <Swiper
            cards={foods}
            keyExtractor={!isEmpty(foods) ? card => card.foodId : undefined}
            onSwiped={cardIndex => setIndex(cardIndex)}
            renderCard={card => {
              if (!card) {
                return null
              }

              return (
                <Box
                  height={`${height}px`}
                  borderRadius="xl"
                  background="red.200"
                  overflow="hidden"
                >
                  <Image
                    width="100%"
                    height={`${height - 100}px`}
                    source={{ uri: card.imageUrl }}
                    alt={card.foodName}
                  />
                  <Stack
                    justifyContent="center"
                    background="white"
                    p={4}
                    mt="-8px"
                    borderRadius="lg"
                    height="108px"
                  >
                    <Text fontWeight="500" fontSize="2xl">
                      {card.foodName}
                    </Text>
                    <Text color="gray.700" fontSize="md">
                      วิธีการทำ: {card.cookMethod}
                    </Text>
                    <Text color="gray.700" fontSize="md">
                      แคลลอรี่: {`${card.calories}`} Kcals
                    </Text>
                  </Stack>
                </Box>
              )
            }}
            onSwipedRight={cardIndex => {
              FoodService.updateInteract(foods[cardIndex].foodId, 1)
            }}
            onSwipedLeft={cardIndex => {
              FoodService.updateInteract(foods[cardIndex].foodId, -1)
            }}
            onSwipedTop={cardIndex => {
              FoodService.updateInteract(foods[cardIndex].foodId, 2)
            }}
            onSwipedAll={() => {
              nextPage ? setReady() : refetch()
            }}
            animateOverlayLabelsOpacity
            stackSize={2}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    borderColor: colors.danger[600],
                    color: colors.danger[600],
                    borderWidth: 4,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    borderColor: colors.success[600],
                    color: colors.success[600],
                    borderWidth: 4,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
              top: {
                title: 'SUPER LIKE',
                style: {
                  label: {
                    borderColor: colors.info[400],
                    color: colors.info[400],
                    borderWidth: 4,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                },
              },
            }}
            cardVerticalMargin={2}
            disableBottomSwipe
          />
        </View>

        {nextPage && index < 19 && (
          <Alert
            status="warning"
            display="block"
            mx="5"
            top="680px"
            left="0"
            right="0"
            position="absolute"
          >
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    ปัดอีกอย่างน้อย {20 - (index + 1)} ใบ เพื่อข้าม
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        )}
      </VStack>
    </View>
  )
}

export default FoodTinderCard
