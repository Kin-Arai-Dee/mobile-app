import { Ionicons } from '@expo/vector-icons'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
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
  Button,
  VStack,
  HStack,
  Badge,
} from 'native-base'
import React, { ReactNode, useState } from 'react'
import { Pressable, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { BottomTabParam, RootStackParamList } from 'Routes/RootStackParam'
import FoodService from 'services/FoodService'
import UserService from 'services/UserService'

type FoodSelectorNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FoodSelector'
>

type AppStackNavigationProp = BottomTabNavigationProp<BottomTabParam>

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

  const { replace, navigate } = useNavigation<
    FoodSelectorNavigationProp & AppStackNavigationProp
  >()
  const [isLoading, setIsLoading] = useState(false)

  const { foods, loading, refetch } = useAutoRandomUnvotedFood(limit)
  const [index, setIndex] = useState(-1)

  const setReady = async () => {
    setIsLoading(true)

    const userData = await UserService.setUserAsReady(user.userId)

    setUser(userData)

    navigate('HomeTabs', {
      screen: 'Random',
    })

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
                <Pressable
                  onPress={() => navigate('FoodDetail2', { food: card })}
                >
                  <Stack
                    height={`${height}px`}
                    borderRadius="xl"
                    background="red.200"
                    overflow="hidden"
                  >
                    <Image
                      width="100%"
                      source={{ uri: card.imageUrl }}
                      alt={card.title}
                      flexGrow="1"
                    />
                    <Stack
                      justifyContent="center"
                      background="white"
                      px={4}
                      py={2}
                      mt="-8px"
                      borderRadius="lg"
                    >
                      <Text fontWeight="500" fontSize="2xl" numberOfLines={1}>
                        {card.title}
                      </Text>
                      <Text color="gray.700" fontSize="lg">
                        วิธีปรุง:{' '}
                        {isEmpty(card.methods) ? (
                          '-'
                        ) : (
                          <>{card.methods.map(method => method.primaryName)} </>
                        )}
                      </Text>
                      <HStack space="1" flexWrap="wrap">
                        {!isEmpty(card.ingredientTags) &&
                          card.ingredientTags.map(ingredientTag => (
                            <Badge
                              variant="subtle"
                              rounded="full"
                              colorScheme="cyan"
                              _text={{
                                fontSize: '14',
                              }}
                              mt={1}
                            >
                              {ingredientTag.primaryName}
                            </Badge>
                          ))}
                        {!isEmpty(card.categories) &&
                          card.categories.map(categorie => (
                            <Badge
                              variant="subtle"
                              rounded="full"
                              colorScheme="lime"
                              _text={{
                                fontSize: '14',
                              }}
                              mt={1}
                            >
                              {categorie.primaryName}
                            </Badge>
                          ))}
                      </HStack>
                    </Stack>
                  </Stack>
                </Pressable>
              )
            }}
            onSwipedRight={cardIndex => {
              FoodService.updateInteract(
                foods[cardIndex].foodId,
                1,
                foods[cardIndex].clusterId
              )
            }}
            onSwipedLeft={cardIndex => {
              FoodService.updateInteract(
                foods[cardIndex].foodId,
                -1,
                foods[cardIndex].clusterId
              )
            }}
            onSwipedTop={cardIndex => {
              FoodService.updateInteract(
                foods[cardIndex].foodId,
                2,
                foods[cardIndex].clusterId
              )
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
